# Safety Deployment – Kristalin

Panduan singkat untuk deploy dengan aman ke production (kristalin.co.id).

---

## Sebelum deploy

1. **Build frontend**
   ```bash
   npm ci
   npm run build
   ```
   Pastikan build sukses tanpa error.

2. **Env production (Railway / server)**
   - `VITE_ASSET_BASE_URL` boleh kosong atau `https://cdn.kristalin.co.id` — kode sekarang **selalu** memakai CDN untuk gambar (`https://cdn.kristalin.co.id/public/...`).
   - Jangan set `VITE_ASSET_BASE_URL=https://kristalin.co.id/images` — itu menghasilkan URL salah (`/images/public/...`).

3. **Gambar di R2**
   - Semua gambar yang dipakai di site harus ada di R2 dengan key `public/<namafile>`.
   - Contoh: `public/february-news-01.jpg`, `public/506paket1.jpg`.
   - Lihat **IMAGE-IMPLEMENTATION-GUIDE.md** dan **R2-PUSH-FEBRUARY-NEWS-IMAGE.md**.

---

## Setelah deploy

1. **Cek URL gambar**
   - Buka salah satu halaman berita (mis. `/news/feb26-1`).
   - Di DevTools → Elements, pastikan `src` gambar berbentuk:
     - `https://cdn.kristalin.co.id/public/<namafile>`
   - Bukan: `https://kristalin.co.id/images/public/...`

2. **Hard refresh**
   - Ctrl+Shift+R (atau Cmd+Shift+R) agar cache browser tidak pakai asset lama.

3. **Verifikasi R2**
   ```bash
   php artisan r2:test
   ```
   Pastikan file yang dipakai ada di bucket.

---

## Rollback

Jika ada masalah setelah deploy:

1. Revert commit terakhir dan push, atau
2. Deploy ulang commit sebelumnya dari dashboard Railway/Git.

---

## Ringkasan

| Item              | Nilai / tindakan                                      |
|-------------------|--------------------------------------------------------|
| URL gambar        | Selalu `https://cdn.kristalin.co.id/public/namafile`  |
| Build             | `npm run build` sukses                                |
| R2                | File ada di key `public/...`                           |
| Setelah deploy    | Cek src gambar + hard refresh                          |
