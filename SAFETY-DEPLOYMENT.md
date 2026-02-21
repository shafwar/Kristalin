# Safety Deployment Guide

Prosedur aman untuk deploy ke production (`git push origin main`).  
Domain production: **kristalin.co.id** (Railway).

---

## Pre-push checklist

Sebelum menjalankan `git push origin main`, pastikan:

- [ ] **Lokal bersih** – `git status` tidak ada uncommitted changes yang tidak sengaja
- [ ] **Branch benar** – Anda di branch `main` (atau branch yang akan di-merge ke `main`)
- [ ] **Tes lokal** – `npm run build` dan `php artisan` jalan tanpa error (opsional tapi disarankan)
- [ ] **Tidak ada secret** – Tidak ada API key, password, atau `.env` ter-commit

---

## Push ke main (trigger deployment)

```bash
# 1. Cek status
git status
git branch

# 2. Push (Railway auto-deploy dari main)
git push origin main
```

Setelah push, Railway akan build dan deploy otomatis dari branch `main`.

---

## Post-deploy verification

Setelah deployment selesai (~2–5 menit):

1. **Health / homepage**  
   Buka https://kristalin.co.id – pastikan tidak 500 dan halaman utama load.

2. **Fitur kritis**  
   - Navigasi & bahasa (EN/ID/ZH)  
   - Contact form  
   - Internal Feedback form (termasuk kategori & attachment)  
   - Halaman utama: About, News, Contact, dll.

3. **Log (jika ada error)**  
   Di Railway: Project → Service → **Deployments** → pilih deployment terbaru → **View Logs**.

---

## Jika terjadi masalah

- **Build gagal** – Cek log di Railway; perbaiki di branch, commit, lalu push lagi.
- **Error 500 di production** – Cek env (APP_KEY, database, RESEND, dll.) dan log Laravel di Railway.
- **Rollback** – Di Railway bisa redeploy deployment sebelumnya, atau lokal: `git revert HEAD` lalu `git push origin main`.

---

## Ringkasan

| Langkah              | Perintah / tindakan              |
|----------------------|-----------------------------------|
| Cek status           | `git status`                      |
| Commit (jika perlu)  | `git add ...` dan `git commit -m "..."` |
| Deploy               | `git push origin main`            |
| Verifikasi           | Buka kristalin.co.id dan tes fitur |
