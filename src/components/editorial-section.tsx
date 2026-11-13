import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {ArrowUpRight, MoveUpRight} from 'lucide-react';
import {official} from '@/lib/content';
import {Link} from '@/i18n/navigation';

export async function EditorialSection({kind}: {kind: 'careers' | 'news' | 'catering'}) {
  const t = await getTranslations(kind);
  const media = await getTranslations('hospitality');
  const nav = await getTranslations('nav');
  return <section className={`editorial-section editorial-${kind} section-pad`} aria-labelledby={`${kind}-title`}>
    {kind !== 'news'
      ? <div className="editorial-photo" data-image-reveal><Image src={kind === 'careers' ? '/images/walter-team.webp' : '/images/walter-table.webp'} alt={media(kind === 'careers' ? 'teamAlt' : 'tableAlt')} fill sizes="(max-width: 760px) 88vw, 40vw" /></div>
      : <div className="editorial-art" aria-hidden="true"><MoveUpRight strokeWidth={0.8} /></div>}
    <div data-reveal><p className="eyebrow">{kind === 'news' ? t('eyebrow') : nav(kind)}</p><h2 id={`${kind}-title`}>{kind === 'catering' ? `${t('line1')} ${t('line2')}` : t('title')}</h2><p>{t(kind === 'catering' ? 'intro' : 'copy')}</p>{kind !== 'news'
      ? <Link href={`/${kind}`} className="text-link">{nav(kind)}<ArrowUpRight size={20} aria-hidden="true" /></Link>
      : <a href={official.news} className="text-link">{t('cta')}<ArrowUpRight size={20} aria-hidden="true" /></a>}</div>
  </section>;
}
