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

      // Extract hero image URL — skip video files, use first real image
      let imageUrl = "";
      const heroImg = p.heroImage;
      if (heroImg && typeof heroImg === "object" && "url" in heroImg) {
        const mime = (heroImg as any).mimeType || "";
        if (!mime.startsWith("video/")) {
          imageUrl = getMediaUrl((heroImg as any).url) || "";
        }
      }
      // If heroImage was a video (or missing), try gallery for first image
      if (!imageUrl && p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0) {
        for (const g of p.gallery) {
          const gi = g.image;
          if (gi && typeof gi === "object" && "url" in gi) {
            const mime = (gi as any).mimeType || "";
            if (!mime.startsWith("video/")) {
              imageUrl = getMediaUrl((gi as any).url) || "";
              break;
            }
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
      };
    });

    return NextResponse.json({ categories, products });
  } catch (error) {
    console.error("Mega menu API Error:", error);
    return NextResponse.json({ categories: [], products: [] }, { status: 500 });
  }
}
