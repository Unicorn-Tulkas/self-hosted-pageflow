FROM nvidia/cuda:12.4.0-devel-ubuntu22.04

# Avoid interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    software-properties-common \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Intel Media SDK and VA-API for Intel GPU support (optional)
RUN apt-get update && apt-get install -y \
    intel-media-va-driver-non-free \
    vainfo \
    intel-gpu-tools \
    && rm -rf /var/lib/apt/lists/* || true

# Install FFmpeg with hardware acceleration support
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package.json first for dependency installation
COPY package.json ./

# Install Node.js dependencies
RUN npm install --only=production && npm cache clean --force

# Copy rest of application code
COPY . .

# Create temp directory for transcoding
RUN mkdir -p /tmp/transcoding && chmod 755 /tmp/transcoding

# Set GPU environment variables (will be ignored if no GPU)
ENV NVIDIA_VISIBLE_DEVICES=all
ENV NVIDIA_DRIVER_CAPABILITIES=compute,video,utility

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Expose port
EXPOSE 8080

# Run the transcoding service
CMD ["node", "server.js"]