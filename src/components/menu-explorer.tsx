'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {products} from '@/lib/content';
import {SectionHeading} from './section-heading';
import {ProductDetail} from './product-detail';

const categories = ['all', 'grill', 'breakfast', 'soups', 'sweet'] as const;

export function MenuExplorer() {
  const t = useTranslations();
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const visible = products.filter((product) => category === 'all' || product.category === category);
  return (
    <section className="menu-section section-pad" aria-labelledby="menu-title">
      <SectionHeading eyebrow={t('menu.eyebrow')} title={t('menu.title')} copy={t('menu.copy')} id="menu-title" />
      <div className="category-tabs" role="group" aria-label={t('menu.filter')}>
        {categories.map((key) => <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)}>{key === 'soups' ? t('experience.soups') : t(`menu.${key}`)}<sup aria-hidden="true">{key === 'all' ? products.length : products.filter((product) => product.category === key).length}</sup></button>)}
      </div>
      <div className="product-grid" data-filtered={category !== 'all'} aria-live="polite">
        {visible.map((product) => (
          <article className={`product-card product-${product.id}`} key={product.id}>
            <ProductDetail product={product} card />
          </article>
        ))}
      </div>
    </section>
  );
}
