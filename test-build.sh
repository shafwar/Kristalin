#!/bin/bash

echo "🧪 Testing Build Process Locally..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clear previous build
echo "🧹 Clearing previous build..."
rm -rf public/build
rm -rf node_modules/.vite

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build assets
echo "🔨 Building assets..."
npm run build

# Check if build was successful
if [ ! -f "public/build/manifest.json" ]; then
    echo "❌ Error: Build failed - manifest.json not found"
    exit 1
fi

# Check if key files exist
echo "🔍 Checking build output..."
if [ -f "public/build/assets/app-Bl3lDIQn.js" ]; then
    echo "✅ app-Bl3lDIQn.js found"
else
    echo "❌ app-Bl3lDIQn.js not found"
fi

if [ -f "public/build/assets/Footer-DKXqWl-J.js" ]; then
    echo "✅ Footer-DKXqWl-J.js found"
else
    echo "❌ Footer-DKXqWl-J.js not found"
fi

if [ -f "public/build/assets/welcome-D5GSggN9.js" ]; then
    echo "✅ welcome-D5GSggN9.js found"
else
    echo "❌ welcome-D5GSggN9.js not found"
fi

if [ -f "public/build/assets/app-2l3IDstY.css" ]; then
    echo "✅ app-2l3IDstY.css found"
else
    echo "❌ app-2l3IDstY.css not found"
fi

# Show manifest content
echo "📋 Manifest.json content:"
head -20 public/build/manifest.json

echo ""
echo "✅ Local build test completed!"
echo "🚀 Ready to deploy to Railway!"
