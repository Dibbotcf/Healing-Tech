import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  console.log('--- Starting Image Seed ---')
  const results: any[] = []

  const imagesToSeed = [
    {
      productSlug: 'luminex-lumen-h700',
      filePath: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\266db7bb-c0dc-4f33-b155-6e34fec4d3ec\\luminex_h700_1775546587861.png',
      alt: 'Luminex-Lumen H700 Surgical Light',
    },
    {
      productSlug: 'heyer-op830',
      filePath: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\266db7bb-c0dc-4f33-b155-6e34fec4d3ec\\heyer_op830_1775546602910.png',
      alt: 'Heyer OP830 Operating Table',
    },
    {
      productSlug: 'aeon-7200-anesthesia',
      filePath: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\266db7bb-c0dc-4f33-b155-6e34fec4d3ec\\aeon7200_1775546618525.png',
      alt: 'Aeon7200 Anesthesia System',
    },
    {
      productSlug: 'ecosy630-infant-warmer',
      filePath: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\266db7bb-c0dc-4f33-b155-6e34fec4d3ec\\ecosy630_1775546635924.png',
      alt: 'Ecosy630 Infant Warmer',
    }
  ]

  for (const img of imagesToSeed) {
    try {
      if (!fs.existsSync(img.filePath)) {
         results.push(`File missing: ${img.filePath}`)
         continue
      }
      
      const fileBuffer = fs.readFileSync(img.filePath)
      const fileName = path.basename(img.filePath)
      
      // Upload media
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: img.alt
        },
        file: {
          data: fileBuffer,
          name: fileName,
          mimetype: 'image/png',
          size: fileBuffer.length
        }
      })
      
      // Assign media to product's heroImage
      const products = await payload.find({
        collection: 'products',
        where: { slug: { equals: img.productSlug } }
      })
      
      if (products.docs.length > 0) {
        await payload.update({
          collection: 'products',
          id: products.docs[0].id,
          data: {
            heroImage: media.id
          }
        })
        results.push(`Successfully added image to ${img.productSlug}`)
      } else {
        results.push(`Product not found: ${img.productSlug}`)
      }
      
    } catch (e: any) {
      console.error(`Failed to process image for ${img.productSlug}:`, e)
      results.push(`Failed for ${img.productSlug}: ${e.message}`)
    }
  }

  return NextResponse.json({ success: true, results })
}
