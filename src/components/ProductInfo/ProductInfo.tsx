"use client";

import {
  IDecodedToken,
  IGetSubCategoryId,
  IPostAvailability,
  IPostCartExistProduct,
  IPostProductInFavs,
  IProductInfo,
} from "@/interfaces/index";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { decodeToken, getCodeColor, getColorAvailability } from "@/utils";
import ProductTabs from "../Tabs/ProductTabs";
import { RiShoppingBasketLine, RiShoppingBasketFill } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { api, postAvailability } from "@/axios";
import {
  getCountAndPriceProductsCart,
  postCartExistProduct,
  postFav,
  postProductsInFavs,
} from "@/api";
import { useCartStore } from "@/stores/useCartStore";
import Cookies from "js-cookie";
import { statusAvailCall, statusAvailStock } from "@/constans";

type Props = {
  arrProduct: IProductInfo[];
  productIdInArray: number;
  category: IGetSubCategoryId;
};

export default function ProductInfo({
  arrProduct,
  productIdInArray,
  category,
}: Props) {
  const [arrProducts, setArrProducts] = useState<IProductInfo[]>(arrProduct);
  const [nowProduct, setNowProduct] = useState<IProductInfo>(
    arrProduct[productIdInArray]
  );

  const [selectedSize, setSelectedSize] = useState<string>(nowProduct.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(nowProduct.color);
  const [selectedImage, setSelectedImage] = useState<string>(
    nowProduct.images[0]
  );

  const [isActiveCart, setIsActiveCart] = useState(false);
  const [isActiveFav, setIsActiveFav] = useState(false);

  const [nowCartItem, setNowCartItem] = useState<IPostCartExistProduct>();
  const [nowFavItem, setNowFavItem] = useState<IPostProductInFavs>();

  const [avail, setAvail] = useState<IPostAvailability[]>([]);

  const params = useParams();

  const { getCount, deleteProductInCart } = useCartStore();

  useEffect(() => {
    const setActiveBtnCart = async () => {
      const data: IPostCartExistProduct = await postCartExistProduct(
        nowProduct.id,
        selectedSize
      );

      if (!data) return;

      if (data.productId === nowProduct.id) {
        setIsActiveCart(true);
        setNowCartItem(data);
      } else {
        setIsActiveCart(false);
      }
    };

    setActiveBtnCart();
  }, [nowProduct]);

  useEffect(() => {
    const setActiveBtnFav = async () => {
      const data: {
        favoriteId: number;
      } = await postProductsInFavs(nowProduct.id);

      if (!data) return;

      if (data.favoriteId) {
        setIsActiveFav(true);
        setNowFavItem(data);
      } else {
        setIsActiveFav(false);
      }
    };

    setActiveBtnFav();
  }, [nowProduct]);

  useEffect(() => {
    const getDataPostAvailability = async () => {
      const data: IPostAvailability[] = await postAvailability(
        nowProduct.id,
        selectedSize
      );

      if (!data) return;

      setAvail(data);
    };

    if (Cookies.get("city")) {
      getDataPostAvailability();
    }
  }, []);

  const handleClickCart = async () => {
    try {
      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveCart && nowCartItem) {
        setIsActiveCart(false);
        //удаление из корзины
        await api.delete(`/v1/cart/${nowCartItem.cartItemId}`);
        deleteProductInCart(nowCartItem.cartItemId);
      } else {
        setIsActiveCart(true);
        //добавление в корзину
        const response = await api.post("/v1/cart", {
          userId: decodedToken.id,
          productId: nowProduct.id,
          quantity: 1,
          size: selectedSize,
        });
        const data = await response.data;
        setNowCartItem(data);
      }

      const data: {
        countOfProducts: number;
        totalPrice: number;
      } = await getCountAndPriceProductsCart();

      if (data) {
        getCount(data.countOfProducts);
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в корзину: ", error);
    }
  };

  const handleClickFav = async () => {
    try {
      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveFav && nowFavItem) {
        setIsActiveFav(false);
        //удаление из избранных
        await api.delete(`/v1/favorites/${nowFavItem.favoriteId}`);
      } else {
        setIsActiveFav(true);
        //добавление в избранные
        await postFav({
          userId: decodedToken.id,
          productId: nowProduct.id,
        });
        console.log({
          userId: decodedToken.id,
          productId: nowProduct.id,
        });
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в избранных: ", error);
    }
  };

  const getFirstStock = () => {
    if (!avail.length) return statusAvailCall;

    const availIndex = avail.findIndex(
      (status) => status.status === statusAvailStock
    );
    if (availIndex !== -1) {
      return avail[availIndex].status;
    } else {
      return avail[0].status;
    }
  };

  return (
    <div className="container px-3">
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-3">
          {/* 1 блок */}
          <div className="flex flex-col items-center gap-3 mt-3 text-base">
            <div className="w-full">
              <div className="flex items-start justify-start gap-1 w-full">
                <Link href="/" className="hover:text-orange-200 transition-all">
                  Главная{" "}
                </Link>
                <p>/</p>
                <Link
                  href={`/${params.products}`}
                  className="hover:text-orange-200 transition-all"
                >
                  {category.name}
                </Link>
                <p>/</p>
              </div>
              <p className="text-orange-200">{nowProduct.name}</p>
            </div>

            <Image
              src={selectedImage}
              width={351}
              height={494}
              alt={nowProduct.name}
              className="rounded-md max-w-[75%]"
            />

            <div className="w-full flex justify-between items-center">
              {nowProduct.images.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width={351}
                  height={494}
                  alt={nowProduct.name}
                  className="max-w-16 rounded-md"
                  onClick={() => setSelectedImage(nowProduct.images[index])}
                />
              ))}
            </div>
          </div>

          {/* 2 блок */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-center text-[#FFE4E4] text-center">
              <h1>{nowProduct.name}</h1>
              <p>{`${nowProduct.price} РУБ`}</p>
            </div>

            <div className="flex flex-col items-start mt-3">
              <div className="flex items-center flex-nowrap gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: `${
                      getColorAvailability(avail).statusColor
                    }`,
                  }}
                ></div>

                <p className="">{getFirstStock()}</p>
              </div>

              <p className="">Артикул: {nowProduct.id}</p>
              <p className="">Бренд: {nowProduct.brandName}</p>

              <div className="full">
                <p>Цвет: {selectedColor}</p>
                <div className="flex items-center gap-2 mt-1">
                  {arrProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${params.products}/${item.id}`}
                      className=""
                    >
                      <div
                        style={{
                          background: getCodeColor(item.color.toLowerCase()),
                        }}
                        className={
                          "w-6 h-6 rounded-full " +
                          (item.color == selectedColor
                            ? "border-2 border-white"
                            : "")
                        }
                        onClick={() => setSelectedColor(nowProduct.color)}
                      ></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-1 w-full">
                <p>
                  Размер:{" "}
                  {Number.isNaN(selectedSize) ? "Стандартный" : selectedSize}
                </p>
                <div className="flex justify-between items-center mt-1 w-full">
                  {nowProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={
                        "py-2 px-5 rounded-md text-base " +
                        (Number(size) == Number(selectedSize)
                          ? "bg-[#895D5D] text-white"
                          : "bg-white text-black")
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 блок */}
          <div className="flex justify-between items-center w-full gap-3">
            <button
              className={
                "flex justify-center items-center gap-1 py-2 w-full rounded-md text-white border border-[#895D5D] " +
                (isActiveCart ? "bg-[#895D5D]" : "border border-[#895D5D]")
              }
              onClick={handleClickCart}
            >
              {isActiveCart ? (
                <RiShoppingBasketFill className="h-5 w-5 ml-px" />
              ) : (
                <RiShoppingBasketLine className="h-5 w-5" />
              )}
            </button>
            <button
              className={
                "flex justify-center items-center gap-1 py-2 w-full rounded-md text-white border border-[#895D5D] " +
                (isActiveFav ? "bg-[#895D5D]" : "")
              }
              onClick={handleClickFav}
            >
              {isActiveFav ? (
                <MdFavorite className="h-5 w-5 mr-px" />
              ) : (
                <MdFavoriteBorder className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* 4 блок */}
          <ProductTabs
            category={category.mainCategory}
            description={nowProduct.description}
            avails={avail}
          />
        </div>
      </div>
    </div>
  );
}
