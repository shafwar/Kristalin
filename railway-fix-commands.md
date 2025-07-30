# Railway Environment Variables Fix Commands

## Fix Database Variables

```bash
railway variables set DB_HOST='${MYSQLHOST}'
railway variables set DB_PORT='${MYSQLPORT}'
railway variables set DB_DATABASE='${MYSQLDATABASE}'
railway variables set DB_USERNAME='${MYSQLUSER}'
railway variables set DB_PASSWORD='${MYSQLPASSWORD}'
```

## Fix Log Channel

```bash
railway variables set LOG_CHANNEL=stderr
```

## Check Current Variables

```bash
railway variables
```

## Deploy After Fix

```bash
railway up
```

## Check Health

```bash
curl https://web-production-RANDOM.up.railway.app/health
```
