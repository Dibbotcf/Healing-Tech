"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-[#12B5CB] text-white hover:bg-[#009EE2] px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md"
    >
      <Printer className="w-4 h-4" /> Download / Print PDF
    </button>
  );
}
