"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight, Play, Images } from "lucide-react";
import { getMediaUrl } from "@/lib/getMediaUrl";

/* ─── Types ────────────────────────────────────────────────────── */
interface GalleryPost {
  id: string;
  title: string;
  caption?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  image?: { url?: string; alt?: string; filename?: string };
}

interface GalleryVideo {
  id: string;
  title: string;
  description?: string;
  embedUrl?: string;
  sortOrder?: number;
  thumbnail?: { url?: string; alt?: string };
  videoFile?: { url?: string; filename?: string; mimeType?: string };
}

/* ─── Skeleton ──────────────────────────────────────────────────── */
function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-gray-100 animate-pulse rounded-2xl ${className}`} />;
}

/* ─── Video Modal ───────────────────────────────────────────────── */
function VideoModal({ video, onClose }: { video: GalleryVideo; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Determine what to render: prefer uploaded video file over embed URL
  const videoFileUrl = video.videoFile?.url ? getMediaUrl(video.videoFile.url) : null;
  const embedSrc = video.embedUrl
    ? (video.embedUrl.includes('youtube-nocookie.com') || video.embedUrl.includes('youtube.com/embed') || video.embedUrl.includes('vimeo.com')
        ? video.embedUrl + (video.embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1')
        : video.embedUrl + (video.embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1'))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video bg-black">
          {videoFileUrl ? (
            // Uploaded video — use native HTML5 player
            <video
              src={videoFileUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          ) : embedSrc ? (
            // Embed URL — use YouTube Privacy-Enhanced iframe
            <iframe
              src={embedSrc}
              title={video.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
              No video source configured.
            </div>
          )}
        </div>
        <div className="p-5 bg-[#001729]">
          <h3 className="text-white font-bold text-lg">{video.title}</h3>
          {video.description && <p className="text-white/60 text-sm mt-1">{video.description}</p>}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function GalleryPage() {
  const [posts, setPosts]           = useState<GalleryPost[]>([]);
  const [videos, setVideos]         = useState<GalleryVideo[]>([]);
  const [loadingPosts, setLoadingPosts]   = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [lightboxIdx, setLightboxIdx]     = useState<number | null>(null);
  const [activeVideo, setActiveVideo]     = useState<GalleryVideo | null>(null);

  useEffect(() => {
    fetch("/x-api/gallery-posts-list")
      .then((r) => r.json())
      .then((d) => setPosts(d.docs ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoadingPosts(false));

    fetch("/x-api/gallery-videos-list")
      .then((r) => r.json())
      .then((d) => setVideos(d.docs ?? []))
      .catch(() => setVideos([]))
      .finally(() => setLoadingVideos(false));
  }, []);

  const openLightbox  = useCallback((i: number) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(() => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIdx((i) => (i !== null && i < posts.length - 1 ? i + 1 : i)), [posts.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxIdx, closeLightbox, prev, next]);

  const lightboxPost = lightboxIdx !== null ? posts[lightboxIdx] : null;
  const featured = posts.filter((p) => p.isFeatured);

  return (
    <div className="w-full bg-white font-['Inter'] tracking-tight">

      {/* ── HERO ── */}
      <section className="relative w-full h-[70vh] min-h-[520px] max-h-[740px] overflow-hidden">
        <Image
          src="/gallery-hero.jpg"
          alt="Healing Technology Gallery"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00355D]/90 via-[#00355D]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-8 max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.18em] mb-5">Gallery</p>
            <h1 className="text-4xl md:text-[72px] font-bold text-white tracking-[-0.04em] leading-[1.05] mb-6 max-w-2xl">
              Our Journey<br />in Action.
            </h1>
            <p className="text-white/75 text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-10">
              Explore how we deliver innovation and impact across healthcare environments.
            </p>
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[{ n: "200+", l: "Installations" }, { n: "50+", l: "Hospital Partners" }, { n: "8", l: "Years of Service" }, { n: "64", l: "Districts Reached" }].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{s.n}</span>
                  <span className="text-xs text-white/60 font-semibold uppercase tracking-wider mt-1">{s.l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MASONRY GALLERY ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto pt-20 pb-24">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-3">Photo Gallery</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em]">Moments That Matter.</h2>
        </motion.div>

        {loadingPosts ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={`break-inside-avoid mb-4 ${i % 3 === 0 ? "h-80" : "h-56"}`} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[#F0F7F4] rounded-2xl flex items-center justify-center mb-4">
              <Images className="w-8 h-8 text-[#12B5CB]" />
            </div>
            <h3 className="text-xl font-bold text-[#00355D] mb-2">No gallery images yet</h3>
            <p className="text-[#575B5F]">Gallery images will appear here once added.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {posts.map((post, i) => {
              const src = getMediaUrl(post.image?.url);
              const isEven = i % 3 === 0;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer bg-[#EEF2F7]"
                  style={{ height: isEven ? 360 : 260 }}
                  onClick={() => openLightbox(i)}
                >
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={post.image?.alt || post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F8] to-[#D0E8EF] flex items-center justify-center">
                      <Images className="w-10 h-10 text-[#12B5CB]/40" />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#00355D]/0 group-hover:bg-[#00355D]/75 transition-all duration-400 flex flex-col justify-end p-5">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <h3 className="text-white font-bold text-sm leading-snug mb-1">{post.title}</h3>
                      {post.caption && <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{post.caption}</p>}
                    </div>
                  </div>
                  {post.isFeatured && (
                    <div className="absolute top-3 left-3 bg-[#12B5CB] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Featured</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── FEATURED HIGHLIGHTS ── */}
      {featured.length > 0 && (
        <section className="bg-[#F8F9FA] border-y border-gray-200 py-24">
          <div className="px-6 lg:px-8 max-w-[1440px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-3">Featured</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em]">Highlights.</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post, i) => {
                const src = getMediaUrl(post.image?.url);
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => openLightbox(posts.indexOf(post))}
                  >
                    <div className="relative h-48 bg-[#EEF2F7] overflow-hidden">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={post.image?.alt || post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center"><Images className="w-8 h-8 text-[#12B5CB]/40" /></div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#00355D] mb-2 group-hover:text-[#12B5CB] transition-colors">{post.title}</h3>
                      {post.caption && <p className="text-[#575B5F] text-sm leading-relaxed line-clamp-3">{post.caption}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── VIDEO SECTION ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto py-24 border-b border-gray-100">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-[#12B5CB] text-xs font-bold uppercase tracking-[0.15em] mb-3">In Motion</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00355D] tracking-[-0.03em]">See It Live.</h2>
        </motion.div>

        {loadingVideos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-[#F0F7F4] rounded-2xl flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-[#12B5CB]" />
            </div>
            <h3 className="text-xl font-bold text-[#00355D] mb-2">No videos yet</h3>
            <p className="text-[#575B5F]">Videos will appear here once added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((video, i) => {
              const thumbSrc = getMediaUrl(video.thumbnail?.url);
              const videoFileSrc = video.videoFile?.url ? getMediaUrl(video.videoFile.url) : null;
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group bg-[#001729]"
                  style={{ height: 260 }}
                  onClick={() => setActiveVideo(video)}
                >
                  {/* Thumbnail: prefer uploaded video poster > custom thumbnail > gradient */}
                  {videoFileSrc ? (
                    <video
                      src={videoFileSrc}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : thumbSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumbSrc} alt={video.thumbnail?.alt || video.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" loading="lazy" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#001729] to-[#00355D]" />
                  )}
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#12B5CB] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-bold text-base leading-snug">{video.title}</h3>
                    {video.description && <p className="text-white/60 text-sm mt-0.5 line-clamp-1">{video.description}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-8 max-w-[1440px] mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#00355D] rounded-3xl px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 bg-[#12B5CB]" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 bg-[#12B5CB]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.03em] mb-3">Interested in our solutions?</h2>
            <p className="text-white/70 text-lg max-w-lg">Let our team walk you through our full product range and installation capabilities.</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="group flex items-center gap-2 bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Request a Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 border border-white/20"
            >
              View Products
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxPost && lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="w-full h-72 md:h-[420px] relative bg-[#EEF2F7]">
                {getMediaUrl(lightboxPost.image?.url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getMediaUrl(lightboxPost.image?.url)!}
                    alt={lightboxPost.image?.alt || lightboxPost.title}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><Images className="w-12 h-12 text-[#12B5CB]/30" /></div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-[#00355D] mb-2">{lightboxPost.title}</h3>
                {lightboxPost.caption && <p className="text-[#575B5F] leading-relaxed">{lightboxPost.caption}</p>}
              </div>

              {/* Prev/Next */}
              {lightboxIdx > 0 && (
                <button onClick={prev} className="absolute left-3 top-[40%] -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                  <ChevronLeft className="w-5 h-5 text-[#00355D]" />
                </button>
              )}
              {lightboxIdx < posts.length - 1 && (
                <button onClick={next} className="absolute right-3 top-[40%] -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                  <ChevronRight className="w-5 h-5 text-[#00355D]" />
                </button>
              )}

              {/* Close */}
              <button onClick={closeLightbox} className="absolute top-3 right-3 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all">
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Counter */}
              <div className="absolute top-3 left-3 bg-black/40 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {lightboxIdx + 1} / {posts.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO MODAL ── */}
      <AnimatePresence>
        {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </div>
  );
}
