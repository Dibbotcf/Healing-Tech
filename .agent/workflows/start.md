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
docker stop healing-technology-postgres 2>$null; docker rm healing-technology-postgres 2>$null; docker start healing-technology-postgres; if ($LASTEXITCODE -ne 0) { docker run -d --name healing-technology-postgres -p 12001:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=healing-technology postgres }
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

> **Note:** The `ERROR: role "healingtech" does not exist` messages during DB import are harmless — they are VPS-specific GRANT statements and do not affect data integrity.
