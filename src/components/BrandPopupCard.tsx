"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Award, ExternalLink } from "lucide-react";

interface OemBrand {
  name: string;
  countryOfOrigin?: string;
  summary?: string;
  certificationsText?: string;
  website?: string;
}

interface BrandCardProps {
  brand: OemBrand;
  brandLogoUrl: string | null;
}

export function BrandPopupCard({ brand, brandLogoUrl }: BrandCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 bg-white pl-4 pr-5 py-2.5 rounded-full border border-[#00355D]/8 shadow-sm hover:shadow-md transition-all group cursor-pointer"
      >
        {brandLogoUrl ? (
          <div className="h-7 w-20 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brandLogoUrl} alt={brand.name} className="w-full h-full object-contain" />
          </div>
        ) : null}
        <div className="flex flex-col items-start gap-0.5 border-l border-gray-100 pl-3">
          <span className="text-[9px] text-[#00355D]/40 uppercase tracking-[0.2em] font-bold leading-none">
            Manufacturer
          </span>
          <span className="text-sm text-[#00355D] font-bold leading-none tracking-[-0.02em] group-hover:text-[#12B5CB] transition-colors">
            {brand.name}
          </span>
        </div>
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#00355D]/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Panel */}
          <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#00355D] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-6 mb-8 mt-2">
              {brandLogoUrl ? (
                <div className="h-16 w-32 flex-shrink-0 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brandLogoUrl} alt={brand.name} className="w-full h-full object-contain p-2" />
                </div>
              ) : null}
              <div>
                <h3 className="text-2xl font-bold text-[#00355D] tracking-tight leading-tight">{brand.name}</h3>
                {brand.countryOfOrigin && (
                   <p className="text-xs font-bold text-[#12B5CB] uppercase tracking-[0.1em] mt-1.5">{brand.countryOfOrigin}</p>
                )}
              </div>
            </div>

            {brand.summary && (
              <p className="text-[#575B5F] text-sm leading-relaxed mb-6">
                {brand.summary}
              </p>
            )}

            {brand.certificationsText && (
              <div className="bg-[#EEF4FB] rounded-2xl p-5 mb-6 border border-[#12B5CB]/10">
                <div className="flex items-center gap-2 mb-2 text-[#00355D]">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Quality & Certifications</span>
                </div>
                <p className="text-sm text-[#575B5F]">{brand.certificationsText}</p>
              </div>
            )}

            {brand.website && (
              <a 
                href={brand.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#12B5CB] hover:text-[#00355D] transition-colors"
              >
                Visit Official Website <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
