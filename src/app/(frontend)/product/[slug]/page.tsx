"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Awwwards entry animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );
    }
  }, []);

  // Mock data structure corresponding exactly to our Payload Category/Product schema
  const product = {
    name: "Heyer OP830 Series",
    category: "Operation Tables",
    shortSummary: "Advanced electro-hydraulic operating table for maximum stability and precise surgical maneuvering.",
    heroImage: "/placeholder-table.jpg", // The user will upload actual images
    quickSpecs: [
      { label: "Max Load", value: "300 kg" },
      { label: "Elevation Range", value: "680 - 1080 mm" },
      { label: "Material", value: "Premium Stainless Steel" }
    ],
    features: ["One-button Zero Position", "Memory Function", "Kidney Bridge Elevation"],
    applications: ["Cardiology", "Neurology", "Orthopedics"],
  };

  return (
    <main style={{ backgroundColor: "#ffffff", color: "#030213", minHeight: "100vh" }}>
      
      {/* 1. Breadcrumb Node */}
      <nav style={{ padding: "2rem", borderBottom: "1px solid #ececf0", fontSize: "0.875rem", color: "#717182" }}>
        Home / Products / {product.category} / <span style={{ color: "#030213", fontWeight: 500 }}>{product.name}</span>
      </nav>

      {/* 2. Hero Section */}
      <section ref={heroRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        <div>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundColor: "#ececf0", height: "500px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <p style={{ color: "#717182" }}>[Image Gallery Dropzone]</p>
          </motion.div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {product.name}
          </h1>
          <p style={{ color: "#717182", fontSize: "1.25rem", marginTop: "1.5rem", lineHeight: 1.6 }}>
            {product.shortSummary}
          </p>
          
          {/* 3. Quick Specs Inline */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "3rem" }}>
            {product.quickSpecs.map((spec, i) => (
              <div key={i} style={{ borderLeft: "2px solid #030213", paddingLeft: "1rem" }}>
                <div style={{ fontSize: "0.875rem", color: "#717182" }}>{spec.label}</div>
                <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>{spec.value}</div>
              </div>
            ))}
          </div>

          {/* 9. RFQ Button */}
          <div style={{ marginTop: "4rem" }}>
             <button style={{ backgroundColor: "#030213", color: "#ffffff", padding: "1rem 2rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "1rem" }}>
               Request Formal Quote
             </button>
          </div>
        </div>
      </section>

      {/* 4. Tabs & Content Architecture */}
      <section style={{ backgroundColor: "#030213", color: "#ffffff", padding: "6rem 2rem", marginTop: "4rem" }}>
         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            {/* 5. Features Grid */}
            <div style={{ marginBottom: "6rem" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Key Features</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {product.features.map((feature, idx) => (
                  <div key={idx} style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px" }}>
                    <h3 style={{ fontSize: "1.25rem" }}>▪ {feature}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Deep Specifications & 7. Applications */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
               <div>
                 <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Technical Specifications</h2>
                 <p style={{ color: "#717182" }}>[Detailed Data Fields Will Map Here from CMS Schema]</p>
               </div>
               <div>
                 <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Applications</h2>
                 {product.applications.map((app, i) => (
                   <div key={i} style={{ padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{app}</div>
                 ))}
               </div>
            </div>

            {/* 8. Downloads */}
            <div style={{ marginTop: "6rem", paddingTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
               <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Downloads & Brochures</h2>
               <button style={{ border: "1px solid #ffffff", background: "none", color: "#ffffff", padding: "0.75rem 1.5rem", borderRadius: "8px", cursor: "pointer" }}>
                  Download Technical PDF
               </button>
            </div>
         </div>
      </section>

    </main>
  );
}
