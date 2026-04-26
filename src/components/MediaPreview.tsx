"use client";
import React from 'react';
import { useFormFields } from '@payloadcms/ui';
import { getMediaUrl } from '@/lib/getMediaUrl';

export function MediaPreview() {
  const urlField = useFormFields(([fields]) => fields.url);
  const mimeTypeField = useFormFields(([fields]) => fields.mimeType);

  if (!urlField?.value || !mimeTypeField?.value) return null;

  const url = getMediaUrl(String(urlField.value));
  const mimeType = String(mimeTypeField.value);

  if (mimeType.startsWith('video/')) {
    return (
      <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
        <video 
          src={url} 
          style={{ width: '100%', display: 'block', maxHeight: '300px', objectFit: 'contain', backgroundColor: '#000' }} 
          controls
          playsInline 
        />
      </div>
    );
  }

  // We only intercept video previews; let Payload handle image previews naturally if we want, 
  // but since we're replacing the preview field entirely, we should render images too.
  if (mimeType.startsWith('image/')) {
    return (
      <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
        <img 
          src={url} 
          alt="Preview" 
          style={{ width: '100%', display: 'block', maxHeight: '300px', objectFit: 'contain', backgroundColor: '#111' }} 
        />
      </div>
    );
  }

  return null;
}
