"use client";

import FormByProducts from "@/components/Forms/FormByProducts/FormByProducts";
import { useByProductsStore } from "@/stores/useByProducts";
import Image from "next/image";
import React from "react";

export default function BuyProducts() {
  const { products } = useByProductsStore();

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     setError("Некоторые поля заполнены неверно.");
  //     return;
  //   }

  //   setError("");

  //   console.log(formData);

  //   try {
  //     const response: AxiosResponse = await api.post(
  //       "http://localhost:8080/api/auth/login",
  //       formData
  //     );

  //     if (response.status !== 200) {
  //       const data = await response.data;
  //       setError(data.message || "Ошибка авторизации");
  //     } else {
  //     }

  //     router.push("/");
  //   } catch (error) {
  //     const axiosError = error as AxiosError;

  //     console.error("Ошибка при авторизации", error);

  //     if (axiosError.response?.status === 404) {
  //       setError("Такого логина не существует");
  //     } else if (axiosError.response && axiosError.response.status === 500) {
  //       setError("Ошибка валидации");
  //     } else {
  //       setError("Ошибка при регистрации");
  //     }
  //   }
  // };

  return (
    <>
      <div className="container px-3">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
            <h1 className="py-2 px-3 text-xl uppercase">Оформление заказа</h1>
          </div>

          <div className="mt-3 p-3 w-full bg-black mb-3 rounded-md">
            <p className="text-[#B3B3B3] uppercase text-sm">Доставка</p>

            <div className="flex flex-col mt-3">
              <p className="text-sm text-white">4-6 ноября</p>

              <p className="text-sm text-green-500">Доставка 0 руб.</p>
            </div>

            <div className="mt-3 flex gap-2">
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

          <FormByProducts />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-full px-2 bg-black pt-2 pb-3 rounded-t-2xl">
        <button className="flex justify-between items-center px-3 py-2 text-base w-full bg-orange-600 rounded-xl">
          <p>Заказать</p>

          <p>3 шт., 75 руб.</p>
        </button>
      </div>
    </>
  );
}
