import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";

// Cache for 5 minutes — category showcase rarely changes
export const revalidate = 300;

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch categories + a single batch of products in parallel
    const [categoryDocs, productDocs] = await Promise.all([
      payload.find({
        collection: "categories",
        where: { isActive: { equals: true } },
        depth: 1, // depth:1 is enough — we only need heroImage.url
        sort: "sortOrder",
        limit: 20,
      }),
      payload.find({
        collection: "products",
        depth: 1,
        limit: 100, // one batch covers all categories
        select: {
          heroImage: true,
          category: true,
        } as any,
      }),
    ]);

    // Build a map: categoryId → product images
    const productImagesByCategory: Record<string, string[]> = {};
    const productCountByCategory: Record<string, number> = {};

    for (const p of productDocs.docs as any[]) {
      const catId =
        p.category && typeof p.category === "object"
          ? String(p.category.id)
          : String(p.category ?? "");
      if (!catId) continue;

      if (!productImagesByCategory[catId]) {
        productImagesByCategory[catId] = [];
        productCountByCategory[catId] = 0;
      }
      productCountByCategory[catId]++;

      if (
        productImagesByCategory[catId].length < 10 &&
        p.heroImage &&
        typeof p.heroImage === "object" &&
        p.heroImage.url
      ) {
        const u = getMediaUrl(p.heroImage.url);
        if (u) productImagesByCategory[catId].push(u);
      }
    }

    const categories = categoryDocs.docs.map((c: any) => {
      let imageUrl: string | null = null;
      if (c.heroImage && typeof c.heroImage === "object" && c.heroImage.url) {
        imageUrl = getMediaUrl(String(c.heroImage.url));
      }

      const catId = String(c.id);
      return {
        id: catId,
        title: c.title,
        slug: c.slug,
        shortDescription: c.shortDescription || "",
        image: imageUrl,
        productImages: productImagesByCategory[catId] ?? [],
        productCount: productCountByCategory[catId] ?? 0,
      };
    });

    const res = NextResponse.json(categories);
    res.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res;
  } catch (error) {
    console.error("Categories API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
