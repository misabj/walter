import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Asterisk, Wheat, UtensilsCrossed} from 'lucide-react';
import {ProductDetail} from './product-detail';

export async function SignatureProductFeature() {
  const t = await getTranslations();
  return (
    <section className="signature section-pad" id="signature" aria-labelledby="signature-title">
      <div className="section-topline"><p className="eyebrow">{t('signature.eyebrow')}</p></div>
      <div className="signature-grid">
        <figure className="signature-visual" data-image-reveal>
          <div className="signature-photo"><Image src="/images/food/cevapi.webp" alt={t('experience.cevapiAlt')} fill sizes="(max-width: 760px) 90vw, 48vw" className="food-photo" /></div>
          <div className="signature-detail-photo"><Image src="/images/food/ustipci.webp" alt={t('experience.ustipciTitle')} fill sizes="(max-width: 760px) 35vw, 20vw" /></div>
          <div className="signature-stamp" aria-hidden="true"><Asterisk size={24} strokeWidth={1} /><span>2004</span></div>
          <figcaption>{t('signature.label')}</figcaption>
        </figure>
        <div className="signature-copy" data-reveal>
          <h2 id="signature-title">{t('signature.line1')}<br /><em>{t('signature.line2')}</em></h2>
          <p>{t('signature.copy')}</p>
          <ul className="ingredient-list">
            <li><UtensilsCrossed size={17} aria-hidden="true" />{t('signature.beef')}</li>
            <li><Wheat size={17} aria-hidden="true" />{t('signature.bread')}</li>
            <li>{t('signature.portion')}</li>
          </ul>
          <ProductDetail />
        </div>
      </div>
    </section>
  );
}
