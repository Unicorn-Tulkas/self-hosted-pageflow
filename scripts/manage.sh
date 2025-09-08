#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

show_help() {
    echo -e "${BLUE}Pageflow Management Tool${NC}"
    echo "Essential management commands for self-hosted Pageflow"
    echo ""
    echo -e "${CYAN}Usage:${NC} $0 [COMMAND] [OPTIONS]"
    echo ""
    echo -e "${CYAN}Commands:${NC}"
    echo -e "  ${GREEN}cleanup${NC}              Clean up containers and volumes"
    echo -e "  ${GREEN}create-admin${NC}         Create admin user"
    echo ""
    echo -e "${CYAN}Options:${NC}"
    echo "  --help, -h           Show this help"
    echo "  --yes, -y            Skip confirmation prompts"
    echo ""
}

# Confirmation function
confirm_action() {
    local message="$1"
    if [ "$SKIP_CONFIRM" != "true" ]; then
        echo -e "${RED}⚠️  $message${NC}"
        read -p "Continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Cancelled."
            exit 0
        fi
    fi
}

# Cleanup functionality
cleanup_system() {
    echo -e "${BLUE}🧹 Pageflow Complete Cleanup${NC}"
    
    confirm_action "This will remove all Pageflow containers, volumes, and data!"
    
    echo "🛑 Stopping services..."
    docker compose down --remove-orphans 2>/dev/null || true
    
    echo "🗑️  Removing containers..."
    PAGEFLOW_CONTAINERS=$(docker ps -aq --filter "name=pageflow" 2>/dev/null || true)
    if [ ! -z "$PAGEFLOW_CONTAINERS" ]; then
        docker rm -f $PAGEFLOW_CONTAINERS 2>/dev/null || true
    fi
    
    echo "💾 Removing volumes..."
    COMPOSE_VOLUMES="pageflow_bundle_cache pageflow_app_storage pageflow_app_log pageflow_app_tmp pageflow_mysql_data pageflow_redis_data pageflow_minio_data pageflow_transcoder_temp"
    for volume in $COMPOSE_VOLUMES; do
        if docker volume ls -q | grep -q "^${volume}$"; then
            docker volume rm "$volume" 2>/dev/null || true
        fi
    done
    
    # Also remove any other pageflow volumes
    PAGEFLOW_VOLUMES=$(docker volume ls -q --filter "name=pageflow" 2>/dev/null || true)
    if [ ! -z "$PAGEFLOW_VOLUMES" ]; then
        echo "$PAGEFLOW_VOLUMES" | while read -r volume; do
            docker volume rm "$volume" 2>/dev/null || true
        done
    fi
    
    echo "🌐 Removing networks..."
    PAGEFLOW_NETWORKS=$(docker network ls -q --filter "name=pageflow" 2>/dev/null || true)
    if [ ! -z "$PAGEFLOW_NETWORKS" ]; then
        echo "$PAGEFLOW_NETWORKS" | while read -r network; do
            docker network rm "$network" 2>/dev/null || true
        done
    fi
    
    echo "🖼️  Removing images..."
    PAGEFLOW_IMAGES=$(docker images -q --filter "reference=*pageflow*" 2>/dev/null || true)
    if [ ! -z "$PAGEFLOW_IMAGES" ]; then
        docker rmi -f $PAGEFLOW_IMAGES 2>/dev/null || true
    fi
    
    echo "📁 Cleaning local files..."
    rm -rf ./logs/* 2>/dev/null || true
    rm -rf ./pageflow/log/*.log 2>/dev/null || true
    rm -rf ./pageflow/tmp/* 2>/dev/null || true
    
    echo "🗂️  Cleaning generated migrations..."
    # Remove all generated Pageflow migrations (keep only essential ones)
    find ./pageflow/db/migrate/ -name "*.pageflow.rb" -delete 2>/dev/null || true
    # Remove timestamped migrations except the essential ones we want to keep
    find ./pageflow/db/migrate/ -name "20*_*.rb" ! -name "*initial_setup.rb" -delete 2>/dev/null || true
    
    echo -e "${GREEN}✅ Cleanup complete!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run: ./scripts/setup.sh"
    echo "  2. Create admin user: ./scripts/manage.sh create-admin"
}

# Create admin user
create_admin_user() {
    echo -e "${BLUE}👤 Creating Pageflow admin user...${NC}"
    
    if ! docker compose ps pageflow | grep -q "Up"; then
        echo -e "${RED}❌ Pageflow service is not running. Please run ./scripts/setup.sh first${NC}"
        exit 1
    fi
    
    # Load environment
    if [ -f .env ]; then
        source .env
    fi
    
    read -p "📧 Admin email: " admin_email
    read -s -p "🔒 Admin password: " admin_password
    echo
    read -p "👤 Admin first name: " admin_first_name
    read -p "👤 Admin last name: " admin_last_name
    
    echo "🔧 Creating admin user..."
    # Copy the Ruby script to the container and run it
    docker compose cp ./scripts/create_admin_user.rb pageflow:/tmp/create_admin_user.rb
    if docker compose exec -e ADMIN_EMAIL="$admin_email" \
                           -e ADMIN_PASSWORD="$admin_password" \
                           -e ADMIN_FIRST_NAME="$admin_first_name" \
                           -e ADMIN_LAST_NAME="$admin_last_name" \
                           pageflow bash -c "cd /app && RAILS_ENV=production bundle exec rails runner /tmp/create_admin_user.rb"; then
        echo -e "${GREEN}✅ Admin user created successfully!${NC}"
        echo -e "${CYAN}🌐 Login at: http://localhost:3000/admin${NC}"
    else
        echo -e "${RED}❌ Failed to create admin user${NC}"
        exit 1
    fi
}


# Parse arguments
SKIP_CONFIRM="false"
COMMAND=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            exit 0
            ;;
        --yes|-y)
            SKIP_CONFIRM="true"
            shift
            ;;
        cleanup|create-admin)
            if [ ! -z "$COMMAND" ]; then
                echo -e "${RED}❌ Only one command allowed${NC}"
                exit 1
            fi
            COMMAND="$1"
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute command
case $COMMAND in
    cleanup)
        cleanup_system
        ;;
    create-admin)
        create_admin_user
        ;;
    *)
        show_help
        exit 0
        ;;
esac