import { Roboto_Flex } from 'next/font/google';

import { LayoutProps } from './interface';

const RobotoFont = Roboto_Flex({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--roboto',
});

const fontClasses = RobotoFont.className;

export default function Layout({ children }: LayoutProps) {
  return <div className={fontClasses}>{children}</div>;
}
