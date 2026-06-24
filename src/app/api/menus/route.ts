import { NextResponse } from "next/server";
import { directusGet, directusAssetUrl } from "@/lib/directus";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [catRes, prodRes] = await Promise.all([
      directusGet<{ data: any[] }>("/items/categories?fields=id,name,slug&sort=sort_order&limit=100", 0),
      directusGet<{ data: any[] }>(
        "/items/products?fields=id,name,slug,category.id,mark_as_new,hero_image,gallery&limit=60&filter[status][_eq]=published",
        0
      ),
    ]);

    const categories = (catRes.data ?? []).map((c: any) => ({
      id: String(c.id),
      title: c.name as string,
      slug: c.slug as string,
    }));

    const products = (prodRes.data ?? []).map((p: any) => {
      const catId = p.category ? String(p.category.id ?? p.category) : "";
      let imageUrl = "";
      if (p.hero_image) imageUrl = directusAssetUrl(p.hero_image) ?? "";
      if (!imageUrl && Array.isArray(p.gallery) && p.gallery.length > 0) {
        const firstImg = p.gallery[0]?.image;
        if (firstImg) imageUrl = directusAssetUrl(firstImg) ?? "";
      }
      return {
        id: String(p.id),
        name: p.name as string,
        slug: p.slug as string,
        category: catId,
        markAsNew: !!p.mark_as_new,
        image: imageUrl,
        imageMime: "",
      };
    });

    const response = NextResponse.json({ categories, products });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (err) {
    console.error("Menus API error:", err);
    return NextResponse.json({ categories: [], products: [] }, { status: 500 });
  }
}
