"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, Sparkles, ShoppingCart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@heroui/react';
import { useCartStore } from '@/lib/cartStore';
import { useRouter } from 'next/navigation';
import { getMediaUrl } from '@/lib/getMediaUrl';

export default function ProductClientWrapper({ 
  initialProducts, 
  categories,
  initialCategorySlug
}: { 
  initialProducts: any[], 
  categories: any[],
  initialCategorySlug?: string | null
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategorySlug ? [initialCategorySlug] : []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem, items } = useCartStore();
  const router = useRouter();

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(c => c !== slug) 
        : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // Filter by category
      const catSlug = p.category && typeof p.category !== 'string' ? p.category.slug : null;
      const matchesCategory = selectedCategories.length === 0 || (catSlug && selectedCategories.includes(catSlug));
      
      // Filter by search term
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategories, searchTerm]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Category Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm sticky top-28">
          <h3 className="font-['Inter'] text-lg font-bold text-[#00355D] mb-4 flex items-center gap-2 tracking-[-0.03em]">
            <Filter className="w-5 h-5" /> Filters
          </h3>
          
          {/* Quick Search */}
          <div className="mb-6">
             <input 
               type="text" 
               placeholder="Search products..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#00355D] outline-none focus:border-[#12B5CB] transition-colors"
             />
          </div>

          <div className="space-y-3">
            <div
              onClick={clearFilters}
              className="w-full flex items-center gap-3 group text-left cursor-pointer py-1"
            >
              <Checkbox 
                isSelected={selectedCategories.length === 0} 
                onChange={clearFilters}
              >
                <span className={`text-sm ${selectedCategories.length === 0 ? 'text-[#12B5CB] font-bold' : 'text-[#575B5F] font-medium group-hover:text-[#12B5CB]'}`}>
                  All Categories
                </span>
              </Checkbox>
            </div>
            <div className="w-full h-px bg-gray-100 my-2"></div>
            {categories.map((c) => {
              const isActive = selectedCategories.includes(c.slug);
              return (
                <div
                  key={c.id} 
                  onClick={() => toggleCategory(c.slug)}
                  className="w-full flex items-center gap-3 group text-left cursor-pointer py-1"
                >
                  <Checkbox 
                    isSelected={isActive}
                    onChange={() => toggleCategory(c.slug)}
                  >
                    <span className={`text-sm ${isActive ? 'text-[#12B5CB] font-bold' : 'text-[#575B5F] font-medium group-hover:text-[#12B5CB]'}`}>
                      {c.title}
                    </span>
                  </Checkbox>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        {/* Results Counter */}
        <div className="mb-6 flex justify-between items-center text-sm text-[#575B5F]">
          <span>Showing <strong className="text-[#00355D] font-bold">{filteredProducts.length}</strong> products</span>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const categoryDef = product.category && typeof product.category !== 'string' ? product.category : null;
              const brandDef = product.brand && typeof product.brand !== 'string' ? product.brand : null;
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product.id} 
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col relative group"
                >
                  {product.markAsNew && (
                    <div className="absolute top-4 right-4 z-10 bg-[#12B5CB] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
                      <Sparkles className="w-3 h-3" /> NEW
                    </div>
                  )}
                  <Link href={`/products/${product.slug}`} className="block relative h-36 md:h-48 bg-[#F8F9FA] overflow-hidden group-hover:bg-[#EEF4FB] transition-colors cursor-pointer">
                    {/* Hero image or initial placeholder */}
                    {product.heroImage && typeof product.heroImage !== 'string' && product.heroImage.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getMediaUrl(product.heroImage.url) || ''}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-bold text-gray-200 text-7xl select-none">{product.name.substring(0, 2)}</span>
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-3 md:p-6 flex-1 flex flex-col cursor-default">
                    <div className="text-[10px] font-bold text-[#12B5CB] mb-2 uppercase tracking-widest">
                      {categoryDef?.title || 'System'} 
                      {brandDef?.name && <span className="text-[#575B5F] px-1.5">•</span>} 
                      {brandDef?.name && <span className="text-[#575B5F]">{brandDef.name}</span>}
                    </div>
                    <Link href={`/products/${product.slug}`} className="cursor-pointer">
                      <h3 className="font-['Inter'] text-sm md:text-lg font-bold text-[#111111] mb-1 md:mb-2 leading-tight tracking-[-0.03em] hover:text-[#12B5CB] transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-[#575B5F] text-xs md:text-sm mb-3 md:mb-6 font-light line-clamp-3 leading-relaxed overflow-hidden">
                      {product.listingSummary || product.shortSummary || "Premium medical equipment imported by Healing Technology. Please contact our team for comprehensive technical specifications and operational capabilities."}
                    </p>
                    
                    <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-gray-100 flex flex-col gap-1.5 md:gap-2">
                      {/* Pricing */}
                      {(product.price != null || product.discountPrice != null) && (
                        <div className="flex items-end gap-2 mb-0.5">
                          {product.discountPrice != null ? (
                            <>
                              <span className="text-base md:text-xl font-extrabold text-[#12B5CB] tracking-tight leading-none">৳{product.discountPrice.toLocaleString()}</span>
                              <span className="text-xs text-[#575B5F]/50 line-through pb-0.5">৳{product.price?.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="text-base md:text-xl font-extrabold text-[#12B5CB] tracking-tight leading-none">৳{product.price?.toLocaleString()}</span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-1.5 md:gap-2 mt-0.5">
                        <button 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            addItem({ id: product.id, name: product.name, price: product.price, discountPrice: product.discountPrice, heroImage: product.heroImage ? { ...product.heroImage, url: getMediaUrl(product.heroImage?.url) } : undefined, slug: product.slug }, 1); 
                          }} 
                          className="w-full bg-[#12B5CB]/10 hover:bg-[#12B5CB]/20 text-[#12B5CB] text-center py-2 rounded-xl text-xs font-bold transition-colors shadow-sm flex justify-center items-center gap-1 cursor-pointer"
                        >
                          <ShoppingCart className="w-3 h-3" /> Cart
                        </button>
                        <button 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            addItem({ id: product.id, name: product.name, price: product.price, discountPrice: product.discountPrice, heroImage: product.heroImage ? { ...product.heroImage, url: getMediaUrl(product.heroImage?.url) } : undefined, slug: product.slug }, 1); 
                            router.push('/checkout');
                          }} 
                          className="w-full bg-[#00355D] hover:bg-[#002543] text-white text-center py-2 rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer flex justify-center items-center gap-1"
                        >
                          <Zap className="w-3 h-3" fill="currentColor" /> Order
                        </button>
                      </div>
                      <Link href={`/products/${product.slug}`} className="hidden sm:block w-full text-center py-2 text-xs font-bold text-[#575B5F] hover:text-[#12B5CB] transition-colors cursor-pointer mt-1">
                        View Full Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="col-span-full py-16 px-8 text-center bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center"
            >
              <Filter className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="font-['Inter'] text-2xl font-bold text-[#111111] mb-2 tracking-[-0.03em]">No products found</h3>
              <p className="text-gray-500 font-light">Try selecting a different category or search term.</p>
              <button onClick={clearFilters} className="mt-6 text-[#12B5CB] font-medium hover:underline cursor-pointer">Clear All Filters</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
