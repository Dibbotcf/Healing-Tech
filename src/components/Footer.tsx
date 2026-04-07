import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#001729] text-white pt-24 pb-0 font-['Inter'] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <Image src="/healing technology logo SVG-04.svg" alt="Healing Technology" width={180} height={48} className="h-10 md:h-12 w-auto object-contain opacity-90 mb-6" />
              <h2 className="text-2xl lg:text-[28px] font-bold text-white uppercase tracking-tighter leading-none mb-2">
                Serving Bangladesh
              </h2>
              <h2 className="text-2xl lg:text-[28px] font-bold text-[#12B5CB] uppercase tracking-tighter leading-none">
                With World-Class Equipment
              </h2>
            </div>
            <ul className="space-y-4 text-sm text-gray-400 font-normal leading-tight mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 shrink-0" />
                <span>Ansari Bhaban (Ground Floor), 14/2 Topkhana Road, Paltan, Dhaka-1000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>+88 01675 292991</span>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/healingtechnologybd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:col-span-8 gap-8 lg:ml-auto md:w-full">
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Company Info</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">What We Do</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/global-sourcing" className="hover:text-white transition-colors">Global Device Sourcing</Link></li>
                <li><Link href="/after-sales" className="hover:text-white transition-colors">After-Sales Support</Link></li>
                <li><Link href="/preventive-maintenance" className="hover:text-white transition-colors">Preventive Maintenance</Link></li>
                <li><Link href="/clinical-training" className="hover:text-white transition-colors">Clinical Training & Onboarding</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal & Compliance</h3>
              <ul className="space-y-4 text-sm text-gray-400 font-normal">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/[0.08] pt-10 pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-gray-300 mb-4">
              &copy; {new Date().getFullYear()} HEALING TECHNOLOGY Ltd. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              All trademarks, logos, and brand names featured on this website are the property of their respective owners.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            {[["ISO","9001"],["DGDA","CERT"],["CE","MARK"]].map(([a,b], i) => (
              <div key={i} className="w-14 h-14 rounded-full border border-white/20 flex flex-col items-center justify-center text-[10px] font-bold text-gray-400 leading-tight">
                <span>{a}</span><span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-10 pb-12">
          <p className="text-[11px] text-gray-600 leading-relaxed text-justify max-w-none">
            Healing Technology is a medical equipment and technology distributor, not a direct healthcare provider or clinical facility. By using Healing Technology&apos;s platform and services, you agree to our terms of service and all applicable laws and regulations.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center translate-y-[20%] pointer-events-none select-none overflow-hidden mt-[-5%]">
        <span className="font-['Inter'] font-bold text-white/[0.02] whitespace-nowrap leading-none tracking-tighter" style={{ fontSize: "clamp(6rem, 15vw, 300px)" }}>
          HEALING TECHNOLOGY
        </span>
      </div>
    </footer>
  );
}
