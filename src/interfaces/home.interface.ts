export interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export interface HomeProps {
  products: ProductProps[];
}
