import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import {filterRestaurants, groupRestaurantsByCity} from '../src/lib/location-search.ts';
import {products, restaurants} from '../src/lib/content.ts';
import {handleDialogKeyDown} from '../src/lib/dialog-keyboard.ts';
import {getRestaurantMenu, restaurantMenus} from '../src/lib/restaurant-menus.ts';

const fixtures = [
  {name: 'Walter · Dorćol', city: 'Beograd', country: 'serbia', address: 'Strahinjića Bana 57'},
  {name: 'CeWapi · CityPark', city: 'Ljubljana', country: 'slovenia'},
  {name: 'Walter · Amsterdam', city: 'Amsterdam', country: 'netherlands'}
];

test('location search combines accent-insensitive terms with country and city filters', () => {
  assert.equal(filterRestaurants(fixtures, '  dorcol   bana ', 'serbia', 'Beograd').length, 1);
  assert.equal(filterRestaurants(fixtures, 'dorcol', 'slovenia', '').length, 0);
  assert.equal(filterRestaurants(fixtures, '', 'slovenia', 'Ljubljana')[0]?.name, 'CeWapi · CityPark');
  assert.equal(filterRestaurants(fixtures, '', '', 'Amsterdam')[0]?.city, 'Amsterdam');
  assert.equal(filterRestaurants(fixtures, 'missing place', '', '').length, 0);
  const transliterated = [{name: 'Walter', city: 'Aranđelovac', country: 'serbia', address: 'Đure Jakšića 11'}];
  assert.equal(filterRestaurants(transliterated, 'djure jaksica arandjelovac', '', '').length, 1);
  assert.equal(filterRestaurants(transliterated, 'dure jaksica arandelovac', '', '').length, 1);
});

test('city grouping preserves filtered results without mixing same-named cities across countries', () => {
  const records = [...fixtures, {name: 'Another location', city: 'Beograd', country: 'bosnia'}];
  const groups = groupRestaurantsByCity(filterRestaurants(records, 'beograd', '', ''));
  assert.equal(groups.length, 2);
  assert.deepEqual(new Set(groups.map(({country}) => country)), new Set(['serbia', 'bosnia']));
  assert.deepEqual(new Set(groups.flatMap(({restaurants}) => restaurants)), new Set([records[0], records[3]]));
  assert.notEqual(groups[0].id, groups[1].id);
  assert.deepEqual(groupRestaurantsByCity([]), []);
});

test('every imported official entry has one active route and its local photograph', async () => {
  const snapshot = JSON.parse(await readFile(new URL('../src/data/restaurants.json', import.meta.url), 'utf8'));
  const imported = restaurants.filter(({status}) => status === 'open');
  assert.deepEqual(imported.map(({source}) => source).sort(), snapshot.restaurants.map(({source}) => source).sort());
  assert.equal(new Set(restaurants.map(({slug}) => slug)).size, restaurants.length);
  for (const restaurant of imported) {
    assert.ok(restaurant.imageSource?.startsWith('https://walter.rs/wp-content/uploads/'));
    assert.ok((await readFile(new URL(`../public${restaurant.image}`, import.meta.url))).length > 0);
  }
});

test('menu categories retain distinct original PDFs and distinct thumbnail images', async () => {
  const hashes = new Set();
  const thumbnails = new Set();
  for (const menu of restaurantMenus) {
    const pdf = await readFile(new URL(`../public${menu.file}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    assert.equal(pdf.length, menu.bytes);
    hashes.add(createHash('sha256').update(pdf).digest('hex'));
    const thumbnail = await readFile(new URL(`../public${menu.cover}`, import.meta.url));
    assert.ok(thumbnail.length > 0);
    thumbnails.add(createHash('sha256').update(thumbnail).digest('hex'));
  }
  assert.equal(hashes.size, restaurantMenus.length);
  assert.equal(thumbnails.size, restaurantMenus.length);
});

test('the coming-soon campaign cannot leak invented operational details', () => {
  const amsterdam = restaurants.find(({slug}) => slug === 'amsterdam');
  assert.ok(amsterdam);
  assert.equal(amsterdam.status, 'coming-soon');
  for (const key of ['address', 'telephone', 'menuUrl', 'openingHours', 'openingDate']) {
    assert.equal(amsterdam[key], undefined);
  }
  for (const restaurant of restaurants.filter(({status}) => status === 'open')) {
    assert.ok(restaurant.address);
    assert.ok(restaurant.source?.startsWith('https://walter.rs/portfolio/'));
  }
});

test('restaurant menu assignments use the supplied groups rather than city or country guesses', () => {
  const assignedSlugs = new Set();
  for (const menu of restaurantMenus) {
    for (const slug of menu.restaurantSlugs) {
      assert.equal(assignedSlugs.has(slug), false, `Duplicate menu assignment: ${slug}`);
      assignedSlugs.add(slug);
      assert.equal(restaurants.find((restaurant) => restaurant.slug === slug)?.country, 'serbia');
      assert.equal(getRestaurantMenu(slug)?.id, menu.id);
    }
  }
  for (const [slug, menuId] of [
    ['dorcol', 'centralni'], ['cvetni-trg', 'centralni'],
    ['walter-tc-stadion-vozdovac-beograd', 'centralni'],
    ['walter-tc-beo-shopping-centar-beograd', 'trgovacki'],
    ['walter-tc-bigfashion-novi-sad', 'trgovacki'],
    ['walter-mladenovac', 'regionalni'], ['walter-nis', 'regionalni'],
    ['walter-zlatibor', 'zlatibor'], ['walter-aerodrom-nikola-tesla', 'aerodrom']
  ]) {
    assert.equal(getRestaurantMenu(slug)?.id, menuId);
  }
  for (const slug of ['walter-nis-3', 'walter-tempo-plus-kraljevo', 'walter-stari-grad', 'citypark-ljubljana', 'amsterdam', 'unknown']) {
    assert.equal(getRestaurantMenu(slug), undefined);
  }
});

test('dialog keyboard boundaries wrap focus in both directions and Escape closes', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const document = {activeElement: null};
  Object.defineProperty(globalThis, 'document', {value: document, configurable: true});
  try {
    const controls = Array.from({length: 2}, () => ({
      tabIndex: 0,
      getClientRects: () => [{}],
      focus() {document.activeElement = this;}
    }));
    let closed = false;
    let prevented = false;
    const event = {
      key: 'Tab', shiftKey: false,
      currentTarget: {querySelectorAll: () => controls, close: () => {closed = true;}},
      preventDefault: () => {prevented = true;}
    };
    document.activeElement = controls[1];
    handleDialogKeyDown(event);
    assert.equal(document.activeElement, controls[0]);
    assert.equal(prevented, true);
    event.shiftKey = true;
    handleDialogKeyDown(event);
    assert.equal(document.activeElement, controls[1]);
    event.key = 'Escape';
    handleDialogKeyDown(event);
    assert.equal(closed, true);
    prevented = false;
    event.key = 'ArrowDown';
    handleDialogKeyDown(event);
    assert.equal(prevented, false);
  } finally {
    if (previous) Object.defineProperty(globalThis, 'document', previous);
    else delete globalThis.document;
  }
});

function keys(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) => typeof value === 'string' ? [`${prefix}${key}`] : keys(value, `${prefix}${key}.`)).sort();
}

test('every implemented locale supplies exactly the same nonempty UI dictionary', async () => {
  const dictionaries = await Promise.all(['en', 'sr', 'de', 'nl', 'sl', 'bs'].map(async (locale) => JSON.parse(await readFile(new URL(`../src/messages/${locale}.json`, import.meta.url), 'utf8'))));
  for (const dictionary of dictionaries) {
    assert.deepEqual(keys(dictionary), keys(dictionaries[0]));
    assert.ok(!JSON.stringify(dictionary).includes(':""'));
  }
});

test('every dish resolves to its own local photograph and translated card text', async () => {
  const imageHashes = new Set();
  const dictionaries = await Promise.all(['en', 'sr', 'de', 'nl', 'sl', 'bs'].map(async (locale) => JSON.parse(await readFile(new URL(`../src/messages/${locale}.json`, import.meta.url), 'utf8'))));
  for (const product of products) {
    const image = await readFile(new URL(`../public${product.image}`, import.meta.url));
    assert.equal(image.subarray(0, 4).toString(), 'RIFF');
    assert.equal(image.subarray(8, 12).toString(), 'WEBP');
    imageHashes.add(createHash('sha256').update(image).digest('hex'));
    for (const dictionary of dictionaries) {
      for (const key of [product.nameKey, product.copyKey]) {
        const [namespace, message] = key.split('.');
        assert.equal(typeof dictionary[namespace]?.[message], 'string', `Missing dish text: ${key}`);
        assert.ok(dictionary[namespace][message].trim().length > 0);
      }
    }
  }
  assert.equal(imageHashes.size, products.length);
});
