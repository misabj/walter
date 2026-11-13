import type {Metadata} from 'next';
import {routing, type Locale} from '@/i18n/routing';

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000'));

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}${path}`])),
        'x-default': `/en${path}`
      }
    },
    openGraph: {
      title, description, type: 'website', siteName: 'WALTER',
      locale: {sr: 'sr_RS', en: 'en_GB', de: 'de_DE', nl: 'nl_NL', sl: 'sl_SI', bs: 'bs_BA'}[locale],
      url: `/${locale}${path}`,
      images: [{url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: 'WALTER'}]
    },
    twitter: {card: 'summary_large_image', title, description},
    robots: process.env.NEXT_PUBLIC_SITE_URL ? {index: true, follow: true} : {index: false, follow: false}
  };
}
