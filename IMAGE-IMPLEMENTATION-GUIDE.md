# 📸 IMAGE IMPLEMENTATION GUIDE - KRISTALIN PROJECT

## ✅ POLA YANG BENAR (DO)

### 1. Path di Code (news.tsx, NewsDetail.tsx, welcome.tsx)
```typescript
// ✅ BENAR: Gunakan path tanpa prefix, mulai dengan /
image: '/pt-abadi-bersama-sentosa-meresmikan-penggilingan-padi-di-boy-4ubf.jpg'
image: '/metronews_desember.jpeg'
image: '/agus2.jpg'
```

### 2. Upload ke R2
File harus di-upload ke R2 dengan **DUA path**:
- `filename.jpg` (tanpa prefix) - untuk fallback
- `public/filename.jpg` (dengan prefix) - untuk match dengan imageUrl() output

**Command:**
```bash
php artisan r2:migrate
```

Atau upload manual dengan path `public/filename.jpg`

### 3. Environment Variables (Railway)
```
VITE_ASSET_BASE_URL=https://cdn.kristalin.co.id  ✅ JANGAN DIUBAH!
FILESYSTEM_DISK=s3
```

### 4. Alur yang Benar
```
1. Path di code: /filename.jpg
2. imageUrl() generate: https://cdn.kristalin.co.id/public/filename.jpg
3. File di R2: public/filename.jpg ✅ MATCH!
4. Gambar muncul ✅
```

---

## ❌ YANG TIDAK BOLEH (DON'T)

### ❌ JANGAN ubah VITE_ASSET_BASE_URL
```
❌ VITE_ASSET_BASE_URL=/images  # Ini akan break semua gambar!
✅ VITE_ASSET_BASE_URL=https://cdn.kristalin.co.id  # Tetap ini!
```

### ❌ JANGAN pakai path dengan prefix di code
```typescript
// ❌ SALAH
image: '/public/filename.jpg'
image: '/kristalin-assets/public/filename.jpg'

// ✅ BENAR
image: '/filename.jpg'
```

### ❌ JANGAN upload hanya dengan path tanpa public/
```
❌ Upload hanya: filename.jpg
✅ Upload dengan: filename.jpg DAN public/filename.jpg
```

---

## 🔍 VERIFIKASI

### Cek file di R2:
```bash
php artisan r2:test
```

### Test URL:
```bash
curl -I "https://cdn.kristalin.co.id/public/filename.jpg"
# Harus return HTTP 200
```

### Cek di code:
```typescript
// Path harus: '/filename.jpg'
// imageUrl() akan generate: 'https://cdn.kristalin.co.id/public/filename.jpg'
// File di R2 harus ada di: 'public/filename.jpg'
```

---

## 📋 CHECKLIST UNTUK GAMBAR BARU

1. ✅ File ada di `public/kristalin-assets/public/filename.jpg` (local)
2. ✅ Path di code: `/filename.jpg` (tanpa prefix)
3. ✅ Upload ke R2 dengan path: `public/filename.jpg`
4. ✅ Verifikasi file ada di R2: `php artisan r2:test`
5. ✅ Test URL: `curl -I "https://cdn.kristalin.co.id/public/filename.jpg"`
6. ✅ Hard refresh browser setelah deploy

---

## 🎯 KESIMPULAN

**Pola yang SELALU berhasil:**
- Code: `/filename.jpg`
- R2: `public/filename.jpg` (dan `filename.jpg` sebagai fallback)
- VITE_ASSET_BASE_URL: `https://cdn.kristalin.co.id` (JANGAN DIUBAH!)

**Yang menyebabkan gambar tidak muncul:**
- ❌ VITE_ASSET_BASE_URL diubah ke `/images`
- ❌ File tidak di-upload ke R2 dengan path `public/`
- ❌ Path di code salah (pakai prefix)

---

**File ini dibuat berdasarkan implementasi December articles yang berhasil.**

