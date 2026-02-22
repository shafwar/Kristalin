# Analisis: Link download dari email (R2) – "This site can't be reached" lalu tiba-tiba bisa

## Apa yang terjadi

- Di email ada **link** ke file (JPEG) yang disimpan di **R2** (Cloudflare):  
  `https://....r2.cloudflarestorage.com/.../internal-feedback/.../file.jpg`
- Saat link diklik kadang muncul **"This site can't be reached" / ERR_CONNECTION_RESET**.
- Lalu **"tiba-tiba bisa"** = link yang sama berhasil dibuka dan foto tampil.

## Penyebab (analisis)

1. **Jaringan / firewall**
   - Koneksi ke domain R2 (`*.r2.cloudflarestorage.com`) bisa **diblok atau di-reset** oleh:
     - Jaringan kantor/sekolah
     - ISP atau proxy
     - Firewall/antivirus
   - Bukan salah file JPEG atau salah konfigurasi R2.

2. **Sementara vs tiba-tiba bisa**
   - Ganti jaringan (WiFi → mobile data, atau jaringan lain) atau coba lagi di waktu lain → koneksi ke R2 berhasil → link bisa dibuka. Itu penyebab "tiba-tiba bisa".

3. **Buka di tab vs unduh**
   - Kalau link dibuka **di tab** (preview), browser harus **tetap terhubung** ke R2 untuk menampilkan gambar. Kalau koneksi putus di tengah → error atau loading gagal.
   - Kalau link dipakai untuk **unduh** file dulu, lalu file dibuka **lokal**, koneksi ke R2 hanya dipakai saat unduh; setelah file ada di perangkat, buka gambar tidak tergantung R2 lagi.

## Solusi yang diimplementasi

1. **URL presigned dengan `Content-Disposition: attachment`**
   - Saat membuat **temporary URL** untuk R2, kita set parameter **ResponseContentDisposition** agar response dari R2 berheader:
     - `Content-Disposition: attachment; filename="nama-file-asli.jpg"`
   - Efek: saat user **klik link di email**, browser cenderung **mengunduh** file (bukan membuka di tab). File tersimpan di perangkat dan bisa dibuka dari sana, sehingga:
     - Koneksi ke R2 hanya untuk satu kali unduh.
     - Setelah unduh, melihat gambar tidak lagi bergantung pada koneksi ke R2, sehingga lebih tahan terhadap ERR_CONNECTION_RESET.

2. **Perpanjangan masa berlaku link (opsional)**
   - Masa berlaku signed URL bisa diperpanjang (mis. 7 → 30 hari) agar user punya waktu lebih lama untuk mencoba dari jaringan yang tidak memblok R2.

Dengan ini, pengalaman "download dari email untuk file JPEG" jadi lebih andal: link mengarah ke unduh, dan setelah file ada di perangkat, buka file tidak tergantung koneksi ke R2.
