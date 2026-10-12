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
- [ ] **W15 Google Analytics cookies and EU consent** (found 2026-10-12 by the
  German sync pass). macdio.app loads GA4 (gtag, G-QR2MZ9NF2N) on every page
  with no consent banner; GA sets `_ga` cookies, which under GDPR and the
  German TTDSG normally need consent first. The live site has worked this way
  all along; the v2 privacy page now says so plainly ("This website" section).
  Sait's call: a consent banner, GA consent mode with cookies off until consent,
  or drop GA and keep Cloudflare Web Analytics (cookieless, already on).
- [ ] **W16 Two support addresses** (found 2026-10-12). support.html and the
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
