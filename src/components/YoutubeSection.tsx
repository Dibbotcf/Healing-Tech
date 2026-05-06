"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const CHANNEL_ID = "UChDk8dlzuE-Togr_T2_vHfg";
const CHANNEL_URL = "https://www.youtube.com/@HealingTechnology";

// Hardcode a few known video IDs so we don't need an API call on load.
// Update these periodically or replace with your latest videos.
const FEATURED_VIDEOS = [
  { id: "PLACEHOLDER_1", title: "Healing Technology – Product Overview" },
  { id: "PLACEHOLDER_2", title: "OT Light Installation Demo" },
  { id: "PLACEHOLDER_3", title: "Anesthesia Machine Overview" },
];

function VideoThumbnail({ id, title, featured = false }: { id: string; title: string; featured?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden bg-black ${featured ? "shadow-2xl" : "shadow-md"}`} style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`relative w-full rounded-2xl overflow-hidden bg-black group cursor-pointer ${featured ? "shadow-2xl" : "shadow-md"}`}
      style={{ paddingTop: "56.25%" }}
      aria-label={`Play: ${title}`}
    >
      <img
        src={thumb}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        decoding="async"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`; }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
      {/* Title bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
        <p className="text-white text-sm font-semibold leading-snug line-clamp-2 text-left">{title}</p>
      </div>
    </button>
  );
}

export function YoutubeSection() {
  return (
    <section className="mb-16 px-0">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full mb-4">
          <svg className="w-4 h-4 text-red-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">YouTube</span>
        </div>
        <h2 className="font-['Inter'] text-2xl md:text-3xl font-bold text-[#00355D] mb-3 tracking-tighter">Watch Us in Action</h2>
        <p className="text-sm text-[#575B5F] max-w-xl mx-auto">Discover our products, clinical installations, and expert insights — straight from our channel.</p>
      </motion.div>

      {/* Video grid — click to play, no iframe until clicked */}
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {FEATURED_VIDEOS.map((v, i) => (
          <VideoThumbnail key={v.id} id={v.id} title={v.title} featured={i === 0} />
        ))}
      </motion.div>

      {/* Subscribe CTA */}
      <div className="mt-10 text-center">
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:shadow-red-200">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          Visit our YouTube Channel
        </a>
      </div>
    </section>
  );
}


