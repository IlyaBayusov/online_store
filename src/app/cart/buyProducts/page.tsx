"use client";

import { api } from "@/axios";
import { useInput } from "@/hooks/useInput";
import { useByProductsStore } from "@/stores/useByProducts";
import { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface IParams {
  minLength: number;
  maxLength: number;
}

export default function BuyProducts() {
  const [formData, setFormData] = useState({
    userId: 0,
    totalPrice: 0,
    customerName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    paymentMethod: "",
  });

  const customerName = useInput("", {
    empty: true,
    minLength: 2,
    maxLength: 50,
  });
  const phone = useInput("", { empty: true, minLength: 4, maxLength: 50 });

  const [error, setError] = useState("");

  const router = useRouter();

  const { products } = useByProductsStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const errorsValidation = (inputName, params: IParams) => {
    if (inputName.dirty && (inputName.empty || inputName.minLength)) {
      return (
        <span className="text-red-600 text-xs">
          Мин.{" "}
          {params.minLength !== 2
            ? `${params.minLength} символа`
            : `${params.minLength} символов`}
        </span>
      );
    }
    if (inputName.dirty && inputName.maxLength) {
      return (
        <span className="text-red-600 text-xs">
          Макс. {params.maxLength} символов
        </span>
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!customerName.inputValid) {
      isValid = false;
    }
    if (!phone.inputValid) {
      isValid = false;
    }

    return isValid;
  };

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

          <form className="flex flex-col w-full items-center mt-1 text-black">
            <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
              <label
                htmlFor=""
                className="text-start mt-2 text-white flex justify-start w-full"
              >
                Имя
              </label>
              <input
                type="text"
                placeholder="Имя"
                name="customerName"
                value={formData.customerName}
                onChange={(e) => {
                  customerName.onChange(e);
                  handleChange(e);
                }}
                onBlur={(e) => customerName.onBlur(e)}
                className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
              />
              {errorsValidation(customerName, { minLength: 2, maxLength: 50 })}
            </div>

            <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
              <label
                htmlFor=""
                className="text-start mt-2 text-white flex justify-start w-full"
              >
                Телефон
              </label>
              <input
                type="tel"
                placeholder="Телефон"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  phone.onChange(e);
                  handleChange(e);
                }}
                onBlur={(e) => phone.onBlur(e)}
                className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
              />
              {errorsValidation(phone, { minLength: 6, maxLength: 50 })}
            </div>
          </form>
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
