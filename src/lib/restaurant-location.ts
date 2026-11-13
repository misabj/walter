export type Coordinates = {latitude: number; longitude: number};

type LocatedRestaurant = {
  status: string;
  address?: string;
  coordinates?: Coordinates;
};

export function distanceInKm(from: Coordinates, to: Coordinates) {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const latitude = radians(to.latitude - from.latitude);
  const longitude = radians(to.longitude - from.longitude);
  const arc = Math.sin(latitude / 2) ** 2
    + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(longitude / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(Math.max(0, 1 - arc)));
}

export function findNearestRestaurant<T extends LocatedRestaurant>(restaurants: readonly T[], position: Coordinates) {
  let nearest: {restaurant: T; distance: number} | undefined;
  for (const restaurant of restaurants) {
    if (restaurant.status !== 'open' || !restaurant.address || !restaurant.coordinates) continue;
    const distance = distanceInKm(position, restaurant.coordinates);
    if (!nearest || distance < nearest.distance) nearest = {restaurant, distance};
  }
  return nearest;
}

export function restaurantDirections(
  restaurant: {address?: string; city: string; countryCode: string; coordinates?: Coordinates},
  origin?: Coordinates
) {
  const destination = restaurant.coordinates
    ? `${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`
    : `${restaurant.address}, ${restaurant.city}, ${restaurant.countryCode}`;
  const params = new URLSearchParams({api: '1', destination});
  if (origin) params.set('origin', `${origin.latitude},${origin.longitude}`);
  return `https://www.google.com/maps/dir/?${params}`;
}
