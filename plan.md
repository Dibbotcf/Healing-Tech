# Healing Technology — CI/CD Migration Plan
**Date:** 2026-06-24 (Tomorrow)
**Goal:** Move from old GitHub repo to new one, rebuild all Coolify app settings from scratch, verify both live URLs.

---

## Quick Reference

| Item | Value |
|------|-------|
| Old GitHub | https://github.com/ehsanhossain/Healing-Technology.git |
| **New GitHub** | **https://github.com/Dibbotcf/Healing-Tech.git** |
| Coolify Dashboard | https://deploy.oryzen.app |
| Coolify Login | quaziehsanh@gmail.com / `ehsl~!u7<uWu'17NQGYZgX` |
| Live Site | https://healingtechnology.com.bd |
| Live CMS | https://cms.healingtechnology.com.bd |
| Directus Token | `ht-migrate-token-sgut6bo2qxe` |
| Facebook Pixel | `1630649381331754` |

---

## ⚠️ Critical — Do NOT Touch

These must stay running throughout the whole process:
- **Directus CMS service** in Coolify (`cms.healingtechnology.com.bd`) — all product/order/category data lives here
- **Directus's internal Postgres** — inside the Directus stack, contains all live data
- Old app Postgres container `qzk1bz2azjqbv1kbznvux5p8` — keep it, don't delete (it has old Payload data as backup)

## ✅ Already Done (2026-06-23)

- Local `healing-technology` Payload database **deleted** — confirmed no impact, app runs fine on Directus
- Local dev server verified working at http://localhost:12000
- Local Directus verified working at http://localhost:8055
- Local Postgres now has only `directus` database — clean setup

---

## Phase 0 — Safety Backup (Do This First, Before Anything Else)

### 0.1 — Backup Directus DB (Production Data)
Go to **Coolify → Server Terminal** and run:
```bash
# Find the Directus Postgres container name
docker ps | grep -i directus

# Then dump its database (replace CONTAINER_NAME)
docker exec CONTAINER_NAME pg_dump -U directus directus \
  > /data/healing-tech-backups/directus-backup-$(date +%Y%m%d-%H%M%S).sql

echo "Backup complete"
```

### 0.2 — Backup Old Payload Postgres (Just in Case)
```bash
docker exec qzk1bz2azjqbv1kbznvux5p8 pg_dump -U postgres postgres \
  -f /tmp/payload-backup.sql \
  && docker cp qzk1bz2azjqbv1kbznvux5p8:/tmp/payload-backup.sql \
     /data/healing-tech-backups/payload-backup-$(date +%Y%m%d-%H%M%S).sql

echo "Payload DB backup complete"
```

### 0.3 — Note Down All Current Coolify Env Vars
In Coolify → app → Environment Variables, screenshot or copy all vars:
- `DIRECTUS_URL`
- `DIRECTUS_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
- `PORT`

---

## Phase 1 — Push Code to New GitHub Repo

### 1.1 — Commit Any Pending Local Changes
```powershell
git add -A
git commit -m "chore: prepare for repo migration to Dibbotcf/Healing-Tech"
```

### 1.2 — Add New Remote and Push
```powershell
# Rename old remote
git remote rename origin old-origin

# Add new remote
git remote add origin https://github.com/Dibbotcf/Healing-Tech.git

# Push all branches and tags to new repo
git push -u origin master
git push --tags
```

### 1.3 — Verify on GitHub
- Open https://github.com/Dibbotcf/Healing-Tech
- Confirm `master` branch is there with all commits
- Confirm latest code (Directus migration, order system) is present

### 1.4 — (Optional) Remove Old Remote
```powershell
git remote remove old-origin
```

---

## Phase 2 — Delete Old Coolify Application

> The DB and Directus service stay. Only the Next.js app is deleted.

1. Go to https://deploy.oryzen.app
2. Navigate: **Healing Technology → production** environment
3. Find **"Healing Technology Site"** (UUID: `m12w5ej89oq99jzkbwc3375s`)
4. Open app settings → scroll to bottom → **Delete Application**
5. Confirm deletion

**Do NOT delete:**
- PostgreSQL database `qzk1bz2azjqbv1kbznvux5p8`
- Directus service stack

---

## Phase 3 — Create New Coolify Application

1. In **Healing Technology → production**, click **+ New Resource**
2. Select **Application**
3. Select source: **GitHub** (connect with Dibbotcf account if not already connected)
4. Choose repository: `Dibbotcf/Healing-Tech`
5. Branch: `master`

---

## Phase 4 — Configure New App Settings

### 4.1 — General Settings
| Field | Value |
|-------|-------|
| App Name | Healing Technology Site |
| Build Pack | **Nixpacks** |
| Port | **3000** |
| Base Directory | `/` |
| Start Command | `HOSTNAME=0.0.0.0 node .next/standalone/server.js` |

### 4.2 — Domains
Add these three domains:
```
https://healingtechnology.com.bd
https://www.healingtechnology.com.bd
```
- Enable: **Redirect www → non-www** (or allow both)

### 4.3 — Environment Variables
Set all of these in Coolify → Environment:
```
NEXT_PUBLIC_SITE_URL=https://healingtechnology.com.bd
DIRECTUS_URL=https://cms.healingtechnology.com.bd
DIRECTUS_TOKEN=ht-migrate-token-sgut6bo2qxe
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1630649381331754
PORT=3000
```

### 4.4 — Persistent Storage (Media Volume)
> ⚠️ Important: only needed if any local media files exist in `/app/public/media`. Since all media is now in Directus, this may no longer be needed. Skip for now; add back only if missing media is found after deploy.

If needed:
| Field | Value |
|-------|-------|
| Host Path | `/data/coolify/applications/NEW_UUID/` |
| Container Path | `/app/public/media` |

### 4.5 — Healthcheck
| Field | Value |
|-------|-------|
| Enabled | Yes |
| Type | HTTP GET |
| Host | localhost |
| Port | 3000 |
| Path | `/` |
| Return Code | 200 |
| Interval | 5s |
| Timeout | 5s |
| Retries | 10 |
| **Start Period** | **60s** |

### 4.6 — Auto-Deploy (Webhook)
1. In the new Coolify app, find: **Webhook URL** (under Settings → Webhook or similar)
2. Copy it
3. Go to https://github.com/Dibbotcf/Healing-Tech → Settings → Webhooks → Add Webhook
4. Paste the Coolify webhook URL
5. Content type: `application/json`
6. Events: **Just the push event**
7. Save webhook

---

## Phase 5 — nixpacks.toml Verification

The `nixpacks.toml` already exists in the repo root and is correct:
```toml
[phases.setup]
nixPkgs = ["nodejs_22", "git"]

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

No changes needed. Coolify will pick this up automatically.

---

## Phase 6 — Deploy & Monitor

### 6.1 — Trigger First Deploy
In Coolify → new app → click **Deploy** (or push a test commit to master)

### 6.2 — Monitor Build Logs
- Watch the build in Coolify's **Deployments** tab
- Build takes approximately 4–8 minutes
- Stages: install → build → start → healthcheck

### 6.3 — Check for Build Errors
Common things to watch for:
- `npm install` fails → check `--legacy-peer-deps` flag is in nixpacks.toml
- `npm run build` fails → TypeScript errors or missing env vars
- Healthcheck fails → 60s start period may need increasing; check app logs

---

## Phase 7 — Verify Both URLs

### 7.1 — Main Site: https://healingtechnology.com.bd
- [ ] Homepage loads with products
- [ ] Product images display (from Directus)
- [ ] Navigation works (Navbar categories load)
- [ ] Footer categories load
- [ ] Product detail pages open
- [ ] Add to cart works
- [ ] Checkout page opens with delivery type selector (Inside Dhaka ৳80 / Outside Dhaka ৳150)
- [ ] www.healingtechnology.com.bd redirects correctly

### 7.2 — CMS: https://cms.healingtechnology.com.bd
- [ ] Directus login page loads
- [ ] Login works: `quaziehsanh@gmail.com` / `k1E6bH8n8CtIo3LwNsOnddXvSxu1ZAcu`
- [ ] Products collection shows all products with data
- [ ] Orders collection shows order history
- [ ] Files/Media collection shows uploaded images

### 7.3 — CI/CD Test
Make a small change (e.g., update a text), push to `master`:
```powershell
git add -A
git commit -m "test: verify CI/CD pipeline with new repo"
git push origin master
```
- Coolify should auto-trigger a new deploy within 30 seconds (webhook)
- Build completes and new version goes live

---

## Phase 8 — Update Local Dev Settings

### 8.1 — Verify Local Remote
```powershell
git remote -v
# Should show: origin → https://github.com/Dibbotcf/Healing-Tech.git
```

### 8.2 — Update settings.md
Update `.agent/workflows/settings.md`:
- Change GitHub repo URL to `https://github.com/Dibbotcf/Healing-Tech.git`
- Update App UUID with new Coolify UUID

---

## Phase 9 — Cleanup Old Resources (After Everything Works)

Only do this **after** confirming both URLs work perfectly:
- [ ] Delete old Payload Postgres container `qzk1bz2azjqbv1kbznvux5p8` from Coolify (or keep as insurance for 1 week)
- [ ] Remove old GitHub webhook from `ehsanhossain/Healing-Technology` (if you still have access)

---

## Order of Operations Summary

```
Phase 0: Backup Directus DB + Payload DB → SAFETY FIRST
Phase 1: Push code to https://github.com/Dibbotcf/Healing-Tech.git
Phase 2: Delete old Coolify Next.js app (keep DB + Directus)
Phase 3: Create new Coolify app from new GitHub repo
Phase 4: Configure domains, env vars, healthcheck, storage
Phase 5: Verify nixpacks.toml is in repo (it is ✅)
Phase 6: Deploy + monitor build logs
Phase 7: Test healingtechnology.com.bd + cms.healingtechnology.com.bd
Phase 8: Test auto-deploy (push a commit, confirm Coolify auto-builds)
Phase 9: Cleanup old resources
```

**Estimated total time:** 1–2 hours

---

## Env Vars for New Coolify App (Copy-Paste Ready)

```
NEXT_PUBLIC_SITE_URL=https://healingtechnology.com.bd
DIRECTUS_URL=https://cms.healingtechnology.com.bd
DIRECTUS_TOKEN=ht-migrate-token-sgut6bo2qxe
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1630649381331754
PORT=3000
```

---

## Pending Items to Also Fix Tomorrow (Outstanding from Before)

1. Add 3 missing fields to Directus `orders` collection (if not done yet):
   - `delivery_type` — String
   - `delivery_charge` — Decimal
   - `invoice_url` — String

2. 47 product images still missing in Directus — source and re-upload

3. Delete test product ID 135 from Directus
