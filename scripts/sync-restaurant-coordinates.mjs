import {readFile, writeFile} from 'node:fs/promises';

const file = new URL('../src/data/restaurants.json', import.meta.url);
const directory = JSON.parse(await readFile(file, 'utf8'));

async function request(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      return await response.text();
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

let next = 0;
await Promise.all(Array.from({length: 3}, async () => {
  while (next < directory.restaurants.length) {
    const restaurant = directory.restaurants[next++];
    const page = await request(restaurant.source);
    const embed = page.match(/<iframe[^>]+src="(https:\/\/www\.google\.com\/maps\/embed[^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
    if (!embed) throw new Error(`Missing official map: ${restaurant.source}`);
    const map = await request(embed);
    // The embed viewport is offset from the pin. Read the actual place record.
    const pin = map.match(/\["0x[\da-f]+:0x[\da-f]+","(?:[^"\\]|\\.)*",\[(-?[\d.]+),(-?[\d.]+)\]/i);
    if (!pin) throw new Error(`Missing place coordinates: ${restaurant.source}`);
    restaurant.coordinates = {latitude: Number(pin[1]), longitude: Number(pin[2])};
    restaurant.coordinatesSource = embed;
    restaurant.coordinatesVerifiedAt = new Date().toISOString().slice(0, 10);
    console.log(restaurant.slug, restaurant.coordinates);
  }
}));

await writeFile(file, `${JSON.stringify(directory, null, 2)}\n`);
