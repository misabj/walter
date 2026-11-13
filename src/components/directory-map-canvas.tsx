'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import * as L from 'leaflet';
import type {Restaurant} from '@/lib/content';
import type {Coordinates} from '@/lib/restaurant-location';

export default function DirectoryMapCanvas({restaurants, selected, position, onSelect}: {
  restaurants: Restaurant[];
  selected?: Restaurant;
  position?: Coordinates;
  onSelect: (slug: string) => void;
}) {
  const t = useTranslations('directory.finder');
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const instance = L.map(container.current, {scrollWheelZoom: false, zoomControl: false}).setView([44.5, 19.5], 6);
    map.current = instance;
    L.control.zoom({zoomInTitle: t('zoomIn'), zoomOutTitle: t('zoomOut')}).addTo(instance);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(instance);
    tiles.on('tileerror', () => setTileError(true));
    const resize = new ResizeObserver(() => instance.invalidateSize());
    resize.observe(container.current);
    return () => {resize.disconnect(); instance.remove(); map.current = null;};
  }, [t]);

  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const markers = L.layerGroup().addTo(instance);
    for (const restaurant of restaurants) {
      if (!restaurant.coordinates) continue;
      const {latitude, longitude} = restaurant.coordinates;
      const marker = L.marker([latitude, longitude], {
        icon: L.divIcon({
          className: `walter-map-pin${selected?.slug === restaurant.slug ? ' is-selected' : ''}`,
          html: '<span aria-hidden="true">W</span>',
          iconSize: [36, 44],
          iconAnchor: [18, 44]
        }),
        title: restaurant.name,
        alt: restaurant.name,
        keyboard: true
      }).addTo(markers);
      marker.on('click', () => onSelect(restaurant.slug));
      marker.bindTooltip(restaurant.name, {direction: 'top', offset: [0, -40]});
      if (selected?.slug === restaurant.slug) marker.setZIndexOffset(1000);
    }
    return () => {markers.remove();};
  }, [restaurants, selected, onSelect, t]);

  useEffect(() => {
    const points = restaurants.flatMap(({coordinates}) => coordinates ? [L.latLng(coordinates.latitude, coordinates.longitude)] : []);
    if (points.length) map.current?.fitBounds(L.latLngBounds(points), {padding: [45, 45], maxZoom: 14, animate: false});
  }, [restaurants, t]);

  useEffect(() => {
    if (selected?.coordinates) {
      map.current?.setView([selected.coordinates.latitude, selected.coordinates.longitude], 15, {animate: false});
    }
  }, [selected, t]);

  useEffect(() => {
    const instance = map.current;
    if (!instance || !position) return;
    const point = L.circleMarker([position.latitude, position.longitude], {
      radius: 8, color: '#ffffff', weight: 3, fillColor: '#236ddb', fillOpacity: 1
    }).addTo(instance).bindTooltip(t('yourLocation'));
    return () => {point.remove();};
  }, [position, t]);

  return <>
    <div ref={container} className="directory-map-canvas" role="region" aria-label={t('title')} />
    {tileError && <p className="directory-map-error" role="alert">{t('mapError')}</p>}
  </>;
}
