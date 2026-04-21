import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { getMediaUrl } from "@/lib/getMediaUrl";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    const logoDocs = await payload.find({
      collection: "client-logos",
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

    return NextResponse.json(logos);
  } catch (error) {
    console.error("Client logos API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
