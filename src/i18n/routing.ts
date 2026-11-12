import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['sr', 'en', 'de', 'nl', 'sl', 'bs'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
