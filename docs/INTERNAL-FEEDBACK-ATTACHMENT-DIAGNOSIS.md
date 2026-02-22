# Analisis: Attachment tidak terkirim (Internal Feedback)

## Yang terlihat dari log & Network

- **Railway:** `[302]: POST /internal-feedback` → request sampai ke server dan dapat redirect (normal untuk Laravel).
- **Browser:** POST ~1.5 kB, lalu 200 ~70 kB → jika user kirim file 5 MB, body POST seharusnya > 5 MB. Ukuran 1.5 kB kuat dugaan **file tidak ikut** dalam request yang sampai ke server.

## Kemungkinan penyebab (urut prioritas)

### 1. Limit upload di server (Railway/PHP)
- **PHP:** `upload_max_filesize` / `post_max_size` di bawah 10 MB → request besar dipotong atau `$_FILES` kosong.
- **Proxy/Railway:** batas body size → request besar ditolak atau di-truncate.
- **Akibat:** Laravel dapat POST tanpa file (atau file invalid). Validasi kita: attachment nullable → lolos. Email terkirim **tanpa** attachment; user mengira kirim dengan lampiran.

### 2. Error validasi attachment tidak tampil
- Jika validasi gagal (mis. `attachment.max` / `attachment.mimes`), Laravel redirect dengan **errors** di Inertia props.
- Halaman internal-feedback **tidak** menampilkan `errors.attachment` (hanya pakai `errors` dari state client).
- **Akibat:** User tidak tahu kenapa submit “gagal” atau kenapa file tidak ikut (mis. “Attachment must not exceed 10 MB”).

### 3. Client kirim “ada attachment” tapi server tidak terima file
- Frontend kirim file, tapi karena limit server, body terpotong → server tidak dapat file.
- Tidak ada penanda “saya kirim attachment” dari client, jadi backend tidak bisa bedakan “user tidak pilih file” vs “file tidak sampai”.

### 4. S3/R2 + fallback
- S3 gagal (credential/env) → fallback in-memory. Untuk file besar, in-memory bisa timeout atau memory.
- Tanpa log yang jelas, sulit pastikan apakah gagal di S3 atau di fallback.

## Kesimpulan: apakah “tidak bisa”?

**Bisa.** Masalahnya bukan “attachment tidak bisa sama sekali”, tetapi:

1. **Limit PHP/server** belum memadai untuk 10 MB.
2. **Pesan error** (validasi/server) tidak tampil di UI.
3. **Tidak ada deteksi** “file tidak sampai” vs “user tidak lampirkan”.

## Solusi yang diusulkan (sebelum implementasi)

| No | Solusi | Tujuan |
|----|--------|--------|
| 1 | **Naikkan limit PHP di Railway** | Pastikan upload sampai (min. 12M untuk post + upload). |
| 2 | **Tampilkan error validasi dari server** | Tampilkan `errors.attachment` (dan error server lain) di form. |
| 3 | **Deteksi “file tidak sampai”** | Kirim flag `has_attachment` dari frontend; di backend jika `has_attachment` true tapi `hasFile('attachment')` false → redirect dengan pesan jelas (mis. “File tidak diterima. Coba file lebih kecil atau cek limit server.”). |
| 4 | **Log di backend** | Log saat masuk `store()`: `hasFile('attachment')`, dan jika ada: size + client name. Untuk debug di Railway. |

Setelah ini diimplementasi, tes lagi dengan file < 10 MB; jika masih gagal, isi log Railway akan memastikan apakah file sampai atau tidak.
