"use client";

import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getMediaUrl } from "@/lib/getMediaUrl";

export function ProductClientActions({ product }: { product: any }) {
  const { addItem, items } = useCartStore();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState<string | null>(
    hasSizes ? product.sizes[0].name : null
  );
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | null>(
    hasSizes ? product.sizes[0].price : null
  );

  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    heroImage: product.heroImage ? { ...product.heroImage, url: getMediaUrl(product.heroImage?.url) } : undefined,
    slug: product.slug,
    sizes: product.sizes ?? null,
  };

  const isAlreadyInCart = items.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    if (!isAlreadyInCart) {
      addItem(cartProduct, 1, selectedSize, selectedSizePrice);
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'AddToCart', {
          content_ids: [product.id],
          content_name: product.name,
          content_type: 'product',
          value: selectedSizePrice ?? product.discountPrice ?? product.price ?? 0,
          currency: 'BDT',
        });
      }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    if (!isAlreadyInCart) {
      addItem(cartProduct, 1, selectedSize, selectedSizePrice);
    }
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      {/* Size selector */}
      {hasSizes && (
        <div>
          <p className="text-xs font-bold text-[#575B5F] uppercase tracking-widest mb-2">
            Select Size / Configuration
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s: { name: string; price: number }) => (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setSelectedSize(s.name);
                  setSelectedSizePrice(s.price);
                }}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                  selectedSize === s.name
                    ? "border-[#12B5CB] bg-[#12B5CB]/10 text-[#12B5CB]"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {s.name}
                <span className="ml-1.5 text-xs font-extrabold">
                  ৳{s.price.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleOrderNow}
          className="inline-flex items-center gap-2 bg-[#00355D] hover:bg-[#002543] active:bg-[#00172e] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors shadow-md hover:shadow-lg"
        >
          <Zap className="w-4 h-4" fill="currentColor" />
          Order Now
        </button>

        <button
          onClick={handleAddToCart}
          disabled={added || isAlreadyInCart}
          className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-sm ${
            added || isAlreadyInCart
              ? "bg-green-500 text-white cursor-default"
              : "bg-[#12B5CB]/10 hover:bg-[#12B5CB]/20 text-[#12B5CB]"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "Added!" : isAlreadyInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
