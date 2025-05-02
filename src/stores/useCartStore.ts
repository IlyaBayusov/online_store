import { getProductsCart } from "@/api";
import { IPagination, IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  pagination: IPagination;

  getProductsInCart: () => Promise<void>;

  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  pagination: {} as IPagination,

  getProductsInCart: async () => {
    const response = await getProductsCart();

    if (response) {
      const data = await response.data;
      const products = await data.items;

      set((state) => ({
        cart: products ? [...products] : [...state.cart],
      }));
      set({
        pagination: {
          currentItems: data.currentItems,
          currentPage: data.currentPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        },
      });
    }
  },

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
}));
