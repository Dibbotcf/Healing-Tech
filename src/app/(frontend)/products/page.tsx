import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { ArrowRight, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const categorySlug = params.category;
  const payload = await getPayload({ config: configPromise })

  let categoryId = null;
  if (categorySlug) {
    const catSearch = await payload.find({ collection: 'categories', where: { slug: { equals: categorySlug } } });
    if (catSearch.docs.length > 0) categoryId = catSearch.docs[0].id;
  }

  const whereClause: any = { status: { equals: 'published' } };
  if (categoryId) {
    whereClause.category = { equals: categoryId };
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 2,
    where: whereClause
  })

  // Build categories list server-side
  const categoryDocs = await payload.find({ collection: 'categories', depth: 0 })
  const categories = categoryDocs.docs

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#EEF4FB] text-[#00355D] pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <h1 className="font-['Inter'] text-4xl md:text-5xl font-bold mb-4 tracking-[-0.03em]">Product Catalog</h1>
          <p className="text-xl text-[#00355D]/80 max-w-2xl font-light">Advanced clinical solutions for modern healthcare infrastructure.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
              <h3 className="font-['Inter'] text-lg font-bold text-[#00355D] mb-4 flex items-center gap-2 tracking-[-0.03em]"><Filter className="w-5 h-5" /> Categories</h3>
              <div className="space-y-3">
                <Link href="/products" className="flex items-center gap-3 group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${!categorySlug ? 'bg-[#12B5CB] border-[#12B5CB]' : 'border-gray-300 group-hover:border-[#12B5CB]'}`}>
                    {!categorySlug && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${!categorySlug ? 'text-[#12B5CB] font-bold' : 'text-[#575B5F] font-medium group-hover:text-[#12B5CB]'}`}>All Categories</span>
                </Link>
                {categories.map((c) => {
                  const isActive = categorySlug === c.slug;
                  return (
                    <Link key={c.id} href={`/products?category=${c.slug}`} className="flex items-center gap-3 group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-[#12B5CB] border-[#12B5CB]' : 'border-gray-300 group-hover:border-[#12B5CB]'}`}>
                        {isActive && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${isActive ? 'text-[#12B5CB] font-bold' : 'text-[#575B5F] font-medium group-hover:text-[#12B5CB]'}`}>{c.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => {
                const categoryDef = product.category && typeof product.category !== 'string' ? product.category : null;
                const brandDef = product.brand && typeof product.brand !== 'string' ? product.brand : null;
                return (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col relative group">
                    {product.markAsNew && (
                      <div className="absolute top-4 right-4 z-10 bg-[#12B5CB] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
                        <Sparkles className="w-3 h-3" /> NEW
                      </div>
                    )}
                    <div className="relative h-48 bg-[#F8F9FA] p-6 flex flex-col justify-end overflow-hidden group-hover:bg-[#EEF4FB] transition-colors">
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#00355D] uppercase tracking-widest shadow-sm">
                        {categoryDef?.title || 'System'}
                      </div>
                      <div className="text-[#00355D]/20 mt-8 mb-2 flex items-center justify-center h-full">
                         <span className="font-bold text-gray-300 text-6xl opacity-20">{product.name.substring(0, 2)}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-[10px] font-bold text-[#575B5F] mb-2 uppercase tracking-widest">{brandDef?.name || 'Partner Brand'}</div>
                      <h3 className="font-['Inter'] text-lg font-bold text-[#111111] mb-2 leading-tight tracking-[-0.03em]">{product.name}</h3>
                      <p className="text-[#575B5F] text-sm mb-6 flex-1 font-light line-clamp-3 leading-relaxed">
                        {product.listingSummary || product.shortSummary}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-auto">
                        <Link href={`/products/${product.slug}`} className="flex-1 bg-white border border-[#12B5CB] hover:bg-[#12B5CB]/5 text-[#00355D] text-center py-2.5 rounded-full text-sm font-bold transition-colors">
                          View Details
                        </Link>
                        <Link href="/contact" className="flex-1 bg-[#12B5CB] hover:bg-[#009EE2] text-white text-center py-2.5 rounded-full text-sm font-bold transition-colors font-['Inter'] shadow-sm hover:shadow-md">
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}

              {products.length === 0 && (
                <div className="col-span-full py-16 px-8 text-center bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
                  <Filter className="w-12 h-12 text-gray-200 mb-4" />
                  <h3 className="font-['Inter'] text-2xl font-bold text-[#111111] mb-2 tracking-[-0.03em]">No products found</h3>
                  <p className="text-gray-500 font-light">Try selecting a different category or check back later.</p>
                  <Link href="/products" className="mt-6 text-[#12B5CB] font-medium hover:underline">Clear Filters</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// Note: Handled CheckCircle2 import via next task replacement.
