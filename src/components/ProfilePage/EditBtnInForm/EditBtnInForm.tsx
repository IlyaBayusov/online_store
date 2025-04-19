"use client";

import React from "react";

type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditBtnInForm({ children, ...rest }: Props) {
  return (
    <button className="relative text-white py-1.5 text-nowrap" {...rest}>
      {children}
    </button>
  );
}
