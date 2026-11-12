'use client';

import Image from 'next/image';
import {useRef} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Menu, Phone, X} from 'lucide-react';
import {Link, usePathname} from '@/i18n/navigation';
import {LanguageSwitcher} from './language-switcher';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

const links = ['locations', 'menu', 'catering', 'careers'] as const;

export function Header() {
  const t = useTranslations('nav');
  const hospitality = useTranslations('hospitality');
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <a className="skip-link" href="#main">{t('skip')}</a>
      <header className={`site-header${pathname === '/' ? ' header-home' : ''}`}>
        <Link href="/" className="logo-link" aria-label="Walter">
          <Image src={pathname === '/' ? '/images/walter-logo-white.svg' : '/images/walter-logo.svg'} alt="Walter" width={166} height={30} priority />
        </Link>
        <nav className="desktop-nav" aria-label={t('open')}>
          {links.map((key) => <Link key={key} href={`/${key}`} aria-current={pathname === `/${key}` ? 'page' : undefined}>{t(key)}</Link>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher id="header-language" />
          <a href="tel:+381631011000" className="button button-green header-phone" aria-label={`${hospitality('callLabel')}: 063 101 1000`}><Phone size={17} aria-hidden="true" /><span>063 101 1000</span></a>
          <button type="button" className="icon-button mobile-toggle" aria-label={t('open')} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Menu size={25} /></button>
        </div>
      </header>
      <dialog className="mobile-menu" ref={dialog} aria-label={t('open')} onKeyDown={handleDialogKeyDown}>
        <div className="mobile-menu-top">
          <Image src="/images/walter-logo.svg" alt="Walter" width={166} height={30} />
          <button type="button" className="icon-button" autoFocus aria-label={t('close')} onClick={() => dialog.current?.close()}><X size={26} /></button>
        </div>
        <nav>
          {links.map((key) => <Link key={key} href={`/${key}`} onClick={() => dialog.current?.close()}>{t(key)}<ArrowUpRight aria-hidden="true" /></Link>)}
        </nav>
        <a href="tel:+381631011000" className="button button-green mobile-menu-phone" aria-label={`${hospitality('callLabel')}: 063 101 1000`}><Phone size={19} aria-hidden="true" />063 101 1000</a>
        <Link href="/locations" className="button button-green" onClick={() => dialog.current?.close()}>{t('find')}<ArrowUpRight size={20} aria-hidden="true" /></Link>
      </dialog>
    </>
  );
}
