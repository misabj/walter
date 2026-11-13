'use client';

import {useId, useRef} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, X} from 'lucide-react';
import {products, type Product} from '@/lib/content';
import {Link} from '@/i18n/navigation';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

export function ProductDetail({product = products[0], card = false, imageSizes, eager = false}: {product?: Product; card?: boolean; imageSizes?: string; eager?: boolean}) {
  const t = useTranslations();
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const dialogId = `${titleId}-dialog`;
  const descriptionId = `${dialogId}-description`;
  const illustrated = 'illustrated' in product && product.illustrated;
  const photoClass = `food-photo${'sourcePage' in product && !illustrated ? ' menu-photo' : ''}`;
  const category = product.category === 'soups' ? t('experience.soups') : t(`menu.${product.category}`);
  const detailsButton = <button type="button" className="text-link" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" aria-controls={dialogId}>{t('common.details')}<ArrowUpRight size={20} aria-hidden="true" /></button>;
  return (
    <>
      {card ? <>
        <button type="button" className="product-art" aria-label={`${t('common.details')}: ${t(product.nameKey)}`} aria-haspopup="dialog" aria-controls={dialogId} onClick={() => dialog.current?.showModal()}>
          <Image src={product.image} alt={t(product.nameKey)} fill sizes={imageSizes ?? '(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 50vw'} loading={eager ? 'eager' : undefined} className={photoClass} />
          <span className="product-category">{category}</span>
        </button>
        <div className="product-info">
          <h3>{t(product.nameKey)}</h3>
          <p>{t(product.copyKey)}</p>
          {detailsButton}
        </div>
      </> : detailsButton}
      <dialog id={dialogId} ref={dialog} className="product-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}} onKeyDown={handleDialogKeyDown}>
        <div className="dialog-product-top">
          <p className="eyebrow"><span>WALTER</span><span aria-hidden="true">/</span><span>{t('nav.dishes')}</span></p>
          <button type="button" className="icon-button dialog-close" aria-label={t('common.close')} autoFocus onClick={() => dialog.current?.close()}><X size={24} /></button>
        </div>
        <div className="dialog-content">
          <div className="dialog-product-visual">
            <div className="dialog-product-photo"><Image src={product.image} alt={t(product.nameKey)} fill sizes="(max-width: 640px) 85vw, 560px" className={photoClass} /></div>
          </div>
          <div className="dialog-product-info">
            <p className="eyebrow">{category}</p>
            <h2 id={titleId}>{t(product.nameKey)}</h2>
            <p id={descriptionId} className="dialog-product-description">{product.id === 'cevapi' ? t('signature.detail') : t(product.copyKey)}</p>
            <div className="dialog-product-actions">
              <Link className="button button-green" href="/menu">{t('menu.choose')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
            <p className="note">{t('experience.allergens')}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
