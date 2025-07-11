"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IFormDataRegistr } from "@/interfaces";
import { useFormRegistrStore } from "@/stores/useFormRegistrStore";
import { useForm } from "react-hook-form";

type Props = {
  setSubmit: () => void;
};

export default function FormByRegistr({ setSubmit }: Props) {
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");

  const [error, setError] = useState("");

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
  } = useForm<IFormDataRegistr>({ mode: "onBlur" });

  const { setFormDataRegistr } = useFormRegistrStore();

  const username = watch("username");
  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    const fetchUsername = async () => {
      setErrorMessageUsername("");

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/username",
          {
            field: username,
          }
        );
      } catch (error) {
        setErrorMessageUsername("Такой логин уже сушествует");
        console.log("Ошибка проверки username", error);
      }
    };

    fetchUsername();
  }, [username]);

  useEffect(() => {
    setErrorMessageEmail("");

    const fetchEmail = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/email/check",
          {
            field: email,
          }
        );
      } catch (error) {
        setErrorMessageEmail("Такой email уже сушествует");

        console.log("Ошибка проверки email", error);
      }
    };

    fetchEmail();
  }, [email]);

  const onSubmit = async (data: IFormDataRegistr) => {
    if (!isValid || errorMessageUsername || errorMessageEmail) {
      setError("Некоторые поля заполнены неверно");
      return;
    }
    console.log(data);

    setError("");

    setFormDataRegistr(data);
    setSubmit(); //callback для перенаправления на подтв. кода

    try {
      await axios.get(`http://localhost:8080/api/v1/mail?email=${email}`);
    } catch (error) {
      console.log("Ошибка отправки запроса на подтверждение кода", error);
      return;
    }
  };

  return (
    <div className="px-px flex flex-col justify-center items-center w-full max-w-72">
      <h1 className="relative mb-3 text-lg font-bold uppercase text-center mt-3">
        <span>Регистрация</span>

        {error && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 normal-case text-nowrap text-red-600 text-xs">
            {error}
          </span>
        )}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center text-black gap-5"
      >
        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="text"
            placeholder="Имя"
            {...register("firstName", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errors?.firstName && (errors?.firstName?.message || "Ошибка!")}
            </span>
          }
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="text"
            placeholder="Фамилия"
            {...register("lastName", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errors?.lastName && (errors?.lastName?.message || "Ошибка!")}
            </span>
          }
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="text"
            placeholder="Логин"
            {...register("username", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorMessageUsername && (
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errorMessageUsername}
            </span>
          )}
          {
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errors?.username && (errors?.username?.message || "Ошибка!")}
            </span>
          }
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 4,
                message: "Минимум 4 символа",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный email",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorMessageEmail && (
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errorMessageEmail}
            </span>
          )}
          {
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errors?.email && (errors?.email?.message || "Ошибка!")}
            </span>
          }
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errors?.password && (errors?.password?.message || "Ошибка!")}
            </span>
          }
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full">
          <input
            type="password"
            placeholder="Повторить пароль"
            {...register("secondPassword", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
              validate: (value) => value === password || "Пароли не совпадают",
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />

          {
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs">
              {errors?.secondPassword &&
                (errors?.secondPassword?.message || "Ошибка!")}
            </span>
          }
        </div>

        <button className="bg-white py-2 px-5 rounded-md mt-1" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link href={"/auth"} className="text-gray-400 text-base mt-1">
        Войти в аккаунт
      </Link>
    </div>
  );
}
