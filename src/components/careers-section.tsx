import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight, GraduationCap, Heart, Mail, Phone, Sprout, Users} from 'lucide-react';
import {official} from '@/lib/content';

const benefits = [
  {key: 'learning', icon: GraduationCap},
  {key: 'team', icon: Users},
  {key: 'growth', icon: Sprout}
] as const;

export async function CareersSection() {
  const t = await getTranslations('careerPage');
  const media = await getTranslations('hospitality');
  return (
    <div className="careers-page">
      <section className="careers-hero section-pad" aria-labelledby="careers-title">
        <div className="careers-hero-copy">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="careers-title">{t('line1')}<br /><em>{t('line2')}</em></h2>
          <p className="careers-intro">{t('intro')}</p>
          <a href={official.jobApplication} className="button button-green careers-apply">{t('apply')}<ArrowUpRight size={20} aria-hidden="true" /></a>
          <p className="careers-application-note">{t('applicationNote')}</p>
        </div>
        <figure className="careers-hero-photo">
          <Image src="/images/walter-team.webp" alt={media('teamAlt')} fill sizes="(max-width: 760px) 88vw, 42vw" priority />
          <figcaption><Heart size={20} aria-hidden="true" />{t('photoCaption')}</figcaption>
        </figure>
      </section>

      <section className="careers-benefits section-pad brand-pattern" aria-labelledby="careers-benefits-title">
        <div className="careers-benefits-heading">
          <p className="eyebrow">{t('benefitsEyebrow')}</p>
          <h2 id="careers-benefits-title">{t('benefitsTitle')}<br /><em>{t('benefitsAccent')}</em></h2>
          <p>{t('benefitsCopy')}</p>
        </div>
        <div className="careers-benefit-grid">
          {benefits.map(({key, icon: Icon}) => (
            <article className="careers-benefit" key={key}>
              <span className="careers-benefit-icon"><Icon size={28} strokeWidth={1.4} aria-hidden="true" /></span>
              <h3>{t(`${key}Title`)}</h3>
              <p>{t(`${key}Copy`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-next section-pad" aria-labelledby="careers-next-title">
        <div className="careers-next-copy">
          <p className="eyebrow">{t('nextEyebrow')}</p>
          <h2 id="careers-next-title">{t('nextTitle')}<br /><em>{t('nextAccent')}</em></h2>
          <p>{t('nextCopy')}</p>
          <a href={official.jobApplication} className="button careers-apply">{t('apply')}<ArrowUpRight size={20} aria-hidden="true" /></a>
          <p className="careers-application-note">{t('applicationNote')}</p>
        </div>
        <div className="careers-hr">
          <Mail size={30} strokeWidth={1.3} aria-hidden="true" />
          <h3>{t('contactTitle')}</h3>
          <p>{t('contactCopy')}</p>
          <a href={official.hrEmail}><Mail size={18} aria-hidden="true" />hr@walter.rs<ArrowUpRight size={18} aria-hidden="true" /></a>
          <a href={official.hrPhone}><Phone size={18} aria-hidden="true" />062 333 024</a>
        </div>
      </section>
    </div>
  );
}
