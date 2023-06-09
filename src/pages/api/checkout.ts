import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from 'src/lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found' });
  }

  const succesUrl = `${process.env.NEXT_URL}/success?success_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: succesUrl,
    cancel_url: cancelUrl,
    line_items: [{ price: priceId, quantity: 1 }],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
