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
  addItem: (product: CartItem['product'], quantity?: number, selectedSize?: string | null, selectedSizePrice?: number | null) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, selectedSize = null, selectedSizePrice = null) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity, selectedSize, selectedSizePrice }
                  : item
              )
            };
          }

          return { items: [...state.items, { product, quantity, selectedSize, selectedSizePrice }] };
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
    }
  )
);
