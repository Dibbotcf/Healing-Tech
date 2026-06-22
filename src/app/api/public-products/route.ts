import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { directusGet, directusAssetThumb } from "@/lib/directus";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit    = Math.min(Number(searchParams.get("limit") ?? 12), 48);
    const page     = Math.max(Number(searchParams.get("page")  ?? 1), 1);
    const sort     = searchParams.get("sort") ?? "-id";
    const category = searchParams.get("category") ?? "";
    const featured = searchParams.get("featured") === "true";

    const offset = (page - 1) * limit;
    const fields = "id,name,slug,listing_summary,mark_as_new,price,discount_price,hero_image,date_updated,category.id,category.name,category.slug,brand.id,brand.name";

    let filterStr = "&filter[status][_eq]=published";
    if (category) filterStr += `&filter[category][slug][_eq]=${encodeURIComponent(category)}`;
    if (featured) filterStr += `&filter[featured][_eq]=true`;

    const [itemsRes, countRes] = await Promise.all([
      directusGet<{ data: any[] }>(
        `/items/products?fields=${fields}&limit=${limit}&offset=${offset}&sort=${sort}${filterStr}`,
        0
      ),
      directusGet<{ data: any[] }>(
        `/items/products?fields=id&limit=-1${filterStr}`,
        0
      ),
    ]);

    const totalDocs = countRes.data.length;
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = (itemsRes.data ?? []).map((p: any) => ({
      id: String(p.id),
      name: p.name,
      slug: p.slug,
      listingSummary: p.listing_summary ?? "",
      markAsNew: !!p.mark_as_new,
      price: p.price ?? null,
      discountPrice: p.discount_price ?? null,
      heroImage: p.hero_image ? { url: directusAssetThumb(p.hero_image, 500, 82, p.date_updated)!, mimeType: "" } : null,

      category: p.category ? { title: p.category.name, slug: p.category.slug } : null,
      brand: p.brand ? { name: p.brand.name } : null,
    }));

    const response = NextResponse.json({ docs, totalDocs, totalPages, page });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (err) {
    console.error("Products API error:", err);
    return NextResponse.json({ docs: [], totalDocs: 0, totalPages: 0, page: 1 }, { status: 500 });
  }
}
