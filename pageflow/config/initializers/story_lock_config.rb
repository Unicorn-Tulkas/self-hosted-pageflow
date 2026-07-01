# Configure Pageflow to use Redis for story locks instead of file-based locks
# This fixes the "opened in another window" error in multi-container setups
#
# In containerized environments with multiple processes (pageflow_app, pageflow_worker),
# file-based locks cannot be properly synchronized across containers. Using Redis
# ensures all containers share the same lock state.

if defined?(Pageflow)
  Pageflow.configure do |config|
    # Use Redis as the cache store for entry locks (story locks)
    # This replaces the default file-based locking mechanism
    redis_url = ENV.fetch('REDIS_URL', 'redis://pageflow_redis:6379/0')
    
    config.cache_store = :redis_store, { url: redis_url }
    
    Rails.logger.info "🔐 Pageflow story locks configured to use Redis: #{redis_url}"
  end
end
