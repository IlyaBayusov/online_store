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
