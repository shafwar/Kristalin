# 🚀 Railway R2 Endpoint Setup - Panduan Lengkap

Panduan detail untuk mengakses variables Railway service "Kristalin" dan mengarahkan endpoint URL ke Cloudflare R2.

## 📋 Daftar Isi

1. [Akses Railway Dashboard](#akses-railway-dashboard)
2. [Mengakses Variables Service Kristalin](#mengakses-variables-service-kristalin)
3. [Konfigurasi R2 Variables](#konfigurasi-r2-variables)
4. [Mengarahkan Endpoint URL ke R2](#mengarahkan-endpoint-url-ke-r2)
5. [Verifikasi Setup](#verifikasi-setup)
6. [Troubleshooting](#troubleshooting)

---

## 🔐 Akses Railway Dashboard

### Langkah 1: Login ke Railway

1. **Buka Railway Dashboard:**

    ```
    https://railway.app/dashboard
    ```

2. **Login dengan akun Anda:**
    - Email: [email Anda]
    - Password: [password Anda]

3. **Atau via CLI:**
    ```bash
    railway login
    ```

### Langkah 2: Navigasi ke Project Kristalin

1. **Setelah login, Anda akan melihat daftar projects**
2. **Cari dan klik project "Kristalin"**
3. **Anda akan masuk ke dashboard project**

---

## 📊 Mengakses Variables Service Kristalin

### Metode 1: Via Railway Dashboard (Recommended)

#### Step 1: Buka Service Kristalin

1. **Di sidebar kiri, cari service "Kristalin"**
    - Biasanya terlihat sebagai service utama dengan nama "Kristalin" atau "web"
    - Icon biasanya berupa globe atau server

2. **Klik service "Kristalin"**

#### Step 2: Buka Tab Variables

1. **Setelah masuk ke service detail, Anda akan melihat beberapa tab:**
    - **Deployments**
    - **Variables** ← **KLIK INI**
    - **Settings**
    - **Metrics**
    - **Logs**

2. **Klik tab "Variables"**

#### Step 3: Lihat Semua Variables

Anda akan melihat daftar semua environment variables yang sudah di-set:

```
APP_NAME=Kristalin
APP_ENV=production
APP_KEY=base64:8SI0lqu7TRlqxfh4wqaKH4CTbma9qgjZSZ0q5KHTZUk=
APP_DEBUG=false
APP_URL=https://web-production-xxxx.up.railway.app
...
```

### Metode 2: Via Railway CLI

#### Step 1: Login dan Link Project

```bash
# Login ke Railway
railway login

# Link ke project (jika belum)
railway link
```

#### Step 2: List Variables

```bash
# List semua variables
railway variables

# Filter variables tertentu
railway variables | grep AWS
railway variables | grep FILESYSTEM
```

#### Step 3: Get Specific Variable

```bash
# Get single variable value
railway variables get APP_URL
railway variables get FILESYSTEM_DISK
```

---

## ⚙️ Konfigurasi R2 Variables

### Step 1: Tambahkan R2 Variables ke Railway

**Di Railway Dashboard → Service Kristalin → Tab Variables:**

Klik **"+ New Variable"** dan tambahkan satu per satu:

#### Variable 1: FILESYSTEM_DISK

```
Name: FILESYSTEM_DISK
Value: s3
```

**Klik "Add"**

#### Variable 2: AWS_ACCESS_KEY_ID

```
Name: AWS_ACCESS_KEY_ID
Value: ef66a19f154154dad000e5864bafdb39
```

**Klik "Add"**

#### Variable 3: AWS_SECRET_ACCESS_KEY

```
Name: AWS_SECRET_ACCESS_KEY
Value: e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba
```

**Klik "Add"**

#### Variable 4: AWS_DEFAULT_REGION

```
Name: AWS_DEFAULT_REGION
Value: auto
```

**Klik "Add"**

#### Variable 5: AWS_BUCKET

```
Name: AWS_BUCKET
Value: kristalin-assets
```

**Klik "Add"**

#### Variable 6: AWS_ENDPOINT

```
Name: AWS_ENDPOINT
Value: https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com
```

**Klik "Add"**

#### Variable 7: AWS_USE_PATH_STYLE_ENDPOINT

```
Name: AWS_USE_PATH_STYLE_ENDPOINT
Value: true
```

**Klik "Add"**

#### Variable 8: AWS_URL (PENTING!)

```
Name: AWS_URL
Value: https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
```

**Atau jika menggunakan Custom Domain:**

```
Name: AWS_URL
Value: https://cdn.kristalin.co.id
```

**Klik "Add"**

### Step 2: Update Existing Variables (Jika Ada)

**Cari dan update variables berikut jika sudah ada:**

#### Update FILESYSTEM_DISK

- **Jika sudah ada:** Klik variable → Edit → Ubah value menjadi `s3`
- **Jika belum ada:** Tambahkan seperti di atas

#### Update APP_URL (Jika Perlu)

- **Pastikan APP_URL mengarah ke Railway domain Anda:**
    ```
    APP_URL=https://kristalin-production-xxxx.up.railway.app
    ```
    Atau custom domain jika sudah setup:
    ```
    APP_URL=https://kristalin.co.id
    ```

### Step 3: Verifikasi Variables

**Setelah semua variables ditambahkan, pastikan Anda memiliki:**

✅ `FILESYSTEM_DISK=s3`
✅ `AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39`
✅ `AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba`
✅ `AWS_DEFAULT_REGION=auto`
✅ `AWS_BUCKET=kristalin-assets`
✅ `AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com`
✅ `AWS_USE_PATH_STYLE_ENDPOINT=true`
✅ `AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets`

---

## 🌐 Mengarahkan Endpoint URL ke R2

### Step 1: Enable Public Access di R2

**PENTING:** Sebelum mengarahkan endpoint, pastikan R2 bucket sudah diaktifkan public access.

1. **Buka Cloudflare Dashboard:**

    ```
    https://dash.cloudflare.com
    ```

2. **Navigasi ke R2:**
    - Klik **"R2"** di sidebar
    - Pilih bucket **"kristalin-assets"**

3. **Buka Settings:**
    - Klik tab **"Settings"**
    - Scroll ke bagian **"Public Access"**

4. **Enable Public Access:**

    **Opsi A: Custom Domain (Recommended)**
    - Klik **"Connect Domain"**
    - Masukkan domain: `cdn.kristalin.co.id` (atau subdomain lain)
    - Ikuti instruksi untuk setup DNS
    - Setelah terhubung, update `AWS_URL` di Railway:
        ```
        AWS_URL=https://cdn.kristalin.co.id
        ```

    **Opsi B: Public URL (Temporary)**
    - Klik **"Allow Access"**
    - R2 akan membuat public URL
    - Update `AWS_URL` di Railway:
        ```
        AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
        ```

### Step 2: Update AWS_URL di Railway

**Setelah public access diaktifkan:**

1. **Buka Railway Dashboard → Service Kristalin → Variables**
2. **Cari variable `AWS_URL`**
3. **Klik untuk edit**
4. **Update value sesuai dengan public access yang Anda pilih:**

    **Jika Custom Domain:**

    ```
    AWS_URL=https://cdn.kristalin.co.id
    ```

    **Jika Public URL:**

    ```
    AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
    ```

5. **Klik "Save"**

### Step 3: Konfigurasi Route Proxy (Sudah Otomatis)

**Route proxy sudah dikonfigurasi di `routes/web.php`:**

```php
Route::get('/images/{path}', function ($path) {
    if (config('filesystems.default') === 's3') {
        $url = Storage::disk('s3')->url($path);
        return redirect($url, 301);
    }
    return response()->file(public_path($path));
})->where('path', '.*');
```

**Ini berarti:**

- Semua request ke `/images/kristalinlogotransisi1.png` akan otomatis redirect ke R2 URL
- Tidak perlu update code di React components

### Step 4: Deploy Changes

**Setelah semua variables diupdate:**

1. **Railway akan otomatis redeploy** setelah variables diubah
2. **Atau trigger manual deploy:**
    ```bash
    railway up
    ```

---

## ✅ Verifikasi Setup

### Step 1: Test Koneksi R2 di Railway

**Via Railway CLI:**

```bash
# Test R2 connection
railway run php artisan r2:test
```

**Expected Output:**

```
🔍 Testing Cloudflare R2 Connection...
✅ Write test: SUCCESS
✅ Read test: SUCCESS
✅ URL generation: SUCCESS
🎉 All tests passed! R2 is properly configured.
```

### Step 2: Check Variables di Railway

```bash
# List semua variables
railway variables

# Check R2 variables khusus
railway variables | grep -E "(AWS_|FILESYSTEM)"
```

**Expected Output:**

```
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39
AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba
AWS_DEFAULT_REGION=auto
AWS_BUCKET=kristalin-assets
AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com
AWS_USE_PATH_STYLE_ENDPOINT=true
```

### Step 3: Test Image Loading

**Setelah deploy:**

1. **Buka website production:**

    ```
    https://kristalin-production-xxxx.up.railway.app
    ```

2. **Buka browser DevTools (F12)**
3. **Buka tab Network**
4. **Reload halaman**
5. **Cek request images:**
    - Images harus di-load dari R2 URL
    - Tidak ada 404 errors
    - Response headers menunjukkan R2 domain

### Step 4: Verify R2 Files

**Via Railway CLI:**

```bash
# List files di R2
railway run php artisan r2:test
```

**Atau via Cloudflare Dashboard:**

1. Buka Cloudflare Dashboard → R2 → kristalin-assets
2. Tab "Objects"
3. Pastikan files sudah terupload

---

## 🐛 Troubleshooting

### Problem 1: Variables Tidak Tersimpan

**Gejala:**

- Variables tidak muncul setelah di-add
- Variables hilang setelah deploy

**Solusi:**

1. **Pastikan Anda klik "Save" atau "Add" setelah input**
2. **Check apakah ada typo di nama variable**
3. **Refresh halaman Railway dashboard**
4. **Coba set via CLI:**
    ```bash
    railway variables set FILESYSTEM_DISK=s3
    railway variables set AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39
    # ... dst
    ```

### Problem 2: R2 Connection Failed

**Gejala:**

```
❌ Connection test failed!
Error: Access Denied
```

**Solusi:**

1. **Check AWS_ACCESS_KEY_ID dan AWS_SECRET_ACCESS_KEY**
2. **Pastikan R2 API token memiliki permissions:**
    - Object Read & Write
    - Object List
3. **Check AWS_ENDPOINT sudah benar**
4. **Test koneksi lokal dulu:**
    ```bash
    php artisan r2:test
    ```

### Problem 3: Images Tidak Loading

**Gejala:**

- Images return 404
- Browser console menunjukkan error

**Solusi:**

1. **Check AWS_URL sudah di-set dengan benar**
2. **Pastikan public access sudah diaktifkan di R2**
3. **Check files sudah terupload ke R2:**
    ```bash
    railway run php artisan r2:migrate
    ```
4. **Clear config cache:**
    ```bash
    railway run php artisan config:clear
    ```

### Problem 4: Wrong Endpoint URL

**Gejala:**

- Images redirect ke URL yang salah
- 403 Forbidden errors

**Solusi:**

1. **Check AWS_URL format:**
    - **Custom Domain:** `https://cdn.kristalin.co.id`
    - **Public URL:** `https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets`
2. **Pastikan tidak ada trailing slash**
3. **Update AWS_URL di Railway:**
    ```bash
    railway variables set AWS_URL="https://cdn.kristalin.co.id"
    ```

### Problem 5: Variables Tidak Ter-apply

**Gejala:**

- Setelah update variables, aplikasi masih menggunakan local storage

**Solusi:**

1. **Redeploy aplikasi:**
    ```bash
    railway up
    ```
2. **Clear config cache:**
    ```bash
    railway run php artisan config:clear
    railway run php artisan config:cache
    ```
3. **Check FILESYSTEM_DISK:**
    ```bash
    railway run php artisan tinker --execute="echo config('filesystems.default');"
    ```
    Harus return: `s3`

---

## 📝 Checklist Final

Sebelum production, pastikan semua ini sudah dilakukan:

- [ ] ✅ Login ke Railway Dashboard
- [ ] ✅ Buka Service Kristalin → Tab Variables
- [ ] ✅ Tambahkan semua R2 variables (8 variables)
- [ ] ✅ Update FILESYSTEM_DISK menjadi `s3`
- [ ] ✅ Set AWS_URL dengan benar (custom domain atau public URL)
- [ ] ✅ Enable public access di R2 bucket
- [ ] ✅ Test koneksi R2: `railway run php artisan r2:test`
- [ ] ✅ Migrate files ke R2: `railway run php artisan r2:migrate`
- [ ] ✅ Deploy aplikasi: `railway up`
- [ ] ✅ Test images loading di production
- [ ] ✅ Verify images di-load dari R2 (check Network tab)
- [ ] ✅ Monitor R2 usage di Cloudflare dashboard

---

## 📚 Quick Reference

### Railway CLI Commands

```bash
# Login
railway login

# Link project
railway link

# List variables
railway variables

# Set variable
railway variables set FILESYSTEM_DISK=s3

# Set multiple variables
railway variables set AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy

# Get variable
railway variables get AWS_URL

# Deploy
railway up

# Run command
railway run php artisan r2:test

# View logs
railway logs --follow
```

### R2 Variables Template

```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39
AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba
AWS_DEFAULT_REGION=auto
AWS_BUCKET=kristalin-assets
AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com
AWS_USE_PATH_STYLE_ENDPOINT=true
```

---

## 🆘 Butuh Bantuan?

Jika masih ada masalah:

1. **Check logs:**

    ```bash
    railway logs --follow
    ```

2. **Test koneksi:**

    ```bash
    railway run php artisan r2:test
    ```

3. **Check variables:**

    ```bash
    railway variables | grep -E "(AWS_|FILESYSTEM)"
    ```

4. **Lihat dokumentasi:**
    - `R2-SETUP-GUIDE.md` - Panduan lengkap R2
    - `R2-QUICK-START.md` - Quick start guide
    - `railway-commands.md` - Railway commands reference

---

**Last Updated:** December 2024
**Status:** ✅ Ready for Production



