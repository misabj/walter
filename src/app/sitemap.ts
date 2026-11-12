import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {pages, restaurants} from '@/lib/content';
import {siteUrl} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...pages.map((page) => `/${page}`), ...restaurants.map(({slug}) => `/locations/${slug}`)];
  return paths.flatMap((path) => routing.locales.map((locale) => ({
    url: new URL(`/${locale}${path}`, siteUrl).href,
    alternates: {languages: Object.fromEntries(routing.locales.map((language) => [language, new URL(`/${language}${path}`, siteUrl).href]))}
  })));
}
