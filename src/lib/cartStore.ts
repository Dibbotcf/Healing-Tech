import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number | null;
    discountPrice: number | null;
    heroImage?: any;
    slug: string;
    sizes?: Array<{name: string; price: number}> | null;
  };
  quantity: number;
  selectedSize?: string | null;
  selectedSizePrice?: number | null;
}

interface CartState {
  items: CartItem[];
  lastAdded: CartItem | null;
  addItem: (product: CartItem['product'], quantity?: number, selectedSize?: string | null, selectedSizePrice?: number | null) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  clearLastAdded: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

function deduplicateItems(items: CartItem[]): CartItem[] {
  const seen = new Map<string, CartItem>();
  for (const item of items) {
    const key = item.product.id;
    if (!seen.has(key)) seen.set(key, item);
    else {
      // Keep the one with higher quantity
      const existing = seen.get(key)!;
      seen.set(key, { ...existing, quantity: existing.quantity + item.quantity });
    }
  }
  return Array.from(seen.values());
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastAdded: null,

      addItem: (product, quantity = 1, selectedSize = null, selectedSizePrice = null) => {
        const normalizedProduct = { ...product, id: String(product.id) };
        set((state) => {
          const deduped = deduplicateItems(state.items);
          const existingItem = deduped.find(item => String(item.product.id) === normalizedProduct.id);
          const newItem: CartItem = { product: normalizedProduct, quantity, selectedSize, selectedSizePrice };

          if (existingItem) {
            return {
              lastAdded: newItem,
              items: deduped.map(item =>
                String(item.product.id) === normalizedProduct.id
                  ? { ...item, quantity: item.quantity + quantity, selectedSize, selectedSizePrice }
                  : item
              )
            };
          }

          return { lastAdded: newItem, items: [...deduped, newItem] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),
      clearLastAdded: () => set({ lastAdded: null }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const priceToUse = item.selectedSizePrice ?? item.product.discountPrice ?? item.product.price ?? 0;
          return total + (priceToUse * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'healing-tech-cart',
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.items)) {
          state.items = deduplicateItems(state.items);
        }
      },
    }
  )
);
