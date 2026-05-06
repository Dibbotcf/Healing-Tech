import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'gallery-posts',
      limit: 100,
      sort: 'sortOrder',
      depth: 1,
    })
    return NextResponse.json(result)
  } catch (err) {
    console.error('gallery-posts API error:', err)
    return NextResponse.json({ docs: [] }, { status: 500 })
  }
}
