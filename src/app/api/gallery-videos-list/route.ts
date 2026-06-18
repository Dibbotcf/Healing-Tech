import { NextResponse } from 'next/server';
import { directusGet, directusAssetUrl } from "@/lib/directus";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await directusGet<{ data: any[] }>(
      "/items/gallery_videos?fields=id,title,description,video_url,thumbnail,sort_order&filter[status][_eq]=published&sort=sort_order&limit=50"
    );
    const docs = (res.data ?? []).map((g: any) => ({
      id: g.id,
      title: g.title,
      description: g.description,
      embedUrl: g.video_url,
      thumbnail: g.thumbnail ? { url: directusAssetUrl(g.thumbnail) } : null,
      sortOrder: g.sort_order,
    }));
    return NextResponse.json({ docs, totalDocs: docs.length });
  } catch (err) {
    console.error('gallery-videos API error:', err);
    return NextResponse.json({ docs: [] }, { status: 500 });
  }
}
