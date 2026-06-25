"use client";

import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart, Zap, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { SmartDescription } from "@/components/SmartDescription";
import { BrandPopupCard } from "@/components/BrandPopupCard";

interface Props {
  product: any;
  brand?: any;
  brandLogoUrl?: string | null;
}

export function ProductClientActions({ product, brand, brandLogoUrl }: Props) {
  const { addItem, removeItem, items } = useCartStore();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  // null = no size selected (show base price) — initial state always unselected
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number | null>(null);

  const selectedSize = hasSizes && selectedSizeIdx !== null ? product.sizes[selectedSizeIdx] : null;
  const selectedSizeName = selectedSize?.name ?? null;
  const selectedSizePrice = selectedSize
    ? (selectedSize.discount_price ?? selectedSize.price)
    : null;
  const selectedSizeSku = selectedSize?.sku ?? null;

  // When a size is selected use its price; otherwise fall back to base product price
  const displayPrice = selectedSize
    ? (selectedSize.discount_price ?? selectedSize.price ?? null)
    : (product.discountPrice ?? product.price ?? null);
  const displayOriginal = selectedSize
    ? (selectedSize.discount_price != null ? selectedSize.price : null)
    : (product.discountPrice != null ? product.price : null);
  const displaySku = selectedSizeSku ?? product.sku ?? null;

  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    heroImage: product.heroImage ? { ...product.heroImage, url: getMediaUrl(product.heroImage?.url) } : undefined,
    slug: product.slug,
    sizes: product.sizes ?? null,
  };

  const isAlreadyInCart = items.some((item) => String(item.product.id) === String(product.id));

  const handleAddToCart = () => {
    if (isAlreadyInCart) {
      removeItem(String(product.id));
      return;
    }
    addItem(cartProduct, 1, selectedSizeName, selectedSizePrice);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: selectedSizePrice ?? product.discountPrice ?? product.price ?? 0,
        currency: 'BDT',
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    if (!isAlreadyInCart) {
      addItem(cartProduct, 1, selectedSizeName, selectedSizePrice);
    }
    router.push("/checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSize = (idx: number) => {
    // Click active size again → deselect and show base price
    setSelectedSizeIdx(prev => prev === idx ? null : idx);
  };

  return (
    <div className="space-y-5 w-full">

      {/* 1. Price — always at top, reactive to size selection */}
      {displayPrice != null && (
        <div className="flex items-end gap-3">
          <span className="text-4xl md:text-5xl font-extrabold text-[#12B5CB] tracking-tight">
            ৳{displayPrice.toLocaleString()}
          </span>
          {displayOriginal != null && (
            <span className="text-xl md:text-2xl text-[#575B5F]/50 line-through pb-1">
              ৳{displayOriginal.toLocaleString()}
            </span>
          )}
        </div>
      )}

      {/* 2. SKU — reactive */}
      {displaySku && (
        <p className="text-xs font-semibold text-[#575B5F] uppercase tracking-[0.1em] -mt-1">
          SKU: <span className="text-[#00355D]">{displaySku}</span>
        </p>
      )}

      {/* 3. Description */}
      {(product.listingSummary || product.shortSummary) && (
        <SmartDescription text={(product.listingSummary || product.shortSummary) as string} />
      )}

      {/* 4. Key Highlights */}
      {product.keyHighlights && product.keyHighlights.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-5 bg-white/60 rounded-2xl border border-[#00355D]/6">
          <p className="col-span-full text-[10px] font-black text-[#575B5F] uppercase tracking-[0.12em] mb-1">
            Key Highlights
          </p>
          {product.keyHighlights.map((hl: any, i: number) => (
            <div key={i} className="flex items-start gap-2.5 text-[#00355D]/80">
              <CheckCircle2 className="w-4 h-4 text-[#12B5CB] flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-snug">{hl.title || hl.item}</span>
                {hl.description && (
                  <span className="text-xs text-[#575B5F] mt-0.5 leading-snug">{hl.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Size selector — click active size to deselect */}
      {hasSizes && (
        <div>
          <p className="text-xs font-bold text-[#575B5F] uppercase tracking-widest mb-2">
            Select Size / Configuration
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s: { name: string; price: number; discount_price?: number; sku?: string }, idx: number) => (
              <button
                key={s.name}
                type="button"
                onClick={() => toggleSize(idx)}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                  selectedSizeIdx === idx
                    ? "border-[#12B5CB] bg-[#12B5CB]/10 text-[#12B5CB]"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Buttons row + Manufacturer card inline */}
      <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#00355D]/8">
        <button
          onClick={handleOrderNow}
          className="inline-flex items-center gap-2 bg-[#00355D] hover:bg-[#002543] active:bg-[#00172e] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors shadow-md hover:shadow-lg"
        >
          <Zap className="w-4 h-4" fill="currentColor" />
          Order Now
        </button>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-sm ${
            added
              ? "bg-green-500 text-white cursor-default"
              : isAlreadyInCart
              ? "bg-green-500/10 hover:bg-red-50 text-green-600 hover:text-red-500"
              : "bg-[#12B5CB]/10 hover:bg-[#12B5CB]/20 text-[#12B5CB]"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "Added!" : isAlreadyInCart ? "In Cart" : "Add to Cart"}
        </button>

        {/* Manufacturer card — inline beside buttons */}
        {brand && (
          <BrandPopupCard
            brand={{ ...brand, name: brand.name, slug: brand.slug, certificationsText: brand.certifications_text }}
            brandLogoUrl={brandLogoUrl ?? null}
          />
        )}
      </div>

    </div>
  );
}
