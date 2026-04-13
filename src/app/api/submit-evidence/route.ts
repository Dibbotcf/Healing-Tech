import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const orderNumber = formData.get("orderNumber") as string;
    const file = formData.get("file") as File;

    if (!orderNumber || !file) {
      return NextResponse.json(
        { error: "Order number and file are required" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });

    // Ensure order exists
    const orderCheck = await payload.find({
      collection: "orders",
      where: {
        orderNumber: { equals: orderNumber },
      },
      limit: 1,
    });

    if (orderCheck.docs.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderId = orderCheck.docs[0].id;

    // Convert fetch File into NodeJS Buffer for Payload API
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Media Collection
    const mediaObj = await payload.create({
      collection: "media",
      data: {
        alt: `Payment Evidence for ${orderNumber}`,
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: file.size,
      },
    });

    // Update the Order with the new Media Relation
    const updatedOrder = await payload.update({
      collection: "orders",
      id: orderId,
      data: {
        paymentEvidence: mediaObj.id,
      },
    });

    return NextResponse.json({ success: true, updatedOrder });
  } catch (error: any) {
    console.error("Submit Evidence API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
