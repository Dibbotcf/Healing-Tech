import { NextResponse } from "next/server";

// Redirect old Payload CMS media URLs (/api/media/file/filename) to the
// Next.js public/media directory (/media/filename) where static files live.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filename = path.join("/");
  return NextResponse.redirect(new URL(`/media/${filename}`, process.env.NEXT_PUBLIC_SITE_URL ?? "https://healingtechnology.com.bd"), 301);
}
