require 'resque'
require 'resque-scheduler'

# Configuration for Redis connection
redis_url = ENV.fetch('REDIS_URL', 'redis://localhost:6379/0')

# Configure Resque to use Redis with the new API
Resque.redis = Redis.new(url: redis_url)
