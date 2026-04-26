"use client";
import React from 'react';
import { getMediaUrl } from '@/lib/getMediaUrl';

export function MediaThumbnailCell({ rowData }: { rowData: any }) {
  if (!rowData) return null;

  const url = rowData.url ? getMediaUrl(rowData.url) : '';

  // Render a mini video player for video files
  if (rowData.mimeType && rowData.mimeType.startsWith('video/')) {
    return (
      <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#111' }}>
        <video 
          src={url} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          muted 
          playsInline 
          loop
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      </div>
    );
  }
  
  // Render an image for image files
  if (rowData.mimeType && rowData.mimeType.startsWith('image/')) {
    return (
      <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
        <img 
          src={url} 
          alt={rowData.alt || rowData.filename} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

  // Fallback for PDFs or other files
  return (
    <div style={{ width: '50px', height: '50px', borderRadius: '4px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>
      DOC
    </div>
  );
}
