import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, role, hospital, email, phone, requirements } = body

    if (!fullName || !role || !hospital || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'inquiries',
      data: { fullName, role, hospital, email, phone, requirements: requirements || '' },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Inquiry API Error:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
