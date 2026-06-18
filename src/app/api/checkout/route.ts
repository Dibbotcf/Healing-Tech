import { NextResponse } from 'next/server';
import { directusPost } from '@/lib/directus';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, totalAmount, paymentMethod } = body;

    if (!customer || !items || !items.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomStr}`;

    const res = await directusPost<{ data: any }>('/items/orders', {
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
    });

    const order = res.data;
    return NextResponse.json({ success: true, order, paymentMethod });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
