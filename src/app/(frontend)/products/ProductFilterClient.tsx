"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@heroui/react';

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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  <Link href={`/products/${product.slug}`} className="block relative h-48 bg-[#F8F9FA] p-6 flex flex-col justify-end overflow-hidden group-hover:bg-[#EEF4FB] transition-colors cursor-pointer">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#00355D] uppercase tracking-widest shadow-sm">
                      {categoryDef?.title || 'System'}
                    </div>
                    <div className="text-[#00355D]/20 mt-8 mb-2 flex items-center justify-center h-full">
                       <span className="font-bold text-gray-300 text-6xl opacity-20">{product.name.substring(0, 2)}</span>
                    </div>
                  </Link>
                  
                  <div className="p-6 flex-1 flex flex-col cursor-default">
                    <div className="text-[10px] font-bold text-[#575B5F] mb-2 uppercase tracking-widest">{brandDef?.name || 'Partner Brand'}</div>
                    <Link href={`/products/${product.slug}`} className="cursor-pointer">
                      <h3 className="font-['Inter'] text-lg font-bold text-[#111111] mb-2 leading-tight tracking-[-0.03em] hover:text-[#12B5CB] transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-[#575B5F] text-sm mb-6 flex-1 font-light line-clamp-3 leading-relaxed">
                      {product.listingSummary || product.shortSummary || "Premium medical equipment imported by Healing Technology. Please contact our team for comprehensive technical specifications and operational capabilities."}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-auto">
                      <Link href={`/products/${product.slug}`} className="flex-1 bg-white border border-[#12B5CB] hover:bg-[#12B5CB]/5 text-[#00355D] text-center py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer">
                        View Details
                      </Link>
                      <Link href="/contact" className="flex-1 bg-[#12B5CB] hover:bg-[#009EE2] text-white text-center py-2.5 rounded-full text-sm font-bold transition-colors font-['Inter'] shadow-sm hover:shadow-md cursor-pointer">
                        Request Quote
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
