'use client';

import { useEffect } from 'react';

interface ViewContentProps {
  id: string;
  name: string;
  price?: number | null;
  discountPrice?: number | null;
  category?: string;
}

export function PixelViewContent({ id, name, price, discountPrice, category }: ViewContentProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_ids: [id],
        content_name: name,
        content_type: 'product',
        content_category: category ?? '',
        value: discountPrice ?? price ?? 0,
        currency: 'BDT',
      });
    }
  }, [id]);

  return null;
}

interface InitiateCheckoutProps {
  items: { id: string; quantity: number; price: number }[];
  total: number;
}

export function PixelInitiateCheckout({ items, total }: InitiateCheckoutProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq && items.length > 0) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_ids: items.map(i => i.id),
        contents: items.map(i => ({ id: i.id, quantity: i.quantity })),
        num_items: items.length,
        value: total,
        currency: 'BDT',
      });
    }
  }, []);

  return null;
}
