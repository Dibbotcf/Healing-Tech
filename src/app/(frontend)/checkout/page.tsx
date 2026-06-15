"use client";

import { useCartStore } from "@/lib/cartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ArrowRight, CheckCircle2, ChevronLeft, CreditCard, ShieldCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import { PixelInitiateCheckout, PixelPurchase } from "@/components/PixelEvents";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart, updateQuantity } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [purchasedItems, setPurchasedItems] = useState<{ id: string; quantity: number; price: number }[]>([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent, overridePaymentMethod?: string) => {
    e.preventDefault();
    setLoading(true);
    const activePaymentMethod = overridePaymentMethod ?? paymentMethod;

    try {
      const payload = {
        customer: formData,
        paymentMethod: activePaymentMethod,
        items: items.map(i => ({
          product: i.product.id,
          quantity: i.quantity,
          priceAtPurchase: i.product.discountPrice ?? i.product.price ?? 0
        })),
        totalAmount: getTotalPrice()
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setOrderResult(data);
        setPurchasedItems(items.map(i => ({ id: i.product.id, quantity: i.quantity, price: i.product.discountPrice ?? i.product.price ?? 0 })));
        setPurchaseTotal(getTotalPrice());
        clearCart();
        setOrderComplete(true);
        if (activePaymentMethod === 'sslcommerz') {
          window.open("https://invoice.sslcommerz.com/invoice-form?refer=677CB95ED7FCA", "_blank");
        } else if (activePaymentMethod === 'bkash') {
          window.open(`/payment/bkash?orderId=${data.order.orderNumber}`, "_blank");
        }

      } else {
        alert("Failed to process order: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-24 flex items-center justify-center font-['Inter']">
        <PixelPurchase items={purchasedItems} total={purchaseTotal} orderId={orderResult?.order?.orderNumber} />
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-lg w-full border border-gray-100">
          <CheckCircle2 className="w-16 h-16 text-[#12B5CB] mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#00355D] mb-4">Order Received!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your order. Your order number is <strong className="text-[#00355D]">#{orderResult?.order?.orderNumber}</strong>. Our team will review it and contact you shortly.
          </p>
          
          {orderResult?.paymentMethod === 'bkash' && (
            <div className="bg-[#E3106E]/10 border border-[#E3106E]/20 p-6 rounded-xl mb-8 text-left">
              <h3 className="font-bold text-[#E3106E] mb-2 flex items-center gap-2">
                 <CreditCard className="w-5 h-5" /> Pay via bKash
              </h3>
              <p className="text-sm text-[#E3106E]/80 font-medium">
                Please make your payment. The bKash number will be provided by our sales agent shortly. Reference your Order Number in the remarks.
              </p>
            </div>
          )}

          {orderResult?.paymentMethod === 'sslcommerz' && (
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-8">
              <h3 className="font-bold text-blue-800 mb-2">Complete Payment</h3>
              <p className="text-sm text-blue-600 mb-4">Please complete your payment securely using SSLCommerz.</p>
              <a href="https://invoice.sslcommerz.com/invoice-form?refer=677CB95ED7FCA" className="inline-block bg-[#00355D] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-sm">
                 Pay Now with SSLCommerz
              </a>
            </div>
          )}

          <Link href="/products" className="inline-block bg-[#12B5CB] hover:bg-[#009EE2] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-24 flex items-center justify-center font-['Inter']">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#00355D] mb-4">Your Cart is Empty</h1>
          <Link href="/products" className="inline-flex items-center gap-2 text-[#12B5CB] font-bold hover:underline">
            <ChevronLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-[88px] lg:pt-[96px] pb-24 font-['Inter']">
      <PixelInitiateCheckout
        items={items.map(i => ({
          id: i.product.id,
          quantity: i.quantity,
          price: i.product.discountPrice ?? i.product.price ?? 0,
        }))}
        total={getTotalPrice()}
      />
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px] mt-8">
        
        {/* Top Logo */}
        <div className="mb-8 flex items-center gap-4">
           <Image src="/logo-dark.svg" alt="Healing Technology" width={220} height={48} className="object-contain" />
           <div className="h-8 w-px bg-gray-200"></div>
           <h1 className="text-2xl font-bold text-[#00355D] tracking-tight">Secure Checkout</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#111111] mb-6 border-b border-gray-100 pb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-[#575B5F] uppercase mb-1.5">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#12B5CB] focus:ring-1 focus:ring-[#12B5CB] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#575B5F] uppercase mb-1.5">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#12B5CB] focus:ring-1 focus:ring-[#12B5CB] outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-[#575B5F] uppercase mb-1.5">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#12B5CB] focus:ring-1 focus:ring-[#12B5CB] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#575B5F] uppercase mb-1.5">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#12B5CB] focus:ring-1 focus:ring-[#12B5CB] outline-none transition-all" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold text-[#575B5F] uppercase mb-1.5">Delivery Address</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#12B5CB] focus:ring-1 focus:ring-[#12B5CB] outline-none transition-all resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#575B5F] uppercase mb-1.5">City / District</label>
                <input required name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#12B5CB] focus:ring-1 focus:ring-[#12B5CB] outline-none transition-all" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#111111] mb-6 border-b border-gray-100 pb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'sslcommerz' ? 'border-[#00355D] bg-[#00355D]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="sslcommerz" checked={paymentMethod === 'sslcommerz'} onChange={() => setPaymentMethod('sslcommerz')} className="w-4 h-4 text-[#00355D] focus:ring-[#00355D]" />
                    <span className="font-bold text-[#00355D]">SSLCommerz Secure Payment</span>
                  </div>
                </label>
                
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'bkash' ? 'border-[#E3106E] bg-[#E3106E]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="bkash" checked={paymentMethod === 'bkash'} onChange={() => setPaymentMethod('bkash')} className="w-4 h-4 text-[#E3106E] focus:ring-[#E3106E]" />
                    <span className="font-bold text-[#E3106E]">bKash Transfer</span>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#12B5CB] bg-[#12B5CB]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-[#12B5CB] focus:ring-[#12B5CB]" />
                    <span className="font-bold text-[#00355D]">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
              <h2 className="text-xl font-bold text-[#111111] mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => {
                   const img = getMediaUrl(item.product.heroImage?.url) || '/logo-dark.svg';
                   const currentPrice = item.product.discountPrice ?? item.product.price ?? 0;
                   return (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={item.product.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <h4 className="text-sm font-bold text-[#00355D] truncate">{item.product.name}</h4>
                        
                        {/* Quantity Adjusters */}
                        <div className="flex items-center gap-2 mt-1">
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-gray-50 rounded text-gray-500 hover:bg-gray-200 transition-colors text-xs font-bold">-</button>
                          <span className="text-xs font-semibold text-[#00355D] w-4 text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-50 rounded text-gray-500 hover:bg-gray-200 transition-colors text-xs font-bold">+</button>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-[#111111]">
                        ৳{(currentPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 font-medium text-sm">Subtotal</span>
                  <span className="font-bold text-[#00355D]">৳{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 font-medium text-sm">Shipping</span>
                  <span className="font-bold text-green-600 text-sm">Calculated at next step</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-[#111111]">Total</span>
                  <span className="text-2xl font-extrabold text-[#12B5CB]">৳{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#00355D] hover:bg-[#12B5CB] text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : (
                    <>
                      <ShieldCheck className="w-5 h-5" /> 
                      Confirm & {paymentMethod === 'cod' ? 'Place Order' : 'Pay via ' + (paymentMethod === 'bkash' ? 'bKash' : 'SSLCommerz')}
                    </>
                  )}
                </button>
                
                {paymentMethod !== 'cod' && (
                  <button 
                    type="button"
                    onClick={(e) => handleSubmit(e, 'pay-later')}
                    disabled={loading}
                    className="w-full bg-white border-2 border-gray-100 hover:border-[#12B5CB] text-[#575B5F] hover:text-[#12B5CB] font-bold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                     Submit & Pay Later
                  </button>
                )}
              </div>
              
              <div className="mt-4 text-center">
                 <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                   <ShieldCheck className="w-3.5 h-3.5 text-green-600/80" /> Secure checkout powered by Healing Technology
                 </p>
              </div>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
