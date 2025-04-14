"use client";

import React, { useEffect } from "react";
import InputInForm from "../InputInForm/InputInForm";
import { IFormDataProfileUserInfo } from "@/interfaces";
import { useForm } from "react-hook-form";
import EditBtnInForm from "../EditBtnInForm/EditBtnInForm";
import { getUserInfoInProfile } from "@/api";

type Props = {};

export default function DetailedInfo({}: Props) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<IFormDataProfileUserInfo>({ mode: "onBlur" });

  const onSubmit = async (data: IFormDataProfileUserInfo) => {};

  useEffect(() => {
    const test = async () => {
      getUserInfoInProfile(1);
    };

    test();
  }, []);

  return (
    <div className="w-full pb-5 border-b border-white">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Подробная информация
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-3 text-base"
      >
        <div className="w-full flex flex-nowrap justify-center items-center">
          <label htmlFor="firstname" className="w-full max-w-72">
            <p>Имя</p>

            <InputInForm />
          </label>
        </div>

        <div className="w-full flex flex-nowrap justify-center items-center">
          <label htmlFor="lastname" className="w-full max-w-72">
            <p>Фамилия</p>

            <InputInForm />
          </label>
        </div>

        <div className="w-full flex flex-nowrap justify-center items-center">
          <label htmlFor="username" className="w-full max-w-72">
            <p>Логин</p>

            <InputInForm />
          </label>
        </div>

        <EditBtnInForm />
      </form>
    </div>
  );
}
