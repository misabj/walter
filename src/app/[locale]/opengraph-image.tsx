import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {getTranslations} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export const alt = 'Walter — Born in the Balkans. Made to be remembered.';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function OpenGraphImage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale});
  const logo = await readFile(join(process.cwd(), 'public', 'images', 'walter-logo-white.svg'));
  return new ImageResponse(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#103f32', color: '#f0e6d4', width: '100%', height: '100%', padding: 70}}>
      {/* ImageResponse renders SVG media directly, without the Next Image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/svg+xml;base64,${logo.toString('base64')}`} width={415} height={73} alt="Walter" />
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
        <div style={{fontSize: 85, letterSpacing: -4, lineHeight: 1.05}}>{t('hero.title')}</div>
        <div style={{fontSize: 27}}>{t('hero.eyebrow')}</div>
      </div>
      <div style={{fontSize: 19, letterSpacing: 3}}>{t('common.since')}</div>
    </div>,
    size
  );
}
