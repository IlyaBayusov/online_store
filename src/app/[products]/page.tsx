"use client";

import { getSubCategories } from "@/api";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
import SearchWithFilters from "@/components/SearchWithFilters/SearchWithFilters";
import { filtersKeyProductsPage } from "@/constans";
import { IGetSubCategories } from "@/interfaces";
import { useSearchWithFilters } from "@/stores/useSearchWithFilters";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {
  const [category, setCategory] = useState<IGetSubCategories>();

  const clickSearch = useSearchWithFilters((state) => state.clickSearch);
  const pagination = useSearchWithFilters((state) => state.pagination);
  const products = useSearchWithFilters((state) => state.products);
  const setCategorId = useSearchWithFilters((state) => state.setCategorId);

  const params: Params = useParams();

  useEffect(() => {
    clickSearch({
      searchParam: "",
      categoryId: params.products,
      keyName: filtersKeyProductsPage,
    });
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
        setCategorId(filtersKeyProductsPage, categoryId);
        setCategory(
          categoriesArr[
            categoriesArr.findIndex((item) => item.id === categoryId)
          ]
        );
      }
    };

    getCategoriesArr();
  }, [params.products]);

  if (category) {
    return (
      <>
        <div className="mt-3 px-3 w-full flex justify-center items-center gap-2">
          <SearchWithFilters
            disabledSearch={false}
            disabledFilters={true}
            categoryId={category.id}
            keyName={filtersKeyProductsPage}
          />
        </div>

        <ProductsList
          category={category}
          products={products[filtersKeyProductsPage]}
          pagination={pagination[filtersKeyProductsPage]}
        />
      </>
    );
  }
}
