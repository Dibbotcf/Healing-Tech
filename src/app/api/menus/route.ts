import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";

export async function GET() {
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
      title: c.title,
      slug: c.slug,
    }));

    const products = productDocs.docs.map((p) => ({
      id: String(p.id),
      name: p.name,
      slug: p.slug,
      category: String(typeof p.category === "string" ? p.category : p.category?.id),
    }));

    return NextResponse.json({ categories, products });
  } catch (error) {
    console.error("Mega menu API Error:", error);
    return NextResponse.json({ categories: [], products: [] }, { status: 500 });
  }
}
