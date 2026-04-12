"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type MediaItem = { url: string; alt?: string; mimeType?: string };

export function ProductGallery({ images }: { images: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-white rounded-3xl flex flex-col items-center justify-center gap-4 shadow-xl shadow-[#00355D]/5 border border-[#00355D]/5">
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

  const current = images[currentIndex];
  const isVideo = current.mimeType?.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(current.url);

  return (
    <div className="flex flex-col gap-4">
      {/* Main viewer */}
      <div className="w-full aspect-square bg-white rounded-3xl relative overflow-hidden shadow-xl shadow-[#00355D]/5 group border border-[#00355D]/5">
        {isVideo ? (
          <video
            key={current.url}
            src={current.url}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.url}
            src={current.url}
            alt={current.alt || `Product Image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-opacity duration-300"
          />
        )}

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-[#12B5CB] shadow-md opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-[#12B5CB] shadow-md opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip — only shows if there are multiple items */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((item, i) => {
            const thumbIsVideo = item.mimeType?.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(item.url);
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  i === currentIndex ? 'border-[#12B5CB] shadow-md' : 'border-transparent hover:border-gray-300'
                }`}
              >
                {thumbIsVideo ? (
                  <div className="w-full h-full bg-[#00355D]/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-[#12B5CB]" />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.alt || `Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

