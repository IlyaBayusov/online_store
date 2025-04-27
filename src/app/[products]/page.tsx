"use client";

import { getSubCategoryId } from "@/axios";
import ProductsList from "@/components/Products/ProductsList/ProductsList";
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
      const response = await getSubCategoryId(params.products);

      if (!response) {
        return notFound();
      }

      const data = response.data;

      setCategorId(filtersKeyProductsPage, Number(data.name));
      setCategory(data);
    };

    getCategoriesArr();
  }, [params.products]);

  if (category) {
    return (
      <>
        <ProductsList
          category={category}
          products={products[filtersKeyProductsPage]}
          pagination={pagination[filtersKeyProductsPage]}
          keyName={filtersKeyProductsPage}
        />
      </>
    );
  }
}
