import HeadNext from 'next/head';
import { HeadProps } from './interface';

export function Head({ title }: HeadProps) {
  return (
    <HeadNext>
      <title>{title && `${title} |`} Ignite Shop</title>
      <meta name="description" content="An ignite shop application" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </HeadNext>
  );
}
