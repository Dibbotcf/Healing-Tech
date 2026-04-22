Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   Healing Technology - VPS Production Sync" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Step 1: Export DB on VPS
Write-Host "`n[1/5] Exporting Production Database on VPS..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js "PGPASSWORD=HealDB2026 pg_dump -U healingtechnology.co_bgieab3zdtl -h 127.0.0.1 -d healingtechnology > backup.sql"
if ($LASTEXITCODE -ne 0) { throw "Failed to export production database." }

# Step 2: Download the Backup
Write-Host "`n[2/5] Downloading database backup..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js download backup.sql /var/www/vhosts/healingtechnology.com.bd/httpdocs/backup.sql
if ($LASTEXITCODE -ne 0) { throw "Failed to download database backup." }

# Step 3: Download Media Assets
Write-Host "`n[3/5] Syncing Static Media (Pre-build)..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js downloadDir public/media /var/www/vhosts/healingtechnology.com.bd/httpdocs/public/media

Write-Host "`n[3.5/5] Syncing Dynamic Media (Standalone uploads)..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js downloadDir public/media /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/public/media

Write-Host "`n[3.6/5] Syncing Persistent Media (CMS admin uploads)..." -ForegroundColor Yellow
node tmp/run_vps_cmd.js downloadDir public/media /var/www/vhosts/healingtechnology.com.bd/persistent/media

# Step 4: Wipe Current Local Database Schema
Write-Host "`n[4/5] Wiping local Docker schema to prevent conflicts..." -ForegroundColor Yellow
docker exec -i healing-technology-postgres psql -U postgres -d healing-technology -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
if ($LASTEXITCODE -ne 0) { throw "Failed to drop local database schema." }

# Step 5: Import Production Data
Write-Host "`n[5/5] Importing production data into local Docker..." -ForegroundColor Yellow
cmd /c "docker exec -i healing-technology-postgres psql -U postgres -d healing-technology < backup.sql"
if ($LASTEXITCODE -ne 0) { throw "Failed to import production database." }

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "   SYNC COMPLETE! You can now run your app." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
