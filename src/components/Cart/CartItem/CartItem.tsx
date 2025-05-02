"use client";

import { getCountAndPriceProductsCart, postCount, putProductCart } from "@/api";
import { messageCount, modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = { product: IProductInCart };

export default memo(function CartItem({ product }: Props) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [count, setCount] = useState({} as { productCount: number });
  const [titleCount, setTitleCount] = useState<string>("");
  const [isDisabledPlus, setIsDisabledPlus] = useState(false);
  const [isDisabledMinus, setIsDisabledMinus] = useState(false);

  const { updateQuantity, getCount, getPrice } = useCartStore();
  const { openModal, addModalProps } = useModalStore();

  useEffect(() => {
    const getCountItem = async () => {
      const dataCount = await postCount(product.productId, product.size);

      if (dataCount) {
        setCount(dataCount);
      }

      if (!quantity) {
        setIsDisabledPlus(true);
        setIsDisabledMinus(true);

        setQuantity(0);
        setTitleCount(messageCount);
        return;
      }

      setQuantity(product.quantity);
      setTitleCount("");
    };

    getCountItem();
  }, []);

  useEffect(() => {
    updateQuantity(product.productId, quantity);

    if (quantity <= 1 && !titleCount) {
      setIsDisabledMinus(true);
      setIsDisabledPlus(false);
      setQuantity(1);
    }

    if (quantity >= 100) {
      setIsDisabledPlus(true);
      setIsDisabledMinus(false);
      setQuantity(100);
    }
  }, [quantity]);

  useEffect(() => {
    if (quantity === count.productCount) {
      setIsDisabledPlus(true);
    }
  }, [count]);

  const putQuantity = async (quant: number) => {
    const response = await putProductCart(product, quant);
    const data = await response?.data;

    const dataCart: {
      countOfProducts: number;
      totalPrice: number;
    } = await getCountAndPriceProductsCart();

    if (data && dataCart) {
      getCount(dataCart.countOfProducts);
      getPrice(dataCart.totalPrice);

      return data.quantity;
    }
  };

  const handleClickMinus = async () => {
    if (quantity < 1) return;

    setIsDisabledPlus(false);
    setQuantity((prev) => prev - 1);

    const dataQuantity = await putQuantity(quantity - 1);

    if (!dataQuantity) {
      setQuantity((prev) => prev + 1);

      return;
    }
  };

  const handleClickPlus = async () => {
    setIsDisabledMinus(false);

    if (quantity < 100 && quantity < count.productCount) {
      setQuantity((prev) => prev + 1);
    }

    if (quantity + 1 === 100 || quantity + 1 === count.productCount) {
      setIsDisabledPlus(true);
    }

    const dataQuantity = await putQuantity(quantity + 1);

    if (!dataQuantity) {
      setQuantity((prev) => prev - 1);
      return;
    }
  };

  const handleOpenModal = () => {
    addModalProps(modalCartDeleteProduct, {
      cartItemId: product.cartItemId,
      isDeleted: false,
    });

    openModal(modalCartDeleteProduct);
  };

  return (
    <div
      key={product.productId}
      className="flex flex-col justify-center items-center w-full p-3 bg-black mb-3 rounded-md"
    >
      <div className="flex justify-between w-full mb-2">
        <div className="flex justify-start gap-3 w-full">
          <Link
            href={`/${product.subcategoryId}/${product.productId}`}
            className="max-w-20"
          >
            <Image
              width={350}
              height={500}
              src={product.image}
              alt={product.productName}
              className="rounded-md"
            />
          </Link>

          <div className="flex flex-col justify-start">
            <Link href={`/${product.subcategoryId}/${product.productId}`}>
              <h2 className="text-base leading-5">{product.productName}</h2>
            </Link>

            <div className="text-sm text-start mt-1">
              <p>Размер: {product.size}</p>
              <p>Артикул: {product.productId}</p>
            </div>

            <div className="flex justify-start items-center mt-2">
              <button
                disabled={isDisabledMinus}
                className="w-6 h-6 flex justify-center items-center disabled:bg-[#3A3A3A] bg-fuchsia-700 rounded-md"
                onClick={handleClickMinus}
              >
                <FaMinus className="w-4 h-4 text-white" />
              </button>
              <div className="flex justify-center items-center w-6 h-6">
                <p className="text-base text-center">{quantity}</p>
              </div>
              <button
                disabled={isDisabledPlus}
                className="w-6 h-6 flex justify-center items-center disabled:bg-[#3A3A3A] bg-fuchsia-700 rounded-md"
                onClick={handleClickPlus}
              >
                <FaPlus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-4 h-4">
          <RiDeleteBin6Line
            className="w-4 h-4 mt-0.5"
            onClick={handleOpenModal}
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full border-t border-[#B3B3B3] pt-2">
        <p className="text-base">{`${product.price} руб.`}</p>

        <button className="py-1 px-3 text-sm text-orange-400 border border-orange-400 rounded-md">
          Купить
        </button>
      </div>
    </div>
  );
});
