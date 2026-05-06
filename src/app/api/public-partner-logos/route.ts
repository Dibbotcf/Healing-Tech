import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";

// Cache for 5 minutes — partner logos change very rarely
export const revalidate = 300;

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    const logoDocs = await payload.find({
      collection: "partner-logos",
      depth: 1,
      sort: "sortOrder",
      limit: 100,
    });

    const logos = logoDocs.docs.map((l: any) => ({
      id: String(l.id),
      name: l.name,
      logo: typeof l.logo === "object" && l.logo?.url ? getMediaUrl(l.logo.url) : "",
      website: l.website || "",
    }));

    const res = NextResponse.json(logos);
    res.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res;
  } catch (error) {
    console.error("Partner logos API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
