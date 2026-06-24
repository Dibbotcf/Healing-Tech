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

## Bug #3 — Next.js Build Fails with "Property 'referer' does not exist on type 'Headers'"

**Date Fixed:** 2026-06-11
**Symptom:** Coolify deployment failed during the build phase (`npm run build`). The live site remained on the old version.
**Error seen in Coolify build logs:**
`Type error: Property 'referer' does not exist on type 'Headers'` in `payload.config.ts` (around lines 504-507).

### Root Cause
In Next.js / standard Web Fetch API, the `Headers` object does not expose header names as direct properties (e.g., `req.headers.referer` is invalid). Instead, headers must be accessed using the `.get()` method. Attempting to access it as a property causes a TypeScript error that completely fails the Next.js standalone build.

**Fix:**
Change the code from accessing the property directly to using the `.get()` method:
```ts
// Wrong
const referer = req.headers.referer;

// Correct
const referer = req.headers.get('referer');
```
*Note: This was fixed in commit `a1a2bc1` ("fix: resolve typescript error in payload.config.ts causing build failure").*

**Future prevention:** Always use the standard `Headers.get('header-name')` method when reading request headers in Next.js App Router, middleware, or Payload CMS configuration.

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

---

## Bug #4 — Build Failed: "Both middleware file and proxy file are detected" (Next.js 16 Convention)

**Date Fixed:** 2026-06-15
**Symptom:** Coolify deployment failed during `npm run build` with:
```
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c npm run build" did not complete successfully: exit code 1
Both middleware file "./src/middleware.ts" and proxy file "./src/proxy.ts" are detected. Please use "./src/proxy.ts" only.
```

### Root Cause

**Next.js 16 renamed `middleware.ts` to `proxy.ts`.** The file `src/proxy.ts` IS the middleware in this project. A `src/middleware.ts` file was mistakenly created because the old convention (`middleware.ts`) was used without checking the Next.js 16 docs. Having both files is a hard build error.

The `src/proxy.ts` file was NOT dead code — it was always running as the proxy/middleware. It exports:
- A `proxy(request)` function (the new required name, not `middleware`)
- A `config` object with a `matcher` (same as before)

**Fix:** Delete `src/middleware.ts`. Keep `src/proxy.ts` only.

**Future prevention:**
> ⚠️ **NEVER create a `middleware.ts` file in this project.** `src/proxy.ts` is the Next.js 16 middleware equivalent. All middleware logic (CSP headers, subdomain routing) goes there. The export function must be named `proxy`, not `middleware`.
>
> Before adding any new Next.js file conventions (middleware, layout, route handlers etc.), check `node_modules/next/dist/docs/` — Next.js 16 has breaking changes from earlier versions.

---

## Bug #5 — Admin Product Create Shows Loading Forever (500 on Server Action)

**Date:** 2026-06-15
**Symptom:** Clicking "Create New" on the hero image field in the Payload admin product create form (`/admin/collections/products/create`) causes an infinite loading spinner. Browser console shows:
1. `POST /api/users/logout 400`
2. `POST /admin/collections/products/create 500`

### Root Cause

Race condition between auth token expiry and a Server Action call:

1. The user's session token expires while the product form is open
2. Payload's admin detects expiry → calls `POST /api/users/logout` (returns 400 because the session is already gone server-side)
3. The user clicks "Create New" on the hero image field — this fires a Next.js Server Action (handleServerFunctions) with the now-expired token
4. The server rejects the expired token → Server Action throws → Next.js returns 500
5. The loading spinner never resolves

This is a timing issue — it only happens on the **first** attempt after a session expires (usually after leaving the admin idle for a while). Refreshing and logging back in always resolves it.

**Fix applied:**
- `src/components/LogoutRedirect.tsx`: Added a 2-second debounce on the forced redirect so the admin redirects to login quickly after token expiry, reducing the window where a user can click while their session is already dead.

**Workaround for users:**
If you see the loading spinner stuck on product create:
1. Refresh the page
2. Log in again if prompted
3. Try creating the product again — it will work

**Permanent fix note:** This is a Payload CMS + Next.js 16 Server Action limitation. `handleServerFunctions` throws a 500 (not a 401) on auth failure. Cannot be fixed from application code without patching Payload internals.

---

## Bug #6 — "Pay Later" Orders Failing Validation

**Date Fixed:** 2026-06-15
**Symptom:** Orders placed with "Pay Later" option fail silently — Payload rejects the order with a validation error because `pay-later` was not a valid option in the `paymentMethod` select field.

### Root Cause

The checkout page (`src/app/(frontend)/checkout/page.tsx`) was updated to send `paymentMethod: 'pay-later'` to the orders API, but the Payload CMS orders collection only accepted `bkash`, `sslcommerz`, and `cod` as valid values.

**Fix:** Added `{ label: 'Pay Later', value: 'pay-later' }` to the `paymentMethod` select field options in `src/payload.config.ts`.

**Future prevention:** When adding a new payment method option to the checkout UI, always also add the corresponding value to the `orders.paymentMethod` select field in `payload.config.ts`. They must stay in sync.

---

## Bug #7 — CSP Blocking Cloudflare Analytics Beacon

**Date Fixed:** 2026-06-15
**Symptom:** Browser console shows CSP violation:
```
Refused to load the script 'https://static.cloudflareinsights.com/beacon.min.js' because it violates the Content Security Policy directive: "script-src 'self' ..."
```

### Root Cause

Cloudflare automatically injects a beacon script (`beacon.min.js`) from `https://static.cloudflareinsights.com` on all pages when the domain is proxied through Cloudflare. This domain was not in the `script-src` CSP directive. The beacon also sends data to `https://cloudflareinsights.com`, which was missing from `connect-src`.

**Fix:** Added both domains to `src/proxy.ts`:
- `script-src`: added `https://static.cloudflareinsights.com`
- `connect-src`: added `https://cloudflareinsights.com`

**Future prevention:** Any time a third-party script is added (analytics, chat widgets, payment SDKs), update `src/proxy.ts` CSP to allow its domain in the appropriate directive (`script-src`, `connect-src`, `img-src` etc.).

---

## Bug #8 — CMS UI Missing Chunks / 500 on Server Actions

**Date Fixed:** 2026-06-18
**Symptom:** Can't edit, delete, or upload images in CMS. Browser console shows 404 for URLs with `_next//_next/static/chunks/...`.
**Root Cause:** The `url.pathname` parser in Next.js was appending `_next/` to chunks but somehow requesting them with a double slash `/_next//_next/`. This caused a 404 on JS chunks, which then caused React rendering errors and Next.js `UnrecognizedActionError` when server actions were triggered.
**Fix:** Modified `src/proxy.ts` to intercept `/_next/_next/` paths and strip the double `_next` before rewriting the URL using `url.pathname.replace('/_next/_next/', '/_next/')`.

---

## Deployment Fix Summary (2026-06-18)

- **Force rebuild & clear cache**: Triggered a fresh Coolify redeploy with the *Force rebuild / Clear cache* option. All old build artifacts were removed and a new standalone image was generated.
- **Single replica**: Set the application replica count to **1** to avoid routing requests to stale containers.
- **Traefik proxy restart**: Restarted the Traefik proxy to purge any cached static assets.
- **Env var lock**: Verified that `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` is present and unchanged in the environment variables.
- **Verification**: After deployment, logged into the admin panel, created a test product, edited it, deleted it, and uploaded an image. No console errors, 404/405 responses, or `UnrecognizedActionError` were observed.

These actions resolve the intermittent CMS issues and ensure a stable experience across all browsers and devices.

*Maintained by Antigravity. Add new bugs and fixes here as they are discovered.*