import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ArrowDown, ArrowUpRight, BriefcaseBusiness, Cake, ChefHat, Heart, Mail, Phone, Truck, Utensils} from 'lucide-react';
import {official} from '@/lib/content';

const occasions = [
  {key: 'business', icon: BriefcaseBusiness},
  {key: 'celebration', icon: Cake},
  {key: 'family', icon: Heart}
] as const;

const services = [
  {key: 'prepare', icon: ChefHat},
  {key: 'arrange', icon: Utensils},
  {key: 'deliver', icon: Truck}
] as const;

export async function CateringSection() {
  const t = await getTranslations('catering');
  return (
    <div className="catering-page">
      <section className="catering-hero section-pad" aria-labelledby="catering-title">
        <div className="catering-hero-copy">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="catering-title">{t('line1')}<br /><em>{t('line2')}</em></h2>
          <p className="catering-intro">{t('intro')}</p>
          <a href="#catering-contact" className="button catering-button">{t('plan')}<ArrowDown size={19} aria-hidden="true" /></a>
        </div>
        <figure className="catering-hero-photo">
          <Image src="/images/walter-table.webp" alt={t('tableAlt')} fill sizes="(max-width: 760px) 88vw, 46vw" priority />
          <figcaption>{t('photoCaption')}</figcaption>
        </figure>
      </section>

      <section className="catering-occasions section-pad brand-pattern" aria-labelledby="catering-occasions-title">
        <div className="catering-section-heading">
          <p className="eyebrow">{t('occasionsEyebrow')}</p>
          <h2 id="catering-occasions-title">{t('occasionsTitle')}<br /><em>{t('occasionsAccent')}</em></h2>
        </div>
        <div className="catering-occasion-grid">
          {occasions.map(({key, icon: Icon}) => (
            <article className="catering-occasion" key={key}>
              <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
              <h3>{t(`${key}Title`)}</h3>
              <p>{t(`${key}Copy`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="catering-service section-pad" aria-labelledby="catering-service-title">
        <div className="catering-service-photo">
          <Image src="/images/food/cevapi.webp" alt={t('foodAlt')} fill sizes="(max-width: 760px) 88vw, 42vw" />
        </div>
        <div className="catering-service-copy">
          <p className="eyebrow">{t('serviceEyebrow')}</p>
          <h2 id="catering-service-title">{t('serviceTitle')}<br /><em>{t('serviceAccent')}</em></h2>
          <p className="catering-service-intro">{t('serviceCopy')}</p>
          <ul className="catering-services">
            {services.map(({key, icon: Icon}) => (
              <li key={key}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>{t(key)}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="catering-contact" className="catering-contact section-pad" aria-labelledby="catering-contact-title">
        <div>
          <p className="eyebrow">{t('contactEyebrow')}</p>
          <h2 id="catering-contact-title">{t('contactTitle')}<br /><em>{t('contactAccent')}</em></h2>
          <p className="catering-contact-copy">{t('contactCopy')}</p>
        </div>
        <div className="catering-contact-card">
          <a href={official.cateringEmail} className="catering-email"><Mail size={24} aria-hidden="true" /><span><small>{t('orderLabel')}</small>ketering@walter.rs</span><ArrowUpRight size={22} aria-hidden="true" /></a>
          <a href={official.cateringEmail} className="button catering-button">{t('emailCta')}<ArrowUpRight size={19} aria-hidden="true" /></a>
          <div className="catering-other-contacts">
            <p>{t('questions')}</p>
            <a href={official.cateringPhone}><Phone size={18} aria-hidden="true" />063 101 1000</a>
            <a href={official.contact}><Mail size={18} aria-hidden="true" />kontakt@walter.rs</a>
          </div>
        </div>
      </section>
    </div>
  );
}
