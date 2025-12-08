# 🚀 Cloudflare R2 Setup Guide

Panduan lengkap untuk mengkonfigurasi Cloudflare R2 sebagai storage untuk aplikasi Laravel Kristalin.

## ✅ Status Setup

- ✅ R2 bucket dibuat: `kristalin-assets`
- ✅ Konfigurasi Laravel sudah diupdate
- ✅ Controllers sudah menggunakan disk `s3` (R2)
- ✅ Helper functions sudah dibuat
- ✅ Migration command sudah tersedia

## 📋 Prerequisites

1. Cloudflare R2 bucket sudah dibuat
2. R2 API Token sudah dibuat dengan permissions:
   - Object Read & Write
   - Object List

## 🔧 Konfigurasi Environment Variables

### Local (.env)

Tambahkan atau update variabel berikut di file `.env`:

```env
FILESYSTEM_DISK="s3"

AWS_ACCESS_KEY_ID="ef66a19f154154dad000e5864bafdb39"
AWS_SECRET_ACCESS_KEY="e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba"
AWS_DEFAULT_REGION="auto"
AWS_BUCKET="kristalin-assets"
AWS_URL=
AWS_ENDPOINT="https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com"
AWS_USE_PATH_STYLE_ENDPOINT="true"
```

### Railway Deployment

Tambahkan semua environment variables di atas ke Railway dashboard:

1. Buka Railway project
2. Pilih service
3. Buka tab **Variables**
4. Tambahkan semua variabel di atas

**Catatan:** Set `FILESYSTEM_DISK="s3"` untuk production.

## 🌐 Mengaktifkan Public Access di R2

Untuk mengakses file secara publik, Anda perlu mengaktifkan public access:

### Opsi 1: Custom Domain (Recommended)

1. Buka Cloudflare Dashboard → R2 → `kristalin-assets`
2. Buka tab **Settings**
3. Scroll ke **Public Access**
4. Klik **Connect Domain**
5. Pilih domain yang ingin digunakan (misalnya: `cdn.kristalin.co.id`)
6. Setelah terhubung, update `AWS_URL` di `.env`:
   ```env
   AWS_URL="https://cdn.kristalin.co.id"
   ```

### Opsi 2: R2 Public URL (Temporary)

Jika belum punya custom domain, Anda bisa menggunakan R2 public URL:

1. Buka Cloudflare Dashboard → R2 → `kristalin-assets`
2. Buka tab **Settings**
3. Scroll ke **Public Access**
4. Klik **Allow Access** (ini akan membuat bucket publicly accessible)
5. Update `AWS_URL` di `.env`:
   ```env
   AWS_URL="https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets"
   ```

**⚠️ Peringatan:** Opsi 2 membuat semua file di bucket publicly accessible. Gunakan custom domain untuk keamanan yang lebih baik.

## 📤 Migrasi File ke R2

### 1. Test Koneksi R2

```bash
php artisan r2:test
```

Command ini akan:
- ✅ Test koneksi ke R2
- ✅ Test read/write operations
- ✅ List files di bucket

### 2. Dry Run (Preview)

Sebelum migrasi, lihat dulu file apa saja yang akan diupload:

```bash
php artisan r2:migrate --dry-run
```

### 3. Migrasi File

Upload semua gambar dan video dari folder `public` ke R2:

```bash
php artisan r2:migrate
```

Command ini akan:
- ✅ Scan semua file gambar/video di folder `public`
- ✅ Upload ke R2 dengan struktur path yang sama
- ✅ Skip file yang sudah ada
- ✅ Show progress bar dan summary

### 4. Verifikasi

Setelah migrasi, verifikasi file sudah terupload:

```bash
php artisan r2:test
```

## 🔄 Update Code untuk Menggunakan R2

### Helper Functions

Tersedia helper functions untuk generate URL:

```php
// Generate URL dari R2
$url = r2_url('kristalinlogotransisi1.png');
// Output: https://cdn.kristalin.co.id/kristalinlogotransisi1.png

// Atau gunakan helper universal
$url = image_url('kristalinlogotransisi1.png');
// Otomatis menggunakan R2 jika FILESYSTEM_DISK=s3
```

### Di Blade Templates

```blade
{{-- Menggunakan helper --}}
<img src="{{ r2_url('kristalinlogotransisi1.png') }}" alt="Logo">

{{-- Atau menggunakan Storage facade --}}
<img src="{{ Storage::disk('s3')->url('kristalinlogotransisi1.png') }}" alt="Logo">
```

### Di React/Inertia Components

File di React masih menggunakan path relatif (`/image.jpg`). Untuk menggunakan R2, Anda perlu:

1. **Opsi 1:** Update semua path di React components ke full URL dari backend
2. **Opsi 2:** Buat API endpoint yang return image URLs
3. **Opsi 3:** Gunakan proxy route di Laravel untuk serve images dari R2

**Rekomendasi:** Opsi 3 - Buat route proxy untuk serve images:

```php
// routes/web.php
Route::get('/images/{path}', function ($path) {
    return redirect(Storage::disk('s3')->url($path));
})->where('path', '.*');
```

Dengan ini, semua path `/images/kristalinlogotransisi1.png` akan redirect ke R2 URL.

## 🚀 Railway Deployment Checklist

### Pre-Deployment

- [ ] Test koneksi R2 lokal: `php artisan r2:test`
- [ ] Migrate files ke R2: `php artisan r2:migrate`
- [ ] Verifikasi files sudah terupload
- [ ] Enable public access di R2 (custom domain atau public URL)
- [ ] Update `AWS_URL` di Railway environment variables

### Railway Environment Variables

Pastikan semua variabel ini ada di Railway:

```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39
AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba
AWS_DEFAULT_REGION=auto
AWS_BUCKET=kristalin-assets
AWS_URL=https://cdn.kristalin.co.id  # atau R2 public URL
AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com
AWS_USE_PATH_STYLE_ENDPOINT=true
```

### Post-Deployment

- [ ] Test koneksi R2 di production: `php artisan r2:test`
- [ ] Verifikasi images loading dari R2
- [ ] Check browser console untuk error 404
- [ ] Monitor R2 usage di Cloudflare dashboard

## 🔍 Troubleshooting

### Error: "Access Denied"

**Penyebab:** R2 credentials salah atau bucket tidak accessible.

**Solusi:**
1. Check `AWS_ACCESS_KEY_ID` dan `AWS_SECRET_ACCESS_KEY`
2. Pastikan R2 API token memiliki permissions yang benar
3. Test dengan: `php artisan r2:test`

### Error: "File not found" di browser

**Penyebab:** Public access belum diaktifkan atau `AWS_URL` salah.

**Solusi:**
1. Enable public access di R2 dashboard
2. Set `AWS_URL` dengan benar
3. Clear config cache: `php artisan config:clear`

### Images tidak loading setelah deploy

**Penyebab:** Environment variables belum diupdate di Railway.

**Solusi:**
1. Check Railway environment variables
2. Pastikan `FILESYSTEM_DISK=s3`
3. Redeploy aplikasi setelah update variables

## 📊 Monitoring

### Cloudflare R2 Dashboard

Monitor usage di:
- **Cloudflare Dashboard** → **R2** → **kristalin-assets** → **Analytics**

### Metrics to Watch

- **Storage Used:** Total storage yang digunakan
- **Class A Operations:** Read operations (free tier: 1M/month)
- **Class B Operations:** Write operations (free tier: 10M/month)

## 🎯 Best Practices

1. **Gunakan Custom Domain:** Lebih aman dan professional
2. **Enable CDN:** Cloudflare CDN akan cache files secara otomatis
3. **Optimize Images:** Compress images sebelum upload untuk mengurangi storage
4. **Monitor Usage:** Check R2 dashboard secara berkala
5. **Backup:** Keep backup files di local untuk safety

## 📚 Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Laravel Filesystem Documentation](https://laravel.com/docs/filesystem)
- [AWS S3 Compatibility](https://developers.cloudflare.com/r2/api/s3/api/)

## ✅ Checklist Final

- [ ] R2 bucket dibuat dan configured
- [ ] Environment variables diupdate (local & Railway)
- [ ] Public access diaktifkan
- [ ] Files dimigrate ke R2
- [ ] Koneksi R2 tested dan working
- [ ] Images loading dari R2 di production
- [ ] Monitoring setup

---

**Last Updated:** December 2024
**Status:** ✅ Ready for Production


