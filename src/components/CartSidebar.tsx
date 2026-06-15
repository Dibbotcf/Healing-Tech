"use client";

import { useEffect, useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CartSidebar({ isOpen, setIsOpen }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#00355D]">
            <ShoppingBag className="w-5 h-5 font-bold" />
            <h2 className="text-lg font-bold">Your Cart</h2>
            <span className="bg-[#12B5CB] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ml-1">
              {getTotalItems()}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
              <p className="text-lg font-bold text-[#00355D] mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-[#12B5CB] text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-tight hover:bg-[#009EE2] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const img = getMediaUrl(item.product.heroImage?.url) || '/logo-dark.svg';
                const currentPrice = item.product.discountPrice ?? item.product.price ?? 0;
                
                return (
                  <div key={item.product.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={item.product.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-sm font-bold text-[#00355D] leading-tight line-clamp-2">{item.product.name}</h3>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors mt-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-sm font-bold text-[#12B5CB] mb-2 mt-auto text-lg">
                        ৳{currentPrice.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-l-lg transition-colors"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <div className="w-8 flex items-center justify-center text-sm font-semibold text-[#00355D]">
                            {item.quantity}
                          </div>
                          <button 
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-r-lg transition-colors"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-[#00355D]">৳{getTotalPrice().toLocaleString()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#00355D] hover:bg-[#12B5CB] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
        
        {/* Invoice / Track tracking */}
        <div className="p-5 bg-white border-t border-gray-100 flex items-center justify-center">
            <Link href="/track-order" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-[#575B5F] hover:text-[#12B5CB] underline transition-colors">
               Track Order or Check Invoice Status
            </Link>
        </div>
      </div>
    </>
  );
}
