# Analisis: Internal Feedback tidak terkirim saat pakai attachment

## Masalah
- Tanpa attachment: pesan terkirim.
- Dengan attachment: pesan tidak terkirim sama sekali.

## Kemungkinan penyebab (prioritas)

1. **Path file temp hilang/tidak terbaca**  
   `UploadedFile::getRealPath()` mengembalikan path file temp PHP. Di lingkungan seperti Railway (ephemeral/read-only), file temp bisa tidak ada atau tidak terbaca saat Resend/Laravel membangun attachment.

2. **Exception di `attachments()`**  
   `Attachment::fromPath()` atau akses ke file bisa throw (path invalid, permission, file sudah dihapus). Exception itu menghentikan seluruh `Mail::send()` sehingga user dapat "Unable to send".

3. **Resend / encoding**  
   Ukuran atau tipe file bisa memicu error dari API Resend; exception yang sama membuat kirim gagal.

## Langkah kognitif untuk resolve

| Langkah | Tujuan | Tindakan |
|--------|--------|----------|
| 1. **Buat attachment tidak fatal** | Pesan tetap terkirim meski lampiran bermasalah | Di `InternalFeedbackMail::attachments()`: cek path exists + readable, wrap dalam try-catch; jika gagal return `[]` dan log. Email tetap dikirim (tanpa lampiran). |
| 2. **Gunakan path yang kita kontrol** | Hindari ketergantungan pada temp PHP | Di controller: saat ada file, **copy** ke `storage/app/temp/` dulu, kirim path + nama + MIME ke Mailable, attach dari path itu. Setelah `Mail::send()`, hapus file temp di storage. |
| 3. **Log saat ada attachment** | Memudahkan debug di production | Log di controller: "Internal Feedback send with attachment: {filename}". Di Mailable saat attach gagal: log warning dengan exception message. |
| 4. **Validasi & batasan tetap** | Menghindari request terlalu besar / tipe salah | Tetap pakai aturan saat ini: nullable, file, max 10MB, mimes pdf,jpg,jpeg,png,doc,docx. |

## Hasil yang diharapkan
- Tanpa attachment: perilaku tetap seperti sekarang (terkirim).
- Dengan attachment: file disalin ke storage, dilampirkan dari path itu; jika proses attach gagal, email tetap terkirim tanpa lampiran dan error tercatat di log.
