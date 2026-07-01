FROM ruby:3.2.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential git curl pkg-config \
    default-libmysqlclient-dev \
    imagemagick ffmpeg \
    libyaml-dev \
    libvips libvips-dev \
    libxml2-dev libxslt1-dev \
    netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get update && apt-get install -y nodejs \
 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Create pageflow user
RUN useradd -m -s /bin/bash pageflow && \
    chown -R pageflow:pageflow /app

# Copy application code first (includes docker-entrypoint.sh)
COPY --chown=pageflow:pageflow . .

# Copy Gemfile for bundle install (after copying app code)
COPY --chown=pageflow:pageflow Gemfile* ./

# Install gems as root to system location
# Use production environment to skip development gems
RUN bundle config set --global path '/usr/local/bundle' && \
    bundle install --jobs 4 --retry 3 --without development test && \
    chown -R pageflow:pageflow /usr/local/bundle

# Create directories and set permissions
RUN mkdir -p storage log tmp/pids tmp/cache tmp/sockets public/assets && \
    chown -R pageflow:pageflow storage log tmp public && \
    chmod +x docker-entrypoint.sh

# Switch to pageflow user
USER pageflow

# Set up bundle configuration
ENV BUNDLE_PATH=/usr/local/bundle
ENV PATH=/usr/local/bundle/bin:$PATH

# Expose port
EXPOSE 3000

# Entrypoint
CMD ["./docker-entrypoint.sh"]
