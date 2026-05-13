$url = "https://yamrsn0ry3ni6t5bozx4prvj.91.98.166.101.sslip.io/db-restore"
$maxAttempts = 60 # 60 * 15s = 15 minutes
$attempt = 1

Write-Host "Waiting for Coolify deployment to finish..."

while ($attempt -le $maxAttempts) {
    try {
        $response = Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop
        
        if ($response.success) {
            Write-Host "`nSUCCESS! Database restore completed automatically." -ForegroundColor Green
            Write-Host "Details:"
            Write-Host ($response | ConvertTo-Json -Depth 5)
            
            # Now revert the changes to clean up the public dump and API
            Write-Host "Cleaning up repository..."
            git rm public/latest_plesk_dump.sql
            git rm src/app/db-restore/route.ts
            git checkout HEAD~1 nixpacks.toml
            git commit -am "chore: remove db restore utility and public dump"
            git push origin master
            Write-Host "Cleanup pushed to GitHub. The temporary endpoint will be removed on next deploy." -ForegroundColor Green
            
            exit 0
        } else {
            Write-Host "." -NoNewline
        }
    } catch {
        # 404 or other errors mean it's still deploying
        Write-Host "." -NoNewline
    }
    
    Start-Sleep -Seconds 15
    $attempt++
}

Write-Host "`nTimed out waiting for deployment." -ForegroundColor Red
