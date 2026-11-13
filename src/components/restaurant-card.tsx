import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {ArrowUpRight, MapPin, Phone} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import type {Restaurant} from '@/lib/content';
import {RestaurantMap} from './restaurant-map';

export function RestaurantCard({restaurant, grouped = false, imageSizes, inlineMap = false}: {restaurant: Restaurant; grouped?: boolean; imageSizes?: string; inlineMap?: boolean}) {
  const t = useTranslations();
  const comingSoon = restaurant.status === 'coming-soon';
  const Heading = grouped ? 'h4' : 'h3';
  return (
    <article className={`restaurant-card ${comingSoon ? 'restaurant-soon' : ''}`}>
      {restaurant.image && <Link href={`/locations/${restaurant.slug}`} className="restaurant-photo" aria-label={`${t('locations.details')} · ${restaurant.name}`}><Image src={restaurant.image} alt={restaurant.name} fill sizes={imageSizes ?? '(max-width: 760px) 88vw, (max-width: 1200px) 44vw, 28vw'} /></Link>}
      <div className="restaurant-card-body">
      <div className="restaurant-card-top"><Image src={`/images/flags/${{RS: 'rs', BA: 'ba', ME: 'me', SI: 'si', NL: 'nl'}[restaurant.countryCode]}.svg`} width={28} height={21} alt="" /><span>{t(`directory.countryNames.${restaurant.country}`)}</span>{comingSoon && <span className="status-pill">{t('common.comingSoon')}</span>}</div>
      <Heading>{restaurant.name}</Heading>
      <p className="restaurant-city">{restaurant.city}</p>
      <p className="restaurant-address">{restaurant.address || t(comingSoon ? 'locations.coming' : 'directory.addressUnconfirmed')}</p>
      <div className="restaurant-actions">
        <Link href={`/locations/${restaurant.slug}`} className="text-link">{t('locations.details')}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        {restaurant.address && <a className="icon-button" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${restaurant.address}, ${restaurant.city}, ${restaurant.countryCode}`)}`} aria-label={`${t('locations.directions')} · ${restaurant.name}`}><MapPin size={19} /></a>}
        {restaurant.telephone && <a className="icon-button" href={`tel:${restaurant.telephone}`} aria-label={`${t(restaurant.sharedCallCentre ? 'locations.callCenter' : 'locations.call')} · ${restaurant.name}`}><Phone size={18} /></a>}
      </div>
      {grouped && restaurant.address && <RestaurantMap restaurant={restaurant} inline={inlineMap} />}
      </div>
    </article>
  );
}
