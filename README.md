# Self-Hosted Pageflow CMS

**Complete AWS Independence for Pageflow CMS**

A fully self-hosted deployment of [Pageflow CMS](https://pageflow.io/) that eliminates the need for AWS services and subscriptions. This project replaces AWS S3 with MinIO object storage and Zencoder with a custom GPU-accelerated transcoder, providing a self-contained proof-of-concept solution.

![Project Status](https://img.shields.io/badge/Status-Proof%20of%20Concept-blue)
![Docker](https://img.shields.io/badge/Docker-Required-blue)
![GPU](https://img.shields.io/badge/GPU-NVIDIA%20Supported-76b900)
![AWS](https://img.shields.io/badge/AWS-Independent-red)

## **Why This Project Exists**

Pageflow CMS is an excellent platform for creating multimedia stories, but it traditionally requires:
- **AWS S3** for file storage (ongoing costs)
- **Zencoder** for video transcoding (subscription required)
- **External hosting** with complex configuration

This project **completely eliminates those dependencies**, providing:
- **Zero AWS costs** - Self-hosted MinIO replaces S3
- **No subscriptions** - Custom transcoder replaces Zencoder  
- **Full control** - Everything runs on your infrastructure

## **Architecture Overview**

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Pageflow      │    │    MinIO     │    │   Custom        │
│   Rails App     │◄───┤  S3 Storage  │◄───┤  Transcoder     │
│   (Port 3000)   │    │ (Replaces    │    │ (Replaces       │
└─────────────────┘    │  AWS S3)     │    │  Zencoder)      │
         │             └──────────────┘    └─────────────────┘
         ▼                       │                      │
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│     MySQL       │    │    Redis     │    │   Background    │
│   Database      │    │   Cache      │    │    Workers      │
│   (Internal)    │    │  (Internal)  │    │   (Resque)      │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

## **Key AWS Decoupling Modifications**

### **MinIO S3 Replacement**
- **Custom Rails Initializers**: 
  - `pageflow/config/initializers/pageflow.rb` - S3 configuration pointing to MinIO
  - `pageflow/config/initializers/minio_setup.rb` - Automatic bucket creation and permissions
- **Bucket Management**: Automatic creation of required buckets (`pageflow-main`, `pageflow-output`)
- **Presigned URLs**: Browser direct uploads using MinIO-compatible presigned POST URLs
- **Public Access**: Proper bucket policies for media serving

### **Zencoder API Replacement**
- **API Interception**: 
  - `pageflow/config/initializers/pageflow.rb` - Redirects Zencoder gem to custom service (lines 4-5, 172-177)
  - `pageflow/config/initializers/zencoder_http_urls.rb` - URL conversion for MinIO compatibility
- **Custom Transcoder**: Node.js service with GPU acceleration using FFmpeg
- **Zencoder Compatibility**: Drop-in replacement maintaining full API compatibility
- **Error Handling**: `pageflow/config/initializers/video_file_post_processing_fix.rb` - Graceful thumbnail handling

## **Quick Start**

### **Prerequisites**
- Docker & Docker Compose (latest versions)
- 8GB+ RAM, SSD storage recommended  
- Optional: NVIDIA GPU for faster transcoding

### **1. Complete Installation**

```bash
# Clone the repository
git clone https://github.com/your-org/self-hosted-pageflow.git
cd self-hosted-pageflow

# One-command setup (handles everything automatically)
./scripts/setup.sh

# Create your first admin user
./scripts/manage.sh create-admin
```

### **2. Access Your CMS**

- **Pageflow CMS**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin  
- **MinIO Console**: http://localhost:9001 (minioadmin/minioadmin123)

**That's it!** You now have a fully functional Pageflow CMS with zero AWS dependencies!

## **Configuration**

### **Environment Variables**
The `.env` file is automatically generated with secure defaults. Key settings:

```bash
# Security (auto-generated)
SECRET_KEY_BASE=your-secure-key
SYMMETRIC_ENC_KEY=auto-generated
SYMMETRIC_ENC_IV=auto-generated

# MinIO (replace AWS S3)  
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin123
S3_BUCKET=pageflow-main
S3_OUTPUT_BUCKET=pageflow-output

# Custom Transcoder (replace Zencoder)
TRANSCODER_SERVICE_KEY=pageflow-transcoder
TRANSCODER_BASE_URL=http://pageflow_transcoder:8080
GPU_ACCELERATION=true
MAX_CONCURRENT_JOBS=4
```

### **Port Configuration**
Default ports (automatically adjusted if conflicts detected):
- `3000` - Pageflow web interface
- `9000` - MinIO S3 API  
- `9001` - MinIO admin console

## **Deployment Considerations**

### **Reverse Proxy Support**
This project focuses on the core CMS functionality. For HTTPS/SSL deployment:

- **Recommended**: Use nginx-proxy-manager, Traefik, or similar
- **Network Setup**: Configure Docker network bridges as needed
- **Out of Scope**: This project doesn't include reverse proxy configuration

### **Security Hardening**
```bash
# Change default credentials in .env
AWS_ACCESS_KEY_ID=your-strong-key
AWS_SECRET_ACCESS_KEY=your-strong-secret

# Regenerate security keys
./scripts/setup.sh  # Generates new keys automatically

# Firewall recommendations
# Only expose: 80, 443 (via reverse proxy)
# Keep internal: 3000, 9000, 9001
```

## **Development & Maintenance**

### **Core Management**
```bash
# Service control
docker compose up -d      # Start services
docker compose down       # Stop services
docker compose logs -f    # Monitor logs

# Admin management  
./scripts/manage.sh create-admin    # Create additional admins

# System maintenance
./scripts/manage.sh cleanup         # Clean reset (removes all data)
```

### **Debugging & Monitoring**
```bash
# Health checks
curl http://localhost:3000/health
curl http://localhost:9000/minio/health/live

# Service logs
docker logs pageflow_app -f
docker logs pageflow_transcoder -f
docker logs pageflow_minio -f

# Resource usage
docker stats
```

## **Troubleshooting**

### **Common Issues**
1. **Upload Failures**: Check MinIO service health and bucket permissions
2. **Transcoding Errors**: Verify GPU drivers if using acceleration
3. **Network Issues**: Ensure Docker network connectivity between services

### **Debug Steps**
```bash
# 1. Check service status
docker compose ps

# 2. Test S3 connectivity (Rails console)
docker exec -it pageflow_app bundle exec rails console
# > s3_client = Aws::S3::Client.new(endpoint: ENV['S3_ENDPOINT_INTERNAL'], ...)
# > s3_client.list_buckets

# 3. Verify transcoder health
curl http://localhost:8080/health

# 4. Clean restart if needed
docker compose down && docker compose up -d
```

### **Container Architecture**
- **pageflow**: Main Rails application with custom initializers
- **pageflow_minio**: S3-compatible storage (replaces AWS S3)
- **pageflow_transcoder**: Custom video processing (replaces Zencoder)
- **pageflow_mysql**: Database with Pageflow-optimized configuration
- **pageflow_redis**: Cache and job queue
- **pageflow_worker**: Background job processing
- **pageflow_scheduler**: Periodic task management

## **License**

This project is released under the MIT License, the same license as Pageflow CMS.

This project packages Pageflow CMS with custom integrations for AWS independence. Both Pageflow and this project's integration code are available under the MIT License.
