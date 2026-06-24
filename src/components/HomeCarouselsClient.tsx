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

export function HomeCarouselsClient({
  initialProducts,
  initialTotalDocs,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialProducts: any[];
  initialTotalDocs: number;
}) {
  return (
    <>
      <ProductCarousel initialProducts={initialProducts} initialTotalDocs={initialTotalDocs} />
      <CategoryShowcase />
    </>
  );
}
