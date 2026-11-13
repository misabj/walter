import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {ArrowUpRight, Phone} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {official} from '@/lib/content';

export async function DeliverySection() {
  const t = await getTranslations('hospitality');
  return (
    <section className="delivery-section section-pad" aria-labelledby="delivery-title">
      <div className="delivery-visual" data-image-reveal>
        <Image src="/images/walter-delivery.webp" alt={t('deliveryAlt')} fill sizes="(max-width: 760px) 88vw, 44vw" />
        <span className="media-signature" aria-hidden="true">W / TO GO</span>
      </div>
      <div className="hospitality-copy" data-reveal>
        <p className="eyebrow">{t('deliveryEyebrow')}</p>
        <h2 id="delivery-title">{t('deliveryTitle')}<br /><em>{t('deliveryAccent')}</em></h2>
        <p className="hospitality-description">{t('deliveryCopy')}</p>
        <div className="hospitality-actions">
          <Link href="/locations" className="button button-green">{t('deliveryCta')}<ArrowUpRight size={19} aria-hidden="true" /></Link>
          <a href="tel:+381631011000" className="delivery-phone"><Phone size={17} aria-hidden="true" /><span><small>{t('callLabel')}</small>063 101 1000</span></a>
        </div>
        <div className="delivery-apps">
          <span>{t('appLabel')}</span>
          <a href={official.appStore}>App Store<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={official.googlePlay}>Google Play<ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <p className="hospitality-note">{t('deliveryNote')}</p>
      </div>
    </section>
  );
}

export async function GiftSection() {
  const t = await getTranslations('hospitality');
  return (
    <section className="gift-section section-pad" aria-labelledby="gift-title">
      <div className="hospitality-copy" data-reveal>
        <p className="eyebrow">{t('giftEyebrow')}</p>
        <h2 id="gift-title">{t('giftTitle')}<br /><em>{t('giftAccent')}</em></h2>
        <p className="hospitality-description">{t('giftCopy')}</p>
        <p className="hospitality-note">{t('giftNote')}</p>
      </div>
      <figure className="gift-visual" data-image-reveal>
        <Image src="/images/walter-rakija.webp" alt={t('rakijaAlt')} fill sizes="(max-width: 760px) 88vw, 36vw" />
        <figcaption className="gift-seal" aria-hidden="true">WALTER<br /><span>18+</span></figcaption>
      </figure>
    </section>
  );
}
