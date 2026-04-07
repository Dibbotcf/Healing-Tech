import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    const categoryDocs = await payload.find({
      collection: "categories",
      depth: 0,
      limit: 100,
    });

    // depth: 2 so product.category and product.heroImage are populated
    const productDocs = await payload.find({
      collection: "products",
      depth: 2,
      limit: 1000,
      where: { status: { equals: "published" } },
    });

    const categories = categoryDocs.docs.map((c) => ({
      id: String(c.id),
      title: c.title as string,
      slug: c.slug as string,
    }));

    const products = productDocs.docs.map((p) => {
      // category can be a populated object or a string/number id
      let catId = "";
      if (p.category) {
        if (typeof p.category === "object" && "id" in p.category) {
          catId = String((p.category as any).id);
        } else {
          catId = String(p.category);
        }
      }

      // Extract hero image URL if available
      let imageUrl = "";
      if (p.heroImage && typeof p.heroImage === "object" && "url" in p.heroImage) {
        imageUrl = (p.heroImage as any).url || "";
      }

      return {
        id: String(p.id),
        name: p.name as string,
        slug: p.slug as string,
        category: catId,
        markAsNew: !!p.markAsNew,
        image: imageUrl,
      };
    });

    return NextResponse.json({ categories, products });
  } catch (error) {
    console.error("Mega menu API Error:", error);
    return NextResponse.json({ categories: [], products: [] }, { status: 500 });
  }
}
