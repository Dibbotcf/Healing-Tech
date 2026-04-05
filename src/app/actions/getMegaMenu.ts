"use server";

import { getPayload } from "payload";
import configPromise from "@/payload.config";

export async function getMegaMenuData() {
  try {
    const payload = await getPayload({ config: configPromise });

    const categoryDocs = await payload.find({
      collection: "categories",
      depth: 0,
      limit: 100,
    });

    const productDocs = await payload.find({
      collection: "products",
      depth: 0,
      limit: 1000,
      where: {
        status: { equals: "published" },
      },
    });

    const categories = categoryDocs.docs.map((c) => ({
      id: String(c.id),
      title: c.title as string,
      slug: c.slug as string,
    }));

    const products = productDocs.docs.map((p) => ({
      id: String(p.id),
      name: p.name as string,
      slug: p.slug as string,
      category: String(
        typeof p.category === "string" ? p.category : p.category?.id
      ),
    }));

    return { categories, products };
  } catch (error) {
    console.error("Mega menu Server Action Error:", error);
    return { categories: [], products: [] };
  }
}
