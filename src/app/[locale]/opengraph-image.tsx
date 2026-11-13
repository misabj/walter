import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {getTranslations} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export const alt = 'WALTER — Ćevapi, somun & Balkan soul.';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function OpenGraphImage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale});
  const [logo, food] = await Promise.all([
    readFile(join(process.cwd(), 'public', 'images', 'walter-logo-white.svg')),
    readFile(join(process.cwd(), 'public', 'images', 'walter-share-food.jpg'))
  ]);
  return new ImageResponse(
    <div style={{display: 'flex', background: '#103f32', color: '#f0e6d4', width: '100%', height: '100%', position: 'relative'}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/jpeg;base64,${food.toString('base64')}`} width={660} height={630} alt="" style={{position: 'absolute', right: 0, top: 0, objectFit: 'cover'}} />
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, #103f32 0%, #103f32 40%, rgba(16, 63, 50, 0) 78%)'}} />
      <div style={{display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'space-between', width: 690, height: '100%', padding: 56}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${logo.toString('base64')}`} width={330} height={58} alt="Walter" />
        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          <div style={{fontSize: 72, letterSpacing: -3, lineHeight: 1.05}}>{t('hero.title')}</div>
          <div style={{fontSize: 23, lineHeight: 1.4}}>{t('hero.eyebrow')}</div>
        </div>
        <div style={{fontSize: 18, letterSpacing: 2}}>{t('common.since')}</div>
      </div>
    </div>,
    size
  );
}
