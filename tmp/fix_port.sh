#!/bin/bash
set -e
BASE="/var/www/vhosts/healingtechnology.com.bd/httpdocs"

echo "=== Fix: Moving server to port 12000 (Apache proxy target) ==="

# Kill anything on 12000 and 12001
fuser -k 12000/tcp 2>/dev/null || true
fuser -k 12001/tcp 2>/dev/null || true
sleep 2

# Update .env files to use port 12000
cat > "$BASE/.env" << 'ENV'
NEXT_PUBLIC_SITE_URL=https://healingtechnology.com.bd
PORT=12000
PAYLOAD_SECRET=d82494f0614eb589ba5b3e21b7abceb1
DATABASE_URI=postgresql://healingtechnology.co_bgieab3zdtl:HealDB2026@127.0.0.1:5432/healingtechnology
ENV

cp "$BASE/.env" "$BASE/.next/standalone/.env"
echo "ENV files updated to PORT=12000"

# Start the standalone server on port 12000
cd "$BASE/.next/standalone"
export PORT=12000
export NODE_ENV=production
setsid /opt/plesk/node/22/bin/node server.js > "$BASE/app.log" 2>&1 &
echo "Started server on port 12000 with PID $!"

sleep 5

echo "=== Checking app.log ==="
tail -n 15 "$BASE/app.log"

echo "=== HTTP Check ==="
curl -s -o /dev/null -w 'HTTP Status: %{http_code}\n' http://127.0.0.1:12000/products

echo "=== Done ==="
