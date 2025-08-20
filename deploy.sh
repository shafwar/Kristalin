#!/bin/bash

# Laravel + Inertia + React + Vite Production Deployment Script
# Optimized for Railway + Cloudflare

set -e

# Force rebuild and ensure manifest is in correct location
echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build assets for production
echo "🔨 Building assets for production..."
npm run build

# Copy manifest to correct location
echo "📋 Copying manifest to correct location..."
cp public/build/.vite/manifest.json public/build/manifest.json

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

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 public/build/
chown -R www-data:www-data public/build/ 2>/dev/null || echo "⚠️  Could not set ownership (this is normal in some environments)"

# Clear Laravel caches
echo "🧹 Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should now be accessible at: https://kristalin.co.id"
echo "📝 Remember to set ASSET_URL=https://kristalin.co.id/build in production"
