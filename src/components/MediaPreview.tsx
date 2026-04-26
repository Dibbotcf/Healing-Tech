"use client";
import React from 'react';

function getMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return url ?? '';
  }
}

/**
 * MediaPreview — rendered in the sidebar of the Media edit document.
 * Payload passes `data` (the full document) as a prop to Field components.
 */
export function MediaPreview({ data }: { data?: any }) {
  // `data` contains the full media document when editing an existing record.
  // On "Create New" it may be empty.
  if (!data?.url) return null;

  const url = getMediaUrl(data.url);
  const mimeType: string = data.mimeType ?? '';
  const filename: string = data.filename ?? '';

  // ── Video preview ──────────────────────────────────────────
  if (mimeType.startsWith('video/')) {
    return (
      <div
        style={{
          marginBottom: 20,
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid #2a2a3a',
          background: '#000',
        }}
      >
        {/* File name banner */}
        <div
          style={{
            padding: '8px 12px',
            fontSize: 11,
            color: '#888',
            background: '#111',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#6366f1">
            <path d="M8 5v14l11-7z" />
          </svg>
          {filename}
        </div>
        <video
          src={url}
          style={{
            width: '100%',
            display: 'block',
            maxHeight: 280,
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  // ── Image preview ──────────────────────────────────────────
  if (mimeType.startsWith('image/')) {
    return (
      <div
        style={{
          marginBottom: 20,
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid #2a2a3a',
          background: '#111',
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            fontSize: 11,
            color: '#888',
            background: '#111',
            borderBottom: '1px solid #222',
          }}
        >
          {filename}
        </div>
        <img
          src={url}
          alt={filename}
          style={{
            width: '100%',
            display: 'block',
            maxHeight: 280,
            objectFit: 'contain',
            backgroundColor: '#111',
          }}
        />
      </div>
    );
  }

  return null;
}
