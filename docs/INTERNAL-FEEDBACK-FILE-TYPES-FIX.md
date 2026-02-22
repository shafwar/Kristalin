# Internal Feedback: JPG/JPEG dan semua jenis file (PDF, PNG, DOC/DOCX)

## Analisis singkat

- **Gejala:** PDF bisa dikirim sebagai attachment, JPG/JPEG tidak.
- **Penyebab:** Validasi backend memakai aturan **`mimes:pdf,jpg,jpeg,png,doc,docx`**. Laravel mengecek dengan **`guessExtension()`** (extension yang ditebak dari isi file). Untuk sebagian file JPEG, tebakan bisa salah atau tidak konsisten (mis. environment/PHP berbeda), sehingga validasi gagal dan attachment ditolak.
- **Perbaikan:** Validasi diganti ke **`mimetypes`** dengan daftar MIME eksplisit, sehingga pengecekan berdasarkan **tipe MIME aktual** file (seperti `image/jpeg`, `image/pjpeg`), bukan tebakan extension. Semua tipe yang diizinkan di form (PDF, JPG, PNG, DOC, DOCX) dijamin diterima selama MIME-nya sesuai.

## Perubahan

| Tempat | Sebelum | Sesudah |
|--------|--------|--------|
| **Backend** (`StoreInternalReportRequest`) | `mimes:pdf,jpg,jpeg,png,doc,docx` | `mimetypes:image/jpeg,image/pjpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| **Frontend** (`ALLOWED_TYPES`) | image/jpeg, image/png, image/jpg, ... | Ditambah `image/pjpeg` (varian JPEG yang kadang dikirim browser/OS) |
| **Pesan error** | Hanya `attachment.mimes` | Ditambah `attachment.mimetypes` (pesan sama: PDF, JPG, PNG, DOC, DOCX) |

## Daftar MIME yang diterima

- **Gambar:** `image/jpeg`, `image/pjpeg`, `image/png`
- **Dokumen:** `application/pdf`, `application/msword` (DOC), `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX)

Dengan ini, PDF, JPG, JPEG, PNG, DOC, dan DOCX bisa dikirim dan divalidasi dengan konsisten.
