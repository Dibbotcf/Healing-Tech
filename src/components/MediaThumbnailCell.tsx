"use client";
import React, { useRef, useEffect, useState } from 'react';

function getMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return url;
  }
}

export function MediaThumbnailCell({ rowData }: { rowData: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbReady, setThumbReady] = useState(false);

  // rowData is the full Payload document for this media row
  const doc = rowData ?? {};
  const url = getMediaUrl(doc.url);
  const mimeType: string = doc.mimeType ?? '';
  const filename: string = doc.filename ?? doc.alt ?? '';

  // Force the video to seek to frame 1 for a visible thumbnail
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 1;
  }, [url]);

  // ── Video ──────────────────────────────────────────────────
  if (mimeType.startsWith('video/')) {
    return (
      <div
        style={{
          width: 64,
          height: 48,
          borderRadius: 6,
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
          position: 'relative',
          flexShrink: 0,
          border: '1px solid #333',
          cursor: 'pointer',
        }}
        title={filename}
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 1;
          }
        }}
      >
        <video
          ref={videoRef}
          src={url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            // Seek to 1 second or 10% of the video for a better thumbnail
            const vid = e.currentTarget;
            vid.currentTime = Math.min(1, vid.duration * 0.1);
            setThumbReady(true);
          }}
        />
        {/* Play icon overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.35)',
            opacity: thumbReady ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    );
  }

  // ── Image ──────────────────────────────────────────────────
  if (mimeType.startsWith('image/')) {
    return (
      <div
        style={{
          width: 64,
          height: 48,
          borderRadius: 6,
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
          flexShrink: 0,
          border: '1px solid #e0e0e0',
        }}
        title={filename}
      >
        <img
          src={url}
          alt={filename}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  // ── PDF / other ────────────────────────────────────────────
  const ext = filename.split('.').pop()?.toUpperCase() ?? 'FILE';
  return (
    <div
      style={{
        width: 64,
        height: 48,
        borderRadius: 6,
        backgroundColor: '#1a1a2e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8888aa',
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.05em',
        border: '1px solid #333',
        gap: 3,
      }}
      title={filename}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      {ext}
    </div>
  );
}
