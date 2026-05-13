Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "   Healing Technology - Plesk to Coolify DB Migration" -ForegroundColor Cyan
Write-Host "===============================================================" -ForegroundColor Cyan

# Coolify PostgreSQL credentials (External access)
$COOLIFY_HOST = "91.98.166.101"
$COOLIFY_PORT = "54320"
$COOLIFY_USER = "postgres"
$COOLIFY_PASS = "Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhlpcOWQKF4VjRukvgD8pkqbWIlXlgVPxA"
$COOLIFY_DB   = "postgres"

$BACKUP_FILE  = "latest_plesk_dump.sql"
$PSQL         = "C:\Program Files\PostgreSQL\16\bin\psql.exe"

# Step 1: Dump latest Plesk DB on VPS (using healingtechnology SSH user)
Write-Host ""
Write-Host "[1/4] Exporting latest Production Database on Plesk VPS..." -ForegroundColor Yellow
node tmp/run_vps_cmd_ht.js "PGPASSWORD=HealDB2026 pg_dump -U healingtechnology.co_bgieab3zdtl -h 127.0.0.1 -d healingtechnology --no-owner --no-privileges > $BACKUP_FILE"
if ($LASTEXITCODE -ne 0) { Write-Error "Failed to export production database from Plesk."; exit 1 }
Write-Host "Database dumped on VPS as $BACKUP_FILE" -ForegroundColor Green

# Step 2: Download the Backup Locally
Write-Host ""
Write-Host "[2/4] Downloading backup to local machine..." -ForegroundColor Yellow
node tmp/run_vps_cmd_ht.js download $BACKUP_FILE /var/www/vhosts/healingtechnology.com.bd/httpdocs/$BACKUP_FILE
if ($LASTEXITCODE -ne 0) { Write-Error "Failed to download database backup from VPS."; exit 1 }
Write-Host "Backup downloaded as .\$BACKUP_FILE" -ForegroundColor Green

# Step 3: Wipe Coolify DB Schema (using Docker postgres image)
Write-Host ""
Write-Host "[3/4] Wiping Coolify PostgreSQL schema to prevent conflicts..." -ForegroundColor Yellow
$env:PGPASSWORD = $COOLIFY_PASS
& $PSQL -h $COOLIFY_HOST -p $COOLIFY_PORT -U $COOLIFY_USER -d $COOLIFY_DB -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
if ($LASTEXITCODE -ne 0) { Write-Error "Failed to wipe Coolify database schema."; exit 1 }
Write-Host "Coolify schema wiped clean" -ForegroundColor Green

# Step 4: Restore into Coolify PostgreSQL (using Docker postgres image with piped file)
Write-Host ""
Write-Host "[4/4] Restoring Plesk data into Coolify PostgreSQL..." -ForegroundColor Yellow
$env:PGPASSWORD = $COOLIFY_PASS
& $PSQL -h $COOLIFY_HOST -p $COOLIFY_PORT -U $COOLIFY_USER -d $COOLIFY_DB -f $BACKUP_FILE
if ($LASTEXITCODE -ne 0) { Write-Error "Failed to restore database into Coolify."; exit 1 }
Write-Host "Data restored successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "===============================================================" -ForegroundColor Green
Write-Host "   DONE! Coolify PostgreSQL is now in sync with Plesk." -ForegroundColor Green
Write-Host "   Live App: https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io" -ForegroundColor Green
Write-Host "===============================================================" -ForegroundColor Green
