import { NextResponse } from "next/server";
import { directusGet, directusAssetUrl } from "@/lib/directus";

export const revalidate = 300;

export async function GET() {
  try {
    const [catRes, prodRes] = await Promise.all([
      directusGet<{ data: any[] }>(
        "/items/categories?fields=id,name,slug,short_description,hero_image&filter[is_active][_eq]=true&sort=sort_order&limit=20",
        300
      ),
      directusGet<{ data: any[] }>(
        "/items/products?fields=id,hero_image,category.id&limit=100&filter[status][_eq]=published",
        300
      ),
    ]);

    const productImagesByCategory: Record<string, string[]> = {};
    const productCountByCategory: Record<string, number> = {};

    for (const p of prodRes.data ?? []) {
      const catId = p.category ? String(p.category.id ?? p.category) : "";
      if (!catId) continue;
      if (!productImagesByCategory[catId]) {
        productImagesByCategory[catId] = [];
        productCountByCategory[catId] = 0;
      }
      productCountByCategory[catId]++;
      if (productImagesByCategory[catId].length < 10 && p.hero_image) {
        const u = directusAssetUrl(p.hero_image);
        if (u) productImagesByCategory[catId].push(u);
      }
    }

    const categories = (catRes.data ?? []).map((c: any) => {
      const catId = String(c.id);
      return {
        id: catId,
        title: c.name,
        slug: c.slug,
        shortDescription: c.short_description ?? "",
        image: c.hero_image ? directusAssetUrl(c.hero_image) : null,
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
