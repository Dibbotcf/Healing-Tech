"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  image?: string | null;
  productImages?: string[];
  productCount?: number;
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  // How many horizontal slices to show at a time
  const visibleCount = 8;

  useEffect(() => {
    fetch("/api/public-categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(visibleCount)].map((_, i) => (
              <div key={i} className="h-[400px] bg-gray-100 rounded-xl animate-pulse w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  // Sliced array for the current view
  const visibleCategories = categories.slice(startIndex, startIndex + visibleCount);

  const slideNext = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex((prev) => prev + 4);
      setHoveredIndex(null);
    }
  };

  const slidePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 4);
      setHoveredIndex(null);
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12 max-w-[1500px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <span className="text-[#12B5CB] font-bold tracking-widest text-xs lg:text-sm uppercase mb-2 block">Browse by Department</span>
            <h2 className="font-['Inter'] text-3xl lg:text-[2.5rem] font-bold text-[#00355D] tracking-tighter">Our Medical Categories</h2>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={slidePrev} 
              disabled={startIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${startIndex === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-[#00355D] hover:bg-[#00355D] hover:text-white hover:border-[#00355D]'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={slideNext} 
              disabled={startIndex + visibleCount >= categories.length}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${startIndex + visibleCount >= categories.length ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-[#00355D] hover:bg-[#00355D] hover:text-white hover:border-[#00355D]'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* The Accordion Stage */}
        <div className="relative group/stage">
          {/* Absolute Floating Arrows */}
          {startIndex > 0 && (
            <button 
              onClick={slidePrev} 
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-[#00355D] hover:scale-110 hover:text-[#12B5CB] transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {startIndex + visibleCount < categories.length && (
            <button 
               onClick={slideNext} 
               className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-[#00355D] hover:scale-110 hover:text-[#12B5CB] transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Slices Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category, index) => {
                const imageUrl = category.image ? getMediaUrl(category.image) : null;

                return (
                  <motion.div
                    key={category.id}
                    layout="position"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group"
                  >
                    <Link href={`/products?category=${category.slug}`} className="block h-full relative">
                      <div className="bg-white rounded-xl border border-gray-100 hover:border-[#12B5CB]/30 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                        <div className="relative h-[200px] bg-[#F8F9FA] overflow-hidden pointer-events-none">
                          <CategoryImageSlider productImages={category.productImages} fallbackImage={imageUrl} categoryTitle={category.title} />
                        </div>
                        <div className="p-6 flex flex-col flex-1 pointer-events-none">
                          <div className="flex items-center mb-2">
                            <span className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] bg-[#12B5CB]/10 px-2 py-1 rounded-md">
                              {category.productCount || 0} Products
                            </span>
                          </div>
                          <h3 className="font-bold text-[#00355D] text-xl tracking-tight mb-3 group-hover:text-[#12B5CB] transition-colors leading-snug">
                            {category.title}
                          </h3>
                          <p className="text-sm text-[#575B5F] leading-relaxed line-clamp-2 mb-4 flex-1">
                            {category.shortDescription || `Explore our high-quality ${category.title.toLowerCase()} for medical applications.`}
                          </p>
                          
                          <div className="mt-auto flex flex-col gap-3">
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              <span className="text-[#12B5CB] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Products <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryImageSlider({ productImages, fallbackImage, categoryTitle }: { productImages?: string[], fallbackImage: string | null, categoryTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!productImages || productImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productImages]);

  if (productImages && productImages.length > 0) {
    return (
      <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
         {productImages.map((src, i) => (
            <img 
              key={i} 
              src={src} 
              alt={`${categoryTitle} product ${i+1}`} 
              className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-1000 ease-in-out ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
            />
         ))}
      </div>
    );
  }
  
  if (fallbackImage) {
     return <img src={fallbackImage} alt={categoryTitle} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10 group-hover:scale-105 transition-transform duration-500">
       <span className="text-[#00355D]/20 text-6xl font-bold">{categoryTitle.charAt(0)}</span>
    </div>
  );
}
