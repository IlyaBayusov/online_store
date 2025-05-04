import { IPagination, IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  pagination: IPagination;
  count: number;
  price: number;

  getCount: (count: number) => void;
  getPrice: (price: number) => void;

  getProductsInCart: (
    products: IProductInCart[],
    pagination: IPagination
  ) => Promise<void>;

  deleteProductInCart: (cartItemId: number) => void;

  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<ICartStore>((set, get) => ({
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

  getProductsInCart: async (products, pagination) => {
    set(() => ({
      cart: products,
    }));
    set({
      pagination: pagination,
    });
  },

  deleteProductInCart: (cartItemId) => {
    const { cart } = get();

    const newCart = cart.filter((item) => item.cartItemId !== cartItemId);

    set(() => ({
      cart: newCart,
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
}));
