# macdio.app v2: design spec

Date: 2026-10-12. Author: Sait Firat NEMIS (decisions) with the coding agent (text).
Tracker items: W1 to W6 in `docs/feature-requests.md`. Research inputs:
`docs/research/2026-10-12-keywords-and-serps.md`, `docs/research/2026-10-12-competitors.md`.
Status: approved by Sait on 2026-10-12 15:29 ("devam et durma"), with the rule that every
result is shown locally before anything deploys.

## 1. Goal

Replace macdio.app completely: a more modern, simpler, more functional site that

- shows every Macdio feature with the showcase clips and stills recorded on 2026-10-12,
- ships in the 14 languages the app ships in, with correct hreflang and automatic language
  by browser preference,
- carries a documentation-style guide hub (model: https://linnote.app/guide/),
- is planned page by page against the keyword and competitor research, for both classic
  search (SEO) and answer engines (GEO),
- keeps every existing URL and the current Lighthouse scores (29 pages at 100/100/100 for
  accessibility, SEO and best practices on 2026-09-10).

Success criteria, checked before Sait says "tamam":

1. Every page exists in 14 languages, every page carries 14 `hreflang` alternates plus
   `x-default`, and the sitemap lists the same alternates.
2. All 32 URLs in today's sitemap answer 200 with the same meaning as before.
3. Lighthouse: accessibility, SEO and best practices 100 on every template; mobile
   performance 95 or better on every template.
4. A visitor with a Turkish browser who opens `https://macdio.app/` lands on `/tr/`; a
   crawler never gets redirected; a visitor who picked a language keeps it.
5. No invented fact on any page: every feature claim, number and price traces to the app
   source, a dated count or a quoted competitor page.
6. Sait has seen each phase result locally and approved it.

## 2. Decisions already made

| Date | Decision | By |
| -- | -- | -- |
| 2026-10-12 | Full replacement of the current site, nothing kept except URLs and SEO plumbing | Sait |
| 2026-10-12 | Design through the Hallmark skill, not a component marketplace | Sait, on the agent's recommendation |
| 2026-10-12 | All media replaced by the 2026-10-12 showcase clips and stills; old `assets/` media removed | Sait |
| 2026-10-12 | 14 languages, the app's set: ar, de, en, es, fr, it, ja, nl, pl, pt-BR, ru, tr, zh-Hans, zh-Hant | Sait |
| 2026-10-12 | Language detection by `Accept-Language`, not by country | Sait |
| 2026-10-12 | Light and dark theme by system preference with a manual toggle; indigo brand colour kept | Sait, option 2 |
| 2026-10-12 | Stack: Astro 7 + Starlight, static output, served by the existing Cloudflare Worker | Sait, option 1, after a spike |
| 2026-10-12 | Everything is tested locally; deploy only on Sait's "tamam" | Sait |

## 3. Architecture

### 3.1 Stack

- Astro 7.3 (`build.format: 'preserve'`, so `features.astro` becomes `/features.html` and
  `tr/index.astro` becomes `/tr/index.html`; verified in the spike on 2026-10-12).
- Starlight 0.42 for the guide hub: sidebar, Pagefind search per language, previous/next,
  table of contents, locale fallback, RTL. Starlight owns Astro's `i18n` config (the two
  cannot both be set; verified).
- No client framework. Marketing pages ship no JavaScript except two small inline scripts
  (language and theme switcher, lazy video loader) and the existing GA4 tag. Guide pages carry
  Starlight's search and table of contents scripts (about 94 KB JS, 64 KB CSS, measured).
- Expressive Code disabled (no code blocks on this site; saves 18 KB CSS).
- Node 26 is installed; `npm run build` is the only build command. Only the agent runs it.

### 3.2 Repository layout (macdio-web)

```
astro.config.mjs
package.json
src/
  layouts/        Base.astro (head, hreflang, JSON-LD, nav, footer, switchers)
  components/     one file per section archetype the design produces
  pages/          English marketing pages at the root: index, features, iphone, ...
  pages/[lang]/   the same pages for the 13 other languages via getStaticPaths
  i18n/           en.json first, then <lang>.json; same keys, one object per page
  content/docs/   Starlight guides: guides/<slug>.md (en), <lang>/guides/<slug>.md
  data/           counts.json (dated station and podcast counts), pricing.json, claims.md
  styles/         tokens.css (Hallmark tokens), site.css, starlight.css (overrides)
public/           static passthrough: favicons, media/, robots.txt, llms*.txt, _headers
scripts/          sitemap.mjs, check-hreflang.mjs, check-links.mjs, check-public.sh,
                  media-encode.sh, i18n-check.mjs, counts.sh
worker.js         language redirect at / and directory index rewrite
wrangler.jsonc    assets.directory = ./dist, not_found_handling = 404-page
dist/             build output, gitignored, the only thing Cloudflare serves
docs/             private: tracker, research, specs, plans (never served)
```

Work happens on a branch `v2` in macdio-web, pushed after every commit. `main` stays
deployable throughout. Merge to `main` and deploy only on Sait's "tamam".

### 3.3 URL scheme

- English at the root, other languages under a lowercase prefix: `/tr/`, `/de/`, `/fr/`,
  `/es/`, `/it/`, `/ja/`, `/nl/`, `/pl/`, `/pt-br/`, `/ru/`, `/ar/`, `/zh-hans/`,
  `/zh-hant/`. The `lang` attribute carries the proper case (`pt-BR`, `zh-Hans`).
- Every one of today's 32 URLs stays: `/`, `/features.html`, `/iphone.html`, `/ipad.html`,
  `/mac.html`, `/apple-tv.html`, `/apple-watch.html`, `/tunein-alternative.html`,
  `/stations.html`, `/submit-station.html`, `/support.html`, `/privacy*.html`,
  `/transparency.html`, `/accessibility.html`, `/community.html`, `/presskit.html`,
  `/guides/` and the 9 guide pages, `/tr/`, `/de/`, `/ios/`. No redirects are needed.
- New marketing pages: `/podcasts.html`, `/pricing.html`, `/carplay.html`,
  `/features/podcast-transcripts.html`, `/features/highlights.html`,
  `/features/song-id.html`, `/features/recording.html`, `/features/synced-lyrics.html`,
  `/mytuner-alternative.html`, `/pocket-casts-alternative.html`,
  `/overcast-alternative.html`, `/snipd-alternative.html`, `/compare/apple-podcasts.html`.
  Not built: a "Broadcasts alternative" page (ambiguous query) and a Radio Garden page
  (low value); both stay inside the comparison guide.
- Guides keep flat URLs `/guides/<slug>.html`; sidebar groups come from config, not from
  directories, so regrouping never moves a URL.

### 3.4 Worker

Cloudflare runs the Worker only when no asset matches, so it sees `/`, `/<lang>/` and
every directory URL, never a deep `.html` link (which is wanted: a shared link stays in the
language it was shared in).

```
GET /            no "lang" cookie, UA not a known crawler, Accept-Language best match
                 among the 14 is not en  ->  302 to /<lang>/ with Vary: Accept-Language
GET /            otherwise               ->  serve /index.html
GET /<dir>/      always                  ->  serve /<dir>/index.html
```

Best match: parse `Accept-Language` by q value, map `pt-*` to `pt-br`, `zh-TW`/`zh-HK`/
`zh-Hant` to `zh-hant`, other `zh-*` to `zh-hans`, otherwise the two-letter primary tag.
Crawler list: Googlebot, bingbot, Applebot, DuckDuckBot, YandexBot, Baiduspider, GPTBot,
ClaudeBot, PerplexityBot, facebookexternalhit, Twitterbot; matched on User-Agent. The
switcher sets `lang=<code>; Max-Age=31536000; Path=/; SameSite=Lax` and links to the same
page in the other language. Nothing is stored server side; the transparency page says so.

### 3.5 Build and deploy

`npm run build` runs Astro, then `scripts/sitemap.mjs` (own sitemap with hreflang; the
Astro sitemap integration drops `.html` and mislabels locale roots, verified), then
`scripts/check-hreflang.mjs`, `scripts/check-links.mjs` and `scripts/i18n-check.mjs`; any
failure fails the build. Deploy is `npx wrangler deploy` from `dist/`, followed by
`scripts/check-public.sh` (private paths 404, public paths 200, `/tr/` and `/ar/` 200,
`workers.dev` still off). Rollback is `npx wrangler rollback`.

## 4. Languages

- 14 locales, English as default and `x-default`.
- Head of every page: `<link rel="alternate" hreflang="...">` for all 14 plus `x-default`,
  `<link rel="canonical">` to the page's own URL, `<html lang dir>`. Starlight emits these
  for guides; `Base.astro` emits them for marketing pages; `check-hreflang.mjs` proves both
  sets match the sitemap.
- Arabic: `dir="rtl"`; all CSS uses logical properties (`margin-inline`, `inset-inline`,
  `text-align: start`). Starlight handles RTL itself.
- CJK and Arabic fonts: system stacks (`-apple-system, system-ui, "Segoe UI", ...`), no web
  fonts; line-height and letter-spacing tokens get per-script overrides where the Hallmark
  pass shows a need (ja and zh headings).
- Untranslated guide: Starlight shows the English text with a "not yet translated" notice
  in the visitor's language; the page still carries correct hreflang. Marketing pages are
  never published untranslated: a language ships only when every marketing key is present
  (`i18n-check.mjs` enforces this per language).
- Localisation, not translation, for titles, descriptions and H1s: the per-locale term
  table in the keyword research is the starting glossary ("Internetradio App",
  "radyo uygulaması", "ラジオアプリ", "aplicativo de rádio", ...). The word "podcast" stays
  as is in every locale; "transcript" is translated everywhere.

## 5. Page map (marketing)

Templates: `home`, `platform` (iPhone, iPad, Mac, Apple TV, Apple Watch, CarPlay),
`feature` (five feature pages), `compare` (alternative and vs pages, with table and FAQ),
`pricing`, `podcasts`, `plain` (support, privacy, transparency, accessibility, community,
press kit, submit station), `stations` (keeps the live Radio Browser search with the
dir.macdio.app fallback and the existing escaping).

| Page | Target query | Template | Status |
| -- | -- | -- | -- |
| `/` | Macdio, radio and podcast app for iPhone, Mac, Apple TV | home | rebuild |
| `/iphone.html`, `/ipad.html`, `/mac.html`, `/apple-tv.html`, `/apple-watch.html` | radio app <platform>, podcast app <platform> | platform | rebuild |
| `/carplay.html` | carplay radio app, carplay podcast app | platform | new |
| `/podcasts.html` | podcast app no subscription, podcast app with transcripts | podcasts | new |
| `/pricing.html` | one time purchase podcast app, radio app no subscription | pricing | new |
| `/features.html` | Macdio features | feature index | rebuild |
| `/features/podcast-transcripts.html` | podcast app with transcripts, on-device transcription | feature | new |
| `/features/highlights.html` | podcast highlights app, highlights to Obsidian, Readwise, Notion, Apple Notes | feature | new |
| `/features/song-id.html` | identify song on radio without microphone | feature | new |
| `/features/recording.html` | record internet radio mac iphone, split tracks | feature | new |
| `/features/synced-lyrics.html` | synced lyrics radio | feature | new |
| `/tunein-alternative.html` | tunein alternative | compare | rebuild, add author line |
| `/mytuner-alternative.html`, `/pocket-casts-alternative.html`, `/overcast-alternative.html`, `/snipd-alternative.html` | <name> alternative | compare | new |
| `/compare/apple-podcasts.html` | Macdio vs Apple Podcasts transcripts | compare | new |
| `/stations.html` | internet radio stations | stations | rebuild |
| `/support.html`, `/privacy*.html`, `/transparency.html`, `/accessibility.html`, `/community.html`, `/presskit.html`, `/submit-station.html` | brand | plain | rebuild |
| `/guides/` | hub | Starlight | rebuild |
| `/ios/` | App Store redirect page | plain | keep as is |

Home page content order is decided by the Hallmark pass, with these fixed facts in the H1
area: the device list (iPhone, iPad, Mac, Apple TV, Apple Watch, CarPlay), "one purchase,
no subscription" and the dated station and podcast counts. Title under 60 characters with
the brand in it.

Every page in the `compare` and `platform` templates carries, in this order: H1, a direct
answer paragraph of 40 to 70 words with the check date, the body sections, a fact table
with one source link per competitor row, an FAQ block of 4 to 6 questions in the wording
seen on page one, and the author line.

## 6. Guide hub

Starlight at `/guides/`, five sidebar groups and 30 topics from the keyword research
(section 4 there): Getting started (3), Radio on every device (8), Radio features (7),
Podcasts (9), Buying and comparing (3). Nine existing guides keep their slugs. New topics
are written only after the claims register (section 8) confirms the feature; a topic whose
feature the app does not have is dropped, not softened.

Starlight configuration: `title` "Macdio Guides", `defaultLocale: 'root'` (en), 13 locales
with labels in their own language, `dir: 'rtl'` for ar, sidebar from config, Pagefind on,
`lastUpdated` from git, `editLink` off, `credits` off, `expressiveCode: false`, social links
to the community hub. Head additions per page: TechArticle JSON-LD with author, dates and
`inLanguage`; BreadcrumbList. Theme: `starlight.css` maps Starlight's custom properties
(`--sl-color-accent`, `--sl-color-bg`, text and border colours, font stack, radii) to the
site tokens so a guide page and a marketing page look like one site. The guide index page
is a Starlight page with the group list and the search box, not a marketing splash.

## 7. Design system and the Hallmark pass

Order of work:

1. `hallmark audit https://macdio.app`: a scored punch list of the live site. Read only.
   Saved to `docs/research/2026-10-12-hallmark-audit.md`.
2. `hallmark redesign` on the new Astro pages, home first, then the platform template, the
   feature template, the compare template, pricing, podcasts, plain. One template approved
   in the local preview before the next starts.

Fixed constraints for the pass:

- Light and dark themes by `prefers-color-scheme`, manual toggle in the nav, the choice in
  `localStorage` under the key Starlight uses (`starlight-theme`) so both halves agree.
- Brand accent indigo (the current gradient family), dark background in the #050507 family,
  light background chosen in the pass. All colours and fonts as tokens in `tokens.css`; no
  inline colour or font anywhere (Hallmark discipline 3).
- System font stack, no web fonts.
- Showcase clips and stills in `<figure>` with at most a hairline border; no drawn phone or
  browser chrome (discipline 4). Before any capture is placed, the candidates are tiled
  into one contact sheet and audited for system chrome, dialogs, cursors and empty regions
  (observation 0003); rejected captures are re-cut, not cropped by eye.
- No invented metric, testimonial, logo wall or "trusted by" line (discipline 2). Store
  review quotes appear only verbatim with a date and the store they were read in.
- No italic headings (discipline 6). Structural variety across templates (the site must
  not be one hero plus three cards repeated).
- Mobile: verified at 320, 375, 414, 768 and 1280 px, no horizontal scroll, no two-line
  buttons or nav links, `overflow-wrap: anywhere` on display headings (discipline 5), and
  the fixed-element centring rule from observation 0001 (`inset-inline: 0; margin-inline:
  auto; width: fit-content`, never `left: 50%` with a translate).
- Motion: CSS only, `prefers-reduced-motion` respected; the current `.reveal` fade is not
  reused above the fold (it cost about 900 ms of LCP in September).

### 7.1 Revision, 2026-10-12 18:15 (Sait, after seeing the first home page)

Sait pointed at the Hallmark showcase's "Static Hour" page (dark, serif, one italic
accent phrase, a hand-built animated object, a player bar) as what he imagined. The
design system changed accordingly, the structure did not:

- Dark paper is the default (`oklch(11% 0.012 277)`, indigo-tinted); the light paper is
  the toggle's alternative, not the system preference.
- Display face: Instrument Serif (OFL, self-hosted, latin and latin-ext subsets from the
  fontsource package; other scripts fall back to the system serif). Body stays the
  system sans; mono for meta lines. Headings carry one italic phrase in the accent
  colour (Hallmark gate 38a open by Sait's call).
- Accent: warm brass `oklch(80% 0.16 72)` on dark, `oklch(56% 0.16 58)` on light; the
  brand indigo stays as the second accent (tuner bars, blooms) and in the captures.
- Hero enrichment: a CSS radio tuner (Tier A, `src/components/Tuner.astro`): frequency
  scale, drifting needle, LIVE lamp, the fictional station of the captures; still under
  reduced motion. No gradient text, no blobs, no drawn device chrome.
- Buttons are pills; nav links are small uppercase mono; the sticky tour bar reads as a
  player bar.

## 8. Content rules

- Honest copy against the code (observation 0004): `src/data/claims.md` lists every
  concrete capability, platform, format, limit and price the site states, each with the
  file or screen in the app repo that implements it and the date checked. A sentence that
  has no claims entry does not ship. Known traps to check first: what the app imports
  from other apps (OPML or nothing), whether Clock Mode has an alarm, Watch standalone
  playback, which note apps Highlights reach (Apple Notes, Notion, Obsidian, Bear, Craft,
  Readwise per commit 5f91b0a), transcript languages, Apple TV Top Shelf.
- Counts: `scripts/counts.sh` writes `src/data/counts.json` with the station count from
  the directory and the podcast count from Podcast Index, plus the date; pages say "as of
  <date>" and never a round number without a date.
- Competitor facts come only from `docs/research/2026-10-12-competitors.md` quotes, each
  with its source URL and fetch date; "NOT STATED" rows say "not stated on their page".
  Broadcasts, Eter and Triode do have Shazam; the Macdio difference is stated as "from the
  stream, no microphone", never as "only Macdio has song identification".
- GEO rules on every marketing page: direct answer paragraph first; facts in tables; FAQ
  in page-one wording; author line "Written by Sait Firat NEMIS, developer of Macdio.
  Checked on <date>." with Person, Article or TechArticle, FAQPage, BreadcrumbList and,
  on home, platform and pricing pages, SoftwareApplication JSON-LD with `offers` from
  `pricing.json`; competitors named in body text; one stated limit per comparison page
  (no Android, no web player).
- Writing rules: no em dash, no `---`, no "we/our/us" (one developer), humanizer skill on
  the English source before translation. `<title>` keeps the brand separator Sait chose.
- Carry over and keep true: the transparency page lists every third party the site talks
  to (GA4, Cloudflare beacon, Radio Browser, dir.macdio.app, station logo hosts) and the
  language cookie; privacy pages keep their dates.

## 9. Media

- Source: `~/MacdioBuild/showcase/media/web/` (38 clips, mp4 + webm + poster png, 159 MB).
- `scripts/media-encode.sh` writes web sizes into `public/media/<scene>.{mp4,webm,png}`:
  iPhone and Watch clips scaled to 600 px wide, iPad and Mac to 1200 px, Apple TV and
  CarPlay to 1280 px; H.264 crf 23 and VP9 crf 34, 30 fps, no audio, poster from the last
  frame at the same size. Target under 2 MB per mp4; the script prints every file over it.
- Markup: `<video muted loop playsinline preload="none" poster>` with webm then mp4
  sources. A 15-line inline script (the only other script on marketing pages) attaches the
  sources and calls `play()` when the figure comes within one viewport of the screen, and
  pauses it when it leaves, so a page never downloads a clip the visitor does not reach.
  With `prefers-reduced-motion` the script does nothing and the poster stays. Each figure
  has a caption that says what the clip shows.
- The CarPlay clips come from the App Store build with real station logos and one real
  album cover; the site uses `carplay-nowplaying-blurred`, never the unblurred cover
  (reference_appstore_screenshot_ip).
- Old `public/assets/` media is deleted in F2 after the new media is in place, in one
  commit that lists what went.

## 10. Translation pipeline

1. English source is final (humanizer run, claims register complete) before any
   translation starts.
2. One translation agent per language, in batches of pages, with: the glossary (product
   names unchanged: Macdio, Song ID, Highlights, Clock Mode, Up Next, Top Shelf; "podcast"
   unchanged), the locale term table, the rule set (no em dash, no "we", title 60 and
   description 160 character limits, keep HTML and Markdown structure and link targets),
   and the instruction to localise titles and H1s for the local search phrasing.
3. `scripts/i18n-check.mjs`: every `<lang>.json` has exactly the keys of `en.json`,
   placeholders match, no em dash, titles and descriptions within limits, every link target
   exists in `dist/`; guides: same frontmatter keys, same heading count as the source.
4. Order: en, then tr and de (existing pages and audiences), then fr, es, it, ja, pt-BR,
   then nl, pl, ru, ar, zh-Hans, zh-Hant. A language goes live only complete for marketing
   pages; guides may lag with the Starlight fallback notice.
5. Volume: about 25,000 English words today; the new site is planned at a similar size, so
   about 300,000 translated words in total. Translation is machine written with the
   rules above and spot checked by Sait for tr; no translation is called "reviewed" unless
   a person read it.

## 11. Testing and verification

Local, before Sait looks:

- `npm run build` green including the three check scripts.
- `npx wrangler dev` plus curl with 14 `Accept-Language` values, a crawler UA and a `lang`
  cookie: expected codes and `Location` headers recorded in the plan.
- Playwright screenshots at 320, 375, 414, 768 and 1280 px for every template, light and
  dark, en, ar and ja; stored under the scratchpad, not the repo. Horizontal scroll check by
  measuring `document.documentElement.scrollWidth`; `white-space: nowrap` elements checked
  by `scrollWidth` versus box width (observation 0001).
- Lighthouse (headless Chrome) on every template, mobile and desktop.
- Vision check of the contact sheet of media before placement.

Sait's review gates: end of F2 (English marketing pages, local preview at
`http://127.0.0.1:4321/`), end of F3 (guide hub), end of F4 (tr spot check), end of F5
(full site). Deploy only after the F5 "tamam".

## 12. Launch and rollback

1. Merge `v2` into `main`, push.
2. `npx wrangler deploy`; `scripts/check-public.sh`; open `https://macdio.app/` with a
   Turkish and an English browser profile.
3. Search Console: submit `sitemap.xml`, request indexing for `/podcasts.html`,
   `/pricing.html` and the guide index; IndexNow ping for new URLs.
4. Watch for 48 hours: Cloudflare analytics for 404s, Search Console coverage.
5. Rollback: `npx wrangler rollback` to the previous version; `main` before the merge is
   tagged `v1-last` so the old tree is one checkout away.

## 13. Phases

| Phase | Output | Sait sees |
| -- | -- | -- |
| F1 Foundation | Astro project on branch `v2`, Base layout with hreflang and JSON-LD plumbing, i18n loader, Worker redirect, media encode script, sitemap and check scripts, wrangler config, counts and claims files, Hallmark audit of the live site | nothing yet (plumbing) |
| F2 English marketing | Hallmark redesign: home, platform, feature, compare, pricing, podcasts, plain, stations templates and all 33 English marketing pages with new media; old media removed | local preview, gate 1 |
| F3 Guide hub | Starlight at `/guides/`, 9 guides migrated, 21 written, theme matched | local preview, gate 2 |
| F4 Translations | 13 languages for marketing pages and guides, switcher, RTL check | local preview, tr spot check, gate 3 |
| F5 Launch readiness | Lighthouse, link and hreflang checks, Worker tests, check-public, transparency and privacy text, llms.txt per language | full local review, gate 4, then "tamam" |

Each phase gets its own implementation plan under `docs/superpowers/plans/`.

## 14. Risks and open items

- W7: Search Console access for the service account is gone (403 on 2026-10-12). The
  keyword research has no volumes; the 2026-09-10 reading is the baseline. Sait re-adds
  the service account to the property.
- W8: `analyticsadmin.googleapis.com` and `analyticsdata.googleapis.com` are blocked by the
  LAN DNS filter; GA4 cannot be read until Sait allows the hosts.
- Translation volume and quality: 300,000 machine-translated words. Mitigation: full
  content per page (no thin stubs), localised titles, Sait's tr spot check, and a language
  can be held back without blocking the others.
- Starlight look versus the marketing design: mitigated by mapping its tokens; if the gap
  stays visible at gate 2, the fallback is a custom guide layout (approach 2) for the
  guide index only, keeping Starlight for article pages.
- Media weight: 38 clips at web size; the home page may carry at most 4 autoplaying clips,
  other pages at most 2 above the fold.
- Page one for "best radio app" queries is dated listicles with authors; the site can
  match the format but ranking is not promised and nothing on the site claims a rank.

## 15. Out of scope

- Android or web player pages (the app does not exist there; the site says so).
- A blog. Guides cover how-to content; release notes stay on the community hub.
- Account, newsletter or any server-side feature. The Worker stays stateless.
- Changing the app, the App Store listing or the pricing.
