'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowUpRight, LocateFixed, MapPin, Navigation, Phone} from 'lucide-react';
import type {Restaurant} from '@/lib/content';
import {distanceInKm, findNearestRestaurant, restaurantDirections, type Coordinates} from '@/lib/restaurant-location';
import {Link} from '@/i18n/navigation';

const MapCanvas = dynamic(() => import('./directory-map-canvas'), {ssr: false});

export function DirectoryMap({restaurants, allRestaurants, resetFilters}: {
  restaurants: Restaurant[];
  allRestaurants: Restaurant[];
  resetFilters: () => void;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedSlug, setSelectedSlug] = useState('');
  const [position, setPosition] = useState<Coordinates>();
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');
  const [nearestSlug, setNearestSlug] = useState('');
  const mounted = useRef(true);
  const selectionPanel = useRef<HTMLDivElement>(null);
  const selected = restaurants.find(({slug}) => slug === selectedSlug);
  const onSelect = useCallback((slug: string) => {
    setError('');
    setSelectedSlug(slug);
  }, []);
  const distance = selected?.coordinates && position ? distanceInKm(position, selected.coordinates) : undefined;
  const formatDistance = (value: number) => new Intl.NumberFormat(locale, {maximumFractionDigits: 1}).format(value);

  useEffect(() => {
    mounted.current = true;
    return () => {mounted.current = false;};
  }, []);

  useEffect(() => {
    if (selected && window.matchMedia('(max-width: 900px)').matches) {
      selectionPanel.current?.scrollIntoView({block: 'nearest'});
    }
  }, [selected]);

  const locate = () => {
    setError('');
    if (!window.isSecureContext || !navigator.geolocation) {
      setError(t('directory.finder.unsupported'));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(({coords}) => {
      if (!mounted.current) return;
      const origin = {latitude: coords.latitude, longitude: coords.longitude};
      const nearest = findNearestRestaurant(allRestaurants, origin);
      setLocating(false);
      if (!nearest) {setError(t('directory.finder.noCoordinates')); return;}
      resetFilters();
      setPosition(origin);
      setNearestSlug(nearest.restaurant.slug);
      setSelectedSlug(nearest.restaurant.slug);
    }, (failure) => {
      if (!mounted.current) return;
      setLocating(false);
      setError(t(`directory.finder.${failure.code === 1 ? 'denied' : failure.code === 3 ? 'timeout' : 'unavailable'}`));
    }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 60000});
  };

  return <div className="directory-map">
    <div className="directory-map-heading">
      <div><p className="eyebrow">{t('locations.eyebrow')}</p><h2>{t('directory.finder.heading')}</h2><p>{t('directory.finder.copy')}</p></div>
      <button type="button" className="button button-green" onClick={locate} disabled={locating}>
        <LocateFixed size={20} aria-hidden="true" />{t(`directory.finder.${locating ? 'locating' : 'locate'}`)}
      </button>
    </div>
    {error && <p className="directory-geolocation-error" role="alert">{error}</p>}
    <div className="directory-map-layout">
      <div className="directory-map-surface"><MapCanvas restaurants={restaurants} selected={selected} position={position} onSelect={onSelect} /></div>
      <aside className="directory-map-sidebar" aria-label={t('directory.finder.restaurants')}>
        {selected ? <div ref={selectionPanel} className="directory-map-selection">
          <p className="eyebrow" role="status">{t(selected.slug === nearestSlug ? 'directory.finder.nearest' : 'directory.finder.selected')}</p>
          <h3>{selected.name}</h3>
          <p>{selected.address}</p><p>{selected.city} · {t(`directory.countryNames.${selected.country}`)}</p>
          {distance !== undefined && <p className="directory-map-distance">{t('directory.finder.distance', {distance: formatDistance(distance)})}</p>}
          {selected.address && <a className="button button-green" href={restaurantDirections(selected, position)} target="_blank" rel="noopener noreferrer"><Navigation size={18} aria-hidden="true" />{t('directory.finder.navigate')}<ArrowUpRight size={16} aria-hidden="true" /></a>}
          <div className="directory-map-selection-links">
            <Link href={`/locations/${selected.slug}`} className="text-link">{t('locations.details')}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            {selected.telephone && <a href={`tel:${selected.telephone}`} className="icon-button" aria-label={t(selected.sharedCallCentre ? 'locations.callCenter' : 'locations.call')}><Phone size={18} aria-hidden="true" /></a>}
          </div>
        </div> : <p className="directory-map-hint"><MapPin size={24} aria-hidden="true" />{t('directory.finder.select')}</p>}
        <div className="directory-map-list" role="group" aria-label={t('directory.finder.restaurants')}>
          {restaurants.map((restaurant) => <button key={restaurant.slug} type="button" aria-pressed={selected?.slug === restaurant.slug} onClick={() => onSelect(restaurant.slug)}>
            <MapPin size={18} aria-hidden="true" /><span><strong>{restaurant.name}</strong><small>{restaurant.address ?? restaurant.city}</small>{!restaurant.coordinates && <small>{t('directory.finder.pinUnavailable')}</small>}</span>
          </button>)}
          {restaurants.length === 0 && <p className="directory-map-hint">{t('locations.noResults')}</p>}
        </div>
      </aside>
    </div>
    <p className="directory-map-notice">{t('directory.finder.notice')}</p>
  </div>;
}
