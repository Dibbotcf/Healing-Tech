#!/bin/bash
# =============================================================
# Healing Technology — VPS Redeploy Script
# Run this on the server: bash redeploy.sh
# =============================================================

export PATH=/opt/plesk/node/22/bin:$PATH

APP_DIR="/var/www/vhosts/healingtechnology.com.bd/httpdocs"
STANDALONE_DIR="$APP_DIR/.next/standalone"
LOG="$APP_DIR/redeploy.log"
PORT=12000

echo "=============================" | tee -a "$LOG"
echo "Deploy started: $(date)" | tee -a "$LOG"
echo "=============================" | tee -a "$LOG"

cd "$APP_DIR" || { echo "ERROR: Cannot cd to $APP_DIR" | tee -a "$LOG"; exit 1; }

# ── 1. Pull latest code ──────────────────────────────────────
echo "[1/7] Pulling latest code from GitHub..." | tee -a "$LOG"
git pull origin master 2>&1 | tee -a "$LOG"

# ── 2. Install dependencies ──────────────────────────────────
echo "[2/7] Installing dependencies..." | tee -a "$LOG"
npm install --legacy-peer-deps 2>&1 | tee -a "$LOG"

# ── 3. Run Payload migrations ────────────────────────────────
echo "[3/7] Running Payload CMS migrations..." | tee -a "$LOG"
npx payload migrate 2>&1 | tee -a "$LOG"

# ── 4. Build the app ─────────────────────────────────────────
echo "[4/7] Building Next.js app..." | tee -a "$LOG"
npm run build 2>&1 | tee -a "$LOG"

# ── 5. Copy public & static assets to standalone ─────────────
echo "[5/7] Copying assets to standalone..." | tee -a "$LOG"
cp -r "$APP_DIR/public" "$STANDALONE_DIR/public" 2>&1 | tee -a "$LOG"
mkdir -p "$STANDALONE_DIR/.next/static"
cp -r "$APP_DIR/.next/static" "$STANDALONE_DIR/.next/static" 2>&1 | tee -a "$LOG"

# ── 6. Kill existing Node process on the port ────────────────
echo "[6/7] Stopping existing server on port $PORT..." | tee -a "$LOG"
fuser -k ${PORT}/tcp 2>/dev/null || true
sleep 2

# ── 7. Start new server with setsid ──────────────────────────
echo "[7/7] Starting server with setsid..." | tee -a "$LOG"
cd "$STANDALONE_DIR"
setsid node server.js >> "$LOG" 2>&1 &

echo "" | tee -a "$LOG"
echo "✅ Deploy complete at $(date)" | tee -a "$LOG"
echo "   App running on port $PORT" | tee -a "$LOG"
echo "   Logs: $LOG" | tee -a "$LOG"
