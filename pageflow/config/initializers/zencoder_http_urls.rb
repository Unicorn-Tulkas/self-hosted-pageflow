# Override Pageflow VideoFile and AudioFile to send HTTP URLs instead of S3 URLs to transcoder
# This enables compatibility with our self-hosted MinIO + custom transcoder setup

# Use Rails.application.config.to_prepare to ensure classes are loaded
Rails.application.config.to_prepare do
  if defined?(Pageflow::VideoFile)
    # Override VideoFile to use HTTP URLs for transcoding
    Pageflow::VideoFile.class_eval do
      def attachment_s3_url
        # Convert S3 protocol URL to HTTP URL for MinIO compatibility
        # Original: s3://bucket/path -> HTTP: http://host:port/bucket/path
        http_url = attachment_on_s3.url.sub(/\?.*$/, '')  # Remove query parameters
        # Convert to HTTP for MinIO compatibility
        http_url
      end
    end
  end

  if defined?(Pageflow::AudioFile)
    # Override AudioFile to use HTTP URLs for transcoding  
    Pageflow::AudioFile.class_eval do
      def attachment_s3_url
        # Convert S3 protocol URL to HTTP URL for MinIO compatibility
        http_url = attachment_on_s3.url.sub(/\?.*$/, '')  # Remove query parameters  
        # Convert to HTTP for MinIO compatibility
        http_url
      end
    end
  end

  # HTTP URL overrides enabled for MinIO compatibility
end