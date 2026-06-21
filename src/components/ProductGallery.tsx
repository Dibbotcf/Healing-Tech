"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type MediaItem = { url: string; alt?: string; mimeType?: string };

// ── Reusable swipe hook ───────────────────────────────────────────────────────
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void, threshold = 40) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only fire if horizontal swipe is dominant (not a vertical scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return { onTouchStart, onTouchEnd };
}

const PLACEHOLDER = (
  <div className="w-full aspect-square bg-white rounded-3xl flex flex-col items-center justify-center gap-4 shadow-xl shadow-[#00355D]/5 border border-[#00355D]/5">
    <div className="flex items-center justify-center gap-3 opacity-20">
      <div className="w-8 h-8 rounded-full bg-[#12B5CB]" />
      <div className="w-16 h-2 rounded-full bg-[#00355D]" />
      <div className="w-5 h-5 rounded bg-[#12B5CB]/60" />
    </div>
    <span className="text-xs text-[#00355D]/30 uppercase tracking-[0.15em] font-bold">Image Coming Soon</span>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export function ProductGallery({ images: rawImages }: { images: MediaItem[] }) {
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());
  const images = (rawImages ?? []).filter((img) => !failedUrls.has(img.url));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Keep currentIndex in bounds when images shrink (failed loads)
  useEffect(() => {
    if (currentIndex >= images.length && images.length > 0) {
      setCurrentIndex(images.length - 1);
    }
  }, [images.length, currentIndex]);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  const onImgError = (url: string) => setFailedUrls((prev) => new Set(prev).add(url));

  if (!images.length) return PLACEHOLDER;

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  const current = images[currentIndex];
  const isVideo = current.mimeType?.startsWith("video/") || /\.(mp4|webm|ogg|mov)$/i.test(current.url);
  const hasMultiple = images.length > 1;

  return (
    <GalleryInner
      images={images}
      current={current}
      currentIndex={currentIndex}
      isVideo={isVideo}
      hasMultiple={hasMultiple}
      isFullscreen={isFullscreen}
      mounted={mounted}
      next={next}
      prev={prev}
      onImgError={onImgError}
      setCurrentIndex={setCurrentIndex}
      setIsFullscreen={setIsFullscreen}
    />
  );
}

// ── Inner render (separated to cleanly use hook) ──────────────────────────────
function GalleryInner({
  images, current, currentIndex, isVideo, hasMultiple,
  isFullscreen, mounted, next, prev, onImgError, setCurrentIndex, setIsFullscreen,
}: {
  images: MediaItem[];
  current: MediaItem;
  currentIndex: number;
  isVideo: boolean;
  hasMultiple: boolean;
  isFullscreen: boolean;
  mounted: boolean;
  next: () => void;
  prev: () => void;
  onImgError: (url: string) => void;
  setCurrentIndex: (i: number) => void;
  setIsFullscreen: (v: boolean) => void;
}) {
  // Native touch swipe for main viewer
  const mainSwipe = useSwipe(next, prev);
  // Native touch swipe for lightbox
  const lightboxSwipe = useSwipe(next, prev);

  return (
    <>
      <div className="flex flex-col gap-3">

        {/* ── Main Viewer ─────────────────────────────────────────── */}
        <div
          className="w-full aspect-square bg-white rounded-3xl relative overflow-hidden shadow-xl shadow-[#00355D]/5 border border-[#00355D]/5 group touch-pan-y"
          {...(hasMultiple && !isVideo ? mainSwipe : {})}
        >
          {isVideo ? (
            <video
              key={current.url}
              src={current.url}
              autoPlay loop muted playsInline controls
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          ) : (
            <>
              {/* Clickable image to open fullscreen */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.url}
                  src={current.url}
                  alt={current.alt || `Product Image ${currentIndex + 1}`}
                  draggable={false}
                  onClick={() => setIsFullscreen(true)}
                  onError={() => onImgError(current.url)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-contain p-8 cursor-zoom-in select-none"
                />
              </AnimatePresence>

              {/* Zoom hint button — top-right corner */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                aria-label="View fullscreen"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center z-20"
              >
                <ZoomIn className="w-5 h-5 text-[#00355D]/60" />
              </button>
            </>
          )}

          {/* ── Visible arrows — always on mobile, hover on desktop ── */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                className="
                  absolute left-2 top-1/2 -translate-y-1/2 z-20
                  w-9 h-9 md:w-10 md:h-10 rounded-full
                  flex items-center justify-center
                  bg-white border-2 border-[#12B5CB] text-[#12B5CB]
                  shadow-lg active:scale-90
                  md:opacity-0 md:group-hover:opacity-100
                  transition-all duration-200 pointer-events-auto
                "
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2 z-20
                  w-9 h-9 md:w-10 md:h-10 rounded-full
                  flex items-center justify-center
                  bg-white border-2 border-[#12B5CB] text-[#12B5CB]
                  shadow-lg active:scale-90
                  md:opacity-0 md:group-hover:opacity-100
                  transition-all duration-200 pointer-events-auto
                "
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* ── Dot indicators (mobile) ── */}
          {hasMultiple && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden pointer-events-none z-20">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-5 h-1.5 bg-[#12B5CB]" : "w-1.5 h-1.5 bg-[#00355D]/25"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        {hasMultiple && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((item, i) => {
              const isVid = item.mimeType?.startsWith("video/") || /\.(mp4|webm|ogg|mov)$/i.test(item.url);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    i === currentIndex ? "border-[#12B5CB] shadow-md" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {isVid ? (
                    <div className="w-full h-full bg-[#00355D]/10 flex items-center justify-center">
                      <Play className="w-4 h-4 text-[#12B5CB]" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.alt || `Thumb ${i + 1}`} onError={() => onImgError(item.url)} className="w-full h-full object-contain p-1" draggable={false} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── FULLSCREEN LIGHTBOX ──────────────────────────────────────── */}
      {mounted && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isFullscreen && !isVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/96 backdrop-blur-md"
                onClick={() => setIsFullscreen(false)}
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                  className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white text-[#00355D] shadow-xl z-[110] active:scale-95 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Arrows */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); prev(); }}
                      className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-[110]
                        w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full
                        bg-white text-[#00355D] shadow-2xl border-2 border-[#12B5CB]
                        active:scale-90 hover:bg-[#12B5CB] hover:text-white transition-all duration-200"
                    >
                      <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); next(); }}
                      className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-[110]
                        w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full
                        bg-white text-[#00355D] shadow-2xl border-2 border-[#12B5CB]
                        active:scale-90 hover:bg-[#12B5CB] hover:text-white transition-all duration-200"
                    >
                      <ChevronRight className="w-7 h-7" />
                    </button>
                  </>
                )}

                {/* Swipe hint */}
                {hasMultiple && (
                  <div className="absolute bottom-14 left-0 right-0 flex justify-center md:hidden pointer-events-none z-[110]">
                    <span className="text-white/40 text-xs font-medium tracking-wide">← Swipe to browse →</span>
                  </div>
                )}

                {/* Dot indicators */}
                {hasMultiple && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-[110] pointer-events-none">
                    {images.map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentIndex ? "w-6 h-2 bg-[#12B5CB]" : "w-2 h-2 bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Swipeable image container */}
                <div
                  className="relative w-full h-full flex items-center justify-center p-12 md:p-20"
                  onClick={(e) => e.stopPropagation()}
                  {...(hasMultiple ? lightboxSwipe : {})}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.url}
                      src={current.url}
                      alt={current.alt || "Fullscreen Image"}
                      draggable={false}
                      onError={() => onImgError(current.url)}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="max-w-full max-h-full object-contain drop-shadow-2xl select-none pointer-events-none rounded-lg"
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
