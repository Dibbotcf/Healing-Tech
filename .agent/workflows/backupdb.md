---
description: Securely download the latest Coolify production database into a local .sql file without modifying live data.
---

# /backupdb Command Workflow

This workflow pulls a **read-only backup of the live production database from Coolify's PostgreSQL** and saves it as a `.sql` file in a dedicated folder. 

Use this workflow when you need a safe snapshot of the live database for archiving or local testing.

## Prerequisites

Ensure Docker Desktop is running before starting the process.
```powershell
docker ps
```
If it's not running, start it manually or run:
```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

---

## Step 1 — Create the Backup Directory

Ensure the destination folder `DB Backups` exists in the project root.
```powershell
mkdir "DB Backups" -ErrorAction SilentlyContinue
```

## Step 2 — Execute Remote DB Dump

This uses a temporary Docker container to run `pg_dump` securely against the live Coolify database. 
- The target database uses **PostgreSQL 18**, so we use the `postgres:18` docker image.
- We run this via `cmd.exe /c` to prevent PowerShell from corrupting the UTF-8 encoding.

Run this command from the project root:
```powershell
cmd.exe /c "docker run --rm -e PGPASSWORD=""Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhlpcOWQKF4VjRukvgD8pkqbWIXlgVPxA"" postgres:18 pg_dump -h 91.98.166.101 -p 54320 -U postgres postgres --clean --if-exists > ""DB Backups\backup140626.sql"""
```

> ⏳ The command will pull the `postgres:18` image if it's not already downloaded, then dump the DB. It typically takes less than 60 seconds.

## Step 3 — Verify the Backup

Ensure the `.sql` file was successfully created and has data in it:
```powershell
Get-ChildItem -Path "DB Backups\backup140626.sql" | Select-Object Name, Length
```

---

## Notes
- **Safety**: This uses `pg_dump` natively, meaning it only reads data from the remote database. No data can be accidentally deleted.
- **Is Public Setting**: The database dump requires the "Is Public" setting to be enabled in your Coolify database's Configuration tab. If connection fails, check this setting in the Coolify dashboard.
