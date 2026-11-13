import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: 'careerPage'});
  return pageMetadata(locale, '/prijava-za-posao', t('apply'), t('intro'));
}

export default async function JobApplicationPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('careerPage');

  return (
    <main id="main" tabIndex={-1} className="application-page section-pad">
      <div className="application-shell">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1>{t('apply')}</h1>
        <p className="application-intro">{t('intro')}</p>
        <p className="careers-application-note">{t('applicationNote')}</p>

        <form className="application-form" action="mailto:hr@walter.rs" method="post" encType="text/plain">
          <label>
            <span>Ime i prezime</span>
            <input type="text" name="name" placeholder="Vaše ime i prezime" required />
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="ime@email.com" required />
          </label>

          <label>
            <span>Pozicija</span>
            <input type="text" name="position" placeholder="Na koju poziciju se prijavljujete?" required />
          </label>

          <label>
            <span>Poruka</span>
            <textarea name="message" rows={5} placeholder="Napišite kratko predstavljanje i vaša iskustva..." required />
          </label>

          <button type="submit" className="button button-green">Pošalji prijavu</button>
        </form>
      </div>
    </main>
  );
}
