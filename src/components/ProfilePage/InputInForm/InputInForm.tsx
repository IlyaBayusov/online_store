import React from "react";

type Props = {
  idInput: string;
};

export default function InputInForm({ idInput }: Props) {
  return (
    <input
      id={idInput}
      type="text"
      className="py-2 px-4 rounded-md mt-1 w-full text-white bg-transparent border border-[#6F00FF]"
    />
  );
}
