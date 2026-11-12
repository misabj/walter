import localFont from 'next/font/local';
import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {siteUrl} from '@/lib/seo';
import '../globals.css';

const manrope = localFont({
  src: '../../../public/fonts/Manrope-Variable.woff2',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800'
});

export const metadata: Metadata = {metadataBase: siteUrl};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={manrope.variable}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
