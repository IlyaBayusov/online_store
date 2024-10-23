import { IProductInfo } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInfo[];

  addProduct: (productItem: IProductInfo) => void;
  removeProduct: (productItem: IProductInfo) => void;
  updateProduct: (productItem: IProductInfo) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],

  addProduct: (productItem: IProductInfo) =>
    set((state) => {
      const productExists = state.cart.some(
        (item) => item.id === productItem.id
      );

      return {
        cart: productExists ? state.cart : [...state.cart, productItem],
      };
    }),
  removeProduct: (productItem: IProductInfo) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productItem.id),
    })),

  updateProduct: (productItem: IProductInfo) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productItem.id ? productItem : item
      ),
    })),
}));
