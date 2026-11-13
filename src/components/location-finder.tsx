'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Search} from 'lucide-react';
import {countries, restaurants} from '@/lib/content';
import {filterRestaurants, groupRestaurantsByCity} from '@/lib/location-search';
import {Link} from '@/i18n/navigation';
import {RestaurantCard} from './restaurant-card';
import {SectionHeading} from './section-heading';
import {AmbientVideo} from './ambient-video';
import {LocationFilter} from './location-filter';

const listedRestaurants = restaurants.filter(({status}) => status === 'open');

export function LocationFinder({preview = false}: {preview?: boolean}) {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const cities = [...new Set(listedRestaurants.filter((restaurant) => !country || restaurant.country === country).map((restaurant) => restaurant.city))].sort(new Intl.Collator('sr-Latn').compare);
  const filtered = filterRestaurants(listedRestaurants, query, country, city);
  const groups = groupRestaurantsByCity(filtered);
  const availableCountries = countries.filter((value) => listedRestaurants.some(({country}) => country === value));
  const cityCount = new Set(listedRestaurants.map(({city}) => city)).size;
  const reset = () => {setQuery(''); setCountry(''); setCity('');};
  return (
    <>
    {!preview && <div className="directory-intro section-pad">
      <AmbientVideo variant="story" sizes="100vw" />
      <p className="directory-introduction">{t('directory.intro')}</p>
    </div>}
    <section className={`locations-section section-pad brand-pattern${preview ? ' locations-preview' : ' locations-directory'}`} aria-labelledby="locations-title">
      {preview ? <SectionHeading eyebrow={t('locations.eyebrow')} title={t('locations.title')} copy={t('locations.copy')} id="locations-title" />
        : <h2 className="sr-only" id="locations-title">{t('nav.locations')}</h2>}
      {!preview && <div className="directory-stats">
        <div><strong>{listedRestaurants.length}</strong><span>{t('directory.restaurants')}</span></div>
        <div><strong>{cityCount}</strong><span>{t('directory.cities')}</span></div>
        <div><strong>{availableCountries.length}</strong><span>{t('directory.countries')}</span></div>
      </div>}
      <div className="location-toolbar">
      <div className="location-filters">
        <div className="search-field"><Search size={20} aria-hidden="true" /><label className="sr-only" htmlFor="location-query">{t('locations.search')}</label><input id="location-query" placeholder={t('locations.search')} value={query} onChange={(event) => setQuery(event.target.value)} type="search" /></div>
        <LocationFilter id="location-country" kind="country" label={t('locations.country')} value={country} onChange={(value) => {setCountry(value); setCity('');}} options={[{value: '', label: t('locations.allCountries')}, ...availableCountries.map((value) => ({value, label: t(`directory.countryNames.${value}`)}))]} />
        <LocationFilter id="location-city" kind="city" label={t('locations.city')} value={city} onChange={setCity} options={[{value: '', label: t('locations.allCities')}, ...cities.map((value) => ({value, label: value}))]} />
      </div>
      {!preview && <div className="city-tabs" role="group" aria-label={t('directory.cityFilter')}>
        <button type="button" aria-pressed={!city} onClick={() => setCity('')}>{t('locations.allCities')}</button>
        {cities.map((value) => <button key={value} type="button" aria-pressed={city === value} onClick={() => setCity(value)}>{value}</button>)}
      </div>}
      </div>
      <div className="directory-results"><p role="status">{t('directory.results', {count: filtered.length})}</p>{(query || country || city) && <button type="button" className="text-link" onClick={reset}>{t('directory.reset')}</button>}</div>
      {preview ? <div className="restaurant-grid">{filtered.slice(0, 6).map((restaurant) => <RestaurantCard restaurant={restaurant} key={restaurant.slug} />)}</div>
        : <div className="city-groups">{groups.map((group) => <section key={group.id} className="city-group" aria-labelledby={`city-${group.id}`}>
          <div className="city-group-heading"><div><p className="eyebrow">{t(`directory.countryNames.${group.country}`)}</p><h3 id={`city-${group.id}`}>{group.city}</h3></div><span>{t('directory.results', {count: group.restaurants.length})}</span></div>
          <div className="restaurant-grid">{group.restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} grouped key={restaurant.slug} />)}</div>
        </section>)}</div>}
      {filtered.length === 0 && <p className="empty-results">{t('locations.noResults')}</p>}
      {preview && <div className="directory-more"><Link href="/locations" className="button button-green">{t('directory.viewAll')}<ArrowUpRight size={19} aria-hidden="true" /></Link><p>{t('directory.preview', {shown: Math.min(filtered.length, 6), total: filtered.length})}</p></div>}
    </section>
    </>
  );
}
