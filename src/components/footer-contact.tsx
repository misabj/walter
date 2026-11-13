'use client';

import {useId, useRef} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Mail, Phone, X} from 'lucide-react';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

export function FooterContact({emailHref}: {emailHref: string}) {
  const t = useTranslations();
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const dialogId = `${titleId}-dialog`;

  return <>
    <button type="button" className="footer-contact-trigger" aria-haspopup="dialog" aria-controls={dialogId} onClick={() => dialog.current?.showModal()}>
      {t('footer.contact')}<ArrowUpRight size={14} aria-hidden="true" />
    </button>
    <dialog ref={dialog} id={dialogId} className="contact-dialog" aria-labelledby={titleId} onKeyDown={handleDialogKeyDown} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}>
      <header className="contact-dialog-header">
        <span>WALTER</span>
        <button type="button" className="icon-button" autoFocus aria-label={t('common.close')} onClick={() => dialog.current?.close()}><X size={24} aria-hidden="true" /></button>
      </header>
      <div className="contact-dialog-content">
        <h2 id={titleId}>{t('footer.connect')}</h2>
        <a className="contact-option" href={emailHref}>
          <span className="contact-option-icon"><Mail size={20} aria-hidden="true" /></span>
          <span className="contact-option-copy"><small>{t('footer.contact')}</small><strong>{emailHref.replace(/^mailto:/, '')}</strong></span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a className="contact-option" href="tel:+381631011000">
          <span className="contact-option-icon"><Phone size={20} aria-hidden="true" /></span>
          <span className="contact-option-copy"><small>{t('hospitality.callLabel')}</small><strong>063 101 1000</strong></span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </dialog>
  </>;
}
