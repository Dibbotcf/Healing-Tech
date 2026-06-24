import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { directusPost } from "@/lib/directus";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await directusPost("/items/inquiries", {
      full_name: body.fullName,
      role: body.role,
      hospital: body.hospital,
      email: body.email,
      phone: body.phone,
      requirements: body.requirements,
      status: "draft",
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
