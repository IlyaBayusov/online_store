import React from "react";

export default function Cart() {
  const arrProducts: object[] = [];

  return (
    <div className="container px-2">
      {/* {arrProducts.map(item, (index) => (
        <div key={index}>{item}</div>
      ))} */}

      {arrProducts.length ? (
        <button className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-orange-400">
          <span className="text-base leading-none">К оформлению</span>
          <span className="text-base leading-none">кол-во, цена</span>
        </button>
      ) : (
        <button
          disabled
          className="flex flex-col items-center fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1.5rem)] py-2 rounded-md bg-[#3A3A3A]"
        >
          <span className="text-base leading-none text-[#B3B3B3]">
            Корзина пуста
          </span>
        </button>
      )}
    </div>
  );
}
