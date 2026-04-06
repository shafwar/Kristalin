# SRS (Software Requirements Specification) & Test Case Black-Box  
## Aplikasi: Website PT Kristalin Ekalestari (Kristalin)

---

## Bagian 1: SRS – Spesifikasi Kebutuhan Perangkat Lunak (20 Points)

Berikut **SRS** dari aplikasi Kristalin (kristalin.co.id):

### SRS-1: Form Internal Feedback (Whistle Blower)
Sistem harus menyediakan form Internal Feedback yang memungkinkan pengguna mengirim masukan/saran/laporan secara rahasia. Form harus menerima: nama (opsional), email, telepon (opsional), kategori (wajib), deskripsi (wajib), dan lampiran file (opsional, max 10 MB, tipe PDF/JPG/PNG/DOC/DOCX). Lampiran disimpan ke R2; email dikirim ke penerima yang dikonfigurasi (Resend) dan berisi link unduh file (signed URL). Tanpa lampiran, pesan tetap terkirim. Validasi wajib: kategori terpilih, deskripsi minimal 10 karakter, email wajib jika tidak anonim, konfirmasi informasi akurat. Respons: pesan sukses dan form reset setelah submit berhasil; pesan error jika gagal.

### SRS-2: Dukungan Multibahasa (EN / ID / ZH)
Aplikasi harus mendukung tiga bahasa: Inggris (EN), Indonesia (ID), dan Mandarin (ZH). Pengguna dapat mengganti bahasa melalui pemilih bahasa di header; konten halaman (navigasi, judul, form, pesan) harus berubah sesuai bahasa terpilih. Bahasa terpilih harus konsisten di seluruh halaman hingga user mengganti lagi.

### SRS-3: Form Contact
Sistem harus menyediakan form Contact untuk pengunjung mengirim pesan (nama, email, telepon, subjek, pesan, dan lampiran opsional). Pesan dikirim melalui konfigurasi email default (mis. SMTP/cPanel). Validasi field wajib; setelah submit berhasil, pengguna mendapat umpan balik yang jelas (sukses/error).

### SRS-4: Navigasi dan Halaman Konten
Aplikasi harus menyediakan navigasi utama (Home, About Us, MODI, Gold Price, Line of Business, Business Activities, CSR, Contact) dan halaman konten terkait (About, Company Overview, Milestones, Vision-Mission, News, CSR, Contact, Careers). Setiap halaman harus dapat diakses melalui URL yang sesuai dan menampilkan konten yang benar tanpa error 500.

### SRS-5: Pencarian dan Pelacakan Feedback
Sistem harus menyediakan fitur pencarian (search) untuk konten (mis. berita) dan fitur pelacakan feedback berdasarkan nomor tiket. Pengguna dapat memasukkan kata kunci atau nomor tiket dan menerima hasil yang sesuai (halaman hasil pencarian atau status feedback).

---

## Bagian 2: Empat (4) Test Case Black-Box per SRS (80 Points)

*Black-box: pengujian dari perspektif pengguna; input dan output diamati tanpa mengandalkan implementasi internal.*

---

### SRS-1: Internal Feedback

| No | Test Case | Input / Langkah | Expected Output |
|----|-----------|-----------------|------------------|
| 1  | Submit form lengkap tanpa lampiran | Isi nama, email, kategori, deskripsi ≥10 karakter, centang konfirmasi; submit | Redirect ke halaman form, pesan sukses tampil, form kosong; email masuk ke inbox penerima tanpa lampiran. |
| 2  | Submit form dengan lampiran PDF/JPG valid | Isi field wajib, lampirkan file PDF atau JPG &lt; 10 MB; submit | Pesan sukses; email masuk berisi link unduh ke file di R2; klik link mengunduh file dengan nama yang sesuai. |
| 3  | Validasi: deskripsi terlalu pendek | Isi semua field wajib, deskripsi &lt; 10 karakter; submit | Form tidak dikirim atau redirect kembali dengan pesan error validasi (deskripsi minimal 10 karakter). |
| 4  | Validasi: lampiran melebihi 10 MB atau tipe tidak diizinkan | Lampirkan file &gt; 10 MB atau tipe .exe/.zip; submit | Pesan error validasi (ukuran/tipe file); email tidak terkirim atau tanpa lampiran yang invalid. |

---

### SRS-2: Multibahasa (EN / ID / ZH)

| No | Test Case | Input / Langkah | Expected Output |
|----|-----------|-----------------|------------------|
| 1  | Ganti bahasa dari EN ke ID | Buka homepage (EN); klik pemilih bahasa pilih ID | Konten halaman (menu, judul, tombol) berubah ke Bahasa Indonesia. |
| 2  | Konsistensi bahasa antar halaman | Set bahasa ZH; navigasi ke About, lalu News | Seluruh teks di About dan News tetap dalam Mandarin. |
| 3  | Ganti bahasa di halaman Internal Feedback | Buka /internal-feedback; ganti ke ID | Label form, placeholder, tombol, dan pesan tampil dalam Bahasa Indonesia. |
| 4  | Default bahasa saat pertama kali akses | Buka situs di browser baru (clear cache/session); akses homepage | Halaman tampil dalam satu bahasa default (mis. EN atau sesuai konfigurasi) tanpa error. |

---

### SRS-3: Form Contact

| No | Test Case | Input / Langkah | Expected Output |
|----|-----------|-----------------|------------------|
| 1  | Submit contact dengan data valid | Isi nama, email, subjek, pesan sesuai validasi; submit | Pesan sukses atau konfirmasi terkirim; tidak ada error 500. |
| 2  | Submit tanpa email (jika wajib) | Kosongkan email; isi field lain; submit | Validasi gagal; pesan error menandakan email wajib atau format invalid. |
| 3  | Submit dengan email tidak valid | Isi email dengan format salah (tanpa @); submit | Validasi gagal; pesan error format email. |
| 4  | Akses halaman Contact dan cek form | Buka /contact | Halaman Contact tampil dengan field form (nama, email, subjek, pesan, dll.) dan tombol submit. |

---

### SRS-4: Navigasi dan Halaman Konten

| No | Test Case | Input / Langkah | Expected Output |
|----|-----------|-----------------|------------------|
| 1  | Akses setiap menu utama | Klik Home, About Us, Line of Business, CSR, Contact dari header | Masing-masing membuka URL yang benar dan halaman tampil (status 200), tanpa 404/500. |
| 2  | Akses halaman News dan detail berita | Buka /news; klik satu artikel | Daftar berita tampil; klik artikel membuka /news/{id} dengan konten artikel yang sesuai. |
| 3  | Akses halaman About (submenu) | Dari About atau navigasi, buka Company Overview, Vision-Mission, Board of Directors | Masing-masing halaman load dengan konten yang sesuai. |
| 4  | URL tidak valid / 404 | Buka URL yang tidak ada, mis. /halaman-tidak-ada | Halaman 404 atau fallback yang ditentukan tampil, bukan 500. |

---

### SRS-5: Pencarian dan Pelacakan Feedback

| No | Test Case | Input / Langkah | Expected Output |
|----|-----------|-----------------|------------------|
| 1  | Pencarian dengan kata kunci | Di fitur search, ketik kata kunci yang ada di konten (mis. judul berita); submit | Halaman hasil menampilkan item yang relevan (mis. berita) sesuai kata kunci. |
| 2  | Pencarian tanpa hasil | Ketik kata kunci yang tidak cocok dengan konten; submit | Halaman hasil menampilkan pesan “tidak ada hasil” atau daftar kosong. |
| 3  | Pelacakan feedback dengan nomor tiket valid | Buka /feedback/{ticket_number} atau form track; masukkan nomor tiket yang ada | Halaman menampilkan status atau detail feedback untuk tiket tersebut. |
| 4  | Pelacakan dengan nomor tiket tidak valid | Masukkan nomor tiket yang tidak ada atau format salah | Pesan error atau “tiket tidak ditemukan”; tidak ada error 500. |

---

**Ringkasan:**  
- **5 SRS** mencakup Internal Feedback, Multibahasa, Contact, Navigasi & Konten, serta Pencarian & Pelacakan Feedback.  
- **4 test case black-box** per SRS (total 20 test case) untuk memenuhi poin 80.

Anda dapat menyalin bagian yang diperlukan ke formulir ujian (SRS untuk 20 poin, test case untuk 80 poin).
