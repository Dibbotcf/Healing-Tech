---
description: Documents production bugs that have been fixed on Healing Technology. Reference this before debugging any production 500 errors, database issues, or proxy problems. Never touch the database directly unless listed here.
---

# Error Fix Log — Healing Technology

> **Purpose:** A running log of production bugs, their root causes, and exact fixes applied.
> Before debugging any issue, read this file first. It may already be solved.

---

## Bug #1 — All API Routes Returning 500 (Products, Menus, Categories, Logos, Testimonials)

**Date Fixed:** 2026-06-04
**URL Affected:** https://healingtechnology.com.bd/
**Symptom:** Multiple `/api/*` endpoints returned HTTP 500 in the browser console. Products, testimonials, categories, menus, partner logos, and client logos all failed to load. Clearing browser cache made it worse — cached data was gone and live requests all failed.

### Root Cause A — Traefik Proxy Was Down

The Traefik reverse proxy on the Coolify server had stopped running. Without it, HTTPS traffic from the internet could not reach the Next.js container. The app itself was running fine inside Docker — only external traffic was blocked.

**Why it appeared browser-specific:** Other browsers still had cached API responses (Next.js `Cache-Control: public, s-maxage=60`). The affected browser cleared its cache and hit the server when the proxy was down, receiving raw connection errors that the app reported as 500s.

**Fix:**
1. Go to https://deploy.oryzen.app
2. Login: `quaziehsanh@gmail.com` / `ehsl~!u7<uWu'17NQGYZgX`
3. Navigate to **Servers** (left sidebar)
4. Click on **"The Empire (localhost)"** server
5. Click the **"Start Proxy"** button
6. Wait ~10 seconds for Traefik to restart

**Future prevention:** If the site shows 502 Bad Gateway or all APIs fail suddenly (especially after the server reboots), always check the proxy first before touching code or the database.

---

### Root Cause B — DATABASE_URI Password Mismatch

The `DATABASE_URI` environment variable in the Coolify app had a subtle typo in the PostgreSQL password (characters `I` and `l` were swapped). This caused `password authentication failed for user "postgres"` errors on every Payload CMS database query, making all API routes crash.

**Error seen in server logs:**
```
password authentication failed for user "postgres"
Products API error: [connection error]
Mega menu API Error: [connection error]
Categories API Error: [connection error]
```

**Fix (without touching the database):**
1. Go to https://deploy.oryzen.app → Projects → Healing Technology → production
2. Click on the **PostgreSQL database** resource (NOT the app)
3. Go to **Configuration** tab
4. Copy the exact **Internal Connection URL** (postgres://postgres:PASSWORD@hostname:5432/postgres)
5. Go BACK to the **Healing Technology Site** application resource
6. Click **Environment Variables** → click **"Developer View"**
7. Find the `DATABASE_URI=` line
8. Replace its value with the correct URL copied from step 4
9. Click **"Save All Environment Variables"**
10. Click **"Redeploy"** (top right of the app page)
11. Wait 5–10 minutes for the build to complete

> ⚠️ **NEVER edit the database directly (no DROP TABLE, no manual SQL).** All schema changes happen automatically via Payload's `push: true` on each deploy. If you think data is missing, check the admin panel at `/admin` first.

**Correct DATABASE_URI format:**
```
DATABASE_URI=postgres://postgres:Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA@qzk1bz2azjqbv1kbznvux5p8:5432/postgres
```
> Always get the fresh value from the Coolify database config page — never hardcode or guess the password.

---

## Bug #2 — Last Page of Products Shows Incomplete Rows (Fewer than 3 Rows)

**Date Fixed:** 2026-06-04
**URL Affected:** https://healingtechnology.com.bd/ (Homepage "Latest Products" section)
**Symptom:** The product carousel shows 3 full rows (12 products) on most pages. On the last page, if fewer than 12 products exist (e.g., only 4), only 1 row was shown — the grid felt empty and unprofessional.

### Root Cause

The `ProductCarousel` component renders only the real products returned by the API. If the last page has e.g. 4 products, only 1 row of 4 appears. There are no placeholder/ghost cards to fill the remaining 2 rows.

**Fix:**
In `src/components/ProductCarousel.tsx`, after fetching the page's products, calculate how many ghost/placeholder cards are needed to fill up to `PAGE_SIZE` (12). Render those ghost cards as visually styled empty slots so the grid always shows 3 full rows.

The ghost cards use:
- Same card dimensions as real cards
- A subtle dashed border + soft background
- No content (intentionally blank)
- `aria-hidden="true"` so screen readers skip them

**File changed:** [`src/components/ProductCarousel.tsx`](file:///f:/Antigravity%20Projects/Healing%20Technology/src/components/ProductCarousel.tsx)

---

## Debugging Checklist for Future 500 Errors

Use this order of investigation — from fastest to slowest:

1. **Is the Traefik proxy running?**
   - Coolify → Servers → The Empire → check "Stop Proxy" button is visible (means it's running)
   - If "Start Proxy" shows, click it and wait 10s

2. **Is the database password correct?**
   - Coolify → Healing Technology project → PostgreSQL resource → Configuration → copy Internal URL
   - Compare with `DATABASE_URI` in the app's Environment Variables
   - If different, update env var and redeploy

3. **Is the container actually running?**
   - Coolify → Healing Technology project → Application → check status badge
   - If "Exited" or "Error", check Logs tab for crash reason
   - Common fix: Redeploy

4. **Is it a schema mismatch after a new deploy?**
   - Payload's `push: true` auto-syncs schema on startup — usually self-healing
   - If a new collection was added, it creates the table automatically
   - If it still fails, check Coolify → Commands on the DB resource

5. **Is it a code bug?**
   - Check the Coolify → Logs tab for the running app
   - Look for the error message from the specific API route (e.g., "Products API error:")
   - Check the stack trace — it will tell you exactly which line failed

---

## Environment Variables Reference (Production — Coolify)

| Variable | Value / Notes |
|---|---|
| `NODE_ENV` | `production` (set automatically by Next.js build) |
| `PORT` | `3000` |
| `PAYLOAD_SECRET` | `d82494f0614eb589ba5b3e21b7abceb1` |
| `NEXT_PUBLIC_SITE_URL` | `https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io` |
| `DATABASE_URI` | Get from Coolify PostgreSQL resource → Configuration → Internal URL |
| `NIXPACKS_NODE_VERSION` | `22` |

> 🔒 Always get the live DATABASE_URI from Coolify. Never hardcode it anywhere in source files.

---

*Maintained by Antigravity. Add new bugs and fixes here as they are discovered.*
