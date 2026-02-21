# Kapan dan Cara Setting Resend (Internal Feedback / Whistle Blower)

Implementasi sudah selesai. **Kapan Anda bisa mulai konfigurasi Resend:** setelah deploy (atau di local), saat Anda siap menerima submission Internal Feedback lewat email.

---

## 1. Kapan Boleh Setting?

- **Sekarang juga** – jika Anda sudah punya domain yang akan dipakai untuk kirim email.
- **Sesudah deploy** – isi env di production (Railway/dll.) setelah dapat API key dan domain Resend.

Tidak ada urutan wajib: isi env kapan pun Anda sudah dapat API key dan alamat email tujuan.

---

## 2. Langkah Konfigurasi Resend

### A. Buat akun Resend

1. Buka [resend.com](https://resend.com) → **Sign up**.
2. Verifikasi email dan login.

### B. Buat API key

1. Di dashboard: **API Keys** → **Create API Key**.
2. Beri nama (mis. `Kristalin Internal Feedback`).
3. Copy API key (dimulai `re_...`) – hanya tampil sekali.
4. Di project Anda, buka `.env` (atau env di Railway):
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   ```

### C. Verifikasi domain (agar “From” pakai domain Anda)

1. Di Resend: **Domains** → **Add Domain**.
2. Masukkan domain (mis. `kristalin.co.id` atau subdomain seperti `feedback.kristalin.co.id`).
3. Resend akan beri beberapa record DNS (SPF, DKIM, dll.). Tambahkan di cPanel / DNS provider Anda.
4. Klik **Verify** di Resend setelah DNS propagasi (bisa 5 menit–48 jam).

Kalau belum punya domain siap, Anda bisa pakai domain testing Resend (`onboarding@resend.dev`) dulu hanya untuk uji; untuk production sebaiknya pakai domain Anda sendiri.

### D. Isi env Internal Feedback

Di `.env` (atau env production):

```env
# API key (wajib)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Pengirim email (From). Pakai domain yang sudah di-verify di Resend.
# Contoh: feedback@kristalin.co.id atau noreply@kristalin.co.id
RESEND_FROM_ADDRESS=feedback@kristalin.co.id
RESEND_FROM_NAME=Internal Feedback

# Penerima: email Anda / tim yang akan menerima submission Internal Feedback
INTERNAL_FEEDBACK_TO_EMAIL=your-email@kristalin.co.id
```

- **RESEND_FROM_ADDRESS** = alamat yang muncul sebagai “dari” (harus dari domain yang sudah di-verify).
- **INTERNAL_FEEDBACK_TO_EMAIL** = satu alamat (atau alias) tempat semua submission Internal Feedback dikirim.

---

## 3. Cek Setelah Setting

1. Simpan `.env` (atau env di hosting), lalu restart app jika perlu (`php artisan config:clear` di local, atau redeploy di production).
2. Buka halaman form: `/internal-feedback`.
3. Isi form dan upload file (opsional), lalu submit.
4. Cek inbox **INTERNAL_FEEDBACK_TO_EMAIL**: harus ada email dari **RESEND_FROM_ADDRESS** berisi isi form + attachment (jika ada).

Jika email tidak masuk, cek folder spam dan log Laravel (`storage/logs/laravel.log`) untuk error Resend.

---

## 4. Ringkasan

| Yang di-setting | Di mana | Kapan |
|-----------------|--------|--------|
| Akun Resend | resend.com | Sekali |
| API key | Resend → API Keys | Sekali, lalu isi `RESEND_API_KEY` |
| Domain (From) | Resend → Domains + DNS | Sekali, lalu isi `RESEND_FROM_ADDRESS` |
| Email penerima | `.env` | `INTERNAL_FEEDBACK_TO_EMAIL` |

**Contact form** tetap memakai setting email yang sekarang (cPanel); tidak pakai Resend dan tidak berubah.
