# WALTER 2.0

An editorial, multilingual frontend for Walter. Phases 1 and 2 establish the platform and visual system; supporting discovery pages use a source-verified local content snapshot. This is a reviewable frontend, not a live ordering, recruitment or CMS integration.

## Design direction

**Born in the Balkans. Made to be remembered.** A cinematic, full-bleed Walter film, oversized two-line headlines and a floating navigation bar replace the original split-screen cover. Warm paper, Walter green, handwritten-feeling serif accents, overlapping product photographs and a staggered five-dish gallery establish a more distinctive editorial direction. Native scrolling, readable supporting text and visible menu/location actions take priority over spectacle.

The latest mobile-first hero keeps **KAD [heart] KAZE** fixed above rotating dish names: cevapi, pljeskavice, biftek, sudzuka and telece krpice, rendered with localized spelling and diacritics. Names change every three seconds without shifting the heading; reduced-motion visitors see the first dish without animation. A stable accessible full-text heading avoids repeated screen-reader announcements. A solid SVG heart and locally served Bebas Neue echo the official site's condensed headline typography. The upper-right slogan, hero description/serif accent and both hero menu/location CTAs are removed to let the food and campaign lead. Homepage navigation is transparent over the hero, with the official white logo and warm-white lettering, and scrolls away with the hero; inner-page navigation keeps its opaque treatment. Hero height follows the stable viewport, including compact 320 px phones.

Preserve the official SVG wordmark unchanged. The official site's accent is approximately `#006c56`, with the SVG itself using `#006255`. The new interface uses that recognizable green alongside forest `#103f32`, ivory `#f0e6d4`, warm white `#faf8f1`, brass `#c69a57` and charcoal `#171714`. Do not replace the logo with typeset text.

Decorative sequence numbers are omitted from section labels, menu thumbnails, dish cards/dialogs and mobile navigation in every locale. Product text aligns directly with its photograph without the former ordinal gutter. Functional counts, PDF page numbers, years, addresses and telephone numbers remain unchanged.

Each dish-card photograph is a keyboard-accessible button opening the same product dialog as its details link. Both triggers retain their own focus-restoration behavior and share one dialog per card; category filtering and the signature feature remain unchanged.

The post-gallery restaurant-menu notice/download block and the restaurant directory's source-note/external-link row are omitted. Gift and Amsterdam features retain their imagery, copy and notes without their former gallery/discovery CTA buttons. The internal restaurant-directory preview button, menu navigation and product-dialog menu links remain available.

Use locally served, open-licensed Manrope for UI and expressive headings, with Georgia as a restrained editorial accent. The complete variable font, including Latin Extended and Cyrillic, is losslessly WOFF2-compressed for delivery (53,652 bytes instead of the 164,700-byte TTF). The original TTF, release metadata and upstream SIL Open Font License are retained in `public/fonts`; native-language editorial and font shaping review remains a prelaunch gate.

The fixed hero tagline uses Bebas Neue Regular, verified in the official site's typography. Its 21,536-byte local WOFF2 preserves the Google Fonts source glyphs; the original TTF and `BebasNeue-OFL.txt` are retained alongside it. Rotating dish names contrast with italic Georgia, a system serif requiring no additional font download. No third-party font request occurs at runtime.

Dish names reveal individual letters from left to right with a 55 ms stagger during the existing five-dish cycle. Animation starts only after actual video playback and pauses with the film; the poster and reduced-motion states retain a complete static first dish. The green strip uses solid SVG hearts in all five localized campaign phrases and scrolls continuously in a seamless 32-second loop. An identical second group fills the wraparound and is hidden from assistive technology; the localized heart word remains screen-reader text. Reduced motion disables the marquee, hides the duplicate and allows horizontal scrolling instead.

## Official-site discovery — 12 November 2026

Sources were inspected directly, not inferred from search snippets:

- https://walter.rs/ — “Kad srce kaže”, traditional food / contemporary hospitality, products, locations, news, careers, delivery and newsletter. The careers section explicitly states operation since 2004.
- https://walter.rs/restorani/ — city-filtered directory, individual restaurant portfolio pages, regional presence including Serbia, Bosnia and Herzegovina, Montenegro and Slovenia.
- https://walter.rs/meni/ — restaurant-specific PDF menus grouped as central, shopping-centre, regional, tourist and airport; prices cannot be treated as globally consistent.
- https://walter.rs/portfolio/walter-cvetni-trg/ — Cvetni Trg, Njegoševa 3, shared call-centre number 063 101 1000. No opening hours or coordinates have been assumed.
- https://walter.rs/karijera/ — official careers and application destinations. Inconsistent historical network totals appear across pages; displayed directory counts are derived from the imported cards instead.
- https://walter.rs/prijava-za-posao/ — the working external job-application destination, plus HR email `hr@walter.rs` and phone `062 333 024`.
- https://walter.rs/ketering/ — catering preparation, food arrangement and delivery; enquiries/orders at `ketering@walter.rs`, further information at `kontakt@walter.rs` and `063 101 1000`.
- https://walter.rs/webshop/home/location — the advertised online ordering URL redirected to `/meni/` during inspection. Do not label it as a working checkout.
- https://walter.rs/poklon-galerija/ — Walter fruit rakija and official ordering details. Gift links lead here, not to an invented local shop.
- Official homepage delivery links confirm the App Store and Google Play destinations. The contact-centre link is explicitly labelled Serbia; delivery/collection availability remains restaurant-specific.
- Official unchanged logo: https://walter.rs/wp-content/uploads/2024/05/zeleni-walter-logo-1.svg (and official white variant).
- Amsterdam is **coming soon**, based only on the supplied brief. No address, date, menu, hours or recruitment claims are published.

Public visibility does not grant photography rights. The redesign uses the Walter photographs, two MP4s and five PDF menus explicitly supplied for this concept. The five menu-card thumbnails are separately generated illustrative food images, not photographs of Walter's actual servings. Confirm publication rights with the client before public deployment, including the official logos.

### Supplied media and playback

- `public/images/food/cevapi.webp`: supplied `cevapi2.webp`, optimized locally from 1.79 MB to approximately 120 KB.
- `breakfast.webp`, `soup.webp`, `urmasica.webp` and `ustipci.webp`: supplied Walter breakfast, veal soup, urmašica and spicy uštipci photographs. The official homepage confirms `VM25004` as spicy uštipci with kajmak. Next Image creates responsive display derivatives.
- `public/videos/walter-hero.mp4`: supplied `video-WP-2.mp4`, approximately 1.57 MB; also referenced by the official homepage at `https://walter.rs/wp-content/uploads/2022/10/video-WP-2.mp4`.
- `public/videos/walter-story.mp4`: supplied `WALTER-1440x810_Trim-1-1.mp4`, 1,877,737 bytes, 1440x810, 11.17 seconds. Its restaurant-interior footage appears in the story section, not as a replacement for the food hero.
- `public/images/walter-interior.webp`: a 1200x675 poster extracted at three seconds from the supplied interior film, approximately 84 KB. The film and poster share the same subject.
- `public/images/walter-team.webp` and `walter-table.webp`: supplied 500x500 team and shared-table photographs, approximately 33 KB and 30 KB. The team photo illustrates careers; the table photo illustrates delivery/collection.
- `public/images/walter-rakija.webp`: supplied `GAS_6861.webp`, converted from its actual PNG encoding to WebP without upscaling (768x1151), reduced from 1,489,940 to 79,530 bytes. The gift feature retains its adults-only/responsible-consumption note without a gallery CTA.
- `public/menus/walter-belgrade-2026.pdf`: supplied Belgrade menu, approximately 12.32 MB. Reused as the identical Centralni document in the in-site reader; loaded only after a click, never prefetched.
- Local SVG flags use `lipis/flag-icons` under MIT; the upstream license is retained at `public/images/flags/LICENSE`. Flag choices represent the six language options, not automatic geolocation.

The hero starts with an optimized food photograph. Video has no server-rendered source, uses `preload="none"`, and is always muted, looping and inline. It automatically starts on mobile and desktop when the hero is visible, without reduced-motion preference or a browser-reported data-saving setting. All videos are ambient backgrounds without play/pause buttons. Dish rotation freezes whenever the hero film is not playing. Reduced-motion/data-saving visitors and browsers blocking autoplay retain the poster. Leaving the hero or backgrounding the document pauses the film. Playback failures and autoplay blocking leave the photograph and a localized notice rather than hiding content or suggesting a nonexistent play button. The small "since 2004" hero topline is removed; the centered campaign and scroll link remain.

Both language dropdowns show real SVG flags and native language names. Arrow keys, Home/End, Escape, Tab, outside-pointer dismissal and focus restoration are supported; switching preserves the current content route, query and fragment.

The header places a green click-to-call button (`063 101 1000`) beside the language selector, replacing the former desktop location CTA. On compact mobile headers it shows a phone icon with a localized Serbia contact-centre accessible label; the full number is also available in the mobile menu alongside the retained location CTA. The phone link uses `tel:+381631011000` and does not change with the selected interface language.

Hero and interior footage use the shared `AmbientVideo` component. Each film loads only when its own area becomes visible; the below-fold interior film has no initial source or preload. Playback preferences, offscreen/background pause and visible failures apply independently. The interior poster is lazy-loaded. Delivery and gift features stack on mobile with readable copy and touch-sized links; all new text and image descriptions are supplied in all six dictionaries.

The story collage reserves a separate row for the full, softly highlighted 2004 year above the interior film. The video sits below it instead of covering the digits; the angled food photograph and overlaid quotation retain their desktop/mobile composition on the homepage and story page.

The directory imports all **61 restaurant cards in 26 city categories and four countries** from the official directory snapshot on 12 November 2026. Every imported record has its own official source, address, telephone and optimized local restaurant photograph. Grouping follows the official city categories, including its Beograd grouping for Barajevo and Mladenovac. These are counts of the imported directory, not an independently verified real-time total of the network. The brief-supplied Amsterdam campaign stays separate and coming soon; it is not presented as an operating restaurant in the directory.

The first desktop/mobile navigation item is now Restaurants, replacing Our story without a duplicate Restaurants item. Footer navigation follows the same order. The story route remains available, but the homepage story CTA is omitted. Full directory results are grouped by city, with country/city filters, accent-insensitive search, city shortcuts, result counts and reset. The homepage retains search/filter behavior but shows at most six cards and links to the full directory.

Country and city filters share styled, accessible select-only comboboxes on the homepage and full directory. Their scrollable lists use green selection/checkmarks, keyboard arrows, Home/End, type-ahead, Enter/Space, Escape, Tab and outside dismissal. Lists open above the field when space below is limited; country changes still reset the city. Search and filter fields use a soft green focus ring instead of the former brown inner outline. Other keyboard focus indicators remain visible, with light outlines on dark sections.

Supporting pages open directly into their content below navigation, without a separate oversized page-title banner or breadcrumb row. A visually hidden localized H1 preserves the page heading for assistive technology; existing section headings and individual restaurant details are unchanged.

The desktop/mobile header replaces Journal with Catering, linking to the local `/catering` page in all six languages; the footer also includes Catering. The existing journal and story routes remain accessible directly. Catering has a mobile-first photographic introduction, event occasions, preparation/arrangement/delivery details and a contact section. It reuses supplied Walter table and cevapi photographs. The main action scrolls to contact; real email/telephone links use the official catering contacts above. There is no simulated order form, invented pricing, minimum order, guaranteed service area or booking confirmation. Offers and availability must be agreed with the Walter team. The page has localized metadata and is automatically included in the sitemap.

The existing Careers header/footer links open a full local `/careers` page, with the supplied team photograph, source-grounded training/teamwork/development content and HR contacts. The homepage careers teaser now links to this local page too. Both localized job-application buttons lead directly to `https://walter.rs/prijava-za-posao/`, as chosen for this concept, with a visible note explaining that the application is completed on the official website. No applicant information or CVs are collected locally. Historical employee/restaurant totals, specific open vacancies and unverified employment benefits are not reproduced. All six languages include page-specific metadata and mobile layouts.

The homepage's closing pair presents Careers on the left and Catering on the right, with matching supplied team/table photographs and localized links to `/careers` and `/catering`. On mobile the cards stack in the same order. The former Journal teaser is omitted here; its standalone route remains unchanged.

The full restaurant directory places its introductory copy over the supplied interior film, with a dark overlay, responsive white text and a tall viewport-relative frame on desktop and mobile. This background loops muted and inline without play/pause buttons, matching the homepage and story films. The shared video component preserves its poster, reduced-motion/data-saving behavior, offscreen pause and visible media-failure notice. Statistics and filters remain on the light background below the film.

The directory-film update passes lint, all six tests and the production build. Real Chrome verified desktop/mobile autoplay, playback across the loop boundary, no playback buttons, offscreen pause/resume, reduced-motion poster behavior and a visible failure notice with the poster retained. All 36 locale/viewport combinations preserve unclipped introductory text and 61 restaurant cards. Directory filters and existing homepage/story controls were regression-checked, and desktop/mobile compositions were visually reviewed.

### In-site PDF menus

The localized `/menu` page presents the five supplied original documents: Centralni, Trgovacki, Regionalni, Zlatibor and Aerodrom. Location lists follow https://walter.rs/menu-2-2/; these groups cover Serbian restaurants, not every country in the directory. All five PDFs have 16 pages and remain unchanged. The central document is byte-identical to the existing Belgrade PDF, so its local file is reused rather than duplicated. Each card uses its own generated illustrative food photograph, locally optimized to WebP: cevapi, pljeskavica, veal strips, breakfast and grilled ustipci respectively. These thumbnails do not alter the original PDF contents or establish location-specific availability.

Menus open in a native modal dialog, full-screen on mobile, without navigating away. A lazy-loaded PDF.js canvas viewer provides page selection, previous/next, zoom, fit-page/fit-width and an optional original-PDF download. Extracted page text remains available to assistive technology where the PDF supplies it. Escape/backdrop closing, focus containment/restoration and background scroll locking follow the existing dialog behavior. Loading/rendering failures show retry and download actions. Closing destroys the document/worker; cancelled page renders cannot replace the current page.

No PDF or renderer is requested until a menu is opened. Worker, CMaps, fonts and WASM decoding assets are served locally, never from a CDN. `postinstall` and `prebuild` run `scripts/sync-pdf-assets.mjs` to populate the generated, ignored `public/pdfjs` directory from the pinned `pdfjs-dist` package, including its license. Keep menu originals and local cover images when deploying. The UI is translated in all six languages; PDF contents remain the supplied originals. Homepage dish discovery is unchanged.

PDF-menu validation passes ESLint, all seven regression tests and the production build, including TypeScript. All five originals match the supplied files and render their first/last pages. Browser checks cover zoom limits, mobile horizontal panning, both fit modes, rapid page changes, failure/retry, Escape, backdrop closing, focus containment/restoration and closing during loading. Focus stays inside the dialog after retries and disabled-control boundaries. All 36 locale/viewport gallery combinations avoid horizontal overflow; all six languages fit a 320x568 full-screen reader. Real Chrome desktop/mobile gallery and page-two screenshots were visually reviewed. Localized product-dialog links reach the new menu page. No PDF loads before opening, and the production dependency audit reports zero advisories. No new Lighthouse measurement is claimed.

The shared footer places a compact official Walter wordmark directly beneath the localized slogan on every page. Navigation, contact/language controls and the copyright/privacy row remain; the gift-gallery link and bottom media/prototype notes are removed.

### Updating the restaurant snapshot

```sh
node scripts/sync-restaurants.mjs
```

The importer reads the official card list and city taxonomy, fetches every linked detail page and photograph with four concurrent workers, and writes `src/data/restaurants.json` plus `public/images/restaurants`. The current 61 local WebP photographs total approximately 4.79 MB, loaded responsively and lazily in the directory. All cards must have a recognized city, title, source and photo; duplicate source URLs/routes, failed requests, unrecognized countries and invalid phone formats stop the import explicitly. New city categories require verified country classification before importing. Missing contact fields are reported, never invented.

Addresses and phone numbers come from each restaurant's contact block, not the corporate footer; local numbers are normalized using their verified country's dialing code. Opening hours are not inferred. The four previous detail slugs remain valid, and the two previously verified Belgrade PDF links are retained. The app does not fetch or scrape Walter at runtime. Review the refreshed snapshot and publication rights before deploying downloaded official restaurant photography.

## Architecture

- Next.js App Router, React, strict TypeScript, Tailwind 4 and explicit design tokens.
- `src/i18n`: next-intl routing, equivalent-page language switching, six locale-prefixed routes (`sr`, `en`, `de`, `nl`, `sl`, `bs`).
- `src/messages`: complete dictionaries for the implemented interface; all translations are editorial drafts requiring native-speaker approval, never runtime machine translation.
- `src/components`: server-rendered sections by default; isolated interactive navigation, product dialog, location finder and progressive GSAP enhancement.
- `src/lib`: validated, source-attributed local content. No fake store hours, prices, coordinates, job listings or newsletter submissions.
- Localized metadata, canonical and language alternates, sitemap and robots routes.
- GSAP is loaded on first scroll, only for visitors without reduced-motion preference; it does not compete with initial content delivery. The headline reveal is lightweight CSS. Content remains visible without JavaScript. No smooth-scroll hijacking or unnecessary animation framework; video loading follows the explicit policy above.
- A map-less directory is the baseline. Mapbox is intentionally not installed until approved geocoded data and a restricted public token exist. Location discovery must not depend on it.

### CMS integration gate (after frontend approval)

No CMS credentials or fake integrations are included. Replace the local adapter with typed, Zod-validated Sanity queries and ISR once a project/dataset and editorial workflow are approved. Required models: Country, City, Restaurant, MenuCategory, MenuItem, RestaurantMenuOverride, MediaAsset, StoryArticle, Campaign, JobOpening, SiteSettings, Navigation, TranslationReference.

Restaurant fields: stable ID/slug, localized name, country/city references, verified address, optional verified coordinates/telephone/opening hours/timezone, `open | coming-soon | temporarily-closed` status, images, amenities, approved ordering destinations, menu references and maps URL. Media require alt text, rights/credits and focal point. Overrides own restaurant-specific prices/currencies/availability. Translation references connect locale-equivalent documents. Campaigns own Amsterdam visibility and copy. Publish workflows must require verified sources for operational claims.

Do not add newsletter or application forms before a secure backend, server-side Zod validation, rate limiting, retention policy and explicit consent are in place. Current links lead to official destinations; no personal information is collected by this prototype.

## Development

Node.js 22.18+ recommended (developed with Node 24).

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

Default entry redirects to `/en`. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin **before building**. This origin is used in static canonical URLs, language alternates, social images and the sitemap. When it is unset, the prototype intentionally emits `noindex` and disallows crawling. Never commit secrets.

Deploy to Vercel using the standard Next.js preset. No custom build configuration is necessary. For a self-hosted deployment, run the production build and `npm start`. The first image request generates an optimized derivative; a CDN should cache subsequent requests.

## Review and release gates

- Frontend visual approval before CMS work.
- Publication rights clearance for supplied Walter media and imported official restaurant/interior photography.
- Native review of all six dictionaries; Cyrillic is extensible but is not a published locale.
- Confirm each restaurant's current details, local menu, legal text and valid order destinations.
- CMS, Mapbox, real careers/news content and forms are later integrations, not claimed complete.
- Lighthouse >=90 is a target, not a measured result until recorded. LCP/CLS/INP percentile claims require production field measurements; a local build cannot establish them.
- Keyboard, reduced-motion, desktop/mobile browser checks and production build are required for frontend handoff.

## Media redesign validation

The cinematic redesign is implemented. TypeScript, ESLint, all four existing regression tests and the production build pass.

- All 72 localized content URLs return HTTP 200.
- All six homepages were checked at 320, 390, 768 and 1440 px with the delivered WOFF2 font: no horizontal overflow or clipped two-line hero headings. No duplicate IDs or runtime errors were observed.
- Both flag dropdowns were checked for selected-option focus, ArrowUp/Down wrapping, Home/End, Escape/focus restoration, Tab and outside-pointer dismissal. The mobile footer menu stays inside the viewport. Changing language on a restaurant detail page preserves its route, query and fragment.
- The supplied 1440×810, 10.04-second film actually plays muted and inline on desktop. Play/pause, retained user pause and offscreen pause work. Mobile, reduced-motion and browser-reported data-saving modes start without a video source. Explicit mobile playback works. A simulated media-network failure retains the poster and displays the localized error.
- The five category result counts are 5 / 2 / 1 / 1 / 1. Each of the five dish dialogs shows the matching title/photo; forward/reverse focus containment, Escape and opener-focus restoration were checked. The Belgrade PDF is not fetched without a click.
- Desktop and mobile compositions were visually reviewed in the browser.

Earlier Lighthouse 13.6.0 measurements, before the centered-heart refinement, production `next start`, headless Chrome, default simulated mobile throttling, one run per route:

| Route | Performance | Accessibility | Best practices | Lab LCP | Lab CLS | Lab TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/sr` | 91 | 100 | 100 | 3.4 s | 0 | 40 ms |
| `/sr/menu` | 93 | 100 | 100 | 3.3 s | 0 | 30 ms |

These are local lab samples, not field guarantees or WCAG certification. The >=90 Lighthouse target was met in these runs; the 2.5 s LCP target was unmet. See the latest homepage measurement below; menu LCP remains a prelaunch follow-up. Production INP/p75 claims require field data. The intentionally nonindexable localhost preview scored 61 for SEO.

### Centered-heart mobile refinement

- Production build and TypeScript pass; ESLint and all four regression tests passed before the final CSS-only contrast refinement.
- All six locales were checked at 320, 360, 390, 430, 768 and 1440 px: 36 combinations without horizontal overflow, clipped campaign text or header overlap. The heading stays centered, and the removed corner slogan and hero CTA pair are absent.
- Mobile poster, explicit mobile video playback and eligible desktop autoplay were visually checked. Mobile starts without a video source. The language dropdown, mobile navigation, next-section arrow and updated Open Graph PNG were checked.
- A fresh Lighthouse 13.6.0 run of `/sr`, using production `next start`, headless Chrome and default simulated mobile throttling, recorded:

| Route | Performance | Accessibility | Best practices | Lab LCP | Lab CLS | Lab TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/sr` | 100 | 100 | 100 | 1.1 s | 0 | 90 ms |

This single local homepage sample meets the Lighthouse and lab LCP targets, not a production field guarantee or WCAG certification. It predates the automatic mobile video/rotating-dish update below and does not replace the earlier menu measurement.

### Automatic-loop campaign update

- ESLint, all four regression tests and the production build pass.
- All six locales were checked at 320, 360, 390, 430, 768 and 1440 px, including the text bounds of every rotating dish. All 36 combinations stay centered without clipping, horizontal overflow or header overlap. Dutch has a deliberate smaller dish size for its longest translation.
- A visible headless Chrome session verified actual desktop/mobile autoplay, playback across the video loop boundary, the five-name rotation and wraparound, a fixed tagline, and video/rotation pause. A simulated media failure retains the poster, shows an error and freezes rotation. Reduced motion retains one static dish without loading the film.
- The flag dropdown, mobile navigation and unchanged opaque inner-page header were checked. The homepage header has a transparent background, warm-white text and the official white logo.
- No new Lighthouse score is claimed for this update; mobile automatic media loading changes the earlier performance conditions.

### Supplied hospitality media update

- Added the restaurant-interior film to the story, the team photograph to careers, the shared-table photograph to a delivery/collection feature, and the optimized rakija photograph to an official gift-gallery feature. The existing food hero and rotating campaign are preserved.
- ESLint, all four regression tests and the production build pass. All six homepages were checked at 320, 360, 390, 430, 768 and 1440 px, verifying actual viewport width, text/link bounds, unique IDs, reduced-motion media sources and gift links: 36 combinations without overflow or clipping.
- Visible headless Chrome verified independent hero/interior playback, no initial offscreen interior source, actual interior looping, offscreen pause, retained user pause and a visible interior-only failure with its poster retained. Both films respect reduced motion.
- Mobile delivery, gifts, careers and story compositions were visually reviewed with successfully loaded photographs. Desktop interior playback and the supporting story/careers pages were checked without uncaught application exceptions.
- Delivery links lead to restaurant selection, the Serbia contact centre and the official apps; there is no invented checkout. Gifts lead to the verified official gallery. All added copy and image descriptions are localized.
- The previous Lighthouse samples predate these sections; no new performance score or field-performance guarantee is claimed.

## Original frontend baseline (before media redesign)

Phases 1 and 2 are implemented, together with supporting local-data discovery pages. CMS integration remains behind visual approval. Advanced maps/geolocation, complete country/city landing pages, store-specific purchasing, a live editorial archive and recruitment/newsletter backends are not represented as delivered.

The following checks and measurements describe the original split-screen implementation, not the current redesign. New media, layout and interaction checks must be recorded separately:

- TypeScript, ESLint, four focused Node tests (including dialog focus-boundary regression coverage) and a warning-free production build.
- All 72 locale-prefixed content routes return HTTP 200; the sitemap contains the matching 72 URLs. The localized Open Graph PNG endpoint returns a valid image.
- Browser checks cover menu/category filtering, diacritic-insensitive search, country/city filter combinations and reset, empty results, Amsterdam without call/directions actions, equivalent-page language switching with query/hash preservation, restaurant structured data, modal focus containment/restoration and Escape dismissal.
- All six homepages were checked at 320, 390 and 1440 px, without horizontal overflow, clipped hero text, duplicate IDs or browser runtime errors. Slovenian has a deliberate headline-size adjustment for its longer word. Reduced-motion mode disables enhancement; initial page position remains stable with motion enabled.
- Lighthouse 13.6.0, production `next start`, headless Chrome, default simulated mobile throttling, one run per route:

| Route | Performance | Accessibility | Best practices | Lab LCP | Lab CLS | Lab TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/en` | 94 | 100 | 100 | 3.06 s | 0 | 47 ms |
| `/en/menu` | 96 | 100 | 100 | 2.84 s | 0 | 41 ms |
| `/en/locations` | 100 | 100 | 100 | 0.76 s | 0 | 39 ms |

These are local lab results, not guaranteed field performance or a WCAG certification. The 2.5 s LCP target is **not yet met on the lab homepage/menu runs**; final approved imagery and deployed CDN/font delivery require further measurement. INP and 75th-percentile Core Web Vitals require production field data. Local SEO scores are 61 because this unconfigured prototype deliberately blocks indexing and uses a localhost canonical; configure the final HTTPS origin and re-audit before launch.

`npm audit --omit=dev` reports no production dependency advisories. The development lint chain currently reports seven moderate transitive advisories from `@typescript-eslint`'s minimatch 10 dependency. A compatible `npm audit fix` was attempted but cannot resolve the upstream major-version restriction. No forced major override is used; update the lint ecosystem when a compatible upstream fix is released. Do not feed untrusted glob patterns into the development tooling.

### Complete city-directory validation

- Imported source URLs match all 61 official directory cards, grouped into 26 official city categories across four countries. All imported entries have a local photograph, address and telephone.
- ESLint, all six regression tests and the production build pass. The build generates 419 pages/endpoints; all 414 localized content URLs returned HTTP 200 and their paths are present in the sitemap. Earlier 72-route reports above describe the smaller historical snapshot.
- All six directory locales were checked at 320, 360, 390, 430, 768 and 1440 px: 36 combinations with the expected 61 cards and 26 groups, correct viewport widths and no horizontal page overflow.
- Browser interactions verified country/city filtering, address search, keyboard transliteration (`djure jaksica`), empty results, reset, city shortcuts and clearing the city when changing country. Filtering from a scrolled desktop page keeps the selected city's card visible; filters remain in normal document flow.
- Verified the first mobile navigation link is Restaurants, the six-card homepage preview links to the full directory, and a new Montenegro detail loads its photograph, emits country code `ME` and preserves its route when switching language.
- Real headless Chrome screenshots were visually reviewed for desktop, mobile filters, a mobile restaurant card and a new restaurant detail. No new Lighthouse score is claimed; earlier performance samples predate this expanded directory.
