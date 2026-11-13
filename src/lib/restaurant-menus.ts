export const restaurantMenus = [
  {
    id: 'centralni',
    file: '/menus/walter-belgrade-2026.pdf',
    cover: '/images/menus/centralni-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-BGD1-2026-PDF.pdf',
    pages: 16,
    bytes: 12321138,
    restaurantSlugs: [
      'walter-zeleznik-beograd', 'dorcol', 'walter-palilula-beograd',
      'walter-vracar-beograd', 'walter-borca-beograd', 'walter-savski-venac-beograd',
      'walter-rakovica-beograd', 'walter-zemun-beograd', 'walter-tc-bn-bos-beograd',
      'walter-banovo-brdo-beograd', 'walter-stepa-beograd', 'walter-roda-beograd',
      'walter-tc-stadion-vozdovac-beograd', 'walter-tc-big-pazova-nova-pazova',
      'walter-tc-park-surcin-beograd', 'walter-tc-piramida-2', 'walter-novi-beograd',
      'walter-subotica-2', 'walter-zemun-beograd-3', 'walter-mirijevo', 'cvetni-trg'
    ],
    locations: [
      'Železnik, Beograd', 'Strahinjića Bana, Beograd', '27. marta, Beograd',
      'Makenzijeva, Beograd', 'Borča, Beograd', 'Birčaninova, Beograd',
      'Rakovica, Beograd', 'Walter Zemun', 'BN Boss, Beograd',
      'Banovo brdo, Beograd', 'Stepa Stepanović, Beograd', 'TC Roda, Beograd',
      'Stadion, Beograd', 'Nova Pazova', 'Surčin, Beograd', 'Piramida, Beograd',
      'Z. Đinđića, Beograd', 'Walter Subotica', 'Prvomajska, Zemun',
      'Mirijevo, Beograd', 'Cvetni trg, Beograd'
    ]
  },
  {
    id: 'trgovacki',
    file: '/menus/trgovacki.pdf',
    cover: '/images/menus/trgovacki-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-BGD2-2026-PDF.pdf',
    pages: 16,
    bytes: 12321060,
    restaurantSlugs: [
      'walter-tc-big-karaburma-beograd', 'walter-tc-bigfashion-novi-sad',
      'walter-tc-big-novi-sad', 'walter-tc-beo-shopping-centar-beograd',
      'walter-tc-delta-city-beograd', 'walter-tc-ada-mall-beograd',
      'walter-tc-galerija-beograd', 'walter-usce'
    ],
    locations: [
      'TC BIG Karaburma, Beograd', 'TC Promenada, Novi Sad', 'TC BIG, Novi Sad',
      'TC BEO, Beograd', 'TC Delta City, Beograd', 'Ada Mall, Beograd',
      'Galerija Belgrade, Beograd', 'Ušće 2, Beograd'
    ]
  },
  {
    id: 'regionalni',
    file: '/menus/regionalni.pdf',
    cover: '/images/menus/regionalni-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-UNUT-2026-PDF',
    pages: 16,
    bytes: 12322616,
    restaurantSlugs: [
      'walter-zrenjanin', 'walter-nis', 'walter-stop-shop-sabac', 'walter-krusevac',
      'walter-mladenovac', 'walter-kragujevac', 'walter-kraljevo', 'cacak',
      'bor-2-2', 'arandjelovac'
    ],
    locations: [
      'Walter Zrenjanin', 'Walter Delta Planet, Niš', 'Walter Šabac',
      'Walter Kruševac', 'Walter Mladenovac', 'Walter Kragujevac',
      'Walter Kraljevo', 'Walter Čačak', 'Walter Šabac 2', 'Walter Bor',
      'Walter Aranđelovac'
    ]
  },
  {
    id: 'zlatibor',
    file: '/menus/zlatibor.pdf',
    cover: '/images/menus/zlatibor-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-TURIST-2026-PDF',
    pages: 16,
    bytes: 12697914,
    restaurantSlugs: ['walter-zlatibor'],
    locations: ['Walter Zlatibor']
  },
  {
    id: 'aerodrom',
    file: '/menus/aerodrom.pdf',
    cover: '/images/menus/aerodrom-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-AERO-2026-PDF',
    pages: 16,
    bytes: 12321034,
    restaurantSlugs: ['walter-aerodrom-nikola-tesla'],
    locations: ['Aerodrom Beograd']
  }
] as const;

export type RestaurantMenu = (typeof restaurantMenus)[number];

export function getRestaurantMenu(slug: string): RestaurantMenu | undefined {
  return restaurantMenus.find((menu) => menu.restaurantSlugs.some((restaurantSlug) => restaurantSlug === slug));
}
