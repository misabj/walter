import {getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {pages} from '@/lib/content';
import {restaurantMenus} from '@/lib/restaurant-menus';
import {routing} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';
import {StorySection} from '@/components/story-section';
import {RestaurantMenus} from '@/components/restaurant-menus';
import {MenuExplorer} from '@/components/menu-explorer';
import {LocationFinder} from '@/components/location-finder';
import {ComingSoonSection} from '@/components/coming-soon-section';
import {EditorialSection} from '@/components/editorial-section';
import {CateringSection} from '@/components/catering-section';
import {CareersSection} from '@/components/careers-section';
import {PrivacySection} from '@/components/privacy-section';

type Props = {
  params: Promise<{locale: string; page: string}>;
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
};

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
  const title = page === 'privacy' ? t('footer.legal') : page === 'amsterdam' ? `${t('amsterdam.line1')} ${t('amsterdam.line2')}` : t(`nav.${page}`);
  const description = page === 'privacy' ? t('privacyPage.intro') : page === 'catering' ? t('catering.intro') : page === 'careers' ? t('careerPage.intro') : page === 'dishes' ? t('dishes.copy') : t('meta.description');
  return pageMetadata(locale, `/${page}`, `${title} — WALTER`, description);
}

export default async function ContentPage({params, searchParams}: Props) {
  const {locale, page} = await params;
  if (!hasLocale(routing.locales, locale) || !isPage(page)) notFound();
  setRequestLocale(locale);
  const menuId = page === 'menu' ? (await searchParams).menu : undefined;
  const initialMenu = restaurantMenus.find((menu) => menu.id === menuId);
  if (menuId !== undefined && !initialMenu) notFound();
  const t = await getTranslations();
  const title = page === 'privacy' ? t('footer.legal') : page === 'amsterdam' ? 'Amsterdam' : t(`nav.${page}`);
  return (
    <main id="main" tabIndex={-1}>
      <h1 className="sr-only">{title}</h1>
      {page === 'story' && <StorySection />}
      {page === 'menu' && <RestaurantMenus key={initialMenu?.id ?? 'all'} initialMenu={initialMenu} />}
      {page === 'dishes' && <MenuExplorer />}
      {page === 'locations' && <LocationFinder />}
      {page === 'amsterdam' && <ComingSoonSection />}
      {page === 'catering' && <CateringSection />}
      {page === 'careers' && <CareersSection />}
      {page === 'news' && <EditorialSection kind="news" />}
      {page === 'privacy' && <PrivacySection />}
    </main>
  );
}
