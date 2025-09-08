# Self-Hosted Pageflow Application Configuration
# 
# This Rails application provides a self-hosted version of Pageflow CMS
# with integrated media transcoding and S3-compatible storage (MinIO).
# 
# Key Features:
# - Multimedia storytelling CMS with Pageflow engine
# - Custom FFmpeg transcoder for video processing
# - MinIO S3-compatible storage for media files
# - Docker-based deployment with Redis and MySQL
# - ActiveAdmin interface for content management
# - Resque background job processing

require_relative "boot"
require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SelfHostedPageflow
  class Application < Rails::Application
    # === INTERNATIONALIZATION ===
    # Set default locale from environment variable (configurable per deployment)
    config.i18n.default_locale = ENV.fetch('DEFAULT_LOCALE', 'en').to_sym
    
    # Required for i18n-js gem to work with asset precompilation
    config.assets.initialize_on_precompile = true

    # === RAILS CONFIGURATION ===
    # Initialize configuration defaults for originally generated Rails version
    config.load_defaults 7.1
    
    # === BACKGROUND JOBS ===
    # Use Resque with Redis for background job processing
    # Handles media transcoding, file processing, and other async tasks
    config.active_job.queue_adapter = :resque

    # === AUTOLOADING ===
    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`.
    config.autoload_lib(ignore: %w(assets tasks))

    # === ENVIRONMENT-SPECIFIC CONFIGURATION ===
    # Configuration for the application, engines, and railties goes here.
    # These settings can be overridden in specific environments using the files
    # in config/environments/, which are processed later.
    #
    # Examples:
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # === GENERATORS ===
    # Don't generate system test files (using Docker-based testing instead)
    config.generators.system_tests = nil
  end
end
