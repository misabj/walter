import {getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {pageMetadata} from '@/lib/seo';
import {HeroSection} from '@/components/hero-section';
import {SignatureProductFeature} from '@/components/signature-product-feature';
import {StorySection} from '@/components/story-section';
import {MenuExplorer} from '@/components/menu-explorer';
import {LocationFinder} from '@/components/location-finder';
import {ComingSoonSection} from '@/components/coming-soon-section';
import {EditorialSection} from '@/components/editorial-section';
import {MotionProvider} from '@/components/motion-provider';
import {DeliverySection, GiftSection} from '@/components/hospitality-sections';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: 'meta'});
  return pageMetadata(locale, '', t('title'), t('description'));
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <main id="main" tabIndex={-1}>
    <MotionProvider>
      <HeroSection />
      <SignatureProductFeature />
      <StorySection />
      <MenuExplorer preview />
      <DeliverySection />
      <LocationFinder preview />
      <GiftSection />
      <ComingSoonSection />
      <div className="editorial-pair"><EditorialSection kind="careers" /><EditorialSection kind="catering" /></div>
    </MotionProvider>
  </main>;
}
