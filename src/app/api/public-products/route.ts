import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { NextRequest } from "next/server";

// Cache for 60 seconds — product listing rarely changes during a visit
export const revalidate = 60;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit  = Math.min(Number(searchParams.get("limit")  ?? 12), 48);
    const page   = Math.max(Number(searchParams.get("page")   ?? 1), 1);
    const sort   = searchParams.get("sort") ?? "-createdAt";
    const category = searchParams.get("category") ?? "";

    const payload = await getPayload({ config: configPromise });

    const where: Record<string, any> = {};
    if (category) where["category.slug"] = { equals: category };

    const result = await payload.find({
      collection: "products",
      depth: 1,
      limit,
      page,
      sort,
      where: Object.keys(where).length ? where : undefined,
      select: {
        name: true,
        slug: true,
        listingSummary: true,
        markAsNew: true,
        price: true,
        discountPrice: true,
        heroImage: true,
        category: true,
        brand: true,
      } as any,
    });

    const docs = result.docs.map((p: any) => ({
      id: String(p.id),
      name: p.name,
      slug: p.slug,
      listingSummary: p.listingSummary ?? "",
      markAsNew: !!p.markAsNew,
      price: p.price ?? null,
      discountPrice: p.discountPrice ?? null,
      heroImage: p.heroImage && typeof p.heroImage === "object" && p.heroImage.url
        ? { url: getMediaUrl(p.heroImage.url), mimeType: p.heroImage.mimeType ?? "" }
        : null,
      category: p.category && typeof p.category === "object"
        ? { title: p.category.title, slug: p.category.slug }
        : null,
      brand: p.brand && typeof p.brand === "object"
        ? { name: p.brand.name }
        : null,
    }));

    const response = NextResponse.json({
      docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
    });
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    return response;
  } catch (err) {
    console.error("Products API error:", err);
    return NextResponse.json({ docs: [], totalDocs: 0, totalPages: 0, page: 1 }, { status: 500 });
  }
}
