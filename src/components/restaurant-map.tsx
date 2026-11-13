'use client';

import {useId, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Map, X} from 'lucide-react';
import type {Restaurant} from '@/lib/content';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

export function RestaurantMap({restaurant, inline = false}: {restaurant: Restaurant; inline?: boolean}) {
  const t = useTranslations();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const dialogId = `${titleId}-dialog`;
  const noticeId = `${titleId}-notice`;
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(`${restaurant.address}, ${restaurant.city}, ${restaurant.countryCode}`);
  const frame = <iframe title={t('directory.map.title', {name: restaurant.name})} src={`https://www.google.com/maps?q=${query}&output=embed`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" tabIndex={0} allowFullScreen />;
  const externalLink = <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer">{t('directory.map.external')}<ArrowUpRight size={18} aria-hidden="true" /></a>;

  if (inline) return <div className="restaurant-map-inline">
    <div className="restaurant-map-frame">{frame}</div>
    <p className="restaurant-map-notice">{t('directory.map.notice')}</p>
    <div className="restaurant-map-footer">{externalLink}</div>
  </div>;

  return <>
    <button type="button" className="restaurant-map-trigger" aria-haspopup="dialog" aria-controls={dialogId} onClick={() => dialog.current?.showModal()}>
      <Map size={18} aria-hidden="true" /><span>{t('directory.map.show')}</span><ArrowUpRight size={17} aria-hidden="true" />
    </button>
    <dialog id={dialogId} ref={dialog} className="restaurant-map-dialog" aria-labelledby={titleId} aria-describedby={noticeId} onClose={() => setLoaded(false)} onKeyDown={handleDialogKeyDown} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}>
      <header className="restaurant-map-header">
        <div><h2 id={titleId}>{restaurant.name}</h2><p>{restaurant.address}</p></div>
        <button type="button" ref={closeButton} className="icon-button" autoFocus aria-label={t('common.close')} onClick={() => dialog.current?.close()}><X size={24} aria-hidden="true" /></button>
      </header>
      <p id={noticeId} className="restaurant-map-notice">{t('directory.map.notice')}</p>
      <div className="restaurant-map-frame">
        {loaded ? frame : <div className="restaurant-map-placeholder">
          <Map size={52} strokeWidth={1} aria-hidden="true" />
          <button type="button" className="button button-green" onClick={() => {setLoaded(true); closeButton.current?.focus();}}>{t('directory.map.load')}<ArrowUpRight size={18} aria-hidden="true" /></button>
        </div>}
      </div>
      <footer className="restaurant-map-footer">{externalLink}</footer>
    </dialog>
  </>;
}
