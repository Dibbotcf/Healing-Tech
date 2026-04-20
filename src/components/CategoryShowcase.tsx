"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  image?: string | null;
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  // How many horizontal slices to show at a time
  const visibleCount = 5;

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
          <div className="flex h-[400px] md:h-[500px] gap-4">
            {[...Array(visibleCount)].map((_, i) => (
              <div key={i} className="flex-1 bg-gray-100 rounded-3xl animate-pulse" />
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
            <span className="text-[#12B5CB] font-bold tracking-widest text-xs lg:text-sm uppercase mb-2 block">Browse by Department</span>
            <h2 className="font-['Inter'] text-3xl lg:text-[2.5rem] font-bold text-[#00355D] tracking-tighter">Medical Categories</h2>
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
          <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-3 md:gap-4 w-full">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category, index) => {
                const isHovered = hoveredIndex === index;
                const isNoneHovered = hoveredIndex === null;
                
                const imageUrl = category.image ? getMediaUrl(category.image) : null;

                return (
                  <motion.div
                    key={category.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                      isHovered ? "flex-[5]" : isNoneHovered ? "flex-[1.5]" : "flex-[0.8]"
                    }`}
                  >
                    <Link href={`/products?category=${category.slug}`} className="block w-full h-full">
                      {/* Background Media */}
                      {imageUrl ? (
                        <img src={imageUrl} alt={category.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00355D] to-[#12B5CB]" />
                      )}

                      {/* Dark Gradient Overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "bg-gradient-to-t from-[#00355D] via-[#00355D]/40 to-transparent opacity-90" : "bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-70"}`} />

                      {/* Data Details Overlay */}
                      <div className="absolute top-0 bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end">
                        <div 
                          className={`flex flex-col items-start transform transition-all duration-500 ${
                            isHovered ? "translate-y-0 opacity-100 delay-100" : isNoneHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                          }`}
                        >
                          {/* Title */}
                          <h3 className={`font-extrabold transition-all duration-300 ease-out line-clamp-2 mb-2 ${isHovered ? 'text-3xl lg:text-4xl text-white tracking-tight leading-[1.1]' : 'text-xl md:text-2xl text-white/90 truncate w-full'}`}>
                            {category.title}
                          </h3>

                          {/* Description (Shows on hover) */}
                          <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                            <p className="text-white/80 text-sm md:text-base line-clamp-2">
                              {category.shortDescription || `Explore our high-quality ${category.title.toLowerCase()} for medical applications.`}
                            </p>
                          </div>
                          
                          {/* Explore Link (Shows on hover) */}
                          <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-20 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}`}>
                            <div className="flex items-center gap-2 text-white font-medium bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors w-max">
                              View Products <ArrowUpRight className="w-4 h-4 text-[#12B5CB]" />
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
