# Fix MySQL Connection Issue

## 🔧 **Masalah Saat Ini:**
MySQL variables belum di-inject oleh Railway ke Kristalin service.

## 🎯 **Solusi:**

### **Langkah 1: Connect MySQL Service di Dashboard**

1. **Buka Railway Dashboard**
   - https://railway.app/dashboard
   - Pilih project "Kristalin"

2. **Klik Service "Kristalin"**
   - Di sidebar kiri, klik service "Kristalin"

3. **Pilih Tab "Variables"**
   - Scroll ke bawah, cari section "Connected Services"
   - Pastikan MySQL service terhubung

4. **Jika MySQL belum terhubung:**
   - Klik "Connect Service"
   - Pilih MySQL service
   - Railway akan otomatis inject variables

### **Langkah 2: Manual Connection (Jika diperlukan)**

Jika otomatis tidak bekerja, hubungkan manual:

1. **Di Kristalin service Variables:**
   - Tambahkan variable: `MYSQLHOST` = `[nama-mysql-service].railway.internal`
   - Tambahkan variable: `MYSQLPORT` = `3306`
   - Tambahkan variable: `MYSQLDATABASE` = `railway`
   - Tambahkan variable: `MYSQLUSER` = `root`
   - Tambahkan variable: `MYSQLPASSWORD` = `[password-dari-mysql-service]`

### **Langkah 3: Update Database Variables**

Setelah MySQL terhubung, update variables:

```bash
railway variables --set "DB_HOST=\${MYSQLHOST}" --set "DB_PORT=\${MYSQLPORT}" --set "DB_DATABASE=\${MYSQLDATABASE}" --set "DB_USERNAME=\${MYSQLUSER}" --set "DB_PASSWORD=\${MYSQLPASSWORD}"
```

### **Langkah 4: Test Connection**

```bash
railway run php artisan tinker --execute="DB::connection()->getPdo(); echo 'Success!';"
```

## 🎯 **Expected Result:**

Setelah terhubung, variables akan terlihat seperti ini:
```
MYSQLHOST=mysql-production-xxxx.railway.internal
MYSQLPORT=3306
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQLPASSWORD=xxxxx
``` 
