import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, FileText, Download } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2
  })

  if (docs.length === 0) return notFound()

  const product = docs[0]
  const brand    = product.brand    && typeof product.brand    !== 'string' ? product.brand    : null;
  const category = product.category && typeof product.category !== 'string' ? product.category : null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      {/* Hero */}
      <div className="bg-[#00355D] text-white pt-[88px] pb-24 lg:pt-[96px] lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <Link href="/products" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#12B5CB]/20 text-[#12B5CB] px-3 py-1 rounded-[2px] text-xs font-bold uppercase tracking-wider">{category?.title || 'System'}</span>
                {product.originCountry && <span className="bg-white/10 text-white px-3 py-1 rounded-[2px] text-xs font-bold tracking-wider">{product.originCountry}</span>}
              </div>
              <h1 className="font-['Inter'] text-4xl lg:text-5xl font-bold mb-4 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {product.name}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl font-normal leading-relaxed mb-8">{product.shortSummary}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="bg-[#12B5CB] hover:bg-[#009EE2] text-white px-8 py-3 rounded-[2px] text-base font-bold transition-colors">
                  Request a Quote
                </Link>
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Manufactured by <span className="text-white font-medium">{brand?.name || 'Partner Brand'}</span>
                </div>
              </div>
            </div>
            
            {/* Key Highlights */}
            <div className="lg:w-1/3">
              <div className="bg-white/5 border border-white/10 rounded-[2px] p-6">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tighter border-b border-white/10 pb-3">Key Highlights</h3>
                <ul className="space-y-4">
                  {product.keyHighlights?.map((hl: any, i: number) => (
                    <li key={i} className="flex gap-3 text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-[#12B5CB] flex-shrink-0 mt-0.5" />
                      <span className="font-normal">{hl.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specs & Downloads */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] -mt-12 relative z-10">
        <div className="bg-white rounded-[2px] border border-gray-100 p-8 lg:p-12">

          {/* Technical Specifications using @heroui/react Table */}
          {product.specGroups && product.specGroups.length > 0 && (
            <div className="mb-16">
              <h2 className="font-['Inter'] text-3xl font-bold text-[#00355D] mb-8 tracking-tighter flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#12B5CB]" /> Technical Specifications
              </h2>
              <div className="space-y-8">
                {product.specGroups.map((group: any, i: number) => (
                  <div key={i}>
                    <h3 className="text-sm font-bold text-[#111111] mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">
                      {group.groupTitle}
                    </h3>
                    {/* Light-mode specs table — clean no-shadow style */}
                    <div className="border border-gray-200 rounded-[2px] overflow-hidden">
                      <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100">
                          {group.rows?.map((row: any, j: number) => (
                            <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                              <td className="px-6 py-3.5 text-sm font-medium text-[#575B5F] w-1/3">{row.label}</td>
                              <td className="px-6 py-3.5 text-sm text-[#111111] font-semibold">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Downloads */}
          {product.downloadItems && product.downloadItems.length > 0 && (
            <div>
              <h2 className="font-['Inter'] text-2xl font-bold text-[#00355D] mb-6 tracking-tighter border-b border-gray-100 pb-3">
                Brochures & Manuals
              </h2>
              <div className="flex flex-wrap gap-4">
                {product.downloadItems.map((doc: any, i: number) => (
                  <div key={i} className="flex items-center justify-between border border-gray-200 rounded-[2px] p-4 bg-gray-50 hover:bg-white transition-all cursor-pointer w-full md:w-auto md:min-w-[300px]">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#00355D]/10 text-[#00355D] p-2 rounded-[2px]"><FileText className="w-5 h-5"/></div>
                      <div>
                        <div className="font-medium text-[#111111]">{doc.title}</div>
                        <div className="text-xs text-[#575B5F] uppercase tracking-wider">{doc.type}</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-[#12B5CB]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
