"use server";

import { directusGet } from "@/lib/directus";

export async function getMegaMenuData() {
  try {
    const [catRes, prodRes] = await Promise.all([
      directusGet<{ data: any[] }>("/items/categories?fields=id,name,slug&sort=sort_order&limit=100"),
      directusGet<{ data: any[] }>(
        "/items/products?fields=id,name,slug,category.id&limit=1000&filter[status][_eq]=published"
      ),
    ]);

    const categories = (catRes.data ?? []).map((c: any) => ({
      id: String(c.id),
      title: c.name as string,
      slug: c.slug as string,
    }));

    const products = (prodRes.data ?? []).map((p: any) => ({
      id: String(p.id),
      name: p.name as string,
      slug: p.slug as string,
      category: p.category ? String(p.category.id ?? p.category) : "",
    }));

    return { categories, products };
  } catch (error) {
    console.error("Mega menu Server Action Error:", error);
    return { categories: [], products: [] };
  }
}
