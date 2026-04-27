# Healing Technology — Full Project Architecture Blueprint

> **Use this file as a prompt to recreate the same architecture on a new project.**
> Copy-paste the relevant sections and adjust the domain, brand name, and collections.

---

## 1. Project Overview

Build a **medical equipment B2B e-commerce platform** with a headless CMS, built on:

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.2.2** (App Router, Turbopack) |
| CMS | **Payload CMS 3.83.0** (embedded inside Next.js) |
| Database | **PostgreSQL** (via `@payloadcms/db-postgres`) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** + Vanilla CSS |
| Animations | **Framer Motion 12** + GSAP 3 |
| State | **Zustand** (cart store) |
| UI Components | **Lucide React** icons, **HeroUI**, **shadcn/ui** |
| Rich Text | **Lexical Editor** (`@payloadcms/richtext-lexical`) |
| Image Processing | **Sharp** |
| Dev Port | `12000` |
| Production | Ubuntu VPS (Plesk) via standalone Next.js build |

---

## 2. Environment Variables (`.env`)

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PORT=12000
PAYLOAD_SECRET=your_random_32_char_secret
DATABASE_URI=postgresql://dbuser:dbpassword@127.0.0.1:5432/dbname
PAYLOAD_MEDIA_DIR=/persistent/path/to/media   # optional, defaults to public/media
```

> ⚠️ Do NOT use special characters (`@`, `!`) in DB password — postgres.js double-decodes URL-encoded chars and breaks the connection string.

The `.env` must exist in **two places** on production:
1. `httpdocs/.env`
2. `httpdocs/.next/standalone/.env`

---

## 3. Folder Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # All public-facing website pages
│   │   │   ├── layout.tsx       # Root layout: Navbar, Footer, CartSidebar, WhatsAppFAB
│   │   │   ├── page.tsx         # Homepage: HeroSlider, CategoryShowcase, ProductCarousel, marquees, YoutubeSection
│   │   │   ├── about/
│   │   │   ├── products/        # Product catalog with client-side filter sidebar
│   │   │   │   ├── page.tsx     # Server component: fetches products + categories, passes to client
│   │   │   │   └── ProductFilterClient.tsx  # Client: search, category filter, grid
│   │   │   ├── products/[slug]/ # Individual product detail page
│   │   │   ├── product/[slug]/  # Legacy redirect → /products/[slug]
│   │   │   ├── contact/
│   │   │   ├── checkout/        # Cart checkout form
│   │   │   ├── invoice/[orderNumber]/  # Printable invoice page
│   │   │   ├── track-order/
│   │   │   ├── payment/bkash/   # bKash payment flow
│   │   │   ├── what-we-do/
│   │   │   ├── after-sales/
│   │   │   ├── clinical-training/
│   │   │   ├── preventive-maintenance/
│   │   │   ├── submit-evidence/ # Payment evidence upload
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   ├── cookies/
│   │   │   └── upload/
│   │   ├── (payload)/           # Payload CMS admin panel (auto-managed by Payload)
│   │   ├── api/
│   │   │   ├── [...slug]/       # Payload REST API catch-all
│   │   │   ├── menus/           # Navbar mega-menu data (categories + products)
│   │   │   ├── public-categories/     # Homepage category showcase data
│   │   │   ├── public-client-logos/   # Client logo marquee data
│   │   │   ├── public-partner-logos/  # Partner/brand logo marquee data
│   │   │   ├── checkout/        # Order creation endpoint
│   │   │   ├── submit-evidence/ # Payment screenshot upload
│   │   │   ├── seed-products/   # Dev-only: seed product data
│   │   │   └── seed-images/     # Dev-only: seed image data
│   │   ├── globals.css          # Global styles + Tailwind imports + keyframe animations
│   │   ├── icon.svg             # Favicon (SVG)
│   │   └── seed-db/             # Dev-only: seed DB page
│   ├── collections/             # Payload CMS collection definitions (separate files)
│   │   ├── Categories.ts
│   │   ├── Products.ts
│   │   ├── Brands.ts
│   │   ├── Certifications.ts
│   │   └── LegalPages.ts
│   ├── globals/
│   │   └── SiteSettings.ts      # Payload global: company info, phones, address
│   ├── components/              # Reusable React components
│   │   ├── Navbar.tsx           # Mega-menu navbar with search modal
│   │   ├── Footer.tsx
│   │   ├── HeroSlider.tsx       # Auto-advancing hero image slider (6s interval)
│   │   ├── ProductCarousel.tsx  # Latest products grid + pagination + row shuffle animation
│   │   ├── CategoryShowcase.tsx # Animated category tabs with product images
│   │   ├── PremiumProductShowcase.tsx  # Expanding accordion product showcase
│   │   ├── YoutubeSection.tsx   # YouTube channel video player + playlist
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CartSidebar.tsx      # Slide-out cart sidebar
│   │   ├── SearchModal.tsx      # Full-screen search modal
│   │   ├── WhatsAppFAB.tsx      # Floating WhatsApp button
│   │   ├── ProductDetailTabs.tsx     # Tabbed product detail (Overview, Specs, Downloads, FAQ)
│   │   ├── ProductGallery.tsx        # Image/video gallery with lightbox
│   │   ├── ProductSpecsTable.tsx
│   │   ├── RelatedProducts.tsx
│   │   ├── SmartDescription.tsx      # AI-style typewriter product description
│   │   ├── ProductClientActions.tsx  # Add to cart / Order now buttons
│   │   ├── BrandPopupCard.tsx
│   │   ├── MediaPreview.tsx          # Custom Payload media sidebar preview
│   │   ├── MediaThumbnailCell.tsx    # Custom Payload admin list thumbnail
│   │   ├── InvoiceLinkCell.tsx       # Custom Payload admin cell: invoice link
│   │   ├── PrintButton.tsx
│   │   └── UploadBanner.tsx          # Custom Payload media list banner
│   ├── lib/
│   │   ├── cartStore.ts         # Zustand cart store (add, remove, clear, qty)
│   │   ├── getMediaUrl.ts       # Normalises media URLs for local vs production
│   │   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│   ├── middleware.ts             # Next.js middleware: redirects /product/* → /products/*
│   └── payload.config.ts        # Master Payload CMS configuration
├── public/
│   ├── media/                   # CMS-uploaded media files (images, videos, PDFs)
│   └── (hero images, logos, icons)
├── scripts/
│   └── sync_from_vps.ps1        # PowerShell: exports VPS PostgreSQL DB + rsyncs media to local
├── tmp/
│   └── run_vps_cmd.js           # Node.js SSH utility: run remote commands on VPS
├── .agent/workflows/
│   ├── start.md                 # Daily startup workflow (Docker + DB sync + dev server)
│   ├── deploy.md                # Git push + VPS deploy workflow
│   └── structure.md             # This file
├── redeploy.sh                  # VPS build + deploy script (runs on server)
├── next.config.ts
├── tailwind.config (inline in CSS)
├── tsconfig.json
└── package.json
```

---

## 4. Payload CMS Collections (Full Schema)

### `users`
- `email` (auth field, built-in)
- Auth enabled — this is the admin login

### `media`
- `alt` (text, optional)
- `preview` (UI field — sidebar image/video preview component)
- Upload config: `staticDir` → `public/media` (or `PAYLOAD_MEDIA_DIR` env)
- Allowed: `image/*`, `video/*`, `application/pdf`
- No body size limit (Next.js config: `proxyClientMaxBodySize: "2gb"`)

### `categories`
- `title` (text, required)
- `slug` (text, required, unique)
- `parent` (relationship → categories, self-referential)
- `heroImage` (upload → media)
- `shortDescription` (textarea)
- `heroTitle` (text)
- `heroDescription` (richText, Lexical)
- `sortOrder` (number) — **unique validated, controls display order on website**
- `isActive` (checkbox, default: true)
- SEO plugin applied

### `products`
- `name` (text, required)
- `slug` (text, required, unique)
- `price` (number, BDT ৳)
- `discountPrice` (number, BDT ৳)
- `markAsNew` (checkbox) — shows animated NEW badge on website
- `sku` (text)
- `category` (relationship → categories, required)
- `brand` (relationship → brands, required)
- `listingSummary` (textarea) — shown on product cards
- `shortSummary` (textarea) — used in SEO description
- `overview` (richText, Lexical)
- `heroImage` (upload → media)
- `gallery` (array: `image` upload + `alt` text)
- `keyHighlights` (array: `item` text)
- `applications` (array: `department` text)
- `originCountry` (text)
- `certificationSummary` (textarea)
- `specGroups` (array: `groupTitle` + nested `rows[]` with `label`+`value`)
- `downloadItems` (array: `title`, `type` select, `file` upload, `externalUrl`)
- `supportBlocks` (array: `title` + `body`)
- `faqItems` (array: `question` + `answer`)
- `relatedProducts` (relationship → products, hasMany)
- `status` (select: draft | published, default: published)
- SEO plugin applied

### `brands`
- `name` (text, required, unique)
- `slug` (text, required, unique)
- `countryOfOrigin` (text)
- `summary` (textarea)
- `certificationsText` (richText)
- `logo` (upload → media)
- `website` (text)
- `isFeatured` (checkbox, default: true)

### `client-logos`
- `name` (text, required)
- `logo` (upload → media, required)
- `website` (text)
- `sortOrder` (number, default: 0)

### `partner-logos`
- `name` (text, required)
- `logo` (upload → media, required)
- `website` (text)
- `sortOrder` (number, default: 0)

### `certifications`
- `title` (text, required)
- `issuerOrStandardBody` (text)
- `description` (textarea)
- `appliesToBrands` (relationship → brands, hasMany)
- `appliesToProducts` (relationship → products, hasMany)
- `badgeImage` (upload → media)

### `testimonials`
- `clientName` (text, required)
- `designation` (text)
- `hospital` (text)
- `quote` (textarea, required)
- `avatar` (upload → media)
- `rating` (number, 1-5, default: 5)
- `sortOrder` (number, default: 0)
- `isActive` (checkbox, default: true)

### `faqs`
- `question` (text, required)
- `answer` (textarea, required)
- `category` (select: general | products | order-delivery | support-warranty | technical)
- `sortOrder` (number, default: 0)
- `isActive` (checkbox, default: true)

### `inquiries`
- `fullName`, `role`, `hospital`, `email`, `phone` (all text/email, required)
- `requirements` (textarea)
- `status` (select: new | in-progress | resolved, default: new)
- Access: `read` → admin only, `create` → public

### `orders`
- `orderNumber` (text, required, unique)
- `customer` (group: firstName, lastName, email, phone, address, city)
- `customerName` (text, hidden, auto-computed from customer group via hook)
- `items` (array: `product` relationship, `quantity`, `priceAtPurchase`)
- `totalAmount` (number)
- `paymentMethod` (select: bkash | sslcommerz | cod)
- `paymentStatus` (select: unpaid | paid | failed, default: unpaid)
- `status` (select: pending | processing | shipped | delivered | cancelled)
- `invoiceLink` (text, readOnly, auto-generated via hook: `{siteURL}/invoice/{orderNumber}`)
- `paymentEvidence` (upload → media, sidebar)
- Access: `read/update/delete` → admin only, `create` → public

### `legalPages`
- `title` (text, required)
- `slug` (text, required, unique)
- `pageType` (select: privacy-policy | terms-and-conditions | disclaimer | warranty-refund-policy)
- `content` (richText, Lexical, required)
- SEO plugin applied

---

## 5. Payload Global

### `siteSettings`
- `companyName`, `tagline`, `address`
- `mainPhone`, `secondaryPhone`, `marketingPhone`, `servicePhone`
- `email`, `aboutSummary`, `trustSummary`, `globalSupportText`

---

## 6. Payload Plugins

```ts
seoPlugin({
  collections: ['products', 'categories', 'legalPages'],
  uploadsCollection: 'media',
  generateTitle: ({ doc }) => `Brand Name — ${doc?.title || doc?.name || ''}`,
  generateDescription: ({ doc }) => doc?.shortSummary || doc?.listingSummary || '',
})
```

---

## 7. Custom API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/menus` | GET | Navbar mega-menu: all categories + products (sorted by sortOrder) |
| `/api/public-categories` | GET | Homepage showcase: active categories with product counts + images |
| `/api/public-client-logos` | GET | Client logo marquee |
| `/api/public-partner-logos` | GET | Brand/partner logo marquee |
| `/api/checkout` | POST | Create order in DB, returns orderNumber |
| `/api/submit-evidence` | POST | Upload payment screenshot and attach to order |
| `/api/products` | GET | Payload REST passthrough (used by ProductCarousel) |

All routes use `export const dynamic = 'force-dynamic'` to avoid caching.

---

## 8. Key Frontend Patterns

### Media URL normalisation
All media URLs go through `getMediaUrl(url)` in `src/lib/getMediaUrl.ts`.
- In dev: prepends `http://localhost:12000` if URL starts with `/`
- In prod: uses relative URL as-is (Apache serves from same origin)

### Cart (Zustand)
`src/lib/cartStore.ts` — persisted to `localStorage`:
- `items[]` (id, name, price, discountPrice, heroImage, slug, qty)
- `addItem(product, qty)` — increments if exists
- `removeItem(id)`
- `updateQty(id, qty)`
- `clearCart()`

### Hero Slider
- Auto-advances every **6 seconds**
- Text overlay: **bottom-left corner** (`items-end`, `pb-24`)
- Progress bar animates over 6s
- Pause on hover/touch

### Product Carousel (Homepage Latest Products)
- Fetches `/api/products?limit=60&sort=-createdAt`
- **First row (4 cards)**: auto-shuffles positions every 3s using Framer Motion `layoutId` spring animation
- **First row cards**: pulsing glow border + floating NEW badge (if `markAsNew`)
- **Rows 2-3**: static cards
- **Pagination**: `< Previous / Next >` controls + dot indicators (12 products per page)
- **Mobile**: 2-column grid (`grid-cols-2`)

### Category sortOrder
- Unique validation — duplicate numbers show a red error: *"Sort Order X is already used by 'Category Name'"*
- All category queries use `sort: 'sortOrder'`

### Marquees
- Client logos: `animate-[marquee_15s_linear_infinite]`
- Brand/partner logos: `animate-[marquee_10s_linear_infinite]`
- Both defined as `@keyframes marquee` in `globals.css`

---

## 9. Infrastructure & Deployment

### Local Dev
```
Docker Desktop → PostgreSQL container on port 12001
Next.js dev server on port 12000 (npm run dev)
```

### Production (VPS)
```
GoDaddy VPS — Ubuntu, managed via Plesk
Apache reverse proxy → port 12000
Next.js standalone build: .next/standalone/server.js
Node binary: /opt/plesk/node/22/bin/node
App logs: httpdocs/app.log
```

### Deploy Process (follow `deploy.md`)
1. `git add -A; git status`
2. `git commit -m "message"`
3. `git push origin master`
4. `node tmp/run_vps_cmd.js "cd httpdocs && git reset --hard origin/master && git pull origin master && bash redeploy.sh"`

### `redeploy.sh` Steps
1. `git pull origin master`
2. `npm install --legacy-peer-deps`
3. `npx payload migrate` (DB schema migrations)
4. `npm run build` (Next.js Turbopack build)
5. Copy `.env` → standalone dir
6. `rsync` persistent media → standalone
7. `fuser -k 12000/tcp` (kill old server)
8. `setsid node server.js` (start daemonized on port 12000)

### Media Persistence
Media is stored **outside** the git repo in a persistent directory. On deploy, `redeploy.sh` rsyncs it into `.next/standalone/public/media` so uploaded files survive redeployments.

### DB Sync (Local ← Production)
Run `scripts/sync_from_vps.ps1` to:
1. SSH into VPS and `pg_dump` the live DB
2. Download the dump via SCP
3. Restore into local Docker PostgreSQL on port 12001

---

## 10. next.config.ts Key Settings

```ts
experimental: {
  proxyClientMaxBodySize: "2gb",  // allow large file uploads
  serverActions: true,
}
images: {
  remotePatterns: [{ protocol: 'https', hostname: '**' }]
}
```

---

## 11. VPS Credentials Reference

| Item | Value |
|---|---|
| VPS IP | `97.74.90.189` |
| SSH User | `healingtechnology` |
| App Directory | `/var/www/vhosts/healingtechnology.com.bd/httpdocs/` |
| DB Name | `healingtechnology` |
| DB User | `healingtechnology.co_bgieab3zdtl` |
| App Port | `12000` |
| Branch | `master` |
| GitHub Repo | `https://github.com/ehsanhossain/Healing-Technology` |

---

## 12. Recreating This Architecture — Prompt Template

> Use this as your starting AI prompt:

```
Build a Next.js 16 App Router + Payload CMS 3 B2B product catalog website with:

Tech stack: Next.js 16.2.2, Payload CMS 3.83, PostgreSQL via @payloadcms/db-postgres,
TypeScript, Tailwind CSS v4, Framer Motion 12, Zustand, Lucide React, Sharp.

CMS Collections: users (auth), media (uploads with image/video/PDF support),
categories (with sortOrder unique validation, parent relationship, isActive),
products (with markAsNew badge, gallery array, specGroups nested array, downloadItems,
faqItems, relatedProducts, status draft/published, SEO plugin),
brands (logo, country, featured flag),
client-logos, partner-logos (with sortOrder),
testimonials, faqs, inquiries (public create, admin read),
orders (customer group, items array, paymentMethod, invoiceLink auto-hook),
legalPages (pageType select + Lexical richText).

Global: siteSettings (company info, phones, address).

Plugins: @payloadcms/plugin-seo on products, categories, legalPages.

Pages: homepage, /products (client-side filter with category sidebar + search),
/products/[slug] (detail with tabbed layout: overview, specs, downloads, FAQ, related),
/checkout, /invoice/[orderNumber], /track-order, /contact, /about,
/what-we-do, /after-sales, /clinical-training, /preventive-maintenance,
/submit-evidence, /privacy, /terms, /cookies.

Custom API routes: /api/menus (navbar data), /api/public-categories (homepage),
/api/public-client-logos, /api/public-partner-logos, /api/checkout, /api/submit-evidence.

Homepage sections:
1. HeroSlider — auto-advance 6s, bottom-left text, progress bar, pause on hover
2. Client logos marquee — 15s animation loop
3. Category showcase — animated tabs with product image grids per category
4. Latest Products carousel — first row shuffles positions every 3s (Framer Motion layoutId),
   pagination after 12 products, mobile 2-column grid
5. Brand/partner logos marquee — 10s animation loop
6. YouTube section — featured video player + playlist sidebar (RSS feed via rss2json API)
7. Testimonials section
8. FAQ section

Navbar: sticky mega-menu dropdown showing categories + products with images, search modal,
cart icon with item count badge, WhatsApp contact button.

Cart: Zustand store persisted to localStorage, CartSidebar slide-out panel.

Media: normalise URLs via getMediaUrl() helper for local vs production.
Production: Next.js standalone build on Ubuntu VPS, Apache reverse proxy to port 12000.
Deploy: git push → SSH remote run redeploy.sh (npm install, payload migrate, next build, restart).
```
