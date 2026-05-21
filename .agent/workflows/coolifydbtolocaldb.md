---
description: Sync Coolify production database → local PostgreSQL. Mention this file or say "coolifydbtolocaldb" to pull the latest live data into your local development database.
---
# /coolifydbtolocaldb Command Workflow

This workflow pulls the **latest live production data from Coolify's PostgreSQL** and restores it into your local Docker PostgreSQL container.

Use this when you need to work locally with the most up-to-date data that real users have created on the live site.

// turbo-all

---

## Prerequisites Check

### Step 0a — Ensure Docker Desktop is running
```powershell
docker ps
```
If this fails (Docker not running), start it first:
```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"; Start-Sleep -Seconds 40
```

### Step 0b — Ensure local PostgreSQL container is running
```powershell
docker start healing-technology-postgres; if ($LASTEXITCODE -ne 0) { docker run -d --name healing-technology-postgres -p 12001:5432 -v healing-technology-pgdata:/var/lib/postgresql -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=healing-technology postgres }
```

---

## Phase 1 — Dump Coolify Production Database

> The Coolify PostgreSQL external credentials are used here. The DB name on Coolify is `postgres`.

### Step 1 — Dump Coolify DB into `coolify_dump.sql` using Docker
This uses Docker to run `pg_dump` remotely — no local PostgreSQL install needed.
```powershell
docker run --rm -e PGPASSWORD="Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA" postgres:15 pg_dump -h 91.98.166.101 -p 54320 -U postgres postgres --clean --if-exists > coolify_dump.sql
```

> ⚠️ **If this fails with a connection error**, the Coolify PostgreSQL "Is Public" setting may be disabled.
> Fix: Go to https://deploy.oryzen.app → Projects → Healing Technology → Database resource → Configuration tab → Check **"Is Public"** → Save.
> Then retry Step 1.

---

## Phase 2 — Restore into Local PostgreSQL

### Step 2 — Wipe the local database schema (clean slate)
```powershell
docker exec -i healing-technology-postgres psql -U postgres -d healing-technology -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;"
```

### Step 3 — Import the Coolify dump into local DB
```powershell
cmd /c "docker exec -i healing-technology-postgres psql -U postgres -d healing-technology < coolify_dump.sql"
```

> ⏳ This may take 30–60 seconds depending on database size. Wait for it to finish before proceeding.

### Step 4 — Verify the import worked
```powershell
docker exec -i healing-technology-postgres psql -U postgres -d healing-technology -c "\dt"
```
You should see a list of tables (users, products, categories, brands, etc.). If the list is empty, the import failed — re-run Steps 2–3.

---

## Phase 3 — Clean Up

### Step 5 — Delete the temporary dump file
```powershell
Remove-Item coolify_dump.sql -Force
```

---

## Phase 4 — Also Update `backup.sql` (recommended)

After syncing Coolify data to local, update `backup.sql` to reflect the current state so it's ready for the next `deploy2` workflow.

### Step 6 — Regenerate `backup.sql` from the now-synced local DB
```powershell
docker exec healing-technology-postgres pg_dump -U postgres -d healing-technology --clean --if-exists > backup.sql
```

---

## Summary

| Step | Action |
|------|--------|
| Step 0 | Ensure Docker + local PostgreSQL are running |
| Step 1 | `pg_dump` from Coolify external DB (91.98.166.101:54320) → `coolify_dump.sql` |
| Step 2 | Wipe local DB schema |
| Step 3 | Import `coolify_dump.sql` into local `healing-technology` database |
| Step 4 | Verify tables exist |
| Step 5 | Delete `coolify_dump.sql` |
| Step 6 | Regenerate `backup.sql` from synced data |

---

## Coolify PostgreSQL External Credentials

| Field | Value |
|-------|-------|
| Host | `91.98.166.101` |
| Port | `54320` |
| User | `postgres` |
| Password | `Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA` |
| Database | `postgres` |

> ⚠️ External access requires **"Is Public"** to be enabled in the Coolify database configuration.

---

## Local PostgreSQL Credentials

| Field | Value |
|-------|-------|
| Host | `localhost` |
| Port | `12001` |
| User | `postgres` |
| Password | `postgres` |
| Database | `healing-technology` |

*Maintained by Antigravity.*
