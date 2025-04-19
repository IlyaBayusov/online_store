import img_belts from "../../public/main/category/img_belts.webp";
import img_chelsea from "../../public/main/category/img_chelsea.webp";
import img_shirts from "../../public/main/category/img_shirts.webp";
import img_sneakers from "../../public/main/category/img_sneakers.webp";
import img_ties from "../../public/main/category/img_ties.webp";
import img_trousers from "../../public/main/category/img_trousers.webp";

import img_acc from "../../public/main/category/img_acc.webp";
import img_cloth from "../../public/main/category/img_cloth.jpg";
import img_shoes from "../../public/main/category/img_shoes.jpg";

export const sizePage = 15;

export const baseURL = "http://localhost:3000";

export const mainPage = "/";
export const cartPage = "/cart";
export const favPage = "/favorites";
export const ordersPage = "/orders";
export const profilePage = "/profile";
export const categoryListPages = "products";
export const adminMenuPage = "/adminMenu";
export const adminProfilesPage = "/adminMenu/profiles";
export const adminOrdersPage = "/adminMenu/orders";
export const authPage = "/auth";
export const registrPage = "/registr";

export const modalNav = "modalNav";
export const modalNavCategory = "modalNavCategory";
export const modalCartDeleteProduct = "modalCartDeleteProduct";
export const modalSuccessOrder = "modalSuccessOrder";
export const modalNewProductAdmin = "modalNewProductAdmin";
export const modalDeleteEditNewProduct = "modalDeleteEditNewProduct";
export const modalFilters = "modalFilters";

export const filtersKeyProductsPage = "filtersKeyProductsPage";
export const filtersKeyModalNav = "filtersKeyModalNav";

export const messageCount = "Нет на складе";

export const minMaxValueInputFilter = 100000;

export const maxPagesInPagination = 9;
export const maxButtonsUpToDotsInPagin = maxPagesInPagination - 2;

export const filtersUpDown = [
  {
    id: 0,
    name: "Новые",
    value: "id,desc",
  },
  {
    id: 1,
    name: "Старые",
    value: "id,asc",
  },
  {
    id: 2,
    name: "Дорогие",
    value: "price,desc",
  },
  {
    id: 3,
    name: "Дешевые",
    value: "price,asc",
  },
  {
    id: 4,
    name: "По имени, а-я",
    value: "name,asc",
  },
  {
    id: 5,
    name: "По имени, я-а",
    value: "name,desc",
  },
];

export const categoriesPages = [
  {
    id: 1,
    name: "Брюки",
    urlName: "trousers",
    img: img_shoes,
    path: "/trousers",
  },
  {
    id: 2,
    name: "Рубашки",
    urlName: "shirts",
    img: img_shoes,
    path: "/shirts",
  },
  {
    id: 3,
    name: "Кеды",
    urlName: "sneakers",
    img: img_shoes,
    path: "/sneakers",
  },
  {
    id: 4,
    name: "Челси",
    urlName: "chelsea",
    img: img_shoes,
    path: "/chelsea",
  },
  {
    id: 5,
    name: "Галстуки",
    urlName: "ties",
    img: img_shoes,
    path: "/ties",
  },
  {
    id: 6,
    name: "Ремни",
    urlName: "belts",
    img: img_shoes,
    path: "/belts",
  },
];

export const categories = [
  {
    id: 2,
    name: "Одежда",
    img: img_cloth,
    next: [
      {
        id: 1,
        name: "Брюки",
        img: img_trousers,
      },
      {
        id: 2,
        name: "Рубашки",
        img: img_shirts,
      },
    ],
  },
  {
    id: 3,
    name: "Обувь",
    img: img_shoes,
    next: [
      {
        id: 1,
        name: "Кеды",
        urlName: "sneakers",
        img: img_sneakers,
      },
      {
        id: 2,
        name: "Челси",
        urlName: "chelsea",
        img: img_chelsea,
      },
    ],
  },
  {
    id: 4,
    name: "Аксессуары",
    img: img_acc,
    next: [
      {
        id: 1,
        name: "Галстуки",
        urlName: "ties",
        img: img_ties,
      },
      {
        id: 2,
        name: "Ремни",
        urlName: "belts",
        img: img_belts,
      },
    ],
  },
];

export const categoriesList = [
  { id: 1, name: "Челси" },
  { id: 2, name: "Кеды" },
  { id: 3, name: "Брюки" },
  { id: 4, name: "Рубашки" },
  { id: 5, name: "Галстуки" },
  { id: 6, name: "Ремни" },
];

export const colors = [
  { name: "Белый", value: "#f0f0f0" },
  { name: "Черный", value: "#333333" },
  { name: "Коричневый", value: "#a0522d" },
  { name: "Бежевый", value: "#e0d4b0" },
  { name: "Серый", value: "#a9a9a9" },
  { name: "Темно-синий", value: "#191970" },
  { name: "Зеленый", value: "#6b8e23" },
  { name: "Синий", value: "#4682b4" },
  { name: "Голубой", value: "#87cefa" },
  { name: "Бордовый", value: "#800020" },
  { name: "Черно-серый", value: "#555555" },
];

export const selectCategoryies = [
  { name: "Челси", value: "Chelsea" },
  { name: "Кеды", value: "Sneakers" },
  { name: "Брюки", value: "Trousers" },
  { name: "Рубашки", value: "Shirts" },
  { name: "Галстуки", value: "Ties" },
  { name: "Ремни", value: "Belts" },
];

export const selectSiziesCloth = [
  { name: "44" },
  { name: "46" },
  { name: "48" },
  { name: "50" },
  { name: "52" },
  { name: "54" },
  { name: "56" },
  { name: "58" },
  { name: "60" },
  { name: "62" },
  { name: "64" },
];

export const selectSiziesShoes = [
  { name: "39" },
  { name: "40" },
  { name: "41" },
  { name: "42" },
  { name: "43" },
  { name: "44" },
  { name: "45" },
  { name: "46" },
];
