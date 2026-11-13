# WALTER 2.0

An editorial, multilingual frontend for Walter. Phases 1 and 2 establish the platform and visual system; supporting discovery pages use a source-verified local content snapshot. This is a reviewable frontend, not a live ordering, recruitment or CMS integration.

## Design direction

Homepage dish cards retain their original vertical composition: full-width photographs above the title, complete description and details action, with the two-large/three-small staggered editorial layout on desktop. Filters and the five-card preview limit remain unchanged. The full Favourites gallery uses a separate uniform layout: 4:3 photographs, equal-height multi-column cards, reserved two-line heading space and bottom-aligned details actions. Single-column phones use natural text height without extra heading space.

The restaurant directory is a single interactive Leaflet/OpenStreetMap map with Walter pins and an accessible, scrollable restaurant selector. Search, country and city filters update both the map and selector. Selecting a pin or list item reveals the address, restaurant details, telephone and Google Maps directions. On phones the map and selector stack vertically. The homepage restaurant preview remains unchanged.

The nearest-restaurant action requests browser geolocation only after a click and permission, resets directory filters, and selects the nearest open restaurant with verified coordinates using straight-line distance (not road distance or travel time). Coordinates remain in browser memory; Google Maps receives the origin and destination only when the visitor opens the explicit navigation link. Permission denial, timeout, unavailable location, insecure/unsupported browsers and failed map tiles have localized messages; manual selection and navigation remain available. Location errors clear when the visitor manually selects a restaurant. There is no inline location-sharing notice above the map; all six privacy-page dictionaries describe map tile requests and optional location sharing. Production geolocation requires HTTPS.

Restaurant coordinates were imported on 13 November 2026 from the actual place records in Google Maps embeds on the official Walter restaurant pages, not their offset viewport centres. Each entry retains its coordinate source and verification date. Refresh with `node scripts/sync-restaurant-coordinates.mjs`; it validates every official map before writing the snapshot. The restaurant importer preserves coordinates only while source and address match; run the coordinate refresh after importing new or moved restaurants. Unverified locations remain selectable by address but are excluded from pins and nearest selection. OpenStreetMap tiles load directly with visible attribution; no API key or runtime geocoding service is required.

**Born in the Balkans. Made to be remembered.** A cinematic, full-bleed Walter film, oversized two-line headlines and a floating navigation bar replace the original split-screen cover. Warm paper, Walter green, handwritten-feeling serif accents, overlapping product photographs and a staggered five-dish gallery establish a more distinctive editorial direction. Native scrolling, readable supporting text and visible menu/location actions take priority over spectacle.

The latest mobile-first hero keeps **KAD [heart] KAZE** fixed above rotating dish names: cevapi, pljeskavice, biftek, sudzuka and telece krpice, rendered with localized spelling and diacritics. Names change every three seconds without shifting the heading; reduced-motion visitors see the first dish without animation. A stable accessible full-text heading avoids repeated screen-reader announcements. A solid SVG heart and locally served Bebas Neue echo the official site's condensed headline typography. The upper-right slogan, hero description/serif accent and both hero menu/location CTAs are removed to let the food and campaign lead. Homepage navigation is initially transparent over the hero, with the official white logo and warm-white lettering, then adopts the opaque inner-page treatment while scrolling. Hero height follows the stable viewport, including compact 320 px phones.

Preserve the official SVG wordmark unchanged. The official site's accent is approximately `#006c56`, with the SVG itself using `#006255`. The new interface uses that recognizable green alongside forest `#103f32`, ivory `#f0e6d4`, warm white `#faf8f1`, brass `#c69a57` and charcoal `#171714`. Do not replace the logo with typeset text.

The supplied Walter motif appears as a static, softly fading accent in the open space of the dish gallery, restaurant directory, PDF menu introduction, catering occasions, career benefits and shared footer. The shared `brand-pattern` treatment uses the section's text color at 5-8% opacity, with a transparent CSS mask behind content, no pointer events and no layout footprint. Photographs, films, cards and navigation controls are not patterned.

Decorative sequence numbers are omitted from section labels, menu thumbnails, mobile navigation and dish cards/dialogs in every locale. Product text aligns directly with its photograph without the former ordinal gutter. Functional counts, PDF page numbers, years, addresses and telephone numbers remain unchanged.

The story's oversized 2004 has a small localized "Since" label above it ("OD" in Serbian), positioned 24-48 px below the green section's upper edge. The former introductory eyebrow is omitted in all locales. A faint cream Walter pattern fades across the empty left side beside the year, reusing the shared decorative mask; it is hidden on phones where the year is centered. Below it, the film fills the section width at its native 16:9 aspect ratio, without the former side photograph. A subtle 16-24 px serif quote sits at the lower left over a soft gradient for readability. The film remains full-bleed on phones. Scroll-driven image clipping applies only to the film frame, not the shared layout, so the year and quote remain uncut throughout the reveal.

Each dish-card photograph is a keyboard-accessible button opening the same product dialog as its details link. Both triggers retain their own focus-restoration behavior and share one dialog per card; category filtering and the signature feature remain unchanged. Dish details open in an explicitly centered, rounded panel up to 1080 px wide, with a large 4:3 image on a warm neutral background alongside the category, dish name, description and restaurant-menu action. Below 900 px the image and text stack vertically. A sticky top bar keeps the close button available while long descriptions scroll; Escape, backdrop dismissal and keyboard focus wrapping remain available. Source-PDF page links are not displayed in dish details. PDF menu cards omit the page-count/file-size metadata row while keeping their PDF format badge, reader buttons and location lists. Dialog titles and descriptions are explicitly associated for assistive technology.

The header stays visible within the first 120 px, slides out while scrolling down beyond that point, and returns as soon as scrolling reverses. Scroll updates use a passive listener and one animation frame at a time, with cleanup on route changes. Keyboard focus and open navigation/language menus keep the header accessible. On the homepage it remains fixed without shifting content, retaining the transparent hero treatment near the top and switching to the normal paper background and green logo after 24 px. The existing reduced-motion preference disables the slide transition.

The mobile navigation ends with two rounded action cards: an ivory contact-centre call link and a green restaurant-finder link, each with a circular icon and directional arrow. They sit side by side at every width, with compact 80 px cards, smaller icons and primary labels only on phones; localized secondary labels remain visible above 760 px. Telephone dialing, localized routing, focus wrapping and closing the menu when choosing the finder remain unchanged; the unboxed header handset is separate.

Header and footer language pickers share a rounded warm-paper panel with a globe heading, aligned flags and native language names, small locale-code badges and a soft green selected row with a circular check. Header panels anchor to the full action group; footer panels anchor to their contact column so both fit narrow screens. Six-language routing, query/hash preservation, arrow-key navigation, focus restoration and dismissal remain unchanged.

The footer links to the supplied Instagram, YouTube, LinkedIn and Facebook profiles through icon-only circular links with accessible names and 44 px touch targets. They form one row on large screens and a two-by-two grid below 1200 px, keeping the contact link and language picker available.

The footer's localized contact action opens a small in-site contact dialog instead of immediately launching an email app. It displays the contact email and Serbia contact-centre number as explicit email/call links; no form or message collection is implied. The dialog reuses native modal behavior and shared keyboard handling, including Escape, focus containment/restoration and backdrop dismissal.

The footer privacy link now opens the localized `/privacy` page, included in static routes, metadata alternates and the sitemap. Its original, site-specific wording covers browsing, contact, the functional `NEXT_LOCALE` preference cookie, external services, retention enquiries and data rights; it does not reproduce the broader app, employment or CCTV policy. Controller identifiers/address and `dpo@walter.rs` were checked against https://walter.rs/politika-privatnosti/ on 13 November 2026. All six dictionaries supply the policy. This is a draft for the current frontend, not a legal compliance certification: the controller must approve it and confirm production hosting, recipients, retention, international transfers and applicable jurisdictions before publication. Adding forms, analytics, advertising or ordering requires another policy/consent review.

The separate `/dishes` page, named Favourites ("Favoriti" in Serbian), presents 18 dishes in an even three-column desktop grid, two columns on tablets and one column on phones (up to 760 px). Breakfast, soups/stews and sweets each contain three dishes; the grill category contains nine. Header, mobile and footer navigation follow Locations, Menu, Favourites, Catering, Careers, localized in all six languages. Header and mobile navigation use locally hosted Manrope in evenly spaced uppercase lettering, without serif or italic styling, a softly outlined desktop capsule with a green active link, and unnumbered mobile rows with the current page highlighted. The homepage header retains its light-on-video treatment. At every width, the header call link is an unboxed handset icon that inherits the header text color, retains a 44 px touch target and includes the telephone number in its accessible label. The existing `/dishes` URL remains unchanged, with the new name reflected in page headings, metadata and the homepage gallery link. Category filters retain the same grid, and every card opens its photo, description and restaurant-menu link in the existing accessible dialog. Homepage filters and counts use the same complete catalogue, with the five-card preview limit applied after filtering: breakfast, soups/stews and sweets each show all three dishes, while the all/grill views show five. The default five-dish editorial preview and link to the full gallery remain unchanged.

The thirteen added dishes are sourced from the supplied Centralni PDF (`public/menus/walter-belgrade-2026.pdf`): Walter scrambled eggs and Walter duo (page 2), Walter pljeskavica, gourmet pljeskavica, Walburger and sausage with cheese (page 5), veal strips in cream sauce (page 7), chicken fillet (page 8), beef tenderloin (page 9), seasonal vegetable cream soup and beef bean stew (page 11), baklava and tres leches (page 13). Descriptions preserve the menu's ingredients and portion options, with translations for all six locales; prices are not copied as universal prices. Source page metadata is retained internally for provenance, without public page-specific links. All thirteen added dishes use reference-based editorial illustrations with warm, full-frame restaurant compositions, optimized to 1200x900 WebP. The seven grill images follow the same wooden-table, ceramic-plate and natural-light styling as the breakfast images; the veal dish depicts one coherent kajmak-sauce serving rather than the source photograph's split sauce variants. These are not photographs of actual Walter servings; their small original menu extracts remain available locally. Cards and dialogs show dish names and category labels without image-production badges or notices. Higher-resolution supplied originals can replace the illustrations later. The original five homepage-preview images remain unchanged. Local availability, presentation, accompaniments and allergens must still be confirmed with the restaurant.

The post-gallery restaurant-menu notice/download block, the PDF menu page's closing source note/external official-menu link, and the restaurant directory's source-note/external-link row are omitted in every locale. Gift and Amsterdam features retain their imagery, copy and notes without their former gallery/discovery CTA buttons. The gift feature also omits its introductory "Gift gallery" eyebrow in every locale. The internal restaurant-directory preview button, menu navigation and product-dialog menu links remain available.

Restaurant detail pages also omit the closing source note and external source link. Their menu action stays on the localized site: explicit restaurant-slug assignments in `src/lib/restaurant-menus.ts` connect the supplied groups to `/menu?menu=<group>`, which opens the matching local PDF reader automatically. Structured menu data uses the same local destination. Restaurants outside those supplied groups link to the local menu overview without assuming a group from their city or country; Amsterdam retains its coming-soon presentation. A normal `/menu` visit still shows the cards without opening a PDF, and invalid menu-group parameters return 404.

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
- `public/images/walter-team.webp` and `walter-table.webp`: supplied 500x500 team and shared-table photographs, approximately 33 KB and 30 KB. The team photo illustrates careers; the table photo remains in catering.
- `public/images/walter-delivery.webp`: supplied `dostava.jpg`, optimized to a 1200x707 WebP (61,712 bytes). The delivery feature uses this paper-bag photograph with localized alt text and a left-aligned crop to preserve the bag motif.
- `public/images/walter-pattern.webp`: supplied transparent `pattern-3.webp`, with unused transparent margins trimmed and the visible 914x499 motif losslessly encoded as WebP (17,766 bytes). Its alpha channel supplies the shared decorative mask; the original motif is not redrawn.
- `public/images/walter-rakija.webp`: supplied `GAS_6861.webp`, converted from its actual PNG encoding to WebP without upscaling (768x1151), reduced from 1,489,940 to 79,530 bytes. The gift feature retains its adults-only/responsible-consumption note without a gallery CTA.
- `public/menus/walter-belgrade-2026.pdf`: supplied Belgrade menu, approximately 12.32 MB. Reused as the identical Centralni document in the in-site reader; loaded only after a click, never prefetched.
- Local SVG flags use `lipis/flag-icons` under MIT; the upstream license is retained at `public/images/flags/LICENSE`. Flag choices represent the six language options, not automatic geolocation.

The hero starts with an optimized food photograph. Video has no server-rendered source, uses `preload="none"`, and explicitly requests autoplay with muted, looping, inline playback. Muted/default-muted, zero volume and inline properties are set before loading or calling play, including on mobile Safari. At the client's request, visible videos now attempt playback regardless of reduced-motion or browser-reported data-saving preferences; reduced-motion still disables decorative text/reveal animations. All videos remain ambient backgrounds without play/pause buttons. Browser/OS autoplay restrictions cannot be overridden: a blocked film retains its poster and localized notice, then retries synchronously on a subsequent touch, pointer or key interaction. Returning to the tab, restoring a page or reconnecting also retries visible playback. Leaving the video or backgrounding the document pauses it. Genuine media errors are logged and retain the poster; subsequent retries reload a failed media resource. Dish rotation freezes whenever the hero film is not playing. The small "since 2004" hero topline is removed; the centered campaign and scroll link remain.

Both language dropdowns show real SVG flags and native language names. Arrow keys, Home/End, Escape, Tab, outside-pointer dismissal and focus restoration are supported; switching preserves the current content route, query and fragment.

The header places a green click-to-call button (`063 101 1000`) beside the language selector, replacing the former desktop location CTA. On compact mobile headers it shows a phone icon with a localized Serbia contact-centre accessible label; the full number is also available in the mobile menu alongside the retained location CTA. The phone link uses `tel:+381631011000` and does not change with the selected interface language.

Hero and interior footage use the shared `AmbientVideo` component. Each film loads only when its own area becomes visible; the below-fold interior film has no initial source or preload. Offscreen/background pause, interaction retries and visible failures apply independently. Both MP4s use H.264 and already place playback metadata before their media payload for progressive playback. The interior poster is lazy-loaded. No full-frame tint/gradient or video opacity transition is applied: the original video is revealed at full opacity after playback starts, with text shadows only on overlaid captions. Delivery and gift features stack on mobile with readable copy and touch-sized links; all new text and image descriptions are supplied in all six dictionaries.

The story collage reserves a separate row for the full, softly highlighted 2004 year above the interior film. The video sits below it instead of covering the digits; the angled food photograph and overlaid quotation retain their desktop/mobile composition on the homepage and story page.

On mobile (up to 760 px), the story film spans the viewport edge to edge, the secondary food photograph is hidden and the year is centered in its own row above the film. The quote remains inset over the bottom of the full-width video. This applies to the homepage and story route; the desktop collage is unchanged.

The directory imports all **61 restaurant cards in 26 city categories and four countries** from the official directory snapshot on 12 November 2026. Every imported record has its own official source, address, telephone and optimized local restaurant photograph. Grouping follows the official city categories, including its Beograd grouping for Barajevo and Mladenovac. These are counts of the imported directory, not an independently verified real-time total of the network. The brief-supplied Amsterdam campaign stays separate and coming soon; it is not presented as an operating restaurant in the directory.

The first desktop/mobile navigation item is now Restaurants, replacing Our story without a duplicate Restaurants item. Footer navigation follows the same order. The story route remains available, but the homepage story CTA is omitted. Full directory results are grouped by city, with country/city filters, accent-insensitive search, city shortcuts, result counts and reset. The homepage retains search/filter behavior but shows at most six cards and links to the full directory.

Country and city filters share styled, accessible select-only comboboxes on the homepage and full directory. Their scrollable lists use green selection/checkmarks, keyboard arrows, Home/End, type-ahead, Enter/Space, Escape, Tab and outside dismissal. Lists open above the field when space below is limited; country changes still reset the city. Search and filter fields use a soft green focus ring instead of the former brown inner outline. Other keyboard focus indicators remain visible, with light outlines on dark sections.

Supporting pages open directly into their content below navigation, without a separate oversized page-title banner or breadcrumb row. A visually hidden localized H1 preserves the page heading for assistive technology; existing section headings and individual restaurant details are unchanged.

The desktop/mobile header replaces Journal with Catering, linking to the local `/catering` page in all six languages; the footer also includes Catering. The existing journal and story routes remain accessible directly. Catering has a mobile-first photographic introduction, event occasions, preparation/arrangement/delivery details and a contact section. It reuses supplied Walter table and cevapi photographs. The main action scrolls to contact; real email/telephone links use the official catering contacts above. There is no simulated order form, invented pricing, minimum order, guaranteed service area or booking confirmation. Offers and availability must be agreed with the Walter team. The page has localized metadata and is automatically included in the sitemap.

The existing Careers header/footer links open a full local `/careers` page, with the supplied team photograph, source-grounded training/teamwork/development content and HR contacts. The homepage careers teaser now links to this local page too. Both job-application buttons preserve the current locale and open `/prijava-za-posao`. The incoming application form uses a native `mailto:hr@walter.rs` action: it depends on a configured mail app and user confirmation there, not a backend submission. The application page, careers notices and privacy scope explain this distinction; no application is sent or stored by the site server. Historical employee/restaurant totals, specific open vacancies and unverified employment benefits are not reproduced.

The homepage's closing pair presents Careers on the left and Catering on the right, with matching supplied team/table photographs and localized links to `/careers` and `/catering`. On mobile the cards stack in the same order. The careers teaser omits the former external-application availability note; its local Careers link remains. The former Journal teaser is omitted here; its standalone route remains unchanged.

The full restaurant directory places its introductory copy over the supplied interior film, without a dark overlay, using responsive white text with a text-only shadow and a tall viewport-relative frame on desktop and mobile. This background loops muted and inline without play/pause buttons, matching the homepage and story films. The shared video component preserves its poster, interaction retries, offscreen pause and visible media-failure notice. Statistics and filters remain on the light background below the film.

The directory-film update passes lint, all six tests and the production build. Real Chrome verified desktop/mobile autoplay, playback across the loop boundary, no playback buttons, offscreen pause/resume, reduced-motion poster behavior and a visible failure notice with the poster retained. All 36 locale/viewport combinations preserve unclipped introductory text and 61 restaurant cards. Directory filters and existing homepage/story controls were regression-checked, and desktop/mobile compositions were visually reviewed.

### In-site PDF menus

The localized `/menu` page presents the five supplied original documents: Centralni, Trgovacki, Regionalni, Zlatibor and Aerodrom. Location lists follow https://walter.rs/menu-2-2/; these groups cover Serbian restaurants, not every country in the directory. All five PDFs have 16 pages and remain unchanged. The central document is byte-identical to the existing Belgrade PDF, so its local file is reused rather than duplicated. Each card uses its own generated illustrative food photograph, locally optimized to WebP: cevapi, pljeskavica, veal strips, breakfast and grilled ustipci respectively. These thumbnails do not alter the original PDF contents or establish location-specific availability.

Menus open in a native modal dialog, full-screen on mobile, without navigating away. Each card's photograph and browse button open the same corresponding menu; both are keyboard-accessible buttons with localized labels, a shared dialog reference and focus restoration to the particular opener. A lazy-loaded PDF.js canvas viewer provides page selection, previous/next, zoom, fit-page/fit-width and an optional original-PDF download. Extracted page text remains available to assistive technology where the PDF supplies it. Escape/backdrop closing, focus containment/restoration and background scroll locking follow the existing dialog behavior. Loading/rendering failures show retry and download actions. Closing destroys the document/worker; cancelled page renders cannot replace the current page.

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
- Directory search and restaurant details work independently of map availability. Every directory restaurant with a published address has an automatically loaded, viewport-gated Google Maps view without an API key. A shared all-location pin map remains deferred until verified coordinates and a map provider are available. Mapbox is not installed.

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

Default entry redirects to `/en`. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin **before building**. This origin is used in static canonical URLs, language alternates, social images and the sitemap. Without an explicit origin, Vercel deployments use `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`; local development falls back to `http://localhost:3000`. Without `NEXT_PUBLIC_SITE_URL`, the prototype still intentionally emits `noindex` and disallows crawling. Never commit secrets.

Browser and Apple touch icons are local copies of the official Walter site's 32, 192 and 180 px PNG icons (`https://walter.rs/wp-content/uploads/2025/07/cropped-faviconw-2-{size}x{size}.png`). The localized 1200x630 Open Graph PNG combines the existing cevapi photograph with the white Walter logo, green gradient and translated headline. Twitter large-image metadata uses the same preview. These tags are server-rendered so link-preview crawlers do not need JavaScript. Share the public HTTPS URL, not a localhost address; messaging apps may cache older thumbnails, and protected preview deployments are not publicly crawlable.

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
