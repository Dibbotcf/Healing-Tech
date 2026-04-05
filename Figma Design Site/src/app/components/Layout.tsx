import { Outlet, Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, Menu, X, ChevronDown, Activity, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import logoDark from "figma:asset/36a886ef4d471c6972b477e3e951b60bfb6e12a5.png";
import logoLight from "figma:asset/e2225487728b55367532ed5c8fbf747a1ceb5b5c.png";
import logoTop from "figma:asset/27b4648f777c0ff10342736341fde426f931ab2b.png";

const PRODUCT_CATEGORIES = [
  {
    id: 'surgical',
    name: 'Surgical Equipment',
    items: [
      { name: 'Surgical Lights', path: '/products?category=surgical-lights' },
      { name: 'Operating Tables', path: '/products?category=operating-tables' },
      { name: 'Electrosurgical Units', path: '/products?category=electrosurgical' },
      { name: 'Surgical Instruments', path: '/products?category=instruments' }
    ]
  },
  {
    id: 'critical',
    name: 'Critical Care',
    items: [
      { name: 'Anesthesia Workstations', path: '/products?category=anesthesia' },
      { name: 'Patient Monitoring', path: '/products?category=monitoring' },
      { name: 'Respiratory Care', path: '/products?category=respiratory' },
      { name: 'Infusion Pumps', path: '/products?category=infusion' }
    ]
  },
  {
    id: 'imaging',
    name: 'Medical Imaging',
    items: [
      { name: 'Ultrasound Systems', path: '/products?category=ultrasound' },
      { name: 'Digital X-Ray', path: '/products?category=xray' },
      { name: 'C-Arm Systems', path: '/products?category=c-arm' },
      { name: 'MRI Accessories', path: '/products?category=mri-acc' }
    ]
  },
  {
    id: 'sterilization',
    name: 'CSSD & Sterilization',
    items: [
      { name: 'Steam Autoclaves', path: '/products?category=autoclaves' },
      { name: 'Washers & Disinfectors', path: '/products?category=washers' },
      { name: 'Low Temp Sterilizers', path: '/products?category=low-temp' },
      { name: 'CSSD Furniture', path: '/products?category=cssd-furniture' }
    ]
  }
];

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('surgical');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-['Arimo'] tracking-tight flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm py-3 text-[#00355D]"
            : "bg-transparent py-6 text-[#00355D]"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] flex items-center justify-between">
          <Link to="/" className="flex items-center z-50 hover:opacity-80 transition-opacity">
            <img src={isScrolled ? logoDark : logoTop} alt="Healing Technology" className="h-10 md:h-12 object-contain transition-all duration-300" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold hover:text-[#12B5CB] transition-colors">
              Home
            </Link>
            <div className="relative group">
              <Link to="/products" className="flex items-center gap-1 text-sm font-bold hover:text-[#12B5CB] transition-colors py-2">
                Products <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              {/* Mega menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[800px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white text-[#111111] rounded-lg shadow-2xl overflow-hidden flex border border-gray-100">
                  {/* Left side: Categories */}
                  <div className="w-[35%] bg-gray-50 p-4 border-r border-gray-100">
                    <ul className="space-y-1">
                      {PRODUCT_CATEGORIES.map(cat => (
                        <li key={cat.id}>
                          <button
                            onMouseEnter={() => setActiveCategory(cat.id)}
                            className={`w-full text-left px-4 py-3 rounded-md text-sm font-bold transition-all duration-200 ${activeCategory === cat.id ? 'bg-white text-[#12B5CB] shadow-sm' : 'text-[#00355D] hover:bg-gray-200/50'}`}
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Right side: Products */}
                  <div className="w-[65%] p-8 bg-white">
                    <h4 className="font-['Arimo'] font-bold text-[#00355D] mb-6 text-xl border-b border-gray-100 pb-3">
                      {PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.name}
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.items.map((item, idx) => (
                        <li key={idx}>
                          <Link to={item.path} className="text-sm text-gray-600 hover:text-[#12B5CB] font-normal flex items-start gap-2.5 transition-colors group/item">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 group-hover/item:bg-[#12B5CB] transition-colors shrink-0"></div>
                            <span className="leading-snug">{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-gray-100">
                       <Link to="/products" className="text-sm font-bold text-[#12B5CB] hover:text-[#00355D] transition-colors flex items-center gap-2">
                         Explore Full Catalog <span>→</span>
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-sm font-bold hover:text-[#12B5CB] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-sm font-bold hover:text-[#12B5CB] transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Phone className="w-4 h-4 text-[#12B5CB]" />
              <span>+88 01675 292991</span>
            </div>
            <Link
              to="/contact"
              className="bg-[#12B5CB] hover:bg-[#009EE2] text-[#00355D] px-6 py-2.5 rounded-md text-sm font-bold transition-all shadow-sm hover:shadow-md font-['Arimo']"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 h-screen font-['Arimo'] text-[#00355D]">
            <Link to="/" className="text-xl font-bold border-b border-gray-200 pb-4">Home</Link>
            <Link to="/products" className="text-xl font-bold border-b border-gray-200 pb-4">Products</Link>
            <Link to="/about" className="text-xl font-bold border-b border-gray-200 pb-4">About Us</Link>
            <Link to="/contact" className="text-xl font-bold border-b border-gray-200 pb-4">Contact</Link>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-lg font-bold">
                <Phone className="w-5 h-5 text-[#12B5CB]" />
                <span>+88 01675 292991</span>
              </div>
              <Link
                to="/contact"
                className="bg-[#12B5CB] text-[#00355D] text-center px-5 py-3 rounded-md text-lg font-bold"
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#001729] text-white pt-24 pb-0 font-['Arimo'] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-4">
              <div className="mb-8">
                <img src={logoLight} alt="Healing Technology" className="h-10 md:h-12 object-contain opacity-90 mb-6" />
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
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#12B5CB] hover:text-white hover:border-[#12B5CB] transition-all" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#12B5CB] hover:text-white hover:border-[#12B5CB] transition-all" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#12B5CB] hover:text-white hover:border-[#12B5CB] transition-all" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#12B5CB] hover:text-white hover:border-[#12B5CB] transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:col-span-8 gap-8 lg:ml-auto md:w-full">
              <div>
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h3>
                <ul className="space-y-4 text-sm text-gray-400 font-normal">
                  <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
                  <li><Link to="/news" className="hover:text-white transition-colors">News Hub</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Company Info</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">What We Do</h3>
                <ul className="space-y-4 text-sm text-gray-400 font-normal">
                  <li><span className="hover:text-white transition-colors cursor-pointer">Global Device Sourcing</span></li>
                  <li><span className="hover:text-white transition-colors cursor-pointer">After-Sales Support</span></li>
                  <li><span className="hover:text-white transition-colors cursor-pointer">Preventive Maintenance</span></li>
                  <li><span className="hover:text-white transition-colors cursor-pointer">Clinical Training & Onboarding</span></li>
                  <li><span className="hover:text-white transition-colors cursor-pointer">Facility Planning</span></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal & Compliance</h3>
                <ul className="space-y-4 text-sm text-gray-400 font-normal">
                  <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                  <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/quality" className="hover:text-white transition-colors">QA & IT Security Mgmt.</Link></li>
                  <li><Link to="/regulatory" className="hover:text-white transition-colors">Regulatory Applications</Link></li>
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
                All trademarks, logos, and brand names featured on this website are the property of their respective owners. Company, product, and service names are used solely for identification purposes. Their use does not imply endorsement or affiliation.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="w-14 h-14 rounded-full border border-white/20 flex flex-col items-center justify-center text-[10px] font-bold text-gray-400 leading-tight transition-colors hover:border-white/40 hover:text-gray-300 cursor-default">
                <span>ISO</span>
                <span>9001</span>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/20 flex flex-col items-center justify-center text-[10px] font-bold text-gray-400 leading-tight transition-colors hover:border-white/40 hover:text-gray-300 cursor-default">
                <span>DGDA</span>
                <span>CERT</span>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/20 flex flex-col items-center justify-center text-[10px] font-bold text-gray-400 leading-tight transition-colors hover:border-white/40 hover:text-gray-300 cursor-default">
                <span>CE</span>
                <span>MARK</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-10 pb-12">
            <p className="text-[11px] text-gray-600 leading-relaxed text-justify max-w-none">
              Healing Technology is a medical equipment and technology distributor, not a direct healthcare provider or clinical facility. Certain products and services are provided by licensed and regulated partners in applicable jurisdictions. By using Healing Technology's platform and services, you agree to our terms of service, our partners' terms, and all applicable laws and regulations. You are solely responsible for ensuring compliance with any local legal, clinical, and regulatory requirements relevant to the purchase, deployment, and use of medical equipment within your specific jurisdiction.
            </p>
          </div>
        </div>

        {/* Giant Watermark Background Text */}
        <div className="w-full flex justify-center translate-y-[20%] pointer-events-none select-none overflow-hidden mt-[-5%]">
          <span 
            className="font-['Arimo'] font-bold text-white/[0.02] whitespace-nowrap leading-none tracking-tighter" 
            style={{ fontSize: "clamp(6rem, 15vw, 300px)" }}
          >
            HEALING TECHNOLOGY
          </span>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a
        href="https://wa.me/8801675292991"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00AB4E] hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}