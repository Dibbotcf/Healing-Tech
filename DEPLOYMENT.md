# Healing Technology - VPS Deployment Guide

If you make modifications, install new packages, or change the Next.js configurations locally, use this step-by-step guide to successfully deploy your code updates to the live GoDaddy VPS.

## 1. Push Your Code Locally
Always ensure your local changes are committed and pushed to your remote Git repository:
```bash
git add .
git commit -m "Update feature X"
git push origin main
```

## 2. SSH into the Live GoDaddy Server
Open your terminal/command prompt and connect to your GoDaddy server using your SSH credentials:
```bash
ssh healingtechnology@97.74.90.189
```
*(Enter your Plesk SSH password when prompted)*

## 3. Pull the Code on the VPS
Navigate to the root directory where the website is hosted, then tell Git to pull the fresh updates.
```bash
# Navigate to the correct directory
cd /var/www/vhosts/healingtechnology.com.bd/httpdocs/

# Pull recent changes from the repository
git pull origin main
```

## 4. Rebuild the Next.js / Payload Production App
Next.js statically compiles pages and CMS dashboards. **Any update to your code requires a fresh rebuild** using the active Node.js engine provided by Plesk:
```bash
# Temporarily add the Plesk Node.js v22 binary to your bash PATH
export PATH=/usr/bin:/bin:/opt/plesk/node/22/bin

# Install any newly added tools/dependencies
npm install

# Force Next.js & Payload to rebuild the application
export NODE_ENV=production
npm run build
```

## 5. Restart the Production Daemon (The Proxies)
Once the new standalone `.next/standalone/server.js` file has been fully compiled by the build command, you must flush the old daemon process out of memory and reboot the server so the new code goes live.

```bash
# STEP A: Terminate the Active Next.js Server (Port 12001)
# This snippet automatically finds the background process ID for port 12001 and kills it:
pid=$(ss -tlnp | grep 12001 | grep -o 'pid=[0-9]*' | cut -d= -f2)
if [ -n "$pid" ]; then kill -9 $pid; fi

# STEP B: Restart Next.js in the background
export NODE_ENV=production
export PORT=12001
setsid /opt/plesk/node/22/bin/node .next/standalone/server.js >> app.log 2>&1 &

# NOTE: If you ever update the Express proxy script (`tmp/server_proxy.js`), 
# you should also softly restart port 12000!
```

## 6. (Optional) Force Database Changes
If you altered the schemas (added a new field to standard Payload Collections), perform a direct local Next.js boot temporarily to sync the Drizzle ORM Postgres tables quickly:
```bash
timeout 20 npm run dev -p 12004
```
Wait 20 seconds, and the development mode payload adapter will seamlessly apply your schema changes to the live PostgreSQL instance without wiping existing data!

---
*Your live VPS application will now be perfectly mirrored with your Github updates.*
