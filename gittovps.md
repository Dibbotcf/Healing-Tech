# Git to VPS: Healing Technology Deployment & Troubleshooting Guide

This document sequentially logs the exact methods, strategies, and scripts used to rescue and successfully finalize the Payload CMS 3 and Next.js 15 production deployment on your GoDaddy Plesk VPS.

---

## 1. Resolving Git Worktree Errors (Stashing)
**The Problem:** You received a message stating `failed to checkout worktree changes: main branch has uncommitted changes`. 
**The Cause:** During previous automated deployment efforts, untracked temporary files (like `run_vps_cmd.js`, `server_proxy.js`, and local `.npm` folders) were left inside `tmp/`. Git prevents you from checking out worktrees to protect untracked files from being silently overwritten.
**The Execution:**
- Ran the command `git stash -u` (the `-u` flag tells git to include untracked file paths).
- This stripped the directory back to a pristine Git state without completely deleting your script snippets, allowing the worktree checkout to proceed safely.

---

## 2. Diagnosing Payload CMS `ERROR 3434727691`
**The Problem:** When visiting `/admin/login`, the CMS returned a generic Next.js black screen Error 500. 
**The Execution:**
- **Checked the DB**: Executed `ps aux | grep postgres` via SSH background tunnels. The database actively had connections, so PostgreSQL was perfectly healthy.
- **Checked the Logs**: Tailed the live Next.js production log via `tail -n 250 app.log`. 
- **The Culprit Found**: The log output read `code: '42P01'`, which is the PostgreSQL engine signaling an `undefined_table`. Payload CMS was trying to read from tables (users, products) that did not exist yet because a production build does NOT automatically push schema changes to a live database!
- Furthermore, the log showed `Failed to find Server Action`, matching the ID of the UI mismatch (cached UI payload vs new server binary).

---

## 3. The "Dev Server Bypass" for Schema Push
**The Problem:** Standard commands to push the database schema like `npx tsx seed-cli.ts` were failing on the Node v22 VPS because of a known module resolution conflict between Next.js 15 compiled environments (`@next/env`) and Payload’s `tsx` execution.
**The Solution:** Next.js Development Server forces Payload CMS to push its database schema automatically upon boot!
**The Execution:**
- Triggered `npm run dev -p 12004` on the VPS inside the application folder and killed it 20 seconds later using a bash timeout.
- This stealthily forced Next.js to do all of the heavy lifting. Payload initialized naturally inside Next.js, saw it was in development mode, detected Postgres was empty, and instantly forged your entire CRM database schema exactly as defined in `payload.config.ts`.

---

## 4. Wiping Next.js Cache & Reacting the Production Server
**The Problem:** With the DB fixed, the production server on port `12001` was still stuck holding stale memory and serving mismatched React Server Components (`Failed to find Server Action`).
**The Execution:**
- Mapped the process ID holding the port using `ss -tlnp | grep 12001`.
- Killed the stuck Next.js application (`kill -9 <PID>`).
- Completely restarted the daemonized production environment using:
  `export NODE_ENV=production; export PORT=12001; setsid /opt/plesk/node/22/bin/node .next/standalone/server.js >> app.log 2>&1 &`
- The cache was fully wiped and the login screen worked perfectly.

---

## 5. Seamlessly Seeding the Products Data
**The Problem:** You provided a master initialization script (`seed-products.ts`) containing 24 products, but running it remotely triggered the same `tsx` ESM module crash from Payload's NextPlugin.
**The Solution:** Treat the seed script as an ephemeral API Route!
**The Execution:**
1. **Wrote a Next.js App Router Endpoint:** We transcribed your exact logic into `GET()` block inside a `route.ts` file, substituting the `NextResponse.json` for console logs. 
2. **Uploaded the Route:** Made a new folder on the VPS via `mkdir -p src/app/api/seed` and stealthily uploaded `route.ts`.
3. **Execution via App Router:** We could not hit this API route on the production server (port `12001`) because production Next.js requires a 3-minute hard compile (`next build`) to recognize new files. 
   Instead, we booted up the Next.js **Development** server backwards (`npm run dev -p 12004`). Because the Dev server performs Hot-Module Replacement (HMR) and on-the-fly compilation, it immediately registered the new `/api/seed` endpoint!
4. **Triggered Execution**: We initiated a `curl http://127.0.0.1:12004/api/seed`. Next compiled the script in 2 seconds, Payload’s API resolved accurately natively inside Next, and it injected 24 Products, 9 Brands, and 7 Categories into your live PostgreSQL Database.
5. **Clean Up**: Successfully deleted the `src/app/api/seed` folder remotely using `rm -rf` to ensure absolute security for your deployed app.
