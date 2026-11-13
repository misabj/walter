'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight} from 'lucide-react';
import {products} from '@/lib/content';
import {Link} from '@/i18n/navigation';
import {SectionHeading} from './section-heading';
import {ProductDetail} from './product-detail';

const categories = ['all', 'grill', 'breakfast', 'soups', 'sweet'] as const;

export function MenuExplorer({preview = false}: {preview?: boolean}) {
  const t = useTranslations();
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const selection = products.filter((product) => category === 'all' || product.category === category);
  const visible = preview ? selection.slice(0, 5) : selection;
  return (
    <section className={`menu-section section-pad brand-pattern${preview ? '' : ' dishes-section'}`} aria-labelledby="menu-title">
      <SectionHeading eyebrow={t('menu.eyebrow')} title={t(preview ? 'menu.title' : 'dishes.title')} copy={t(preview ? 'menu.copy' : 'dishes.copy')} id="menu-title" />
      <div className="category-tabs" role="group" aria-label={t('menu.filter')}>
        {categories.map((key) => <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)}>{key === 'soups' ? t('experience.soups') : t(`menu.${key}`)}<sup aria-hidden="true">{key === 'all' ? products.length : products.filter((product) => product.category === key).length}</sup></button>)}
      </div>
      <div className={`product-grid${preview ? '' : ' product-grid-catalog'}`} data-filtered={category !== 'all'} aria-live="polite">
        {visible.map((product, index) => (
          <article className={`product-card product-${product.id}`} key={product.id}>
            <ProductDetail product={product} card eager={!preview && index < 3} imageSizes={preview ? undefined : '(max-width: 760px) 90vw, (max-width: 1000px) 45vw, 29vw'} />
          </article>
        ))}
      </div>
      {preview ? <Link className="text-link dishes-link" href="/dishes">{t('dishes.viewAll')}<ArrowUpRight size={18} aria-hidden="true" /></Link> : <div className="dishes-menu-note"><p>{t('menu.localCopy')}</p><Link className="text-link" href="/menu">{t('menu.choose')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>}
    </section>
  );
}
