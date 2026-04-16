#!/bin/bash
set -e

DB_USER="healingtechnology.co_bgieab3zdtl"
OLD_PASS="@04443332351Ht"
NEW_PASS="HealDB2026"
DB_NAME="healingtechnology"
DB_HOST="127.0.0.1"

echo "Step 1: Resetting PostgreSQL password..."
PGPASSWORD="$OLD_PASS" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "ALTER USER \"$DB_USER\" WITH PASSWORD '$NEW_PASS';"
echo "Password changed successfully!"

echo "Step 2: Verifying new password works..."
PGPASSWORD="$NEW_PASS" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "\dt" | head -5
echo "Connection verified!"

echo "Step 3: Writing new .env..."
cat > /var/www/vhosts/healingtechnology.com.bd/httpdocs/.env << ENV
NEXT_PUBLIC_SITE_URL=https://healingtechnology.com.bd
PORT=12001
PAYLOAD_SECRET=d82494f0614eb589ba5b3e21b7abceb1
DATABASE_URI=postgresql://$DB_USER:$NEW_PASS@$DB_HOST:5432/$DB_NAME
ENV

cp /var/www/vhosts/healingtechnology.com.bd/httpdocs/.env \
   /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/.env
echo "Env files updated!"
cat /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/.env

echo "Step 4: Killing old server and restarting..."
fuser -k 12001/tcp 2>/dev/null || true
sleep 2

cd /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone
export PORT=12001
export NODE_ENV=production
setsid /opt/plesk/node/22/bin/node server.js > /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log 2>&1 &
echo "Server started with PID $!"
sleep 4

echo "Step 5: Checking app log..."
tail -n 15 /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log
