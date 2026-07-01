# Configure Rails to use Redis for caching in containerized environments
# This fixes story lock synchronization issues across multiple containers
#
# In containerized setups with multiple processes (pageflow_app, pageflow_worker),
# file-based locks cannot be properly synchronized. Using Redis as the cache store
# ensures all containers share the same lock and cache state.

require 'redis'

redis_url = ENV.fetch('REDIS_URL', 'redis://pageflow_redis:6379/0')

# Configure Rails cache store to use Redis
Rails.application.config.cache_store = :redis_store, { 
  url: redis_url,
  expires_in: 90.minutes
}

Rails.logger.info "🔐 Redis cache store configured: #{redis_url}"

# After Pageflow is configured, ensure it uses the same cache store
Pageflow.after_global_configure do |config|
  Rails.logger.info "✅ Pageflow story locks will use Redis-backed cache store"
end
