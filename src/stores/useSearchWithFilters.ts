import { getProductsSearchWithParams } from "@/api";
import { IFiltersUpDown, IPagination, IProductCategory } from "@/interfaces";
import { create } from "zustand";
import {
  categorIdDefaultValue,
  isFetchDefaultValue,
  isLoadingDefaultValue,
  paginationDefaultValue,
  productsDefaultValue,
  searchPDefaultValue,
  sortsFieldDefaultValue,
  typeStoreDefaultValue,
} from "./SearchWithFiltersKeysValues";
import { filtersUpDown, sizePage } from "@/constans";

export interface ISearchWithFiltersStore {
  isLoading: { [key: string]: boolean };
  setIsLoading: (keyName: string, valueBool: boolean) => void;
  isFetch: { [key: string]: boolean };
  setIsFetch: (keyName: string, valueBool: boolean) => void;
  products: { [key: string]: IProductCategory[] };
  setProducts: (keyName: string, productsArr: IProductCategory[]) => void;
  pagination: { [key: string]: IPagination };
  setPagination: (keyName: string, pagination: IPagination) => void;
  sortsField: { [key: string]: IFiltersUpDown };
  setSortsField: (keyName: string, sortsField: IFiltersUpDown) => void;
  searchP: { [key: string]: string };
  setSearchP: (keyName: string, searchP: string) => void;
  categorId: { [key: string]: number | null };
  setCategorId: (keyName: string, categorId: number | null) => void;
  typeStore: { [key: string]: string };
  setTypeStore: (keyName: string, typeStore: string) => void;

  clickSearch: (
    params: {
      searchParam: string;
      keyName: string;
    } & Partial<{
      page: number;
      size: number;
      sortField: string;
      sizes: string[];
      colors: string[];
      minPrice: number | null;
      maxPrice: number | null;
      brands: string[];

      categoryId: number | null;
    }>
  ) => void;
  clearAll: (keyName: string) => void;
}

export const useSearchWithFilters = create<ISearchWithFiltersStore>(
  (set, get) => ({
    //get
    isLoading: isLoadingDefaultValue,
    setIsLoading: (keyName, isLoading) =>
      set((state) => ({
        isLoading: { ...state.isLoading, [keyName]: isLoading },
      })),
    isFetch: isFetchDefaultValue,
    setIsFetch: (keyName: string, valueBool: boolean) =>
      set((state) => ({ isFetch: { ...state.isFetch, [keyName]: valueBool } })),

    products: productsDefaultValue,
    setProducts: (keyName, products: IProductCategory[]) =>
      set((state) => ({
        products: { ...state.products, [keyName]: products },
      })),
    pagination: paginationDefaultValue,
    setPagination: (keyName, pagination) =>
      set((state) => ({
        pagination: { ...state.pagination, [keyName]: pagination },
      })),
    sortsField: sortsFieldDefaultValue,
    setSortsField: (keyName, sortsField) =>
      set((state) => ({
        sortsField: { ...state.sortsField, [keyName]: sortsField },
      })),
    searchP: searchPDefaultValue,
    setSearchP: (keyName, searchP) =>
      set((state) => ({ searchP: { ...state.searchP, [keyName]: searchP } })),
    categorId: categorIdDefaultValue,
    setCategorId: (keyName, categorId) =>
      set((state) => ({
        categorId: { ...state.categorId, [keyName]: categorId },
      })),
    typeStore: typeStoreDefaultValue,
    setTypeStore: (keyName, typeStore) =>
      set((state) => ({
        typeStore: { ...state.typeStore, [keyName]: typeStore },
      })),

    clickSearch: async ({
      searchParam,
      keyName,

      page = 0,
      size = sizePage,
      sortField = undefined,
      sizes = [],
      colors = [],
      minPrice = null,
      maxPrice = null,
      brands = [],
      categoryId = null,
    }) => {
      set((state) => ({ isLoading: { ...state.isLoading, [keyName]: true } }));

      const { sortsField } = get(); // Берем `sortsField` напрямую из стора
      const finalSortField = sortField || sortsField[keyName].value; // Если sortField не передан, берем значение из стора

      const { categorId } = get();
      const finalCategoryId = categoryId || categorId[keyName];

      // console.log(
      //   page,
      //   size,
      //   finalSortField,
      //   searchParam,
      //   sizes,
      //   colors,
      //   minPrice,
      //   maxPrice,
      //   brands,
      //   finalCategoryId
      // );

      const response = await getProductsSearchWithParams(
        page,
        size,
        finalSortField,
        searchParam,
        sizes,
        colors,
        minPrice,
        maxPrice,
        brands,
        finalCategoryId
      );

      if (response) {
        set((state) => ({
          products: { ...state.products, [keyName]: response.items },
        }));
        set((state) => ({
          isLoading: { ...state.isLoading, [keyName]: false },
        }));
        set((state) => ({
          pagination: {
            ...state.pagination,
            [keyName]: {
              currentItems: response.currentItems,
              currentPage: response.currentPage,
              totalItems: response.totalItems,
              totalPages: response.totalPages,
            },
          },
        }));
      }
    },
    clearAll: (keyName) => {
      set(() => ({
        isLoading: { [keyName]: true },
      }));
      set(() => ({
        isFetch: { [keyName]: false },
      }));
      set(() => ({
        products: { [keyName]: [] },
      }));
      set(() => ({
        pagination: { [keyName]: {} as IPagination },
      }));
      set(() => ({
        sortsField: { [keyName]: { ...filtersUpDown[0] } as IFiltersUpDown },
      }));
      set(() => ({
        searchP: { [keyName]: "" },
      }));
      set(() => ({
        categorId: { [keyName]: null },
      }));
      set(() => ({
        typeStore: { [keyName]: "" },
      }));
    },
  })
);

// export interface ISearchWithFiltersStore {
//   isLoading: boolean;
//   setIsLoading: (isLoading: boolean) => void;
//   products: IProductCategory[];
//   setProducts: (products: IProductCategory[]) => void;
//   pagination: IPagination;
//   setPagination: (pagination: IPagination) => void;
//   sortsField: IFiltersUpDown;
//   setSortsField: (sortsField: IFiltersUpDown) => void;
//   searchP: string;
//   setSearchP: (searchP: string) => void;
//   categorId: number | null;
//   setCategorId: (categorId: number | null) => void;
//   typeStore: string;
//   setTypeStore: (typeStore: string) => void;

//   clickSearch: (
//     params: {
//       searchParam: string;
//     } & Partial<{
//       page: number;
//       size: number;
//       sortField: string;
//       sizes: string[];
//       colors: string[];
//       minPrice: number | null;
//       maxPrice: number | null;
//       brands: string[];

//       categoryId: number | null;
//     }>
//   ) => void;
// }

// export const useSearchWithFilters = create<ISearchWithFiltersStore>(
//   (set, get) => ({
//     //get
//     isLoading: true,
//     setIsLoading: (isLoading: boolean) => set({ isLoading }),
//     products: [],
//     setProducts: (products: IProductCategory[]) => set({ products }),
//     pagination: {} as IPagination,
//     setPagination: (pagination: IPagination) => set({ pagination }),
//     sortsField: { ...filtersUpDown[0] } as IFiltersUpDown,
//     setSortsField: (sortsField: IFiltersUpDown) => set({ sortsField }),
//     searchP: "",
//     setSearchP: (searchP: string) => set({ searchP }),
//     categorId: null,
//     setCategorId: (categorId: number | null) => set({ categorId }),
//     typeStore: "",
//     setTypeStore: (typeStore: string) => set({ typeStore }),

//     clickSearch: async ({
//       searchParam,
//       page = 0,
//       size = 10,
//       sortField = undefined,
//       sizes = [],
//       colors = [],
//       minPrice = null,
//       maxPrice = null,
//       brands = [],
//       categoryId = null,
//     }) => {
//       set({ isLoading: true });

//       const { sortsField } = get(); // Берем `sortsField` напрямую из стора
//       const finalSortField = sortField || sortsField.value; // Если sortField не передан, берем значение из стора

//       const { categorId } = get();
//       const finalCategoryId = categoryId || categorId;

//       console.log(
//         page,
//         size,
//         finalSortField,
//         searchParam,
//         sizes,
//         colors,
//         minPrice,
//         maxPrice,
//         brands,
//         finalCategoryId
//       );

//       const response = await getProductsSearchWithParams(
//         page,
//         size,
//         finalSortField,
//         searchParam,
//         sizes,
//         colors,
//         minPrice,
//         maxPrice,
//         brands,
//         finalCategoryId
//       );

//       if (response) {
//         set({ products: response.items });
//         set({ isLoading: false });
//         set({
//           pagination: {
//             currentItems: response.currentItems,
//             currentPage: response.currentPage,
//             totalItems: response.totalItems,
//             totalPages: response.totalPages,
//           },
//         });
//       }
//     },
//   })
// );
