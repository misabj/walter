import {getTranslations} from 'next-intl/server';
import localFont from 'next/font/local';
import {ArrowDown, Asterisk, Heart} from 'lucide-react';
import {AmbientVideo} from './ambient-video';

const headline = localFont({
  src: '../../public/fonts/BebasNeue-Regular.woff2',
  variable: '--font-headline',
  display: 'swap',
  weight: '400'
});

export async function HeroSection() {
  const t = await getTranslations();
  const dishes = ['line2', 'pljeskavice', 'biftek', 'sudzuka', 'veal'] as const;
  return (
    <>
      <section className={`hero ${headline.variable}`} aria-labelledby="hero-title">
        <AmbientVideo variant="hero" />
        <div className="hero-copy">
          <h1 id="hero-title" aria-label={t('hero.title')}>
            <span className="hero-mask" aria-hidden="true">
              <span className="hero-tagline"><span>{t('hero.line1')}</span><Heart className="hero-heart" fill="currentColor" strokeWidth={0} /><span>{t('hero.verb')}</span></span>
            </span>
            <span className="hero-mask hero-dish" aria-hidden="true">
              {dishes.map((dish, index) => <span key={dish} className="hero-dish-label" style={{animationDelay: `${index * 3}s`, animationDuration: `${dishes.length * 3}s`}}>
                {Array.from(t(`hero.${dish}`)).map((letter, letterIndex) => <span key={letterIndex} className="hero-dish-letter" style={{animationDelay: `${index * 3 + letterIndex * 0.055}s`, animationDuration: `${dishes.length * 3}s`}}>{letter}</span>)}
              </span>)}
            </span>
          </h1>
        </div>
        <div className="hero-bottom">
          <a href="#signature" className="hero-scroll" aria-label={t('hero.scroll')}><span><ArrowDown size={19} aria-hidden="true" /></span><span className="hero-scroll-label">{t('hero.scroll')}</span></a>
        </div>
      </section>
      <div className="brand-strip">
        <div className="brand-strip-track">
          {[0, 1].map((copy) => <div className="brand-strip-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {dishes.map((dish) => <span className="brand-strip-item" key={dish}>
              <span className="brand-strip-phrase">{t.rich('hero.campaign', {dish: t(`hero.${dish}`), heart: (word) => <><Heart className="brand-strip-heart" fill="currentColor" strokeWidth={0} aria-hidden="true" /><span className="sr-only">{word}</span></>})}</span>
              <Asterisk aria-hidden="true" />
            </span>)}
          </div>)}
        </div>
      </div>
    </>
  );
}
