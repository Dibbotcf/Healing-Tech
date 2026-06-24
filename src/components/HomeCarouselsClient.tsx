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

interface Product {
  id: string;
  name: string;
  slug: string;
  listingSummary: string;
  markAsNew?: boolean;
  price?: number | null;
  discountPrice?: number | null;
  heroImage?: { url: string; mimeType?: string } | null;
  category?: { title: string; slug: string } | null;
  brand?: { name: string } | null;
}

export function HomeCarouselsClient({
  initialProducts,
  initialTotalDocs,
}: {
  initialProducts: Product[];
  initialTotalDocs: number;
}) {
  return (
    <>
      <ProductCarousel initialProducts={initialProducts} initialTotalDocs={initialTotalDocs} />
      <CategoryShowcase />
    </>
  );
}
