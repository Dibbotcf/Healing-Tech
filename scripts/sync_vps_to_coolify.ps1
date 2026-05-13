Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Healing Technology - VPS to Coolify DB Migration" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# VPS PostgreSQL dump (run remotely via SSH)
$VPS_DUMP_CMD = "PGPASSWORD=HealDB2026 pg_dump -U healingtechnology.co_bgieab3zdtl -h 127.0.0.1 -d healingtechnology --no-owner --no-acl -F p > /var/www/vhosts/healingtechnology.com.bd/httpdocs/backup_for_coolify.sql"
$REMOTE_DUMP  = "/var/www/vhosts/healingtechnology.com.bd/httpdocs/backup_for_coolify.sql"
$LOCAL_DUMP   = "backup_for_coolify.sql"

# Coolify DB - External access
$C_HOST = "91.98.166.101"
$C_PORT = "54320"
$C_DB   = "postgres"
$C_USER = "postgres"
$C_PASS = "Q16OxSTs9OfRNPJTU8FdcqCv7nsYPSIFhIpcOWQKF4VjRukvgD8pkqbWlXlgVPxA"

# Step 1: Dump production DB on VPS
Write-Host "`n[1/4] Exporting production database on VPS..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js $VPS_DUMP_CMD
if ($LASTEXITCODE -ne 0) { throw "Failed to export production database on VPS." }
Write-Host "  OK - Dump created on VPS." -ForegroundColor Green

# Step 2: Download dump to local machine
Write-Host "`n[2/4] Downloading dump file from VPS..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js download $LOCAL_DUMP $REMOTE_DUMP
if ($LASTEXITCODE -ne 0) { throw "Failed to download database dump from VPS." }
$size = [math]::Round((Get-Item $LOCAL_DUMP).Length / 1KB, 1)
Write-Host "  OK - Downloaded: $LOCAL_DUMP ($size KB)" -ForegroundColor Green

# Step 3: Wipe Coolify DB schema
Write-Host "`n[3/4] Wiping Coolify DB schema for clean import..." -ForegroundColor Yellow
$env:PGPASSWORD = $C_PASS
psql -h $C_HOST -p $C_PORT -U $C_USER -d $C_DB -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres;"
if ($LASTEXITCODE -ne 0) { throw "Failed to wipe Coolify schema. Is psql installed? Is port $C_PORT reachable?" }
Write-Host "  OK - Coolify DB schema wiped." -ForegroundColor Green

# Step 4: Import dump into Coolify DB
Write-Host "`n[4/4] Importing data into Coolify PostgreSQL..." -ForegroundColor Yellow
cmd /c "set PGPASSWORD=$C_PASS && psql -h $C_HOST -p $C_PORT -U $C_USER -d $C_DB < $LOCAL_DUMP"
if ($LASTEXITCODE -ne 0) { throw "Failed to import data into Coolify database." }
Write-Host "  OK - Data imported successfully." -ForegroundColor Green

Write-Host "`n============================================================" -ForegroundColor Green
Write-Host "  MIGRATION COMPLETE! Coolify DB is now in sync with VPS." -ForegroundColor Green
Write-Host "  Live: https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
