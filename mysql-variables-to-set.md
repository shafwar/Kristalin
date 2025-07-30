# MySQL Variables untuk Railway Dashboard

## 🔧 **Variables yang Perlu Di-Set Manual di Railway Dashboard**

Karena Railway belum otomatis meng-inject MYSQL variables, Anda perlu set manual di dashboard.

### **Langkah 1: Buka Railway Dashboard**
1. Buka https://railway.app/dashboard
2. Pilih project "Kristalin"
3. Klik service "Kristalin"
4. Pilih tab "Variables"

### **Langkah 2: Tambahkan Variables Ini**

**Copy dan paste variables berikut ke Railway dashboard:**

```
MYSQLHOST=mysql-production-xxxx.railway.internal
MYSQLPORT=3306
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQLPASSWORD=xxxxx
```

### **Langkah 3: Cara Mendapatkan Values**

**Untuk mendapatkan values yang tepat:**

1. **Klik service "MySQL" di sidebar**
2. **Pilih tab "Connect"**
3. **Copy values dari section "Connect"**

Atau gunakan format ini:
- `MYSQLHOST` = `[nama-mysql-service].railway.internal`
- `MYSQLPORT` = `3306`
- `MYSQLDATABASE` = `railway`
- `MYSQLUSER` = `root`
- `MYSQLPASSWORD` = `[password-dari-mysql-service]`

### **Langkah 4: Set via CLI (Alternatif)**

Jika Anda sudah tahu values, bisa set via CLI:

```bash
railway variables --set "MYSQLHOST=mysql-production-xxxx.railway.internal" --set "MYSQLPORT=3306" --set "MYSQLDATABASE=railway" --set "MYSQLUSER=root" --set "MYSQLPASSWORD=xxxxx"
```

### **Langkah 5: Verify Variables**

Setelah set, cek dengan:

```bash
railway variables | grep MYSQL
```

### **Expected Result:**

Setelah berhasil, variables akan terlihat seperti ini:
```
MYSQLHOST=mysql-production-xxxx.railway.internal
MYSQLPORT=3306
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQLPASSWORD=xxxxx
```

Dan DB_ variables akan otomatis ter-resolve:
```
DB_HOST=mysql-production-xxxx.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=xxxxx
``` 
