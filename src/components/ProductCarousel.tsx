"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getMediaUrl } from "@/lib/getMediaUrl";

interface Product {
  id: string;
  name: string;
  slug: string;
  listingSummary: string;
  markAsNew?: boolean;
  price?: number | null;
  discountPrice?: number | null;
  heroImage?: { url: string; mimeType?: string } | null;
  category?: { title: string; slug: string } | string;
  brand?: { name: string } | string;
}

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize Embla with looping and autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, dragFree: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  useEffect(() => {
    fetch("/api/products?limit=10&sort=-createdAt")
      .then((r) => r.json())
      .then((data) => {
        let fetchedProducts = data.docs || [];

        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[320px] h-[400px] bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] tracking-tighter">Latest Products</h2>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/products" 
              className="hidden md:flex group items-center gap-2 text-sm font-bold text-[#00355D] hover:text-[#12B5CB] transition-colors"
            >
              EXPLORE ALL PRODUCTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={scrollPrev} 
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#575B5F] hover:bg-[#00355D] hover:text-white hover:border-[#00355D] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                type="button"
                onClick={scrollNext} 
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#575B5F] hover:bg-[#00355D] hover:text-white hover:border-[#00355D] transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex ml-[-24px] backface-hidden touch-pan-y">
            {products.map((product, i) => {
              const catTitle = product.category && typeof product.category !== "string" ? product.category.title : "";
              const brandName = product.brand && typeof product.brand !== "string" ? product.brand.name : "";
              const heroUrl = getMediaUrl(product.heroImage?.url);

              return (
                <div key={i} className="flex-[0_0_320px] min-w-0 pl-6 group pb-8">
                  <Link href={`/products/${product.slug}`} className="block h-full relative">
                    <div className="bg-white rounded-xl border border-gray-100 hover:border-[#12B5CB]/30 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                      <div className="relative h-[200px] bg-[#F8F9FA] overflow-hidden pointer-events-none">
                        {heroUrl ? (
                          product.heroImage?.mimeType?.startsWith('video/') ? (
                            <video src={heroUrl} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <img src={heroUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D]/5 to-[#12B5CB]/10">
                            <span className="text-[#00355D]/20 text-6xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        )}
                        {product.markAsNew && (
                          <div className="absolute top-3 left-3 bg-[#12B5CB] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 uppercase tracking-wider shadow-sm">
                            <Sparkles className="w-3 h-3" /> New
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1 pointer-events-none">
                        {catTitle && <p className="text-[10px] font-bold text-[#12B5CB] uppercase tracking-[0.1em] mb-2">{catTitle}</p>}
                        <h3 className="font-bold text-[#00355D] text-xl tracking-tight mb-3 group-hover:text-[#12B5CB] transition-colors leading-snug">{product.name}</h3>
                        <p className="text-sm text-[#575B5F] leading-relaxed line-clamp-2 mb-4 flex-1">{product.listingSummary}</p>
                        
                        <div className="mt-auto flex flex-col gap-3">
                          {(product.price != null || product.discountPrice != null) && (
                            <div className="flex items-center gap-2">
                              {product.discountPrice != null ? (
                                <>
                                  <span className="text-lg font-extrabold text-[#12B5CB]">৳{product.discountPrice.toLocaleString()}</span>
                                  <span className="text-sm text-gray-400 line-through">৳{product.price?.toLocaleString()}</span>
                                </>
                              ) : (
                                <span className="text-lg font-extrabold text-[#12B5CB]">৳{product.price?.toLocaleString()}</span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            {brandName && <span className="text-xs text-[#575B5F] font-bold uppercase tracking-wider">{brandName}</span>}
                            <span className="text-[#12B5CB] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
