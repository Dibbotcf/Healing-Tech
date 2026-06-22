#!/bin/bash
# =============================================================
# Healing Technology — VPS Redeploy Script
# Run this on the server: bash redeploy.sh
# =============================================================

export PATH=/opt/plesk/node/22/bin:$PATH
NODE=/opt/plesk/node/22/bin/node

APP_DIR="/var/www/vhosts/healingtechnology.com.bd/httpdocs"
STANDALONE_DIR="$APP_DIR/.next/standalone"
LOG="$APP_DIR/redeploy.log"
PORT=12000

echo "=============================" | tee -a "$LOG"
echo "Deploy started: $(date)" | tee -a "$LOG"
echo "=============================" | tee -a "$LOG"

cd "$APP_DIR" || { echo "ERROR: Cannot cd to $APP_DIR" | tee -a "$LOG"; exit 1; }

# ── 1. Pull latest code ──────────────────────────────────────
echo "[1/6] Pulling latest code from GitHub..." | tee -a "$LOG"
git pull origin master 2>&1 | tee -a "$LOG"

# ── 2. Install dependencies ──────────────────────────────────
echo "[2/6] Installing dependencies..." | tee -a "$LOG"
npm install --legacy-peer-deps 2>&1 | tee -a "$LOG"

# ── 3. Build the app ─────────────────────────────────────────
echo "[3/6] Building Next.js app..." | tee -a "$LOG"
npm run build 2>&1 | tee -a "$LOG"

# Check build actually succeeded
if [ ! -f "$STANDALONE_DIR/server.js" ]; then
  echo "❌ BUILD FAILED — server.js not found in standalone. Aborting." | tee -a "$LOG"
  exit 1
fi

# ── 4. Copy .env + public + static assets to standalone ───────
echo "[4/6] Copying assets + .env to standalone..." | tee -a "$LOG"
cp "$APP_DIR/.env" "$STANDALONE_DIR/.env" 2>&1 | tee -a "$LOG"

rsync -a --update "$APP_DIR/public/" "$STANDALONE_DIR/public/" 2>&1 | tee -a "$LOG"

cp -r "$APP_DIR/.next/static" "$STANDALONE_DIR/.next/" 2>&1 | tee -a "$LOG"

# ── 5. Kill existing Node process on the port ────────────────
echo "[5/6] Stopping existing server on port $PORT..." | tee -a "$LOG"
fuser -k ${PORT}/tcp 2>/dev/null || true
sleep 2

# ── 6. Start new server with explicit PORT ───────────────────
echo "[6/6] Starting server on port $PORT..." | tee -a "$LOG"
cd "$STANDALONE_DIR"
export PORT=$PORT
export NODE_ENV=production
setsid $NODE server.js >> "$LOG" 2>&1 &

sleep 3
if fuser ${PORT}/tcp > /dev/null 2>&1; then
  echo "" | tee -a "$LOG"
  echo "✅ Deploy complete at $(date)" | tee -a "$LOG"
  echo "   ✓ Server confirmed running on port $PORT" | tee -a "$LOG"
  echo "   Logs: $LOG" | tee -a "$LOG"
else
  echo "" | tee -a "$LOG"
  echo "⚠️  Deploy finished but server NOT detected on port $PORT — check logs!" | tee -a "$LOG"
fi
