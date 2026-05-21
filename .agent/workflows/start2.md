---
description: Fast daily startup — launches Docker, starts the local PostgreSQL database (preserving local data), and runs the Next.js/Payload dev server.
---
# /start2 Command Workflow

This workflow performs a fast daily startup for Healing Technology local development.
It will: launch Docker, start the existing database, and start the dev server. 

> [!WARNING]
> This command **DOES NOT** sync data from the live VPS. It boots up your local database exactly as you left it. If your local database is empty or missing data, you should run the `/coolifydbtolocaldb` workflow to pull the live production data down to your local machine!

// turbo-all

## Step 1 — Launch Docker Desktop and wait for it to be ready
```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"; Start-Sleep -Seconds 40
```

## Step 2 — Start the PostgreSQL Docker container on port 12001
This uses the persistent volume so your local database changes are kept intact.
```powershell
docker start healing-technology-postgres; if ($LASTEXITCODE -ne 0) { docker run -d --name healing-technology-postgres -p 12001:5432 -v healing-technology-pgdata:/var/lib/postgresql -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=healing-technology postgres }
```

## Step 3 — Clear the Turbopack cache and start the dev server
We clear `.next` first to prevent corrupted cache hydration errors (Next.js 16.x Turbopack bug).
```powershell
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue; npm run dev
```

The system will now be running locally with your preserved database at:
- **Frontend:** http://localhost:12000
- **Admin Panel:** http://localhost:12000/admin

---

## Known Warnings & Behaviors (Do NOT act on these)

> **`⚠ Slow filesystem detected`** on server start — Expected. The `.next/dev` Turbopack cache lives on the F: drive which is slower than the system drive. This warning is cosmetic; the server still works correctly. Do NOT attempt to move the project.

> **Red Hydration Error Popup (`<style>` mismatch)** in dev mode — Expected / Harmless Next.js Turbopack bug. Turbopack occasionally injects CSS `<style>` chunks in a different order on the client vs server during HMR, causing a React hydration mismatch error. **Just click the "X" to close the red popup and continue working.** It does not affect the actual UI and does not happen in production.

> **`⨯ turbopackServerFastRefresh`** experiment warning — Harmless. This is a known Turbopack dev-mode flag; it does not break anything.

> **First page visit is slow (5–15s)** in dev mode — Expected. Turbopack compiles each page **on first visit** (on-demand compilation). Subsequent visits to the same page are fast (under 500ms). This is a dev-only behavior; production builds (`next build`) pre-compile everything.

> **`proxy.ts` instead of `middleware.ts`** — The project uses `src/proxy.ts` (exporting a `proxy` function) per the Next.js 16 convention. Do NOT recreate `src/middleware.ts` — having both files causes a fatal server error.
