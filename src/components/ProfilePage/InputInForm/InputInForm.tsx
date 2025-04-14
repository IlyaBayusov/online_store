import React from "react";

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputInForm({ ...rest }: Props) {
  return (
    <input
      disabled={true}
      type="text"
      className="py-2 px-4 rounded-md mt-1 w-full text-white bg-transparent border border-[#6F00FF]"
      {...rest}
    />
  );
}
