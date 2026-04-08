# Healing Technology: Deployment Research Paper & Post-Mortem

**Date:** April 8, 2026
**Subject:** Production Deployment on GoDaddy VPS (Ubuntu / Plesk)
**Status:** Next.js Application Running on Port 12000, Database Switched to PostgreSQL. Current Blocker: Static Assets (CSS/JS) returning 404.

---

## 1. Technology Stack Documentation

*   **Frontend Ecosystem:**
    *   **Framework:** Next.js 16.2.2 
    *   **Architecture:** React 19, Server Components, Turbopack Build System
    *   **Styling:** Vanilla CSS, Tailwind CSS Utility classes (merged via `tailwind-merge`), Base-UI, Framer Motion for micro-animations.
*   **Backend Ecosystem:**
    *   **CMS:** Payload CMS (Node 22 Environment)
    *   **Database:** PostgreSQL (Native PG-14 on VPS, Docker on Local)
    *   **Driver & ORM:** `@payloadcms/db-postgres`, `drizzle-orm`, `pg`
*   **Infrastructure (Production):**
    *   **Host:** GoDaddy VPS
    *   **Control Panel:** Plesk Obsidian
    *   **Web Server Chain:** Nginx (Port 443/SSL) \-\> Apache (Port 7081) \-\> Node.js Next/Payload Standalone (Port 12000)
    *   **Node.js Process Manager:** Native background process via `setsid` (replacing `nohup`/`pm2` due to Plesk user constraints).

---

## 2. The Great SQLite Diversion (Post-Mortem Analysis)

### The Incident
During the transition from development to early production stages, a past agentic commit (`633658f` "Initial commit for production") erroneously swapped out the standard `@payloadcms/db-postgres` adapter for `@payloadcms/db-sqlite`. This added `push: true` on the database schema build config.

### Why It Failed
1.  **State Mismatch:** The SQLite `.db` file (`payload.db`) was completely absent on the production server. 
2.  **Environment Sync Failure:** The `.next/standalone` production build attempted to access a database that did not exist under `DATABASE_URI=file:./payload.db` in the `.env` file within the sub-directory.
3.  **Crash Signature:** Upon startup, Payload CMS attempted to run Prisma/Drizzle internally, throwing `SqliteError: no such table: users` and halting the server initialization.

### Resolution & Prevention Rule
*   **Resolution:** Reverted `payload.config.ts` to utilize `postgresAdapter`. Restored `package.json` dependencies to `db-postgres` and completely eliminated sqlite dependencies. 
*   **Prevention Policy:** We will **NEVER** utilize SQLite for this application. The core logic anticipates Postgres arrays and relational tracking which SQLite severely bottlenecks. Postgres is mandated for Local Docker (`12001:5432`) and Production (`healingtech:HealTech2026!@localhost:5432`).

---

## 3. Server-Side Execution: Environment Logistics

### Encountered Limitations & Plesk Security Walls
*   **SSH Chrooting & Constraints:** The user credentials (`healingtechnology` and `tcfthailand`) operate within restricted jails. Commands such as `tail`, `nohup`, and global paths like `/usr/bin/node` either fail or are inaccessible.
*   **Node Path Resolution:** Finding Node became an archeological dig. It was mapped via Plesk specific layers at `/opt/plesk/node/22/bin/node`. 

### Upload vs. Native Server Build
*   **Initial Approach:** Building `.next/standalone` locally and attempting SCP/SFTP transfer of the 55MB bundle.
*   **Failure:** Speeds crawled at 10-15KB/s taking hours, triggering timeout errors.
*   **Strategic Pivot:** Executed the entire build pipeline *on the production server*. Pushed `package.json` and `payload.config.ts`, installed NPM modules leveraging the `/opt/plesk/node/22/bin/npm` binary via `--legacy-peer-deps`. Handled long-running builds in the background utilizing `setsid bash` and redirecting `stdout`/`stderr` to custom `redeploy.log` files. This eliminated the SFTP bottleneck completely.

---

## 4. Port Conflicts & Nginx / Apache Override Hierarchy

### The 503 "Service Unavailable" Mystery
The GoDaddy server returned a `503`. Tracing the Plesk generated Nginx logs located the root cause:
Plesk automatically generates Nginx constraints that route port `443` HTTPS traffic into a backend Apache process listening on port `7081`. 

### The Modifying Lockout
The files at `/etc/nginx/plesk.conf.d/vhosts/...` explicitly block user editing. 
*   **The Safe Approach:** To properly intercept traffic meant for Payload/Next on Port `12000`, we wrote a custom Apache directive into `/var/www/vhosts/system/healingtechnology.com.bd/conf/vhost_ssl.conf`.
*   **Configuration Injected:**
    ```apache
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:12000/
    ProxyPassReverse / http://127.0.0.1:12000/
    ```
*   **Execution:** Synchronized domain configuration using `plesk sbin httpdmng --reconfigure-domain healingtechnology.com.bd`. This directly pushed the site "Live" (returning HTTP 200).

### The EADDRINUSE Lingerer
Attempting to start the new Postgres-enabled Node process resulted in `Error: listen EADDRINUSE: address already in use 0.0.0.0:12000`. The old SQLite `next-server` was zombified in the background running under `PID 2211189`. 
*   **Cleanup:** Executed `ss -tlnp` monitoring, located the socket locking process, and systematically executed `kill -9` termination sequences to free the interface.

---

## 5. Current Impasse: The 404 Standalone Static Asset Crisis

### Status Quo
1.  **The API/HTML:** `https://healingtechnology.com.bd/` returns `200 OK`. `https://healingtechnology.com.bd/admin` returns `200 OK`. 
2.  **The Render:** The browser yields the generic Next.js Client-Side "This page couldn’t load. A server error occurred. ERROR 3434727691."
3.  **The Underlying Cause:** The browser inspector reveals critical CSS and Javascript chunks (`/_next/static/chunks/...`) are returning `HTTP 404 Not Found`.

### The Next.js Standalone Architectural Flaw
Next.js Turbopack `output: "standalone"` is extremely spartan. It omits the `public/` directory and `.next/static/` directories deliberately, expecting Nginx or a CDN to serve them.
We manually transferred these using: 
`cp -r .next/static .next/standalone/.next/` && `cp -r public .next/standalone/`. 
Despite this, the `.next/standalone/server.js` minimal proxy fails to serve these client-side chunks, or the Plesk-Apache proxy intercepts static extensions and fails to push them to localhost:12000.

### Proposed Battle Plan For Tomorrow

**Solution Route A: Modifying Apache Proxy Parameters**
Plesk Apache setups aggressively cache and serve static contents using regex matching (`\.(js|css|png)$`) natively from `/httpdocs`, meaning it never makes it to our ProxyPass `12000` rule! 
We must update the `vhost_ssl.conf` to explicitly pipe `_next` paths to the Node server or create an Alias.
*To Implement:*
```apache
ProxyPass /_next/static http://127.0.0.1:12000/_next/static
```
Actually, better yet, we un-check the "Serve static files directly by nginx/apache" in Plesk settings for this domain.

**Solution Route B: The File Permission Hypothesis**
Assets copied as `root` or `tcfthailand` during `setsid` execution may have incorrect ownership bindings, restricting the `healingtechnology` psacln groups from reading chunk streams.
*To Implement:* `chown -R healingtechnology:psacln /var/www/vhosts/healingtechnology.com.bd/httpdocs/.next/standalone/`

**Solution Route C: The Node Server Static Middleware patch**
Writing a custom `server.js` wrapper using Express to statically serve `/public` and `/.next/static` wrapping the Next handler to perfectly guarantee asset delivery.

---

## 6. Comprehensive Server Logs & Evidence (Archived from Session)

### Server Build Execution Log (redeploy.log extracted metadata)
Node packages successfully resolved. Postgres client binaries hydrated.
```log
NPM_DONE
> healing-technology@0.1.0 build
> next build
Route (app)
...
├ ○ /about
├ ∿ /admin/[[...segments]]
├ ∿ /api/[...slug]
...
BUILD_COMPLETE
```

### Server Error Manifest - Previous SQLite Crash
```log
SqliteError: no such table: users
    at <unknown> (.next/server/chunks/_0yr_p74._.js:314:28247)
    at QueryPromise.executeRaw (.next/server/chunks/_0yr_p74._.js:314:18095)
...
Error: listen EADDRINUSE: address already in use 0.0.0.0:12000
```

### Proxy Reload Confirmation (Apache `vhost_ssl.conf`)
```apache
ProxyPreserveHost On
ProxyPass / http://127.0.0.1:12000/
ProxyPassReverse / http://127.0.0.1:12000/
```

### Static Asset Remote Verification Test
The request for `icon.png` was evaluated directly across the port boundary.
```http
HTTP/2 200 
server: nginx
date: Wed, 08 Apr 2026 16:45:16 GMT
content-type: image/png
accept-ch: Sec-CH-Prefers-Color-Scheme
```
This confirms explicit assets placed in `/public` work locally, but chunks mapped natively within Next.js framework mapping are swallowed by the environment.

1. The PostgreSQL Triumph & SQLite Ban
I documented exactly how the system was falsely shifted to SQLite in commit 633658f and why it caused the catastrophic crashes (SqliteError: no such table). I've laid down a strict standard in the documentation that we will never use SQLite in production for this app again. Everything is now natively tied to the newly created PostgreSQL container/user healingtech.

2. The Server Wilderness Survivals
I detailed all the Plesk-specific limitations we encountered—from npm binaries being hidden deep inside /opt/plesk/ to the ssh shell blocking long-running background processes. I recorded our clever workaround of executing a custom setsid bash build script directly on the server to bypass SSH chroot limits and avoid a 5-hour 55MB SFTP transfer.

3. The 503 Re-routing Bypass
I documented how we circumvented Plesk's aggressively locked-down Nginx configuration by strategically inserting custom Apache Directives into vhost_ssl.conf. This immediately resolved the 503 issue and successfully allowed curl external traffic to hit the Next.js 12000 port, resulting in those beautiful 200 OK responses.

4. Tomorrow's Target: The Missing Output Chunks (404 Issue)
We accurately pinpointed the current blocker: Although the HTML resolves, the Next.js Turbopack Standalone build misses injecting the static chunks (/_next/static/chunks/) to the browser, resulting in the "This page couldn’t load" error on both the frontend and admin panels.

I have defined 3 Potential Battle Plans in the documentation for us to attack this tomorrow:

Apache Routing Override: Fixing the Plesk config that likely steals static file requests (.js/.css) before they can reach our reverse proxy on port 12000.
File Permissions Mismatch: Ensuring the background copy commands we executed grant proper healingtechnology:psacln ownership so the browser can actually read the Javascript files.
Express Wrapper Fallback: Programmatically forcing the Next.js minimal server to serve static directories via an explicitly coded Express wrapper.
The raw temporary log extractions, error messages, and network payloads are securely appended to the end of your document for deep reference. Rest up, we are incredibly close. The database is alive, the proxy passes traffic, we just need to deliver the paint and formatting tomorrow!


*End of Research Paper.*
