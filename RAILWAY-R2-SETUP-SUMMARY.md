# 📦 Railway R2 Setup Summary

## ✅ Yang Sudah Dikerjakan

### 1. Dokumentasi Lengkap ✅

- ✅ `RAILWAY-R2-ENDPOINT-SETUP.md` - Panduan lengkap step-by-step
- ✅ `RAILWAY-R2-VARIABLES-COMPLETE.txt` - Daftar lengkap semua variables
- ✅ `railway-set-r2-variables.sh` - Script otomatis untuk set variables

### 2. Konfigurasi R2 ✅

- ✅ Filesystem config sudah diupdate ke R2
- ✅ Controllers sudah menggunakan disk `s3`
- ✅ Helper functions sudah dibuat
- ✅ Route proxy sudah dikonfigurasi

## 🚀 Langkah-Langkah Setup

### Metode 1: Via Railway Dashboard (Recommended)

1. **Buka Railway Dashboard:**

    ```
    https://railway.app/dashboard
    ```

2. **Pilih Project "Kristalin"**

3. **Klik Service "Kristalin"**

4. **Buka Tab "Variables"**

5. **Tambahkan semua variables dari file:**

    ```
    RAILWAY-R2-VARIABLES-COMPLETE.txt
    ```

6. **Ikuti panduan lengkap di:**
    ```
    RAILWAY-R2-ENDPOINT-SETUP.md
    ```

### Metode 2: Via Railway CLI (Otomatis)

1. **Jalankan script:**

    ```bash
    ./railway-set-r2-variables.sh
    ```

2. **Script akan otomatis set semua variables**

3. **Ikuti instruksi di terminal**

### Metode 3: Manual via CLI

```bash
# Login ke Railway
railway login
railway link

# Set variables satu per satu
railway variables set FILESYSTEM_DISK=s3
railway variables set AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39
railway variables set AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba
railway variables set AWS_DEFAULT_REGION=auto
railway variables set AWS_BUCKET=kristalin-assets
railway variables set AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com
railway variables set AWS_USE_PATH_STYLE_ENDPOINT=true
railway variables set AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets
```

## 📋 Variables yang Harus Di-Set

### Core R2 Variables (8 variables):

1. ✅ `FILESYSTEM_DISK=s3`
2. ✅ `AWS_ACCESS_KEY_ID=ef66a19f154154dad000e5864bafdb39`
3. ✅ `AWS_SECRET_ACCESS_KEY=e6ca0056260fbd4f18da25ee41c5049092bbf036d28a421d90fa8bd48a38e9ba`
4. ✅ `AWS_DEFAULT_REGION=auto`
5. ✅ `AWS_BUCKET=kristalin-assets`
6. ✅ `AWS_ENDPOINT=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com`
7. ✅ `AWS_USE_PATH_STYLE_ENDPOINT=true`
8. ✅ `AWS_URL=https://70979f28fc2842bcc874dd54589cfe05.r2.cloudflarestorage.com/kristalin-assets`

**Atau jika Custom Domain:**

```
AWS_URL=https://cdn.kristalin.co.id
```

## 🔍 Verifikasi Setup

### Step 1: Check Variables

```bash
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

### Step 2: Test R2 Connection

```bash
railway run php artisan r2:test
```

**Expected Output:**

```
✅ Write test: SUCCESS
✅ Read test: SUCCESS
✅ URL generation: SUCCESS
🎉 All tests passed! R2 is properly configured.
```

### Step 3: Migrate Files

```bash
railway run php artisan r2:migrate
```

### Step 4: Deploy

```bash
railway up
```

## 📚 Dokumentasi Lengkap

- **`RAILWAY-R2-ENDPOINT-SETUP.md`** - Panduan lengkap step-by-step
- **`RAILWAY-R2-VARIABLES-COMPLETE.txt`** - Daftar semua variables
- **`R2-SETUP-GUIDE.md`** - Panduan setup R2 umum
- **`R2-QUICK-START.md`** - Quick start guide

## ✅ Checklist Final

- [ ] ✅ Login ke Railway Dashboard
- [ ] ✅ Buka Service Kristalin → Variables
- [ ] ✅ Set semua 8 R2 variables
- [ ] ✅ Set AWS_URL (custom domain atau public URL)
- [ ] ✅ Enable public access di R2 bucket
- [ ] ✅ Test koneksi: `railway run php artisan r2:test`
- [ ] ✅ Migrate files: `railway run php artisan r2:migrate`
- [ ] ✅ Deploy: `railway up`
- [ ] ✅ Test images loading di production
- [ ] ✅ Verify images di-load dari R2

## 🆘 Troubleshooting

Jika ada masalah, lihat:

- **`RAILWAY-R2-ENDPOINT-SETUP.md`** - Section Troubleshooting
- **`R2-SETUP-GUIDE.md`** - Troubleshooting guide

---

**Status:** ✅ Ready to Setup
**Last Updated:** December 2024


