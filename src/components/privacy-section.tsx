import {getTranslations} from 'next-intl/server';
import {ArrowUpRight, Mail, ShieldCheck} from 'lucide-react';

const sections = ['scope', 'data', 'purposes', 'cookies', 'external', 'retention', 'rights', 'updates'] as const;

export async function PrivacySection() {
  const t = await getTranslations('privacyPage');

  return <section className="privacy-page section-pad brand-pattern" aria-labelledby="privacy-title">
    <header className="privacy-heading">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h2 id="privacy-title">{t('title')}</h2>
      <p>{t('intro')}</p>
    </header>
    <div className="privacy-layout">
      <article className="privacy-copy">
        {sections.map((key) => <section key={key} aria-labelledby={`privacy-${key}`}>
          <h3 id={`privacy-${key}`}>{t(`sections.${key}.title`)}</h3>
          <p>{t(`sections.${key}.copy`)}</p>
          {key === 'rights' && <a className="text-link" href="https://www.poverenik.rs/">{t('authorityLink')}<ArrowUpRight size={18} aria-hidden="true" /></a>}
        </section>)}
      </article>
      <aside className="privacy-contact" aria-labelledby="privacy-contact-title">
        <ShieldCheck size={32} strokeWidth={1.4} aria-hidden="true" />
        <h3 id="privacy-contact-title">{t('contactTitle')}</h3>
        <p>{t('contactCopy')}</p>
        <a className="privacy-email" href="mailto:dpo@walter.rs"><Mail size={18} aria-hidden="true" />dpo@walter.rs<ArrowUpRight size={16} aria-hidden="true" /></a>
        <dl>
          <div><dt>{t('controller')}</dt><dd>WALTER BBQ DOO BEOGRAD - RAKOVICA</dd></div>
          <div><dt>{t('address')}</dt><dd>Patrijarha Dimitrija 12<br />Beograd - Rakovica, Srbija</dd></div>
          <div><dt>{t('registration')}</dt><dd>MB: 21093564<br />PIB: 108918724</dd></div>
        </dl>
      </aside>
    </div>
  </section>;
}
