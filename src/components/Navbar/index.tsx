import Image from 'next/image';

import logoSvg from '@/src/assets/logo.svg';

import { Container, Title } from './styles';

export function Navbar() {
  return (
    <Container>
      <Image src={logoSvg} alt="" width={52} height={52} />
      <Title>Ignite Shop</Title>
    </Container>
  );
}
