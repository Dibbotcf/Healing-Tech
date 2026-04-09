# Healing Technology Technical Stack

This document outlines the entire technical architecture, frameworks, languages, and deployment systems that power the Healing Technology platform. 

---

## 1. Core Framework & Frontend
* **Next.js (App Router):** The overarching framework running both the frontend UI and the backend APIs. (Currently actively running version `16.2.2` under Turbopack in local development, and standard builds via Webpack in production).
* **React 19:** Underpins Next.js and handles component lifecycles, hooks, and Concurrent rendering.
* **TypeScript:** Brings strict static typing across the entire codebase (frontend and backend), reducing runtime errors.
* **Tailwind CSS:** The primary utility-first CSS framework handling responsiveness, typography, and foundational frontend styling constraints.

---

## 2. Backend & Content Management
* **Payload CMS (v3):** Operating as a headless CMS embedded directly alongside Next.js. It drastically accelerates generating the database schemas (Brands, Categories, Products) and automatically crafts the Admin dashboard (at `/admin`).
* **Built-in Authentication:** Utilizing Payload's built-in robust authentication module for accessing the dashboard securely.
* **Lexical Editor:** Payload's rich-text editor engine providing complex content blocks, drafts, and layout rendering underneath the hood.

---

## 3. Database Layer
* **PostgreSQL:** The primary relational database holding all application state, users, and content dynamically. It handles all arrays, blocks, and relational data required by the e-commerce structure.
* **Drizzle ORM / Payload Postgres Adapter:** The underlying adapter (`@payloadcms/db-postgres`) automatically migrating and translating Payload schemas (like `products`, `brands`) into native PostgreSQL tables without writing any SQL.

---

## 4. Production Infrastructure & VPS (GoDaddy + Plesk)
* **Virtual Private Server (VPS):** A dedicated GoDaddy server providing isolated compute power for the application.
* **Plesk Obsidian (Ubuntu):** The foundational server control panel bridging Nginx/Apache handling the domains (`healingtechnology.com.bd`). 
* **Node.js (v22.22.2):** The strict background Node runtime executing the bundled `/standalone` Next.js server natively in production (distinct from the local Node v24 environment).
* **Process Management:** Running explicitly as a background daemon utilizing native process handlers (`setsid` and Bash detached processes) on internal network ports (`12001`).

---

## 5. The Routing & Proxy Architecture (The PLESK Fix)
Because Plesk rigidly controls Next.js deployments and struggles mapping dynamic routes mixed with deep static assets (like `/_next/static`), the system uniquely uses:
* **Express.js Reverse Proxy Wrapper:** A robust intermediary Node server (running on port `12000`) functioning exclusively to untangle routing issues. 
  - It catches requests coming from Plesk's Apache/Nginx entrypoint.
  - It manually reads the filesystem and serves any Next.js static asset correctly.
  - It proxies everything else (UI, GraphQL, and `/admin` panel data) exactly to the isolated internal Next app running on port `12001`. 

---

## 6. Deployment Tools 
* **Git:** Maintaining version control and managing the transfer of files between the local desktop and the remote VPS.
* **Turbopack / SWC compiler:** Next.js compiling technology accelerating hot-module reloading and background code resolution.
