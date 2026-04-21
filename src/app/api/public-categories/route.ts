import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch categories that are active, depth:2 ensures heroImage is fully populated
    const categoryDocs = await payload.find({
      collection: "categories",
      where: {
        isActive: { equals: true }
      },
      depth: 2,
      sort: "sortOrder",
      limit: 20,
    });

    const categories = await Promise.all(
      categoryDocs.docs.map(async (c: any) => {
        let imageUrl: string | null = null;
        if (c.heroImage && typeof c.heroImage === "object" && c.heroImage.url) {
          imageUrl = getMediaUrl(String(c.heroImage.url));
        }

        // Fetch up to 10 products associated with this category
        const products = await payload.find({
          collection: "products",
          where: {
            category: { equals: c.id },
            status: { equals: "published" },
          },
          depth: 1,
          limit: 10,
        });

        const productImages: string[] = [];
        products.docs.forEach((p: any) => {
          if (p.heroImage && typeof p.heroImage === "object" && p.heroImage.url) {
            productImages.push(getMediaUrl(String(p.heroImage.url)));
          }
        });

        return {
          id: String(c.id),
          title: c.title,
          slug: c.slug,
          shortDescription: c.shortDescription || "",
          image: imageUrl,
          productImages,
          productCount: products.totalDocs,
        };
      })
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
