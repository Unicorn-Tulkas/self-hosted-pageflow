#!/bin/bash
set -e

echo "🚀 Starting Pageflow application..."

# Set up bundle environment
export BUNDLE_PATH=/usr/local/bundle
export PATH=/usr/local/bundle/bin:$PATH

# Environment check
echo "📋 Environment Check:"
echo "   RAILS_ENV: ${RAILS_ENV:-production}"
echo "   DB_HOST: ${DB_HOST:-pageflow_mysql}"
echo "   REDIS_URL: ${REDIS_URL:-redis://pageflow_redis:6379/0}"
echo "   User: $(id -un) ($(id -u))"

# Ensure we have correct permissions
chown -R pageflow:pageflow /app/log /app/tmp /app/storage 2>/dev/null || true

# Generate Rails binstubs to fix warnings
echo "🔧 Setting up Rails binstubs..."
if [ ! -f ./bin/rails ] || ! ./bin/rails --version >/dev/null 2>&1; then
    echo "   Generating Rails binstubs..."
    bundle binstubs railties --force
    chmod +x ./bin/*
fi

# Dynamic bundle install with error handling
echo "🔧 Checking gems..."
if ! bundle check >/dev/null 2>&1; then
    echo "📦 Installing gems..."
    bundle install --jobs 4 --retry 3
else
    echo "✅ Gems satisfied"
fi

# Wait for dependencies with better error handling
echo "⏳ Waiting for MySQL Database..."
timeout=60
while [ $timeout -gt 0 ]; do
    if nc -z "${DB_HOST:-pageflow_mysql}" "${DB_PORT:-3306}"; then
        echo "✅ MySQL Database connection established"
        break
    fi
    sleep 2
    timeout=$((timeout - 2))
done

if [ $timeout -le 0 ]; then
    echo "❌ Timeout waiting for MySQL"
    exit 1
fi

echo "⏳ Waiting for Redis..."
redis_host=$(echo ${REDIS_URL:-redis://pageflow_redis:6379/0} | sed 's|redis://||' | cut -d: -f1)
redis_port=$(echo ${REDIS_URL:-redis://pageflow_redis:6379/0} | sed 's|redis://||' | cut -d: -f2 | cut -d/ -f1)
timeout=60
while [ $timeout -gt 0 ]; do
    if nc -z "$redis_host" "$redis_port"; then
        echo "✅ Redis connection established"
        break
    fi
    sleep 2
    timeout=$((timeout - 2))
done

if [ $timeout -le 0 ]; then
    echo "❌ Timeout waiting for Redis"
    exit 1
fi

# Create required directories
mkdir -p log tmp/pids tmp/cache tmp/sockets public/assets storage

# Database setup
echo "📊 Setting up database..."
./bin/rails db:create RAILS_ENV=${RAILS_ENV:-production} 2>/dev/null || echo "ℹ️  Database exists"

# Check database schema state
echo "🔍 Checking database schema..."
USERS_TABLE_EXISTS=$(./bin/rails runner "
begin
  puts ActiveRecord::Base.connection.table_exists?('users') ? 'yes' : 'no'
rescue => e
  puts 'no'
end
" RAILS_ENV=${RAILS_ENV:-production} 2>/dev/null || echo "no")

PAGEFLOW_TABLES=$(./bin/rails runner "
begin
  puts ActiveRecord::Base.connection.tables.select { |t| t.include?('pageflow') }.count
rescue => e
  puts '0'
end
" RAILS_ENV=${RAILS_ENV:-production} 2>/dev/null || echo "0")

# Handle database migrations in correct order
if [ "$USERS_TABLE_EXISTS" = "no" ] && [ "$PAGEFLOW_TABLES" -lt "10" ]; then
    echo "🔧 Setting up authentication and Pageflow schema..."
    
    # Step 1: Create essential tables (Users and ActiveAdmin Comments)
    echo "   Creating essential tables (Users, ActiveAdmin Comments)..."
    ./bin/rails db:migrate VERSION=2 RAILS_ENV=${RAILS_ENV:-production}
    
    # Step 2: Install Pageflow migrations
    echo "   Installing Pageflow migrations..."
    ./bin/rails pageflow:install:migrations RAILS_ENV=${RAILS_ENV:-production} >/dev/null 2>&1 || true
    
    # Step 3: Run all remaining migrations (Pageflow will add fields to Users table)
    echo "   Running all migrations..."
    ./bin/rails db:migrate RAILS_ENV=${RAILS_ENV:-production}
    
    echo "✅ Database schema setup completed"
elif [ "$PAGEFLOW_TABLES" -lt "10" ]; then
    echo "🔧 Installing remaining Pageflow schema..."
    ./bin/rails pageflow:install:migrations RAILS_ENV=${RAILS_ENV:-production} >/dev/null 2>&1 || true
    ./bin/rails db:migrate RAILS_ENV=${RAILS_ENV:-production}
    echo "✅ Pageflow installation completed"
else
    echo "✅ Database schema already complete"
    # Run any pending migrations
    ./bin/rails db:migrate RAILS_ENV=${RAILS_ENV:-production} 2>/dev/null || echo "⚠️  No pending migrations"
fi

# Precompile assets
echo "🎨 Precompiling assets..."
./bin/rails assets:precompile RAILS_ENV=${RAILS_ENV:-production} || echo "⚠️  Asset precompilation failed, continuing..."

echo "✅ Setup complete! Starting Rails server..."

# Clean up stale PID files to prevent boot loops
echo "🧹 Cleaning up stale PID files..."
rm -f tmp/pids/server.pid

# Start Rails server
exec ./bin/rails server -b 0.0.0.0 -p 3000 -e ${RAILS_ENV:-production}