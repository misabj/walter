type SearchableRestaurant = {
  name: string;
  city: string;
  country: string;
  address?: string;
};

function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ|dj/gi, 'd').toLowerCase();
}

export function filterRestaurants<T extends SearchableRestaurant>(
  restaurants: readonly T[],
  query: string,
  country: string,
  city: string
): T[] {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return restaurants.filter((restaurant) => {
    const text = normalize(`${restaurant.name} ${restaurant.city} ${restaurant.address ?? ''}`);
    return (!country || restaurant.country === country)
      && (!city || restaurant.city === city)
      && terms.every((term) => text.includes(term));
  });
}

export function groupRestaurantsByCity<T extends SearchableRestaurant>(restaurants: readonly T[]) {
  const groups = new Map<string, {id: string; city: T['city']; country: T['country']; restaurants: T[]}>();
  for (const restaurant of restaurants) {
    const key = `${restaurant.country}:${restaurant.city}`;
    let group = groups.get(key);
    if (!group) {
      group = {id: `${restaurant.country}-${restaurant.city.replace(/\s+/g, '-')}`, city: restaurant.city, country: restaurant.country, restaurants: []};
      groups.set(key, group);
    }
    group.restaurants.push(restaurant);
  }
  const collator = new Intl.Collator('sr-Latn');
  return [...groups.values()].sort((a, b) => collator.compare(a.city, b.city) || collator.compare(a.country, b.country));
}
