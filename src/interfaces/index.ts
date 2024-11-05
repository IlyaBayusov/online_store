export interface IProductCategory {
  productId: number;
  name: string;
  image: string;
  price: number;
}

export interface IProductInfo {
  id: number;
  name: string;
  color: string;
  description: string;
  price: number;
  sizes: string[];
  quantities: number[];
  images: string[];
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
  categoryId: number;
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
