# Healing Technology - Repository Map

Welcome to the Healing Technology codebase! This project is built using **Next.js (App Router)** for the frontend and **Payload CMS (version 3.0+)** for the integrated headless backend and admin panel.

Here is a map of the repository to help you navigate the codebase.

## 📁 Directory Structure

```text
Healing-Technology/
├── .agent/                 # Antigravity AI workflow files (e.g., deploy scripts)
├── public/                 # Static assets (images, fonts) served directly to the browser
├── src/                    # Main source code directory
│   ├── app/                # Next.js App Router root
│   │   ├── (frontend)/     # Frontend pages (public-facing website)
│   │   ├── (payload)/      # Payload CMS Admin Panel UI
│   │   └── api/            # Custom backend API routes (e.g., checkout, form submissions)
│   │
│   ├── collections/        # Payload CMS Database Schemas (Tables)
│   │   ├── Brands.ts       # Brands collection
│   │   ├── Categories.ts   # Product categories collection
│   │   ├── Certifications.ts # Product certifications
│   │   ├── LegalPages.ts   # Dynamic legal/policy pages
│   │   └── Products.ts     # Main products collection
│   │
│   ├── components/         # Reusable React UI Components (Navbar, Cards, Carousels)
│   ├── data/               # Static JSON data or constants
│   ├── globals/            # Payload CMS Global configurations (e.g., Site Settings)
│   ├── lib/                # Utility functions and helper scripts
│   └── payload.config.ts   # ⚙️ MAIN PAYLOAD CMS CONFIGURATION FILE
│
├── .env.example            # Template for environment variables (copy to .env to run locally)
├── next.config.ts          # Next.js configuration settings
├── package.json            # Project dependencies and NPM scripts
├── seed-products.ts        # Script to seed the database with initial products
└── tailwind.config.js / postcss.config.mjs # Styling configuration (if applicable)
```

## 🚀 Key Technologies
- **Framework:** Next.js (React)
- **CMS / Database ORM:** Payload CMS v3
- **Database:** PostgreSQL (Local & Production)
- **Styling:** CSS Modules / Vanilla CSS / Tailwind (check styling setup in components)
- **Deployment:** Custom VPS (Plesk)

## 🛠️ How to Get Started Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the provided `.env.example` file and rename it to `.env`. Fill in your local PostgreSQL credentials and generate a secret key.

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This command will simultaneously boot up the Next.js frontend (`http://localhost:3000`) and the Payload CMS admin panel (`http://localhost:3000/admin`).
