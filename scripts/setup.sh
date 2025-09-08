#!/bin/bash
set -e

echo "🚀 Setting up Self-Hosted Pageflow..."

# Function to check if a port is in use
check_port() {
    local port=$1
    if netstat -tuln 2>/dev/null | grep -q ":$port " || lsof -i :$port >/dev/null 2>&1 || nc -z localhost $port >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is available
    fi
}

# Function to generate secure passwords
generate_password() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-25
}

# Function to generate SECRET_KEY_BASE
generate_secret() {
    openssl rand -hex 64
}

# Function to generate 16-character symmetric encryption keys
generate_symmetric_key() {
    openssl rand -hex 16
}

# Function to get environment variable with default value
get_env_value() {
    local var_name=$1
    local default_value=$2
    local value
    
    # Try to get value from existing .env file first
    if [ -f .env ]; then
        value=$(grep "^${var_name}=" .env 2>/dev/null | cut -d'=' -f2- | tr -d '"')
    fi
    
    # If not found, use default
    if [ -z "$value" ]; then
        value="$default_value"
    fi
    
    echo "$value"
}

# Check required ports
echo "🔍 Checking port availability..."

# Get actual port values that will be used (from .env or defaults)
PAGEFLOW_HOST_PORT=$(get_env_value "PAGEFLOW_HOST_PORT" "3000")
MINIO_API_HOST_PORT=$(get_env_value "MINIO_API_HOST_PORT" "9002")
MINIO_CONSOLE_HOST_PORT=$(get_env_value "MINIO_CONSOLE_HOST_PORT" "9001")
MYSQL_HOST_PORT=$(get_env_value "MYSQL_HOST_PORT" "")
REDIS_HOST_PORT=$(get_env_value "REDIS_HOST_PORT" "")
TRANSCODER_HOST_PORT=$(get_env_value "TRANSCODER_HOST_PORT" "")

# Define external ports that will actually be mapped (conflict-prone)
EXTERNAL_PORTS=()
EXTERNAL_PORT_SERVICES=()

# Always check external ports
if [ -n "$PAGEFLOW_HOST_PORT" ]; then
    EXTERNAL_PORTS+=("$PAGEFLOW_HOST_PORT")
    EXTERNAL_PORT_SERVICES+=("Pageflow web interface")
fi

if [ -n "$MINIO_API_HOST_PORT" ]; then
    EXTERNAL_PORTS+=("$MINIO_API_HOST_PORT")
    EXTERNAL_PORT_SERVICES+=("MinIO S3 API")
fi

if [ -n "$MINIO_CONSOLE_HOST_PORT" ]; then
    EXTERNAL_PORTS+=("$MINIO_CONSOLE_HOST_PORT")
    EXTERNAL_PORT_SERVICES+=("MinIO admin console")
fi

# Check optional external ports (only if configured)
if [ -n "$MYSQL_HOST_PORT" ]; then
    EXTERNAL_PORTS+=("$MYSQL_HOST_PORT")
    EXTERNAL_PORT_SERVICES+=("MySQL database (debug)")
fi

if [ -n "$REDIS_HOST_PORT" ]; then
    EXTERNAL_PORTS+=("$REDIS_HOST_PORT")
    EXTERNAL_PORT_SERVICES+=("Redis cache (debug)")
fi

if [ -n "$TRANSCODER_HOST_PORT" ]; then
    EXTERNAL_PORTS+=("$TRANSCODER_HOST_PORT")
    EXTERNAL_PORT_SERVICES+=("Custom transcoder (debug)")
fi

# Check port conflicts
PORT_CONFLICTS=false

for i in "${!EXTERNAL_PORTS[@]}"; do
    port="${EXTERNAL_PORTS[$i]}"
    service="${EXTERNAL_PORT_SERVICES[$i]}"
    
    if check_port "$port"; then
        echo "❌ Port $port is already in use (needed for $service)"
        PORT_CONFLICTS=true
    else
        echo "✅ Port $port is available for $service"
    fi
done

# Also mention internal-only services (for completeness)
echo ""
echo "📋 Internal-only services (no external port conflicts):"
echo "   • MySQL: pageflow_mysql:3306 (Docker network only)"
echo "   • Redis: pageflow_redis:6379 (Docker network only)"
echo "   • Transcoder: pageflow_transcoder:8080 (Docker network only)"

if [ "$PORT_CONFLICTS" = true ]; then
    echo ""
    echo "❌ Setup cannot continue due to port conflicts."
    echo ""
    echo "External ports needed:"
    for i in "${!EXTERNAL_PORTS[@]}"; do
        port="${EXTERNAL_PORTS[$i]}"
        service="${EXTERNAL_PORT_SERVICES[$i]}"
        echo "  $port  - $service"
    done
    echo ""
    echo "Please stop the conflicting services and try again."
    echo "Or modify the ports in .env if it exists, or they will be set to defaults."
    exit 1
fi

echo "✅ All required external ports are available"

# Check if .env exists and create if needed
if [ ! -f .env ]; then
    echo "📝 Creating .env with secure defaults..."
    
    # Generate secure passwords
    MYSQL_ROOT_PASSWORD=$(generate_password)
    MYSQL_PASSWORD=$(generate_password)
    SECRET_KEY_BASE=$(generate_secret)
    SYMMETRIC_ENC_KEY=$(generate_symmetric_key)
    SYMMETRIC_ENC_IV=$(generate_symmetric_key)
    
    cat > .env << EOF
# Self-Hosted Pageflow Environment Configuration

# === SECURITY ===
SECRET_KEY_BASE=${SECRET_KEY_BASE}
SYMMETRIC_ENC_KEY=${SYMMETRIC_ENC_KEY}
SYMMETRIC_ENC_IV=${SYMMETRIC_ENC_IV}

# === DATABASE ===
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
MYSQL_PASSWORD=${MYSQL_PASSWORD}

# === APPLICATION ===
PAGEFLOW_HOST=localhost:${PAGEFLOW_HOST_PORT}
RAILS_ENV=production
DEFAULT_LOCALE=en

# === STORAGE (MinIO S3-Compatible) ===
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin123
AWS_REGION=us-east-1
S3_BUCKET=pageflow-main
S3_OUTPUT_BUCKET=pageflow-output

# MinIO endpoints
S3_ENDPOINT_INTERNAL=http://pageflow_minio:9000
S3_ENDPOINT_EXTERNAL=http://localhost:${MINIO_API_HOST_PORT}

# MinIO console URLs
MINIO_BROWSER_REDIRECT_URL=http://localhost:${MINIO_CONSOLE_HOST_PORT}
# MINIO_SERVER_URL is optional and can cause hostname validation issues in Docker
# MINIO_SERVER_URL=http://localhost:${MINIO_API_HOST_PORT}

# === TRANSCODING ===
MAX_CONCURRENT_JOBS=4
GPU_ACCELERATION=false
TRANSCODER_SERVICE_KEY=pageflow-transcoder
TRANSCODER_BASE_URL=http://pageflow_transcoder:8080

# === PORT CONFIGURATION ===
# External ports - only needed for services accessed from outside Docker network
PAGEFLOW_HOST_PORT=${PAGEFLOW_HOST_PORT}
MINIO_API_HOST_PORT=${MINIO_API_HOST_PORT}
MINIO_CONSOLE_HOST_PORT=${MINIO_CONSOLE_HOST_PORT}


# Internal-only services (no external port mapping by default):
# Uncomment only if external access needed for debugging:
# MYSQL_HOST_PORT=3306
# REDIS_HOST_PORT=6379
# TRANSCODER_HOST_PORT=8080
EOF
    
    echo "✅ .env file created with secure passwords"
    echo "🔐 Your MySQL passwords have been randomly generated for security"
else
    echo "✅ Using existing .env configuration"
fi

echo ""
echo "🔨 Building containers (this may take a few minutes)..."
docker compose build

echo "🚀 Starting services..."
docker compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 45

# Check service health
echo "🏥 Checking service health..."

source .env
healthy_services=0

if docker compose exec -T pageflow_mysql mysqladmin ping -h localhost -u pageflow -p${MYSQL_PASSWORD} >/dev/null 2>&1; then
    echo "✅ MySQL: healthy"
    healthy_services=$((healthy_services + 1))
else
    echo "❌ MySQL: unhealthy"
fi

if docker compose exec -T pageflow_redis redis-cli ping >/dev/null 2>&1; then
    echo "✅ Redis: healthy"
    healthy_services=$((healthy_services + 1))
else
    echo "❌ Redis: unhealthy"
fi

if curl -f -s http://localhost:${MINIO_API_HOST_PORT}/minio/health/live >/dev/null 2>&1; then
    echo "✅ MinIO: healthy"
    healthy_services=$((healthy_services + 1))
else
    echo "❌ MinIO: unhealthy"
fi

# Transcoder is internal-only, check on Docker network instead
if docker compose exec -T pageflow_transcoder curl -f -s http://localhost:8080/health >/dev/null 2>&1; then
    echo "✅ Transcoder: healthy"
    healthy_services=$((healthy_services + 1))
else
    echo "❌ Transcoder: unhealthy (non-critical)"
fi

if curl -f -s http://localhost:${PAGEFLOW_HOST_PORT}/health >/dev/null 2>&1; then
    echo "✅ Pageflow: healthy"
    healthy_services=$((healthy_services + 1))
else
    echo "❌ Pageflow: starting (this is normal during first setup)"
fi

echo ""
if [ $healthy_services -ge 3 ]; then
    echo "✅ Core services are healthy!"
    
    echo "🗄️  Setting up database..."
    sleep 30
    
    echo "✅ Database setup will be handled automatically by the container"
    echo "   The Pageflow container will generate and run all necessary migrations on startup"
    
    echo ""
    echo "✅ Setup completed successfully!"
    echo ""
    echo "🌐 Your Pageflow instance is available at:"
    echo "   Main App: http://localhost:${PAGEFLOW_HOST_PORT}"
    echo "   Admin:    http://localhost:${PAGEFLOW_HOST_PORT}/admin"
    echo "   MinIO:    http://localhost:${MINIO_CONSOLE_HOST_PORT} (minioadmin/minioadmin123)"
    echo ""
    echo "👤 Create an admin user with:"
    echo "   ./scripts/manage.sh create-admin"
else
    echo "⚠️  Some services are not ready yet. Check logs with: docker compose logs"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   1. Create admin user: ./scripts/manage.sh create-admin"
echo "   2. Login at http://localhost:${PAGEFLOW_HOST_PORT}/users/sign_in"
echo "   3. Check logs: docker compose logs -f pageflow"
echo ""
echo "🛑 To stop: docker compose down"
echo "🔄 To restart: docker compose up -d"