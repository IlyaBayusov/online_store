import { getProductsCart } from "@/api";
import { IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];

  getProductsInCart: () => Promise<void>;

  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],

  getProductsInCart: async () => {
    const response = await getProductsCart();

    if (response) {
      const products = await response.items;

      set((state) => ({
        cart: products ? [...products] : [...state.cart],
      }));
    }
  },

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
}));
