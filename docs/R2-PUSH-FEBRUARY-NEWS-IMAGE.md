# Push gambar Februari (february news 01.jpg) ke R2

Gambar berita Februari 2026 (`february news 01.jpg`) harus ada di R2 agar tampil di production (kristalin.co.id).

## Pola URL (konsisten dengan gambar lain)

- **Di code:** `image: 'february news 01.jpg'` (sama seperti `'metronews_desember.jpeg'`, `'sept1.jpg'`, dll.)
- **imageUrl()** menghasilkan: `{VITE_ASSET_BASE_URL}/public/february%20news%2001.jpg`  
  (bila `VITE_ASSET_BASE_URL` kosong: `/images/public/february%20news%2001.jpg` → proxy Laravel ke R2)
- **Key di R2:** `public/february news 01.jpg` (sama seperti aset lain di `public/`)

## Cara push ke R2

Lakukan di lingkungan yang sudah pakai R2 (`FILESYSTEM_DISK=s3`), misalnya **Railway** atau lokal dengan `.env` R2.

### Opsi 1: Push satu file (disarankan)

```bash
php artisan r2:push-file "kristalin-assets/public/february news 01.jpg"
```

File lokal: `public/kristalin-assets/public/february news 01.jpg`  
Upload ke R2 dengan key: `public/february news 01.jpg`

### Opsi 2: Migrate semua file (termasuk yang baru)

```bash
php artisan r2:migrate
```

File yang sudah ada di R2 akan di-skip; hanya file baru (termasuk `february news 01.jpg`) yang di-upload.

## Setelah push

- Production (kristalin.co.id) akan mengambil gambar lewat:
  - **AWS_URL / CDN:** `https://cdn.kristalin.co.id/public/february%20news%2001.jpg`
  - atau **Proxy:** `https://kristalin.co.id/images/public/february%20news%2001.jpg` → redirect ke R2

Tidak perlu ubah code; path di frontend sudah memakai pola yang sama dengan gambar berita lainnya.
