import {getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {pages} from '@/lib/content';
import {routing} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';
import {StorySection} from '@/components/story-section';
import {RestaurantMenus} from '@/components/restaurant-menus';
import {LocationFinder} from '@/components/location-finder';
import {ComingSoonSection} from '@/components/coming-soon-section';
import {EditorialSection} from '@/components/editorial-section';
import {CateringSection} from '@/components/catering-section';
import {CareersSection} from '@/components/careers-section';

type Props = {params: Promise<{locale: string; page: string}>};

function isPage(value: string): value is (typeof pages)[number] {
  return pages.some((page) => page === value);
}

export function generateStaticParams() {
  return pages.map((page) => ({page}));
}

export const dynamicParams = false;

export async function generateMetadata({params}: Props) {
  const {locale, page} = await params;
  if (!hasLocale(routing.locales, locale) || !isPage(page)) notFound();
  const t = await getTranslations({locale});
  const title = page === 'amsterdam' ? `${t('amsterdam.line1')} ${t('amsterdam.line2')}` : t(`nav.${page}`);
  const description = page === 'catering' ? t('catering.intro') : page === 'careers' ? t('careerPage.intro') : t('meta.description');
  return pageMetadata(locale, `/${page}`, `${title} — WALTER`, description);
}

export default async function ContentPage({params}: Props) {
  const {locale, page} = await params;
  if (!hasLocale(routing.locales, locale) || !isPage(page)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const title = page === 'amsterdam' ? 'Amsterdam' : t(`nav.${page}`);
  return (
    <main id="main" tabIndex={-1}>
      <h1 className="sr-only">{title}</h1>
      {page === 'story' && <StorySection />}
      {page === 'menu' && <RestaurantMenus />}
      {page === 'locations' && <LocationFinder />}
      {page === 'amsterdam' && <ComingSoonSection />}
      {page === 'catering' && <CateringSection />}
      {page === 'careers' && <CareersSection />}
      {page === 'news' && <EditorialSection kind="news" />}
    </main>
  );
}
