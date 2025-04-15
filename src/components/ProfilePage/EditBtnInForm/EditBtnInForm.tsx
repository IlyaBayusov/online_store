"use client";

import React from "react";

type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditBtnInForm({ ...rest }: Props) {
  return (
    <button className="bg-white py-2 px-5 rounded-md mt-1 text-black" {...rest}>
      Готово
    </button>
  );
}
