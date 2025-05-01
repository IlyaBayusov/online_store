"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useByProductsStore } from "@/stores/useByProducts";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import Head from "next/head";
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [hasMore, setHasMore] = useState<boolean>(true);

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

  const handleScroll = useCallback(async () => {
    const scrollElement = scrollContainerRef.current;

    if (!scrollElement || !hasMore || isFetchingRef.current) return;

    if (pagination.currentPage === pagination.totalPages - 1) {
      setHasMore(false);
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      isFetchingRef.current = true;
      console.log("Достигли низа, подгружаем ещё...");

      const prevScrollTop = scrollTop;

      await getProductsCartLoading({
        page: pagination.currentPage + 1,
      });

      requestAnimationFrame(() => {
        scrollElement.scrollTop = prevScrollTop;
        isFetchingRef.current = false;
      });
    }
  }, []);

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
    <>
      <Head>
        <title>Корзина</title>
        <meta name="description" content="Главная страница" />
      </Head>

      <div
        className="container px-3"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
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
    </>
  );
});
