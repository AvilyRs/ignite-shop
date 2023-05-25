import Head from 'next/head';
import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import tshirt1 from 'src/assets/tshirts/1.png';
import tshirt2 from 'src/assets/tshirts/2.png';
import tshirt3 from 'src/assets/tshirts/3.png';
import tshirt4 from 'src/assets/tshirts/4.png';

import { HomeContainer } from 'src/styles/pages/home';
import { Product } from 'src/styles/pages/home';

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="description" content="An ignite shop application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        <Product href="#" className="keen-slider__slide">
          <Image src={tshirt1} width={520} height={480} alt="" />

          <footer>
            <strong>Camiseta</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product href="#" className="keen-slider__slide">
          <Image src={tshirt2} width={520} height={480} alt="" />

          <footer>
            <strong>Camiseta</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>

        <Product href="#" className="keen-slider__slide">
          <Image src={tshirt3} width={520} height={480} alt="" />

          <footer>
            <strong>Camiseta</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product href="#" className="keen-slider__slide">
          <Image src={tshirt4} width={520} height={480} alt="" />

          <footer>
            <strong>Camiseta</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
      </HomeContainer>
    </>
  );
}
