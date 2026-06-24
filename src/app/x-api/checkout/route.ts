import { NextResponse } from 'next/server';
import { directusPost } from '@/lib/directus';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, totalAmount, paymentMethod, deliveryType, deliveryCharge } = body;

    if (!customer || !items || !items.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomStr}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healingtechnology.com.bd';
    const invoiceUrl = `${siteUrl}/invoice/${orderNumber}`;
    const estimatedDelivery = deliveryType === 'outside_dhaka' ? '2–5 business days' : '1–2 business days';

    // Save order record
    const order = await directusPost<{ data: any }>('/items/orders', {
      order_number: orderNumber,
      customer_name: customer.name ?? `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim(),
      customer_first_name: customer.firstName ?? '',
      customer_last_name: customer.lastName ?? '',
      customer_email: customer.email ?? '',
      customer_phone: customer.phone ?? '',
      customer_address: customer.address ?? '',
      customer_city: customer.city ?? '',
      total_amount: totalAmount,
      payment_method: paymentMethod,
      payment_status: 'unpaid',
      status: 'pending',
      delivery_type: deliveryType ?? 'inside_dhaka',
      delivery_charge: deliveryCharge ?? 80,
      invoice_link: invoiceUrl,
      estimated_delivery: estimatedDelivery,
    });

    const orderId = order?.data?.id;
    if (!orderId) {
      throw new Error('Order creation failed: no ID returned from Directus');
    }

    // Save line items to order_items collection (best-effort — don't fail the order if this errors)
    for (const item of items) {
      try {
        await directusPost('/items/order_items', {
          order_id: orderId,
          product_id: item.product ? Number(item.product) : null,
          product_name: item.productName ?? item.name ?? null,
          quantity: item.quantity ?? 1,
          price_at_purchase: item.priceAtPurchase ?? item.price ?? null,
          size: item.size ?? null,
        });
      } catch (itemErr) {
        console.error('order_items save error (non-fatal):', itemErr);
      }
    }

    return NextResponse.json({
      success: true,
      order: { id: orderId, orderNumber },
      paymentMethod,
      invoiceUrl,
    });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
