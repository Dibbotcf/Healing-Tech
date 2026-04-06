import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { ArrowRight, Search, Filter } from 'lucide-react'

export default async function ProductsPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 2,
    where: {
      status: { equals: 'published' }
    }
  })

  // Build categories list server-side
  const categoryDocs = await payload.find({ collection: 'categories', depth: 0 })
  const categories = categoryDocs.docs

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#00355D] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <h1 className="font-['Inter'] text-4xl md:text-5xl font-medium mb-4 tracking-tighter">Product Catalog</h1>
          <p className="text-xl text-white/80 max-w-2xl font-normal">Advanced clinical solutions for modern healthcare infrastructure.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h3 className="font-['Inter'] text-lg font-medium text-[#00355D] mb-4 flex items-center gap-2 tracking-tighter"><Filter className="w-5 h-5" /> Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-[#12B5CB] rounded border-gray-300 pointer-events-none" checked readOnly />
                  <span className="text-[#575B5F] font-normal">All Categories</span>
                </div>
                {categories.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 pointer-events-none opacity-50" />
                    <span className="text-[#575B5F] font-normal">{c.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => {
                const categoryDef = product.category && typeof product.category !== 'string' ? product.category : null;
                const brandDef = product.brand && typeof product.brand !== 'string' ? product.brand : null;
                return (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                    <div className="relative h-48 bg-gray-50 p-6 flex flex-col justify-end">
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#00355D]">
                        {categoryDef?.title || 'System'}
                      </div>
                      <div className="text-[#00355D]/20 mt-8 mb-2">
                        {/* Empty Icon space */}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs font-bold text-[#575B5F] mb-2 uppercase tracking-wider">{brandDef?.name || 'Partner Brand'}</div>
                      <h3 className="font-['Inter'] text-xl font-medium text-[#111111] mb-3 leading-tight tracking-tighter">{product.name}</h3>
                      <p className="text-[#575B5F] text-sm mb-6 flex-1 font-normal line-clamp-3">
                        {product.listingSummary || product.shortSummary}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-auto">
                        <Link href={`/products/${product.slug}`} className="flex-1 bg-white border border-[#12B5CB] hover:bg-[#12B5CB]/5 text-[#00355D] text-center py-2.5 rounded-md text-sm font-medium transition-colors">
                          View Details
                        </Link>
                        <Link href="/contact" className="flex-1 bg-[#12B5CB] hover:bg-[#009EE2] text-white text-center py-2.5 rounded-md text-sm font-medium transition-colors font-['Inter']">
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}

              {products.length === 0 && (
                <div className="col-span-full py-12 text-center text-[#575B5F]">
                  <h3 className="font-['Inter'] text-xl font-medium text-[#111111] mb-2 tracking-tighter">No products found</h3>
                  <p>Check back soon. We are continually updating our inventory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
