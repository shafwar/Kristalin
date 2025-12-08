#!/bin/bash

# Railway R2 Variables Setup Script
# Script untuk set semua R2 variables ke Railway service Kristalin

echo "🚀 Railway R2 Variables Setup Script"
echo "======================================"
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI tidak ditemukan!"
    echo "Install dengan: npm i -g @railway/cli"
    exit 1
fi

# Check if logged in
echo "📡 Checking Railway login status..."
if ! railway whoami &> /dev/null; then
    echo "⚠️  Belum login ke Railway"
    echo "Login dengan: railway login"
    exit 1
fi

echo "✅ Logged in sebagai: $(railway whoami)"
echo ""

# Confirm before proceeding
read -p "Apakah Anda yakin ingin set R2 variables ke Railway? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup dibatalkan"
    exit 1
fi

echo ""
echo "🔧 Setting R2 variables..."
echo ""

# Core Filesystem
echo "1. Setting FILESYSTEM_DISK..."
railway variables set FILESYSTEM_DISK=s3

# R2 Credentials
echo "2. Setting AWS_ACCESS_KEY_ID..."
railway variables set AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39

echo "3. Setting AWS_SECRET_ACCESS_KEY..."
railway variables set AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba

# R2 Configuration
echo "4. Setting AWS_DEFAULT_REGION..."
railway variables set AWS_DEFAULT_REGION=auto

echo "5. Setting AWS_BUCKET..."
railway variables set AWS_BUCKET=kristalin-assets

echo "6. Setting AWS_ENDPOINT..."
railway variables set AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com

echo "7. Setting AWS_USE_PATH_STYLE_ENDPOINT..."
railway variables set AWS_USE_PATH_STYLE_ENDPOINT=true

# R2 Public URL - Ask user preference
echo ""
echo "🌐 R2 Public URL Configuration"
echo "Pilih opsi untuk AWS_URL:"
echo "1. Custom Domain (cdn.kristalin.co.id) - Recommended"
echo "2. R2 Public URL (temporary)"
read -p "Pilih opsi (1/2): " url_option

if [ "$url_option" = "1" ]; then
    echo "8. Setting AWS_URL (Custom Domain)..."
    railway variables set AWS_URL=https://cdn.kristalin.co.id
    echo "✅ AWS_URL di-set ke Custom Domain"
else
    echo "8. Setting AWS_URL (R2 Public URL)..."
    railway variables set AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
    echo "✅ AWS_URL di-set ke R2 Public URL"
fi

echo ""
echo "✅ Semua R2 variables sudah di-set!"
echo ""

# Verify variables
echo "🔍 Verifying variables..."
echo ""
railway variables | grep -E "(FILESYSTEM_DISK|AWS_)" | head -10

echo ""
echo "📋 Next Steps:"
echo "1. Enable public access di R2 bucket (Cloudflare Dashboard)"
echo "2. Test koneksi: railway run php artisan r2:test"
echo "3. Migrate files: railway run php artisan r2:migrate"
echo "4. Deploy: railway up"
echo ""
echo "✅ Setup selesai!"


