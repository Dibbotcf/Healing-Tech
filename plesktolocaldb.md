# Plesk to Local Database Sync Guide

This document outlines the exact process used to synchronize the live production PostgreSQL database and media files from the GoDaddy Plesk VPS to the local Next.js / Payload development environment.

## 1. Credentials Used

### VPS SSH Access
- **IP Address**: `97.74.90.189`
- **User**: `healingtechnology`
- **Password**: `S_hJ4NZ*rxr4i1zsw`

### Production Database Details
- **Host**: `127.0.0.1` (on VPS)
- **Database Name**: `healingtechnology`
- **Database User**: `healingtechnology.co_bgieab3zdtl`
- **Database Password**: `HealDB2026`

## 2. Preparing the Remote Utility

We utilized the existing `tmp/run_vps_cmd.js` script to run remote commands over SSH. 
To support syncing, the script was modified to include download capabilities using the `ssh2` library connected to your environment, allowing passwordless transfers from the local terminal.

## 3. Step-by-Step Sync Process

### Step 1: Export Database on VPS
We exported the production PostgreSQL database to a standalone `backup.sql` file on the VPS by securely passing the password inline.

```bash
node tmp/run_vps_cmd.js "PGPASSWORD=HealDB2026 pg_dump -U healingtechnology.co_bgieab3zdtl -h 127.0.0.1 -d healingtechnology > backup.sql"
```

### Step 2: Download the Database Backup
We used the Node.js SSH utility to download the generated `.sql` file down to the root of the local repository.

```bash
node tmp/run_vps_cmd.js download backup.sql /var/www/vhosts/healingtechnology.com.bd/httpdocs/backup.sql
```

### Step 3: Download Media Assets

Because Payload CMS relates database entries directly to specific file paths, the actual images and PDFs needed to be recursively synced as well.

> **Crucial Context:** When Next.js builds on the VPS, it compiles into a highly optimized `standalone` hidden folder. Consequently, new media uploaded through the deployed Payload admin portal will end up securely placed inside `.next/standalone/public/media` rather than the traditional static `/public/media` directory. 

To ensure complete coverage (fetching legacy deployments and newly uploaded files), run both of these download tasks:

**Download Pre-Build/Static Media:**
```bash
node tmp/run_vps_cmd.js downloadDir public/media /var/www/vhosts/healingtechnology.com.bd/httpdocs/public/media
```

**Download Newly Uploaded Standalone Media:**
```bash
node tmp/run_vps_cmd.js downloadDir public/media /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/public/media
```

### Step 4: Wipe Current Local Database Schema
To ensure a clean import without primary key or schema conflicts, the existing local public schema inside the Docker container was dropped and immediately recreated:

```bash
docker exec -i healing-technology-postgres psql -U postgres -d healing-technology -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

### Step 5: Import Production Data to Local Docker
We piped the downloaded `backup.sql` file directly into the local PostgreSQL docker instance using PowerShell/CMD standard input:

```bash
cmd /c "docker exec -i healing-technology-postgres psql -U postgres -d healing-technology < backup.sql"
```

### Step 6: Server Restart
Finally, the local development Next.js server was restarted to clear the cache, establish fresh database pool connections, and serve the newly imported media assets.

```bash
npm run dev
```

## Automating the Sync Process
To prevent manual copy-pasting of these commands or accidentally skipping the `standalone` media downloads, an automated script has been created. 

Simply execute the automated synchronization script in PowerShell:

```powershell
.\scripts\sync_from_vps.ps1
```
