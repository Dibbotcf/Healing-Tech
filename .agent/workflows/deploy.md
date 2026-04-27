---
description: Push all local changes to GitHub and deploy to the live Plesk VPS production server.
---
# /deploy Command Workflow

This workflow pushes all local code changes to GitHub and then triggers a full redeploy on the production VPS (healingtechnology.com.bd).

// turbo-all

## Step 1 — Stage all changes
```powershell
git add -A; git status
```

## Step 2 — Commit with a message
Replace the message below with a short description of today's changes before running.
```powershell
git commit -m "chore: update site"
```

## Step 3 — Push to GitHub
```powershell
git push origin master
```

## Step 4 — Pull latest code on VPS & run redeploy script
This command SSH's into the VPS, resets any local conflicts, pulls the latest code from GitHub, and runs `redeploy.sh` which: installs dependencies, runs DB migrations, builds Next.js, syncs media, and restarts the server on port 12000.
```powershell
node tmp/run_vps_cmd.js "cd /var/www/vhosts/healingtechnology.com.bd/httpdocs && git reset --hard origin/master && git pull origin master && bash redeploy.sh"
```

## Step 5 — Verify deployment (optional)
Check the last 30 lines of the app log to confirm the server is running.
```powershell
node tmp/run_vps_cmd.js "tail -n 30 /var/www/vhosts/healingtechnology.com.bd/httpdocs/redeploy.log"
```

---

## What `redeploy.sh` does on the VPS (automatically):
1. `git pull origin master` — pulls latest code
2. `npm install --legacy-peer-deps` — installs/updates dependencies
3. `npx payload migrate` — runs any pending DB schema migrations
4. `npm run build` — compiles Next.js production bundle
5. Copies `.env` → standalone dir; rsyncs persistent media → standalone
6. `fuser -k 12000/tcp` — kills old server process
7. `setsid node server.js` — starts new server daemonized on port 12000

---

## Key Info
| Item | Value |
|---|---|
| Live URL | https://healingtechnology.com.bd |
| VPS IP | `97.74.90.189` |
| SSH User | `healingtechnology` |
| App Directory | `/var/www/vhosts/healingtechnology.com.bd/httpdocs/` |
| App Port | `12000` |
| Deploy Log | `httpdocs/redeploy.log` |
| App Log | `httpdocs/app.log` |
| GitHub Repo | `https://github.com/ehsanhossain/Healing-Technology` |
| Branch | `master` |

---

## Troubleshooting

### Git conflict on VPS (`backup.sql` or other local changes)
If `git pull` fails with "local changes would be overwritten", Step 4 already handles this with `git reset --hard origin/master` before pulling.

### Check if server is running
```powershell
node tmp/run_vps_cmd.js "fuser 12000/tcp && curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:12000/"
```

### View live error logs
```powershell
node tmp/run_vps_cmd.js "tail -n 50 /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log"
```

### Restart server without rebuilding
```powershell
node tmp/run_vps_cmd.js "cd /var/www/vhosts/healingtechnology.com.bd/httpdocs && fuser -k 12000/tcp 2>/dev/null; cd .next/standalone && export PORT=12000 && setsid /opt/plesk/node/22/bin/node server.js >> /var/www/vhosts/healingtechnology.com.bd/httpdocs/app.log 2>&1 &"
```
