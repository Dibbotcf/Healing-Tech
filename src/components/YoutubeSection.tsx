"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface YoutubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  pubDate: string;
}

export function YoutubeSection() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channelId = "UChDk8dlzuE-Togr_T2_vHfg";
    const rssUrl = encodeURIComponent(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    );
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.items) {
          const vids: YoutubeVideo[] = data.items.slice(0, 6).map((item: any) => {
            const videoId = item.link.split("v=")[1]?.split("&")[0];
            return {
              id: videoId,
              title: item.title,
              thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "",
            };
          });
          setVideos(vids);
          if (vids.length > 0) setActiveId(vids[0].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || videos.length === 0) return null;

  const activeVideo = videos.find((v) => v.id === activeId) ?? videos[0];
  const otherVideos = videos.filter((v) => v.id !== activeId);

  return (
    <section className="mb-16 px-0">
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full mb-4">
          <svg className="w-4 h-4 text-red-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">YouTube</span>
        </div>
        <h2 className="font-['Inter'] text-2xl md:text-3xl font-bold text-[#00355D] mb-3 tracking-tighter">
          Watch Us in Action
        </h2>
        <p className="text-sm text-[#575B5F] max-w-xl mx-auto">
          Discover our products, clinical installations, and expert insights — straight from our channel.
        </p>
      </motion.div>

      {/* ── Main Layout: Featured + Playlist ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start max-w-4xl mx-auto"
      >
        {/* ── LEFT: Featured large player ── */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
            style={{ paddingTop: "56.25%" /* 16:9 */ }}
          >
            <iframe
              key={activeId}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeId}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Video title under player */}
          <div className="px-1">
            <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-1">
              Now Playing
            </p>
            <h3 className="font-['Inter'] text-lg font-bold text-[#00355D] leading-snug line-clamp-2">
              {activeVideo.title}
            </h3>
            {activeVideo.pubDate && (
              <p className="text-sm text-[#575B5F] mt-1">{activeVideo.pubDate}</p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Playlist ── */}
        <div className="flex flex-col gap-2 lg:col-span-2 lg:max-h-[360px] lg:overflow-y-auto pr-1">
          <p className="text-[10px] font-black text-[#575B5F] uppercase tracking-[0.15em] mb-1 px-1">
            More Videos
          </p>
          {otherVideos.map((video, i) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => {
                setActiveId(video.id);
                // Scroll to top of section on mobile
                if (window.innerWidth < 1024) {
                  document.getElementById("yt-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="group flex gap-3 items-start text-left w-full p-3 rounded-xl hover:bg-[#EEF4FB] transition-all duration-200 border border-transparent hover:border-[#12B5CB]/20"
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-28 rounded-lg overflow-hidden aspect-video bg-gray-200 shadow-sm">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-semibold text-[#00355D] leading-snug line-clamp-3 group-hover:text-[#12B5CB] transition-colors">
                  {video.title}
                </p>
                {video.pubDate && (
                  <p className="text-xs text-[#575B5F] mt-1">{video.pubDate}</p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── Subscribe CTA ── */}
      <div className="mt-10 text-center">
        <a
          href="https://www.youtube.com/@HealingTechnology"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:shadow-red-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Subscribe to our Channel
        </a>
      </div>
    </section>
  );
}
