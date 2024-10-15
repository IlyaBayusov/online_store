"use client";

import { IProductInfo } from "@/interfaces/Index";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img_test_shoes1 from "../../../public/testImg/img_test_shoes1.png";
import Loader from "../Loader/Loader";
import Link from "next/link";

type Props = {
  id: number;
  arrProduct: IProductInfo[];
  productIdInArray: number;
  category: string;
};

// для описания класс whitespace-pre-line

export default function ProductInfo({
  id,
  arrProduct,
  productIdInArray,
}: Props) {
  const [arrProducts, setArrProducts] = useState<IProductInfo[]>(arrProduct);
  const [nowProduct, setNowProduct] = useState<IProductInfo>(
    arrProduct[productIdInArray]
  );
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setArrProducts(arrProduct);
  //   setNowProduct(arrProduct[productIdInArray]);
  // }, [id, arrProduct]);

  console.log(id, arrProduct, nowProduct, arrProducts);

  if (!nowProduct) return <Loader />;

  return (
    <div className="container px-3">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3 mt-3">
            <div>
              Main / Shoes / Chelsea /{" "}
              <span className="text-orange-200">Chelsea suede brown</span>
            </div>
            <Image src={img_test_shoes1} alt="" className="rounded-md" />

            <div className="w-full flex justify-between items-center">
              <Image
                src={img_test_shoes1}
                alt=""
                className="max-w-16 max-h-16 rounded-md"
              />
              <Image
                src={img_test_shoes1}
                alt=""
                className="max-w-16 max-h-16 rounded-md"
              />
              <Image
                src={img_test_shoes1}
                alt=""
                className="max-w-16 max-h-16 rounded-md"
              />
              <Image
                src={img_test_shoes1}
                alt=""
                className="max-w-16 max-h-16 rounded-md"
              />
              <Image
                src={img_test_shoes1}
                alt=""
                className="max-w-16 max-h-16 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 text-[#FFE4E4] text-center">
              <h1>{nowProduct.name}</h1>
              <p>{`${nowProduct.price} РУБ`}</p>
            </div>

            <div>
              <div>
                <p>Цвет: ЦВЕТ</p>
                <div>
                  {/* {arrProducts.map((item) => (
                    <Link href={`/`} className="" />
                  ))} */}
                </div>
              </div>

              <div>
                <p>Размер: РАЗМЕР</p>
                <div>
                  <button></button>
                  <button></button>
                  <button></button>
                  <button></button>
                  <button></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
