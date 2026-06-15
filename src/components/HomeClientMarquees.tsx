"use client";

import { useState, useEffect } from "react";

interface Logo {
  name: string;
  logo?: string;
  country?: string;
}

// ── Client logos marquee (trust band just below the hero) ──────────────────
export function ClientLogosMarquee({ initialClients }: { initialClients: Logo[] }) {
  const [clients, setClients] = useState(initialClients);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("/api/public-client-logos")
        .then((r) => r.json())
        .then((data) => { if (data?.length > 0) setClients(data); })
        .catch(() => {});
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-bold text-[#575B5F] uppercase tracking-wide">
          Clients who continue to trust us
        </p>
      </div>
      <div className="flex items-center space-x-8 md:space-x-24 animate-[marquee_15s_linear_infinite] whitespace-nowrap px-2 md:px-4 py-4 md:py-6">
        {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
          <div key={index} className="inline-flex items-center mx-4 md:mx-12">
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-16 w-auto max-w-none object-contain brightness-0 opacity-60 hover:opacity-100 transition-all duration-300"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Brand logos marquee (inside the "Global Sourcing" section) ────────────
export function BrandLogosMarquee({ initialBrands }: { initialBrands: Logo[] }) {
  const [brands, setBrands] = useState(initialBrands);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("/api/public-partner-logos")
        .then((r) => r.json())
        .then((data) => { if (data?.length > 0) setBrands(data); })
        .catch(() => {});
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-full overflow-hidden mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_80%,transparent)]">
      <div className="flex items-center space-x-12 animate-[marquee_10s_linear_infinite] whitespace-nowrap">
        {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
          <div key={i} className="relative h-12 w-32 shrink-0 flex items-center justify-left">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-full w-full object-contain object-left transition-transform duration-300 hover:scale-105"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
