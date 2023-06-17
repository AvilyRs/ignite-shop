import Stripe from 'stripe';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { stripe } from 'src/lib/stripe';
import { SuccessProps } from 'src/interfaces/success.interface';
import { SuccessContainer, ImageContainer } from 'src/styles/pages/success';
import Image from 'next/image';

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <Image src={product.imageUrl} width={110} height={120} alt="" />
      </ImageContainer>

      <p>
        Uhuul! <strong>{customerName}</strong>! você comprou{' '}
        <strong>{product.name}</strong>.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.success_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    // This properties does not apper the console log, do you have to expend to see
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
