"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface YoutubeVideo {
  id: string;
  title: string;
}

export function YoutubeSection() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch videos via RSS to JSON
    const channelId = "UChDk8dlzuE-Togr_T2_vHfg";
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items) {
          const vids = data.items.map((item: any) => {
            const videoId = item.link.split("v=")[1];
            return {
              id: videoId,
              title: item.title,
            };
          });
          setVideos(vids);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching YouTube videos:", err);
        setLoading(false);
      });
  }, []);

  if (loading || videos.length === 0) return null;

  return (
    <div className="mb-20">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
          <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        <h2 className="font-['Inter'] text-[2.5rem] font-bold text-[#00355D] mb-4 tracking-tighter">Watch Us in Action</h2>
        <p className="text-lg text-[#575B5F] max-w-xl mx-auto font-normal">Discover our products, installations, and expert insights on our YouTube channel.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {videos.slice(0, 3).map((video, i) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative rounded-2xl overflow-hidden bg-gray-100 aspect-video shadow-sm hover:shadow-xl transition-all duration-300 ${videos.length === 1 ? 'md:col-start-2 lg:col-start-2' : ''}`}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="https://www.youtube.com/@HealingTechnology" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Subscribe to our Channel
        </a>
      </div>
    </div>
  );
}
