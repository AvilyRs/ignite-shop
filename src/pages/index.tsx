import Image from 'next/image';
import Stripe from 'stripe';
import { GetStaticProps } from 'next';
import { currency } from 'src/utils/formatters';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { HomeContainer } from 'src/styles/pages/home';
import { Product } from 'src/styles/pages/home';
import { stripe } from 'src/lib/stripe';
import { HomeProps } from '../interfaces/home.interface';
import { Head } from 'src/components/Head';

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head />
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            prefetch={false}
            href={`/product/${product.id}`}
            key={product.id}
            className="keen-slider__slide"
          >
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const productPrice = product.default_price as Stripe.Price;
    const price = productPrice.unit_amount / 100;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // 100 to convert, because it is in centavos
      price: currency.format(price),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
