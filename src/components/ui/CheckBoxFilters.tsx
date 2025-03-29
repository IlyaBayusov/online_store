"use client";

import React, { memo, useState } from "react";

type Props = { textValue: string; cb: (textValue: string) => void };

export default memo(function CheckBoxFilters({ textValue, cb }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked((prev) => !prev);
    cb(textValue);
  };

  return (
    <label
      htmlFor={`${textValue}-${textValue}`}
      className="flex items-center gap-2 cursor-pointer"
    >
      <input
        id={`${textValue}-${textValue}`}
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
        className="hidden"
      />

      <div className="w-4 h-4 rounded-sm border-2 bg-transparent border-white flex items-center justify-center transition-all">
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <span className="text-sm text-white">{textValue}</span>
    </label>
  );
});
