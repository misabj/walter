export const restaurantMenus = [
  {
    id: 'centralni',
    file: '/menus/walter-belgrade-2026.pdf',
    cover: '/images/menus/centralni-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-BGD1-2026-PDF.pdf',
    pages: 16,
    bytes: 12321138,
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
    locations: ['Walter Zlatibor']
  },
  {
    id: 'aerodrom',
    file: '/menus/aerodrom.pdf',
    cover: '/images/menus/aerodrom-food.webp',
    source: 'https://srbija-meni.walter.rs/walter-meni-AERO-2026-PDF',
    pages: 16,
    bytes: 12321034,
    locations: ['Aerodrom Beograd']
  }
] as const;

export type RestaurantMenu = (typeof restaurantMenus)[number];
