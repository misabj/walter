'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import {useEffect, useId, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, ChevronDown, Download, MapPin, X} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {restaurantMenus, type RestaurantMenu} from '@/lib/restaurant-menus';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

const PdfMenuViewer = dynamic(() => import('./pdf-menu-viewer'), {
  ssr: false,
  loading: function PdfLoading() {
    const t = useTranslations('pdfMenus');
    return <p className="pdf-reader-message" role="status">{t('loading')}</p>;
  }
});

export function RestaurantMenus({initialMenu}: {initialMenu?: RestaurantMenu}) {
  const t = useTranslations('pdfMenus');
  const common = useTranslations('common');
  const [selected, setSelected] = useState<RestaurantMenu | null>(initialMenu ?? null);
  const dialog = useRef<HTMLDialogElement>(null);
  const initialMenuTrigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const dialogId = useId();

  useEffect(() => {
    if (initialMenu) {
      initialMenuTrigger.current?.focus({preventScroll: true});
      dialog.current?.showModal();
    }
  }, [initialMenu]);

  function open(menu: RestaurantMenu) {
    setSelected(menu);
    dialog.current?.showModal();
  }

  return <section className="pdf-menus section-pad brand-pattern" aria-labelledby="pdf-menus-title">
    <div className="pdf-menus-heading">
      <div><p className="eyebrow">{t('eyebrow')}</p><h2 id="pdf-menus-title">{t('title')}</h2></div>
      <p>{t('intro')}</p>
    </div>
    <div className="pdf-menu-grid">
      {restaurantMenus.map((menu) => <article className="pdf-menu-card" key={menu.id}>
        <button ref={menu.id === initialMenu?.id ? initialMenuTrigger : undefined} type="button" className="pdf-menu-cover" aria-haspopup="dialog" aria-controls={dialogId} aria-label={t('openNamed', {name: t(`names.${menu.id}`)})} onClick={() => open(menu)}>
          <Image src={menu.cover} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1000px) 45vw, 30vw" />
          <span className="pdf-menu-format" aria-hidden="true">PDF</span>
        </button>
        <div className="pdf-menu-card-body">
          <h3>{t(`names.${menu.id}`)}</h3>
          <p className="pdf-menu-description">{t(`descriptions.${menu.id}`)}</p>
          <button type="button" className="button button-green" aria-haspopup="dialog" aria-controls={dialogId} aria-label={t('openNamed', {name: t(`names.${menu.id}`)})} onClick={() => open(menu)}>{t('open')}<ArrowUpRight size={19} aria-hidden="true" /></button>
          <details className="pdf-menu-locations">
            <summary>{t('locations', {count: menu.locations.length})}<ChevronDown size={16} aria-hidden="true" /></summary>
            <ul>{menu.locations.map((location) => <li key={location}>{location}</li>)}</ul>
          </details>
        </div>
      </article>)}
      <aside className="pdf-menu-help">
        <MapPin size={35} strokeWidth={1.2} aria-hidden="true" />
        <h3>{t('helpTitle')}</h3><p>{t('helpCopy')}</p>
        <Link href="/locations" className="text-link">{t('findRestaurant')}<ArrowUpRight size={19} aria-hidden="true" /></Link>
      </aside>
    </div>
    <dialog ref={dialog} id={dialogId} className="pdf-menu-dialog" aria-labelledby={titleId} onClose={() => setSelected(null)} onKeyDown={handleDialogKeyDown} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}>
      <div className="pdf-menu-dialog-content">
        <header className="pdf-menu-dialog-header">
          <div><p className="eyebrow">WALTER / PDF</p><h2 id={titleId}>{selected ? t(`names.${selected.id}`) : t('title')}</h2></div>
          <div className="pdf-menu-dialog-actions">
            {selected && <a className="icon-button" href={selected.file} download={`${selected.id}-walter.pdf`} aria-label={t('download')}><Download size={21} aria-hidden="true" /></a>}
            <button type="button" className="icon-button" autoFocus aria-label={common('close')} onClick={() => dialog.current?.close()}><X size={25} aria-hidden="true" /></button>
          </div>
        </header>
        {selected && <PdfMenuViewer key={selected.id} file={selected.file} name={t(`names.${selected.id}`)} />}
      </div>
    </dialog>
  </section>;
}
