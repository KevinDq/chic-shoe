export type Category = "sandales" | "baskets" | "talons";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sizes: number[];
  color: string[];
  images: string[];
  category: Category;
  rating: number;
  reviews: number;
  stock: number;
}
