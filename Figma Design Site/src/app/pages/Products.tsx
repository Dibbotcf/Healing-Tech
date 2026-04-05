import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ArrowRight, Download, FileText } from "lucide-react";
import { products } from "../data/mockData";
import { Link } from "react-router";

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Surgical Lights", "Anesthesia", "Electrosurgical Units", "Monitoring"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-['Arimo'] tracking-tight">
      {/* Header */}
      <div className="bg-[#00355D] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <h1 className="font-['Arimo'] text-4xl md:text-5xl font-medium mb-4 tracking-tighter">Product Catalog</h1>
          <p className="text-lg text-gray-300 max-w-2xl font-normal leading-tight">
            Explore our curated selection of high-acuity medical equipment, sourced globally and supported locally.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <div className="mb-8">
                <h3 className="font-['Arimo'] text-lg font-medium text-[#00355D] mb-4 flex items-center gap-2 tracking-tighter">
                  <Search className="w-5 h-5" /> Search
                </h3>
                <input
                  type="text"
                  placeholder="Search by name or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12B5CB] focus:border-transparent transition-all font-normal text-sm"
                />
              </div>

              <div>
                <h3 className="font-['Arimo'] text-lg font-medium text-[#00355D] mb-4 flex items-center gap-2 tracking-tighter">
                  <Filter className="w-5 h-5" /> Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-[#12B5CB]/10 text-[#12B5CB]"
                          : "text-[#575B5F] hover:bg-gray-50 font-normal"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col"
                >
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#00355D] shadow-sm tracking-tighter">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-medium text-[#12B5CB] uppercase tracking-tight mb-2">
                      {product.category}
                    </div>
                    <h3 className="font-['Arimo'] text-xl font-medium text-[#111111] mb-3 leading-tight tracking-tighter">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#575B5F] mb-6 flex-grow font-normal leading-tight">
                      {product.description}
                    </p>
                    
                    <ul className="space-y-2 mb-8 border-t border-gray-100 pt-4">
                      {product.features.map((feature, i) => (
                        <li key={i} className="text-sm text-[#575B5F] flex items-start gap-2 font-normal leading-tight">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#12B5CB] mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mt-auto gap-4">
                      <Link
                        to="/contact"
                        className="flex-1 bg-[#12B5CB] hover:bg-[#009EE2] text-white text-center py-2.5 rounded-md text-sm font-medium transition-colors font-['Arimo']"
                      >
                        Request Quote
                      </Link>
                      <button className="p-2.5 text-[#575B5F] hover:text-[#00355D] bg-gray-50 hover:bg-gray-100 rounded-md transition-colors tooltip tooltip-top" title="Download Specs">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-['Arimo'] text-xl font-medium text-[#111111] mb-2 tracking-tighter">No products found</h3>
                <p className="text-[#575B5F] font-normal">Try adjusting your search or filters.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                  className="mt-6 text-[#12B5CB] font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}