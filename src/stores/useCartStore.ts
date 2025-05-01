import { getProductsCart } from "@/api";
import { sizePage } from "@/constans";
import { IPagination, IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  pagination: IPagination;

  getProductsInCart: () => Promise<void>;

  updateQuantity: (productId: number, quantity: number) => void;

  getProductsCartLoading: (
    params: { page: number } & Partial<{
      size: number;
      sortParam: string;
    }>
  ) => Promise<IProductInCart[] | null>;
}

export const useCartStore = create<ICartStore>((set, get) => ({
  cart: [],
  pagination: {} as IPagination,

  getProductsInCart: async () => {
    const response = await getProductsCart();

    if (response) {
      const products = await response.items;

      set((state) => ({
        cart: products ? [...products] : [...state.cart],
      }));
      set({
        pagination: {
          currentItems: response.currentItems,
          currentPage: response.currentPage,
          totalItems: response.totalItems,
          totalPages: response.totalPages,
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

  getProductsCartLoading: async ({
    page = 0,
    size = sizePage,
    sortParam = "id,desc",
  }) => {
    const { pagination } = get();

    if (page >= pagination.totalPages) {
      return;
    }

    const response = await getProductsCart(
      pagination.currentPage + 1,
      size,
      sortParam
    );

    if (response) {
      set((state) => ({
        cart: [...state.cart, ...response.items],
      }));
      set({
        pagination: {
          currentItems: response.currentItems,
          currentPage: response.currentPage,
          totalItems: response.totalItems,
          totalPages: response.totalPages,
        },
      });

      return response.items;
    }

    return null;
  },
}));
