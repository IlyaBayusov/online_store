"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { IGetSubCategories } from "@/interfaces";
import { getSubCategories } from "@/api";
import SearchWithFilters from "@/components/SearchWithFilters/SearchWithFilters";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";

// const fetchProducts = async (urlName: string) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/v1/products/${urlName}/category`
//     );
//     const data = await response.data;

//     return data;
//   } catch (error) {
//     console.error("ERROR PRODUCTS", error);
//   }
// };

export default function Products() {
  // const [products, setProducts] = useState<IProductCategory[]>([]);
  // const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const [category, setCategory] = useState<IGetSubCategories>();

  // const productsSearch = useSearchWithFilters((state) => state.products);
  // const isFetch = useSearchWithFilters((state) => state.isFetch);
  // const setIsFetch = useSearchWithFilters((state) => state.setIsFetch);

  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const pagination = useSearchWithFilters((state) => state.pagination);
  const products = useSearchWithFilters((state) => state.products);
  const setCategorId = useSearchWithFilters((state) => state.setCategorId);

  const params: Params = useParams();

  useEffect(() => {
    clickSearch({ searchParam: "", categoryId: params.products });
  }, [params.products]);

  useEffect(() => {
    const getCategoriesArr = async () => {
      const response = await getSubCategories();
      const categoriesArr: IGetSubCategories[] = await response.items;

      const categoryId = categoriesArr
        .map((item: IGetSubCategories) => item.id)
        .find((item: number) => String(item) === params.products);

      if (!categoryId) {
        return notFound();
      } else {
        setCategorId(categoryId);
        setCategory(
          categoriesArr[
            categoriesArr.findIndex((item) => item.id === categoryId)
          ]
        );
      }
    };

    getCategoriesArr();
  }, [params.products]);

  // useEffect(() => {
  //   if (isFetch) {
  //     setProducts(productsSearch);
  //     setIsFetch(false);
  //   }
  // }, [productsSearch]);

  if (category) {
    return (
      <>
        <div className="mt-3 px-3 w-full flex justify-center items-center gap-2">
          <SearchWithFilters
            disabledSearch={false}
            disabledFilters={true}
            categoryId={category.id}
          />
        </div>

        <ProductsList
          category={category}
          products={products}
          pagination={pagination}
        />
      </>
    );
  }
}
