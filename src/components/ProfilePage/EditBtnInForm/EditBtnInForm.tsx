import React from "react";

type Props = {};

export default function EditBtnInForm({}: Props) {
  return (
    <button
      className="bg-white py-2 px-5 rounded-md mt-1 text-black"
      type="submit"
    >
      Изменить
    </button>
  );
}
