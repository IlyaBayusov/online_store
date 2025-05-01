"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useByProductsStore } from "@/stores/useByProducts";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "next/navigation";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default memo(function Cart() {
  const isFetchingRef = useRef(false);

  const [products, setProducts] = useState<IProductInCart[]>([]);
  const [sum, setSum] = useState<number>(0);

  const cart = useCartStore((state) => state.cart);
  const pagination = useCartStore((state) => state.pagination);
  const getProductsInCart = useCartStore((state) => state.getProductsInCart);
  const getProductsCartLoading = useCartStore(
    (state) => state.getProductsCartLoading
  );

  const modalsProps = useModalStore((state) => state.modalsProps);

  const updateProducts = useByProductsStore((state) => state.updateProducts);

  const router = useRouter();

  useEffect(() => {
    getProducts();
    getProductsInCart();
  }, []);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      getProducts();
    }
  }, [modalsProps]);

  useEffect(() => {
    const totalSum = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setSum(totalSum);
  }, [cart]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("render");

  const handleScroll = useCallback(
    async (e: Event) => {
      if (isFetchingRef.current) return;

      const target = e.target as Document;
      const scrollTop = target.documentElement.scrollTop;
      const innerHeight = window.innerHeight;
      const scrollHeight = target.documentElement.scrollHeight;

      if (pagination.currentPage >= pagination.totalPages - 1) {
        return;
      }

      if (scrollHeight - (scrollTop + innerHeight) < 100) {
        isFetchingRef.current = true;
        console.log("Достигли низа, подгружаем ещё...");

        const data = await getProductsCartLoading({
          page: pagination.currentPage + 1,
        });

        if (data) {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.productId));
            const newUnique = data.filter(
              (item) => !existingIds.has(item.productId)
            );
            return [...prev, ...newUnique];
          });
        }

        isFetchingRef.current = false;
      }
    },
    [pagination]
  );
  console.log(products);

  const getProducts = async () => {
    const response = await getProductsCart();

    if (response) {
      const data = await response.items;

      setProducts(data);
    }
  };

  const handleBuy = () => {
    updateProducts(products);
    router.push("/cart/buyProducts");
  };

  const cartList = useMemo(() => <CartList products={products} />, [products]);

  return (
    <div className="container px-3">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
          <h1 className="py-2 px-3 text-xl uppercase">Корзина</h1>
        </div>

        {products.length ? (
          cartList
        ) : (
          <span className="mt-3 text-base leading-none text-[#B3B3B3]">
            Корзина пуста
          </span>
        )}
      </div>

      {products.length ? (
        <button
          className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-orange-400"
          onClick={handleBuy}
        >
          <span className="text-base leading-none">К оформлению</span>
          <span className="text-base leading-none">{`${products.length} шт., ${sum} руб.`}</span>
        </button>
      ) : (
        <button
          disabled
          className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-[#3A3A3A]"
        >
          <span className="text-base leading-none text-[#B3B3B3]">
            Корзина пуста
          </span>
        </button>
      )}
    </div>
  );
});
