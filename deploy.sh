#!/bin/bash

# Laravel + Inertia + React + Vite Production Deployment Script
# Optimized for Railway + Cloudflare

set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build assets for production
echo "🔨 Building assets for production..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ ! -f "public/build/manifest.json" ]; then
    echo "❌ ERROR: manifest.json not found in public/build/"
    echo "📁 Contents of public/build/:"
    ls -la public/build/ || echo "Directory does not exist"
    exit 1
fi

echo "📄 Manifest file found:"
head -5 public/build/manifest.json

# Copy manifest to expected location if needed
if [ ! -f "public/build/.vite/manifest.json" ]; then
    echo "📋 Copying manifest to .vite directory..."
    mkdir -p public/build/.vite
    cp public/build/manifest.json public/build/.vite/manifest.json
fi

# Set proper permissions
echo "🔐 Setting permissions..."
chmod -R 755 public/build/
chown -R www-data:www-data public/build/ 2>/dev/null || echo "⚠️  Could not set ownership (not running as root)"

# Clear Laravel caches
echo "🧹 Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Cache configurations for production
echo "⚡ Caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
echo "🗄️  Running migrations..."
php artisan migrate --force

echo "✅ Deployment completed successfully!"
echo "🌐 Assets should be available at: /build/assets/"
echo "📄 Manifest should be available at: /build/manifest.json"
