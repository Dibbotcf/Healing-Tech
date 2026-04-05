
# Healing Technology — Payload CMS Master Build File
## Product Data, Payload Schema, Seeder Structure, and API-Ready Content Pack
## Source Basis
This file is prepared from:
- The uploaded brochure/catalog PDF pages
- The uploaded product/category text
- The uploaded supplier and certification notes
- The uploaded company details and website strategy notes

## Critical Instruction for Anti-Gravity
You must do all of the following yourself:
1. build the Payload CMS collections
2. seed categories, brands, certifications, legal/support blocks, and products
3. write the CMS content fields using the source material below
4. create listing-page summaries and full PDP content
5. transcribe technical tables into structured CMS fields
6. create API-ready slugs and relationships
7. keep the brochure wording for names/spec labels exactly as written where shown
8. do **not** ask the user to write content
9. the user will only upload/replace images

---

# 1. CONTENT GOVERNANCE RULES

## 1.1 Non-negotiable rules
- Product names must match the brochure exactly where shown.
- Specification labels must match the brochure exactly where shown.
- If a value is unclear in OCR, cross-check the brochure page visually before final CMS entry.
- If a certification/origin is not explicitly stated on the brochure page, use the uploaded certification/supplier notes and store that provenance internally.
- Do not invent performance specs that are not present in brochure/source files.
- For products without a technical table in the brochure, store them as catalog products with “no technical table shown in current brochure”.

## 1.2 Page model rule
Every product must have:
- category hierarchy
- listing card content
- dedicated product detail page
- brochure page reference
- structured technical table if available
- origin / certification block
- CTA / inquiry-ready content
- related products

## 1.3 Master category hierarchy pattern
Use this URL/data hierarchy:
- `operation-theatre/surgical-lights/...`
- `operation-theatre/operation-tables/...`
- `operation-theatre/electrosurgical-units/...`
- `icu-anesthesia/anesthesia-machines-ventilators/...`
- `respiratory-care/bipap-cpap/...`
- `infant-care/...`
- `medical-pumps/...`

---

# 2. RECOMMENDED PAYLOAD CMS ARCHITECTURE

## 2.1 Collections
Create these Payload collections:

### `categories`
Fields:
- `title` (text, required)
- `slug` (text, unique, required)
- `parent` (relationship -> categories, optional)
- `shortDescription` (textarea)
- `heroTitle` (text)
- `heroDescription` (richText)
- `sortOrder` (number)
- `isActive` (checkbox, default true)

### `brands`
Fields:
- `name` (text, required, unique)
- `slug` (text, unique, required)
- `countryOfOrigin` (text)
- `summary` (textarea)
- `certificationsText` (richText)
- `logo` (upload)
- `website` (text, optional)
- `isFeatured` (checkbox, default true)

### `certifications`
Fields:
- `title` (text, required)
- `issuerOrStandardBody` (text)
- `description` (textarea)
- `appliesToBrands` (relationship -> brands, hasMany)
- `appliesToProducts` (relationship -> products, hasMany)
- `badgeImage` (upload, optional)

### `products`
Fields:
- `name` (text, required)
- `slug` (text, unique, required)
- `sku` (text, optional)
- `category` (relationship -> categories, required)
- `brand` (relationship -> brands, required)
- `brochurePageRef` (text)
- `listingTitle` (text)
- `listingSummary` (textarea)
- `shortSummary` (textarea)
- `overview` (richText)
- `heroImage` (upload)
- `gallery` (array -> image upload)
- `keyHighlights` (array of text)
- `applications` (array of text)
- `originCountry` (text)
- `certificationSummary` (textarea)
- `downloadItems` (array: title, type, file/url placeholder)
- `specGroups` (array)
  - `groupTitle`
  - `rows` (array)
    - `label`
    - `value`
- `supportBlocks` (array)
  - `title`
  - `body`
- `faqItems` (array)
  - `question`
  - `answer`
- `seoTitle` (text)
- `seoDescription` (textarea)
- `relatedProducts` (relationship -> products, hasMany)
- `status` (select: draft/published)

### `legalPages`
Fields:
- `title`
- `slug`
- `content`
- `pageType` (privacy-policy / terms-and-conditions / disclaimer / warranty-refund-policy)

### `siteSettings`
Fields:
- `companyName`
- `tagline`
- `address`
- `mainPhone`
- `secondaryPhone`
- `marketingPhone`
- `servicePhone`
- `email`
- `aboutSummary`
- `trustSummary`
- `globalSupportText`

### `testimonials` (optional initial)
### `downloads` (optional separate media metadata)
### `faqs` (optional global + per product family)

---

# 3. PAYLOAD JSON / TYPESCRIPT SCHEMA STARTER

> Use this as the implementation base. Anti-Gravity should convert this into working Payload collection files.

```ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'category', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'sku', type: 'text' },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'brand', type: 'relationship', relationTo: 'brands', required: true },
    { name: 'brochurePageRef', type: 'text' },
    { name: 'listingTitle', type: 'text' },
    { name: 'listingSummary', type: 'textarea' },
    { name: 'shortSummary', type: 'textarea' },
    { name: 'overview', type: 'richText' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    {
      name: 'keyHighlights',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'applications',
      type: 'array',
      fields: [{ name: 'department', type: 'text', required: true }],
    },
    { name: 'originCountry', type: 'text' },
    { name: 'certificationSummary', type: 'textarea' },
    {
      name: 'specGroups',
      type: 'array',
      fields: [
        { name: 'groupTitle', type: 'text', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'downloadItems',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: ['brochure', 'datasheet', 'manual', 'certificate', 'warranty-note'],
          required: true,
        },
        { name: 'file', type: 'upload', relationTo: 'media' },
        { name: 'externalUrl', type: 'text' },
      ],
    },
    {
      name: 'supportBlocks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'faqItems',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'relatedProducts', type: 'relationship', relationTo: 'products', hasMany: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: ['draft', 'published'],
    },
  ],
}
```

---

# 4. SEEDER SCRIPT STRUCTURE

## 4.1 Seeder behavior
The seeder must:
1. seed master categories
2. seed brands
3. seed certification records
4. seed 20 products below
5. attach relationships
6. leave media placeholders empty if image not uploaded yet
7. create placeholder download records where brochure/manual/certificate files will be added later

## 4.2 Seeder file structure
Recommended:
- `src/seed/categories.ts`
- `src/seed/brands.ts`
- `src/seed/certifications.ts`
- `src/seed/products.ts`
- `src/seed/index.ts`

## 4.3 Seeder starter
```ts
import payload from 'payload'

export async function seedProducts() {
  const surgicalLights = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'surgical-lights' } },
  })

  const heyer = await payload.find({
    collection: 'brands',
    where: { slug: { equals: 'heyer-medical' } },
  })

  await payload.create({
    collection: 'products',
    data: {
      name: 'Heyer Purelit OL9570',
      slug: 'heyer-purelit-ol9570',
      category: surgicalLights.docs[0].id,
      brand: heyer.docs[0].id,
      brochurePageRef: 'Page 5',
      listingTitle: 'Heyer Purelit OL9570',
      listingSummary: 'LED Surgical Light for high-clarity illumination in modern operating rooms.',
      shortSummary: 'Part of the Heyer Purelit OL9500 series with 700 mm light diameter and 40,000-160,000 Lux illumination at 1 m.',
      originCountry: 'Germany',
      status: 'published',
    },
  })
}
```

---

# 5. API-READY STRUCTURE

## 5.1 Recommended API response shape for product listing
```json
{
  "id": "product_id",
  "name": "Heyer Purelit OL9570",
  "slug": "heyer-purelit-ol9570",
  "category": {
    "title": "Surgical Lights",
    "slug": "surgical-lights",
    "parent": {
      "title": "Operation Theatre",
      "slug": "operation-theatre"
    }
  },
  "brand": {
    "name": "Heyer Medical",
    "slug": "heyer-medical",
    "countryOfOrigin": "Germany"
  },
  "listingTitle": "Heyer Purelit OL9570",
  "listingSummary": "LED Surgical Light for high-clarity illumination in modern operating rooms.",
  "shortSummary": "Part of the Heyer Purelit OL9500 series with 700 mm light diameter and 40,000-160,000 Lux illumination at 1 m.",
  "heroImage": null,
  "keyHighlights": [
    "40,000-160,000 Lux illumination at 1 m",
    "Color rendering Index Ra,R9,R13,R15: 98",
    "Service life of LED bulbs ≥70,000"
  ]
}
```

## 5.2 Recommended API response shape for PDP
```json
{
  "name": "Heyer Purelit OL9570",
  "slug": "heyer-purelit-ol9570",
  "brochurePageRef": "Page 5",
  "overview": "...",
  "applications": ["Operation Theatre", "Surgical Centers"],
  "originCountry": "Germany",
  "certificationSummary": "Brand-level certification: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.",
  "specGroups": [
    {
      "groupTitle": "Specifications",
      "rows": [
        { "label": "Diameter of lights (mm)", "value": "700" },
        { "label": "Illumination at 1m (Lux)", "value": "40,000-160,000" }
      ]
    }
  ],
  "faqItems": [],
  "relatedProducts": []
}
```

---

# 6. MASTER CATEGORY SEED DATA

## 6.1 Top-level categories
1. Operation Theatre
2. ICU & Anesthesia
3. Respiratory Care
4. Infant Care
5. Medical Pumps

## 6.2 Child categories
### Under Operation Theatre
- Surgical Lights
- Operation Tables
- Electrosurgical Units

### Under ICU & Anesthesia
- Anesthesia Machines With Ventilator
- Anesthesia Machine BD SS

### Under Respiratory Care
- BiPAP
- Auto-CPAP
- CPAP / Auto CPAP

### Under Infant Care
- Infant Warmer
- LED Phototherapy Unit

### Under Medical Pumps
- Infusion Pump
- Syringe Pump

---

# 7. BRAND SEED DATA

## 7.1 Heyer Medical
- slug: `heyer-medical`
- countryOfOrigin: Germany
- summary: Medical device manufacturer featured in the brochure across surgical lights, operation tables, BiPAP/CPAP devices, infusion pumps, and syringe pumps.
- certification summary:
  - ISO 13485
  - ISO 9001
  - CE Mark
  - Select devices FDA registered/cleared

## 7.2 Aeomed / Aeonmed
- slug: `aeomed-aeonmed`
- countryOfOrigin: China
- summary: Featured for anesthesia machine with ventilator and respiratory devices.
- certification summary:
  - ISO 13485
  - CE Mark
  - FDA registration/clearance
  - SGS conformity

## 7.3 Perlong Medical Equipment Co., Ltd. / Nanjing Puao Medical Equipment
- slug: `perlong-medical`
- countryOfOrigin: China
- summary: Featured for digital anesthesia with ventilator machine and advanced anesthesia machine with ventilator.
- certification summary:
  - ISO 13485
  - ISO 9001
  - ISO 14000
  - CE Mark
  - FDA Registration
  - CMDC

## 7.4 Zerone
- slug: `zerone`
- countryOfOrigin: South Korea
- summary: Featured for electrosurgical units.
- certification summary:
  - ISO 13485
  - CE Mark
  - KFDA / GMP

## 7.5 Soft Touch
- slug: `soft-touch`
- countryOfOrigin: not explicitly stated in uploaded brochure/support text
- summary: Featured for electrosurgical unit ESU-400.
- certification summary: store only if source-confirmed later; do not fabricate.

## 7.6 Luminex-Lumen
- slug: `luminex-lumen`
- countryOfOrigin: not explicitly stated in uploaded brochure/support text
- summary: Featured for LED shadowless operating lamps.
- note: LED Chip Brand shown as Osram on brochure pages.

## 7.7 HFMED
- slug: `hfmed`
- countryOfOrigin: not explicitly stated in uploaded brochure/support text
- summary: Featured for LED shadowless operating lamp.

## 7.8 Bng Medical
- slug: `bng-medical`
- countryOfOrigin: not explicitly stated in uploaded brochure/support text
- summary: Featured for infant warmer and LED phototherapy unit.

---

# 8. PRODUCT MASTER DATA PACK (20 PRODUCTS)

---

## PRODUCT 01
### Name
Luminex-Lumen H700 / H700 (Double Heads) LED shadowless operating lamp.

### Slug
`luminex-lumen-h700-h700-double-heads-led-shadowless-operating-lamp`

### Category
Operation Theatre / Surgical Lights

### Brand
Luminex-Lumen

### Brochure Page
Page 3

### Listing Summary
Double-head LED shadowless operating lamp with Osram LED chip brand, adjustable color temperature, and illumination range up to 160000Lux.

### Short Summary
Designed for operation theatre use with 84 + 84 pcs LED bulbs, adjustable 4300±500K color temperature, 100—300 mm spot diameter, and ≥1200 mm depth of illumination.

### Overview
The Luminex-Lumen H700 / H700 (Double Heads) LED shadowless operating lamp is positioned in the brochure as a high-illumination OT light solution with dual heads, adjustable brightness, and Osram LED chip brand. Use the product page to emphasize operating-room visibility, clinical consistency, and ergonomic working radius.

### Key Highlights
- LED Bulbs QTY (PCS) : 84 + 84 pcs
- Illuminance (LUX at 1 m) : 50000-160000Lux / 50000-160000Lux
- Color Temperature : 4300±500K (adjustable)
- LED Chip Brand : Osram

### Applications
- Operation Theatre
- Surgical Rooms
- Hospital OT Setup

### Origin Country
Not explicitly stated on brochure page; keep blank or “not explicitly stated in brochure”.  
Internal note: LED Chip Brand Osram -> Germany component brand.

### Certification Summary
Brand-level certification not explicitly shown on brochure page. Do not fabricate. If needed, attach general supplier compliance only when source-confirmed.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| LED Bulbs QTY (PCS) | 84 + 84 pcs |
| Illuminance (LUX at 1 m) | 50000-160000Lux / 50000-160000Lux |
| Color Temperature | 4300±500K (adjustable) |
| Spot Diameter (mm) | 100—300 |
| Depth of illumination (mm) | ≥1200 |
| Luminance control | 1-100 |
| Average life of light bulb (h) | ≥60000 |
| Chrominance Index (CRI) | ≥97% |
| Color Restoration Index RA | ≥97% |
| Head temperature rise (°C) | ≤1 |
| Operating Radius (mm) | ≥2200 |
| Working Radius (mm) | 600—1800 |
| Supply Voltage | 220V±22V 50HZ±1HZ 400VA |
| LED Chip Brand | Osram |

### Listing Card Fields
- badge1: Double Heads
- badge2: Up to 160000Lux
- badge3: Osram LED Chip

### Download Placeholders
- Brochure Page PDF Excerpt
- Technical Datasheet
- Installation/Support Note

---

## PRODUCT 02
### Name
Luminex-Lumen H700 (Single Head) LED shadowless operating lamp.

### Slug
`luminex-lumen-h700-single-head-led-shadowless-operating-lamp`

### Category
Operation Theatre / Surgical Lights

### Brand
Luminex-Lumen

### Brochure Page
Page 3

### Listing Summary
Single-head LED shadowless operating lamp with Osram LED chip brand, adjustable illumination, and long service life.

### Short Summary
Single-head OT lamp with 84 pcs LED bulbs, 50000-160000Lux illumination, 4300±500K adjustable color temperature, and 3-level visibility-supporting physical parameters for surgical use.

### Key Highlights
- LED Bulbs QTY (PCS) : 84 pcs
- Illuminance (LUX at 1 m): 50000-160000Lux
- Average life of light bulb (h) : ≥60000
- LED Chip Brand : Osram

### Applications
- Operation Theatre
- Minor OT
- Procedure Rooms

### Origin Country
Not explicitly stated on brochure page.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| LED Bulbs QTY (PCS) | 84 pcs |
| Illuminance (LUX at 1 m) | 50000-160000Lux |
| Color Temperature | 4300±500K (adjustable) |
| Spot Diameter (mm) | 100—300 |
| Depth of illumination (mm) | ≥1200 |
| Luminance control | 1-100 |
| Average life of light bulb (h) | ≥60000 |
| Chrominance Index (CRI) | ≥97% |
| Color Restoration Index RA | ≥97% |
| Head temperature rise (°C) | ≤1 |
| Operating Radius (mm) | ≥2200 |
| Working Radius (mm) | 600—1800 |
| Supply Voltage | 220V±22V 50HZ±1HZ 200VA |
| LED Chip Brand | Osram |

---

## PRODUCT 03
### Name
Luminex-Lumen L700 / L700 / L500 (Double Heads) LED shadowless operating lamp.

### Slug
`luminex-lumen-l700-l700-l500-double-heads-led-shadowless-operating-lamp`

### Category
Operation Theatre / Surgical Lights

### Brand
Luminex-Lumen

### Brochure Page
Page 4

### Listing Summary
Double-head LED OT light with adjustable brightness digital display, Osram LED chip brand, and 150-350 mm spot diameter.

### Short Summary
A brochure-featured surgical lighting system with 80 + 80 pcs LED bulbs, 50000-160000Lux illumination, and adjustable 4300±500K color temperature.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| LED Bulbs QTY (PCS) | 80 + 80 pcs |
| Illuminance (LUX at 1 m) | 50000-160000Lux / 50000-160000Lux |
| Color Temperature | 4300±500K (adjustable) |
| Spot Diameter (mm) | 150-350 |
| Depth of illumination (mm) | ≥1200 |
| Brightness Adjustment Digital Display | 1-100 |
| Average life of light bulb (h) | ≥60000 Hours |
| Chrominance Index (CRI) | ≥96% |
| Color Restoration Index RA | ≥97% |
| Head temperature rise (°C) | ≤1 |
| Operating Radius (mm) | ≥2200 |
| Best height installation (mm) | 2800mm-3200mm |
| Supply Voltage | 220V±22V 50HZ±1HZ 400VA |
| LED Chip Brand | Osram |

### Applications
- Operation Theatre
- Surgical Suites
- Hospital OT Light Installation

### Origin Country
Not explicitly stated on brochure page.

---

## PRODUCT 04
### Name
HFMED-HF-L84 L84C LED (Double Head) LED shadowless operating lamp.

### Slug
`hfmed-hf-l84-l84c-led-double-head-led-shadowless-operating-lamp`

### Category
Operation Theatre / Surgical Lights

### Brand
HFMED

### Brochure Page
Page 4

### Listing Summary
Double-head LED shadowless operating lamp with up to 160000 Lux, multiple color temperature options, and 80000-hour average life.

### Short Summary
A high-output OT light with 84pcs + 84pcs LED secondary light-emitting tubes, broad application across surgical lighting requirements, and long operating life.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Illuminance | ≥145.000 Lux <160.000 Lux |
| Color Temperature | 3800K±300K;4400K±300K;5000K±3000K |
| Spot Diameter (mm) | 160-200mm |
| Input Power | 90VA |
| LED secondarylight-emitting tube power | 3.2V/3W |
| Number of LED secondarylight-emitting tubes | 84pcs + 84pcs |
| ENDO | ≥10000 Lux |
| GL | ≥12000 Lux |
| Color rendering index(Ra) | 96<Ra≤100 |
| Total irradiance | ≤500W/m² |
| Illumination depth | 20%:Not less than 1070mm. 60%:Not less than 560mm |
| Average life of light bulb (h) | ≥80000 Hours |

### Applications
- Operation Theatre
- Procedure Areas
- Surgical Lighting Setup

### Origin Country
Not explicitly stated on brochure page.

---

## PRODUCT 05
### Name
Heyer Purelit OL9570

### Slug
`heyer-purelit-ol9570`

### Category
Operation Theatre / Surgical Lights

### Brand
Heyer Medical

### Brochure Page
Page 5

### Listing Summary
700 mm LED Surgical Light in the Purelit OL9500 series with 40,000-160,000 Lux illumination at 1 m and color rendering index 98.

### Short Summary
German brand surgical light optimized for clearness, convenience, durability, sterilization, safety, and adaptability in modern digital ORs.

### Overview
Use brochure feature blocks directly in structured format:
- Clearness
- Convenience
- Durability
- Sterilization
- Safety
- Adaptability

### Key Highlights
- Diameter of lights (mm): 700
- Illumination at 1m (Lux): 40,000-160,000
- Color rendering Index Ra,R9,R13,R15: 98
- Number of LED bulbs: 160
- Service life of LED bulbs: ≥70,000

### Origin Country
Germany

### Certification Summary
Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Diameter of lights (mm) | 700 |
| Illumination at 1m (Lux) | 40,000-160,000 |
| Ambient light intensity (Lux) | ≤500 |
| Color temperature (K) | Standard: 4,500 Optional: 3,000-6,000 |
| Light field diameter (D10, mm) | Standard: 360 Optional: 160-360 |
| Color rendering Index Ra,R9,R13,R15 | 98 |
| Number of LED bulbs | 160 |
| Service life of LED bulbs | ≥70,000 |
| Dimming range | 10 level (25%-100%) |
| Minimum mounting height (mm) | 2,800 |

### Feature Blocks
- Clearness: The adjustable color temperature, improved color rendering index, and wide-range light spot ensure a clearer visualization of the surgical field.
- Convenience: The incorporation of an integrated control panel and multifunctional handle facilitates the adjustment of surgical light parameters.
- Durability: The 70,000-hour service life of LEDs proves the cost-effectiveness of Purelit OL9500.
- Sterilization: Optimized shape and antimicrobial coating meet the needs of sterilization management.
- Safety: Modularized circuit management ensures each part works independently, which provides a strong backup for consistent illumination and ensures patients’ safety.
- Adaptability: High-definition video solutions meet the needs of modern digital ORs.

---

## PRODUCT 06
### Name
Heyer Purelit OL9550

### Slug
`heyer-purelit-ol9550`

### Category
Operation Theatre / Surgical Lights

### Brand
Heyer Medical

### Brochure Page
Page 5

### Listing Summary
500 mm LED Surgical Light in the Purelit OL9500 series with 40,000-160,000 Lux illumination at 1 m and 80 LED bulbs.

### Short Summary
A smaller-head configuration in the Purelit OL9500 series with clinical clarity, long service life, and structured digital-OR compatibility.

### Origin Country
Germany

### Certification Summary
Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Diameter of lights (mm) | 500 |
| Illumination at 1m (Lux) | 40,000-160,000 |
| Ambient light intensity (Lux) | ≤500 |
| Color temperature (K) | Standard: 4,500 Optional: 3,000-6,000 |
| Light field diameter (D10, mm) | Standard: 260 Optional: 160-260 |
| Color rendering Index Ra,R9,R13,R15 | 98 |
| Number of LED bulbs | 80 |
| Service life of LED bulbs | ≥70,000 |
| Dimming range | 10 level (25%-100%) |
| Minimum mounting height (mm) | 2,800 |

---

## PRODUCT 07
### Name
Heyer OP830

### Slug
`heyer-op830`

### Category
Operation Theatre / Operation Tables

### Brand
Heyer Medical

### Brochure Page
Page 5

### Listing Summary
A cost-effective eletronic-hydraulic operating table with a safe load of 297kg, meeting the requirements of different surgeries.

### Short Summary
Brochure-featured operating table with perfect C-arm access, ergonomic adjustment, intelligent safety system, and built-in elevator kidney-bridge.

### Origin Country
Germany

### Certification Summary
Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Model | OP830 |
| Table Length (mm) | 2040 |
| Table Width (w/o side rails, mm) | 520 |
| Table Height (w/o pads, mm) | 680-950 |
| Trendelenburg/Reverse | 30°/30° |
| Lateral Tilt(left/right) | 20°/20° |
| Back Plate Up/Down | 75°/30° |
| Head Plate Up/Down (detachable) | 30°/45° |
| Leg Plate Up/Down (detachable) | 5°/90° |
| Leg Plate Split (detachable) | 180° |
| Flex/Reflex | 210°/105° |
| Kidney-bridge Elevator Up (mm) | 136 |
| Longitudinal Shift (mm) | 300 |
| Weight Capacity (kg) | 297 |

### Feature Blocks
- Perfect C-arm Access: 300mm longitudinal shifting capability creates perfect C-arm access.
- Ergonomic Adjustment: Convenient leg plate and head plate positioning ensures one-hand control operation. Imported gas springs guarantee smooth movement and accurate positioning. Wide range of table height adjustment and T-shape base provide comfortable working environment.
- Premium Quality Material: Table frame is specially coated to increase corrosion resistance. 304 stainless steel is used for exposed core components, such as the central column and table base.
- Intelligent safety system: Remote controller panel will power off automatically when there is no operation over 1 minute. Misoperation preventing design guarantees patients’ safety during surgeries.
- Surgical Configuration: One-click flex and reflex positions. Flexible patient positionings with optional accessories are suitable for a wide variety of surgeries.
- Built-in Elevator Kidney-bridge: Built-in kidney-bridge supports kidney and gall bladder surgeries efficiently (Optional X-ray radiolucent).

---

## PRODUCT 08
### Name
Hydraulic Operation Table

### Slug
`hydraulic-operation-table-page-6-top-left`

### Category
Operation Theatre / Operation Tables

### Brand
Unspecified on brochure page

### Brochure Page
Page 6 (top-left product block)

### Listing Summary
Hydraulic operating table supplied for thoracic surgery, abdominal surgery, ophthalmology, otorhinolaryngology, obstetrics and gynecology, urinary surgery and orthopaedics.

### Short Summary
A brochure-listed hydraulic table for multi-specialty surgical positioning.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Table Height Range | 760mm~1010mm |
| Length and width | 2010mm x 480mm |
| Lateral Tilt (left/right) | ≥20° / ≥20° |
| Trengelenburg / Reverse | ≥25° / ≥25° |
| Back Section up/down | ≥80° / ≥10° |
| Head Section up/down | ≥60° / ≥90° |
| Leg Section down | ≥90° |
| Waist board lifting | 120 mm |

### Applications
- Thoracic surgery
- Abdominal surgery
- ophthalmology
- otorhinolaryngology
- obstetrics and gynecology
- urinary surgery
- orthopaedics

---

## PRODUCT 09
### Name
Hydraulic Operation Table

### Slug
`suxin-medical-hydraulic-operation-table`

### Category
Operation Theatre / Operation Tables

### Brand
SUXIN MEDICAL

### Brochure Page
Page 6 (right-side product block)

### Listing Summary
Hydraulic Operation Table by SUXIN MEDICAL supplied for thoracic surgery, abdominal surgery, ophthalmology, otorhinolaryngology, obstetrics and gynecology, urinary surgery and orthopaedics.

### Short Summary
A brochure-listed SUXIN MEDICAL hydraulic operation table with 750mm~1000mm height range and 2100mm x 500mm top dimensions.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Table Height Range | 750mm~1000mm |
| Length and width | 2100mm x 500mm |
| Lateral Tilt (left/right) | ≥20° / ≥20° |
| Trengelenburg / Reverse | ≥20° / ≥20° |
| Back Section up/down | ≥70° / ≥15° |
| Head Section up/down | ≥30° / ≥90° |
| Leg Section down | ≥90° |
| Waist board lifting | 100 mm |

### Applications
- thoracic surgery
- abdominal surgery
- ophthalmology
- otorhinolaryngology
- obstetrics and gynecology
- urinary surgery
- orthopaedics

---

## PRODUCT 10
### Name
Hydraulic Operation Table

### Slug
`kindlustan-hydraulic-operation-table`

### Category
Operation Theatre / Operation Tables

### Brand
Kindlustan

### Brochure Page
Page 6 (bottom-left product block)

### Listing Summary
Hydraulic Operation Table supplied for thoracic surgery, abdominal surgery, ophthalmology, otorhinolaryngology, obstetrics and gynecology, urinary surgery and orthopaedics.

### Short Summary
A brochure-listed hydraulic operation table with 2000mm x 530mm surface size and ≥25° / ≥25° Trengelenburg / Reverse.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Table Height Range | 750mm~1000mm |
| Length and width | 2000mm x 530mm |
| Lateral Tilt (left/right) | ≥20° / ≥20° |
| Trengelenburg / Reverse | ≥25° / ≥25° |
| Back Section up/down | ≥80° / ≥10° |
| Head Section up/down | ≥30° / ≥90° |
| Leg Section down | ≥90° |
| Waist board lifting | 120 mm |

---

## PRODUCT 11
### Name
Aeon7200

### Slug
`aeon7200`

### Category
ICU & Anesthesia / Anesthesia Machines With Ventilator

### Brand
Aeomed / Aeonmed

### Brochure Page
Page 7

### Listing Summary
Anesthesia Machine With Ventilator featuring 8.4“color touch screen, adult/pediatric support, and multiple ventilation modes.

### Short Summary
Brochure-featured anesthesia workstation with AGM support, optional AGSS, dual flow tubes for each gas, and up to 120 min battery backup.

### Origin Country
China

### Certification Summary
Brand-level: ISO 13485, CE Mark, FDA registration/clearance, SGS conformity.

### Feature Blocks
- CE certified meets international safety standards and requirements
- 8.4“color touch screen with navigation knob for easy getting started
- Volume, Pressure and SIMV ventilation modes meet different application of anesthesia
- The built-in patented sensor with maintenance-free prevents moisture condensation, preventing damage and ensuring accurate monitoring
- With 2 tubes for each gas, make it easy to operate during low/mini flow anesthesia
- Anesthetic gas monitoring (AGM) helps doctors conveniently control gas concentration
- Optional AGSS protects the device while reducing air pollution in OR

### Specification Groups
#### Pneumatic Specifications
| Label | Value |
|---|---|
| Gas supply | 280~600kPa (40.6~87.1psi) |
| Flowmeters | Double tube in series |
| O2 | 0~1L/min; 1~10L/min |
| N2O | 0~1L/min; 1~10L/min |
| Gas system | Oxygen supply failure alarm / Oxygen supply failure protection |
| O2 flush | 25~75 L/min |
| Breathing circuit | Closed, Semi-closed, Semi-open |
| Driven mode | Pneumatically driven and electronically controlled |
| Safety valve | ≤10 kPa |
| Operating mode | One key Man. /Vent. Switch |

#### Vaporizer
| Label | Value |
|---|---|
| Vaporizer | Supports 2 vaporizers. |
| Agent type | Halothane, Enflurane, Isoflurane, Sevoflurane |
| Filling type | Pour-fill, Key-fill, Quik-fil® |

#### Ventilator Specifications
| Label | Value |
|---|---|
| Patient type | Adult, Pediatric |
| Ventilation modes | IPPV, PLV, SIMV, Manual,Standby Spont (with apnea backup) |
| TV | 20~1500ml |
| Frequency | 4~100bpm |
| I:E | 4:1~1:8 |
| PEEP | 0~30cmH2O (Optional) |
| Inspiration pause | OFF, 5% ~ 60% |
| Flow trigger | 2L/min-30L/min |
| Pressure trigger | 0~-20 cmH2O |
| Pressure range | 5~70 cmH2O |

#### Electrical Specifications
| Label | Value |
|---|---|
| Mains | AC 100~240V, 50/60Hz |
| Battery | DC 24V, ≥120min |
| Power outlet | 3 on back (1.5A individual) |

#### Monitoring display
| Label | Value |
|---|---|
| Display | 8.4" color touchscreen |
| Pressure | Ppeak, Pplat, Pmean, PEEP |
| Volumes | MV, Vt |
| Gas | O2, CO2, Agent (all optional) |
| Graph display | P-t, F-t waveforms |
| Alarm | High/Low Airway Pressure / High/Low Mnuit Volume / High/Low FiO2 / Power failure / O2 supply failure / Apnea... |
| Alarm time | ≤120 seconds |

---

## PRODUCT 12
### Name
JINLING - 820

### Slug
`jinling-820`

### Category
ICU & Anesthesia / Anesthesia Machines With Ventilator

### Brand
Perlong Medical

### Brochure Page
Page 8

### Listing Summary
Digital Anesthesia With Ventilator Machine with 5.7 inch TFT display, high precision flowmeter, and single PA-I type vaporizer slot.

### Short Summary
Pneumatically driven & electronically controlled anesthesia machine supporting IPPV, SIPPV, VCV, IMV, SIMV, MANUAL, and Standby modes.

### Origin Country
China

### Certification Summary
Brand-level: ISO 13485, ISO 9001, ISO 14000, CE Mark, FDA Registration, CMDC.

### Feature Blocks
- Anesthetic vaporizer mount: 1 Selectatec® compatible slot for Puao Medical's locally assembled self-compensating imported anesthetic vaporizers.
- High precision flowmeter: Built-in 4 tube flowmeter fitted with interlocking O2-N2O supply, O2 guarantees oxygen output never falls below 21%.

### Specifications
| Label | Value |
|---|---|
| Model | JINLING-820 |
| Drive method | Pneumatically driven & electronically controlled, closed, semi-closed and semi-open |
| Display | 5.7 inch TFT display |
| Flowmeter Range | O: 0.1-10L/min / NC: 0.1-10L/min |
| Ventilation Mode | IPPV, SIPPV, VCV, IMV, SIMV, MANUAL, Standby |
| Pressure range | 5-60 hPa |
| Back-up Power Supply | At least 2 - 4 hours. |
| Tidal Volume | Adjustable range: 50-1500ml Display range: 0-2000ml |
| Respiratory Rate | 1-100bpm |
| Inspiratory/Expiratory (I:E) Ratio | 8:1-1:10 (capable of inverse ratio ventilation) |
| PEEP Range | 0-20cmH2O (electronically controlled) |
| Inspiratory Pressure Trigger Range | -10-20cmH2O (electronically controlled) |
| SIMV Rate | 1-20bpm |
| Inspiratory time | 0-25 |
| Inspiratory Plateau | 0-15 second |
| Vaporizer Slots | Single PA-I type slots |

---

## PRODUCT 13
### Name
JINLING-850 Advance

### Slug
`jinling-850-advance`

### Category
ICU & Anesthesia / Anesthesia Machines With Ventilator

### Brand
Perlong Medical

### Brochure Page
Page 9

### Listing Summary
Advanced anesthesia machine with ventilator featuring 10.4 inch TFT display, metallic modular respiratory circuit, and up to 4 hours backup power.

### Short Summary
A brochure-featured advanced model with pressure differential flow sensor, interlocking oxygen-nitrous oxide supply, and double PA-I type slots.

### Origin Country
China

### Certification Summary
Brand-level: ISO 13485, ISO 9001, ISO 14000, CE Mark, FDA Registration, CMDC.

### Feature Blocks
- CE certified meets international safety standards and requirements.
- Anesthesia Ventilator: Built-in 10.4 inch color TFT display, able-display Pressure-Time, Frequency-Time, Pressure-Volume and Frequency-Volume, displayed waveforms can be cycled instantly with a touch of a button
- Standard integrated metallic modular respiratory circuit; completely solves the problem of gas sealing under high temperature disinfection, easy to clean and disinfect.
- High precision five tube flowmeter fitted with interlocking oxygen-nitrous oxide supply, guarantees oxygen output is never lower than 21%.
- Power Failure Support Functions: Automatically converts to backup power mode during AC power outages.
- Equipped with electronic pressure differential flow sensor, imported respiratory control valve, stable and reliable, rapid response time.
- Equipped with advanced international rotating Na-lime tank, easy-operate, requires only one hand, and uses imported PPSU material and temperature resistant to 134°C.

### Specifications
| Label | Value |
|---|---|
| Model | JINLING-850 (Advanced Model) |
| Display | 10.4 inch TFT display |
| Flowmeter Range | O: 0.1-10L/min / NC: 0.1-10L/min / Air: 0.1-10L/min |
| Ventilation Mode | IPPV, SIPPV, VCV, PCV, IMV, SIMV, MANUAL, Standby |
| Back-up Power Supply | At least 4 hours. |
| Tidal Volume | Adjustable range: 20-1500ml / Display range: 0-2000ml |
| Respiratory Rate | 1-100bpm |
| Inspiratory/Expiratory (I:E) Ratio | 8:1-1:10 (capable of inverse ratio ventilation) |
| PEEP Range | 0-20cmH2O (electronically controlled) |
| Inspiratory Pressure Trigger Range | -10-10cmH2O (electronically controlled) |
| SIGH | 1 sigh breath in every 80-120 breaths |
| Inhaled Oxygen Concentration Monitor | 21-100% |
| SIMV Rate | 1-20bpm |
| Inspiratory Plateau | 0-1 second |
| Vaporizer Slots | Double PA-I type slots |

---

## PRODUCT 14
### Name
HT-150S

### Slug
`ht-150s`

### Category
ICU & Anesthesia / Anesthesia Machine BD SS

### Brand
Unspecified model line in brochure

### Brochure Page
Page 10

### Listing Summary
Anesthesia Machine BD SS with Isoflurane / Sevoflurane vaporizer compatibility, Auto N2O Lock System, and high quality stainless steel body.

### Short Summary
Manual anesthesia machine with Bain Circuit use, emergency oxygen support, and Malaysian pressure regulator note on brochure.

### Origin Country
Pressure regulator note on brochure: made in Malaysian.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Model | HT-150S |
| Vaporizers | Isoflurane / Sevoflurane |
| Rotameter | Four Tube rotameters: Oxygen & Nitrous. |
| Flowmeter Range | Oxygen: 0.1-10L/min. / Nitrous: 0.1-10L/min. |
| Safety Feature | Auto N2O Lock System. / Oxygen Failur Alarm System. |
| Ventilation Mode | Manual ( Use Bain Circuit). |
| Oxygen flush | Oxygen Emergency flush valve front panel / Connected to incoming oxygen supply. |
| Pressure Meter | Oxygen and Nitrogen High pressure regulator made in Malaysian. |
| Pressure relief valve | Non-return pressure relief valve minimizes Risk of back flow of gases. |
| Wheel | Four Custer and rubber wheel with Four locked wheels. |
| Emergency Oxygen | Extra flowmeter for Emergency oxygen supply. |
| Body Material | High Quality Stainless steel (SS). |

---

## PRODUCT 15
### Name
HT-145S

### Slug
`ht-145s`

### Category
ICU & Anesthesia / Anesthesia Machine BD SS

### Brand
Unspecified model line in brochure

### Brochure Page
Page 10

### Listing Summary
Anesthesia Machine BD SS with Isoflurane / Sevoflurane vaporizer compatibility, Auto N2O Lock System, and high quality stainless steel body.

### Short Summary
Manual anesthesia machine variant with Korean regulator note and core safety/mechanical configuration matching brochure.

### Origin Country
Pressure regulator note on brochure: made in Korea.

### Specification Group
#### Specifications
| Label | Value |
|---|---|
| Model | HT-145S |
| Vaporizers | Isoflurane / Sevoflurane |
| Rotameter | Four Tube rotameters: Oxygen & Nitrous. |
| Flowmeter Range | Oxygen: 0.1-10L/min. / Nitrous: 0.1-10L/min. |
| Safety Feature | Auto N2O Lock System. / Oxygen Failur Alarm System. |
| Ventilation Mode | Manual ( Use Bain Circuit). |
| Oxygen flush | Oxygen Emergency flush valve front panel / Connected to incoming oxygen supply. |
| Pressure Meter | Oxygen and Nitrogen High pressure regulator made in Korea. |
| Pressure relief valve | Non-return pressure relief valve minimizes Risk of back flow of gases. |
| Wheel | Four Custer and rubber wheel with Four locked wheels. |
| Emergency Oxygen | Extra flowmeter for Emergency oxygen supply. |
| Body Material | High Quality Stainless steel (SS). |

---

## PRODUCT 16
### Name
ESU-400

### Slug
`esu-400`

### Category
Operation Theatre / Electrosurgical Units

### Brand
Soft Touch

### Brochure Page
Page 11

### Listing Summary
Multi-function high frequency electrotome with 7 working modes, 2-way power output and stable performance.

### Short Summary
Electrosurgical Unit suitable for general department with unipolar power 0-400W and bipolar power 0-100W.

### Overview
Use the brochure paragraph on the PDP directly in structured prose:
Electrosurgical Unit is a multi-function high frequency electrotome, with 7 working modes, 2-way power output and stable performance. Unipolar power: 0-400W. Bipolar power: 0-100W, meeting all kinds of surgical needs, suitable for general department.

### Specifications
| Label | Value |
|---|---|
| Mode | Pure cutting / Mixed cutting 1 / Mixed cutting 2 / Standard coagulation / Sparying coagulation / Bipolar 1 / Bipolar 2 |
| Frequency | 500KHz / 500KHz / 500KHz / 500KHz / 500KHz / 500KHz / 500KHz |
| Working waveform | Sine wave / Modulated sine wave / Modulated sine wave / Modulated sine wave / Modulated sine wave / Sine wave / Modulated sine wave |
| Rated output | 400W / 250W / 200W / 100W / 70W / 100W / 70W |
| Rated load | 300Ω / 300Ω / 300Ω / 300Ω / 300Ω / 50Ω / 50Ω |

### Applications
- General department
- General surgery support

---

## PRODUCT 17
### Name
ZEUS-400

### Slug
`zeus-400`

### Category
Operation Theatre / Electrosurgical Units

### Brand
Zerone

### Brochure Page
Page 11

### Listing Summary
Electrosurgical Unit delivering safety flexibility and convenience by powerful and stable technology.

### Short Summary
Brochure-featured electrosurgical unit for General Surgery, Dermatology, Vascular Surgery, Gynecology, ORL/ENT, Pediatric Surgery, Urology, Orthopedics, Oral Surgery, Plastic Surgery, and Endoscopy.

### Origin Country
South Korea

### Certification Summary
Brand-level: ISO 13485, CE Mark, KFDA / GMP.

### Specifications
| Label | Value |
|---|---|
| Main Frequency | 400, 500KHz |
| Power Source | AC120V or AC230V, 50Hz or 60HZ |
| Protection class | Class 1, Type CF |
| Dimension | (WxDxH mm) 330x455x150 |
| Weight | 13.0Kg |
| Pure cutting | 500KHz / 400W / 300Ω |
| Blend-1 | 500KHz / 250W / 300Ω |
| Blend-2 | 500KHz / 200W / 300Ω |
| Blend-3 | 500KHz / 150W / 300Ω |
| Contact coagulation | 500KHz / 120W / 300Ω |
| Splay coagulation | 500KHz / 100W / 300Ω |
| Splay coagulation (second line in brochure table) | 500KHz / 100W / 100Ω |
| Bipolar Cut | 500KHz / 100W / 200Ω |

### Application
- General Surgery
- Dermatology
- Vascular Surgery
- Gynecology
- ORL/ENT
- Pediatric Surgery
- Urology
- Orthopedics
- Oral Surgery
- Plastic Surgery
- Endoscopy

---

## PRODUCT 18
### Name
BV30ST Pro

### Slug
`bv30st-pro`

### Category
Respiratory Care / BiPAP

### Brand
Heyer Medical

### Brochure Page
Page 12

### Listing Summary
BiPAP Luvar E Series device developed in Germany with CPAP, S, T, ST, VGPS modes and therapy data storage via SD card.

### Short Summary
Respiratory support device emphasizing medical-grade calibration standards and accurate intelligent control for every comfortable breath.

### Origin Country
Germany

### Certification Summary
Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.

### Specifications
| Label | Value |
|---|---|
| Product Model | BV30ST Pro |
| Ventilation Modes | CPAP, S, T, ST, VGPS |
| IPAP | 6-30hPa |
| EPAP | 4-25hPa |
| MIN - MAX IPAP | 6-30hPa |
| Target Tidal Volume | 200ml-1500ml |
| Monitoring Parameters | Pressure, Tidal volume, Minute ventilation, Respiratory rate, Leakage |
| AS-Dry Drying Technology | Yes |
| Auto On/Off | Yes (nasal mask only) |
| Ramp Ti | OFF / 0-60 Min / Auto |
| Res. Rate | 10BPM/5-40BPM |
| Ti (sec.) | 2s (Backup frequency)/0.3-45 |
| Ti min / max (sec.) | 0.5-45 / 1-45 |
| Trigger and Cycle | 1-6 |
| Rise Slope | 1-6 |
| Therapy Data Storage | Yes, SD card |

---

## PRODUCT 19
### Name
CPAP-20A Pro

### Slug
`cpap-20a-pro`

### Category
Respiratory Care / Auto-CPAP

### Brand
Heyer Medical

### Brochure Page
Page 12

### Listing Summary
Auto-CPAP Luvar E Series device with 3.5 Inches Color Screen, heated humidification, and therapy data storage up to 5 years.

### Short Summary
Designed for comfortable long-term therapy with leak compensation, AS-Dry technology, and one-click activation.

### Origin Country
Germany

### Certification Summary
Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.

### Specifications
| Label | Value |
|---|---|
| Product Model | CPAP-20A Pro |
| Type | Auto CPAP |
| Working models | CPAP. Auto CPAP |
| Ramp Ti | OFF/0-60min/Auto |
| Expiration pressure release | AS-Elex 1-3 level |
| Auto On/Off | Yes |
| Therapy data recording | Therapy data recording up to 5 years, reading trough screen and PC software |
| AS-Dry technology | 30-min lower speed running of the blower keeps the device and tube dry |
| Alerts | Power down alert, leak alert, alarm clock, filter change alert, and customized alerts |
| Humidification system | Heated humidification, 5 levels to adjust, infrared communication with main device |
| Leaking compensation | Yes |
| Manual Titration | Yes |
| Mask leaking test | Yes |
| Pressure | 4-20cmH2O |
| Screen Size | 3.5 Inches Color Screen |
| Therapy Data Storage | Yes, SD card |

---

## PRODUCT 20
### Name
BF30ST

### Slug
`bf30st`

### Category
Respiratory Care / BiPAP

### Brand
Aeomed / Aeonmed

### Brochure Page
Page 13

### Listing Summary
NeoBip Device Non-Invasive Ventilator with CPAP, S, T, ST, VGPS ventilation modes and 4.3 Inches Color Touchscreen.

### Short Summary
Brochure-featured non-invasive ventilator focused on accurate intelligent control for every comfortable breath.

### Origin Country
China

### Certification Summary
Brand-level: ISO 13485, CE Mark, FDA registration/clearance, SGS conformity.

### Ventilation Modes (brochure)
- CPAP: Continuous Positive Airway Pressure mode, suitable for Obstructive Sleep Apnea.
- S: Spontaneous ventilation mode, suitable for patients with spontaneous respiratory.
- AUTOS: Intelligent regulation of inspiratory pressure to ensure a more smooth and comfortable breath.
- T: Timed mode, suitable for patients without spontaneous respiratory capacity.
- S/T: The machine automatically switches between S and T modes according to patient's respiratory condition.
- VGPS: Volume Guarantee Pressure Support, meets patient's tidal volume requirement with its minimum pressure.

### Specifications
| Label | Value |
|---|---|
| Product Model | BF30ST |
| Ventilation Modes | CPAP, S, T, ST, VGPS |
| IPAP | 6-30hPa |
| EPAP | 4-25hPa |
| MIN - MAX IPAP | 6-30hPa |
| Target Tidal Volume | 200ml-1500ml |
| Monitoring Parameters | Pressure, Tidal volume, Minute ventilation, Respiratory rate, Leakage |
| AS-Dry Drying Technology | Yes |
| Auto On/Off | Yes (nasal mask only) |
| Noise Level | <30 dB |
| Screen Size | 4.3 Inches Color Touchscreen |
| Res. Rate | 10BPM/5-40BPM |
| Ti (sec) | 2s (Backup frequency)/0.3-45 |
| Ti min / max (sec.) | 0.5-45 / 1-45 |
| Trigger and Cycle | 1-6 |
| Rise Slope | 1-6 |
| Therapy Data Storage | Yes, SD card |

---

# 9. ADDITIONAL PRODUCTS TO SEED AFTER FIRST 20
Create as phase-2 products after the first 20:
- CPAP-AS100A
- Ecosy630
- BN300
- HK-100II
- HK-400III
- Surgical Instruments (catalog landing block, not single technical spec product unless internally subdivided)

---

# 10. PHASE-2 SOURCE DATA (FOR NEXT BATCH)

## CPAP-AS100A (Page 13)
| Label | Value |
|---|---|
| Product Model | CPAP-AS100A |
| Type | Auto CPAP |
| Working models | CPAP. Auto CPAP |
| Identification of CSA | Yes |
| Expiration pressure release | AS-Elex 1-3 level |
| Auto On/Off | Yes |
| Therapy data review through screen | P90, AHI, SNI, LEAK9O, CAI, AL Average pressure |
| Therapy data recording | Therapy data recording up to 5 years, reading trough screen and PC software |
| PM2.5/Pollen Filter | Folded PM2.5/Pollen filter(Unfolded area up to 20 cm2) |
| AS-Dry technology | 30-min lower speed running of the blower keeps the device and tube dry |
| Alerts | Power down alert, leak alert, alarm clock, filter change alert, and customized alerts |
| Humidification system | Heated humidification, 5 levels to adjust, infrared communication with main device |
| Leaking compensation | Yes |
| Manual Titration | Yes |
| Mask leaking test | Yes |
| Pressure | 4-20cmH2O |
| Noise | <30dB |
| Therapy Data Storage | Yes, SD card |

## Ecosy630 (Page 14)
| Label | Value |
|---|---|
| Heater capacity | 500W |
| Temperature control | Servo(Baby) Mode/Manual/Preheating mode |
| Skin temperature | Setting range:34.0~38.0°C / Display range:20.0~42.0°C |
| Heater output | Setting range:0~100% (in 5% increments) / Indication range:0~100% (in 1% increments) |
| Timer | APGAR mode/CPR mode switchable / APGAR Beep: 1,5,10 min |
| Display | LED digital display |
| Bed tray | Inclination angle(back and forth):±13° / Mattress surface:500x700x25mm |
| Dimension | 840(L)*1100(W)*1790(H)mm |

## BN300 (Page 14)
| Label | Value |
|---|---|
| Voltage | 100V-240V |
| Frequency | 50 Hz /60Hz |
| Light Source | 16 Blue Super LED |
| Examination Light | 4 White LED |
| Screen Type | 3.5inch LCD TFT Color Touch screen |
| irradiance ratio | >0.4 |
| Light Intensity in level I | 57 μw/cm2/nm at distance 35cm |
| Level II is around 60% of level I | 49 μw/cm2/nm at distance 40cm |
| Level III is around 30% of level I | 36 μw/cm2/nm at distance 50cm |
| Effective Irradiation Area | 50*30 cm |
| Wavelength Range | 400-550nm (440-460nm peak) |
| Treatment Life-time of the Lamps | 50,000 Hours |
| Treatment Timer, counter Type | 0-999h treatment timer and 48h Down-Counter |
| Noise Level | <30dB |
| Adjustable irradiance intensity | I, II and III |
| Head Rotation | 360° in all directions |

## HK-100II (Page 20)
Brochure points:
- Alarm management: With audible and visual alarm, caregivers can easily locate the alarm and warning.
- Long-lasting battery: the battery life is long-lasting enough to last up to 5 hours.
- High sensitive sensor guarantees the safe infusion by assist in detecting the risk and danger of air bubble and occlusion.
- Anti-bolus helps prevent over-dose upon release of occlusion.

## HK-400III (Page 20)
Brochure points:
- Compact and light weight design allow easy moving and transferring.
- Automatically identifies various syringe types and sizes from 2 ml to 60 ml.
- Numeric and graphic pressure indicator helps caregivers identify occlusion in advance to prevent potential risks.
- 12 infusion modes fully meet the needs from various clinical departmentsand special drugs.
- More than 50000 history records.
- Ingress protection by IP44.

---

# 11. PDP TEMPLATE RULES FOR ANTI-GRAVITY

For all 20 products, build a reusable page template with this order:

1. breadcrumb
2. product hero
   - category path
   - brand
   - exact brochure product name
   - short summary
   - origin / certifications
   - inquiry CTA
3. quick highlights
4. technical specification table
5. application block
6. downloads block
7. support block
8. related products
9. FAQ

## Listing page fields
Each product listing card must show:
- image
- exact product name
- brand
- category
- 1-line listing summary
- 2-3 highlight pills
- “View Details” CTA
- optional “Request a Quote” CTA

---

# 12. REQUIRED GENERIC SUPPORT COPY

## Installation & Support block
Use this standardized support copy across products:
Healing Technology provides expert installation, product guidance, and dependable after-sales support for supplied medical equipment. For procurement, technical consultation, installation coordination, or service-related inquiries, route users to the inquiry / quotation flow and support contact channels.

## Inquiry block
Use this standardized CTA copy:
Request product details, availability, quotation, installation support, and technical consultation from Healing Technology.

## Download placeholder labels
- Brochure
- Technical Datasheet
- User Manual
- Certification Document
- Warranty / Service Note

---

# 13. COMPANY SETTINGS TO SEED

| Field | Value |
|---|---|
| companyName | Healing Technology |
| tagline | Your Trusted Business Partner |
| address | Ansari Bhaban (Ground Floor), 14/2 Topkhana Road, Paltan, West Side of BMA Bhaban, Dhaka-1000. |
| mainPhone | 01675 292991 |
| secondaryPhone | 01898 876700 |
| marketingPhone | 01898 876709 |
| servicePhone | 01898 876703 |
| email | heal.tech36@gmail.com |

---

# 14. IMPLEMENTATION CHECKLIST FOR ANTI-GRAVITY

## Must complete now
- [ ] create Payload collections
- [ ] seed master categories
- [ ] seed brands
- [ ] seed certifications
- [ ] seed first 20 products
- [ ] build listing pages
- [ ] build reusable PDP template
- [ ] attach table data exactly as above
- [ ] create media placeholders
- [ ] set slugs
- [ ] set related products

## Must not do
- [ ] do not ask user to write any product copy
- [ ] do not leave empty listing summaries
- [ ] do not put specs only inside image assets
- [ ] do not rename brochure product names casually
- [ ] do not fabricate certifications per product if not source-backed

---

# 15. FINAL EXECUTION INSTRUCTION

You are responsible for the complete CMS-content layer.
The user should only need to:
1. upload final product images / replace placeholders
2. review
3. publish

Everything else — schema, seed content, tables, listing summaries, PDP content, API shape, and system structure — must be handled by you.
