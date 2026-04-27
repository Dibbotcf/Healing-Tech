import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { ArrowRight, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react'

import ProductFilterClient from './ProductFilterClient';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const categorySlug = params.category || null;
  const payload = await getPayload({ config: configPromise });

  // Fetch absolutely everything to allow client-side instantaneous filtering
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 1000,
    where: { status: { equals: 'published' } }
  });

  const categoryDocs = await payload.find({ collection: 'categories', depth: 0, limit: 100, sort: 'sortOrder' });
  const categories = categoryDocs.docs;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Inter'] tracking-tight">
      <div className="bg-[#EEF4FB] text-[#00355D] pt-[88px] pb-16 md:pt-[96px] md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <h1 className="font-['Inter'] text-4xl md:text-5xl font-bold mb-4 tracking-[-0.03em]">Product Catalog</h1>
          <p className="text-xl text-[#00355D]/80 max-w-2xl font-light">Advanced clinical solutions for modern healthcare infrastructure.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-12">
        <ProductFilterClient 
          initialProducts={products} 
          categories={categories} 
          initialCategorySlug={categorySlug}
        />
      </div>
    </div>
  );
}
// Note: Handled CheckCircle2 import via next task replacement.
