import { Roboto_Flex } from 'next/font/google';

import { Navbar } from 'src/components/Navbar';

import { LayoutProps } from './interface';
import { Container } from './styles';

const RobotoFont = Roboto_Flex({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--roboto',
});

const fontClasses = RobotoFont.className;

export default function Layout({ children }: LayoutProps) {
  return (
    <Container className={fontClasses}>
      <Navbar />
      {children}
    </Container>
  );
}
