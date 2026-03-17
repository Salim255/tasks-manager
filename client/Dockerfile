#######################################################################
# 1. BUILD STAGE
# ---------------------------------------------------------------------
# This stage installs dependencies and builds the Vite React app.
# We use Node 20 Alpine for:
# - small image size
# - fast installs
# - reproducible builds
#######################################################################
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy only package.json + package-lock.json first
# ---------------------------------------------------------------------
# WHY:
# - Docker caches this layer
# - If dependencies don't change, this step is reused
COPY package*.json ./

# Install dependencies
# ---------------------------------------------------------------------
# npm ci:
# - clean install
# - reproducible builds
# - faster than npm install
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Vite app
# ---------------------------------------------------------------------
# Output goes to /app/dist
RUN npm run build



#######################################################################
# 2. RUNTIME STAGE (NGINX)
# ---------------------------------------------------------------------
# This stage serves the built static files using Nginx.
# WHY NGINX:
# - extremely fast static file serving
# - HTTP/2 support
# - caching, compression, security headers
#######################################################################
FROM nginx:1.27-alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional but recommended)
# ---------------------------------------------------------------------
# You can create nginx.conf next to your Dockerfile.
# If you don't have one, Nginx will use its default config.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
