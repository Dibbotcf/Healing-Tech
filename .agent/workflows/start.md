---
description: Full daily startup — launches Docker, syncs production DB from VPS to local PostgreSQL, and starts the Next.js/Payload dev server.
---
# /start Command Workflow

This workflow performs the complete daily startup for Healing Technology local development.
It will: launch Docker, sync the live production database + media from the VPS, then start the dev server.

// turbo-all

## Step 1 — Launch Docker Desktop and wait for it to be ready
```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"; Start-Sleep -Seconds 40
```

## Step 2 — Start the PostgreSQL Docker container on port 12001
```powershell
docker start healing-technology-postgres; if ($LASTEXITCODE -ne 0) { docker run -d --name healing-technology-postgres -p 12001:5432 -v healing-technology-pgdata:/var/lib/postgresql -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=healing-technology postgres }
```

## Step 3 — Sync production database + media from VPS to local
This exports the live PostgreSQL DB from the Plesk VPS, downloads it, syncs all media assets (static, standalone, persistent), wipes the local schema, and reimports production data.
```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync_from_vps.ps1
```

## Step 4 — Start the Next.js + Payload CMS dev server
```powershell
npm run dev
```

The system will now be fully in sync with production and running locally at:
- **Frontend:** http://localhost:12000
- **Admin Panel:** http://localhost:12000/admin

---

## Known Warnings & Behaviors (Do NOT act on these)

> **`ERROR: role "healingtech" does not exist`** during Step 3 — Harmless. These are VPS-specific GRANT statements and do not affect data integrity.

> **`⚠ Slow filesystem detected`** on server start — Expected. The `.next/dev` Turbopack cache lives on the F: drive which is slower than the system drive. This warning is cosmetic; the server still works correctly. Do NOT attempt to move the project.

> **`⨯ turbopackServerFastRefresh`** experiment warning — Harmless. This is a known Turbopack dev-mode flag; it does not break anything.

> **First page visit is slow (5–15s)** in dev mode — Expected. Turbopack compiles each page **on first visit** (on-demand compilation). Subsequent visits to the same page are fast (under 500ms). This is a dev-only behavior; production builds (`next build`) pre-compile everything.

> **`proxy.ts` instead of `middleware.ts`** — The project uses `src/proxy.ts` (exporting a `proxy` function) per the Next.js 16 convention. Do NOT recreate `src/middleware.ts` — having both files causes a fatal server error.

---

## API Caching Reference

The following API routes use Next.js ISR caching (`revalidate`). They will serve stale data on first hit after the cache expires but are NOT broken:

| Route | Cache TTL | Notes |
|---|---|---|
| `/api/menus` | 2 min | Mega menu categories + products |
| `/api/products` | 60 sec | Homepage product carousel |
| `/api/public-categories` | 5 min | Category showcase section |
| `/api/public-client-logos` | 5 min | Client logo marquee |
| `/api/public-partner-logos` | 5 min | Brand logo marquee |
| `/api/gallery-posts` | force-dynamic | Gallery page images (CMS-managed) |
| `/api/gallery-videos` | force-dynamic | Gallery page videos (CMS-managed) |
