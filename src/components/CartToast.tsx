"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X, Zap } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { getMediaUrl } from "@/lib/getMediaUrl";
import Image from "next/image";

export default function CartToast() {
  const { lastAdded, clearLastAdded } = useCartStore();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!lastAdded) return;

    // Reset any previous dismiss timer
    if (timerRef.current) clearTimeout(timerRef.current);
    setExiting(false);
    setVisible(true);

    timerRef.current = setTimeout(() => dismiss(), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAdded]);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => { setVisible(false); clearLastAdded(); setExiting(false); }, 400);
  };

  if (!visible || !lastAdded) return null;

  const product = lastAdded.product;
  const imgUrl = product.heroImage?.url ? getMediaUrl(product.heroImage.url) : null;
  const price = product.discountPrice ?? product.price ?? null;

  return (
    <div
      className={`fixed bottom-24 right-4 z-[9999] w-[320px] max-w-[calc(100vw-2rem)] transition-all duration-400 ease-out
        ${exiting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
      `}
      style={{ animation: exiting ? undefined : "cartToastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-[#12B5CB]/20 rounded-t-2xl overflow-hidden">
        <div
          className="h-full bg-[#12B5CB] rounded-t-2xl"
          style={{ animation: "cartToastProgress 5s linear forwards" }}
        />
      </div>

      <div className="bg-white rounded-b-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-[#00355D]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#12B5CB] flex items-center justify-center">
              <ShoppingCart className="w-3 h-3 text-white" />
            </div>
            <span className="text-white text-xs font-bold tracking-wide">Added to Cart</span>
          </div>
          <button onClick={dismiss} className="text-white/60 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3 flex items-center gap-3">
          {imgUrl ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F8F9FA] flex-shrink-0 border border-gray-100">
              <Image src={imgUrl} alt={product.name} width={56} height={56} className="w-full h-full object-contain p-1" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-[#EEF4FB] flex-shrink-0 flex items-center justify-center border border-[#12B5CB]/10">
              <span className="text-[#12B5CB] font-bold text-lg">{product.name.substring(0, 2)}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[#111111] font-bold text-sm leading-tight line-clamp-2">{product.name}</p>
            {price !== null && (
              <p className="text-[#12B5CB] font-bold text-sm mt-0.5">৳{price.toLocaleString()}</p>
            )}
            <p className="text-gray-400 text-xs mt-0.5">Please confirm your order</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-3 flex gap-2">
          <button
            onClick={dismiss}
            className="flex-1 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => { dismiss(); router.push("/checkout"); }}
            className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#00355D] hover:bg-[#12B5CB] text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
          >
            <Zap className="w-3 h-3" fill="currentColor" /> Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
