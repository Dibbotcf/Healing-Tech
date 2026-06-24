---
description: Fast daily startup — launches Docker, starts local PostgreSQL + Directus CMS containers, and runs the Next.js dev server.
---
# /start2 Command Workflow

This workflow performs a fast daily startup for Healing Technology local development.
It will: launch Docker, start Postgres + Directus containers, and start the dev server.

> [!NOTE]
> The app now uses **Directus** (not Payload CMS). Local Directus runs at http://localhost:8055 and the dev server points to it via `DIRECTUS_URL=http://localhost:8055` in `.env`.

> [!WARNING]
> This command **DOES NOT** sync data from production. It boots with whatever data is already in your local `directus` database. If local data is empty or stale, switch `.env` to point at production Directus temporarily: `DIRECTUS_URL=https://cms.healingtechnology.com.bd`

// turbo-all

## Step 1 — Launch Docker Desktop and wait for it to be ready
```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"; Start-Sleep -Seconds 40
```

## Step 2 — Start the PostgreSQL Docker container on port 12001
This container holds the local `directus` database. Must start before Directus.
```powershell
docker start healing-technology-postgres; if ($LASTEXITCODE -ne 0) { docker run -d --name healing-technology-postgres -p 12001:5432 -e POSTGRES_PASSWORD=postgres postgres }
```

## Step 3 — Start the local Directus CMS container
Directus depends on Postgres (Step 2). Wait a few seconds after Postgres starts before running this.
```powershell
docker compose -f docker-compose.directus.yml up -d
```
Wait ~15 seconds for Directus to fully boot, then verify it's up at http://localhost:8055.

## Step 4 — Clear the Turbopack cache and start the dev server
We clear `.next` first to prevent corrupted cache hydration errors.
```powershell
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue; npm run dev
```

The system will now be running locally at:
- **Frontend:** http://localhost:12000
- **Local Directus CMS:** http://localhost:8055 (login: quaziehsanh@gmail.com / k1E6bH8n8CtIo3LwNsOnddXvSxu1ZAcu)

---

## Known Warnings & Behaviors (Do NOT act on these)

> **`⚠ Slow filesystem detected`** on server start — Expected. The `.next/dev` Turbopack cache lives on the F: drive which is slower than the system drive. This warning is cosmetic; the server still works correctly. Do NOT attempt to move the project.

> **Red Hydration Error Popup (`<style>` mismatch)** in dev mode — Expected / Harmless Next.js Turbopack bug. Turbopack occasionally injects CSS `<style>` chunks in a different order on the client vs server during HMR, causing a React hydration mismatch error. **Just click the "X" to close the red popup and continue working.** It does not affect the actual UI and does not happen in production.

> **`⨯ turbopackServerFastRefresh`** experiment warning — Harmless. This is a known Turbopack dev-mode flag; it does not break anything.

> **First page visit is slow (5–15s)** in dev mode — Expected. Turbopack compiles each page **on first visit** (on-demand compilation). Subsequent visits to the same page are fast (under 500ms). This is a dev-only behavior; production builds (`next build`) pre-compile everything.

> **`proxy.ts` instead of `middleware.ts`** — The project uses `src/proxy.ts` (exporting a `proxy` function) per the Next.js 16 convention. Do NOT recreate `src/middleware.ts` — having both files causes a fatal server error.

> **Directus container fails to start** — Almost always means the `healing-technology-postgres` container is not running. Start it first (Step 2), wait a few seconds, then restart Directus: `docker restart healingtechnology-directus-1`

> **Local `healing-technology` Postgres database** — The old Payload CMS database (`healing-technology`) has been deleted (2026-06-23). Only the `directus` database exists now. No action needed.
