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

      // Extract hero image URL if available (fallback to first gallery image)
      let imageUrl = "";
      if (p.heroImage && typeof p.heroImage === "object" && "url" in p.heroImage) {
        imageUrl = getMediaUrl((p.heroImage as any).url) || "";
      } else if (p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0) {
        const firstGalleryImg = p.gallery[0].image;
        if (firstGalleryImg && typeof firstGalleryImg === "object" && "url" in firstGalleryImg) {
          imageUrl = getMediaUrl((firstGalleryImg as any).url) || "";
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
