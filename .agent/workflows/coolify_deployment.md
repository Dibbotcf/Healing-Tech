---
description: Deploy or push updates to the Healing Technology app on Coolify. Reference this file whenever the user asks to deploy, redeploy, or update the Coolify production environment.
---

# Coolify Deployment Workflow — Healing Technology

> **How to use:** When the user asks to deploy an update to Coolify, push to Coolify, or mentions this file — follow the steps below in order. The routine update path is just Steps 1–3. Only do Steps 4+ if something is broken.

// turbo-all

---

## All Credentials (DO NOT EDIT — Reference Only)

### Coolify Dashboard
| Field    | Value                                  |
|----------|----------------------------------------|
| URL      | https://deploy.oryzen.app              |
| Email    | quaziehsanh@gmail.com                  |
| Password | *(stored in browser — check manually)* |
| Server   | The Empire (localhost)                 |

### Live App URL (Coolify)
```
https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io
```

### Payload CMS Admin Panel (Coolify)
```
https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io/admin
```
> First-time only: visit `/admin` to create the admin user. After that, credentials are stored in the database.

### GitHub Repository
| Field      | Value                                              |
|------------|----------------------------------------------------|
| URL        | https://github.com/ehsanhossain/Healing-Technology |
| Branch     | `master`                                           |
| Visibility | Public                                             |

### Coolify PostgreSQL (Internal — used for DATABASE_URI)
```
postgres://postgres:Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA@qzk1bz2azjqbv1kbznvux5p8:5432/postgres
```
> ⚠️ Always use the **Internal URL** (not External) in Next.js environment variables. Both the app and DB run on the same Coolify Docker network.

### Coolify PostgreSQL (External — for manual DB access via pgAdmin/psql)
| Field      | Value                                                               |
|------------|---------------------------------------------------------------------|
| Host       | `91.98.166.101`                                                     |
| Port       | `54320`                                                             |
| User       | `postgres`                                                          |
| Password   | `Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhlpcOWQKF4VjRukvgD8pkqbWIlXlgVPxA` |
| Database   | `postgres`                                                          |
> Note: External access requires "Is Public" to be checked in the Coolify Database Configuration tab.

### Plesk VPS — SSH Access (separate production server, NOT Coolify)
| Field    | Value              |
|----------|--------------------|  
| Host     | 97.74.90.189       |
| Port     | 22                 |
| User     | deploy             |
| Password | 59_Jd3gp0          |

### Plesk Panel Login
| Field    | Value                          |
|----------|--------------------------------|
| URL      | https://97.74.90.189:8443      |
| Username | deploy                         |
| Password | 59_Jd3gp0                      |

### Plesk VPS — Domain / FTP Access
| Field         | Value                            |
|---------------|----------------------------------|
| Domain        | https://healingtechnology.com.bd |
| FTP Username  | healingtechnology                |
| FTP Password  | S_hJ4NZ*rxr4i1zsw               |
| Document Root | /httpdocs                        |

### Local Development
| Field          | Value                                                          |
|----------------|----------------------------------------------------------------|
| Dev URL        | http://localhost:12000                                         |
| Database URI   | postgresql://postgres:postgres@localhost:12001/healing-technology |
| Payload Secret | d82494f0614eb589ba5b3e21b7abceb1                              |
| Admin Panel    | http://localhost:12000/admin                                   |

### Production Environment Variables (set in Coolify dashboard)
```
NIXPACKS_NODE_VERSION=22
PORT=3000
PAYLOAD_SECRET=d82494f0614eb589ba5b3e21b7abceb1
NEXT_PUBLIC_SITE_URL=https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io
NEXT_PRIVATE_LOCAL_DB=true
DATABASE_URI=postgres://postgres:Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA@qzk1bz2azjqbv1kbznvux5p8:5432/postgres
```

---

## Routine Update — Push Code Changes to Coolify

> **This is all you need for normal code updates.** Coolify has Auto Deploy enabled — a push to `master` triggers a new build automatically.

### Step 1 — Stage all changes
```powershell
git add -A; git status
```

### Step 2 — Commit with a descriptive message
```powershell
git commit -m "feat: describe your changes here"
```

### Step 3 — Push to GitHub (Coolify auto-deploys within ~30 seconds)
```powershell
git push origin master
```

After pushing, Coolify starts a new build automatically. Build takes **5–10 minutes** (npm install + Next.js build). Monitor at:
- https://deploy.oryzen.app → Projects → Healing Technology → Deployments tab

---

## Manual Redeploy (if auto-deploy didn't trigger)

If Coolify didn't pick up the push automatically, use the browser tool to:
1. Go to https://deploy.oryzen.app
2. Log in: `quaziehsanh@gmail.com`
3. Projects → Healing Technology → application resource
4. Click **Redeploy** (top right)
5. Watch **Deployment Log** for `Rolling update completed.`

---

## Fresh Setup — Deploying from Scratch

> Use this section only if the Coolify app resource was deleted and needs to be recreated.

### Step A — Create the Project
- Coolify → **Projects** → **+ Add**
- Name: `Healing Technology`
- Environment: `production`

### Step B — Add PostgreSQL Database Resource
- Inside project → **+ Add Resource** → **Database** → **PostgreSQL**
- Keep defaults → Click **Start**
- Copy the **Internal Connection URL** → use it as `DATABASE_URI`

### Step C — Add Application Resource
- Inside project → **+ Add Resource** → **Application** → **Public Repository**
- Repository: `https://github.com/ehsanhossain/Healing-Technology`
- Branch: **`master`** ← Must be master, NOT main
- Build Pack: **Nixpacks**
- Click **Save**

### Step D — Configure General Settings
- Configuration → **General**
- Domains: `https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io`
  *(or click "Generate Domain" for a new sslip.io subdomain)*
- Ports Exposes: `3000`
- Click **Save**

### Step E — Set Environment Variables
- Configuration → **Environment Variables** → click **"Developer View"**
- Paste the 6 variables from the credentials block above
- Click **"Save All Environment Variables"**

### Step F — Deploy
- Click **Deploy** → watch logs → wait for `Rolling update completed.`

---

## Database Migration — Plesk to Coolify

If you ever need to overwrite the Coolify database with the latest live data from Plesk, use the automated workaround method below (which bypasses any external connection issues):

1. **Dump the database** from Plesk:
   ```powershell
   node tmp/run_vps_cmd_ht.js "PGPASSWORD=HealDB2026 pg_dump -U healingtechnology.co_bgieab3zdtl -h 127.0.0.1 -d healingtechnology --no-owner --no-privileges > latest_plesk_dump.sql"
   ```
2. **Download** it locally:
   ```powershell
   node tmp/run_vps_cmd_ht.js download latest_plesk_dump.sql /var/www/vhosts/healingtechnology.com.bd/httpdocs/latest_plesk_dump.sql
   ```
3. **Copy** it into the Next.js `public/` directory:
   ```powershell
   Copy-Item "latest_plesk_dump.sql" -Destination "public\latest_plesk_dump.sql" -Force
   ```
4. **Deploy the restore script**:
   - Temporarily add `"postgresql"` to `nixPkgs` in `nixpacks.toml`.
   - Create a temporary route at `src/app/db-restore/route.ts` that executes: `psql "$DATABASE_URI" -f "public/latest_plesk_dump.sql"`
   - Commit and push to Coolify.
5. **Trigger** the restore by visiting `https://[coolify-domain]/db-restore`.
6. **Clean up**: Delete the dump, delete the route, remove `postgresql` from `nixpacks.toml`, and push again.

---

## Key Files in the Repo (DO NOT REMOVE OR MODIFY WITHOUT REASON)

### `nixpacks.toml` — Root of project
```toml
[phases.setup]
nixPkgs = ["nodejs_22"]

[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = [
  "npm run build",
  "cp -r .next/static .next/standalone/.next/static",
  "cp -r public .next/standalone/public"
]

[start]
cmd = "HOSTNAME=0.0.0.0 node .next/standalone/server.js"
```

**Why each line matters:**
- `nodejs_22` — pins Node 22 (project requires ≥22.13.0)
- `--legacy-peer-deps` — avoids npm peer dependency errors during install
- `cp -r .next/static ...` — Next.js standalone mode does NOT copy CSS/JS automatically — this is critical
- `cp -r public ...` — same as above, public folder (images, logos) must be copied manually
- `HOSTNAME=0.0.0.0` — makes Next.js bind to all interfaces so Traefik (the reverse proxy) can reach it

### `package.json` scripts
```json
"dev":   "next dev -p 12000",   ← local only, keep port 12000
"build": "next build",
"start": "next start",          ← NO hardcoded port, reads PORT env var
```

### `next.config.ts` images section
```ts
{ protocol: 'http', hostname: 'localhost', port: '', pathname: '/**' }
```
`port: ''` means any port — works for both local (12000) and production (3000).

---

## Troubleshooting Guide

### Problem: 502 Bad Gateway
**Cause A:** `HOSTNAME` not set to `0.0.0.0` → server binds to localhost, Traefik can't reach it.  
**Fix:** Ensure `nixpacks.toml` start cmd is `HOSTNAME=0.0.0.0 node .next/standalone/server.js`

**Cause B:** Port mismatch → app listening on wrong port.  
**Fix:** Confirm `PORT=3000` env var is set, confirm `package.json` start has no `-p XXXX` flag.

**Cause C:** Container not actually running.  
**Fix:** Go to Coolify → Logs tab → check for crash errors.

---

### Problem: Site has no CSS / completely unstyled
**Cause:** Static assets not copied into standalone directory.  
**Fix:** Ensure `nixpacks.toml` build phase includes both `cp` commands:
```toml
"cp -r .next/static .next/standalone/.next/static",
"cp -r public .next/standalone/public"
```
Then redeploy with **Force deploy (without cache)**.

---

### Problem: Build fails — Node version error
```
npm warn EBADENGINE required: { node: '>=22.13.0' }
```
**Fix:** Confirm `nixpacks.toml` has `nixPkgs = ["nodejs_22"]` AND `NIXPACKS_NODE_VERSION=22` is set as an environment variable in Coolify.

---

### Problem: Build fails — npm peer dependency errors
**Fix:** Confirm install command in `nixpacks.toml` is `npm install --legacy-peer-deps`.

---

### Problem: "Running (unknown)" status in Coolify
**This is cosmetic only.** The app is running fine. It just means no Docker healthcheck is configured.  
To fix the badge: Configuration → Healthcheck → Path: `/` / Port: `3000` / Interval: `30s`

---

### Problem: Database connection error on startup
**Fix:** Confirm `DATABASE_URI` in Coolify env vars uses the **Internal** PostgreSQL URL (not External). The internal URL hostname is a short container name like `qzk1bz2azjqbv1kbznvux5p8`, NOT an IP address.

---

## How Auto-Deploy Works

```
You push to GitHub master
        ↓
GitHub webhook fires → Coolify receives it
        ↓
Coolify pulls latest code
        ↓
Nixpacks builds Docker image:
  1. Install Node 22
  2. npm install --legacy-peer-deps
  3. npm run build
  4. cp .next/static → standalone
  5. cp public → standalone
        ↓
Docker container starts:
  HOSTNAME=0.0.0.0 node .next/standalone/server.js
        ↓
Traefik routes HTTPS traffic → port 3000 → your app
        ↓
Live at: https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io
```

---

## Deployment History

| Date       | Commit    | What Changed |
|------------|-----------|--------------|
| 2026-05-13 | `9bdb841` | Created nixpacks.toml, fixed PORT, fixed image remote pattern port |
| 2026-05-13 | `7122e7d` | Added HOSTNAME=0.0.0.0 to fix 502 Bad Gateway (Traefik routing) |
| 2026-05-13 | `6872692` | Added cp commands to fix missing CSS/static assets |

---

*Maintained by Antigravity. Update this file whenever deployment config changes.*
