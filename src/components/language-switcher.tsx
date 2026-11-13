'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Check, ChevronDown, Globe2} from 'lucide-react';
import {useEffect, useRef, useState, useTransition} from 'react';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

const languages: Record<Locale, {name: string; flag: string}> = {
  sr: {name: 'Srpski', flag: 'rs'},
  en: {name: 'English', flag: 'gb'},
  de: {name: 'Deutsch', flag: 'de'},
  nl: {name: 'Nederlands', flag: 'nl'},
  sl: {name: 'Slovenščina', flag: 'si'},
  bs: {name: 'Bosanski', flag: 'ba'}
};

export function LanguageSwitcher({id}: {id: string}) {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  function choose(nextLocale: Locale) {
    setOpen(false);
    trigger.current?.focus();
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(`${pathname}${window.location.search}${window.location.hash}`, {locale: nextLocale});
    });
  }

  return (
    <div className="language-switcher" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button id={id} ref={trigger} type="button" className="language-trigger" aria-label={`${locale.toUpperCase()} — ${t('language')}: ${languages[locale].name}`} aria-expanded={open} aria-haspopup="menu" aria-controls={`${id}-menu`} aria-busy={pending} disabled={pending} onClick={() => setOpen(!open)} onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {event.preventDefault(); setOpen(true);}
      }}>
        <Image src={`/images/flags/${languages[locale].flag}.svg`} width={24} height={18} alt="" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && <div id={`${id}-menu`} className="language-menu" ref={menu} role="menu" aria-labelledby={id} onKeyDown={(event) => {
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
        const index = items.findIndex((item) => item === document.activeElement);
        if (event.key === 'Escape' || event.key === 'Tab') {
          if (event.key === 'Escape') {event.preventDefault(); event.stopPropagation();}
          setOpen(false);
          trigger.current?.focus();
        } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          const target = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
          items[target]?.focus();
        }
      }}>
        <p className="language-menu-label"><Globe2 size={16} aria-hidden="true" />{t('language')}</p>
        {routing.locales.map((value) => <button key={value} type="button" role="menuitemradio" aria-checked={value === locale} tabIndex={-1} lang={value} onClick={() => choose(value)}>
          <Image src={`/images/flags/${languages[value].flag}.svg`} width={28} height={21} alt="" />
          <span className="language-option-name">{languages[value].name}</span><small>{value.toUpperCase()}</small>
          <span className="language-option-check" aria-hidden="true">{value === locale && <Check size={13} />}</span>
        </button>)}
      </div>}
    </div>
  );
}
