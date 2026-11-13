'use client';

import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Heart, MapPin, Menu, Phone, X} from 'lucide-react';
import {Link, usePathname} from '@/i18n/navigation';
import {LanguageSwitcher} from './language-switcher';
import {handleDialogKeyDown} from '@/lib/dialog-keyboard';

const links = ['locations', 'menu', 'dishes', 'catering', 'careers'] as const;

export function Header() {
  const t = useTranslations('nav');
  const hospitality = useTranslations('hospitality');
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const homeStyle = pathname === '/' && !scrolled;

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const currentY = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const interacting = dialog.current?.open || header.current?.querySelector(':focus-visible, [aria-expanded="true"]');
      setScrolled(currentY > 24);
      if (currentY <= 120 || currentY < previousY || interacting) setHidden(false);
      else if (currentY > previousY) setHidden(true);
      previousY = currentY;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(() => {
      setHidden(false);
      update();
    });
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">{t('skip')}</a>
      <header ref={header} className={`site-header${pathname === '/' ? ' header-overlay' : ''}${homeStyle ? ' header-home' : ''}${hidden ? ' is-hidden' : ''}`} onFocusCapture={() => setHidden(false)}>
        <Link href="/" className="logo-link" aria-label="Walter">
          <Image src={homeStyle ? '/images/walter-logo-white.svg' : '/images/walter-logo.svg'} alt="Walter" width={166} height={30} priority />
        </Link>
        <nav className="desktop-nav" aria-label={t('open')}>
          {links.map((key) => <Link key={key} href={`/${key}`} aria-current={pathname === `/${key}` ? 'page' : undefined}>{key === 'dishes' && <Heart size={14} strokeWidth={1.6} aria-hidden="true" />}{t(key)}</Link>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher id="header-language" />
          <a href="tel:+381631011000" className="header-phone" aria-label={`${hospitality('callLabel')}: 063 101 1000`}><Phone size={22} aria-hidden="true" /></a>
          <button type="button" className="icon-button mobile-toggle" aria-label={t('open')} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Menu size={25} /></button>
        </div>
      </header>
      <dialog className="mobile-menu" ref={dialog} aria-label={t('open')} onKeyDown={handleDialogKeyDown}>
        <div className="mobile-menu-top">
          <Image src="/images/walter-logo.svg" alt="Walter" width={166} height={30} />
          <button type="button" className="icon-button" autoFocus aria-label={t('close')} onClick={() => dialog.current?.close()}><X size={26} /></button>
        </div>
        <nav>
          {links.map((key) => <Link key={key} href={`/${key}`} aria-current={pathname === `/${key}` ? 'page' : undefined} onClick={() => dialog.current?.close()}><span>{t(key)}</span><ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" /></Link>)}
        </nav>
        <div className="mobile-menu-actions">
          <a href="tel:+381631011000" className="mobile-menu-action mobile-menu-phone" aria-label={`${hospitality('callLabel')}: 063 101 1000`}>
            <span className="mobile-menu-action-icon"><Phone size={21} aria-hidden="true" /></span>
            <span className="mobile-menu-action-copy"><small>{hospitality('callLabel')}</small><span>063 101 1000</span></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <Link href="/locations" className="mobile-menu-action mobile-menu-find" onClick={() => dialog.current?.close()}>
            <span className="mobile-menu-action-icon"><MapPin size={23} aria-hidden="true" /></span>
            <span className="mobile-menu-action-copy"><small>{t('locations')}</small><span>{t('find')}</span></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </dialog>
    </>
  );
}
