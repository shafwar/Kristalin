#!/bin/bash
set -e

echo "🚀 Starting Vite build process..."

# Install dependencies
echo "📦 Installing npm dependencies..."
npm ci

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/build/

# Build assets
echo "🔨 Building Vite assets..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ ! -f "public/build/.vite/manifest.json" ]; then
    echo "❌ ERROR: .vite/manifest.json not found!"
    ls -la public/build/ || echo "Build directory does not exist"
    exit 1
fi

# Copy manifest to Laravel expected location
echo "📋 Copying manifest to Laravel expected location..."
cp public/build/.vite/manifest.json public/build/manifest.json

# Verify final manifest
echo "✅ Verifying final manifest..."
if [ ! -f "public/build/manifest.json" ]; then
    echo "❌ ERROR: manifest.json not found in public/build/"
    exit 1
fi

echo "📄 Manifest content preview:"
head -5 public/build/manifest.json

echo "📁 Build directory contents:"
ls -la public/build/

echo "🎉 Vite build completed successfully!"
