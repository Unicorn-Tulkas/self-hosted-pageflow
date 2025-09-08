# Fix for VideoFile#post_process_encoded_files to handle missing thumbnails gracefully
# 
# Issue: The original method expects thumbnail/poster images to exist after transcoding,
# but our custom transcoder only generates video files. When these images are missing,
# the method throws :halt, :pending which prevents state transitions to 'encoded'.
#
# Solution: Catch HTTP errors and continue without thumbnails, allowing proper completion.
# 
# TODO: Implement thumbnail generation in custom transcoder for complete Zencoder compatibility

Rails.application.config.after_initialize do
  Pageflow::VideoFile.class_eval do
    def post_process_encoded_files
      # Attempt to download thumbnail image
      begin
        self.thumbnail = URI.parse(zencoder_thumbnail.url(default_protocol: 'https'))
      rescue OpenURI::HTTPError => e
        Rails.logger.warn "Thumbnail not found for VideoFile #{id}: #{e.message}"
        # Continue gracefully without thumbnail - don't halt the job
      end

      # Attempt to download poster image  
      begin
        self.poster = URI.parse(zencoder_poster.url(default_protocol: 'https'))
      rescue OpenURI::HTTPError => e
        Rails.logger.warn "Poster not found for VideoFile #{id}: #{e.message}"
        # Continue gracefully without poster - don't halt the job
      end
      
      # Method completes successfully even if images are missing
    end
  end
end