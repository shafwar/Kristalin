# 🚀 R2 Quick Start Guide

## ✅ Setup Sudah Selesai!

Semua konfigurasi sudah dilakukan. Sekarang ikuti langkah-langkah berikut:

## 📋 Langkah 1: Enable Public Access di R2

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih **R2** → **kristalin-assets**
3. Buka tab **Settings**
4. Scroll ke **Public Access**
5. Klik **Connect Domain** (recommended) atau **Allow Access**

**Jika menggunakan Custom Domain:**
- Connect domain seperti `cdn.kristalin.co.id`
- Update `.env`: `AWS_URL="https://cdn.kristalin.co.id"`

**Jika menggunakan Public URL:**
- Klik **Allow Access**
- Update `.env`: `AWS_URL="https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets"`

## 📋 Langkah 2: Update .env

Tambahkan atau update di file `.env`:

```env
FILESYSTEM_DISK="s3"
AWS_URL="https://cdn.kristalin.co.id"  # atau R2 public URL
```

## 📋 Langkah 3: Test Koneksi

```bash
php artisan r2:test
```

Harus menunjukkan: ✅ All tests passed!

## 📋 Langkah 4: Migrate Files

```bash
# Preview dulu
php artisan r2:migrate --dry-run

# Migrate semua files
php artisan r2:migrate
```

Command akan mengupload **105 files** (images & videos) ke R2.

## 📋 Langkah 5: Update Railway

Tambahkan semua environment variables ini ke Railway:

```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39
AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba
AWS_DEFAULT_REGION=auto
AWS_BUCKET=kristalin-assets
AWS_URL=https://cdn.kristalin.co.id
AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com
AWS_USE_PATH_STYLE_ENDPOINT=true
```

## 📋 Langkah 6: Deploy

```bash
git add .
git commit -m "feat: migrate to Cloudflare R2"
git push
```

## ✅ Checklist

- [ ] Public access enabled di R2
- [ ] AWS_URL di-set di .env
- [ ] Test koneksi berhasil
- [ ] Files sudah dimigrate
- [ ] Railway environment variables sudah diupdate
- [ ] Deploy ke Railway
- [ ] Test images loading di production

## 🆘 Butuh Bantuan?

Lihat dokumentasi lengkap:
- `R2-SETUP-GUIDE.md` - Panduan lengkap
- `R2-MIGRATION-SUMMARY.md` - Ringkasan migration

---

**Status:** ✅ Ready to Migrate!



