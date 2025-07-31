#!/bin/bash

echo "🔍 Mencari informasi MySQL service..."

# Cek apakah ada MySQL service yang terhubung
echo "📋 Variables saat ini:"
railway variables | grep -E "(MYSQL|DB_)"

echo ""
echo "🌐 Environment variables:"
railway run env | grep -i mysql

echo ""
echo "📝 Langkah selanjutnya:"
echo "1. Buka Railway Dashboard: https://railway.app/dashboard"
echo "2. Pilih project 'Kristalin'"
echo "3. Klik service 'MySQL' di sidebar"
echo "4. Pilih tab 'Connect'"
echo "5. Copy connection details"
echo ""
echo "6. Klik service 'Kristalin'"
echo "7. Pilih tab 'Variables'"
echo "8. Tambahkan variables berikut:"
echo ""
echo "MYSQLHOST=[dari-tab-connect]"
echo "MYSQLPORT=3306"
echo "MYSQLDATABASE=railway"
echo "MYSQLUSER=root"
echo "MYSQLPASSWORD=[dari-tab-connect]" 