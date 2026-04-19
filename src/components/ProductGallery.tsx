"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type MediaItem = { url: string; alt?: string; mimeType?: string };

export function ProductGallery({ images }: { images: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  // Close fullscreen on Escape key
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

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

  const next = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  const current = images[currentIndex];
  const isVideo = current.mimeType?.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(current.url);

  return (
    <>
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
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.url}
                src={current.url}
                alt={current.alt || `Product Image ${currentIndex + 1}`}
                onClick={() => setIsFullscreen(true)}
                className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-opacity duration-300 cursor-zoom-in"
              />
              {/* Zoom overlay hint */}
              <div 
                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                <ZoomIn className="w-5 h-5 text-[#00355D]/60" />
              </div>
            </>
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

      {/* FULLSCREEN LIGHTBOX (Rendered via Portal to break out of z-index traps) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isFullscreen && !isVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
              onClick={() => setIsFullscreen(false)}
            >
              {/* Close Cross Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
                className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#12B5CB] text-white transition-colors border border-white/20 z-[110]"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left/Right Lightbox Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#00355D] transition-colors border border-white/20 z-[110]"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#00355D] transition-colors border border-white/20 z-[110]"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Lightbox Image Container */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Stop click on image from closing
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={current.url} // re-triggers animation when changing img inside lightbox
                  src={current.url}
                  alt={current.alt || "Fullscreen Image"}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl select-none"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
