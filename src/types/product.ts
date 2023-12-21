export type Product = {
  id: number;
  title: string;
  price: number;
};

export type AddProduct = {
  title: string;
  description: string;
  price: number;
};

export type ProductListCardProps = {
  product: Product;
};

export type ProductDetail = {
  id: number;
  title: string;
  description: string;
  price: number;
};
