#!/bin/bash
echo "=== Testing Payload Login API ==="
RESULT=$(curl -s http://127.0.0.1:3000/api/users/login \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"email":"dibbodutta06@gmail.com","password":"dibbodutta06@"}')
echo "Login Result: $RESULT"

echo ""
echo "=== Testing /api/users/me ==="
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://127.0.0.1:3000/api/users/me

echo ""
echo "=== Checking Node process ==="
ps aux | grep -i "next\|node" | grep -v grep | head -5

echo ""
echo "=== Checking redeploy log ==="
tail -n 50 /var/www/vhosts/healingtechnology.com.bd/httpdocs/redeploy.log 2>/dev/null || echo "No redeploy.log"

echo ""
echo "=== App stdout log ==="
tail -n 50 /var/www/vhosts/healingtechnology.com.bd/logs/access_log 2>/dev/null | grep -i "500\|error" | tail -20 || echo "No access log errors"

echo ""
echo "=== Last 30 lines of error log ==="
tail -n 30 /var/www/vhosts/healingtechnology.com.bd/logs/error_log 2>/dev/null || echo "No error log"
