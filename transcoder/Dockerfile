FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# System-Abhängigkeiten & AMD VA-API Treiber
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    pkg-config \
    build-essential \
    # AMD/ATI Treiber für Hardware-Beschleunigung
    mesa-va-drivers \
    va-driver-all \
    vainfo \
    # FFmpeg mit VA-API Support
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --only=production && npm cache clean --force
COPY . .

RUN mkdir -p /tmp/transcoding && chmod 755 /tmp/transcoding

# VA-API Variablen für AMD setzen
ENV LIBVA_DRIVER_NAME=radeonsi
ENV DISPLAY=:0

EXPOSE 8080
CMD ["node", "server.js"]
