import { NextResponse } from "next/server";
import { directusGet, directusAssetUrl } from "@/lib/directus";

export const revalidate = 300;

export async function GET() {
  try {
    const res = await directusGet<{ data: any[] }>(
      "/items/partner_logos?fields=id,name,image,website&sort=name&limit=100",
      300
    );

    const logos = (res.data ?? []).map((l: any) => ({
      id: String(l.id),
      name: l.name,
      logo: l.image ? directusAssetUrl(l.image) ?? "" : "",
      website: l.website ?? "",
    }));

    const r = NextResponse.json(logos);
    r.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return r;
  } catch (error) {
    console.error("Partner logos API Error:", error);
    return NextResponse.json([]);
  }
}
