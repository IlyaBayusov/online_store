"use client";

import { useInput } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

type Props = {};

interface IParams {
  minLength: number;
  maxLength: number;
}

export default function FormByProducts({}: Props) {
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
  const phone = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const country = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const city = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const address = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const postalCode = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const paymentMethod = useInput("", {
    empty: true,
    minLength: 2,
    maxLength: 50,
  });

  const [error, setError] = useState("");

  const router = useRouter();

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
  return (
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

      <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
        <label
          htmlFor=""
          className="text-start mt-2 text-white flex justify-start w-full"
        >
          Страна
        </label>
        <input
          type="text"
          placeholder="Страна"
          name="country"
          value={formData.country}
          onChange={(e) => {
            country.onChange(e);
            handleChange(e);
          }}
          onBlur={(e) => country.onBlur(e)}
          className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
        />
        {errorsValidation(country, { minLength: 2, maxLength: 50 })}
      </div>

      <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
        <label
          htmlFor=""
          className="text-start mt-2 text-white flex justify-start w-full"
        >
          Город
        </label>
        <input
          type="text"
          placeholder="Город"
          name="city"
          value={formData.city}
          onChange={(e) => {
            city.onChange(e);
            handleChange(e);
          }}
          onBlur={(e) => city.onBlur(e)}
          className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
        />
        {errorsValidation(city, { minLength: 2, maxLength: 50 })}
      </div>

      <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
        <label
          htmlFor=""
          className="text-start mt-2 text-white flex justify-start w-full"
        >
          Адрес
        </label>
        <input
          type="text"
          placeholder="Адрес"
          name="address"
          value={formData.address}
          onChange={(e) => {
            address.onChange(e);
            handleChange(e);
          }}
          onBlur={(e) => address.onBlur(e)}
          className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
        />
        {errorsValidation(address, { minLength: 2, maxLength: 50 })}
      </div>

      <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
        <label
          htmlFor=""
          className="text-start mt-2 text-white flex justify-start w-full"
        >
          Почтовый индекс
        </label>
        <input
          type="text"
          placeholder="Почтовый индекс"
          name="postalCode"
          value={formData.postalCode}
          onChange={(e) => {
            postalCode.onChange(e);
            handleChange(e);
          }}
          onBlur={(e) => postalCode.onBlur(e)}
          className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
        />
        {errorsValidation(postalCode, { minLength: 2, maxLength: 50 })}
      </div>
    </form>
  );
}
