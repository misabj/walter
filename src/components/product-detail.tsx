'use client';

import {useId, useRef} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, X} from 'lucide-react';
import {products, type Product} from '@/lib/content';
import {Link} from '@/i18n/navigation';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

export function ProductDetail({product = products[0], card = false}: {product?: Product; card?: boolean}) {
  const t = useTranslations();
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const dialogId = `${titleId}-dialog`;
  const detailsButton = <button type="button" className="text-link" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" aria-controls={dialogId}>{t('common.details')}<ArrowUpRight size={20} aria-hidden="true" /></button>;
  return (
    <>
      {card ? <>
        <button type="button" className="product-art" aria-label={`${t('common.details')}: ${t(product.nameKey)}`} aria-haspopup="dialog" aria-controls={dialogId} onClick={() => dialog.current?.showModal()}>
          <Image src={product.image} alt={t(product.nameKey)} fill sizes="(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 50vw" className="food-photo" />
          <span className="product-category">{product.category === 'soups' ? t('experience.soups') : t(`menu.${product.category}`)}</span>
        </button>
        <div className="product-info">
          <h3>{t(product.nameKey)}</h3>
          <p>{t(product.copyKey)}</p>
          {detailsButton}
        </div>
      </> : detailsButton}
      <dialog id={dialogId} ref={dialog} className="product-dialog" aria-labelledby={titleId} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}} onKeyDown={handleDialogKeyDown}>
        <div className="dialog-content">
          <button type="button" className="icon-button dialog-close" aria-label={t('common.close')} autoFocus onClick={() => dialog.current?.close()}><X size={24} /></button>
          <div className="dialog-product-photo"><Image src={product.image} alt={t(product.nameKey)} fill sizes="(max-width: 760px) 85vw, 500px" /></div>
          <p className="eyebrow">WALTER</p>
          <h2 id={titleId}>{t(product.nameKey)}</h2>
          <p>{product.id === 'cevapi' ? t('signature.detail') : t(product.copyKey)}</p>
          <p className="note">{t('experience.allergens')}</p>
          <Link className="button button-green" href="/menu">{t('menu.choose')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </dialog>
    </>
  );
}
