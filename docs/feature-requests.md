# Tracked list — macdio.app site

Requests and findings, newest first. Nothing leaves this list without a line
saying what happened to it.

## 2026-10-12

- [ ] **W1 Full redesign of macdio.app** (Sait, 2026-10-12). Replace the whole
  current site with a more modern, simpler, more functional design. Built with
  the Hallmark design skill (audit, then redesign), using the showcase clips and
  stills in `~/MacdioBuild/showcase/media/web/` (app repo tracker #566).
  Everything is tested locally first; nothing deploys until Sait says "tamam".
  F1 foundation done on branch `v2` (2026-10-12): Astro + Starlight skeleton, 33 marketing
  routes in every live locale, Worker language redirect with tests, sitemap with hreflang,
  hreflang/link/i18n checks in the build, web-size media, counts, claims register,
  Hallmark audit. Not deployed. Next: F2 English design.
  F2a (2026-10-12): design system and home page built on branch `v2`; after Sait's
  review the theme moved to dark paper, Instrument Serif with italic accent phrases,
  brass accent and a CSS tuner in the hero (spec 7.1). Reviewed by a fresh reviewer,
  fixes applied. Awaiting Sait's verdict on the new look before F2b.
- [ ] **W9 Community feed on the home page** (Sait, 2026-10-12 17:13). Show the hub
  (https://hub.devdio.pro, hub.macdio.app 301s there) on the home page: latest
  release notes or recently resolved issues, dated and linked. Fetched from the
  Discourse JSON API at build time (no client JS); freshness equals the last
  deploy, so F5 adds a scheduled rebuild or the section says "as of <date>".
- Design brief answers (Sait, 2026-10-12 17:13), for the Hallmark pass in F2:
  audience as proposed plus searchers who arrive from Google and buy on the App
  Store from the site; primary action the App Store download, the community hub
  a close second; tone: an indie developer moving toward professional, every
  statement correct, every feature listed (for example the Wi-Fi station editor
  served from the phone to a computer browser, `Macdio/Services/StationEditorServer.swift`).
- [ ] **W10 Direction change** (Sait, 2026-10-12 18:23). The current design stays.
  Keep the live look (dark #050507, SF, `redesign.css`, `parts.js` nav and footer)
  and apply on it: the guide hub (W2), the SEO/GEO work (W6, new pages in the
  current visual language), the new podcast and CarPlay clips and stills (W5,
  revised: added to the existing pages, not a full media swap), the 14 languages
  (W3, W4) and a "what's new" badge (W11). The redesign experiment (home page on a
  dark serif theme) is parked at tag `redesign-experiment-2026-10-12`. Everything
  is shown locally before anything deploys.
  Progress 2026-10-12 19:05, port built (commit 3b30c3d and the follow-up on
  `v2`): every live page lives whole under `src/legacy/<locale>/` (a `git mv`
  from `old-site/`), `src/layouts/Legacy.astro` adds the shell (the live head,
  nav and footer in the markup `parts.js` used to inject, `redesign.css`,
  `parts.js` now bind-only, `redesign.js`), links are made root-relative and
  localized at build (`src/site/legacy.mjs`). 32 of 32 legacy URLs build, 7
  checks green, 41 tests. Checked against macdio.app: title, description, main
  text and markup skeleton identical on all 32 pages except the deliberate
  wording fixes (we/our/us on 8 pages, listed in the agent log); full-page
  screenshots at 1280 and 375 px on 10 pages: 0.00% differing pixels on 7, home
  0.99% (random equalizer bars) and 0.03%, `/tr/` 0.17% (nav now Turkish),
  features and stations under 0.1% at 375. Side by side:
  `~/MacdioBuild/web-port/compare.html`; preview `npm run preview` at
  http://localhost:4321. Not deployed. Next: W2 guide hub on this base.
- [ ] **W11 "New" badge on the logo for a new hub post** (Sait, 2026-10-12 18:23).
  When a new release note appears on the hub, the logo in the nav shows a small
  "New" or "Updated" bubble that opens the post; Sait is open to a more modern,
  more functional form (proposed: a "what's new" dot plus a small popover with
  the last three release notes, fed by a Worker route that caches the hub's
  JSON, remembered per visitor in localStorage).
  Progress 2026-10-12 20:40: built. Worker route `/api/hub` (worker.js
  `hubFeed`) returns the three newest release notes from
  hub.devdio.pro/c/macdio/release-notes/6.json with topic ids, cached by
  Cloudflare for ten minutes and by the browser for five, 502 with an empty
  list when the hub is down. `public/hub-badge.js` (loaded on the marketing
  pages and the guide hub) asks that route, and when the newest post id is
  above `localStorage` key `macdio.hub.seen` it puts a "New" pill on the logo;
  the pill opens a small list of the three posts with dates, opening one or
  "Got it" remembers the id and removes the pill. The browser never contacts
  the hub itself. W9's build-time feed (src/data/hub.json) stays for later
  page use; both read src/site/hub.mjs.
  Revised 2026-10-13 00:10 (Sait, with a screenshot): nobody clicks a pill on
  the logo. Move it to the hero: next to the "3" mark, or as content in the
  empty space to the right of the hero headline.
  Done 2026-10-13 (both forms, chosen by measuring): on the home page of each
  language, a "What's new" card with the three release notes sits in the free
  space beside the headline when at least 260 px fit there (English from 1280
  px; Russian only from about 1900 px, its headline is wider), with the newest
  note marked "New" until it is opened; otherwise a "New" pill sits next to
  the "3" mark and opens the same list under it. Nothing on the logo and no
  badge on other pages or the guides any more. Arabic: card on the left, the
  "Macdio 3" mark kept left to right. Keyboard test: pill opens with Enter,
  focus moves in, Escape returns, "Got it" removes pill and tag, survives a
  reload (Chrome, en/ru/tr/ar at 390 to 1920 px).
- [x] **W12 Mobile overflow on the live stations page** (found 2026-10-12 19:20
  during the port, by a width probe at 375 px). The stations page was 465 px
  wide on a 375 px phone: the country and genre selects take the width of their
  longest option (442 px) and the right part of the control is cut off. Fixed in
  `redesign.css`: `.filter-select { max-width: 100% }`, plus `html { overflow-x:
  clip }` so no element can widen the page sideways again (the home page's
  aurora and equalizer bars reach past the viewport too; the body already hid
  them, the clip on html makes it explicit). Verified headless: scrollWidth 375
  on the new build, 465 on the live site. Ships with the port.
- [x] **W14 Browser navigations to "/" would have been the 404 page** (found
  2026-10-12 20:55 with `wrangler dev`, before any deploy). The v2 hosting
  config had `not_found_handling: "404-page"`; with that setting Cloudflare's
  asset layer answers every browser navigation that misses an asset by itself,
  before the Worker runs (`Sec-Fetch-Mode: navigate` triggers it), so "/",
  "/tr/" and "/guides/" (directory URLs the Worker maps to index.html) came
  back as the 404 page in Chrome while curl, which sends no such header, got
  the real page. The deployed config on `main` has no `not_found_handling`
  (default "none"), which is why the live site works. Fixed: "none" in
  wrangler.jsonc, and the Worker serves `404.html` with status 404 for real
  misses (unit test), and the 404 page is now in the marketing shell
  (`src/pages/404.astro`). Verified with headless Chrome against `wrangler
  dev`: "/", "/tr/", "/guides/" 200 as navigations, "/nope.html" and "/nope/"
  404 with the page. Note for the deploy check: `scripts/check-public.sh`
  must probe with `-H "Sec-Fetch-Mode: navigate"` too, or this class of bug
  stays invisible to curl.
- [x] **W15 Google Analytics cookies and EU consent** (found 2026-10-12 by the
  German sync pass). macdio.app loads GA4 (gtag, G-QR2MZ9NF2N) on every page
  with no consent banner; GA sets `_ga` cookies, which under GDPR and the
  German TTDSG normally need consent first. The live site has worked this way
  all along; the v2 privacy page now says so plainly ("This website" section).
  Sait's call: a consent banner, GA consent mode with cookies off until consent,
  or drop GA and keep Cloudflare Web Analytics (cookieless, already on).
  Correction 2026-10-13: Cloudflare Web Analytics is NOT on the live v2 site.
  The live HTML carries no cloudflareinsights beacon (Cloudflare would inject
  it), so GA is the only analytics; the API token has no Web Analytics
  permission to check the account. The third option therefore means adding
  the Cloudflare beacon, not keeping it.
- [x] **W16 Two support addresses** (found 2026-10-12). Sait chose
  support@devdio.pro everywhere (2026-10-13 14:18); every page in all 14
  languages now uses it (140 files), the app's feedback links follow in 3.0.5
  (app tracker #634). Checked 2026-10-13: support@devdio.pro on
  support.html and in the footer of every page; support@macdio.app on ten
  pages (the five privacy policies, accessibility, community, presskit,
  submit-station, transparency). Both domains have Zoho MX records. support.html and the
  footer use support@devdio.pro; privacy, accessibility, submit-station and
  transparency use support@macdio.app. Both may well work; Sait confirms which
  one the site should name and the other is aligned in every locale.
- [x] **W17 Facts on the site checked against the app** (2026-10-12 evening).
  The translation agents read every English page line by line and flagged
  contradictions; each was checked against the app source, App Store listings
  or the competitor research and fixed in English, then in all 13
  translations: recording keeps the stream's own format (no quality setting,
  #298; the Mac format picker only renames the file, app tracker #571), the
  station's own title always wins over Song ID (#150), Clock Mode and the Apple
  Music favorites sync are not Macdio exclusives (Broadcasts has both),
  requirements iOS 26 / macOS 26 / tvOS 18 / watchOS 11, recordings cannot be
  exported, 175 countries, no app size (82 MB on the App Store, not 7.8) and no
  crash-proof claim, Broadcasts moved to a subscription, privacy and
  transparency pages list Podcast Index, ShazamKit, push.macdio.app and Private
  Cloud Compute, the Mac sandbox has no microphone entitlement. FAQPage JSON-LD
  is now generated from each page's visible FAQ (Google requires them to
  match); `scripts/check-stale-facts.mjs` keeps the corrected numbers from
  coming back in any language. The check found a real app bug on the way:
  AAC recordings lost half their bitrate and their ending when tagged (app
  tracker #570, fixed in code, not yet tested on a device).
- [x] **W18 GA4 counted localhost and preview loads as visits** (found
  2026-10-13 by the keyboard test). Every page, and the /ios/ App Store
  redirect, loaded gtag on any host, so `astro preview`, `wrangler dev` and any
  test run sent page_view hits to the production property G-QR2MZ9NF2N with
  `dl=http://localhost/...`. On Sait's Mac the hits happened to die at the home
  network's DNS (192.168.10.1 answers 0.0.0.0 for analytics.google.com), which
  hid the problem. GA now loads from an inline script only when
  `location.hostname` is `macdio.app`; `scripts/check-scripts.mjs` fails on any
  static gtag tag, guides included. Verified in Chrome: no Google request on
  localhost, gtag.js loads under https://macdio.app (served from the local
  build, collect hits blocked by the test). Independent of the consent question
  in W15.
- [x] **W19 Review fixes before deploy** (2026-10-12/13). From a fresh review of
  the v2 infrastructure: hub feed cached at the edge, nosniff, fixed upstream
  error text; slashless directory URLs 301 to the slashed URL; a miss under a
  locale gets that locale's 404 page; the English "/" varies on
  Accept-Language and Cookie and is not shared-cached; JSON-LD escaped and
  parsed by the build; link check is exact-case; translated markup must keep
  id/rel/target/type and may not add event handlers; `/index.html` links
  rewritten to directory URLs; Starlight UI strings in zh-Hans and zh-Hant;
  footer language picker is a disclosure of plain links (works without script,
  keyboard reachable, stores the choice); the "New" pill sits beside the logo
  link, its list follows it in the page with focus moved in and back on
  Escape, positioned for RTL (an Escape lost to a setTimeout race was found
  and fixed: 3 of 5 runs failed before, 0 of 9 after); closed menus leave the
  tab order; breadcrumb names localized; `npm run deploy` runs tests, build,
  deploy, `check-public.sh` and `scripts/check-worker.mjs` (102 probes) in one
  command.
- [x] **W20 Broken layout on the v2 home page** (Sait, 2026-10-13 00:11, with a
  screenshot). "Everything about podcasts in Macdio" sits at the far left edge
  instead of centered under the podcasts section; Sait expects more breakage
  around it. Root cause of this one: the link reuses `.bento-more`, which has
  no alignment of its own and only looked centered inside sections that set
  `text-align: center`; the podcasts section is a `.feature` section, which
  does not. Every page and width to be checked by screenshot, not only this
  spot. Second spot from Sait (00:12): the FAQ heading "What people ask before
  buying." sits at the left edge above a centered list; the #faq section added
  in v2 has no centering either.
  Fixed 2026-10-13: `.bento-more` and `#faq` centre themselves. A layout check
  (`scripts/check-layout.mjs`, every marketing page of every language in
  Chrome) then found three more classes and all are fixed: comparison tables
  on nine pages (tunein/mytuner/pocket-casts/overcast/snipd alternatives,
  podcasts, features/song-id, features/highlights, compare/apple-podcasts)
  reached 662 px on a 375 px phone and their right columns were cut off (now
  the holder scrolls sideways); transparency.html's data table was 2 to 36 px
  too wide in five languages (cells now wrap long words); translated page
  headings ran into both edges at 1440 px in 16 pages (now capped and
  balanced). The comparison footnote on the home page is capped too. Final
  run: 476 pages, 0 findings. The nav was also measured per language (W21,
  W22).
- [x] **W21 Guides as a top-level nav item** (Sait, 2026-10-13 00:12). Take
  Guides out of the "More" menu and show it in the nav itself (and as a large
  item in the mobile menu).
  Done 2026-10-13. With Guides and the flag the bar needs up to 1146 px in one
  line (Turkish), so the social icons hide below 1180 px (they stay in the
  footer and the mobile menu) and the burger takes over below 1040 px instead
  of 880; links never wrap. Checked in all 14 languages at 1041 to 1366 px.
- [x] **W22 Language picker with a country flag in the nav** (Sait, 2026-10-13
  00:12). A flag in the top bar showing the current language; tapping it lists
  every language with its flag, so a visitor can read the page in the language
  they want. The footer menu stays.
  Done 2026-10-13: `src/components/LangMenu.astro`, one component for the nav
  (flag only), the footer (flag and name) and the guide header (replaces
  Starlight's select, links to the same guide in the chosen language). Flags
  follow the App Store locale of each language: en 🇺🇸, pt-BR 🇧🇷, ar 🇸🇦,
  zh-Hans 🇨🇳, zh-Hant 🇹🇼 (Sait may prefer 🇬🇧 or 🇭🇰). Works without script and
  by keyboard; Escape and an outside click close it; the choice is stored in
  the "lang" cookie the Worker reads at "/". Windows shows flag emoji as two
  letters.
- [x] **W24 Real podcast covers in the CarPlay podcasts clip** (found
  2026-10-13 while checking W20). `media/carplay-podcasts` (used on the home,
  podcasts and CarPlay pages) showed real show artwork, one with a real
  person's photo, while the CarPlay Now Playing clip already used a blurred
  cover. The artwork column and the corner cover are now blurred in the mp4,
  webm and poster (ffmpeg boxblur, two phases around the list scroll at 4.7 s
  so the "Continue Listening" heading stays sharp). Originals stay in
  ~/MacdioBuild/showcase/media/web/. The CarPlay Home, Favorites and Discover
  clips still show real station logos, as the live site's screenshots do.
- [x] **W23 Guides that teach Macdio's own features** (Sait, 2026-10-13 00:16,
  "do not forget this"). The guide hub has 9 articles in three groups (Radio on
  every device, Radio features, Buying and comparing); they stay, but they are
  search articles, not guides. The hub needs real how-to guides for using
  Macdio, written SEO and GEO friendly so they help listeners and bring search
  and AI traffic: Song ID (Shazam) and Auto Song ID; game controllers;
  customization; adding custom stations; editing stations from another
  computer on the local network; podcasts; the AirPods feature; recording;
  Siri phrases; Shortcuts setup; and per-platform guides for Mac, iPhone/iPad
  and Apple TV. Every step must be checked against the app code and string
  catalogs (exact menu and button names per language), then translated into
  all 13 other site languages like the existing guides.
  Progress 2026-10-13 01:00: four research agents read the app code and wrote
  fact sheets (51 app findings logged as app tracker #573-#627); five writers
  wrote 15 English guides from them (19,800 words): Macdio on iPhone and iPad,
  on the Mac, on Apple TV; add your own station; edit stations on a computer;
  favorites, lists and sync; Song ID and Auto Shazam; recording; sleep timer
  and Clock Mode; podcasts; transcripts and Highlights; Shortcuts and
  automations; AirPods and headphones; game controllers; customize Macdio.
  The hub lists them first in five groups; the old three groups stay below.
  Untranslated guides in other locales are Starlight fallbacks, now noindex
  with an English canonical so they never enter the sitemap. Translation
  into 13 languages next.
  The research also found wrong claims on the existing site, fixed in English
  (translations follow with the guides): Apple TV has no highlights
  (features/highlights.html said it shows them); Notion and Readwise tokens
  are kept in the Keychain with iCloud Keychain sync (highlights.html and
  privacy.html said they stay on the device); Apple Watch gets favorites and
  lists from the iPhone, not iCloud (apple-watch.html, features.html,
  radio-on-apple-watch.md); record-internet-radio.md overstated two points.
  Done 2026-10-13 01:40: all 15 guides translated into the 13 other
  languages (one agent per language, quoting each app label in the app's own
  translation per platform, Siri phrases from AppShortcuts), plus two sweep
  rounds for the English corrections made meanwhile (W25). Build: 812 URLs,
  all 10 checks green; 350 guide pages checked at 375 px with no overflow;
  476 marketing pages clean in the layout check; worker probes 102/102.
  Labels the app itself shows in English in every language (browser editor,
  add-station errors, reorder sheets, sync test, alarm actions) are quoted in
  English with a short gloss; those are app bugs #628-#633.
- [x] **W25 Wrong claims on the site, found by the guide research** (2026-10-13).
  Each checked against the app source and corrected in English, then in all
  13 translations:
  - features/highlights.html said Apple TV shows your highlights. There is no
    highlight code in the tvOS app; the FAQ now says highlights are made and
    sent on iPhone, iPad, Mac and Apple Watch.
  - highlights.html and privacy.html said Notion and Readwise tokens stay on
    the device. `Keychain.swift` stores them with `kSecAttrSynchronizable`,
    so iCloud Keychain carries them to the user's other devices; both pages
    now say so.
  - apple-watch.html (support card, gallery, paragraph), features.html,
    iphone.html, mac.html, privacy-watchos.html and the Apple Watch guide said
    the watch syncs through iCloud. The watch store has `cloudKitDatabase:
    .none` and gets favorites, lists, saved songs and history from the
    iPhone (WatchSync); every page now says that. The watch screenshot showing
    an "iCloud Sync" switch was removed: the current watch app has no such
    switch.
  - apple-tv.html promised game controller support with every key remappable,
    shoulder buttons switching tabs and playback on face buttons. The tvOS
    target has no controller code; Apple TV's own controller support moves
    the focus. The page now says exactly that and points to iPhone and iPad
    for remappable buttons.
  - record-internet-radio.md said recordings never appear in Finder (the
    sandbox container is reachable) and did not say recording needs the
    station to keep playing; both reworded.
  - Later in the same pass: support.html said settings sync to Apple Watch
    through iCloud; the home page hero said "sync everything through iCloud"
    (recordings and downloads stay on the device, now "keep your library in
    sync"); the press kit said "effortless iCloud sync across all devices";
    the controller guide's Apple TV answer now matches apple-tv.html. The
    unused watch screenshot file was deleted from public/.
- [x] **W26 Social links go to the Devdio accounts** (Sait, 2026-10-13 02:18).
  x.com/devdiopro, instagram.com/devdiopro, youtube.com/@Devdiopro,
  tiktok.com/@devdiopro replace the old macdioapp handles in the nav, footer,
  mobile menu, guide header, twitter:site and every JSON-LD sameAs (which now
  lists all four plus the hub); link labels say "Devdio on X" and so on in 14
  languages. Same pass before deploy: llms.txt rewritten (3.0.4, 14 languages,
  every new page and guide; it wrongly listed Live Activities and "zero data
  collection"), guide titles kept within 60 characters (78 translated titles
  ran to 75 with the "| Macdio Guides" suffix), scripts/indexnow.sh reads the
  built dist/sitemap.xml (public/ has none any more, so it would have failed).
- [x] **W27 What's new card showed old release notes after the deploy**
  (found 2026-10-13 02:23 by the live check). Two causes, both fixed with a
  test first: (1) the feed dropped every pinned topic to skip the category's
  "About" topic, and the 3.0.4 post (topic 114) was pinned, so it vanished;
  now only the "About the ..." topic is left out. (2) /api/hub sent
  `max-age=600`, which Cloudflare raised to the zone's Browser Cache TTL of 3
  days (259200), so a browser kept an old list for days; it now sends
  `max-age=0, s-maxage=600, must-revalidate` (edge ten minutes, browser asks
  every time), like the static files, which Cloudflare leaves alone. The API
  token has no Cache Purge permission, so a stale edge copy cannot be purged
  by hand; it expires after ten minutes. Sait submitted the sitemap to Google
  and Bing himself (2026-10-13); the service account still has no Search
  Console access (W7).
- [x] **W28 Replace Google Analytics with a free open-source, cookieless
  analytics** (Sait, 2026-10-13 14:18). Researched: Umami (MIT, PostgreSQL
  only, no cookies, ~0.4-1 GB RAM, Docker or Node; free Cloud Hobby plan),
  Plausible CE (AGPL, needs ClickHouse, 2 GB+), Matomo (heavy PHP/MySQL,
  cookies by default), Rybbit (AGPL, ClickHouse). Recommendation: Umami
  self-hosted on Sait's Istanbul server behind a Cloudflare Tunnel (same
  pattern as dir.macdio.app), script and collect endpoint served through
  macdio.app's own Worker so ad blockers do not drop it; one install can count
  macdio.app, livedio.app and devdio.pro. Then run it next to GA for a few
  days, remove GA, and rewrite the privacy pages (14 languages): closes W15.
  Waiting for Sait: where to host (new LXC, the existing macdio-rb CT, or
  Umami Cloud) and the server address for SSH (not in any repo file).
  Done 2026-10-13 15:00: Sait set up Umami Cloud (website id 53f86548...) and
  said remove GA outright. GA is gone from every page, the guides and the
  /ios/ redirect (which now goes straight to the App Store); the Umami tag
  carries data-domains="macdio.app" so previews and tests are not counted;
  check-scripts fails on any Google Analytics trace and on an Umami tag
  without that domain limit. privacy.html ("This website") and the
  transparency table now name Umami (no cookies, no personal data) in all 14
  languages; the transparency page also dropped Cloudflare Web Analytics,
  which was never on the v2 site. No cookie banner is needed: the site sets
  no analytics cookies any more. This closes W15.
- [ ] **W29 Move Umami from Umami Cloud to Sait's own server** (Sait,
  2026-10-13 17:13). Umami self-hosted includes funnels, journeys, retention,
  segments, session replay (v3.1+) and heatmaps (v3.2+) for free; only email
  reports stay Cloud-only. It needs PostgreSQL only (no ClickHouse), so it is
  lighter than Plausible CE or Rybbit. Sait wants to run the community-scripts
  Proxmox helper (`ct/umami.sh`). Read 2026-10-13: it creates an unprivileged
  Debian 13 CT (2 cores, 2 GB, 12 GB), installs Node 22, PostgreSQL 17 and the
  latest Umami release, and runs it as a root systemd service on port 3000 on
  every interface with the default login admin/umami. On this server a CT has
  its public address on eth0 (like CT 101), so port 3000 is open to the
  internet until the firewall is in place. Plan: Sait runs the script
  (advanced settings: static public IP like CT 101, SSH on, the Mac's key) and
  stops the service at once; I then harden the CT the CT 101 way (SSH 2229
  keys only, nftables inbound drop), move Umami to its own user, change the
  admin password, add macdio.app, livedio.app and devdio.pro, connect a
  Cloudflare Tunnel to stats.devdio.pro (no open port), switch the site tag
  and check-scripts to the new address, update the transparency text in 14
  languages, verify one live hit with no cookies, and only then remove the
  site from Umami Cloud (asked first). Session replay and heatmaps stay off
  until the privacy pages are rewritten for them. Waiting for Sait: the CT.
- [ ] **W13 Meta descriptions over 160 characters** (found 2026-10-12 by the
  content check over the legacy pages): `/features.html` 188, `/guides/record-
  internet-radio.html` 177, `/ipad.html` 163, `/privacy.html` 164, `/tr/` 184,
  `/de/` 192. No title is over 60. Warnings in the build today; W6 rewrites every
  title and description against the keyword map, which closes this.
- [ ] **W2 Professional guide section** (Sait, 2026-10-12). Rebuild `/guides/`
  on the model of https://linnote.app/guide/ (structured guide hub with
  navigation, per-topic pages) for SEO and GEO. The 9 existing guides carry over.
- [ ] **W3 Site in every app language** (Sait, 2026-10-12). The app ships 14
  localizations (ar, de, en, es, fr, it, ja, nl, pl, pt-BR, ru, tr, zh-Hans,
  zh-Hant); the site gets the same 14, every page, with hreflang. Today only
  `/tr/` and `/de/` exist, one page each.
- [ ] **W4 Automatic language by visitor** (Sait, 2026-10-12). The visitor lands
  in their own language without choosing. Decided 2026-10-12 15:00 (Sait):
  browser language (Accept-Language), Google's recommended method, not country.
  Crawlers never redirected, a manual switcher on every page, choice kept in a
  cookie.
- [ ] **W5 All site media replaced** (Sait, 2026-10-12). Every screenshot and
  video on macdio.app today is replaced by the showcase clips and stills made
  2026-10-12 (`~/MacdioBuild/showcase/media/web/`, 38 clips, iPhone, iPad, Mac,
  Apple TV, Apple Watch, CarPlay). Old `assets/` media goes.
  Revised 2026-10-12 18:23 (W10): the clips and stills are added to the existing
  pages, not a full swap. Sait, 2026-10-12 19:19, on the ported home page: the
  App Preview galleries (Mac, iPhone, iPad, Apple TV, Watch) show nothing about
  podcasts. Doing now: podcast clips first in every platform gallery, a CarPlay
  tab, the podcast section's stills replaced by the matching clips, the same
  clips on the five platform pages; posters load lazily with the clip.
- [ ] **W6 SEO and GEO built in from the start** (Sait, 2026-10-12). Deep
  keyword and competitor analysis before the structure is fixed: "best radio
  app", "best podcast app", iPhone, Mac, Apple TV terms; competitors TuneIn,
  Radio Garden, myTuner, Broadcasts, Overcast and the rest of the field. Every
  page, guide and language is planned against that map; GSC data for the
  current site is the baseline.
  Progress 2026-10-12 20:10: thirteen pages built from the research page map
  (`/pricing.html`, `/podcasts.html`, `/carplay.html`, `/features/podcast-
  transcripts.html`, `/features/highlights.html`, `/features/song-id.html`,
  `/features/recording.html`, `/features/synced-lyrics.html`, `/pocket-casts-
  alternative.html`, `/mytuner-alternative.html`, `/snipd-alternative.html`,
  `/overcast-alternative.html`, `/compare/apple-podcasts.html`), each with a
  dated direct answer, cards, clips, a comparison table from the competitor
  research, 5 or 6 FAQ, Article + FAQPage + BreadcrumbList JSON-LD and an
  author line. Author lines added to the ten existing marketing pages. False
  claims removed from the live copy (Live Activity and Dynamic Island on
  iphone.html, features.html, presskit.html and the home page; watch
  complications on privacy-watchos.html; Spotlight on Mac; "Loved songs sync
  to Apple Music" as a Macdio exclusive, Broadcasts has it). Nav More menu
  links Podcasts, Pricing and CarPlay; the home page links the new pages from
  the podcast, pricing and compare sections; features.html links the five
  feature pages. Open: Family Sharing on presskit.html (ASC setting, Sait
  confirms), /radio-garden-alternative.html (low priority), the existing
  platform pages' first paragraphs keep their old wording.
- [ ] **W7 Search Console access for the service account is gone** (found
  2026-10-12 15:06). `claude-seo@claude-seo-macdio.iam.gserviceaccount.com`
  (key `~/.config/claude-seo/service_account.json`) gets `sites.list` = empty
  and 403 "User does not have sufficient permission for site
  'sc-domain:macdio.app'"; it read the same property on 2026-09-10. Someone
  removed the user from the property or the property was recreated. Sait adds
  the address back under Search Console > Settings > Users and permissions
  (Restricted is enough). Until then the W6 baseline is the 2026-09-10 reading.
- [ ] **W8 Google Analytics API hosts are DNS-blocked on this network** (found
  2026-10-12 15:08). `analyticsadmin.googleapis.com` and
  `analyticsdata.googleapis.com` resolve to `0.0.0.0` (A) and to a Cloudflare
  block-page address (AAAA) from the LAN resolver 192.168.10.1, also when asking
  1.1.1.1 directly, so the router intercepts DNS. `www.googleapis.com` and
  `searchconsole.googleapis.com` resolve normally. The GA4 MCP server fails with
  "No route to host"; it worked on 2026-09-10. Fix is in the network's DNS filter
  (Sait): allow the two hosts. Not a code problem.

## 2026-09-14

- [x] **Both custom domains are declared in `wrangler.jsonc` now.** `macdio.app`
  and `www.macdio.app` were attached in the dashboard and named nowhere in the
  repo, so `wrangler deploy` reported "No targets deployed for macdio-web" and
  the routing existed only in a web UI. `www.macdio.app` was never probed during
  the leak audit either; it 301s to the apex and every private path is 404
  through it. `check-public.sh` checks it now instead of assuming it.
- [x] **Workers Logs enabled** (`"observability": { "enabled": true }`), with a
  correction to what that buys. Static assets are served before the Worker runs,
  so `worker.js` is only invoked on a miss. A successful fetch of
  `/CLAUDE.local.md` was an asset hit and would not have been logged even with
  observability on. What the logs do show is misses, which is the shape of a
  scanner walking `/.env`, `/.git/config` and `/CLAUDE.md`. Logging asset hits
  would need `assets.run_worker_first`, which bills an invocation on every
  request. Prevention stays `scripts/check-public.sh`.
- [n/a] **Observability on livedio-web.** It is an assets-only Worker with no
  `main` and no script, so no Worker code runs on any request and there would be
  nothing to log. Zone analytics in the Cloudflare dashboard is the only request
  visibility either site has for asset hits.

- [x] **The workers.dev subdomain was a second public copy of the site.**
  `macdio-web.sfn-test.workers.dev` answered 200, and so did a preview URL for
  each of the ten retained versions: eleven hostnames serving pages whose
  canonical points at macdio.app. `"workers_dev": false` in `wrangler.jsonc`
  turned both off, and `scripts/check-public.sh` now fails if the subdomain
  comes back. `livedio-web.sfn-test.workers.dev` already 404s.
- [x] **Checked whether the leaked files were picked up elsewhere.** No Wayback
  captures of `/CLAUDE.local.md`, `/.serena/*` or `/docs/*` (CDX filter query
  returned nothing while a control query for `macdio.app/` returned a 2026-09-10
  capture). Nothing in search results for those paths or for the workers.dev
  hostname.
- [ ] **Re-run the Wayback check once archive.org is back up.** The domain-wide
  CDX listing hit an "Internet Archive services are temporarily offline" page on
  2026-09-14, so only the filtered query was answered. The evidence points to
  no capture, but one query is not a clean confirmation.

- [x] **Homepage meta description should carry the "mac radio" variant.**
  Requested by Sait. `index.html` now opens with "Mac radio app with 55,000+
  stations" across the description, og:description and twitter:description,
  160 characters, with every platform and all three features kept.
- [x] **`/CLAUDE.local.md` was publicly served on macdio.app** and answered 200
  with local filesystem paths and internal workflow notes. So did
  `/docs/superpowers/specs/2026-05-16-macdio-web-redesign-design.md`. Cause:
  `wrangler.jsonc` publishes the whole repo (`"directory": "."`) and
  `.assetsignore` did not cover them. `CLAUDE.md`, `CLAUDE.local.md` and `docs`
  added to `.assetsignore`. No credentials were in either file.
- [x] **`/.serena/project.yml`, `/.serena/project.local.yml` and
  `/scripts/indexnow.sh` were also public**, found in the same audit. The
  Serena files are tool config with no secrets; indexnow.sh carries the
  IndexNow key, which the protocol publishes at `/80c0...txt` anyway, so
  nothing secret leaked. `.serena` and `scripts` added to `.assetsignore`.
- [x] **`scripts/check-public.sh` added.** Probes 12 private paths for 404 and
  7 public ones for 200, and exits non-zero on either failure. Run it after
  every deploy.
- [x] **Root cause fixed: the web root is `./public` now.** `wrangler.jsonc`
  had `"directory": "."`, so every new file was public until someone
  remembered `.assetsignore`, and three separate leaks came from it. The 47
  top-level site entries (144 files) moved under `public/` with `git mv`;
  `worker.js`, `wrangler.jsonc`, `CNAME`, `scripts/`, `docs/`, `.serena/` and
  `CLAUDE.local.md` stay outside it and can no longer be served at all.
  `.assetsignore` shrank to the junk that can still land inside `public/`, and
  `scripts/indexnow.sh` now reads `public/sitemap.xml`. URLs are unchanged: the
  assets directory is the URL root either way.
- [ ] **Meta descriptions on `de/index.html` and `tr/index.html` were not
  touched.** If the "mac radio" variant matters in those markets, they need
  their own wording rather than a translation of this one.
