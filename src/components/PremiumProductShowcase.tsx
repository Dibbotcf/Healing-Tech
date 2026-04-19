"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  heroImage?: { url: string; mimeType?: string } | null;
  gallery?: { image: { url: string; mimeType?: string } }[] | null;
  category?: { title: string } | string;
}

export function PremiumProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  // How many horizontal slices to show at a time
  const visibleCount = 5;

  useEffect(() => {
    // Fetch top products (depth=1 is CRITICAL so the image URL populates instead of just returning an ID)
    fetch("/api/products?limit=20&sort=-createdAt&depth=1")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="flex h-[400px] md:h-[500px] gap-4">
            {[...Array(visibleCount)].map((_, i) => (
              <div key={i} className="flex-1 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  // Sliced array for the current view
  const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

  const slideNext = () => {
    if (startIndex + visibleCount < products.length) {
      setStartIndex((prev) => prev + 1);
      setHoveredIndex(null);
    }
  };

  const slidePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
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
            <span className="text-[#12B5CB] font-bold tracking-widest text-xs lg:text-sm uppercase mb-2 block">Featured Engineering</span>
            <h2 className="font-['Inter'] text-3xl lg:text-[2.5rem] font-bold text-[#00355D] tracking-tighter">Our Signature Products</h2>
          </div>

          {/* Desktop Arrow Controls (Alternative position) */}
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
              disabled={startIndex + visibleCount >= products.length}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${startIndex + visibleCount >= products.length ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-[#00355D] hover:bg-[#00355D] hover:text-white hover:border-[#00355D]'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* The Accordion Stage */}
        <div className="relative group/stage">
          {/* Absolute Floating Arrows (for super easy clicking) */}
          {startIndex > 0 && (
            <button 
              onClick={slidePrev} 
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-[#00355D] hover:scale-110 hover:text-[#12B5CB] transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {startIndex + visibleCount < products.length && (
            <button 
               onClick={slideNext} 
               className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-[#00355D] hover:scale-110 hover:text-[#12B5CB] transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Slices Container */}
          <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-3 md:gap-4 w-full">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => {
                const isHovered = hoveredIndex === index;
                const isNoneHovered = hoveredIndex === null;
                
                // Fallback to first gallery image if heroImage isn't explicitly set
                const imgData = product.heroImage?.url ? product.heroImage : product.gallery?.[0]?.image;
                const heroUrl = getMediaUrl(imgData?.url);
                const isVideo = imgData?.mimeType?.startsWith('video/');

                const catTitle = product.category && typeof product.category !== "string" ? product.category.title : "MEDICAL EQUIPMENT";

                return (
                  <motion.div
                    key={product.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                      isHovered ? "flex-[5]" : isNoneHovered ? "flex-1" : "flex-[0.5]"
                    }`}
                  >
                    <Link href={`/products/${product.slug}`} className="block w-full h-full">
                      {/* Background Media */}
                      {heroUrl ? (
                        isVideo ? (
                          <video src={heroUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        ) : (
                          <img src={heroUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        )
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10" />
                      )}

                      {/* Dark Gradient Overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "bg-gradient-to-t from-[#00355D] via-[#00355D]/40 to-transparent opacity-90" : "bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-60"}`} />

                      {/* Data Details Overlay */}
                      <div className="absolute top-0 bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end">
                        <div 
                          className={`flex flex-col items-start transform transition-all duration-500 ${
                            isHovered ? "translate-y-0 opacity-100 delay-100" : isNoneHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                          }`}
                        >
                          {/* Tag */}
                          <div className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-4 transition-colors duration-500 ${isHovered ? 'bg-[#12B5CB]/90 text-white shadow-lg' : 'bg-black/30 text-white/90 border border-white/20'}`}>
                            {catTitle}
                          </div>
                          
                          {/* Title */}
                          <h3 className={`font-extrabold transition-all duration-500 ease-out line-clamp-2 ${isHovered ? 'text-3xl lg:text-4xl text-white tracking-tight leading-[1.1]' : 'text-xl md:text-2xl text-white/90 truncate w-full'}`}>
                            {product.name}
                          </h3>
                          
                          {/* Explore Link (Shows on hover) */}
                          <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-20 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}`}>
                            <div className="flex items-center gap-2 text-white font-medium bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors w-max">
                              Explore Specifications <ArrowUpRight className="w-4 h-4 text-[#12B5CB]" />
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
