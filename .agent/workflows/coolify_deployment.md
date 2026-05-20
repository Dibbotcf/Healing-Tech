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
| Password | ehsl~!u7<uWu'17NQGYZgX                 |
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
|------------|-----------------------------------------------------|
| URL        | https://github.com/ehsanhossain/Healing-Technology  |
| Branch     | `master`                                            |
| Visibility | Private                                             |

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
| Password   | `Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA` |
| Database   | `postgres`                                                          |
> Note: External access requires "Is Public" to be checked in the Coolify Database Configuration tab.

### Plesk VPS — SSH Access (separate production server, NOT Coolify)
| Field    | Value              |
|----------|--------------------|
| Host     | 97.74.90.189       |
| Port     | 22                 |
| User     | tcfthailand        |
| Password | siam89@base        |

### Plesk Panel Login
| Field    | Value                          |
|----------|--------------------------------|
| URL      | https://97.74.90.189:8443      |
| Username | healingtechnology               |
| Password | S_hJ4NZ*rxr4i1zsw              |

### Plesk VPS — Domain / FTP Access
| Field         | Value                            |
|---------------|----------------------------------|
| Domain        | https://healingtechnology.com.bd |
| FTP Username  | healingtechnology                |
| FTP Password  | S_hJ4NZ*rxr4i1zsw               |
| Document Root | /httpdocs                        |

### Local Development
| Field          | Value                                                            |
|----------------|------------------------------------------------------------------|
| Dev URL        | http://localhost:12000                                           |
| Database URI   | postgresql://postgres:postgres@localhost:12001/healing-technology |
| Payload Secret | d82494f0614eb589ba5b3e21b7abceb1                                |
| Admin Panel    | http://localhost:12000/admin                                     |

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
- Paste all 6 variables from the credentials block above
- Click **"Save All Environment Variables"**

### Step F — Deploy
- Click **Deploy** → watch logs → wait for `Rolling update completed.`

### Step G — Create First Admin User
- Visit `https://[your-domain]/admin`
- Fill in your name, email, and password → **Create First User**
- This creates the admin account stored in the Coolify PostgreSQL database.

---

## How Auto-Deploy Works (Full Pipeline)

```
You make code changes locally
        ↓
git add -A → git commit → git push origin master
        ↓
GitHub receives the push
        ↓
GitHub webhook fires → Coolify receives it (~5 seconds)
        ↓
Coolify pulls latest code from GitHub
        ↓
Nixpacks builds Docker image (5-10 min total):
  Phase 1 — Setup:   Install Node.js 22
  Phase 2 — Install: npm install --legacy-peer-deps
  Phase 3 — Build:   npm run build (Next.js + Payload compile)
                     cp -r .next/static → .next/standalone/.next/static
                     cp -r public → .next/standalone/public
        ↓
Docker container starts:
  HOSTNAME=0.0.0.0 node .next/standalone/server.js
  (reads PORT=3000 from env var)
        ↓
On startup, Payload CMS auto-syncs DB schema:
  - New collections → new tables created automatically (push: true)
  - Existing data is preserved
        ↓
Traefik reverse proxy routes HTTPS traffic → port 3000 → your app
        ↓
Live at: https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io
```

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
- `cp -r public ...` — public folder (images, logos, media) must be copied manually
- `HOSTNAME=0.0.0.0` — makes Next.js bind to all interfaces so Traefik can reach it

### `next.config.ts`
```ts
output: "standalone"          // Enables standalone server.js build mode
experimental.proxyClientMaxBodySize: '2gb'  // Allows large media uploads (videos, PDFs)
images.remotePatterns: [{ protocol: 'https', hostname: '**' }]  // Allows any HTTPS image
```

### `src/proxy.ts` (NOT middleware.ts)
Handles subdomain routing: `cms.healingtechnology.com.bd` → `/admin`
> ⚠️ This file exports `proxy` (not `middleware`). Do NOT create a `src/middleware.ts` file — having both causes a fatal server crash.

### `src/payload.config.ts`
- Uses `push: true` in the PostgreSQL adapter — **Payload auto-creates/updates database tables on startup** when code changes are deployed.
- No manual migration commands needed for normal schema changes.

### `package.json` scripts
```json
"dev":   "next dev -p 12000"   ← local only, always port 12000
"build": "next build"           ← production build, no port
"start": "next start"           ← reads PORT env var (3000 in Coolify)
```

---

## CMS Collections (Database Tables)

These are all the Payload CMS collections that map to PostgreSQL tables in production:

| Collection Slug    | Table Name(s)                          | Purpose                          |
|---------------------|----------------------------------------|----------------------------------|
| `users`             | `users`, `users_sessions`              | Admin login accounts             |
| `media`             | `media`                                | All uploaded images/videos/PDFs  |
| `products`          | `products`, `products_*` (many)        | Product catalog                  |
| `categories`        | `categories`                           | Product categories (hierarchical)|
| `brands`            | `brands`                               | Equipment brands                 |
| `certifications`    | `certifications`, `certifications_rels`| Brand/product certifications     |
| `client-logos`      | `client_logos`                         | Client logo marquee              |
| `partner-logos`     | `partner_logos`                        | Partner brand logos              |
| `testimonials`      | `testimonials`                         | Customer testimonials            |
| `faqs`              | `faqs`                                 | FAQ page content                 |
| `inquiries`         | `inquiries`                            | Contact form submissions         |
| `orders`            | `orders`, `orders_items`               | Customer orders/checkout         |
| `legalPages`        | `legal_pages`                          | Privacy, Terms, Warranty pages   |
| `gallery-posts`     | *(auto-created)*                       | Gallery page images              |
| `gallery-videos`    | *(auto-created)*                       | Gallery page YouTube/video embeds|
| `siteSettings`      | `site_settings`                        | Global site info (phone, address)|

> When you add a **new collection** to `payload.config.ts`, commit and push to Coolify. Payload will auto-create the table on the next startup. **No manual SQL needed.**

---

## Media Files Warning

CMS-uploaded media (images, videos, PDFs) are stored **inside the Docker container** at `/app/public/media`. These files are **lost when the container is redeployed**.

**To persist media across deploys**, Coolify requires a **Persistent Volume** mapped to `/app/public/media`. This has NOT been configured yet.

**Current workaround**: Re-upload important media files via `/admin` after major redeployments.

---

## Database Migration — Restore from Local Backup

If you need to restore the Coolify production database from the local `backup.sql`:

1. **Ensure `backup.sql` is current** (regenerate if needed):
   ```powershell
   docker exec healing-technology-postgres pg_dump -U postgres -d healing-technology --clean --if-exists > backup.sql
   ```
2. **Commit and push** `backup.sql` to GitHub.
3. **Temporarily add a restore route** in `src/app/api/restore-db/route.ts`:
   ```ts
   import { exec } from 'child_process'
   export async function GET() {
     exec(`psql "${process.env.DATABASE_URI}" -f "public/latest_plesk_dump.sql"`)
     return Response.json({ ok: true })
   }
   ```
4. **Copy SQL to `public/`**:
   ```powershell
   Copy-Item backup.sql -Destination public/latest_plesk_dump.sql -Force
   ```
5. **Temporarily add `"postgresql"` to nixPkgs** in `nixpacks.toml`.
6. **Commit and push** → Coolify deploys.
7. **Trigger restore**: Visit `https://[coolify-domain]/api/restore-db`
8. **Clean up**: Delete the restore route, remove `public/latest_plesk_dump.sql`, remove `postgresql` from `nixpacks.toml`, and push again.

---

## Troubleshooting Guide

### Problem: 502 Bad Gateway
**Cause A:** `HOSTNAME` not set to `0.0.0.0` → server binds to localhost, Traefik can't reach it.
**Fix:** Confirm `nixpacks.toml` start cmd is `HOSTNAME=0.0.0.0 node .next/standalone/server.js`

**Cause B:** Port mismatch → app listening on wrong port.
**Fix:** Confirm `PORT=3000` env var is set. Confirm `package.json` start has no `-p XXXX` flag.

**Cause C:** Container crashed on startup.
**Fix:** Go to Coolify → **Logs** tab → look for `Error:` lines.

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
**Fix:** Confirm `nixpacks.toml` has `nixPkgs = ["nodejs_22"]` AND `NIXPACKS_NODE_VERSION=22` is set as an env var in Coolify dashboard.

---

### Problem: Build fails — npm peer dependency errors
**Fix:** Confirm install command in `nixpacks.toml` is `npm install --legacy-peer-deps`.

---

### Problem: "Running (unknown)" status in Coolify
**This is cosmetic only.** The app is running fine. No Docker healthcheck is configured.
To fix: Configuration → **Healthcheck** → Path: `/` / Port: `3000` / Interval: `30s`

---

### Problem: Database connection error on startup
```
Error: connect ECONNREFUSED
```
**Fix:** Confirm `DATABASE_URI` in Coolify env vars uses the **Internal** PostgreSQL URL. The hostname must be the short container name (e.g., `qzk1bz2azjqbv1kbznvux5p8`), NOT an IP address.

---

### Problem: 500 Error after Login (Schema Mismatch)
**Cause:** New Payload collections were added locally but the Coolify DB schema wasn't updated.
**Fix:** Simply redeploy — Payload's `push: true` auto-syncs the schema on startup. If the issue persists, use Coolify → **Commands** tab on the DB resource to run manual SQL.

---

### Problem: Images not loading / broken images
**Cause A:** Media was uploaded to the Payload admin on Coolify, but the container was redeployed and the files were lost.
**Fix:** Re-upload the images via the admin panel.

**Cause B:** `NEXT_PUBLIC_SITE_URL` is wrong in env vars, so image URLs point to wrong domain.
**Fix:** Confirm `NEXT_PUBLIC_SITE_URL` exactly matches your Coolify domain (no trailing slash).

---

## Deployment History

| Date       | Commit    | What Changed |
|------------|-----------|--------------|
| 2026-05-13 | `9bdb841` | Created nixpacks.toml, fixed PORT, fixed image remote pattern port |
| 2026-05-13 | `7122e7d` | Added HOSTNAME=0.0.0.0 to fix 502 Bad Gateway (Traefik routing) |
| 2026-05-13 | `6872692` | Added cp commands to fix missing CSS/static assets |
| 2026-05-13 | `ff7789c` | Pinned Payload CMS to 3.83.0 and manually synced DB schema on Coolify |
| 2026-05-20 | `549b84e` | Cleaned up repository: removed Backups/MediOps/site monorepo folders, updated DB backup, fixed nixpacks.toml (removed stale postgresql package), cleaned tmp/node_modules from git tracking |

---

*Maintained by Antigravity. Update this file whenever deployment config changes.*
