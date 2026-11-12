import {z} from 'zod';
import directory from '../data/restaurants.json' with {type: 'json'};

export const restaurantSchema = z.object({
  slug: z.string(),
  name: z.string(),
  city: z.string(),
  country: z.enum(['serbia', 'bosnia', 'montenegro', 'slovenia', 'netherlands']),
  countryCode: z.enum(['RS', 'BA', 'ME', 'SI', 'NL']),
  status: z.enum(['open', 'coming-soon', 'temporarily-closed']),
  address: z.string().optional(),
  telephone: z.string().optional(),
  sharedCallCentre: z.boolean().default(false),
  source: z.url().optional(),
  menuUrl: z.url().optional(),
  image: z.string().regex(/^\/images\/restaurants\/[a-z0-9-]+\.webp$/).optional(),
  imageSource: z.url().optional(),
  verifiedAt: z.iso.date()
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export const countries = ['serbia', 'bosnia', 'montenegro', 'slovenia', 'netherlands'] as const;

const verifiedMenus: Record<string, string> = {
  'cvetni-trg': 'https://srbija-meni.walter.rs/walter-meni-BGD1-2026-PDF.pdf',
  dorcol: 'https://srbija-meni.walter.rs/walter-meni-BGD1-2026-PDF.pdf'
};
export const restaurants = z.array(restaurantSchema).parse([
  ...directory.restaurants.map((restaurant) => ({
    ...restaurant,
    ...(verifiedMenus[restaurant.slug] ? {menuUrl: verifiedMenus[restaurant.slug]} : {})
  })),
  {
    slug: 'amsterdam',
    name: 'Walter · Amsterdam',
    city: 'Amsterdam',
    country: 'netherlands',
    countryCode: 'NL',
    status: 'coming-soon',
    verifiedAt: '2026-11-12'
  }
]);

export const products = [
  {id: 'cevapi', category: 'grill', nameKey: 'menu.cevapi', copyKey: 'menu.cevapiCopy', image: '/images/food/cevapi.webp'},
  {id: 'breakfast', category: 'breakfast', nameKey: 'menu.breakfastName', copyKey: 'menu.breakfastCopy', image: '/images/food/breakfast.webp'},
  {id: 'soup', category: 'soups', nameKey: 'experience.soupTitle', copyKey: 'experience.soupCopy', image: '/images/food/soup.webp'},
  {id: 'ustipci', category: 'grill', nameKey: 'experience.ustipciTitle', copyKey: 'experience.ustipciCopy', image: '/images/food/ustipci.webp'},
  {id: 'dessert', category: 'sweet', nameKey: 'menu.dessert', copyKey: 'menu.dessertCopy', image: '/images/food/urmasica.webp'}
] as const;

export type Product = (typeof products)[number];

export const pages = ['story', 'menu', 'locations', 'amsterdam', 'careers', 'news', 'catering'] as const;
export type PageName = (typeof pages)[number];

export const official = {
  cateringEmail: 'mailto:ketering@walter.rs',
  cateringPhone: 'tel:+381631011000',
  menu: 'https://walter.rs/meni/',
  belgradeMenu: '/menus/walter-belgrade-2026.pdf',
  locations: 'https://walter.rs/restorani/',
  careers: 'https://walter.rs/karijera/',
  jobApplication: 'https://walter.rs/prijava-za-posao/',
  hrEmail: 'mailto:hr@walter.rs',
  hrPhone: 'tel:+38162333024',
  gifts: 'https://walter.rs/poklon-galerija/',
  appStore: 'https://apps.apple.com/app/walter-dostava/id1575096914',
  googlePlay: 'https://play.google.com/store/apps/details/?id=rs.walter.walterdostava',
  news: 'https://walter.rs/aktuelno/',
  privacy: 'https://walter.rs/politika-privatnosti/',
  instagram: 'https://www.instagram.com/walter.cevapi/',
  facebook: 'https://www.facebook.com/waltercevap/',
  contact: 'mailto:kontakt@walter.rs'
};
