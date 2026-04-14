#!/bin/bash
export PATH="/opt/plesk/node/22/bin:$PATH"

echo "=== Starting Deploy ==="
cd /var/www/vhosts/healingtechnology.com.bd/httpdocs/

echo "1. Pulling latest code..."
git fetch origin
git reset --hard origin/master

echo "2. Installing dependencies..."
npm install --legacy-peer-deps

echo "3. Booting dev server to push DB schema..."
export NODE_ENV=development
npm run dev -- -p 12004 >> dev.log 2>&1 &
DEV_PID=$!
sleep 15
if kill -0 $DEV_PID > /dev/null 2>&1; then
    kill -9 $DEV_PID
fi
pkill -f "next" || true

echo "4. Building Next.js..."
export NODE_ENV=production
npm run build

echo "5. Copying static files..."
if [ -d ".next/standalone" ]; then
    cp -r public .next/standalone/public
    cp -r .next/static .next/standalone/.next/static
else
    echo "ERROR: .next/standalone not found!"
    exit 1
fi

echo "6. Killing existing server on 12001..."
fuser -k 12001/tcp 2>/dev/null || true

echo "7. Starting new server..."
export PORT=12001
cd .next/standalone
setsid node server.js >> /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log 2>&1 &
echo "=== Deploy Finished ==="
