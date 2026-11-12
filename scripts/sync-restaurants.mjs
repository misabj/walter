import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import sharp from 'sharp';

const source = 'https://walter.rs/restorani/';
const verifiedAt = new Date().toISOString().slice(0, 10);
const aliases = {
  'walter-cvetni-trg': 'cvetni-trg',
  'walter-dorcol-beograd': 'dorcol',
  'walter-delta-planet-banja-luka': 'delta-planet-banja-luka',
  'cewapi-citypark-ljubljana': 'citypark-ljubljana'
};
const countryCodes = {serbia: 'RS', bosnia: 'BA', montenegro: 'ME', slovenia: 'SI'};
const dialingCodes = {serbia: '381', bosnia: '387', montenegro: '382', slovenia: '386'};
const countryByCategory = Object.fromEntries(Object.entries({
  serbia: ['arandjelovac', 'beograd', 'bor', 'cacak', 'gornji-milanovac', 'kragujevac', 'kraljevo', 'krusevac', 'nis', 'nova-pazova', 'novi-sad', 'obrenovac', 'pancevo', 'sabac', 'smederevo', 'subotica', 'zlatibor', 'zrenjanin'],
  bosnia: ['banja-luka', 'brcko', 'doboj-sr', 'istocno-sarajevo'],
  montenegro: ['kotor', 'podgorica', 'zabljak'],
  slovenia: ['ljubljana']
}).flatMap(([country, categories]) => categories.map((category) => [category, country])));

function text(value) {
  return value.replace(/<[^>]*>/g, ' ')
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, code) => String.fromCodePoint(code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code)))
    .replace(/&(nbsp|amp|quot|apos|lt|gt|ndash|mdash);/g, (_, entity) => ({nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', ndash: '–', mdash: '—'})[entity])
    .replace(/\s+/g, ' ').trim();
}

async function request(url) {
  const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`${response.status} while importing ${url}`);
  return response;
}

const html = await (await request(source)).text();
const cities = new Map([...html.matchAll(/data-filter="\.([^"]+)"[^>]*>([^<]+)<\/a>/g)]
  .filter(([, key]) => key !== 'lokacije').map(([, key, label]) => [key, text(label)]));
const cards = [...html.matchAll(/<div class="col span_4\s+element ([^"]+)"([\s\S]*?)<!--\/col-->/g)];
if (!cards.length) throw new Error('No directory cards found; check the official markup before importing.');
const imageDirectory = join(process.cwd(), 'public', 'images', 'restaurants');
await mkdir(imageDirectory, {recursive: true});

async function importCard([, categories, markup]) {
  const category = categories.split(/\s+/).find((key) => cities.has(key));
  const city = cities.get(category);
  const name = text(markup.match(/<h3>([\s\S]*?)<\/h3>/)?.[1] ?? '');
  const page = markup.match(/href="(https:\/\/walter\.rs\/portfolio\/[^"]+)"/)?.[1];
  const imageTag = markup.match(/<img\b[^>]+>/)?.[0];
  const imageSource = imageTag?.match(/(https:\/\/walter\.rs\/[^"\s,]+)\s+900w/)?.[1]
    ?? imageTag?.match(/\bsrc="([^"]+)"/)?.[1];
  if (!city || !name || !page || !imageSource || new URL(imageSource).hostname !== 'walter.rs') {
    throw new Error(`Incomplete official directory card: ${categories}`);
  }
  const sourceSlug = new URL(page).pathname.split('/').filter(Boolean).at(-1);
  const slug = aliases[sourceSlug] ?? sourceSlug;
  const country = countryByCategory[category];
  if (!country) throw new Error(`Verify the country for the new city category: ${category}`);
  const detail = await (await request(page)).text();
  const contactStart = detail.indexOf('Adresa');
  const contact = contactStart < 0 ? '' : detail.slice(contactStart).split('<!--/post-area-->')[0];
  const address = text(contact.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? '');
  const telephoneText = text(contact.match(/Telefon[\s\S]*?<\/p>([\s\S]*?)<\/div>/i)?.[1] ?? '');
  const phone = telephoneText.match(/\+?\d[\d\s()./-]{5,}\d/)?.[0];
  let telephone;
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    telephone = phone.startsWith('+') ? `+${digits}` : digits.startsWith('00') ? `+${digits.slice(2)}`
      : digits.startsWith('0') ? `+${dialingCodes[country]}${digits.slice(1)}`
        : digits.startsWith(dialingCodes[country]) ? `+${digits}` : undefined;
    if (!telephone || !/^\+\d{9,15}$/.test(telephone)) throw new Error(`Unrecognized telephone on ${page}: ${phone}`);
  }
  const menuUrl = contact.match(/href="(https:\/\/[^"]+\.pdf)"/i)?.[1];
  const image = `/images/restaurants/${slug}.webp`;
  const imageBytes = Buffer.from(await (await request(imageSource)).arrayBuffer());
  await sharp(imageBytes).resize({width: 900, withoutEnlargement: true}).webp({quality: 80}).toFile(join(imageDirectory, `${slug}.webp`));
  return {
    slug, name, city, country, countryCode: countryCodes[country], status: 'open',
    ...(address ? {address} : {}),
    ...(telephone ? {telephone, sharedCallCentre: telephone === '+381631011000'} : {}),
    source: page, image, imageSource, ...(menuUrl ? {menuUrl} : {}), verifiedAt
  };
}

const restaurants = new Array(cards.length);
let next = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (next < cards.length) {
    const index = next++;
    restaurants[index] = await importCard(cards[index]);
  }
}));
if (new Set(restaurants.map(({source}) => source)).size !== cards.length
  || new Set(restaurants.map(({slug}) => slug)).size !== cards.length) {
  throw new Error('Duplicate official restaurant source or local route.');
}
const dataDirectory = join(process.cwd(), 'src', 'data');
await mkdir(dataDirectory, {recursive: true});
await writeFile(join(dataDirectory, 'restaurants.json'), `${JSON.stringify({source, verifiedAt, restaurants}, null, 2)}\n`);
console.log(JSON.stringify({
  imported: restaurants.length,
  cities: new Set(restaurants.map(({city}) => city)).size,
  countries: [...new Set(restaurants.map(({country}) => country))],
  missingAddress: restaurants.filter(({address}) => !address).map(({source}) => source),
  missingTelephone: restaurants.filter(({telephone}) => !telephone).map(({source}) => source)
}, null, 2));
