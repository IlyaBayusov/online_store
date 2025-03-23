import { getProductsSearchWithParams } from "@/api";
import { filtersUpDown } from "@/constans";
import { IFiltersUpDown, IPagination, IProductCategory } from "@/interfaces";
import { create } from "zustand";

export interface ISearchWithFiltersStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  products: IProductCategory[];
  setProducts: (products: IProductCategory[]) => void;
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  isFetch: boolean;
  setIsFetch: (isFetch: boolean) => void;
  sortsField: IFiltersUpDown;
  setSortsField: (sortsField: IFiltersUpDown) => void;
  searchP: string;
  setSearchP: (searchP: string) => void;

  clickSearch: (
    params: {
      searchParam: string;
    } & Partial<{
      page: number;
      size: number;
      sortField: string;
      sizes: string[];
      colors: string[];
      minPrice: number;
      maxPrice: number;
      brands: string[];
    }>
  ) => void;
}

export const useSearchWithFilters = create<ISearchWithFiltersStore>(
  (set, get) => ({
    //get
    isLoading: true,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    products: [],
    setProducts: (products: IProductCategory[]) => set({ products }),
    pagination: {} as IPagination,
    setPagination: (pagination: IPagination) => set({ pagination }),
    isFetch: false,
    setIsFetch: (isFetch: boolean) => set({ isFetch }),
    sortsField: { ...filtersUpDown[0] } as IFiltersUpDown,
    setSortsField: (sortsField: IFiltersUpDown) => set({ sortsField }),
    searchP: "",
    setSearchP: (searchP: string) => set({ searchP }),

    clickSearch: async ({
      searchParam,
      page = 0,
      size = 10,
      sortField = undefined,
      sizes = [],
      colors = [],
      minPrice = null,
      maxPrice = null,
      brands = [],
    }) => {
      const { sortsField } = get(); // Берем `sortsField` напрямую из стора
      const finalSortField = sortField || sortsField.value; // Если sortField не передан, берем значение из стора

      console.log(
        page,
        size,
        finalSortField,
        searchParam,
        sizes,
        colors,
        minPrice,
        maxPrice,
        brands
      );

      const response = await getProductsSearchWithParams(
        page,
        size,
        finalSortField,
        searchParam,
        sizes,
        colors,
        minPrice,
        maxPrice,
        brands
      );

      if (response) {
        set({ isFetch: true });
        set({ products: response.items });
        set({ isLoading: false });
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
  })
);
