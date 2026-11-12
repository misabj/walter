import {getTranslations} from 'next-intl/server';
import {Asterisk} from 'lucide-react';

export async function ComingSoonSection() {
  const t = await getTranslations();
  return (
    <section className="amsterdam-section section-pad" aria-labelledby="amsterdam-title">
      <div className="amsterdam-top"><p className="eyebrow">{t('amsterdam.eyebrow')}</p><span className="status-pill">{t('common.comingSoon')}</span></div>
      <div className="amsterdam-grid">
        <div data-reveal><h2 id="amsterdam-title">{t('amsterdam.line1')}<br /><em>{t('amsterdam.line2')}</em></h2><p>{t('amsterdam.copy')}</p><p className="amsterdam-note">{t('amsterdam.note')}</p></div>
        <div className="amsterdam-art" aria-hidden="true">
          <Asterisk size={84} strokeWidth={1} />
          <span className="city-monogram">AMS</span>
          <svg viewBox="0 0 460 180" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 170H455M20 170V65H65V170M25 65L42 42L60 65M76 170V44H122V170M76 44H84V30H94V18H104V30H114V44M135 170V77H179V170M135 77L157 54L179 77M195 170V45H240V170M195 45L217 12L240 45M257 170V67H302V170M257 67H265V52H275V39H285V52H294V67M316 170V50H361V170M316 50L338 22L361 50M376 170V70H430V170M376 70L403 43L430 70" />
            <path d="M32 85H49V104H32ZM32 121H49V140H32ZM87 63H110V82H87ZM87 99H110V118H87ZM146 94H168V113H146ZM206 65H228V86H206ZM206 105H228V126H206ZM269 85H290V104H269ZM327 69H349V90H327ZM327 109H349V130H327ZM389 87H416V108H389ZM389 125H416V146H389ZM85 170V143H110V170M207 170V144H228V170" />
          </svg>
          <span className="amsterdam-art-caption">52° N / 4° E</span>
        </div>
      </div>
    </section>
  );
}
