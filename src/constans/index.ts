import img_shoes from "../../public/main/category/img_shoes.png";
import img_warm from "../../public/main/category/img_warm.png";
import img_business from "../../public/main/category/img_business.png";
import img_test_shoes1 from "../../public/testImg/img_test_shoes1.png";

export const modalNav = "modalNav";
export const modalNavCategory = "modalNavCategory";

// Chelsea - id - 1
// Sneakers - id - 2
// Pants - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

export const categoriesPages = [
  {
    id: 1,
    name: "Брюки",
    urlName: "Pants",
    img: img_shoes,
    path: "/pants",
  },
  {
    id: 2,
    name: "Рубашки",
    urlName: "Shirts",
    img: img_shoes,
    path: "/shirts",
  },
  {
    id: 3,
    name: "Кеды",
    urlName: "Sneakers",
    img: img_shoes,
    path: "/sneakers",
  },
  {
    id: 4,
    name: "Челси",
    urlName: "Chelsea",
    img: img_shoes,
    path: "/chelsea",
  },
  {
    id: 5,
    name: "Галстуки",
    urlName: "Ties",
    img: img_shoes,
    path: "/ties",
  },
  {
    id: 6,
    name: "Ремни",
    urlName: "Belts",
    img: img_shoes,
    path: "/belts",
  },
];

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
        name: "Брюки",
        urlName: "Pants",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Рубашки",
        urlName: "Shirts",
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
        urlName: "Sneakers",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Челси",
        urlName: "Chelsea",
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
        name: "Галстуки",
        urlName: "Ties",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Ремни",
        urlName: "Belts",
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
