"use client";

import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductClientActions({ product }: { product: any }) {
  const { addItem, items } = useCartStore();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  // Convert Payload product type to the Cart item type we designed
  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    heroImage: product.heroImage,
    slug: product.slug,
  };

  const isAlreadyInCart = items.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    if (!isAlreadyInCart) {
      addItem(cartProduct, 1);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    if (!isAlreadyInCart) {
      addItem(cartProduct, 1);
    }
    router.push("/checkout");
  };

  return (
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
  );
}
