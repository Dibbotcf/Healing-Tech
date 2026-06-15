"use client";

import dynamic from "next/dynamic";

const ProductCarousel = dynamic(
  () => import("@/components/ProductCarousel").then((m) => ({ default: m.ProductCarousel })),
  { ssr: false },
);

const CategoryShowcase = dynamic(
  () => import("@/components/CategoryShowcase").then((m) => ({ default: m.CategoryShowcase })),
  { ssr: false },
);

export function HomeCarousels() {
  return (
    <>
      <ProductCarousel />
      <CategoryShowcase />
    </>
  );
}
