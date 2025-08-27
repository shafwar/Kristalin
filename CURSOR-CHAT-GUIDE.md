# 🚨 **CURSOR CHAT GUIDE - KRISTALIN PROJECT**
## **⚠️ PENTING: BACA INI SEBELUM MEMULAI CHAT BARU**

---

## 📋 **PROJECT OVERVIEW**

### **Tech Stack:**
- **Backend:** Laravel 11
- **Frontend:** Inertia.js + React + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Deployment:** Railway
- **Database:** MySQL (Railway MySQL Service)

### **Domain:** `kristalin.co.id`
### **Status:** Production Live ✅

---

## 🚨 **FILE-FILE SANGAT SENSITIF - JANGAN DIUBAH!**

### **❌ TRANSLATION SYSTEM (KRITIS)**
```bash
❌ JANGAN SENTUH FILE INI:
- resources/js/hooks/useTranslation.ts
- app/Http/Middleware/HandleInertiaRequests.php
- app/Http/Middleware/SetLocale.php
- app/Http/Controllers/LanguageController.php
```
**Alasan:** Core translation system. Mengubah = website rusak total.

### **❌ VITE CONFIGURATION (KRITIS)**
```bash
❌ JANGAN SENTUH FILE INI:
- vite.config.ts
- config/vite.php
- package.json (dependencies)
```
**Alasan:** Mengubah = `ViteManifestNotFoundException` dan website down.

### **❌ BUILD ASSETS (KRITIS)**
```bash
❌ JANGAN SENTUH FILE INI:
- public/build/manifest.json
- public/build/.vite/manifest.json
- public/build/assets/* (semua file JS/CSS)
```
**Alasan:** File auto-generated. Mengubah manual = error deployment.

### **❌ HEADER COMPONENT (SENSITIF)**
```bash
❌ JANGAN SENTUH FILE INI:
- resources/js/components/Header.tsx
```
**Alasan:** Header sudah optimal. Mengubah = layout rusak.

---

## ✅ **FILE YANG BOLEH DIUBAH DENGAN AMAN**

### **✅ TRANSLATION CONTENT (AMAN)**
```bash
✅ BOLEH UBAH:
- lang/en/messages.php
- lang/id/messages.php
- lang/zh/messages.php
- lang/en/pages.php
- lang/id/pages.php
- lang/zh/pages.php
```

### **✅ PAGE COMPONENTS (AMAN)**
```bash
✅ BOLEH UBAH:
- resources/js/pages/*.tsx (semua halaman)
- resources/js/components/*.tsx (kecuali Header.tsx)
```

### **✅ ROUTES (AMAN)**
```bash
✅ BOLEH UBAH:
- routes/web.php
```

### **✅ SEO & META (AMAN)**
```bash
✅ BOLEH UBAH:
- resources/views/app.blade.php (meta tags)
- public/sitemap.xml
- public/robots.txt
```

---

## 🔧 **IMPLEMENTASI YANG SUDAH BERHASIL**

### **1. Enhanced Cache Control (.htaccess)**
```apache
# Force no cache for build assets with version control
<FilesMatch "\.(js|css)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate, max-age=0"
    Header set Pragma "no-cache"
    Header set Expires "Thu, 01 Jan 1970 00:00:00 GMT"
    Header set Vary "Accept-Encoding"
    Header set X-Content-Type-Options "nosniff"
</FilesMatch>
```
**Status:** ✅ BERHASIL - Mencegah 404 errors

### **2. Auto Build Scripts (package.json)**
```json
{
  "scripts": {
    "postinstall": "npm run build",
    "pre-push": "npm run build && git add -f public/build/ && git commit -m '🔧 BUILD: Auto-update assets before push' || true"
  }
}
```
**Status:** ✅ BERHASIL - Otomatisasi build process

### **3. Board of Directors Page**
```typescript
// Muhammad Junaidi dengan foto terkompresi
{ id: 3, name: 'Muhammad Junaidi', positionKey: 'position_advisor_shareholder', company: '', image: '/IMG_9871.JPG', objectFit: 'cover' }

// Arif Budi Setiawan dengan icon misterius
{ id: 17, name: 'Arif Budi Setiawan', positionKey: 'position_chairman', company: '', image: '' }
```
**Status:** ✅ BERHASIL - Foto terkompresi dan hierarki benar

### **4. Translation System**
```php
// Chairman translation di semua bahasa
'en' => 'position_chairman' => 'Chairman'
'id' => 'position_chairman' => 'Ketua Dewan'
'zh' => 'position_chairman' => '董事长'
```
**Status:** ✅ BERHASIL - Translation lengkap

### **5. Mobile Menu Logo**
```tsx
// Logo lokal di mobile menu
<img src="/kristalinlogotransisi1.png" alt="Kristalin Logo" className="h-10 object-contain" />
```
**Status:** ✅ BERHASIL - Logo konsisten

---

## ❌ **IMPLEMENTASI YANG GAGAL (JANGAN ULANGI!)**

### **❌ Docker Multi-Stage Build**
```dockerfile
# GAGAL - Resource constraints di Railway
FROM node:20-alpine AS node-builder
FROM php:8.2-apache
```
**Hasil:** ❌ Gagal karena resource constraints

### **❌ Custom Nixpacks Configuration**
```toml
# GAGAL - Package definition errors
[phases.setup]
nixPkgs = ["nodejs_20", "php82", "composer"]
```
**Hasil:** ❌ Error: `undefined variable 'composer'`

### **❌ Manual Build Assets Merge**
```bash
# GAGAL - Konflik build assets
git merge branch-with-assets
```
**Hasil:** ❌ `ViteManifestNotFoundException`

### **❌ Rollback Terlalu Jauh**
```bash
# GAGAL - Kehilangan fitur
git reset --hard 9f567f8
```
**Hasil:** ❌ Kehilangan Board of Directors, Instagram link, search functionality

---

## 🎯 **PROSEDUR DEPLOYMENT YANG AMAN**

### **✅ SEBELUM SETIAP DEPLOY**
```bash
# 1. Build assets
npm run build

# 2. Test di local
php artisan serve
# Buka browser, test semua fitur

# 3. Commit perubahan
git add .
git commit -m "✨ FEATURE: Your feature description"

# 4. Push (akan auto-build assets)
git push origin main
```

### **✅ JIKA ADA 404 ERRORS**
```bash
# 1. Force rebuild
npm run build

# 2. Force push assets
git add -f public/build/
git commit -m "🔧 BUILD: Force rebuild assets to fix 404 errors"
git push origin main

# 3. Wait 5-10 minutes
# 4. Test di incognito mode
```

### **✅ JIKA WEBSITE DOWN TOTAL**
```bash
# 1. Rebuild assets
npm run build

# 2. Force push semua
git add -f public/build/
git commit -m "🚨 EMERGENCY: Fix website down"
git push origin main

# 3. Wait 5-10 minutes
# 4. Test di incognito mode
```

---

## 🚨 **PERINGATAN KHUSUS**

### **⚠️ JANGAN LAKUKAN:**
1. **Rollback lebih dari 2-3 commit** - gunakan merge bertahap
2. **Mengubah file sensitif** translation system
3. **Merge build assets manual** - rebuild fresh saja
4. **Push tanpa rebuild** - selalu `npm run build`
5. **Mengubah Vite config** tanpa testing
6. **Mengubah Header.tsx** tanpa backup
7. **Abaikan linter errors** - fix sebelum commit
8. **Mengubah struktur** translation arrays
9. **Copy-paste kode** tanpa memahami
10. **Deploy tanpa testing**

### **✅ SELALU LAKUKAN:**
1. **Test build** sebelum push
2. **Cek manifest.json** lokasi
3. **Backup** sebelum perubahan besar
4. **Merge bertahap** untuk fitur besar
5. **Fix linter errors** sebelum commit
6. **Test translation** di browser
7. **Cek PHP syntax** translation files
8. **Gunakan commit message** yang jelas
9. **Monitor deployment** status
10. **Backup working state** sebelum eksperimen

---

## 📱 **MOBILE TESTING**

### **Chrome DevTools:**
1. **F12** → **Toggle device toolbar**
2. **iPhone 12 Pro** simulation
3. **Hard refresh** di mobile view
4. **Check console** untuk errors

### **Real Device:**
1. **Clear browser cache**
2. **Hard refresh**
3. **Test incognito mode**
4. **Check network tab** untuk 404 errors

---

## 🔧 **TROUBLESHOOTING QUICK GUIDE**

### **Error: ViteManifestNotFoundException**
```bash
# Fix: Copy manifest.json
cp public/build/.vite/manifest.json public/build/manifest.json
git add -f public/build/manifest.json
git push origin main
```

### **Error: Build Failed**
```bash
# Fix: Rebuild fresh
rm -rf public/build/
npm run build
git add -f public/build/
git push origin main
```

### **Error: Header Not Working**
```bash
# Fix: Restore from backup
git checkout HEAD~1 -- resources/js/components/Header.tsx
npm run build
git add -f public/build/
git push origin main
```

### **Error: Translation Not Working**
```bash
# Fix: Check PHP syntax
php -l lang/en/messages.php
php -l lang/id/messages.php
php -l lang/zh/messages.php
```

---

## 📚 **FITUR YANG SUDAH ADA (JANGAN RUSAK!)**

### **✅ Halaman Lengkap:**
- Board of Directors (17 foto direktur)
- Careers (tanpa application form)
- CSR (dengan translation)
- News (dengan search)
- Business Activity (dengan Torindo partnership)
- Search functionality
- Semua halaman lainnya

### **✅ Fitur Khusus:**
- Instagram link di welcome page
- Header yang fleksibel
- Translation system (EN/ID/ZH)
- SEO meta tags dan sitemap
- Responsive design

### **✅ Konfigurasi:**
- Vite config yang optimal
- Railway deployment
- Build scripts
- Environment variables

---

## 🎯 **COMMIT MESSAGE TEMPLATE**

### **✅ Format yang Benar:**
```bash
🔧 BUILD: Update assets with [feature]
✨ FEATURE: Add [feature] with [details]
🔄 MERGE: Complete merge from [branch]
🔧 FIX: Resolve [issue] in [file]
🌐 TRANSLATION: Add [language] keys for [feature]
🛡️ SECURITY: Implement [security feature]
```

### **❌ Format yang Salah:**
```bash
update
fix
merge
translation
```

---

## 🚨 **EMERGENCY CONTACTS**

### **Jika Website Down Total:**
1. **Check Railway logs** untuk error details
2. **Verify manifest.json** exists di `public/build/`
3. **Check .htaccess** configuration
4. **Clear all caches** (browser, CDN, Railway)

### **Jika Masih Ada Masalah:**
1. **Rollback ke commit stabil** terakhir
2. **Rebuild assets fresh**
3. **Test di incognito mode**
4. **Check console errors**

---

## 🎉 **KESIMPULAN**

### **✅ FOUNDATION YANG STABIL:**
- Commit `2266d6f` adalah base yang stabil
- Cache control sudah optimal
- Auto build scripts sudah aktif
- Translation system sudah bekerja

### **✅ DEPLOYMENT YANG AMAN:**
- Selalu rebuild assets sebelum push
- Jangan ubah file sensitif
- Backup sebelum rollback
- Test build sebelum deploy

### **✅ WEBSITE STATUS:**
- Semua fitur lengkap
- Performance optimal
- Translation bekerja
- SEO optimized
- Ready for production

---

## 📞 **SUPPORT**

**Jika ada masalah:**
1. **Baca guide ini** terlebih dahulu
2. **Check troubleshooting** section
3. **Follow emergency procedures**
4. **Test di incognito mode**
5. **Wait 5-10 minutes** untuk cache refresh

---

**Dokumentasi ini adalah panduan LENGKAP untuk menghindari semua kesalahan yang pernah terjadi dan memastikan deployment yang aman!** 🚀

**PENTING: Cursor Chat Baru harus mengikuti panduan ini dengan KETAT untuk menghindari kerusakan website!** ⚠️
