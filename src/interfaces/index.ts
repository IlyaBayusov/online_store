import { StaticImageData } from "next/image";

export interface IProductCategory {
  productId: number;
  name: string;
  image: string;
  price: number;
  categoryName: string;
  categoryId: number;
}

export interface IProductInfo {
  categoryName: string;
  groupId: number;
  id: number;
  name: string;
  color: string;
  description: string;
  price: number;
  sizes: string[];
  quantities: number[];
  images: string[];
  isActive: boolean;
}

export interface IDecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: string;
  sub: string;
  exp: number;
}

export interface IProductInCart {
  cartItemId: number;
  categoryName: string;
  productId: number;
  productName: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

export interface IByProductsForm {
  userId: number;
  totalPrice: number;
  customerName: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: string;
}

// export interface IByProductsItems {
//   cartItemId: number;
//   productId: number;
//   quantity: number;
//   price: number;
//   size: string;
// }

export interface IOrderPost {
  orderDetailsRequest: IByProductsForm;
  orderItemRequest: IProductInCart[];
}

export interface IOrdersGet {
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
}

export interface IFavsGet {
  favoriteId: number;
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
}

export interface ICategory {
  id: number;
  name: string;
  url_name: string;
}

export interface IGetCategories {
  id: number;
  name: string;
  categoryGroup: number;
  imageUrl: StaticImageData;
}

export interface IPostFav {
  userId: number;
  productId: number;
}

export interface IGetFav {
  favoriteId: number;
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
}

export interface IPostNewProduct {
  categoryName: string;
  groupId: null;
  name: string;
  color: string;
  description: string;
  price: number;
  sizes: string[];
  quantities: number[];
}

export interface ISizeAndQuantity {
  size: string;
  quantity: number;
}

export interface IGetUserAdmin {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

export interface IFormDataRegistr {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  secondPassword: string;
}

export interface IFormByAuth {
  username: string;
  password: string;
}

export interface IGetCity {
  id: number;
  city: string;
}

export interface IPagination {
  currentItems: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
