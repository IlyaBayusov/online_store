import { getProductsCart } from "@/api";
import { IPagination, IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  pagination: IPagination;
  count: number;
  price: number;

  getCount: (count: number) => void;
  getPrice: (price: number) => void;

  getProductsInCart: () => Promise<void>;

  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  pagination: {} as IPagination,
  count: 0,
  price: 0,

  getCount: (count) => {
    set({ count: count });
  },

  getPrice: (price) => {
    set({ price: price });
  },

  getProductsInCart: async () => {
    //переделать для динамической пагинации
    const response = await getProductsCart();

    if (response) {
      const data = response.data;

      const products = data.items;

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

  updateQuantity: (productId: number, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
}));
