"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { UploadCloud, CheckCircle2, FileText, ArrowRight, X } from "lucide-react";
import Link from "next/link";

function SubmitEvidenceContent() {
  const searchParams = useSearchParams();
  const rawOrderId = searchParams.get('orderId') || '';
  
  const [orderNumber, setOrderNumber] = useState(rawOrderId);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (selected.size > 5 * 1024 * 1024) {
        setErrorMsg("File must be smaller than 5MB");
        return;
      }
      setFile(selected);
      setErrorMsg('');
      if (selected.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selected));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber) {
      setErrorMsg("Order number is required");
      return;
    }
    if (!file) {
      setErrorMsg("Please upload your payment screenshot or document");
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append("orderNumber", orderNumber);
      formData.append("file", file);

      const res = await fetch("/api/submit-evidence", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to submit evidence");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full text-center relative overflow-hidden">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
           <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">Evidence Submitted!</h1>
        <p className="text-[#575B5F] mb-8 text-sm">
          Your payment evidence has been attached to order #{orderNumber}. Our team will review it shortly to confirm your payment.
        </p>
        <Link href={`/products`} className="w-full bg-[#00355D] hover:bg-[#12B5CB] text-white font-bold py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
           Return to Product Page <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full relative overflow-hidden text-center">
      <div className="flex items-center justify-center mb-8">
         <Image src="/healing technology logo SVG-04.svg" alt="Healing Technology" width={180} height={40} className="object-contain filter brightness-0" />
      </div>

      <h1 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">Submit Payment Evidence</h1>
      <p className="text-[#575B5F] mb-8 text-sm">
        Please enter your order number and upload a screenshot or document proving your payment.
      </p>

      {errorMsg && (
        <div className="bg-red-50 text-red-500 text-sm font-bold p-3 rounded-xl mb-6 border border-red-100">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="text-left space-y-5">
         <div>
           <label className="block text-xs font-bold text-[#575B5F] uppercase mb-2 tracking-widest pl-1">Order Number</label>
           <input 
             type="text" 
             required
             placeholder="ORD-YYYYMMDD-XXXX"
             value={orderNumber}
             onChange={(e) => setOrderNumber(e.target.value)}
             className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#12B5CB] focus:ring-2 focus:ring-[#12B5CB]/20 outline-none transition-all font-semibold" 
           />
         </div>

         <div>
           <label className="block text-xs font-bold text-[#575B5F] uppercase mb-2 tracking-widest pl-1">Payment Screenshot</label>
           
           {!file ? (
             <div className="relative border-2 border-dashed border-gray-200 rounded-2xl bg-[#F8F9FA] hover:bg-[#EEF4FB] hover:border-[#12B5CB]/50 transition-colors cursor-pointer group">
               <input 
                 type="file" 
                 accept="image/*,.pdf" 
                 onChange={handleFileChange} 
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:bg-[#12B5CB] group-hover:text-white transition-colors">
                     <UploadCloud className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <p className="text-sm font-bold text-[#00355D]">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or PDF (max. 5MB)</p>
               </div>
             </div>
           ) : (
             <div className="relative border border-gray-200 rounded-2xl bg-[#F8F9FA] p-4 flex items-center gap-4">
                {preview ? (
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-white">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-[#111111] truncate">{file.name}</p>
                   <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                
                <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="w-8 h-8 rounded-full bg-white hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm shrink-0">
                  <X className="w-4 h-4" />
                </button>
             </div>
           )}
         </div>

         <button 
           type="submit" 
           disabled={loading}
           className="w-full bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
         >
           {loading ? "Uploading..." : "Submit Evidence"}
         </button>
      </form>
    </div>
  );
}

export default function SubmitEvidencePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pt-24 pb-24 font-['Inter'] px-4">
      <Suspense fallback={<div>Loading...</div>}>
         <SubmitEvidenceContent />
      </Suspense>
    </div>
  );
}
