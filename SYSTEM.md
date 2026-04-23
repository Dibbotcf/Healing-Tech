# Healing Technology — System Overview & Feature Documentation

> **Platform:** Medical Equipment E-Commerce & Catalog  
> **Live URL:** https://healingtechnology.com.bd  
> **Admin Panel:** https://healingtechnology.com.bd/admin  
> **Local Dev:** http://localhost:12000

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Technology Stack](#2-technology-stack)
3. [CMS Collections & Data Model](#3-cms-collections--data-model)
4. [Frontend Pages & Routes](#4-frontend-pages--routes)
5. [UI Components](#5-ui-components)
6. [API Endpoints](#6-api-endpoints)
7. [Client-Side State & Store](#7-client-side-state--store)
8. [Media System](#8-media-system)
9. [Infrastructure & Deployment](#9-infrastructure--deployment)
10. [Local Development Setup](#10-local-development-setup)
11. [VPS Sync Workflows](#11-vps-sync-workflows)
12. [Key Credentials & Access](#12-key-credentials--access)

---

## 1. System Architecture

```
Browser
  │
  ▼
Apache/Nginx (Plesk) ─── port 80/443
  │  reverse proxy
  ▼
Next.js Standalone Server ─── port 12000
  │
  ├── /admin/*           → Payload CMS Admin Panel (React SPA)
  ├── /api/*             → Payload CMS REST API + custom Next.js API routes
  └── /* (frontend)      → Next.js App Router pages (SSR + Static)
         │
         └── PostgreSQL  ← Payload ORM (db-postgres adapter)
                            hosted on VPS localhost:5432
```

**Key architectural decisions:**
- **Unified server** — Payload CMS runs embedded inside the same Next.js process (no separate backend server needed).
- **Next.js Standalone build** — Production uses `output: 'standalone'` for a self-contained Node.js server bundle.
- **Media served statically** — All CMS-uploaded files are served from `/public/media/` via Next.js static file serving, not through Payload's API at runtime.

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.2 |
| UI Runtime | React | 19 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| CMS | Payload CMS | 3.x (headless, embedded) |
| Rich Text | Lexical Editor | (bundled with Payload) |
| Database | PostgreSQL | 14+ |
| ORM/Adapter | @payloadcms/db-postgres | 3.x |
| Animations | Framer Motion | 12.x |
| UI Components | HeroUI / Radix | — |
| Icons | Lucide React | — |
| State Management | Zustand (cart store) | — |
| HTTP (media sync) | node-ssh (ssh2) | — |
| Node.js (prod) | Node.js | 22.x |
| Server (prod) | Next.js Standalone | — |
| Hosting | GoDaddy VPS + Plesk | — |

---

## 3. CMS Collections & Data Model

All collections are managed via the Payload CMS admin panel at `/admin`.

### 3.1 Products (`/admin/collections/products`)

The core collection. Each product has:

| Field | Type | Description |
|---|---|---|
| `name` | Text | Full product name |
| `slug` | Text (unique) | URL identifier e.g. `HF-L60-L84C` |
| `sku` | Text | Stock Keeping Unit code |
| `price` | Number | Listed price in BDT (৳) |
| `discountPrice` | Number | Sale/discounted price |
| `markAsNew` | Boolean | Shows "NEW" badge on listing |
| `category` | Relationship → Categories | Product category |
| `brand` | Relationship → Brands | Manufacturer brand |
| `heroImage` | Upload → Media | Primary listing/detail image |
| `gallery` | Array of Uploads | Additional images for detail page carousel |
| `listingTitle` | Text | Short title shown on product card |
| `listingSummary` | Textarea | Short description on product card |
| `shortSummary` | Textarea | Intro paragraph on detail page |
| `overview` | Rich Text (Lexical) | Full product overview (supports headings, lists, bold) |
| `keyHighlights` | Array of Text | Bullet feature points |
| `applications` | Array of Text | Departments/use cases (e.g. ICU, OT) |
| `originCountry` | Text | Country of manufacture |
| `certificationSummary` | Textarea | Certifications (CE, ISO, FDA etc.) |
| `specGroups` | Array of Groups | Technical specifications table (grouped rows of label/value) |
| `downloadItems` | Array | Downloadable files: Brochure, Datasheet, Manual, Certificate, Warranty Note |
| `supportBlocks` | Array | Support info blocks (title + body) |
| `faqItems` | Array | Product-specific FAQ (question + answer) |
| `relatedProducts` | Relationship (many) → Products | Cross-linked related products |
| `status` | Select: draft / published | Only published products appear on frontend |

---

### 3.2 Brands (`/admin/collections/brands`)

| Field | Type | Description |
|---|---|---|
| `name` | Text | Brand name (e.g. AEONMED, Suxin Medical) |
| `slug` | Text | URL-safe identifier |
| `logo` | Upload → Media | Brand logo image |
| `country` | Text | Brand origin country |
| `description` | Textarea | Short brand description |

---

### 3.3 Categories (`/admin/collections/categories`)

| Field | Type | Description |
|---|---|---|
| `title` | Text | Category display name (e.g. ICU Equipment) |
| `slug` | Text | URL identifier (e.g. `icu-equipment`) |
| `description` | Textarea | Category description |
| `image` | Upload → Media | Category cover image |

Current categories: Operation Theater Equipments, Diagnostic Equipments, Hospital Furniture, Respiratory Devices, Neonatal Care, ICU Equipment, Diagnostic.

---

### 3.4 Certifications (`/admin/collections/certifications`)

Stores product certification documents linked to products.

---

### 3.5 Legal Pages (`/admin/collections/legal-pages`)

CMS-managed pages for Privacy Policy, Terms of Service, Cookie Policy.

---

### 3.6 Media (`/admin/collections/media`)

All uploaded files (images, PDFs, videos). Files are stored at:
- **Local dev:** `public/media/[filename]` → served at `/media/[filename]`
- **Production:** `.next/standalone/public/media/` + `/persistent/media/` (survives redeploys via rsync)

---

### 3.7 Globals

- **Site Settings** (`/admin/globals/site-settings`) — Site-wide configuration (name, contact info, social links).

---

## 4. Frontend Pages & Routes

All frontend pages live under `src/app/(frontend)/`.

| Route | File | Description |
|---|---|---|
| `/` | `page.tsx` | Homepage — Hero slider, category showcase, product accordion, partner logos, testimonials, FAQ |
| `/products` | `products/page.tsx` + `ProductFilterClient.tsx` | Product listing with sidebar category filter + search |
| `/products/[slug]` | `product/[slug]/page.tsx` | Full product detail page with gallery, specs, FAQ, downloads |
| `/about` | `about/page.tsx` | About the company |
| `/what-we-do` | `what-we-do/page.tsx` | Services overview with partner logo marquee |
| `/contact` | `contact/page.tsx` | Contact form |
| `/checkout` | `checkout/page.tsx` | Cart checkout flow |
| `/payment` | `payment/page.tsx` | Payment confirmation |
| `/invoice/[id]` | `invoice/[id]/page.tsx` | Printable order invoice |
| `/track-order` | `track-order/page.tsx` | Order tracking page |
| `/after-sales` | `after-sales/page.tsx` | After-sales service info |
| `/clinical-training` | `clinical-training/page.tsx` | Clinical training services |
| `/preventive-maintenance` | `preventive-maintenance/page.tsx` | Maintenance service info |
| `/submit-evidence` | `submit-evidence/page.tsx` | Evidence/compliance submission form |
| `/privacy` | `privacy/page.tsx` | Privacy Policy (CMS-driven) |
| `/terms` | `terms/page.tsx` | Terms of Service (CMS-driven) |
| `/cookies` | `cookies/page.tsx` | Cookie Policy (CMS-driven) |
| `/admin/*` | (Payload) | Full CMS admin dashboard |

---

## 5. UI Components

All components are in `src/components/`.

### Navigation
- **`Navbar.tsx`** — Responsive top navigation bar. Includes mega-menu with all product categories, search button, cart icon with item count, Contact Us CTA, and mobile hamburger drawer.
- **`SearchModal.tsx`** — Full-screen search overlay. Fuzzy search across product names with live results, keyboard accessible.
- **`Footer.tsx`** — Site footer with company info, quick links, contact details, social media links, and WhatsApp link.

### Homepage Sections
- **`HeroSlider.tsx`** — Full-screen auto-advancing image carousel with slide-specific headline text, CTA buttons, and mobile swipe support.
- **`CategoryShowcase.tsx`** — Visual grid of product categories linking to filtered product listings.
- **`PremiumProductShowcase.tsx`** — Cinematic expanding-accordion component showing featured products. Hover to expand each panel with product name, image, and CTA.
- **`ProductCarousel.tsx`** — Horizontal scrollable product card carousel for featured/new products.
- **`TestimonialsSection.tsx`** — Client testimonials with star ratings and auto-rotate carousel.
- **`FAQSection.tsx`** — Animated accordion FAQ section for the homepage.
- **`BrandPopupCard.tsx`** — Partner/brand logo card with hover popup showing brand details.

### Product Pages
- **`ProductGallery.tsx`** — Interactive product image gallery with:
  - Animated image carousel (keyboard + touch swipe + arrow buttons)
  - Thumbnail strip for direct image selection
  - **Fullscreen lightbox** (click image → full-screen overlay with ✕ close, navigation arrows, swipe support)
  - Video support (auto-play inline for video gallery items)
- **`ProductDetailTabs.tsx`** — Tabbed content area on product detail page: Overview, Specifications, Downloads, FAQ, Support.
- **`ProductSpecsTable.tsx`** — Renders grouped technical specification tables.
- **`ProductClientActions.tsx`** — Add to Cart + Quick Order buttons on product detail page.
- **`RelatedProducts.tsx`** — Grid of related products at bottom of detail page.
- **`SmartDescription.tsx`** — Renders Payload Lexical rich text content with proper HTML formatting.

### E-Commerce
- **`CartSidebar.tsx`** — Slide-in cart drawer (right side). Shows all cart items, quantities, prices, remove buttons, total, and Checkout CTA.

### Utility
- **`WhatsAppFAB.tsx`** — Floating WhatsApp button (bottom right). Opens WhatsApp chat with pre-filled company number.
- **`PrintButton.tsx`** — Client-side print trigger button (used on invoice pages).
- **`InvoiceLinkCell.tsx`** — Custom Payload admin table cell that links to the printable invoice for an order.

---

## 6. API Endpoints

### Payload CMS REST API (auto-generated)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List all products (supports `?where`, `?depth`, `?limit`) |
| GET | `/api/products/[id]` | Single product by ID |
| GET | `/api/categories` | List all categories |
| GET | `/api/brands` | List all brands |
| GET | `/api/media` | List all media |
| GET | `/api/media/file/[filename]` | Serve a media file |

### Custom Next.js API Routes (`src/app/api/`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/public-categories` | Public category list (no auth) |
| GET | `/api/public-client-logos` | Client hospital logos for marquee |
| GET | `/api/public-partner-logos` | Partner/brand logos for marquee |
| GET | `/api/menus` | Navigation menu data |
| POST | `/api/checkout` | Submit a checkout/order |
| POST | `/api/submit-evidence` | Submit compliance evidence form |

---

## 7. Client-Side State & Store

### Cart Store (`src/lib/cartStore.ts`)
Built with **Zustand** (persisted to `localStorage`).

**State:**
- `items: CartItem[]` — Array of `{ id, name, price, discountPrice, heroImage, slug, quantity }`

**Actions:**
- `addItem(product, quantity)` — Add to cart (or increment if already exists)
- `removeItem(id)` — Remove item completely
- `updateQuantity(id, quantity)` — Set exact quantity
- `clearCart()` — Empty the cart

Cart persists across page refreshes via localStorage.

---

## 8. Media System

### URL Normalization (`src/lib/getMediaUrl.ts`)
Payload CMS stores media URLs as absolute paths like `/api/media/file/foo.png`. The `getMediaUrl()` utility strips the origin and rewrites to `/media/foo.png` for local static serving.

```
/api/media/file/image.png  →  /media/image.png
https://healingtechnology.com.bd/api/media/file/image.png  →  /media/image.png
```

### Media Storage Paths
| Environment | Upload location | Served from |
|---|---|---|
| Local dev | `public/media/` | `/media/` (Next.js static) |
| Production (git-tracked) | `public/media/` → copied to standalone | `.next/standalone/public/media/` |
| Production (CMS uploads) | `/persistent/media/` on VPS | rsync'd into standalone on each deploy |

### File Size Limits
Configured to support uploads up to **2 GB** (Next.js body parser and Payload limits both lifted).

---

## 9. Infrastructure & Deployment

### Production Server
| Item | Value |
|---|---|
| Server | GoDaddy VPS (Ubuntu) |
| Control Panel | Plesk Obsidian |
| Domain | healingtechnology.com.bd |
| Node.js | `/opt/plesk/node/22/bin/node` (v22.x) |
| App Port | 12000 (Apache reverse-proxied) |
| App Directory | `/var/www/vhosts/healingtechnology.com.bd/httpdocs/` |
| Standalone Dir | `httpdocs/.next/standalone/` |
| Persistent Media | `/var/www/vhosts/healingtechnology.com.bd/persistent/media/` |
| App Log | `httpdocs/redeploy.log` + `httpdocs/app.log` |

### Deployment Pipeline (`redeploy.sh`)
1. `git pull origin master` — Pull latest code
2. `npm install --legacy-peer-deps` — Install dependencies
3. `npx payload migrate` — Run any pending DB migrations
4. `npm run build` — Compile Next.js production bundle
5. Copy `.env` → standalone; rsync `public/` → standalone; rsync persistent media → standalone
6. `fuser -k 12000/tcp` — Kill existing process
7. `setsid node server.js` — Start server daemonized on port 12000

### Build Output
Uses `output: 'standalone'` in `next.config.ts`. The standalone bundle includes everything needed to run without `node_modules`.

### Environment Variables (`.env`)
```env
NEXT_PUBLIC_SITE_URL=https://healingtechnology.com.bd
PORT=12000
PAYLOAD_SECRET=d82494f0614eb589ba5b3e21b7abceb1
DATABASE_URI=postgresql://healingtechnology.co_bgieab3zdtl:HealDB2026@127.0.0.1:5432/healingtechnology
```
Must exist in **two locations**: `httpdocs/.env` AND `httpdocs/.next/standalone/.env`.

---

## 10. Local Development Setup

### Prerequisites
- Docker Desktop running
- Node.js 20+
- Git

### Start Local Environment
```powershell
# 1. Start PostgreSQL container
docker run -d --name healing-technology-postgres \
  -p 12001:5432 \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=healing-technology \
  postgres

# 2. Start Next.js dev server
npm run dev
# App runs at http://localhost:12000
# Admin panel at http://localhost:12000/admin
```

Or use the `/start` workflow (via `.agent/workflows/start.md`).

### Local Database Credentials
```env
DATABASE_URI=postgresql://postgres:postgres@127.0.0.1:12001/healing-technology
```

---

## 11. VPS Sync Workflows

### Sync Production DB → Local (`plesktolocaldb.md` / `scripts/sync_from_vps.ps1`)
```powershell
.\scripts\sync_from_vps.ps1
```
Steps performed automatically:
1. Export production DB on VPS (`pg_dump`)
2. Download `backup.sql` via SSH
3. Download `public/media` (static + standalone + persistent) from VPS
4. Drop local schema + reimport

### Deploy Local Changes → VPS (`gittovps.md`)
```bash
# 1. Push to GitHub (local)
git add -A && git commit -m "..." && git push origin master

# 2. Pull + redeploy on VPS (via SSH utility)
node tmp/run_vps_cmd.js "cd /var/www/vhosts/healingtechnology.com.bd/httpdocs && git pull origin master && bash redeploy.sh"
```

### Remote SSH Utility (`tmp/run_vps_cmd.js`)
```bash
# Run a command on VPS
node tmp/run_vps_cmd.js "tail -n 30 app.log"

# Upload a file to VPS
node tmp/run_vps_cmd.js upload local/path.txt /remote/path.txt

# Download a file from VPS
node tmp/run_vps_cmd.js download local/path.txt /remote/path.txt

# Download a directory from VPS
node tmp/run_vps_cmd.js downloadDir local/dir /remote/dir
```

---

## 12. Key Credentials & Access

> ⚠️ Keep this file private — do not commit to public repositories.

### SSH / VPS
| Item | Value |
|---|---|
| IP | `97.74.90.189` |
| SSH User | `healingtechnology` |
| SSH Password | `S_hJ4NZ*rxr4i1zsw` |

### Plesk Panel
| Item | Value |
|---|---|
| URL | `https://healingtechnology.com.bd:8443` |
| User | `deploy` |
| Password | `59_Jd3gp0` |

### Production Database
| Item | Value |
|---|---|
| Engine | PostgreSQL (localhost) |
| DB Name | `healingtechnology` |
| User | `healingtechnology.co_bgieab3zdtl` |
| Password | `HealDB2026` |
| Full URI | `postgresql://healingtechnology.co_bgieab3zdtl:HealDB2026@127.0.0.1:5432/healingtechnology` |

### Local Database
| Item | Value |
|---|---|
| Container | `healing-technology-postgres` |
| Port | `12001` (mapped to container's 5432) |
| DB Name | `healing-technology` |
| User | `postgres` |
| Password | `postgres` |

### GitHub
| Item | Value |
|---|---|
| Repository | `https://github.com/ehsanhossain/Healing-Technology` |
| Branch | `master` |

---

## Appendix: File Structure Reference

```
Healing Technology/
├── src/
│   ├── app/
│   │   ├── (frontend)/         # All public-facing pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── products/       # Product listing + filter
│   │   │   ├── product/        # Product detail [slug]
│   │   │   ├── checkout/       # Cart checkout
│   │   │   ├── about/          # About page
│   │   │   ├── what-we-do/     # Services page
│   │   │   └── ...             # Other pages
│   │   ├── (payload)/          # Payload CMS admin routes
│   │   └── api/                # Custom API routes
│   ├── collections/            # Payload CMS data schemas
│   │   ├── Products.ts
│   │   ├── Brands.ts
│   │   ├── Categories.ts
│   │   ├── Certifications.ts
│   │   └── LegalPages.ts
│   ├── globals/
│   │   └── SiteSettings.ts     # Global CMS settings
│   ├── components/             # All React UI components
│   ├── lib/
│   │   ├── cartStore.ts        # Zustand cart state
│   │   ├── getMediaUrl.ts      # Media URL normalizer
│   │   └── utils.ts
│   ├── payload.config.ts       # Main Payload CMS configuration
│   └── middleware.ts           # Next.js route middleware
├── public/
│   └── media/                  # All uploaded media files (git-tracked)
├── scripts/
│   └── sync_from_vps.ps1       # DB + media sync from production
├── tmp/
│   └── run_vps_cmd.js          # SSH utility for VPS commands
├── redeploy.sh                 # VPS production deploy script
├── plesktolocaldb.md           # Guide: sync production DB to local
├── gittovps.md                 # Guide: deploy from git to VPS
├── stack.md                    # Technical stack details
└── SYSTEM.md                   # This file — overall system docs
```
