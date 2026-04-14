# Git to VPS: Healing Technology Deployment & Troubleshooting Guide

This document sequentially logs the exact methods, strategies, and scripts used to deploy the Payload CMS 3 and Next.js 16 production application on the GoDaddy Plesk VPS.

---

## Essential Credentials & Server Info

| Item | Value |
|---|---|
| **VPS IP** | `97.74.90.189` |
| **SSH User** | `healingtechnology` |
| **SSH Password** | `S_hJ4NZ*rxr4i1zsw` |
| **Plesk Panel** | `https://healingtechnology.com.bd:8443` |
| **Plesk User** | `deploy` |
| **Plesk Password** | `59_Jd3gp0` |
| **App Directory** | `/var/www/vhosts/healingtechnology.com.bd/httpdocs/` |
| **Standalone Dir** | `/var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/` |
| **Node Binary** | `/opt/plesk/node/22/bin/node` |
| **App Port** | `12000` (Apache proxies this port to the public) |
| **App Log** | `/var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log` |

### Database Credentials

| Item | Value |
|---|---|
| **DB Engine** | PostgreSQL (localhost `127.0.0.1:5432`) |
| **DB Name** | `healingtechnology` |
| **DB Username** | `healingtechnology.co_bgieab3zdtl` |
| **DB Password** | `HealDB2026` |
| **Full DATABASE_URI** | `postgresql://healingtechnology.co_bgieab3zdtl:HealDB2026@127.0.0.1:5432/healingtechnology` |

> ⚠️ **IMPORTANT:** Do NOT use special characters (like `@`, `!`) in the DB password. The postgres.js client double-decodes URL-encoded characters (e.g. `%40` → `@`), which splits the URL and causes `ENOTFOUND` errors at runtime.

### .env File (Production)

```env
NEXT_PUBLIC_SITE_URL=https://healingtechnology.com.bd
PORT=12000
PAYLOAD_SECRET=d82494f0614eb589ba5b3e21b7abceb1
DATABASE_URI=postgresql://healingtechnology.co_bgieab3zdtl:HealDB2026@127.0.0.1:5432/healingtechnology
```

The `.env` file must exist in **TWO locations**:
1. `/var/www/vhosts/healingtechnology.com.bd/httpdocs/.env` (root)
2. `/var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/.env` (used by the server at runtime)

---

## Deployment Pipeline (Step by Step)

### Step 1: Push Code from Local to GitHub
```bash
git add .
git commit -m "your message"
git push origin master
```

### Step 2: Pull Latest Code on VPS
SSH into the VPS and pull:
```bash
ssh healingtechnology@97.74.90.189
cd /var/www/vhosts/healingtechnology.com.bd/httpdocs
git pull origin master
```

### Step 3: Run the Build Script
The `run_build.sh` script in root automates install + build + restart:
```bash
bash run_build.sh
```

This script does:
1. `rm -rf node_modules package-lock.json` — clean install
2. `npm install --legacy-peer-deps` — install dependencies
3. `npm run build` — compile the Next.js production build
4. Copies `public/` and `.next/static/` into `.next/standalone/`
5. Kills any existing process on port `12000`
6. Starts the standalone server daemonized via `setsid`

### Step 4: Verify the Server is Running
```bash
# Check process on port 12000
fuser 12000/tcp

# Test HTTP locally
curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:12000/products

# Tail logs
tail -n 30 app.log
```

---

## Manual Server Restart (Quick Command)
If you only need to restart without rebuilding:

```bash
cd /var/www/vhosts/healingtechnology.com.bd/httpdocs

# Kill existing processes
fuser -k 12000/tcp 2>/dev/null; fuser -k 12001/tcp 2>/dev/null

# Start server
cd .next/standalone
export PORT=12000
export NODE_ENV=production
setsid /opt/plesk/node/22/bin/node server.js > /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log 2>&1 &
```

Always make sure the `.next/standalone/.env` is up to date before restarting!

---

## Troubleshooting Log

### Issue 1: Git Worktree Uncommitted Changes Error
**Error:** `failed to checkout worktree changes: main branch has uncommitted changes`
**Fix:** Stash untracked files and commit them:
```bash
git stash -u        # stash including untracked
# or just commit the tmp/ utility scripts
git add tmp/
git commit -m "chore: add utility scripts"
```

---

### Issue 2: Payload CMS `undefined_table` (Error Code `42P01`)
**Error:** 500 on `/admin/login`, log shows `code: '42P01'`
**Cause:** Production build does NOT auto-push Payload's DB schema.
**Fix:** Boot the dev server once to force Payload to initialize the schema:
```bash
timeout 25 npm run dev -- --port 12004 2>&1 || true
```
Payload's auto-migration runs on first dev boot and creates all tables.

---

### Issue 3: TypeScript Build Error in `(payload)/layout.tsx`
**Error:** `Type error: Property 'suppressHydrationWarning' does not exist`
**Fix:** Removed the invalid `suppressHydrationWarning` prop from `RootLayout` in `src/app/(payload)/layout.tsx`. This was a React 19 / Payload 3 incompatibility.

---

### Issue 4: `password authentication failed for user "healingtech"`
**Cause:** The Plesk database user `healingtech` no longer existed. The database user was `healingtechnology.co_bgieab3zdtl`.
**Fix:** 
1. Log into Plesk → Databases → User Management
2. Recreate or reset the correct database user with PostgreSQL server selected
3. Update `DATABASE_URI` in both `.env` files

---

### Issue 5: `ENOTFOUND base` — Wrong DB Host at Runtime
**Error:** `Error: cannot connect to Postgres: getaddrinfo ENOTFOUND base`
**Cause:** The password contained `@` (encoded as `%40` in the URI). The postgres.js library URL-decodes it, creating two `@` signs — the parser resolves to a garbage host (`base`).
**Fix:** Reset DB password to a clean alphanumeric string (no special characters):
```bash
PGPASSWORD='@04443332351Ht' psql -h 127.0.0.1 \
  -U healingtechnology.co_bgieab3zdtl \
  -d healingtechnology \
  -c "ALTER USER \"healingtechnology.co_bgieab3zdtl\" WITH PASSWORD 'HealDB2026';"
```
Then update both `.env` files and restart the server.

---

### Issue 6: Apache 503 — Server on Wrong Port
**Error:** `503 Service Unavailable` from Apache even when `curl http://127.0.0.1:12001/` returns 200
**Cause:** `package.json` has `"start": "next start -p 12000"`. Plesk's Apache reverse proxy is configured to forward to **port `12000`**. Our server was starting on `12001`.
**Fix:** Always start the standalone server on port **`12000`**:
```bash
export PORT=12000
setsid /opt/plesk/node/22/bin/node .next/standalone/server.js > app.log 2>&1 &
```
And update `.env` / `.next/standalone/.env` to set `PORT=12000`.

---

## Seeding Products Data
If the database is empty and needs seeding:

1. Temporarily create `src/app/api/seed/route.ts` with seeding logic
2. Start the dev server: `npm run dev -- --port 12004`
3. Trigger: `curl http://127.0.0.1:12004/api/seed`
4. Remove the seed route: `rm -rf src/app/api/seed`

This avoids the `tsx` ESM module crash that happens when running seed scripts directly.

---

## Remote SSH Utility (from Local Machine)
The file `tmp/run_vps_cmd.js` allows running remote commands via Node.js:
```bash
# Run a remote command
node tmp/run_vps_cmd.js "tail -n 30 app.log"

# Upload a local file to VPS
node tmp/run_vps_cmd.js upload "tmp/fix_db.sh" "/var/www/vhosts/healingtechnology.com.bd/httpdocs/fix_db.sh"
```
