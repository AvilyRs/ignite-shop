import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import axios from 'axios';

import { stripe } from 'src/lib/stripe';

import { currency } from 'src/utils/formatters';
import { ProductProps } from 'src/interfaces/product.interface';

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from 'src/styles/pages/product';

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  if (isFallback) {
    return <p>Loading...</p>;
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckout(false);
      alert('Falha ao realizar checkout');
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <img src={product.imageUrl} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button
          type="button"
          onClick={handleBuyProduct}
          disabled={isCreatingCheckout}
        >
          Finalizar
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<unknown, { id: string }> = async ({
  params,
}) => {
  const revalidateTime = 60 * 60 * 2; // 2hours

  const productId = params.id;

  const productResponse = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = productResponse.default_price as Stripe.Price;

  const product = {
    id: productResponse.id,
    name: productResponse.name,
    imageUrl: productResponse.images[0],
    price: currency.format(price.unit_amount / 100),
    description: productResponse.description,
    defaultPriceId: price.id,
  };

  return {
    props: {
      product,
    },
    revalidate: revalidateTime,
  };
};
