# MySQL Setup Guide untuk Railway

## 🔧 **Langkah 1: Add MySQL Service di Railway Dashboard**

1. **Buka Railway Dashboard**
   - Buka https://railway.app/dashboard
   - Pilih project "Kristalin"

2. **Add New Service**
   - Klik tombol "New Service"
   - Pilih "Database" → "MySQL"

3. **Configure MySQL Service**
   - Railway akan otomatis membuat MySQL service
   - Service akan muncul di sidebar kiri

## 🔗 **Langkah 2: Connect MySQL ke Kristalin Service**

1. **Set Database Variables**
   - Klik service "Kristalin"
   - Pilih tab "Variables"
   - Railway akan otomatis inject database variables

2. **Expected Variables yang akan muncul:**
   ```
   MYSQLHOST=xxx.railway.internal
   MYSQLPORT=3306
   MYSQLDATABASE=railway
   MYSQLUSER=root
   MYSQLPASSWORD=xxxxx
   ```

## 🔄 **Langkah 3: Update Database Variables**

Setelah MySQL service terhubung, update variables ini:

```bash
# Set database variables dengan format Railway
railway variables set DB_HOST='${MYSQLHOST}'
railway variables set DB_PORT='${MYSQLPORT}'
railway variables set DB_DATABASE='${MYSQLDATABASE}'
railway variables set DB_USERNAME='${MYSQLUSER}'
railway variables set DB_PASSWORD='${MYSQLPASSWORD}'
```

## ✅ **Langkah 4: Verify Connection**

Setelah setup selesai:

```bash
# Test database connection
railway run php artisan tinker --execute="DB::connection()->getPdo();"

# Run migrations
railway run php artisan migrate --force
```

## 🎯 **Expected Result**

Setelah MySQL terhubung, variables akan terlihat seperti ini:
```
DB_HOST=xxx.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=xxxxx
``` 