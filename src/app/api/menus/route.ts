import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";

// Cache for 2 minutes — mega menu data rarely changes
export const revalidate = 120;

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    const [categoryDocs, productDocs] = await Promise.all([
      payload.find({
        collection: "categories",
        depth: 0,
        limit: 100,
        sort: "sortOrder",
      }),
      payload.find({
        collection: "products",
        depth: 1,
        limit: 60, // reduced from 200 — mega menu shows ~30 at a time
        select: {
          name: true,
          slug: true,
          category: true,
          markAsNew: true,
          heroImage: true,
          gallery: true,
        } as any,
      }),
    ]);

    const categories = categoryDocs.docs.map((c) => ({
      id: String(c.id),
      title: c.title as string,
      slug: c.slug as string,
    }));

    const products = productDocs.docs.map((p) => {
      let catId = "";
      if (p.category) {
        if (typeof p.category === "object" && "id" in p.category) {
          catId = String((p.category as any).id);
        } else {
          catId = String(p.category);
        }
      }

      let imageUrl = "";
      let imageMime = "";
      const heroImg = p.heroImage;
      if (heroImg && typeof heroImg === "object" && "url" in heroImg) {
        imageUrl = getMediaUrl((heroImg as any).url) || "";
        imageMime = (heroImg as any).mimeType || "";
      }
      if (!imageUrl && p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0) {
        for (const g of p.gallery) {
          const gi = g.image;
          if (gi && typeof gi === "object" && "url" in gi) {
            imageUrl = getMediaUrl((gi as any).url) || "";
            imageMime = (gi as any).mimeType || "";
            break;
          }
        }
      }

      return {
        id: String(p.id),
        name: p.name as string,
        slug: p.slug as string,
        category: catId,
        markAsNew: !!p.markAsNew,
        image: imageUrl,
        imageMime,
      };
    });

    const response = NextResponse.json({ categories, products });
    response.headers.set("Cache-Control", "public, s-maxage=120, stale-while-revalidate=300");
    return response;
  } catch (error) {
    console.error("Mega menu API Error:", error);
    return NextResponse.json({ categories: [], products: [] }, { status: 500 });
  }
}
