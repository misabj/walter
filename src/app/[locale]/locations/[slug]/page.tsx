import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ArrowUpRight, MapPin, Phone} from 'lucide-react';
import {restaurants} from '@/lib/content';
import {pageMetadata, siteUrl} from '@/lib/seo';
import {routing} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';

type Props = {params: Promise<{locale: string; slug: string}>};

export function generateStaticParams() {
  return restaurants.map(({slug}) => ({slug}));
}

export const dynamicParams = false;

export async function generateMetadata({params}: Props) {
  const {locale, slug} = await params;
  const restaurant = restaurants.find((item) => item.slug === slug);
  if (!hasLocale(routing.locales, locale) || !restaurant) notFound();
  const t = await getTranslations({locale});
  return pageMetadata(locale, `/locations/${slug}`, `${restaurant.name} — ${restaurant.city}`, restaurant.status === 'coming-soon' ? t('locations.notOpen') : `${restaurant.name}, ${restaurant.address ?? restaurant.city}. ${t('locations.unconfirmed')}`);
}

export default async function RestaurantPage({params}: Props) {
  const {locale, slug} = await params;
  const restaurant = restaurants.find((item) => item.slug === slug);
  if (!hasLocale(routing.locales, locale) || !restaurant) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const url = new URL(`/${locale}/locations/${slug}`, siteUrl).href;
  const schema = restaurant.status === 'open' && restaurant.address ? {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    url,
    telephone: restaurant.telephone,
    address: {'@type': 'PostalAddress', streetAddress: restaurant.address, addressLocality: restaurant.city, addressCountry: restaurant.countryCode},
    ...(restaurant.menuUrl ? {hasMenu: restaurant.menuUrl} : {})
  } : null;
  return <main id="main" tabIndex={-1}>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}} />}
    <div className="restaurant-detail section-pad">
      <Link href="/locations" className="text-link">← {t('nav.locations')}</Link>
      <p className="eyebrow">{restaurant.city} / {t(`directory.countryNames.${restaurant.country}`)}</p>
      <h1>{restaurant.name}</h1>
      {restaurant.image && <div className="restaurant-detail-photo"><Image src={restaurant.image} alt={restaurant.name} fill sizes="88vw" preload /></div>}
      {restaurant.status === 'coming-soon' ? <><span className="status-pill">{t('common.comingSoon')}</span><p className="restaurant-detail-copy">{t('locations.notOpen')}</p><Link className="text-link" href="/amsterdam">{t('amsterdam.cta')}<ArrowUpRight size={18} aria-hidden="true" /></Link></> : <>
        <div className="restaurant-detail-grid">
          <div><h2>{t('locations.address')}</h2><p>{restaurant.address ?? t('directory.addressUnconfirmed')}</p>
            {restaurant.address && <a className="button button-green" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${restaurant.address}, ${restaurant.city}, ${restaurant.countryCode}`)}`}>{t('locations.directions')}<MapPin size={18} aria-hidden="true" /></a>}</div>
          <div><h2>{t('locations.hours')}</h2><p>{t('locations.unconfirmed')}</p>
            {restaurant.telephone && <a className="text-link" href={`tel:${restaurant.telephone}`}>{t(restaurant.sharedCallCentre ? 'locations.callCenter' : 'locations.call')}<Phone size={17} aria-hidden="true" /></a>}</div>
          <div><h2>{t('nav.menu')}</h2><p>{t('menu.localCopy')}</p>
            {restaurant.menuUrl ? <a href={restaurant.menuUrl} className="text-link">{t('locations.menu')}<ArrowUpRight size={18} aria-hidden="true" /></a> : <a className="text-link" href={restaurant.source}>{t('common.source')}<ArrowUpRight size={18} aria-hidden="true" /></a>}</div>
        </div>
        <p className="note">{t('locations.source')} <a href={restaurant.source}>{t('common.source')} ↗</a></p>
      </>}
    </div>
  </main>;
}
