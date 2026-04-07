"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({ images }: { images: { url: string; alt?: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-white rounded-3xl flex flex-col items-center justify-center gap-4 shadow-xl shadow-[#00355D]/5 border border-[#00355D]/5">
        {/* Clean geometric placeholder — no generic icons */}
        <div className="flex items-center justify-center gap-3 opacity-20">
          <div className="w-8 h-8 rounded-full bg-[#12B5CB]" />
          <div className="w-16 h-2 rounded-full bg-[#00355D]" />
          <div className="w-5 h-5 rounded bg-[#12B5CB]/60" />
        </div>
        <span className="text-xs text-[#00355D]/30 uppercase tracking-[0.15em] font-bold">Image Coming Soon</span>
      </div>
    );
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full aspect-square bg-white rounded-3xl flex items-center justify-center p-8 relative overflow-hidden shadow-xl shadow-[#00355D]/5 group">
      <Image
        src={images[currentIndex].url}
        alt={images[currentIndex].alt || `Product Image ${currentIndex + 1}`}
        fill
        className="object-contain p-8 mix-blend-multiply transition-opacity duration-300"
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-[#12B5CB] shadow-md opacity-0 group-hover:opacity-100 transition-all pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-[#12B5CB] shadow-md opacity-0 group-hover:opacity-100 transition-all pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#12B5CB] w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
