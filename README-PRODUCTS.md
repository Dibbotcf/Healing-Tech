# Product Entry Guide — Healing Technology CMS

This guide explains how to add and manage products in the **Healing Technology** admin panel.

## Accessing the Product Page
1.  Log in to the Admin Panel at [http://localhost:12000/admin](http://localhost:12000/admin).
2.  Click on **Products** in the left sidebar.
3.  Click **Create New** to start adding a product.

---

## Field Descriptions

### 1. Basic Information
*   **Name (Required):** The full name of the product (e.g., *Mindray A7 Anesthesia System*).
*   **Slug (Required):** The URL identifier. This should be lowercase and use hyphens instead of spaces (e.g., `mindray-a7-anesthesia-system`).
*   **Mark as NEW:** Check this box if you want a "NEW" badge to appear on the product image in the website listings.
*   **SKU:** The Stock Keeping Unit or model number for internal tracking.

### 2. Categorization & Branding
*   **Category (Required):** Choose the relevant category (e.g., *OT Solutions*, *ICU Equipment*). You must create categories first if they don't exist.
*   **Brand (Required):** Select the manufacturer (e.g., *Mindray*, *Getinge*).
*   **Origin Country:** The country where the product is manufactured (e.g., *Germany*, *China*).

### 3. Visuals & Marketing
*   **Hero Image:** The primary high-quality image displayed at the top of the product page.
*   **Gallery:** Add multiple additional images to show different angles or components of the product.
*   **Listing Title:** A shorter title used specifically for the catalog/listing view.
*   **Listing Summary:** A 1-2 sentence description for the catalog cards.
*   **Short Summary:** A brief summary displayed next to the product price/inquiry section.

### 4. Detailed Content
*   **Overview:** A rich-text editor for the main product description. You can add bold text, links, and lists here.
*   **Key Highlights:** A list of the top 3-5 selling points or main features.
*   **Applications:** The specific hospital departments where this product is used (e.g., *Operation Theater*, *Intensive Care Unit*).

### 5. Technical Data (Specifications)
*   **Technical Specifications:** This is organized into **Groups**.
    *   *Example Group Title:* "Physical Characteristics"
    *   *Rows:* Label (e.g., "Weight") and Value (e.g., "120kg").
*   **Certifications:** Summary of quality standards like CE, ISO, or FDA approvals.

### 6. Downloads & Support
*   **Downloadable Items:** Add PDF Brochures, User Manuals, or Datasheets. You can upload a file or provide an external link.
*   **Support Blocks:** Specific sections for "After-Sales Support" or "Clinical Training" details.
*   **FAQs:** Common questions and answers specifically related to this product.

### 7. Publishing status
*   **Status:** 
    *   **Draft:** Saved but not visible on the public website.
    *   **Published:** Live and visible to all visitors.

---

## Tips for Best Results
1.  **Images:** Use high-resolution `.jpg` or `.png` images with clear backgrounds.
2.  **SEO:** Ensure the **Listing Summary** contains relevant keywords for better search engine ranking.
3.  **Specs:** Be consistent with units (e.g., always use `mm` or `inch`) to make comparisons easier for users.

---

## Technical Database Schema (PostgreSQL)

For technical users or direct database management, here is the underlying table structure in the **`healing-technology`** database:

### Main Table
*   **`products`**: Contains primary fields like `name`, `slug`, `sku`, `status`, and `overview` (JSONB format).

### Related Data (Arrays)
These are stored in separate tables linked to each product:
*   **`products_gallery`**: Product image gallery files.
*   **`products_key_highlights`**: Main selling points.
*   **`products_applications`**: List of suitable hospital departments.
*   **`products_spec_groups`**: Specification group titles.
*   **`products_spec_groups_rows`**: Individual technical details (Label & Value pairs).
*   **`products_download_items`**: Documentation files (Brochures, Manuals).
*   **`products_faq_items`**: Frequently asked questions.

### Relationships
*   **`products_rels`**: Handles many-to-one links for **Brands** and **Categories**.
*   **`media`**: All uploaded images and PDF files.

---

## Example Data Mapping

Here is how some example products map to the database fields:

### 1. Basic Information & Categorization

This table corresponds to the **Main Table (`products`)** and **`products_rels`** for brands and categories.

| Name | Slug | Category | Brand | Origin Country | Listing Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Luminex-Lumen H700** | `luminex-lumen-h700` | OT Solutions | Luminex-Lumen | China (implied) | LED shadowless operating lamp with double heads and Osram LED chips. |
| **Heyer Purelit OL9500** | `heyer-purelit-ol9500` | OT Solutions | Heyer | Germany | Cost-effective LED surgical light with adjustable color temperature and 70,000h service life. |
| **Heyer OP830** | `heyer-op830` | OT Solutions | Heyer | Germany | Electronic-hydraulic operating table with 297kg load capacity and perfect C-arm access. |
| **Aeon7200 Anesthesia System** | `aeon-7200-anesthesia` | OT Solutions | Aeomed | China (implied) | CE certified anesthesia machine with 8.4" color touch screen and ventilator. |
| **Jinling-850 Advance** | `jinling-850-advance` | OT Solutions | Perlong | China (implied) | Advanced anesthesia machine with 10.4" color TFT display and metallic modular circuit. |
| **Luvar E Series BIPAP** | `luvar-e-series-bipap` | ICU Equipment | Heyer | Germany | Intelligent non-invasive ventilator with BV30ST Pro model and AS-Dry technology. |
| **NeoBip Device** | `neobip-device-ventilator` | ICU Equipment | Aeomed | China (implied) | Non-invasive ventilator with Volume Guarantee Pressure Support (VGPS) mode. |
| **Ecosy630 Infant Warmer** | `ecosy630-infant-warmer` | Neonatal Care | Bng | China (implied) | LED display infant warmer with Servo (Baby) Mode and heating head adjustable angles. |

---

### 2. Technical Specifications (Grouped)

This data maps to **`products_spec_groups`** and **`products_spec_groups_rows`**.

#### OT Lighting Systems

| Product | Group Title | Label | Value |
| :--- | :--- | :--- | :--- |
| **H700 (Double Head)** | Lighting Performance | Illuminance | 50,000 - 160,000 Lux |
| | | Color Temperature | 4,300 ± 500K |
| | | LED Bulbs Qty | 84+84 pcs |
| | | Average life | >60,000 hours |
| **Purelit OL9570** | Technical Specs | Diameter of lights | 700 mm |
| | | Number of LEDs | 160 |
| | | Service Life | ≥70,000 hours |
| | | Color Rendering | 98 Ra |

#### Anesthesia & Ventilation

| Product | Group Title | Label | Value |
| :--- | :--- | :--- | :--- |
| **Aeon7200** | Pneumatic Specs | Gas Supply | 280-600 kPa |
| | | Vaporizer Support | 2 units |
| | Ventilator Specs | Tidal Volume | 20-1,500 ml |
| | | Frequency | 4-100 bpm |
| **Jinling-850** | Ventilation Modes | Supported Modes | IPPV, SIPPV, VCV, PCV, IMV, SIMV, MANUAL |
| | | PEEP Range | 0-20 cmH2O |
| **Luvar E (BV30ST)** | Therapy Modes | Ventilation Modes | CPAP, S, T, ST, VGPS |
| | | IPAP Range | 6-30 hPa |
| | | Noise Level | 28 dB |

---

### 3. Marketing & Content

This corresponds to **`products_key_highlights`** and **`products_applications`**.

| Product | Key Highlights | Applications |
| :--- | :--- | :--- |
| **Heyer OP830** | 1. 304 stainless steel core components<br>2. 300mm longitudinal shifting for C-arm<br>3. Intelligent safety auto-power off | General Surgery, Urology, Orthopedics, Gynecology. |
| **ESU-400** | 1. 7 working modes including Bipolar<br>2. Sine wave working waveform<br>3. Soft Touch high-frequency technology | General Department, Electrosurgery. |
| **HK-400III Syringe Pump** | 1. Automatic syringe identification (2-60ml)<br>2. 12 infusion modes<br>3. 50,000+ history records | Clinical Departments, Intensive Care. |

---

### 4. General Inventory List

For simpler products with less technical data, these can be entered into the **Main Table** with basic categories.

| Category | Product Names Found in Catalog |
| :--- | :--- |
| **Hospital Furniture** | ICU Bed, Hospital Bed (SS/MS), Gynaecological Bed, Waiting Chair, Bedside Locker. |
| **Patient Transfer** | Ambulance Stretcher, Stretcher Trolley, Patient Trolly, Wheelchair. |
| **Clinical Accessories** | Dressing Drum SS, Saline Stand, Surgical Instruments, Mayo's Trolly, Oxygen Flow Meter. |
| **Diagnostics/Lab** | Bio-Chemistry Analyzer, Hematology Analyzer, Ultrasonogram, Microscope, Digital ECG, Defibrillator. |
