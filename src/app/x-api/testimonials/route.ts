import { NextResponse } from "next/server";
import { directusGet, directusAssetUrl } from "@/lib/directus";

export const revalidate = 0;

export async function GET() {
  try {
    const res = await directusGet<{ data: any[] }>(
      "/items/testimonials?fields=id,name,role,text,hospital,avatar,is_active&filter[is_active][_eq]=true&limit=100",
      300
    );

    const docs = (res.data ?? []).map((t: any) => ({
      id: String(t.id),
      quote: t.text ?? "",
      clientName: t.name ?? "",
      designation: t.role ?? "",
      hospital: t.hospital ?? "",
      avatar: t.avatar ? { url: directusAssetUrl(t.avatar) ?? "" } : null,
    }));

    return NextResponse.json({ docs, totalDocs: docs.length });
  } catch (err) {
    console.error("Testimonials API error:", err);
    return NextResponse.json({ docs: [], totalDocs: 0 });
  }
}
