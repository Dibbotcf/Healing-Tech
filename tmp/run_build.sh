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
mkdir -p .next/standalone/public
# Recursively copy everything inside public except the isolated 'media' directory
find public -mindepth 1 -maxdepth 1 ! -name 'media' -exec cp -r {} .next/standalone/public/ \;
cp -r .next/static .next/standalone/.next/static

# Safely symlink the permanent media directory into standalone so uploads persist build cycles!
echo "Symlinking Media Folder to prevent upload wipes..."
ln -sfn /var/www/vhosts/healingtechnology.com.bd/httpdocs/public/media /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/public/media

echo "Killing old server processes..."
fuser -k 12000/tcp 2>/dev/null || true
fuser -k 12001/tcp 2>/dev/null || true

echo "Starting server on PORT 12000..."
cd .next/standalone
export PORT=12000
export NODE_ENV=production
setsid node server.js >> /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log 2>&1 &
echo "Done."
