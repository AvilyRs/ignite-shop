import { ProductProps as ProductItemProps } from './home.interface';

interface ProductParamProps extends ProductItemProps {
  description: string;
}

export interface ProductProps {
  product: ProductParamProps;
}
