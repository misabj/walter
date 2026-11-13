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

export const restaurants = z.array(restaurantSchema).parse([
  ...directory.restaurants,
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
  {id: 'dessert', category: 'sweet', nameKey: 'menu.dessert', copyKey: 'menu.dessertCopy', image: '/images/food/urmasica.webp'},
  {id: 'pljeskavica', category: 'grill', nameKey: 'dishes.pljeskavica', copyKey: 'dishes.pljeskavicaCopy', image: '/images/food/pljeskavica-illustration.webp', sourcePage: 5, illustrated: true},
  {id: 'gurmanska-pljeskavica', category: 'grill', nameKey: 'dishes.gourmet', copyKey: 'dishes.gourmetCopy', image: '/images/food/gurmanska-pljeskavica-illustration.webp', sourcePage: 5, illustrated: true},
  {id: 'walburger', category: 'grill', nameKey: 'dishes.walburger', copyKey: 'dishes.walburgerCopy', image: '/images/food/walburger-illustration.webp', sourcePage: 5, illustrated: true},
  {id: 'kobasica-sa-sirom', category: 'grill', nameKey: 'dishes.sausage', copyKey: 'dishes.sausageCopy', image: '/images/food/kobasica-sa-sirom-illustration.webp', sourcePage: 5, illustrated: true},
  {id: 'telece-krpice', category: 'grill', nameKey: 'dishes.veal', copyKey: 'dishes.vealCopy', image: '/images/food/telece-krpice-illustration.webp', sourcePage: 7, illustrated: true},
  {id: 'pileci-file', category: 'grill', nameKey: 'dishes.chicken', copyKey: 'dishes.chickenCopy', image: '/images/food/pileci-file-illustration.webp', sourcePage: 8, illustrated: true},
  {id: 'biftek', category: 'grill', nameKey: 'dishes.tenderloin', copyKey: 'dishes.tenderloinCopy', image: '/images/food/biftek-illustration.webp', sourcePage: 9, illustrated: true},
  {id: 'walter-kajgana', category: 'breakfast', nameKey: 'dishes.scrambledEggs', copyKey: 'dishes.scrambledEggsCopy', image: '/images/food/walter-kajgana-illustration.webp', sourcePage: 2, illustrated: true},
  {id: 'walter-duo', category: 'breakfast', nameKey: 'dishes.duo', copyKey: 'dishes.duoCopy', image: '/images/food/walter-duo-illustration.webp', sourcePage: 2, illustrated: true},
  {id: 'potaz', category: 'soups', nameKey: 'dishes.vegetableSoup', copyKey: 'dishes.vegetableSoupCopy', image: '/images/food/potaz-illustration.webp', sourcePage: 11, illustrated: true},
  {id: 'pasulj', category: 'soups', nameKey: 'dishes.beans', copyKey: 'dishes.beansCopy', image: '/images/food/pasulj-illustration.webp', sourcePage: 11, illustrated: true},
  {id: 'baklava', category: 'sweet', nameKey: 'dishes.baklava', copyKey: 'dishes.baklavaCopy', image: '/images/food/baklava-illustration.webp', sourcePage: 13, illustrated: true},
  {id: 'tres-leches', category: 'sweet', nameKey: 'dishes.tresLeches', copyKey: 'dishes.tresLechesCopy', image: '/images/food/tres-leches-illustration.webp', sourcePage: 13, illustrated: true}
] as const;

export type Product = (typeof products)[number];

export const pages = ['story', 'dishes', 'menu', 'locations', 'amsterdam', 'careers', 'news', 'catering', 'privacy'] as const;
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
  instagram: 'https://www.instagram.com/walter.cewapi/',
  youtube: 'https://www.youtube.com/@walterbbq3959',
  linkedin: 'https://www.linkedin.com/company/walter-bbq/',
  facebook: 'https://www.facebook.com/waltercevap',
  contact: 'mailto:kontakt@walter.rs'
};
