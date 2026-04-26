import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";

export const dynamic = 'force-dynamic';

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
      depth: 2,
      limit: 1000,
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

      // Extract hero image URL — include video files too, just track mimeType
      let imageUrl = "";
      let imageMime = "";
      const heroImg = p.heroImage;
      if (heroImg && typeof heroImg === "object" && "url" in heroImg) {
        imageUrl = getMediaUrl((heroImg as any).url) || "";
        imageMime = (heroImg as any).mimeType || "";
      }
      // If heroImage is completely missing, try gallery for first image
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

    return NextResponse.json({ categories, products });
  } catch (error) {
    console.error("Mega menu API Error:", error);
    return NextResponse.json({ categories: [], products: [] }, { status: 500 });
  }
}
