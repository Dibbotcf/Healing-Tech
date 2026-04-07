import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";

const PRODUCTS = [
  {
    name: "Luminex-Lumen H700 / H700 (Double Heads) LED Shadowless Operating Lamp",
    slug: "luminex-lumen-h700-double-heads",
    catKey: "surgical-lights",
    brandKey: "luminex-lumen",
    listingSummary: "Double-head LED shadowless operating lamp with Osram LED chip brand, adjustable color temperature, and illumination range up to 160,000 Lux.",
    shortSummary: "Designed for operation theatre use with 84 + 84 pcs LED bulbs, adjustable 4300±500K color temperature, 100–300 mm spot diameter, and ≥1200 mm depth of illumination.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "LED Bulbs QTY (PCS)", value: "84 + 84 pcs" },
      { label: "Illuminance (LUX at 1 m)", value: "50,000–160,000 Lux / 50,000–160,000 Lux" },
      { label: "Color Temperature", value: "4300±500K (adjustable)" },
      { label: "Spot Diameter (mm)", value: "100–300" },
      { label: "Depth of illumination (mm)", value: "≥1200" },
      { label: "Average life of light bulb (h)", value: "≥60,000" },
      { label: "Chrominance Index (CRI)", value: "≥97%" },
      { label: "LED Chip Brand", value: "Osram" },
    ]}],
    keyHighlights: ["84 + 84 pcs LED Bulbs", "Up to 160,000 Lux", "Osram LED Chip", "4300±500K Adjustable Color Temperature"],
  },
  {
    name: "Luminex-Lumen H700 (Single Head) LED Shadowless Operating Lamp",
    slug: "luminex-lumen-h700-single-head",
    catKey: "surgical-lights",
    brandKey: "luminex-lumen",
    listingSummary: "Single-head LED shadowless operating lamp with Osram LED chip brand, adjustable illumination, and long service life.",
    shortSummary: "Single-head OT lamp with 84 pcs LED bulbs, 50,000–160,000 Lux illumination, and 4300±500K adjustable colour temperature.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "LED Bulbs QTY (PCS)", value: "84 pcs" },
      { label: "Illuminance (LUX at 1 m)", value: "50,000–160,000 Lux" },
      { label: "Color Temperature", value: "4300±500K (adjustable)" },
      { label: "Average life of light bulb (h)", value: "≥60,000" },
      { label: "LED Chip Brand", value: "Osram" },
    ]}],
    keyHighlights: ["84 pcs LED Bulbs", "Up to 160,000 Lux", "Osram LED Chip"],
  },
  {
    name: "Luminex-Lumen L700 / L700 / L500 (Double Heads) LED Shadowless Operating Lamp",
    slug: "luminex-lumen-l700-double-heads",
    catKey: "surgical-lights",
    brandKey: "luminex-lumen",
    listingSummary: "Double-head LED OT light with adjustable brightness digital display, Osram LED chip brand, and 150–350 mm spot diameter.",
    shortSummary: "A brochure-featured surgical lighting system with 80 + 80 pcs LED bulbs, 50,000–160,000 Lux illumination, and adjustable 4300±500K color temperature.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "LED Bulbs QTY (PCS)", value: "80 + 80 pcs" },
      { label: "Illuminance (LUX at 1 m)", value: "50,000–160,000 Lux" },
      { label: "Spot Diameter (mm)", value: "150–350" },
      { label: "Average life of light bulb (h)", value: "≥60,000 Hours" },
      { label: "LED Chip Brand", value: "Osram" },
    ]}],
    keyHighlights: ["80 + 80 pcs LED Bulbs", "Up to 160,000 Lux", "150–350 mm Spot Diameter"],
  },
  {
    name: "HFMED-HF-L84 L84C LED (Double Head) LED Shadowless Operating Lamp",
    slug: "hfmed-hf-l84-double-head",
    catKey: "surgical-lights",
    brandKey: "hfmed",
    listingSummary: "Double-head LED shadowless operating lamp with up to 160,000 Lux, multiple colour temperature options, and 80,000-hour average life.",
    shortSummary: "A high-output OT light with 84 pcs + 84 pcs LED secondary light-emitting tubes, broad application across surgical lighting requirements.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Illuminance", value: "≥145,000 Lux < 160,000 Lux" },
      { label: "Color Temperature", value: "3800K±300K; 4400K±300K; 5000K±3000K" },
      { label: "Spot Diameter (mm)", value: "160–200 mm" },
      { label: "Number of LED tubes", value: "84 pcs + 84 pcs" },
      { label: "Average life of light bulb (h)", value: "≥80,000 Hours" },
    ]}],
    keyHighlights: ["≥145,000 Lux Output", "≥80,000 h Average Life", "84 + 84 pcs LED Tubes"],
  },
  {
    name: "Heyer Purelit OL9570",
    slug: "heyer-purelit-ol9570",
    catKey: "surgical-lights",
    brandKey: "heyer-medical",
    listingSummary: "700 mm LED Surgical Light in the Purelit OL9500 series with 40,000–160,000 Lux illumination at 1 m and colour rendering index 98.",
    shortSummary: "German-engineered surgical light with high CRI, 70,000 h LED life, antimicrobial coating, and modularised circuit for patient safety.",
    originCountry: "Germany",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Diameter of lights (mm)", value: "700" },
      { label: "Illumination at 1m (Lux)", value: "40,000–160,000" },
      { label: "Color temperature (K)", value: "Standard: 4,500 Optional: 3,000–6,000" },
      { label: "Color rendering Index Ra,R9,R13,R15", value: "98" },
      { label: "Number of LED bulbs", value: "160" },
      { label: "Service life of LED bulbs", value: "≥70,000" },
    ]}],
    keyHighlights: ["700 mm Diameter", "40,000–160,000 Lux", "CRI 98", "≥70,000 h LED Life"],
  },
  {
    name: "Heyer Purelit OL9550",
    slug: "heyer-purelit-ol9550",
    catKey: "surgical-lights",
    brandKey: "heyer-medical",
    listingSummary: "500 mm LED Surgical Light in the Purelit OL9500 series with 40,000–160,000 Lux illumination at 1 m and 80 LED bulbs.",
    shortSummary: "Smaller-head configuration in the Purelit OL9500 series with clinical clarity, long service life, and digital-OR compatibility.",
    originCountry: "Germany",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Diameter of lights (mm)", value: "500" },
      { label: "Illumination at 1m (Lux)", value: "40,000–160,000" },
      { label: "Color rendering Index Ra,R9,R13,R15", value: "98" },
      { label: "Number of LED bulbs", value: "80" },
      { label: "Service life of LED bulbs", value: "≥70,000" },
    ]}],
    keyHighlights: ["500 mm Diameter", "40,000–160,000 Lux", "CRI 98", "80 LED Bulbs"],
  },
  {
    name: "Heyer OP830",
    slug: "heyer-op830",
    catKey: "operation-tables",
    brandKey: "heyer-medical",
    listingSummary: "Cost-effective electro-hydraulic operating table with safe load of 297 kg, perfect C-arm access, and built-in elevator kidney-bridge.",
    shortSummary: "Brochure-featured operating table with intelligent safety system, ergonomic adjustment, and premium 304 stainless steel core components.",
    originCountry: "Germany",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Model", value: "OP830" },
      { label: "Table Height (mm)", value: "680–950" },
      { label: "Trendelenburg/Reverse", value: "30°/30°" },
      { label: "Lateral Tilt (left/right)", value: "20°/20°" },
      { label: "Weight Capacity (kg)", value: "297" },
      { label: "Longitudinal Shift (mm)", value: "300" },
    ]}],
    keyHighlights: ["297 kg Weight Capacity", "300 mm C-arm Shift", "Built-in Kidney-Bridge", "Intelligent Safety System"],
  },
  {
    name: "Hydraulic Operation Table",
    slug: "hydraulic-operation-table-standard",
    catKey: "operation-tables",
    brandKey: "heyer-medical",
    listingSummary: "Hydraulic operating table for thoracic, abdominal, ophthalmology, gynaecology, urinary, and orthopaedic surgeries.",
    shortSummary: "Multi-specialty brochure-listed hydraulic table with 760–1010 mm height range and flexible positioning.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Table Height Range", value: "760 mm–1010 mm" },
      { label: "Length and Width", value: "2010 mm × 480 mm" },
      { label: "Lateral Tilt (left/right)", value: "≥20°/≥20°" },
      { label: "Trendelenburg / Reverse", value: "≥25°/≥25°" },
    ]}],
    keyHighlights: ["Multi-Specialty Configuration", "760–1010 mm Height Range", "Flexible Positioning"],
  },
  {
    name: "SUXIN MEDICAL Hydraulic Operation Table",
    slug: "suxin-hydraulic-operation-table",
    catKey: "operation-tables",
    brandKey: "heyer-medical",
    listingSummary: "SUXIN MEDICAL hydraulic operation table for thoracic, abdominal, gynaecological, urinary and orthopaedic surgeries.",
    shortSummary: "750–1000 mm height range, 2100 mm × 500 mm top, with full surgical positioning capabilities.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Table Height Range", value: "750 mm–1000 mm" },
      { label: "Length and Width", value: "2100 mm × 500 mm" },
      { label: "Lateral Tilt (left/right)", value: "≥20°/≥20°" },
    ]}],
    keyHighlights: ["750–1000 mm Height Range", "2100 × 500 mm Table", "Full Surgical Positioning"],
  },
  {
    name: "Kindlustan Hydraulic Operation Table",
    slug: "kindlustan-hydraulic-operation-table",
    catKey: "operation-tables",
    brandKey: "heyer-medical",
    listingSummary: "Hydraulic operation table for thoracic, abdominal, ophthalmology, gynaecological, urinary and orthopaedic surgeries.",
    shortSummary: "2000 mm × 530 mm surface with ≥25°/≥25° Trendelenburg/Reverse support.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Table Height Range", value: "750 mm–1000 mm" },
      { label: "Length and Width", value: "2000 mm × 530 mm" },
      { label: "Trengelenburg / Reverse", value: "≥25°/≥25°" },
    ]}],
    keyHighlights: ["2000 × 530 mm Table", "≥25° Trendelenburg", "Multi-Specialty Configuration"],
  },
  {
    name: "Aeon7200",
    slug: "aeon7200",
    catKey: "anesthesia-machines-ventilators",
    brandKey: "aeomed",
    listingSummary: "Anesthesia Machine With Ventilator featuring 8.4\" colour touch screen, adult/pediatric support, and multiple ventilation modes.",
    shortSummary: "Brochure-featured anesthesia workstation with AGM support, optional AGSS, dual flow tubes for each gas, and up to 120 min battery backup.",
    originCountry: "China",
    certificationSummary: "Brand-level: ISO 13485, CE Mark, FDA registration/clearance, SGS conformity.",
    specGroups: [
      { groupTitle: "Pneumatic Specifications", rows: [
        { label: "Gas supply", value: "280–600 kPa (40.6–87.1 psi)" },
        { label: "O2 flush", value: "25–75 L/min" },
        { label: "Breathing circuit", value: "Closed, Semi-closed, Semi-open" },
      ]},
      { groupTitle: "Ventilator Specifications", rows: [
        { label: "Patient type", value: "Adult, Pediatric" },
        { label: "Ventilation modes", value: "IPPV, PLV, SIMV, Manual, Standby Spont" },
        { label: "TV", value: "20–1500 ml" },
        { label: "Frequency", value: "4–100 bpm" },
        { label: "Battery backup", value: "≥120 min" },
      ]},
    ],
    keyHighlights: ["8.4\" Touch Screen", "Adult & Pediatric Modes", "≥120 min Battery Backup", "AGM Support"],
  },
  {
    name: "JINLING-820",
    slug: "jinling-820",
    catKey: "anesthesia-machines-ventilators",
    brandKey: "perlong-medical",
    listingSummary: "Digital Anesthesia With Ventilator Machine with 5.7 inch TFT display, high precision flowmeter, and single PA-I type vaporizer slot.",
    shortSummary: "Pneumatically driven & electronically controlled anesthesia machine supporting IPPV, SIPPV, VCV, IMV, SIMV, MANUAL, and Standby modes.",
    originCountry: "China",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, ISO 14000, CE Mark, FDA Registration, CMDC.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Model", value: "JINLING-820" },
      { label: "Display", value: "5.7 inch TFT display" },
      { label: "Ventilation Mode", value: "IPPV, SIPPV, VCV, IMV, SIMV, MANUAL, Standby" },
      { label: "Back-up Power Supply", value: "At least 2–4 hours" },
      { label: "Tidal Volume", value: "50–1500 ml" },
    ]}],
    keyHighlights: ["5.7\" TFT Display", "7 Ventilation Modes", "2–4 h Backup Power", "High Precision Flowmeter"],
  },
  {
    name: "JINLING-850 Advance",
    slug: "jinling-850-advance",
    catKey: "anesthesia-machines-ventilators",
    brandKey: "perlong-medical",
    listingSummary: "Advanced anesthesia machine with ventilator featuring 10.4 inch TFT display, metallic modular respiratory circuit, and up to 4 hours backup power.",
    shortSummary: "Advanced model with pressure differential flow sensor, interlocking oxygen-nitrous oxide supply, and double PA-I type slots.",
    originCountry: "China",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, ISO 14000, CE Mark, FDA Registration, CMDC.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Model", value: "JINLING-850 (Advanced Model)" },
      { label: "Display", value: "10.4 inch TFT display" },
      { label: "Ventilation Mode", value: "IPPV, SIPPV, VCV, PCV, IMV, SIMV, MANUAL, Standby" },
      { label: "Back-up Power Supply", value: "At least 4 hours" },
      { label: "Tidal Volume", value: "20–1500 ml" },
    ]}],
    keyHighlights: ["10.4\" TFT Display", "8 Ventilation Modes", "4 h Backup Power", "Metallic Modular Circuit"],
  },
  {
    name: "HT-150S",
    slug: "ht-150s",
    catKey: "anesthesia-machines-ventilators",
    brandKey: "heyer-medical",
    listingSummary: "Anesthesia Machine BD SS with Isoflurane / Sevoflurane vaporizer compatibility, Auto N2O Lock System, and high quality stainless steel body.",
    shortSummary: "Manual anesthesia machine with Bain Circuit use, emergency oxygen support, and high-quality SS construction.",
    originCountry: "Malaysia (Pressure regulator)",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Model", value: "HT-150S" },
      { label: "Vaporizers", value: "Isoflurane / Sevoflurane" },
      { label: "Safety Feature", value: "Auto N2O Lock System / Oxygen Failure Alarm System" },
      { label: "Body Material", value: "High Quality Stainless Steel (SS)" },
    ]}],
    keyHighlights: ["Auto N2O Lock System", "Emergency Oxygen Supply", "Stainless Steel Body", "Isoflurane/Sevoflurane Compatible"],
  },
  {
    name: "HT-145S",
    slug: "ht-145s",
    catKey: "anesthesia-machines-ventilators",
    brandKey: "heyer-medical",
    listingSummary: "Anesthesia Machine BD SS with Isoflurane / Sevoflurane vaporizer compatibility, Auto N2O Lock System, and high quality stainless steel body.",
    shortSummary: "Manual anesthesia machine variant with Korean pressure regulator and core safety configuration matching brochure.",
    originCountry: "Korea (Pressure regulator)",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Model", value: "HT-145S" },
      { label: "Vaporizers", value: "Isoflurane / Sevoflurane" },
      { label: "Safety Feature", value: "Auto N2O Lock System / Oxygen Failure Alarm System" },
      { label: "Body Material", value: "High Quality Stainless Steel (SS)" },
    ]}],
    keyHighlights: ["Auto N2O Lock System", "Korean Pressure Regulator", "Stainless Steel Body"],
  },
  {
    name: "ESU-400",
    slug: "esu-400",
    catKey: "electrosurgical-units",
    brandKey: "soft-touch",
    listingSummary: "Multi-function high frequency electrotome with 7 working modes, 2-way power output, and stable performance.",
    shortSummary: "Electrosurgical Unit suitable for general department with unipolar power 0–400 W and bipolar power 0–100 W.",
    originCountry: "",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Modes", value: "Pure cutting / Mixed cutting 1 / Mixed cutting 2 / Standard coagulation / Spraying coagulation / Bipolar 1 / Bipolar 2" },
      { label: "Unipolar Power", value: "0–400 W" },
      { label: "Bipolar Power", value: "0–100 W" },
      { label: "Frequency", value: "500 KHz" },
    ]}],
    keyHighlights: ["7 Working Modes", "0–400 W Unipolar", "0–100 W Bipolar"],
  },
  {
    name: "ZEUS-400",
    slug: "zeus-400",
    catKey: "electrosurgical-units",
    brandKey: "zerone",
    listingSummary: "Electrosurgical Unit delivering safety, flexibility and convenience by powerful and stable technology.",
    shortSummary: "Brochure-featured ESU for General Surgery, Dermatology, Vascular Surgery, Gynaecology, ORL/ENT and more.",
    originCountry: "South Korea",
    certificationSummary: "Brand-level: ISO 13485, CE Mark, KFDA / GMP.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Main Frequency", value: "400, 500 KHz" },
      { label: "Power Source", value: "AC 120 V or AC 230 V, 50 Hz or 60 Hz" },
      { label: "Pure cutting", value: "500 KHz / 400 W / 300 Ω" },
      { label: "Weight", value: "13.0 Kg" },
    ]}],
    keyHighlights: ["400/500 KHz Frequency", "400 W Pure Cutting", "11 Surgical Specialties", "CE & KFDA Certified"],
  },
  {
    name: "BV30ST Pro",
    slug: "bv30st-pro",
    catKey: "respiratory-care",
    brandKey: "heyer-medical",
    listingSummary: "BiPAP Luvar E Series device developed in Germany with CPAP, S, T, ST, VGPS modes and therapy data storage via SD card.",
    shortSummary: "Respiratory support device with medical-grade calibration, accurate intelligent control, and AS-Dry drying technology.",
    originCountry: "Germany",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Product Model", value: "BV30ST Pro" },
      { label: "Ventilation Modes", value: "CPAP, S, T, ST, VGPS" },
      { label: "IPAP", value: "6–30 hPa" },
      { label: "EPAP", value: "4–25 hPa" },
      { label: "Therapy Data Storage", value: "Yes, SD card" },
    ]}],
    keyHighlights: ["German Engineering", "CPAP/S/T/ST/VGPS Modes", "AS-Dry Technology", "SD Card Data Storage"],
  },
  {
    name: "CPAP-20A Pro",
    slug: "cpap-20a-pro",
    catKey: "respiratory-care",
    brandKey: "heyer-medical",
    listingSummary: "Auto-CPAP Luvar E Series device with 3.5 Inches Colour Screen, heated humidification, and therapy data storage up to 5 years.",
    shortSummary: "Designed for comfortable long-term therapy with leak compensation, AS-Dry technology, and one-click activation.",
    originCountry: "Germany",
    certificationSummary: "Brand-level: ISO 13485, ISO 9001, CE Mark; select devices FDA registered/cleared.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Product Model", value: "CPAP-20A Pro" },
      { label: "Type", value: "Auto CPAP" },
      { label: "Pressure", value: "4–20 cmH2O" },
      { label: "Screen Size", value: "3.5 Inches Colour Screen" },
      { label: "Therapy Data Storage", value: "Up to 5 years, SD card" },
      { label: "Humidification", value: "Heated, 5 levels" },
    ]}],
    keyHighlights: ["Auto CPAP Mode", "5-Year Data Storage", "Heated Humidification", "AS-Dry Technology"],
  },
  {
    name: "BF30ST",
    slug: "bf30st",
    catKey: "respiratory-care",
    brandKey: "aeomed",
    listingSummary: "NeoBip Non-Invasive Ventilator with CPAP, S, T, ST, VGPS ventilation modes and 4.3 Inches Colour Touchscreen.",
    shortSummary: "Brochure-featured non-invasive ventilator focused on accurate intelligent control for every comfortable breath.",
    originCountry: "China",
    certificationSummary: "Brand-level: ISO 13485, CE Mark, FDA registration/clearance, SGS conformity.",
    specGroups: [{ groupTitle: "Specifications", rows: [
      { label: "Product Model", value: "BF30ST" },
      { label: "Ventilation Modes", value: "CPAP, S, T, ST, VGPS" },
      { label: "IPAP", value: "6–30 hPa" },
      { label: "EPAP", value: "4–25 hPa" },
      { label: "Screen Size", value: "4.3 Inches Colour Touchscreen" },
      { label: "Noise Level", value: "< 30 dB" },
    ]}],
    keyHighlights: ["4.3\" Touchscreen", "6 Ventilation Modes", "< 30 dB Noise Level", "CE & FDA Certified"],
  },
];

export async function GET() {
  const payload = await getPayload({ config: configPromise });

  try {
    payload.logger.info("Wiping existing data...");
    const toWipe = ["products", "categories", "brands", "users", "legalPages", "testimonials", "faqs"] as const;
    for (const c of toWipe) {
      try {
        await payload.delete({ collection: c, where: { id: { exists: true } } });
      } catch (_) {
        // Table may not exist yet — skip silently
      }
    }

    payload.logger.info("Creating admin user...");
    try {
      await payload.create({
        collection: "users",
        data: { email: "3hsanhossain@gmail.com", password: "3hsanhossain@gmail.com" },
      });
    } catch (_) {
      payload.logger.info("Admin user already exists — updating password...");
      await payload.update({
        collection: "users",
        where: { email: { equals: "3hsanhossain@gmail.com" } },
        data: { password: "3hsanhossain@gmail.com" }
      });
    }

    payload.logger.info("Seeding categories...");
    const otCat       = await payload.create({ collection: "categories", data: { title: "Operation Theatre",         slug: "operation-theatre" } });
    const icuCat      = await payload.create({ collection: "categories", data: { title: "ICU & Anesthesia",          slug: "icu-anesthesia" } });
    const respCat     = await payload.create({ collection: "categories", data: { title: "Respiratory Care",          slug: "respiratory-care" } });
    const infantCat   = await payload.create({ collection: "categories", data: { title: "Infant Care",               slug: "infant-care" } });
    const pumpsCat    = await payload.create({ collection: "categories", data: { title: "Medical Pumps",             slug: "medical-pumps" } });

    const surgCat     = await payload.create({ collection: "categories", data: { title: "Surgical Lights",                    slug: "surgical-lights",                parent: otCat.id } });
    const tablesCat   = await payload.create({ collection: "categories", data: { title: "Operation Tables",                   slug: "operation-tables",               parent: otCat.id } });
    const esuCat      = await payload.create({ collection: "categories", data: { title: "Electrosurgical Units",              slug: "electrosurgical-units",          parent: otCat.id } });
    const anesCat     = await payload.create({ collection: "categories", data: { title: "Anesthesia Machines With Ventilator",slug: "anesthesia-machines-ventilators",parent: icuCat.id } });

    const catMap: Record<string, string> = {
      "surgical-lights":                  String(surgCat.id),
      "operation-tables":                 String(tablesCat.id),
      "electrosurgical-units":            String(esuCat.id),
      "anesthesia-machines-ventilators":  String(anesCat.id),
      "respiratory-care":                 String(respCat.id),
      "infant-care":                      String(infantCat.id),
      "medical-pumps":                    String(pumpsCat.id),
    };

    payload.logger.info("Seeding brands...");
    const heyer    = await payload.create({ collection: "brands", data: { name: "Heyer Medical",    slug: "heyer-medical",    countryOfOrigin: "Germany",     isFeatured: true } });
    const aeomed   = await payload.create({ collection: "brands", data: { name: "Aeomed",            slug: "aeomed",           countryOfOrigin: "China",       isFeatured: true } });
    const perlong  = await payload.create({ collection: "brands", data: { name: "Perlong Medical",   slug: "perlong-medical",  countryOfOrigin: "China",       isFeatured: true } });
    const zerone   = await payload.create({ collection: "brands", data: { name: "Zerone",            slug: "zerone",           countryOfOrigin: "South Korea", isFeatured: true } });
    const luminex  = await payload.create({ collection: "brands", data: { name: "Luminex-Lumen",     slug: "luminex-lumen",                                    isFeatured: true } });
    const hfmed    = await payload.create({ collection: "brands", data: { name: "HFMED",             slug: "hfmed",                                             isFeatured: false } });
    const softTouch= await payload.create({ collection: "brands", data: { name: "Soft Touch",        slug: "soft-touch",                                        isFeatured: false } });

    const brandMap: Record<string, string> = {
      "heyer-medical":  String(heyer.id),
      "aeomed":         String(aeomed.id),
      "perlong-medical":String(perlong.id),
      "zerone":         String(zerone.id),
      "luminex-lumen":  String(luminex.id),
      "hfmed":          String(hfmed.id),
      "soft-touch":     String(softTouch.id),
    };

    payload.logger.info(`Seeding ${PRODUCTS.length} products from master catalog...`);
    let seededCount = 0;
    for (const p of PRODUCTS) {
      try {
        const catId   = catMap[p.catKey]   ?? String(otCat.id);
        const brandId = brandMap[p.brandKey] ?? String(heyer.id);
        payload.logger.info(`  Creating: ${p.slug} (cat: ${catId}, brand: ${brandId})`);
        await payload.create({
          collection: "products",
          data: {
            name: p.name,
            slug: p.slug,
            category: Number(catId),
            brand: Number(brandId),
            listingSummary: p.listingSummary,
            shortSummary: p.shortSummary,
            originCountry: p.originCountry || "",
            certificationSummary: (p as any).certificationSummary || "",
            keyHighlights: (p.keyHighlights || []).map((item) => ({ item })),
            specGroups: (p.specGroups || []).map((g) => ({
              groupTitle: g.groupTitle,
              rows: g.rows.map((r) => ({ label: r.label, value: r.value })),
            })),
            status: "published",
            markAsNew: seededCount < 2, // Highlight the first two as new
          },
        });
        seededCount++;
      } catch (productErr: any) {
        payload.logger.error(`  FAILED ${p.slug}: ${productErr.message}`);
      }
    }

    /* ── Seed Testimonials ── */
    payload.logger.info("Seeding testimonials...");
    const testimonials = [
      {
        clientName: "Dr. Mohammad Rahman",
        designation: "Head of Surgery",
        hospital: "Dhaka Medical College Hospital",
        quote: "Healing Technology has been our trusted partner for OT equipment for over 3 years. Their LED surgical lights have transformed our operating theatres—the illumination quality is outstanding and the after-sales support is exceptional.",
        rating: 5,
        sortOrder: 1,
        isActive: true,
      },
      {
        clientName: "Prof. Nasreen Akter",
        designation: "Director",
        hospital: "National Institute of Cardiovascular Diseases",
        quote: "We procured anesthesia machines with ventilators from Healing Technology for our cardiac ICU. The equipment reliability during critical surgeries has been remarkable. Their 24/7 engineering support gives us complete confidence.",
        rating: 5,
        sortOrder: 2,
        isActive: true,
      },
      {
        clientName: "Dr. Shahidul Islam",
        designation: "CEO",
        hospital: "Evercare Hospital Dhaka",
        quote: "As a premium private hospital, we demand nothing but the best. Healing Technology delivers world-class medical equipment backed by genuine German and Korean engineering. Their electrosurgical units are a game changer for our surgical department.",
        rating: 5,
        sortOrder: 3,
        isActive: true,
      },
      {
        clientName: "Dr. Fatema Begum",
        designation: "Head of Neonatology",
        hospital: "Bangabandhu Sheikh Mujib Medical University",
        quote: "The infant care equipment we received from Healing Technology meets international standards. Their team provided hands-on training for our staff, ensuring seamless adoption of the new incubators and phototherapy units.",
        rating: 5,
        sortOrder: 4,
        isActive: true,
      },
      {
        clientName: "Md. Kamal Hossain",
        designation: "Procurement Director",
        hospital: "Square Hospitals Ltd.",
        quote: "Healing Technology stands out in Bangladesh for their transparent procurement process, competitive pricing, and commitment to genuine certified equipment. They are our go-to partner for all surgical and ICU equipment needs.",
        rating: 4,
        sortOrder: 5,
        isActive: true,
      },
    ];
    for (const t of testimonials) {
      try {
        await payload.create({ collection: "testimonials", data: t });
      } catch (e: any) {
        payload.logger.error(`  FAILED testimonial ${t.clientName}: ${e.message}`);
      }
    }

    /* ── Seed FAQs ── */
    payload.logger.info("Seeding FAQs...");
    const faqs = [
      {
        question: "What types of medical equipment does Healing Technology supply?",
        answer: "We supply a comprehensive range of clinical equipment including surgical lights (LED shadowless lamps), operation tables, anesthesia machines with ventilators, electrosurgical units, patient monitors, infusion and syringe pumps, infant care equipment (incubators, phototherapy), and respiratory care solutions (CPAP, BiPAP, ventilators).",
        category: "general",
        sortOrder: 1,
        isActive: true,
      },
      {
        question: "Are the products internationally certified?",
        answer: "Yes. All our products carry relevant international certifications including CE marking, ISO 13485, and FDA approvals where applicable. We import exclusively from certified manufacturers in Germany, South Korea, China, and other leading medical equipment manufacturing countries.",
        category: "products",
        sortOrder: 2,
        isActive: true,
      },
      {
        question: "Do you provide after-sales service and warranty?",
        answer: "Absolutely. We provide comprehensive after-sales support including 24/7 engineering hotline, preventive maintenance schedules, spare parts supply, and warranty coverage ranging from 1 to 3 years depending on the product. Our in-house biomedical engineering team is always ready to assist.",
        category: "support-warranty",
        sortOrder: 3,
        isActive: true,
      },
      {
        question: "How can I request a quotation for equipment?",
        answer: "You can request a quotation through our Contact page, by calling our sales team directly, or by emailing us at info@healingtechnology.com.bd. Our team will respond within 24 hours with a detailed quotation including specifications, pricing, and delivery timeline.",
        category: "order-delivery",
        sortOrder: 4,
        isActive: true,
      },
      {
        question: "Do you offer equipment installation and staff training?",
        answer: "Yes. Every equipment purchase includes professional installation by our certified biomedical engineers and comprehensive operator training for your hospital staff. We also provide user manuals and video guides for ongoing reference.",
        category: "support-warranty",
        sortOrder: 5,
        isActive: true,
      },
      {
        question: "What is the typical delivery timeline?",
        answer: "For in-stock items, delivery typically takes 3-7 business days within Bangladesh. For import orders, the timeline is usually 4-8 weeks depending on the manufacturer and shipping route. We keep many popular models in our local warehouse for faster delivery.",
        category: "order-delivery",
        sortOrder: 6,
        isActive: true,
      },
      {
        question: "Can I visit a showroom or see equipment demonstrations?",
        answer: "Yes! We welcome hospital procurement teams and medical professionals to visit our showroom in Dhaka for hands-on demonstrations. Please contact us to schedule a visit. We can also arrange on-site demonstrations at your hospital.",
        category: "general",
        sortOrder: 7,
        isActive: true,
      },
      {
        question: "Do you support government hospital tenders?",
        answer: "Yes. We regularly participate in government hospital tenders and have a dedicated team to handle public procurement processes. We are registered with relevant government bodies and can provide all necessary documentation for tender submissions.",
        category: "general",
        sortOrder: 8,
        isActive: true,
      },
    ];
    for (const f of faqs) {
      try {
        await payload.create({ collection: "faqs", data: f });
      } catch (e: any) {
        payload.logger.error(`  FAILED FAQ: ${e.message}`);
      }
    }

    payload.logger.info("Database seeded successfully!");
    return NextResponse.json({
      success: true,
      message: `Seeded ${seededCount}/${PRODUCTS.length} products, ${testimonials.length} testimonials, ${faqs.length} FAQs.`
    });
  } catch (err: any) {
    payload.logger.error(err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
