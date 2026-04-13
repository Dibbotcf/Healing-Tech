import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customer, items, totalAmount, paymentMethod } = body

    if (!customer || !items || !items.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Generate unique order number (e.g., ORD-20260413-XXXX)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomStr = Math.floor(1000 + Math.random() * 9000)
    const orderNumber = `ORD-${dateStr}-${randomStr}`

    // Create the order in Payload CMS
    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        customer,
        items,
        totalAmount,
        paymentMethod,
        paymentStatus: 'unpaid', // By default unpaid until verified
        status: 'pending',
      }
    })

    return NextResponse.json({ success: true, order, paymentMethod })

  } catch (error: any) {
    console.error('Checkout API Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
