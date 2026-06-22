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

    const basePayload = {
      order_number: orderNumber,
      customer_name: customer.name ?? `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim(),
      customer_first_name: customer.firstName ?? '',
      customer_last_name: customer.lastName ?? '',
      customer_email: customer.email ?? '',
      customer_phone: customer.phone ?? '',
      customer_address: customer.address ?? '',
      customer_city: customer.city ?? '',
      items,
      total_amount: totalAmount,
      payment_method: paymentMethod,
      payment_status: 'unpaid',
      status: 'pending',
    };

    let res: any;
    try {
      res = await directusPost<{ data: any }>('/items/orders', {
        ...basePayload,
        delivery_type: deliveryType ?? 'inside_dhaka',
        delivery_charge: deliveryCharge ?? 80,
        invoice_url: invoiceUrl,
        estimated_delivery: estimatedDelivery,
      });
    } catch (firstErr: any) {
      // If Directus rejected unknown fields, retry with base payload only
      if (firstErr.message?.includes('400')) {
        res = await directusPost<{ data: any }>('/items/orders', basePayload);
      } else {
        throw firstErr;
      }
    }

    const order = { ...res.data, orderNumber };
    return NextResponse.json({ success: true, order, paymentMethod, invoiceUrl });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
