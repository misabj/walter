import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight, Asterisk} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {official} from '@/lib/content';
import {LanguageSwitcher} from './language-switcher';

export async function Footer() {
  const t = await getTranslations();
  return (
    <footer className="site-footer section-pad">
      <div className="footer-top"><div className="footer-brand"><p className="footer-tagline">{t('footer.tagline')}</p><Link href="/" className="footer-wordmark" aria-label="Walter"><Image src="/images/walter-logo-white.svg" alt="Walter" width={1328} height={234} sizes="(max-width: 760px) 180px, 220px" /></Link></div><Asterisk size={64} strokeWidth={1} aria-hidden="true" /><div className="footer-links"><p className="eyebrow">{t('footer.explore')}</p>{(['locations', 'menu', 'catering', 'careers'] as const).map((key) => <Link key={key} href={`/${key}`}>{t(`nav.${key}`)}</Link>)}</div><div className="footer-links"><p className="eyebrow">{t('footer.connect')}</p><a href={official.instagram}>Instagram<ArrowUpRight size={14} aria-hidden="true" /></a><a href={official.facebook}>Facebook<ArrowUpRight size={14} aria-hidden="true" /></a><a href={official.contact}>{t('footer.contact')}<ArrowUpRight size={14} aria-hidden="true" /></a><LanguageSwitcher id="footer-language" /></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Walter. {t('footer.rights')}</span><a href={official.privacy}>{t('footer.legal')}</a><span>{t('common.since')}</span></div>
    </footer>
  );
}
