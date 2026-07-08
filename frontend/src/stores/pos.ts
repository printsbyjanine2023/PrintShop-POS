import { create } from 'zustand';
import { CartItem } from '@/types';

interface POSStore {
  cartItems: CartItem[];
  customerId: number | null;
  discount: number;
  paymentMethod: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void;
  setCustomer: (customerId: number | null) => void;
  setDiscount: (discount: number) => void;
  setPaymentMethod: (method: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
}

export const usePOSStore = create<POSStore>((set, get) => ({
  cartItems: [],
  customerId: null,
  discount: 0,
  paymentMethod: 'cash',

  addToCart: (item: CartItem) => {
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    });
  },

  removeFromCart: (itemId: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== itemId),
    }));
  },

  updateCartItem: (itemId: string, updates: Partial<CartItem>) => {
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i.id === itemId ? { ...i, ...updates } : i
      ),
    }));
  },

  setCustomer: (customerId: number | null) => set({ customerId }),
  setDiscount: (discount: number) => set({ discount }),
  setPaymentMethod: (method: string) => set({ paymentMethod: method }),

  clearCart: () => {
    set({
      cartItems: [],
      customerId: null,
      discount: 0,
      paymentMethod: 'cash',
    });
  },

  getSubtotal: () => {
    return get().cartItems.reduce((sum, item) => sum + item.total, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().discount;
    const tax = (subtotal - discount) * 0.12; // 12% VAT
    return subtotal - discount + tax;
  },
}));
