#!/bin/bash
export PATH="/opt/plesk/node/22/bin:$PATH"
cd /var/www/vhosts/healingtechnology.com.bd/httpdocs/
echo "Cleaning up..."
rm -rf node_modules package-lock.json

echo "Installing modules..."
npm install --legacy-peer-deps

echo "Building..."
export NODE_ENV=production
npm run build

echo "Copying assets"
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "Killing old server"
fuser -k 12001/tcp 2>/dev/null || true
pkill -f "next" || true

echo "Starting server"
cd .next/standalone
export PORT=12001
setsid node server.js >> /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log 2>&1 &
echo "Done."
