import { NextResponse } from 'next/server';
import { directusGet, directusAssetUrl } from "@/lib/directus";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await directusGet<{ data: any[] }>(
      "/items/gallery_posts?fields=id,title,description,image,sort_order&filter[status][_eq]=published&sort=sort_order&limit=100"
    );
    const docs = (res.data ?? []).map((g: any) => ({
      id: g.id,
      title: g.title,
      caption: g.description,
      image: g.image ? { url: directusAssetUrl(g.image) } : null,
      sortOrder: g.sort_order,
    }));
    return NextResponse.json({ docs, totalDocs: docs.length });
  } catch (err) {
    console.error('gallery-posts API error:', err);
    return NextResponse.json({ docs: [] }, { status: 500 });
  }
}
