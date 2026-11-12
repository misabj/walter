import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {Asterisk} from 'lucide-react';
import {AmbientVideo} from './ambient-video';

export async function StorySection() {
  const t = await getTranslations();
  return (
    <section className="story-section section-pad" aria-labelledby="story-title">
      <p className="eyebrow">{t('story.eyebrow')}</p>
      <div className="story-media" data-image-reveal>
        <div className="story-media-main" role="group" aria-label={t('hospitality.filmLabel')}><AmbientVideo variant="story" /></div>
        <span className="story-media-year" aria-hidden="true">2004</span>
        <div className="story-media-detail"><Image src="/images/food/soup.webp" alt={t('experience.soupTitle')} fill sizes="(max-width: 760px) 37vw, 26vw" /></div>
        <p>{t('story.quote')}</p>
      </div>
      <div className="story-grid">
        <div data-reveal>
          <h2 id="story-title">{t('story.line1')}<br /><em>{t('story.line2')}</em></h2>
        </div>
        <div className="story-right" data-reveal>
          <Asterisk className="story-star" size={76} strokeWidth={1} aria-hidden="true" />
          <p>{t('story.copy')}</p>
        </div>
      </div>
      <ol className="story-timeline">
        <li><span className="timeline-year">2004</span><div><h3>{t('story.yearLabel')}</h3><p>{t('story.yearCopy')}</p></div></li>
        <li><span className="timeline-mark"><Asterisk size={42} strokeWidth={1} aria-hidden="true" /></span><div><h3>{t('story.nowLabel')}</h3><p>{t('story.nowCopy')}</p></div></li>
      </ol>
    </section>
  );
}
