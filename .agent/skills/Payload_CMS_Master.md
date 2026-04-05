---
name: Payload CMS Master
description: Specialized knowledge for managing Payload CMS 3.0 on Next.js with PostgreSQL for the Healing Technology website.
---

# Payload CMS Master Skill

This skill outlines the strict workflow and standard for developing backend and database functionality using Payload CMS 3.0 in the Next.js App Router environment.

## 1. Database & State Rule
- **Primary Database**: PostgreSQL exclusively.
- Ensure all Payload Collections are strictly typed.
- Never use MongoDB logic or standard Mongoose fields.

## 2. Directory Structure Convention
Payload logic should exist cleanly integrated within Next.js:
- `/src/payload/collections` (for all data models like Products, Media)
- `/src/payload/globals` (for site-wide settings like Header, Footer, SEO config)
- `payload.config.ts` handles the initialization.

## 3. SEO Standard
- All collections must include an SEO grouping field.
- Utilize the `@payloadcms/plugin-seo` for seamless meta configuration.

## 4. Sub-domain Admin Mount
- Payload Admin page should be mapped to the `/admin` route or handled on `cms.healingtechnology.com.bd` via Next.js Middleware redirects.

When assigned a CMS task, strictly use these constraints to ensure robust, enterprise-grade Next.js delivery.
