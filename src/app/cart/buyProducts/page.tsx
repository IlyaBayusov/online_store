"use client";

import { postByProducts } from "@/api";
import { postPromo } from "@/axios";
import FormByProducts from "@/components/Forms/FormByProducts/FormByProducts";
import { authPage, cartPage, modalSuccessOrder } from "@/constans";
import { IOrderPost, IProductInCart, IPromo } from "@/interfaces";
import { useByProductsStore } from "@/stores/useByProducts";
import { useFormStore } from "@/stores/useFormStore";
import { useModalStore } from "@/stores/useModalStore";
import { decodeToken } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BuyProducts() {
  const [sumPrice, setSumPrice] = useState(0);
  const [error, setError] = useState("");

  const [promoInput, setPromoInput] = useState<string>("");

  const [promo, setPromo] = useState<IPromo>({} as IPromo);
  const [promoErrMess, setPromoErrMess] = useState<string>("");

  const { data, isValid } = useFormStore();

  const { openModal } = useModalStore();
  const { products } = useByProductsStore();

  const router = useRouter();

  useEffect(() => {
    const sum = products.reduce(
      (sum: number, product: IProductInCart) =>
        sum + product.price * product.quantity,
      0
    );

    setSumPrice(sum);
  }, [products]);

  const handleClickPromo = async () => {
    const data: IPromo = await postPromo(promoInput);

    if (!data.message) {
      setPromoErrMess("Ошибка отправки");
      return;
    }

    switch (data.message) {
      case "SUCCESS":
        if (!data.discount) {
          setPromoErrMess("Промокод не найден");
          getSumWithDiscount();
          break;
        }

        setPromo(data);
        getSumWithDiscount(data.discount);
        setPromoErrMess("Промокод применен");
        break;
      case "USED":
        setPromo({} as IPromo);
        setPromoErrMess("Уже использовался");
        getSumWithDiscount();
        break;
      case "IMPOSSIBLE":
        setPromo({} as IPromo);
        setPromoErrMess("Промокод недоступен");
        getSumWithDiscount();
        break;

      default:
        setPromo({} as IPromo);
        getSumWithDiscount();
        setPromoErrMess("Промокод не найден");
        break;
    }
  };

  const getSumWithDiscount = (discount: number = 0) => {
    if (!products || products.length === 0) {
      setSumPrice(0);
      return;
    }

    const sum = products.reduce((acc, item) => acc + item.price, 0);

    if (discount) {
      const discountedSum = Math.round(sum * (1 - discount / 100));

      setSumPrice(discountedSum);
    } else {
      setSumPrice(sum);
    }
  };

  const showSumWithDiscountInBtn = (
    productsCount: number,
    resultSum: number,
    discount: number = 0
  ) => {
    if (!discount || !resultSum) {
      return <p>{`${productsCount} шт., ${resultSum} руб.`}</p>;
    }

    return (
      <p>
        {`${productsCount} шт., ${resultSum} руб.`}
        <span className="ml-2 px-2 py-0.5 rounded-md bg-green-500 text-white">{`- ${discount}%`}</span>
      </p>
    );
  };

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Некоторые поля заполнены неверно");
      return;
    }
    if (products === undefined) {
      setError(
        "Ошибка отправки данных, в пост запросе пустой объект orderItemRequest"
      );
      return;
    }

    setError("");
    setPromoErrMess("");

    const decoded = decodeToken();

    if (!decoded || !decoded.id) {
      router.push(authPage);
      localStorage.removeItem("accessToken");

      setError("Ошибка оформления заказа");

      return;
    }

    const newOrder: IOrderPost = {
      orderDetailsRequest: {
        ...data,
        totalPrice: sumPrice,
        userId: decoded.id,
        promocode: promoInput || null,
      },
      orderItemRequest: products,
    };

    console.log("Ответ ушел, новый заказ: ", newOrder);

    const response = await postByProducts(newOrder);

    if (response?.status !== 201) {
      setError("Ошибка оформления заказа");
    } else {
      openModal(modalSuccessOrder);
    }
  };

  if (!products.length) return router.push(cartPage);

  return (
    <>
      <div className="container px-3">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
            <h1 className="py-2 px-3 text-xl uppercase">Оформление заказа</h1>
          </div>

          <div className="mt-3 p-3 w-full bg-black mb-3 rounded-md overflow-hidden">
            <p className="text-[#B3B3B3] uppercase text-sm">Доставка</p>

            <div className="flex flex-col mt-3">
              <p className="text-sm text-white">4-6 ноября</p>

              <p className="text-sm text-green-500">Доставка 0 руб.</p>
            </div>

            <div className="mt-3 w-full overflow-auto">
              <div className="flex w-max gap-2">
                {products.map((item) => (
                  <div key={item.cartItemId} className="max-w-16">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={350}
                      height={500}
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-black rounded-md w-full mb-[6.25rem]">
            <p className="text-[#B3B3B3] uppercase text-sm">
              Заполнение данных
            </p>

            <FormByProducts />

            <div className="mt-3 mb-2 flex flex-col justify-center items-center w-full text-base">
              <div className="relative w-full flex justify-between items-center">
                <input
                  id="promo"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Промокод"
                  className="py-2 px-6 rounded-md text-white bg-transparent border border-[#6F00FF]"
                />

                <button
                  className="px-4 py-1 rounded-md text-white"
                  onClick={handleClickPromo}
                >
                  Применить
                </button>

                <span
                  className={
                    "absolute -bottom-4 left-0 z-10 text-nowrap text-xs " +
                    (promo.discount ? "text-green-600" : "text-red-600")
                  }
                >
                  {promoErrMess}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-full px-2 bg-black pt-2 pb-3 rounded-t-2xl">
        {error && <p className="pb-2 text-red-600">{error}</p>}

        <button
          className="flex justify-between items-center px-3 py-2 text-base w-full bg-orange-600 rounded-xl"
          onClick={handleSubmit}
        >
          <p>Заказать</p>

          {showSumWithDiscountInBtn(
            products.length || 0,
            sumPrice,
            promo.discount
          )}
        </button>
      </div>
    </>
  );
}
