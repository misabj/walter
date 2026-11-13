'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Map} from 'lucide-react';
import type {Restaurant} from '@/lib/content';

export function RestaurantMap({restaurant}: {restaurant: Restaurant}) {
  const t = useTranslations();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const query = encodeURIComponent(`${restaurant.address}, ${restaurant.city}, ${restaurant.countryCode}`);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setVisible(entry.isIntersecting);
    }, {rootMargin: '200px'});
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={container} className="restaurant-map-inline">
    <div className="restaurant-map-frame">
      {visible ? <iframe title={t('directory.map.title', {name: restaurant.name})} src={`https://www.google.com/maps?q=${query}&output=embed`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" tabIndex={0} allowFullScreen /> : <div className="restaurant-map-placeholder" aria-hidden="true"><Map size={40} strokeWidth={1} /></div>}
    </div>
    <div className="restaurant-map-footer"><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer" aria-label={`${t('directory.map.external')} · ${restaurant.name}`}>{t('directory.map.external')}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
  </div>;
}
