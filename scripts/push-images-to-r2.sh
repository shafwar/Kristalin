#!/usr/bin/env bash
# Push gambar berita (rute gambar) ke R2 agar CDN https://cdn.kristalin.co.id/public/... berfungsi.
# Jalankan dari root project: ./scripts/push-images-to-r2.sh
# Pastikan .env sudah ada AWS_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT (R2).

set -e
cd "$(dirname "$0")/.."

echo "=== Push gambar ke R2 (rute: public/... di bucket) ==="
echo ""

# Gambar berita Februari 2026
php artisan r2:push-file "kristalin-assets/public/february-news-01.jpg"
php artisan r2:push-file "kristalin-assets/public/News-february-2.jpg"
php artisan r2:push-file "kristalin-assets/public/news-3-february.jpg"
php artisan r2:push-file "kristalin-assets/public/news-4-february.jpg"
php artisan r2:push-file "kristalin-assets/public/maret-news-1.jpeg"

echo ""
echo "=== Selesai. URL CDN yang dipakai: ==="
echo "  https://cdn.kristalin.co.id/public/february-news-01.jpg"
echo "  https://cdn.kristalin.co.id/public/News-february-2.jpg"
echo "  https://cdn.kristalin.co.id/public/news-3-february.jpg"
echo "  https://cdn.kristalin.co.id/public/news-4-february.jpg"
echo "  https://cdn.kristalin.co.id/public/maret-news-1.jpeg"
echo ""
echo "Cek di browser atau: curl -I https://cdn.kristalin.co.id/public/february-news-01.jpg"
