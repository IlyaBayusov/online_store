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
  productId: number;
  productName: string;
  price: number;
  sizes: string;
  quantity: number;
  image: string;
}
