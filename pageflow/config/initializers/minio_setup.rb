# MinIO Bucket Initialization
# This initializer ensures required S3 buckets exist and have correct permissions
# Runs after Rails application starts up

Rails.application.config.after_initialize do
  # Only run in production/development, skip in test
  next if Rails.env.test?
  
  begin
    # Get S3 configuration from Pageflow
    s3_credentials = Pageflow.config.paperclip_s3_default_options[:s3_credentials]
    s3_options = Pageflow.config.paperclip_s3_default_options[:s3_options]
    
    # Create S3 client using internal endpoint
    require 'aws-sdk-s3'
    s3_client = Aws::S3::Client.new(
      endpoint: s3_options[:endpoint],
      access_key_id: s3_credentials[:access_key_id],
      secret_access_key: s3_credentials[:secret_access_key],
      region: Pageflow.config.paperclip_s3_default_options[:s3_region],
      force_path_style: s3_options[:force_path_style]
    )
    
    # List of required buckets
    required_buckets = [
      ENV.fetch('S3_BUCKET', 'pageflow-main'),
      ENV.fetch('S3_OUTPUT_BUCKET', 'pageflow-output')
    ]
    
    required_buckets.each do |bucket_name|
      begin
        # Check if bucket exists
        s3_client.head_bucket(bucket: bucket_name)
        Rails.logger.info "✅ MinIO bucket '#{bucket_name}' already exists"
      rescue Aws::S3::Errors::NotFound, Aws::S3::Errors::NoSuchBucket
        # Create bucket if it doesn't exist
        begin
          s3_client.create_bucket(bucket: bucket_name)
          Rails.logger.info "✅ MinIO bucket '#{bucket_name}' created successfully"
          
          # Set public read policy for the bucket
          s3_client.put_bucket_policy(
            bucket: bucket_name,
            policy: {
              Version: '2012-10-17',
              Statement: [
                {
                  Effect: 'Allow',
                  Principal: '*',
                  Action: ['s3:GetObject'],
                  Resource: "arn:aws:s3:::#{bucket_name}/*"
                },
                {
                  Effect: 'Allow',
                  Principal: '*',
                  Action: ['s3:PutObject'],
                  Resource: "arn:aws:s3:::#{bucket_name}/*"
                }
              ]
            }.to_json
          )
          Rails.logger.info "✅ MinIO bucket '#{bucket_name}' permissions set to public"
        rescue => create_error
          Rails.logger.error "❌ Failed to create MinIO bucket '#{bucket_name}': #{create_error.message}"
        end
      rescue => check_error
        Rails.logger.error "❌ Failed to check MinIO bucket '#{bucket_name}': #{check_error.message}"
      end
    end
    
  rescue => e
    Rails.logger.error "❌ MinIO bucket initialization failed: #{e.message}"
    Rails.logger.error "This may cause file upload issues. Check MinIO configuration."
  end
end