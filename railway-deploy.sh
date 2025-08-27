#!/bin/bash

echo "🚀 Railway Deployment Script - Fix 404 JavaScript Files"

# Step 1: Clean and rebuild
echo "🧹 Cleaning old build..."
rm -rf public/build

echo "🔨 Building fresh assets..."
npm run build

# Step 2: Verify critical files exist
echo "🔍 Verifying critical files..."
if [ ! -f "public/build/assets/app-Bl3lDIQn.js" ]; then
    echo "❌ ERROR: app-Bl3lDIQn.js not found!"
    exit 1
fi

if [ ! -f "public/build/assets/welcome-D5GSggN9.js" ]; then
    echo "❌ ERROR: welcome-D5GSggN9.js not found!"
    exit 1
fi

if [ ! -f "public/build/assets/Footer-DKXqWl-J.js" ]; then
    echo "❌ ERROR: Footer-DKXqWl-J.js not found!"
    exit 1
fi

echo "✅ All critical files found!"

# Step 3: Check manifest.json
echo "📋 Checking manifest.json..."
if [ ! -f "public/build/manifest.json" ]; then
    echo "❌ ERROR: manifest.json not found!"
    exit 1
fi

echo "✅ manifest.json found!"

# Step 4: Commit and push
echo "📤 Committing and pushing..."
git add -f public/build/
git commit -m "🔧 BUILD: Fresh assets for Railway deployment"
git push origin main

echo "✅ Deployment triggered!"
echo "🎯 Monitor Railway dashboard for deployment status"
echo "🔍 Check https://kristalin.co.id after deployment completes"
