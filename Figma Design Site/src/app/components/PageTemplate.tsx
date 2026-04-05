import { ReactNode } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface PageTemplateProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function PageTemplate({ title, lastUpdated, children }: PageTemplateProps) {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen font-['Arimo']">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1000px]">
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#12B5CB] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#00355D] font-medium">{title}</span>
        </nav>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <header className="mb-10 pb-10 border-b border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold text-[#00355D] mb-4">{title}</h1>
            <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          </header>
          
          <div className="max-w-none text-gray-700 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
