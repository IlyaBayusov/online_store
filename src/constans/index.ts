import img_shoes from "../../public/main/category/img_shoes.png";
import img_warm from "../../public/main/category/img_warm.png";
import img_business from "../../public/main/category/img_business.png";
import img_test_shoes1 from "../../public/testImg/img_test_shoes1.png";

export const modalNav = "modalNav";
export const modalNavCategory = "modalNavCategory";

export const categories = [
  {
    id: 1,
    name: "Новинки",
    img: img_shoes,
  },
  {
    id: 2,
    name: "Одежда",
    img: img_warm,
    next: [
      {
        id: 1,
        name: "Костюмы",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Пальто",
        img: img_shoes,
      },
    ],
  },
  {
    id: 3,
    name: "Обувь",
    img: img_business,
    next: [
      {
        id: 1,
        name: "Кеды",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Кроссовки",
        img: img_shoes,
      },
    ],
  },
  {
    id: 4,
    name: "Аксессуары",
    img: img_shoes,
    next: [
      {
        id: 1,
        name: "Бабочки",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Галстуки",
        img: img_shoes,
      },
    ],
  },
];

export const newArrivals = [
  {
    id: 1,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 2,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 3,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 4,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 5,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 6,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
];
