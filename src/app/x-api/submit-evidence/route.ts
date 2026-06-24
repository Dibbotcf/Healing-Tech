import { NextResponse } from "next/server";

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? 'https://cms.healingtechnology.com.bd';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN ?? '';

async function dFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}`, ...opts.headers },
  });
  return res.json();
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const orderNumber = formData.get("orderNumber") as string;
    const file = formData.get("file") as File;

    if (!orderNumber || !file) {
      return NextResponse.json({ error: "Order number and file are required" }, { status: 400 });
    }

    // Find the order
    const orderRes = await dFetch(
      `/items/orders?filter[order_number][_eq]=${encodeURIComponent(orderNumber)}&fields=id&limit=1`
    );
    if (!orderRes.data?.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const orderId = orderRes.data[0].id;

    // Upload file to Directus
    const uploadForm = new FormData();
    uploadForm.append("file", file, file.name);
    uploadForm.append("title", `Payment Evidence for ${orderNumber}`);

    const fileRes = await fetch(`${DIRECTUS_URL}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      body: uploadForm,
    });
    const fileData = await fileRes.json();
    if (!fileData.data?.id) {
      throw new Error("File upload failed: " + JSON.stringify(fileData.errors?.[0]?.message));
    }

    // Update order with payment evidence
    const updated = await dFetch(`/items/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_evidence: fileData.data.id }),
    });

    return NextResponse.json({ success: true, updatedOrder: updated.data });
  } catch (error: any) {
    console.error("Submit Evidence API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
