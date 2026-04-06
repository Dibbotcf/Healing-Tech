import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import catalog from "@/data/masterCatalog.json";

export async function GET() {
  const payload = await getPayload({ config: configPromise });

  try {
    // 1. Wipe Existing Data
    payload.logger.info("Wiping existing data...");
    const collections = [
      "products",
      "categories",
      "brands",
      "certifications",
      "users",
      "legalPages",
    ] as const;
    for (const slug of collections) {
      await payload.delete({
        collection: slug,
        where: { id: { exists: true } },
      });
    }

    // 2. Create Admin User
    payload.logger.info("Creating admin users...");
    await payload.create({
      collection: "users",
      data: {
        email: "3hsanhossain@gmail.com",
        password: "HealingTechnology2025!",
      },
    });

    // 3. Seed Categories
    payload.logger.info("Seeding categories...");
    // Top-Level
    const otCategory = await payload.create({
      collection: "categories",
      data: { title: "Operation Theatre", slug: "operation-theatre" },
    });
    const icuCategory = await payload.create({
      collection: "categories",
      data: { title: "ICU & Anesthesia", slug: "icu-anesthesia" },
    });
    const respiratoryCategory = await payload.create({
      collection: "categories",
      data: { title: "Respiratory Care", slug: "respiratory-care" },
    });
    const infantCategory = await payload.create({
      collection: "categories",
      data: { title: "Infant Care", slug: "infant-care" },
    });
    const pumpsCategory = await payload.create({
      collection: "categories",
      data: { title: "Medical Pumps", slug: "medical-pumps" },
    });

    // Second-Level
    const surgicalLights = await payload.create({
      collection: "categories",
      data: {
        title: "Surgical Lights",
        slug: "surgical-lights",
        parent: otCategory.id,
      },
    });
    const otTables = await payload.create({
      collection: "categories",
      data: {
        title: "Operation Tables",
        slug: "operation-tables",
        parent: otCategory.id,
      },
    });
    const esu = await payload.create({
      collection: "categories",
      data: {
        title: "Electrosurgical Units",
        slug: "electrosurgical-units",
        parent: otCategory.id,
      },
    });

    const anesthesiaMachines = await payload.create({
      collection: "categories",
      data: {
        title: "Anesthesia Machines With Ventilator",
        slug: "anesthesia-machines-ventilators",
        parent: icuCategory.id,
      },
    });

    const categoriesMap: Record<string, string> = {
      "Operation Theatre / Surgical Lights": surgicalLights.id as string,
      "Operation Theatre / Operation Tables": otTables.id as string,
      "Operation Theatre / Electrosurgical Units": esu.id as string,
      "ICU & Anesthesia / Anesthesia Machines With Ventilator": anesthesiaMachines.id as string,
      "Operation Theatre": otCategory.id as string,
      "ICU & Anesthesia": icuCategory.id as string,
      "Respiratory Care": respiratoryCategory.id as string,
      "Infant Care": infantCategory.id as string,
      "Medical Pumps": pumpsCategory.id as string,
    };

    // 4. Seed Brands
    payload.logger.info("Seeding brands...");
    const heyer = await payload.create({
      collection: "brands",
      data: {
        name: "Heyer Medical",
        slug: "heyer-medical",
        countryOfOrigin: "Germany",
      },
    });
    const aeomed = await payload.create({
      collection: "brands",
      data: { name: "Aeomed", slug: "aeomed-aeonmed", countryOfOrigin: "China" },
    });
    const perlong = await payload.create({
      collection: "brands",
      data: {
        name: "Perlong Medical",
        slug: "perlong-medical",
        countryOfOrigin: "China",
      },
    });
    const zerone = await payload.create({
      collection: "brands",
      data: {
        name: "Zerone",
        slug: "zerone",
        countryOfOrigin: "South Korea",
      },
    });
    const luminex = await payload.create({
      collection: "brands",
      data: { name: "Luminex-Lumen", slug: "luminex-lumen" },
    });
    const hfmed = await payload.create({
      collection: "brands",
      data: { name: "HFMED", slug: "hfmed" },
    });
    const softTouch = await payload.create({
      collection: "brands",
      data: { name: "Soft Touch", slug: "soft-touch" },
    });
    const bng = await payload.create({
      collection: "brands",
      data: { name: "Bng Medical", slug: "bng-medical" },
    });

    const brandsMap: Record<string, string> = {
      "Heyer Medical": heyer.id as string,
      "Aeomed": aeomed.id as string,
      "Perlong Medical": perlong.id as string,
      "Zerone": zerone.id as string,
      "Luminex-Lumen": luminex.id as string,
      "HFMED": hfmed.id as string,
      "Soft Touch": softTouch.id as string,
      "Bng Medical": bng.id as string,
    };

    // 5. Seed Real Products from catalog
    payload.logger.info(`Seeding ${catalog.length} products...`);
    for (const item of catalog as any[]) {
      // Find category ID or fallback to general otCategory
      let categoryId = otCategory.id;
      if (item.category) {
        if (categoriesMap[item.category]) categoryId = categoriesMap[item.category];
        else {
          // fuzzy match
          const match = Object.keys(categoriesMap).find((k) =>
            item.category.includes(k.split(" / ").pop())
          );
          if (match) categoryId = categoriesMap[match];
        }
      }

      // Find brand ID or fallback
      let brandId = heyer.id; // fallback
      if (item.brand) {
        if (brandsMap[item.brand]) brandId = brandsMap[item.brand];
        else {
          // fuzzy
          const match = Object.keys(brandsMap).find((k) =>
            item.brand.includes(k) || k.includes(item.brand)
          );
          if (match) brandId = brandsMap[match];
        }
      }

      await payload.create({
        collection: "products",
        data: {
          name: item.name || "Unknown Product",
          slug: item.slug || item.name.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, ""),
          category: categoryId,
          brand: brandId,
          listingSummary: item.listingSummary || "",
          shortSummary: item.shortSummary || "",
          status: "published",
        },
      });
    }

    payload.logger.info("Database seeded successfully!");
    return NextResponse.json({
      success: true,
      message: `Database seeded successfully with ${catalog.length} real products.`,
    });
  } catch (error: any) {
    payload.logger.error(`Seeding failed: ${error.message}`);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
