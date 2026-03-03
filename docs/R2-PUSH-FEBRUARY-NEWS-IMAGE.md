# Push gambar berita Februari ke R2

Gambar berita Februari 2026 harus ada di R2 agar tampil di production (kristalin.co.id).

## 1. february-news-01.jpg (artikel feb26-1)

Nama file tanpa spasi agar URL CDN tidak terpotong (ext .jpg tetap utuh).

- **Di code:** `image: 'february-news-01.jpg'`
- **URL CDN:** `{VITE_ASSET_BASE_URL}/public/february-news-01.jpg`
- **Key di R2:** `public/february-news-01.jpg`

### Push ke R2

```bash
php artisan r2:push-file "kristalin-assets/public/february-news-01.jpg"
```

File lokal: `public/kristalin-assets/public/february-news-01.jpg`

### Atau migrate semua

```bash
php artisan r2:migrate
```

---

## 2. News-february-2.jpg (artikel feb26-2 – Kisara Capital)

Nama file tanpa spasi agar URL CDN tidak terpotong.

- **Di code:** `image: 'News-february-2.jpg'`
- **URL CDN:** `{VITE_ASSET_BASE_URL}/public/News-february-2.jpg`
- **Key di R2:** `public/News-february-2.jpg`

### Push ke R2

```bash
php artisan r2:push-file "kristalin-assets/public/News-february-2.jpg"
```

File lokal: `public/kristalin-assets/public/News-february-2.jpg`

---

## Setelah push

Production akan memuat gambar lewat CDN, misalnya:
- `https://cdn.kristalin.co.id/public/february-news-01.jpg`
- `https://cdn.kristalin.co.id/public/News-february-2.jpg`
