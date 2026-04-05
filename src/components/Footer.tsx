import Link from "next/link";
import Image from "next/image";
import { Phone, Globe, MessageCircle, Camera, Briefcase } from "lucide-react";

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
              {[Globe, MessageCircle, Camera, Briefcase].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#12B5CB] hover:text-white hover:border-[#12B5CB] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
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
                <li><span className="hover:text-white transition-colors cursor-pointer">Global Device Sourcing</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">After-Sales Support</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Preventive Maintenance</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Clinical Training & Onboarding</span></li>
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
