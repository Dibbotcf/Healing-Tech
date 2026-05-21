---
description: Full deploy workflow — exports latest local PostgreSQL data, pushes code + DB to Git, deploys to Coolify, restores DB on Coolify, then cleans up. Mention this file or say "deploy2" to trigger this workflow.
---
# /deploy2 Command Workflow

This workflow does a **full deploy**: pushes your latest code AND your latest local database data to the live Coolify environment.

Run this after finishing any local work session where you've added/changed data in the local PostgreSQL database.

// turbo-all

---

## Phase 1 — Export Latest Local PostgreSQL Data

### Step 1 — Export local DB directly to `public/`
*Using `cmd.exe` instead of native PowerShell prevents UTF-16LE encoding corruption during the dump and avoids the need for a secondary conversion step.*
```powershell
cmd.exe /c "docker exec healing-technology-postgres pg_dump -U postgres -d healing-technology --clean --if-exists > public\latest_plesk_dump.sql"
```

---

## Phase 2 — Create Temporary Restore Infrastructure

### Step 3 — Create the DB restore API route
Create file `src/app/api/restore-db/route.ts` with this exact content:
```ts
import { execSync } from 'child_process'

export async function GET() {
  try {
    execSync(`psql "${process.env.DATABASE_URI}" -f "public/latest_plesk_dump.sql"`)
    return Response.json({ ok: true, message: "Import completed successfully!" })
  } catch (error: any) {
    return Response.json({ ok: false, error: error.message, stderr: error.stderr?.toString() })
  }
}
```

### Step 4 — Add `postgresql` to `nixpacks.toml`
In `nixpacks.toml`, change line 2 from:
```toml
nixPkgs = ["nodejs_22"]
```
to:
```toml
nixPkgs = ["nodejs_22", "postgresql"]
```

---

## Phase 3 — Git Push to Trigger Coolify Deploy

### Step 5 — Stage and commit all changes
```powershell
git add -A
git commit -m "chore: deploy with db restore"
```

### Step 6 — Push to GitHub (Coolify auto-deploys within ~30 seconds)
```powershell
git push origin master
```

> ⏳ Now **wait 5–10 minutes** for Coolify to finish building and deploying.
> Monitor at: https://deploy.oryzen.app → Projects → Healing Technology → Deployments tab
> Wait until you see **"Rolling update completed."**

---

## Phase 4 — Trigger the Database Restore on Coolify

### Step 7 — Call the restore endpoint
Use `read_url_content` tool to fetch:
```
https://healingtechnology.com.bd/api/restore-db
```

Verify the response contains `{ "ok": true, "message": "Import completed successfully!" }`

If it returns `ok: false`, read the `error` and `stderr` fields to diagnose. Do NOT proceed to Phase 5 until `ok: true` is confirmed.

---

## Phase 5 — Clean Up (ALWAYS do this after restore)

> ⚠️ CRITICAL: Leaving the restore endpoint and SQL dump public is a security risk. Always clean up immediately after confirming the restore worked.

### Step 8 — Delete temporary files
```powershell
Remove-Item src/app/api/restore-db/route.ts -Force
Remove-Item public/latest_plesk_dump.sql -Force
```

### Step 9 — Revert `nixpacks.toml` back to original
In `nixpacks.toml`, revert line 2 back to:
```toml
nixPkgs = ["nodejs_22"]
```

### Step 10 — Commit and push the cleanup
```powershell
git add -A
git commit -m "chore: remove temporary db restore setup"
git push origin master
```

> ✅ Coolify will do one final deploy with the clean code. Your DB data is now live and the temporary restore infrastructure is removed.

---

## Summary of What This Workflow Does

| Phase | What happens |
|-------|-------------|
| Phase 1 | Exports your local PostgreSQL → `backup.sql` + `public/latest_plesk_dump.sql` |
| Phase 2 | Creates a temporary `/api/restore-db` endpoint + adds `psql` to Nixpacks |
| Phase 3 | Pushes everything to GitHub → Coolify auto-builds and deploys |
| Phase 4 | Triggers the restore endpoint to import your local DB into Coolify's PostgreSQL |
| Phase 5 | Deletes the temporary restore files and pushes the clean codebase |

---

## Credentials Reference

| Resource | Value |
|----------|-------|
| Live URL | https://healingtechnology.com.bd |
| Coolify Dashboard | https://deploy.oryzen.app |
| GitHub Repo | https://github.com/ehsanhossain/Healing-Technology (`master` branch) |

*Maintained by Antigravity.*
