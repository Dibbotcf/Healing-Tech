"use client";

import { CheckCircle2, ShieldCheck, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function BkashPaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'Your Order Number';

  return (
    <div className="bg-white p-10 rounded-2xl shadow-md border border-[#E3106E]/20 text-center max-w-md w-full relative overflow-hidden">
      <div className="flex items-center justify-center mb-6">
         <Image src="/healing technology logo SVG-04.svg" alt="Healing Technology" width={150} height={40} className="object-contain filter brightness-0" />
      </div>
      
      <div className="w-16 h-16 bg-[#E3106E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
         <CheckCircle2 className="w-8 h-8 text-[#E3106E]" />
      </div>
      
      <h1 className="text-2xl font-bold text-[#E3106E] mb-2 tracking-tight">bKash Payment</h1>
      <p className="text-[#575B5F] mb-6 text-sm">
        To complete your order, please MAKE PAYMENT for the exact amount using bKash.
      </p>

      {/* QR Code Section */}
      <div className="bg-[#F8F9FA] rounded-xl p-4 mb-6 border border-gray-100 flex flex-col items-center justify-center">
         <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Scan to Pay</p>
         <div className="w-32 h-32 relative bg-white border border-gray-200 rounded-lg p-2 mb-2">
            {/* The user will need to place their QR code image at public/bkash-qr.jpeg */}
            <Image src="/bkash-qr.jpeg" alt="bKash QR Code" fill className="object-contain" />
         </div>
      </div>

      <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-5 mb-8 text-left">
         <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Make Payment To (Merchant)</p>
         <p className="text-3xl font-extrabold text-[#E3106E] mb-4 4tracking-widest">01898876700</p>
         
         <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Reference</p>
         <p className="text-lg font-bold text-[#12B5CB]">{orderId}</p>
      </div>

      <Link href={`/submit-evidence?orderId=${orderId}`} className="flex items-center justify-center gap-2 w-full bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold py-3.5 rounded-full shadow-md transition-colors text-sm">
         <UploadCloud className="w-4 h-4" /> Submit Payment Evidence
      </Link>

      <p className="mt-5 text-[10px] text-gray-400 flex items-center justify-center gap-1.5 uppercase font-bold tracking-widest">
         <ShieldCheck className="w-3.5 h-3.5" /> Secure Transaction
      </p>
    </div>
  );
}

export default function BkashPaymentPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-['Inter'] p-4">
      <Suspense fallback={<div>Loading...</div>}>
         <BkashPaymentContent />
      </Suspense>
    </div>
  );
}
