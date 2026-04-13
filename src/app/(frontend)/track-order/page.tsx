"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileText, Search, ArrowRight, ShieldCheck } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setLoading(true);
    // In a real app we might verify if it exists first via API,
    // but here we can just route them to the invoice page since
    // the invoice page will show a 404 Not Found if it doesn't exist.
    router.push(`/invoice/${orderNumber.trim()}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pt-32 pb-24 font-['Inter'] px-4">
      <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full text-center relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#12B5CB]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-20 h-20 bg-[#00355D]/5 rounded-full flex items-center justify-center mx-auto mb-8 relative">
           <FileText className="w-8 h-8 text-[#00355D]" />
           <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#12B5CB] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
             <Search className="w-4 h-4 text-white" />
           </div>
        </div>
        
        <h1 className="text-3xl font-bold text-[#111111] mb-3 tracking-tight">Track Your Order</h1>
        <p className="text-[#575B5F] mb-10 text-sm">
          Enter your Order Number (e.g., ORD-2026...) below to view your official invoice, payment status, and track delivery.
        </p>

        <form onSubmit={handleTrack} className="space-y-4 text-left relative z-10">
           <div>
             <label className="block text-xs font-bold text-[#575B5F] uppercase mb-2 tracking-widest pl-1">Order Number</label>
             <input 
               type="text" 
               required
               placeholder="ORD-YYYYMMDD-XXXX"
               value={orderNumber}
               onChange={(e) => setOrderNumber(e.target.value)}
               className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-5 py-4 text-base focus:border-[#12B5CB] focus:ring-2 focus:ring-[#12B5CB]/20 outline-none transition-all font-semibold tracking-wide" 
             />
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-[#00355D] hover:bg-[#12B5CB] text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {loading ? "Searching..." : (
               <>
                 Find My Invoice <ArrowRight className="w-4 h-4" />
               </>
             )}
           </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
           <ShieldCheck className="w-4 h-4" /> Secure Order Tracking
        </div>
      </div>
    </div>
  );
}
