"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { api } from "@/axios";
import Link from "next/link";
import { useInput } from "@/hooks/useInput";

//
// ------------------------------------ форму сделать в отдельном компоненте
// ------------------------------------ добавить blur всем, сделать динамический вывод в errorsValidation
//

interface IParams {
  minLength: number;
  maxLength: number;
}

export default function Registr() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const firstname = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const lastname = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const username = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const email = useInput("", { empty: true, minLength: 4, maxLength: 50 });
  const password = useInput("", { empty: true, minLength: 6, maxLength: 50 });
  const secondPassword = useInput("", {
    empty: true,
    minLength: 6,
    maxLength: 50,
  });

  const [errorMessageUsername, setErrorMessageUsername] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/username",
          {
            field: username.value,
          }
        );
      } catch (error) {
        console.log("Ошибка проверки username", error);
        setErrorMessageUsername("Такой логин уже сушествует");
      }
    };

    fetchUsername();
  }, [username.value]);

  useEffect(() => {}, [email]);

  // useEffect(() => {
  //   setFormData({
  //     firstName: firstname.value,
  //     lastName: lastname.value,
  //     username: username.value,
  //     email: email.value,
  //     password: password.value,
  //   });

  //   if (
  //     firstname.inputValid &&
  //     lastname.inputValid &&
  //     username.inputValid &&
  //     email.inputValid &&
  //     password.inputValid &&
  //     secondPassword.inputValid
  //   ) {
  //     //отправка
  //   }
  // }, [firstname, lastname, username, email, password, secondPassword]);

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

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleChange = () => {
  //   setFormData({
  //     firstName: firstname.value,
  //     lastName: lastname.value,
  //     username: username.value,
  //     email: email.value,
  //     password: password.value,
  //   });
  // };

  const decodeToken = (accessToken: string) => {
    try {
      const decoded = jwtDecode(accessToken);
      console.log("Decoded token:", decoded);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const response: AxiosResponse = await api.post(
        "http://localhost:8080/api/auth/registration",
        formData
      );

      if (response.status !== 200) {
        const data = await response.data;
        setError(data.message || "Ошибка регистрации");
      } else {
        const data = await response.data;
        localStorage.setItem("accessToken", data.accessToken);
        decodeToken(data.accessToken);
        console.log("Регистрация прошла успешно", data);
      }

      router.push("/auth");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Ошибка при регистрации", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при регистрации");
      }
    }
  };

  return (
    <div className="container px-3 flex flex-col justify-center items-center">
      <h1 className="text-lg uppercase text-center mt-3">Регистрация</h1>
      {error && <p className="text-red-700">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center mt-1 text-black"
      >
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
            name="firstName"
            value={firstname.value}
            onChange={(e) => firstname.onChange(e)}
            onBlur={(e) => firstname.onBlur(e)}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(firstname, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Фамилия
          </label>
          <input
            type="text"
            placeholder="Фамилия"
            name="lastName"
            value={lastname.value}
            onChange={(e) => lastname.onChange(e)}
            onBlur={(e) => lastname.onBlur(e)}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(lastname, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Логин
          </label>
          <input
            type="text"
            placeholder="Логин"
            name="username"
            value={username.value}
            onChange={(e) => {
              username.onChange(e);
            }}
            onBlur={(e) => username.onBlur(e)}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {<span className="text-red-600 text-xs">{errorMessageUsername}</span>}
          {errorsValidation(username, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email.value}
            onChange={(e) => email.onChange(e)}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Пароль
          </label>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(password, { minLength: 6, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Повторить пароль
          </label>
          <input
            type="password"
            placeholder="Повторить пароль"
            name="secondPassword"
            value={secondPassword.value}
            onChange={(e) => secondPassword.onChange(e)}
            onBlur={(e) => secondPassword.onBlur(e)}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(secondPassword, { minLength: 6, maxLength: 50 })}
        </div>

        <button className="bg-white py-2 px-5 rounded-md mt-3" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link href={"/auth"} className="text-gray-400 text-base mt-1">
        Войти в аккаунт
      </Link>
    </div>
  );
}
