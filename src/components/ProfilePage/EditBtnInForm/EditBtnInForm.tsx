"use client";

import React, { useState } from "react";

type Props = {
  cb: (valueBool: boolean) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditBtnInForm({ cb, ...rest }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleClickChange = () => {
    setIsActive(true);
    cb(true);
  };

  const handleClickReady = () => {
    setIsActive(false);
  };

  return !isActive ? (
    <button
      className="bg-white py-2 px-5 rounded-md mt-1 text-black"
      onClick={handleClickChange}
    >
      Изменить
    </button>
  ) : (
    <button
      className="bg-white py-2 px-5 rounded-md mt-1 text-black"
      onClick={handleClickReady}
      {...rest}
    >
      Готово
    </button>
  );
}
