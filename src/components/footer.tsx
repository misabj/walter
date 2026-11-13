import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Asterisk, Facebook, Instagram, Linkedin, Youtube} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {official} from '@/lib/content';
import {LanguageSwitcher} from './language-switcher';
import {FooterContact} from './footer-contact';

const socialLinks = [
  {label: 'Instagram', href: official.instagram, icon: Instagram},
  {label: 'YouTube', href: official.youtube, icon: Youtube},
  {label: 'LinkedIn', href: official.linkedin, icon: Linkedin},
  {label: 'Facebook', href: official.facebook, icon: Facebook}
];

export async function Footer() {
  const t = await getTranslations();
  return (
    <footer className="site-footer section-pad brand-pattern">
      <div className="footer-top">
        <div className="footer-brand"><p className="footer-tagline">{t('footer.tagline')}</p><Link href="/" className="footer-wordmark" aria-label="Walter"><Image src="/images/walter-logo-white.svg" alt="Walter" width={1328} height={234} sizes="(max-width: 760px) 180px, 220px" /></Link></div>
        <Asterisk size={64} strokeWidth={1} aria-hidden="true" />
        <div className="footer-links"><p className="eyebrow">{t('footer.explore')}</p>{(['locations', 'menu', 'dishes', 'catering', 'careers'] as const).map((key) => <Link key={key} href={`/${key}`}>{t(`nav.${key}`)}</Link>)}</div>
        <div className="footer-links">
          <p className="eyebrow">{t('footer.connect')}</p>
          <div className="footer-socials">
            {socialLinks.map(({label, href, icon: Icon}) => <a key={label} href={href} aria-label={label} title={label}><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></a>)}
          </div>
          <FooterContact emailHref={official.contact} />
          <LanguageSwitcher id="footer-language" />
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Walter. {t('footer.rights')}</span><Link href="/privacy">{t('footer.legal')}</Link><span>{t('common.since')}</span></div>
    </footer>
  );
}
