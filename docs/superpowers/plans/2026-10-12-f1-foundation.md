# F1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Astro + Starlight project for macdio.app v2 on branch `v2` with the i18n plumbing, the language Worker, the sitemap and check scripts, the media encode pipeline and the deploy config, so F2 to F5 only add content and design.

**Architecture:** Static Astro 7 site (`build.format: 'preserve'`) with Starlight under `/guides/`, English at the root and 13 locales under lowercase prefixes generated from one set of route files and one strings file per language. A stateless Cloudflare Worker redirects `/` by `Accept-Language` and serves directory indexes. Node scripts generate the sitemap with hreflang and fail the build on hreflang, link or i18n drift.

**Tech Stack:** Node 26, Astro 7.3, @astrojs/starlight 0.42, Pagefind (via Starlight), Cloudflare Workers Static Assets (wrangler), ffmpeg, node:test.

**Spec:** `docs/superpowers/specs/2026-10-12-macdio-web-v2-design.md`

## Global Constraints

- Work on branch `v2` of `macdio-web`; every commit is pushed by the post-commit hook; `main` stays deployable; nothing deploys in F1.
- Astro `^7.3.8`, Starlight `^0.42.6`, Node 26 (`node -v` prints v26.x). No other runtime dependency.
- `build.format: 'preserve'`: `src/pages/features.astro` must produce `dist/features.html`, `src/pages/[lang]/index.astro` must produce `dist/tr/index.html`.
- Locales, exactly these 14 URL codes: `en` (root), `tr`, `de`, `fr`, `es`, `it`, `ja`, `nl`, `pl`, `pt-br`, `ru`, `ar`, `zh-hans`, `zh-hant`. `lang` attributes: `pt-BR`, `zh-Hans`, `zh-Hant`, others equal the code.
- A locale appears in routes, hreflang, the sitemap and the switcher only when it is live (`live: true` in `src/site/locales.mjs`, or `LIVE_ALL=1` for tests). Only `en` is live in F1.
- Every one of today's 32 URLs must exist in `dist/` after the build (list in spec section 3.3).
- Text rules in every file a person reads: no em dash, no `---` divider, no "we", "our", "us" for the developer. Code comments are plain English.
- Design tokens only (`src/styles/tokens.css`); no web fonts; no inline colours in components.
- `public/media/` never contains `carplay-nowplaying.*` (unblurred copyrighted cover); the blurred variant ships.
- `docs/`, `old-site/`, `src/`, `scripts/`, config files are never served: `wrangler.jsonc` points at `./dist` only.
- Commit messages: plain English, no AI references, no trailers.

## Review Focus

1. `Accept-Language` of `*`, empty, or malformed (`;q=abc`) at `/`: serve English, never throw. Test in Task 5.
2. Googlebot (or any listed crawler) at `/` with `Accept-Language: tr`: 200 English, no redirect. Test in Task 5.
3. Cookie `lang=xx` with an unsupported code: ignored, header decides. Cookie `lang=de` with `Accept-Language: tr`: redirect to `/de/`. Tests in Task 5.
4. A live locale missing one key that `en.json` has: the build fails with the key name, never ships English under a `tr` URL. Test in Task 7.
5. `/ios/index.html` (noindex redirect stub) and `404.html` must not appear in the sitemap; the `/` entry must be `https://macdio.app/`, not `/index.html`. Tests in Task 6.

### Task 1: Branch, Astro skeleton, old site set aside

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/content.config.ts`, `src/content/docs/guides/index.md`, `src/site/locales.mjs`, `src/pages/index.astro` (temporary, replaced in Task 4)
- Modify: `.gitignore`
- Move: `public/` (the current web root) to `old-site/`; static assets back into a new `public/`

**Interfaces:**
- Produces: `src/site/locales.mjs` exporting `LOCALES`, `DEFAULT`, `liveLocales()`, `byCode(code)`; every later task imports these.

- [ ] **Step 1: Branch and move the old site**

```bash
cd /Users/xfn/Developments/Dev/shortwave/macdio-web
git checkout -b v2
git mv public old-site
mkdir -p public/ios
git mv old-site/favicon.svg old-site/favicon-16.png old-site/favicon-32.png old-site/favicon-48.png \
  old-site/apple-touch-icon-180.png old-site/icon-192.png old-site/icon-512.png old-site/maskable-512.png \
  old-site/site.webmanifest old-site/robots.txt old-site/llms.txt old-site/80c004ef1f5a429ab1d919978a666da5.txt \
  old-site/_headers old-site/_redirects old-site/macdio_PressKit.pdf old-site/download_button.svg \
  old-site/download_button_light.svg old-site/pricing.json public/
git mv old-site/ios/index.html public/ios/index.html
ls public old-site | head -60
```

Expected: `public/` holds 19 static files plus `ios/index.html`; `old-site/` holds every HTML page, `assets/`, `redesign.css`, `redesign.js`, `parts.js`, `guides/`, `de/`, `tr/`, `sitemap.xml`.

- [ ] **Step 2: Write `.gitignore`**

```gitignore
# macOS
.DS_Store
**/.DS_Store

# Local agent notes, never committed and never deployed
CLAUDE.local.md

# Build output and dependencies
node_modules/
dist/
.astro/
.wrangler/
```

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "macdio-web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && node scripts/sitemap.mjs && node scripts/check-hreflang.mjs && node scripts/check-links.mjs && node scripts/i18n-check.mjs",
    "preview": "astro preview",
    "test": "node --test tests/"
  },
  "dependencies": {
    "astro": "^7.3.8",
    "@astrojs/starlight": "^0.42.6"
  }
}
```

Until Task 6 and Task 7 exist, run `npx astro build` directly instead of `npm run build`.

- [ ] **Step 4: Write `src/site/locales.mjs`**

```js
// The 14 languages the app ships in. `code` is the URL prefix (lowercase),
// `lang` the HTML lang and hreflang value. A locale is generated, linked and
// listed in the sitemap only while `live` is true; F4 flips them one by one.
// LIVE_ALL=1 turns every locale on for local tests.
export const LOCALES = [
  { code: 'en', lang: 'en', label: 'English', dir: 'ltr', live: true },
  { code: 'tr', lang: 'tr', label: 'Türkçe', dir: 'ltr', live: false },
  { code: 'de', lang: 'de', label: 'Deutsch', dir: 'ltr', live: false },
  { code: 'fr', lang: 'fr', label: 'Français', dir: 'ltr', live: false },
  { code: 'es', lang: 'es', label: 'Español', dir: 'ltr', live: false },
  { code: 'it', lang: 'it', label: 'Italiano', dir: 'ltr', live: false },
  { code: 'ja', lang: 'ja', label: '日本語', dir: 'ltr', live: false },
  { code: 'nl', lang: 'nl', label: 'Nederlands', dir: 'ltr', live: false },
  { code: 'pl', lang: 'pl', label: 'Polski', dir: 'ltr', live: false },
  { code: 'pt-br', lang: 'pt-BR', label: 'Português (Brasil)', dir: 'ltr', live: false },
  { code: 'ru', lang: 'ru', label: 'Русский', dir: 'ltr', live: false },
  { code: 'ar', lang: 'ar', label: 'العربية', dir: 'rtl', live: false },
  { code: 'zh-hans', lang: 'zh-Hans', label: '简体中文', dir: 'ltr', live: false },
  { code: 'zh-hant', lang: 'zh-Hant', label: '繁體中文', dir: 'ltr', live: false },
];

export const DEFAULT = 'en';

export function liveLocales() {
  return LOCALES.filter((l) => l.live || process.env.LIVE_ALL === '1');
}

export function byCode(code) {
  return LOCALES.find((l) => l.code === code);
}
```

- [ ] **Step 5: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { liveLocales } from './src/site/locales.mjs';

// Starlight owns Astro's i18n config (setting both is an error). Its locale
// map mirrors src/site/locales.mjs so guides and marketing pages agree on
// which languages exist.
const starlightLocales = Object.fromEntries(
  liveLocales().map((l) => [
    l.code === 'en' ? 'root' : l.code,
    { label: l.label, lang: l.lang, ...(l.dir === 'rtl' ? { dir: 'rtl' } : {}) },
  ]),
);

export default defineConfig({
  site: 'https://macdio.app',
  // preserve: features.astro -> /features.html, tr/index.astro -> /tr/index.html,
  // so every URL the live site has today keeps working.
  build: { format: 'preserve' },
  integrations: [
    starlight({
      title: 'Macdio Guides',
      defaultLocale: 'root',
      locales: starlightLocales,
      sidebar: [{ label: 'Guides', items: [{ slug: 'guides' }] }],
      pagefind: true,
      lastUpdated: true,
      credits: false,
      expressiveCode: false,
      customCss: ['./src/styles/tokens.css', './src/styles/starlight.css'],
    }),
  ],
});
```

- [ ] **Step 6: Write `tsconfig.json`, `src/content.config.ts`, the guide index, the two CSS files and a temporary home page**

`tsconfig.json`:

```json
{ "extends": "astro/tsconfigs/base" }
```

`src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
```

`src/content/docs/guides/index.md` (the text comes from `old-site/guides/index.html`; keep the facts, drop the marketing tone; F3 rewrites it):

```md
title: Macdio Guides
description: How to listen, record, identify and read along with radio and podcasts in Macdio on iPhone, iPad, Mac, Apple TV, Apple Watch and CarPlay.
Guides for Macdio, the radio and podcast app for Apple devices. Each guide answers one question and names the devices it applies to.

The guide hub is being rebuilt. The nine existing guides return in the next step with their original addresses.
```

`src/styles/tokens.css` (first tokens; the Hallmark pass in F2 sets the final values, every colour and font on the site must reference these names):

```css
:root {
  --font-body: -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font-body);
  --color-accent: #6366f1;
  --color-accent-strong: #4f46e5;
  --color-bg: #ffffff;
  --color-surface: #f4f4f7;
  --color-text: #0b0b10;
  --color-text-muted: #51515c;
  --color-border: #d9d9e0;
  --maxw: 72rem;
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 1rem; --space-4: 1.5rem; --space-5: 2.5rem; --space-6: 4rem;
  --radius: 12px;
}
:root[data-theme="dark"] {
  --color-accent: #818cf8;
  --color-accent-strong: #a5b4fc;
  --color-bg: #050507;
  --color-surface: #111118;
  --color-text: #f3f3f6;
  --color-text-muted: #a0a0ad;
  --color-border: #26262f;
}
```

`src/styles/starlight.css` (maps Starlight's variables to the site tokens; F3 extends it):

```css
:root {
  --sl-font: var(--font-body);
  --sl-color-accent: var(--color-accent);
  --sl-color-accent-high: var(--color-accent-strong);
  --sl-color-bg: var(--color-bg);
  --sl-color-bg-nav: var(--color-bg);
  --sl-color-bg-sidebar: var(--color-surface);
  --sl-color-text: var(--color-text);
  --sl-color-gray-5: var(--color-border);
}
```

`src/pages/index.astro` (temporary, so the build has a root page; Task 4 replaces it):

```astro
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Macdio</title></head><body><h1>Macdio</h1></body></html>
```

- [ ] **Step 7: Install and build**

```bash
cd /Users/xfn/Developments/Dev/shortwave/macdio-web
npm install --no-fund --no-audit
npx astro telemetry disable
npx astro build 2>&1 | tail -15
ls dist dist/guides
```

Expected: build completes; `dist/index.html`, `dist/guides/index.html`, `dist/404.html`, `dist/pagefind/`, `dist/ios/index.html`, `dist/pricing.json`, `dist/_headers` exist. `dist/` is not in `git status`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "v2: Astro and Starlight skeleton, old site moved to old-site/, static assets kept in public/"
git push -u origin v2
```

### Task 2: Locale paths helper with tests

**Files:**
- Create: `src/site/paths.mjs`, `tests/paths.test.mjs`

**Interfaces:**
- Consumes: `liveLocales`, `DEFAULT`, `byCode` from `src/site/locales.mjs`.
- Produces: `SITE` (string), `localePath(code, path)`, `alternates(path)` returning `[{hreflang, href}]`, `splitLocale(urlPath)` returning `{code, path}`.

- [ ] **Step 1: Write the failing test `tests/paths.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.LIVE_ALL = '1';
const { localePath, alternates, splitLocale, SITE } = await import('../src/site/paths.mjs');

test('localePath keeps English at the root and prefixes others', () => {
  assert.equal(localePath('en', '/'), '/');
  assert.equal(localePath('en', '/features.html'), '/features.html');
  assert.equal(localePath('tr', '/'), '/tr/');
  assert.equal(localePath('pt-br', '/features/song-id.html'), '/pt-br/features/song-id.html');
});

test('alternates lists every live locale plus x-default pointing at English', () => {
  const alts = alternates('/mac.html');
  assert.equal(alts.length, 15);
  assert.deepEqual(alts.find((a) => a.hreflang === 'pt-BR'), { hreflang: 'pt-BR', href: `${SITE}/pt-br/mac.html` });
  assert.deepEqual(alts.at(-1), { hreflang: 'x-default', href: `${SITE}/mac.html` });
});

test('splitLocale recognises locale prefixes and nothing else', () => {
  assert.deepEqual(splitLocale('/tr/features.html'), { code: 'tr', path: '/features.html' });
  assert.deepEqual(splitLocale('/zh-hans/'), { code: 'zh-hans', path: '/' });
  assert.deepEqual(splitLocale('/guides/carplay-radio.html'), { code: 'en', path: '/guides/carplay-radio.html' });
  assert.deepEqual(splitLocale('/ios/'), { code: 'en', path: '/ios/' });
  assert.deepEqual(splitLocale('/'), { code: 'en', path: '/' });
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/paths.test.mjs`
Expected: FAIL, `Cannot find module '.../src/site/paths.mjs'`.

- [ ] **Step 3: Write `src/site/paths.mjs`**

```js
import { liveLocales, DEFAULT, byCode } from './locales.mjs';

export const SITE = 'https://macdio.app';

// `path` is always the English path: '/', '/features.html', '/guides/x.html'.
export function localePath(code, path) {
  return code === DEFAULT ? path : `/${code}${path}`;
}

export function alternates(path) {
  const list = liveLocales().map((l) => ({ hreflang: l.lang, href: SITE + localePath(l.code, path) }));
  list.push({ hreflang: 'x-default', href: SITE + path });
  return list;
}

// '/tr/features.html' -> { code: 'tr', path: '/features.html' }; anything that
// is not a known locale prefix is English.
export function splitLocale(urlPath) {
  const m = urlPath.match(/^\/([a-z]{2}(?:-[a-z]+)?)(\/.*)?$/);
  if (m && m[1] !== DEFAULT && byCode(m[1])) return { code: m[1], path: m[2] || '/' };
  return { code: DEFAULT, path: urlPath };
}
```

- [ ] **Step 4: Run the test, expect pass**

Run: `node --test tests/paths.test.mjs`
Expected: 3 passing.

- [ ] **Step 5: Commit**

```bash
git add src/site/paths.mjs tests/paths.test.mjs
git commit -m "v2: locale path helpers with tests"
```

### Task 3: Base layout, nav, footer, switchers, English strings

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`, `src/components/LangSwitcher.astro`, `src/components/ThemeToggle.astro`, `src/styles/site.css`, `src/i18n/index.mjs`, `src/i18n/en.json`

**Interfaces:**
- Consumes: `byCode`, `liveLocales` (locales.mjs); `SITE`, `localePath`, `alternates` (paths.mjs).
- Produces: `Base.astro` props `{ lang, path, title, description, jsonld? }`; `t(code)` returning the strings object for a locale (`{ site, nav, footer, pages: { [englishPath]: { title, description } } }`).

- [ ] **Step 1: Write `src/i18n/en.json` from the live site's titles and descriptions**

Run this one-off extraction so the English strings are the real ones, not retyped:

```bash
cd /Users/xfn/Developments/Dev/shortwave/macdio-web
node - <<'EOF'
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const pages = ['index','features','iphone','ipad','mac','apple-tv','apple-watch','stations','submit-station','support','privacy','privacy-ios','privacy-macos','privacy-tvos','privacy-watchos','transparency','accessibility','community','presskit','tunein-alternative'];
const out = { site: { name: 'Macdio', url: 'https://macdio.app' },
  nav: { home: 'Home', features: 'Features', guides: 'Guides', pricing: 'Pricing', community: 'Community', language: 'Language', theme: 'Theme', skip: 'Skip to content' },
  footer: { support: 'Support', privacy: 'Privacy', press: 'Press Kit', transparency: 'Transparency', accessibility: 'Accessibility', rights: 'Sait Firat NEMIS. All rights reserved.' },
  pages: {} };
const pick = (html, re) => (html.match(re) || [,''])[1].replace(/&amp;/g,'&').trim();
for (const p of pages) {
  const f = `old-site/${p}.html`; if (!existsSync(f)) { console.error('missing', f); continue; }
  const html = readFileSync(f, 'utf8');
  out.pages[p === 'index' ? '/' : `/${p}.html`] = {
    title: pick(html, /<title>([^<]*)<\/title>/),
    description: pick(html, /<meta name="description" content="([^"]*)"/),
  };
}
// New pages: factual drafts; F2 rewrites every title and description in the Hallmark pass.
Object.assign(out.pages, {
  '/carplay.html': { title: 'Macdio on CarPlay: Radio and Podcasts in the Car', description: 'Radio stations, podcasts and Song ID on the CarPlay screen with Macdio for iPhone. One purchase, no subscription.' },
  '/podcasts.html': { title: 'Macdio Podcasts: Transcripts on Device, Highlights', description: '4.7 million podcasts with on-device transcripts, search inside an episode and Highlights to Apple Notes, Notion, Obsidian, Bear, Craft and Readwise. One purchase.' },
  '/pricing.html': { title: 'Macdio Pricing: One Purchase, Every Apple Device', description: 'Macdio is a one-time purchase on the App Store. One price covers iPhone, iPad, Mac, Apple TV, Apple Watch and CarPlay. No subscription, no ads, no account.' },
  '/features/podcast-transcripts.html': { title: 'Podcast Transcripts on Device: Macdio', description: 'Macdio transcribes any podcast episode on your device, in the episode\u2019s language, with no server and no limit. Read along, search, jump to a sentence.' },
  '/features/highlights.html': { title: 'Podcast Highlights to Apple Notes, Obsidian, Readwise', description: 'Save a moment while listening and send it with the transcript sentence to Apple Notes, Notion, Obsidian, Bear, Craft or Readwise. Works for radio too.' },
  '/features/song-id.html': { title: 'Identify Songs on Radio Without a Microphone: Macdio', description: 'Macdio identifies the song playing on a radio stream from the stream itself, with no microphone and no listening in. Save tracks, open them in Apple Music.' },
  '/features/recording.html': { title: 'Record Internet Radio with Split Tracks: Macdio', description: 'Record a live radio stream on Mac, iPhone or iPad and get one file per song where the station sends titles. Scheduled recording, sleep-safe.' },
  '/features/synced-lyrics.html': { title: 'Synced Lyrics for Live Radio: Macdio', description: 'Macdio shows time-synced lyrics for the song playing on a radio station, aligned to what you hear, with the identified song as the anchor.' },
  '/mytuner-alternative.html': { title: 'myTuner Alternative for iPhone and Mac: Macdio', description: 'Macdio compared with myTuner Radio: one-time purchase instead of subscriptions and ads, native Mac app, Song ID, recording, podcasts with transcripts.' },
  '/pocket-casts-alternative.html': { title: 'Pocket Casts Alternative Without a Subscription: Macdio', description: 'Macdio compared with Pocket Casts: transcripts on device instead of Plus, Highlights export, one purchase for every Apple device, plus live radio.' },
  '/overcast-alternative.html': { title: 'Overcast Podcast App Alternative for Mac and iPhone: Macdio', description: 'Macdio compared with Overcast: a native Mac app, Apple TV, on-device transcripts and Highlights, one purchase instead of ads or a yearly plan.' },
  '/snipd-alternative.html': { title: 'Snipd Alternative with Apple Notes Export: Macdio', description: 'Macdio compared with Snipd: Highlights to Apple Notes, Craft, Obsidian, Readwise, Notion and Bear, transcripts on device, no monthly plan, radio included.' },
  '/compare/apple-podcasts.html': { title: 'Macdio vs Apple Podcasts: Transcripts and Highlights', description: 'Where Apple Podcasts transcripts stop and Macdio continues: every episode on device, search inside, Highlights to your notes app, plus live radio in the same app.' },
});
writeFileSync('src/i18n/en.json', JSON.stringify(out, null, 2) + '\n');
console.log(Object.keys(out.pages).length, 'pages');
EOF
```

Expected: `33 pages`. Open `src/i18n/en.json` and confirm no title is empty.

- [ ] **Step 2: Write `src/i18n/index.mjs`**

```js
// Strings per locale. Vite loads every src/i18n/<code>.json at build time.
// A locale that has no file falls back to English; the i18n-check script
// makes sure that never happens for a live locale.
const files = import.meta.glob('./*.json', { eager: true, import: 'default' });
const strings = Object.fromEntries(Object.entries(files).map(([p, v]) => [p.slice(2, -5), v]));

export function t(code) {
  return strings[code] ?? strings.en;
}
```

- [ ] **Step 3: Write `src/styles/site.css`** (structure only; the Hallmark pass restyles in F2)

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { overflow-x: clip; }
body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}
a { color: var(--color-accent); }
img, video { max-width: 100%; height: auto; display: block; }
.wrap { max-inline-size: var(--maxw); margin-inline: auto; padding-inline: var(--space-3); }
.skip { position: absolute; inset-block-start: -100%; inset-inline-start: var(--space-3); background: var(--color-surface); padding: var(--space-2) var(--space-3); border-radius: var(--radius); }
.skip:focus { inset-block-start: var(--space-2); }
.nav { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding-block: var(--space-3); border-block-end: 1px solid var(--color-border); }
.nav ul { display: flex; gap: var(--space-3); list-style: none; margin: 0; padding: 0; flex-wrap: wrap; }
.nav a { color: inherit; text-decoration: none; white-space: nowrap; }
.footer { border-block-start: 1px solid var(--color-border); padding-block: var(--space-4); color: var(--color-text-muted); font-size: 0.9rem; }
.footer ul { display: flex; gap: var(--space-3); list-style: none; margin: 0 0 var(--space-3); padding: 0; flex-wrap: wrap; }
h1, h2, h3 { font-family: var(--font-display); font-style: normal; overflow-wrap: anywhere; min-inline-size: 0; }
```

- [ ] **Step 4: Write the components**

`src/components/LangSwitcher.astro`:

```astro
import { liveLocales } from '../site/locales.mjs';
import { localePath } from '../site/paths.mjs';
import { t } from '../i18n/index.mjs';
const { lang, path } = Astro.props;
const s = t(lang);
<nav class="lang" aria-label={s.nav.language}>
  <ul>
    {liveLocales().map((l) => (
      <li><a href={localePath(l.code, path)} hreflang={l.lang} lang={l.lang} data-lang={l.code} aria-current={l.code === lang ? 'page' : undefined}>{l.label}</a></li>
    ))}
  </ul>
</nav>
<script is:inline>
  // Remember the picked language for the Worker's redirect at "/".
  document.querySelectorAll('.lang a[data-lang]').forEach((a) => {
    a.addEventListener('click', () => {
      document.cookie = 'lang=' + a.dataset.lang + '; Max-Age=31536000; Path=/; SameSite=Lax; Secure';
    });
  });
</script>
```

`src/components/ThemeToggle.astro`:

```astro
import { t } from '../i18n/index.mjs';
const { lang } = Astro.props;
const s = t(lang);
<button type="button" class="theme" aria-label={s.nav.theme} data-theme-toggle>◐</button>
<script is:inline>
  // Shares Starlight's storage key so the guides and the marketing pages agree.
  document.querySelector('[data-theme-toggle]').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('starlight-theme', next); } catch (e) {}
  });
</script>
```

`src/components/Nav.astro`:

```astro
import { localePath } from '../site/paths.mjs';
import { t } from '../i18n/index.mjs';
import LangSwitcher from './LangSwitcher.astro';
import ThemeToggle from './ThemeToggle.astro';
const { lang, path } = Astro.props;
const s = t(lang);
const p = (english) => localePath(lang, english);
<header class="wrap">
  <a class="skip" href="#main">{s.nav.skip}</a>
  <div class="nav">
    <a href={p('/')} aria-label={s.site.name}><img src="/icon-192.png" alt="" width="32" height="32"> {s.site.name}</a>
    <ul>
      <li><a href={p('/features.html')}>{s.nav.features}</a></li>
      <li><a href={p('/guides/')}>{s.nav.guides}</a></li>
      <li><a href={p('/pricing.html')}>{s.nav.pricing}</a></li>
      <li><a href="https://hub.devdio.pro" rel="noopener">{s.nav.community}</a></li>
    </ul>
    <ThemeToggle lang={lang} />
  </div>
  <LangSwitcher lang={lang} path={path} />
</header>
```

`src/components/Footer.astro`:

```astro
import { localePath } from '../site/paths.mjs';
import { t } from '../i18n/index.mjs';
const { lang } = Astro.props;
const s = t(lang);
const p = (english) => localePath(lang, english);
<footer class="wrap footer">
  <ul>
    <li><a href={p('/support.html')}>{s.footer.support}</a></li>
    <li><a href={p('/privacy.html')}>{s.footer.privacy}</a></li>
    <li><a href={p('/presskit.html')}>{s.footer.press}</a></li>
    <li><a href={p('/transparency.html')}>{s.footer.transparency}</a></li>
    <li><a href={p('/accessibility.html')}>{s.footer.accessibility}</a></li>
  </ul>
  <p>© {new Date().getFullYear()} {s.footer.rights}</p>
</footer>
```

- [ ] **Step 5: Write `src/layouts/Base.astro`**

```astro
import { byCode } from '../site/locales.mjs';
import { SITE, localePath, alternates } from '../site/paths.mjs';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/tokens.css';
import '../styles/site.css';

// path is always the English path of this page; lang picks the prefix.
const { lang, path, title, description, jsonld = [] } = Astro.props;
const locale = byCode(lang);
const url = SITE + localePath(lang, path);
<!doctype html>
<html lang={locale.lang} dir={locale.dir}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content={description}>
<link rel="canonical" href={url}>
{alternates(path).map((a) => <link rel="alternate" hreflang={a.hreflang} href={a.href} />)}
<meta property="og:site_name" content="Macdio">
<meta property="og:title" content={title}>
<meta property="og:description" content={description}>
<meta property="og:url" content={url}>
<meta property="og:type" content="website">
<meta property="og:locale" content={locale.lang.replace('-', '_')}>
<meta name="theme-color" content="#050507" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<link rel="manifest" href="/site.webmanifest">
{jsonld.map((obj) => <script type="application/ld+json" set:html={JSON.stringify(obj)} />)}
<script is:inline>
  // Apply the theme before first paint; same key as Starlight.
  (function () { try { var t = localStorage.getItem('starlight-theme'); if (t !== 'dark' && t !== 'light') { t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } document.documentElement.dataset.theme = t; } catch (e) {} })();
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QR2MZ9NF2N"></script>
<script is:inline>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QR2MZ9NF2N');</script>
</head>
<body>
<Nav lang={lang} path={path} />
<main id="main" class="wrap"><slot /></main>
<Footer lang={lang} path={path} />
</body>
</html>
```

- [ ] **Step 6: Build with the temporary home page swapped to the layout**

Replace `src/pages/index.astro` with:

```astro
import Base from '../layouts/Base.astro';
import { t } from '../i18n/index.mjs';
const s = t('en').pages['/'];
<Base lang="en" path="/" title={s.title} description={s.description}>
  <h1>{s.title}</h1>
  <p>{s.description}</p>
</Base>
```

Run:

```bash
npx astro build 2>&1 | grep -E "error|Error|built|Complete" | head
grep -c 'hreflang=' dist/index.html
grep -o '<html[^>]*>' dist/index.html
LIVE_ALL=1 npx astro build >/dev/null 2>&1 && grep -c 'hreflang=' dist/index.html && grep -o '<html[^>]*>' dist/ar/guides/index.html
```

Expected: first build: 2 hreflang links (en, x-default) and `<html lang="en" dir="ltr">`; `LIVE_ALL=1` build: 15 hreflang links on `dist/index.html`, and the Arabic guide page says `dir="rtl"`. (With `LIVE_ALL=1` the marketing pages for other locales do not exist yet; Task 4 adds them.)

- [ ] **Step 7: Commit**

```bash
git add src/layouts src/components src/styles/site.css src/i18n src/pages/index.astro
git commit -m "v2: base layout with hreflang, canonical, theme and language switchers; English strings from the live site"
```

### Task 4: Route files for 33 marketing pages in every live locale

**Files:**
- Create: `src/site/pages.mjs`, `src/templates/Page.astro`, `src/pages/[page].astro`, `src/pages/features/[page].astro`, `src/pages/compare/[page].astro`, `src/pages/[lang]/index.astro`, `src/pages/[lang]/[page].astro`, `src/pages/[lang]/features/[page].astro`, `src/pages/[lang]/compare/[page].astro`
- Modify: `src/pages/index.astro`
- Test: `tests/pages.test.mjs`

**Interfaces:**
- Produces: `ROOT_PAGES`, `FEATURE_PAGES`, `COMPARE_PAGES`, `ALL_PATHS` (English paths incl. `/`) from `src/site/pages.mjs`; `Page.astro` props `{ lang, path }` rendering title and description from `t(lang).pages[path]`. F2 replaces `Page.astro` with per-template components but keeps the route files.

- [ ] **Step 1: Write the failing test `tests/pages.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { ALL_PATHS } = await import('../src/site/pages.mjs');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));

test('every marketing path has English strings and every string has a path', () => {
  assert.deepEqual([...ALL_PATHS].sort(), Object.keys(en.pages).sort());
  assert.equal(ALL_PATHS.length, 33);
});

test('the 32 live URLs that are marketing pages are all present', () => {
  for (const p of ['/', '/features.html', '/iphone.html', '/ipad.html', '/mac.html', '/apple-tv.html', '/apple-watch.html',
    '/tunein-alternative.html', '/stations.html', '/submit-station.html', '/support.html', '/privacy.html', '/privacy-ios.html',
    '/privacy-macos.html', '/privacy-tvos.html', '/privacy-watchos.html', '/transparency.html', '/accessibility.html',
    '/community.html', '/presskit.html']) {
    assert.ok(ALL_PATHS.includes(p), p);
  }
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/pages.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `src/site/pages.mjs`**

```js
// Marketing pages by folder. Slugs without ".html"; the route files add it.
export const ROOT_PAGES = [
  'features', 'iphone', 'ipad', 'mac', 'apple-tv', 'apple-watch', 'carplay', 'podcasts', 'pricing',
  'stations', 'submit-station', 'support',
  'privacy', 'privacy-ios', 'privacy-macos', 'privacy-tvos', 'privacy-watchos',
  'transparency', 'accessibility', 'community', 'presskit',
  'tunein-alternative', 'mytuner-alternative', 'pocket-casts-alternative', 'overcast-alternative', 'snipd-alternative',
];
export const FEATURE_PAGES = ['podcast-transcripts', 'highlights', 'song-id', 'recording', 'synced-lyrics'];
export const COMPARE_PAGES = ['apple-podcasts'];

export const ALL_PATHS = [
  '/',
  ...ROOT_PAGES.map((p) => `/${p}.html`),
  ...FEATURE_PAGES.map((p) => `/features/${p}.html`),
  ...COMPARE_PAGES.map((p) => `/compare/${p}.html`),
];
```

- [ ] **Step 4: Run the test, expect pass**

Run: `node --test tests/pages.test.mjs`
Expected: 2 passing.

- [ ] **Step 5: Write `src/templates/Page.astro` and the route files**

`src/templates/Page.astro`:

```astro
import Base from '../layouts/Base.astro';
import { t } from '../i18n/index.mjs';
const { lang, path } = Astro.props;
const s = t(lang).pages[path];
if (!s) throw new Error(`No strings for ${path} in ${lang}`);
<Base lang={lang} path={path} title={s.title} description={s.description}>
  <h1>{s.title}</h1>
  <p>{s.description}</p>
</Base>
```

`src/pages/index.astro`:

```astro
import Page from '../templates/Page.astro';
<Page lang="en" path="/" />
```

`src/pages/[page].astro`:

```astro
import Page from '../templates/Page.astro';
import { ROOT_PAGES } from '../site/pages.mjs';
export function getStaticPaths() { return ROOT_PAGES.map((page) => ({ params: { page } })); }
<Page lang="en" path={`/${Astro.params.page}.html`} />
```

`src/pages/features/[page].astro`:

```astro
import Page from '../../templates/Page.astro';
import { FEATURE_PAGES } from '../../site/pages.mjs';
export function getStaticPaths() { return FEATURE_PAGES.map((page) => ({ params: { page } })); }
<Page lang="en" path={`/features/${Astro.params.page}.html`} />
```

`src/pages/compare/[page].astro`:

```astro
import Page from '../../templates/Page.astro';
import { COMPARE_PAGES } from '../../site/pages.mjs';
export function getStaticPaths() { return COMPARE_PAGES.map((page) => ({ params: { page } })); }
<Page lang="en" path={`/compare/${Astro.params.page}.html`} />
```

`src/pages/[lang]/index.astro`:

```astro
import Page from '../../templates/Page.astro';
import { liveLocales, DEFAULT } from '../../site/locales.mjs';
export function getStaticPaths() { return liveLocales().filter((l) => l.code !== DEFAULT).map((l) => ({ params: { lang: l.code } })); }
<Page lang={Astro.params.lang} path="/" />
```

`src/pages/[lang]/[page].astro`:

```astro
import Page from '../../templates/Page.astro';
import { liveLocales, DEFAULT } from '../../site/locales.mjs';
import { ROOT_PAGES } from '../../site/pages.mjs';
export function getStaticPaths() {
  return liveLocales().filter((l) => l.code !== DEFAULT).flatMap((l) => ROOT_PAGES.map((page) => ({ params: { lang: l.code, page } })));
}
<Page lang={Astro.params.lang} path={`/${Astro.params.page}.html`} />
```

`src/pages/[lang]/features/[page].astro`:

```astro
import Page from '../../../templates/Page.astro';
import { liveLocales, DEFAULT } from '../../../site/locales.mjs';
import { FEATURE_PAGES } from '../../../site/pages.mjs';
export function getStaticPaths() {
  return liveLocales().filter((l) => l.code !== DEFAULT).flatMap((l) => FEATURE_PAGES.map((page) => ({ params: { lang: l.code, page } })));
}
<Page lang={Astro.params.lang} path={`/features/${Astro.params.page}.html`} />
```

`src/pages/[lang]/compare/[page].astro`:

```astro
import Page from '../../../templates/Page.astro';
import { liveLocales, DEFAULT } from '../../../site/locales.mjs';
import { COMPARE_PAGES } from '../../../site/pages.mjs';
export function getStaticPaths() {
  return liveLocales().filter((l) => l.code !== DEFAULT).flatMap((l) => COMPARE_PAGES.map((page) => ({ params: { lang: l.code, page } })));
}
<Page lang={Astro.params.lang} path={`/compare/${Astro.params.page}.html`} />
```

- [ ] **Step 6: Build twice and count**

```bash
npx astro build 2>&1 | grep -E "error|page\(s\)" ; find dist -name '*.html' -not -path '*/pagefind/*' | wc -l
ls dist/features.html dist/features/song-id.html dist/compare/apple-podcasts.html dist/guides/index.html dist/ios/index.html
LIVE_ALL=1 npx astro build 2>&1 | grep -E "error|page\(s\)" ; find dist -name '*.html' -not -path '*/pagefind/*' | wc -l
ls dist/tr/index.html dist/pt-br/features/song-id.html dist/zh-hant/compare/apple-podcasts.html
```

Expected: English build 33 marketing pages + `guides/index.html` + `404.html` + `ios/index.html` = 36 files. `LIVE_ALL=1` build: 33 × 14 = 462 marketing pages + 14 guide index pages + 404 + ios = 478 files; the three listed paths exist.

- [ ] **Step 7: Commit**

```bash
git add src/site/pages.mjs src/templates src/pages tests/pages.test.mjs
git commit -m "v2: route files for 33 marketing pages in every live locale"
```

### Task 5: Worker with language redirect and tests

**Files:**
- Modify: `worker.js`
- Create: `tests/worker.test.mjs`

**Interfaces:**
- Produces: `pickLocale(acceptLanguage, cookie)` and `mapTag(tag)` exported from `worker.js`; default export `{ fetch(request, env) }`.

- [ ] **Step 1: Write the failing test `tests/worker.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { pickLocale, mapTag } from '../worker.js';

const env = { ASSETS: { fetch: async (req) => new Response('asset:' + new URL(req.url).pathname, { status: 200 }) } };
const get = (path, headers = {}) => worker.fetch(new Request('https://macdio.app' + path, { headers }), env);

test('mapTag maps regions and scripts to the 14 codes', () => {
  assert.equal(mapTag('tr-tr'), 'tr');
  assert.equal(mapTag('pt-pt'), 'pt-br');
  assert.equal(mapTag('pt'), 'pt-br');
  assert.equal(mapTag('zh-tw'), 'zh-hant');
  assert.equal(mapTag('zh-hant-hk'), 'zh-hant');
  assert.equal(mapTag('zh'), 'zh-hans');
  assert.equal(mapTag('zh-cn'), 'zh-hans');
  assert.equal(mapTag('en-gb'), 'en');
  assert.equal(mapTag('sv'), null);
  assert.equal(mapTag('*'), null);
});

test('pickLocale honours q values and order, falls back to en', () => {
  assert.equal(pickLocale('de;q=0.8, en;q=0.9'), 'en');
  assert.equal(pickLocale('tr-TR,tr;q=0.9,en;q=0.8'), 'tr');
  assert.equal(pickLocale('sv, fi'), 'en');
  assert.equal(pickLocale('*'), 'en');
  assert.equal(pickLocale(''), 'en');
  assert.equal(pickLocale(null), 'en');
  assert.equal(pickLocale('tr;q=abc'), 'tr');
  assert.equal(pickLocale(';;,,'), 'en');
});

test('pickLocale lets a valid cookie win and ignores an unknown one', () => {
  assert.equal(pickLocale('tr', 'lang=de'), 'de');
  assert.equal(pickLocale('tr', 'a=b; lang=en; c=d'), 'en');
  assert.equal(pickLocale('tr', 'lang=xx'), 'tr');
});

test('/ redirects a Turkish browser, serves English to crawlers and to English browsers', async () => {
  const r1 = await get('/', { 'Accept-Language': 'tr-TR,tr;q=0.9' });
  assert.equal(r1.status, 302);
  assert.equal(r1.headers.get('Location'), 'https://macdio.app/tr/');
  assert.equal(r1.headers.get('Vary'), 'Accept-Language');
  const r2 = await get('/', { 'Accept-Language': 'tr', 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' });
  assert.equal(r2.status, 200);
  assert.equal(await r2.text(), 'asset:/index.html');
  const r3 = await get('/', { 'Accept-Language': 'en-US,en;q=0.9' });
  assert.equal(r3.status, 200);
  assert.equal(r3.headers.get('Vary'), 'Accept-Language');
  const r4 = await get('/', {});
  assert.equal(r4.status, 200);
});

test('/ with a lang cookie follows the cookie', async () => {
  const r = await get('/', { 'Accept-Language': 'tr', Cookie: 'lang=de' });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('Location'), 'https://macdio.app/de/');
  const r2 = await get('/', { 'Accept-Language': 'tr', Cookie: 'lang=en' });
  assert.equal(r2.status, 200);
});

test('directory URLs serve their index.html and deep links are never redirected', async () => {
  assert.equal(await (await get('/tr/', { 'Accept-Language': 'de' })).text(), 'asset:/tr/index.html');
  assert.equal(await (await get('/guides/', {})).text(), 'asset:/guides/index.html');
  assert.equal(await (await get('/features.html', { 'Accept-Language': 'tr' })).text(), 'asset:/features.html');
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/worker.test.mjs`
Expected: FAIL, `does not provide an export named 'pickLocale'`.

- [ ] **Step 3: Write `worker.js`**

```js
// Runs only when no static asset matches the request (Cloudflare serves
// assets first), so it sees "/", "/<lang>/" and other directory URLs, never
// a deep ".html" link. Two jobs: pick a language for "/" from the visitor's
// browser preference (or their earlier choice in the "lang" cookie) and
// serve index.html for directory URLs. Nothing is stored.

const LOCALES = ['en', 'tr', 'de', 'fr', 'es', 'it', 'ja', 'nl', 'pl', 'pt-br', 'ru', 'ar', 'zh-hans', 'zh-hant'];
const BOTS = /googlebot|bingbot|applebot|duckduckbot|yandex|baiduspider|gptbot|claudebot|anthropic-ai|perplexitybot|facebookexternalhit|twitterbot|linkedinbot|slurp|ahrefsbot|semrushbot/i;

export function mapTag(tag) {
  const t = tag.toLowerCase();
  if (t === '*' || !t) return null;
  if (t === 'pt' || t.startsWith('pt-')) return 'pt-br';
  if (t === 'zh' || t.startsWith('zh-')) return /hant|-tw|-hk|-mo/.test(t) ? 'zh-hant' : 'zh-hans';
  const primary = t.split('-')[0];
  return LOCALES.includes(primary) ? primary : null;
}

export function pickLocale(acceptLanguage, cookie) {
  const picked = (cookie || '').match(/(?:^|;\s*)lang=([a-z-]+)/i);
  if (picked && LOCALES.includes(picked[1].toLowerCase())) return picked[1].toLowerCase();
  if (!acceptLanguage) return 'en';
  const ranked = acceptLanguage
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const weight = q ? parseFloat(q.slice(2)) : 1;
      return { tag: tag.trim(), q: Number.isFinite(weight) ? weight : 1, i };
    })
    .filter((r) => r.tag && r.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { tag } of ranked) {
    const code = mapTag(tag);
    if (code) return code;
  }
  return 'en';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      const ua = request.headers.get('User-Agent') || '';
      if (!BOTS.test(ua)) {
        const code = pickLocale(request.headers.get('Accept-Language'), request.headers.get('Cookie'));
        if (code !== 'en') {
          return new Response(null, {
            status: 302,
            headers: { Location: `${url.origin}/${code}/`, Vary: 'Accept-Language', 'Cache-Control': 'private, no-store' },
          });
        }
      }
    }
    if (url.pathname.endsWith('/')) {
      const rewritten = new URL(url);
      rewritten.pathname = url.pathname + 'index.html';
      const res = await env.ASSETS.fetch(new Request(rewritten, request));
      if (url.pathname !== '/') return res;
      const headers = new Headers(res.headers);
      headers.set('Vary', 'Accept-Language');
      return new Response(res.body, { status: res.status, headers });
    }
    return env.ASSETS.fetch(request);
  },
};
```

- [ ] **Step 4: Run the tests, expect pass**

Run: `node --test tests/worker.test.mjs`
Expected: 6 passing.

- [ ] **Step 5: Check it end to end with wrangler dev**

```bash
npx astro build >/dev/null 2>&1
(npx wrangler dev --port 8787 >/tmp/wrangler-dev.log 2>&1 &) ; sleep 8
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' -H 'Accept-Language: tr-TR,tr;q=0.9' http://127.0.0.1:8787/
curl -s -o /dev/null -w '%{http_code}\n' -H 'Accept-Language: tr' -A 'Googlebot/2.1' http://127.0.0.1:8787/
curl -s -o /dev/null -w '%{http_code}\n' -H 'Accept-Language: en' http://127.0.0.1:8787/
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8787/guides/
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8787/nope.html
pkill -f "wrangler dev" ; sleep 1
```

Expected: `302 http://127.0.0.1:8787/tr/`, `200`, `200`, `200`, `404` (the 404 comes from `not_found_handling`, set in Task 8; before Task 8 it may be an empty 404 body, the code is what matters). Note `/tr/` itself is a 404 until F4 makes `tr` live; that is expected in F1 and is why the Worker must not be deployed before F4.

- [ ] **Step 6: Commit**

```bash
git add worker.js tests/worker.test.mjs
git commit -m "v2: Worker picks the language at / from Accept-Language or the lang cookie, never for crawlers"
```

### Task 6: Sitemap with hreflang, hreflang check, link check

**Files:**
- Create: `scripts/sitemap.mjs`, `scripts/check-hreflang.mjs`, `scripts/check-links.mjs`, `tests/sitemap.test.mjs`

**Interfaces:**
- Produces: `scripts/sitemap.mjs` exports `toUrlPath(relFile)`, `groupPages(relFiles, readFile)`, `renderSitemap(groups)`; running it writes `dist/sitemap.xml`. The two check scripts exit non-zero on any problem and print each one on its own line.

- [ ] **Step 1: Write the failing test `tests/sitemap.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.LIVE_ALL = '1';
const { toUrlPath, groupPages, renderSitemap } = await import('../scripts/sitemap.mjs');

const files = ['index.html', 'tr/index.html', 'features.html', 'tr/features.html', 'guides/index.html',
  'guides/carplay-radio.html', 'ios/index.html', '404.html', 'pagefind/x.html'];
const bodies = {
  'ios/index.html': '<meta name="robots" content="noindex,follow">',
};
const read = (f) => bodies[f] || '<html>';

test('toUrlPath turns index files into directory URLs and keeps .html elsewhere', () => {
  assert.equal(toUrlPath('index.html'), '/');
  assert.equal(toUrlPath('tr/index.html'), '/tr/');
  assert.equal(toUrlPath('guides/carplay-radio.html'), '/guides/carplay-radio.html');
});

test('groupPages groups locale variants and drops 404, pagefind and noindex pages', () => {
  const groups = groupPages(files, read);
  assert.deepEqual([...groups.keys()].sort(), ['/', '/features.html', '/guides/', '/guides/carplay-radio.html']);
  assert.deepEqual([...groups.get('/').entries()], [['en', '/'], ['tr', '/tr/']]);
});

test('renderSitemap writes one url per variant with every alternate and x-default', () => {
  const xml = renderSitemap(groupPages(files, read));
  assert.match(xml, /<loc>https:\/\/macdio\.app\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/macdio\.app\/tr\/<\/loc>/);
  assert.doesNotMatch(xml, /index\.html/);
  assert.doesNotMatch(xml, /\/ios\//);
  const home = xml.split('<url>').find((u) => u.includes('<loc>https://macdio.app/</loc>'));
  assert.match(home, /hreflang="tr" href="https:\/\/macdio\.app\/tr\/"/);
  assert.match(home, /hreflang="x-default" href="https:\/\/macdio\.app\/"/);
  assert.equal((xml.match(/<url>/g) || []).length, 6);
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/sitemap.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `scripts/sitemap.mjs`**

```js
// Builds dist/sitemap.xml from the files Astro wrote, with one <url> per
// language variant and xhtml:link alternates for every other variant plus
// x-default (English). The Astro sitemap integration drops ".html" and mislabels
// locale roots, so the site has its own generator.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, DEFAULT } from '../src/site/locales.mjs';
import { splitLocale, SITE } from '../src/site/paths.mjs';

const SKIP = /^(404\.html|pagefind\/|_astro\/)/;
const NOINDEX = /<meta\s+name="robots"\s+content="[^"]*noindex/i;

export function toUrlPath(relFile) {
  const p = '/' + relFile.split('\\').join('/');
  return p.endsWith('/index.html') ? p.slice(0, -'index.html'.length) : p;
}

export function groupPages(relFiles, readFile) {
  const groups = new Map();
  for (const f of relFiles) {
    if (!f.endsWith('.html') || SKIP.test(f)) continue;
    if (NOINDEX.test(readFile(f))) continue;
    const url = toUrlPath(f);
    const { code, path } = splitLocale(url);
    if (!groups.has(path)) groups.set(path, new Map());
    groups.get(path).set(code, url);
  }
  return groups;
}

const langOf = (code) => LOCALES.find((l) => l.code === code).lang;

export function renderSitemap(groups) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const [, variants] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const alts = [...variants.entries()].map(([code, url]) => `    <xhtml:link rel="alternate" hreflang="${langOf(code)}" href="${SITE}${url}"/>`);
    if (variants.has(DEFAULT)) alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${variants.get(DEFAULT)}"/>`);
    for (const url of variants.values()) xml += `  <url>\n    <loc>${SITE}${url}</loc>\n${alts.join('\n')}\n  </url>\n`;
  }
  return xml + '</urlset>\n';
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  const files = walk(dist).map((f) => relative(dist, f));
  const groups = groupPages(files, (f) => readFileSync(join(dist, f), 'utf8'));
  writeFileSync(join(dist, 'sitemap.xml'), renderSitemap(groups));
  const n = [...groups.values()].reduce((a, m) => a + m.size, 0);
  console.log(`sitemap: ${n} urls in ${groups.size} groups`);
}
```

- [ ] **Step 4: Run the test, expect pass**

Run: `node --test tests/sitemap.test.mjs`
Expected: 3 passing.

- [ ] **Step 5: Write `scripts/check-hreflang.mjs`**

```js
// Every page's <link rel="alternate" hreflang> set must equal the sitemap's
// set for that page, and its canonical must be its own URL. Starlight writes
// these for guides, Base.astro for marketing pages; this proves both agree.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toUrlPath } from './sitemap.mjs';
import { SITE } from '../src/site/paths.mjs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const SKIP = /^(404\.html|pagefind\/|_astro\/)/;
const norm = (u) => u.replace(/\/index\.html$/, '/');

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const expected = new Map();
for (const block of sitemap.split('<url>').slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)[1];
  const alts = [...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]} ${norm(m[2])}`).sort();
  expected.set(norm(loc), alts);
}

let problems = 0;
const say = (m) => { problems++; console.error(m); };
for (const f of walk(dist).map((p) => relative(dist, p))) {
  if (!f.endsWith('.html') || SKIP.test(f)) continue;
  const url = SITE + toUrlPath(f);
  const html = readFileSync(join(dist, f), 'utf8').split('</head>')[0];
  const want = expected.get(url);
  if (!want) { if (!/noindex/.test(html)) say(`${f}: not in sitemap and not noindex`); continue; }
  const have = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]} ${norm(m[2])}`).sort();
  if (have.join('|') !== want.join('|')) say(`${f}: hreflang differs\n  page:    ${have.join(', ')}\n  sitemap: ${want.join(', ')}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) say(`${f}: no canonical`);
  else if (norm(canonical[1]) !== url) say(`${f}: canonical ${canonical[1]} is not ${url}`);
}
console.log(problems ? `check-hreflang: ${problems} problem(s)` : `check-hreflang: ok, ${expected.size} urls`);
process.exit(problems ? 1 : 0);
```

- [ ] **Step 6: Write `scripts/check-links.mjs`**

```js
// Every site-relative href and src in dist/ must point at a file that exists.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}
let problems = 0;
const seen = new Set();
for (const f of walk(dist)) {
  if (!f.endsWith('.html')) continue;
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)/g)) {
    let target = m[1];
    if (target.startsWith('//') || target.startsWith('/cdn-cgi/')) continue;
    if (target.endsWith('/')) target += 'index.html';
    const key = `${relative(dist, f)} -> ${target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!existsSync(join(dist, target))) { problems++; console.error(`broken: ${key}`); }
  }
}
console.log(problems ? `check-links: ${problems} broken link(s)` : `check-links: ok, ${seen.size} internal references`);
process.exit(problems ? 1 : 0);
```

- [ ] **Step 7: Run the whole chain on both builds**

```bash
npx astro build >/dev/null 2>&1 && node scripts/sitemap.mjs && node scripts/check-hreflang.mjs && node scripts/check-links.mjs
LIVE_ALL=1 npx astro build >/dev/null 2>&1 && LIVE_ALL=1 node scripts/sitemap.mjs && LIVE_ALL=1 node scripts/check-hreflang.mjs && node scripts/check-links.mjs
head -c 600 dist/sitemap.xml
```

Expected: both runs end with `check-hreflang: ok` and `check-links: ok`. If Starlight's guide index reports a canonical or hreflang mismatch, read the generated `dist/guides/index.html` head and adjust `norm()` so both forms of the same URL compare equal; do not relax the check to "contains". The `LIVE_ALL=1` sitemap has 476 urls in 34 groups.

- [ ] **Step 8: Commit**

```bash
git add scripts/sitemap.mjs scripts/check-hreflang.mjs scripts/check-links.mjs tests/sitemap.test.mjs
git commit -m "v2: own sitemap with hreflang alternates, hreflang and internal link checks fail the build"
```

### Task 7: i18n completeness check

**Files:**
- Create: `scripts/i18n-check.mjs`, `tests/i18n-check.test.mjs`

**Interfaces:**
- Produces: `scripts/i18n-check.mjs` exports `flatten(obj)`, `checkLocale(code, strings, en, { live })` returning `string[]` of problems; running it checks `src/i18n/*.json` against the live locales and exits 1 on any problem for a live locale.

- [ ] **Step 1: Write the failing test `tests/i18n-check.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
const { flatten, checkLocale } = await import('../scripts/i18n-check.mjs');

const en = { site: { name: 'Macdio' }, pages: { '/': { title: 'Macdio: Live Radio & Podcasts', description: 'Short.' } } };

test('flatten gives dotted keys', () => {
  assert.deepEqual(Object.keys(flatten(en)).sort(), ['pages./.description', 'pages./.title', 'site.name']);
});

test('a live locale missing a key is a problem, a non-live one is a warning only', () => {
  const tr = { site: { name: 'Macdio' }, pages: { '/': { title: 'Macdio: Canlı Radyo' } } };
  assert.match(checkLocale('tr', tr, en, { live: true })[0], /missing key pages\.\/\.description/);
  assert.deepEqual(checkLocale('tr', tr, en, { live: false }), []);
});

test('length limits, em dash and extra keys are problems', () => {
  const bad = { site: { name: 'Macdio', extra: 'x' }, pages: { '/': { title: 'x'.repeat(61), description: 'A dash — here' } } };
  const problems = checkLocale('de', bad, en, { live: true });
  assert.ok(problems.some((p) => /title is 61 chars/.test(p)));
  assert.ok(problems.some((p) => /em dash/.test(p)));
  assert.ok(problems.some((p) => /extra key site\.extra/.test(p)));
});

test('English must not say we, our or us for the developer', () => {
  const enBad = { site: { name: 'Macdio' }, pages: { '/': { title: 'Our radio app', description: 'We built it.' } } };
  const problems = checkLocale('en', enBad, enBad, { live: true });
  assert.ok(problems.some((p) => /"we\/our\/us"/.test(p)));
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/i18n-check.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `scripts/i18n-check.mjs`**

```js
// Each live locale must carry exactly the keys of en.json, within the title
// and description limits, with no em dash. English must not say we/our/us
// for the developer (one person makes Macdio). Non-live locales only warn.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, liveLocales } from '../src/site/locales.mjs';

export function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out); else out[key] = v;
  }
  return out;
}

export function checkLocale(code, strings, en, { live }) {
  const problems = [];
  const have = flatten(strings);
  const want = flatten(en);
  if (live) {
    for (const k of Object.keys(want)) if (!(k in have)) problems.push(`${code}: missing key ${k}`);
    for (const k of Object.keys(have)) if (!(k in want)) problems.push(`${code}: extra key ${k}`);
  }
  for (const [k, v] of Object.entries(have)) {
    if (typeof v !== 'string') continue;
    if (v.includes('\u2014')) problems.push(`${code}: em dash in ${k}`);
    if (/\.title$/.test(k) && v.length > 60) problems.push(`${code}: ${k} title is ${v.length} chars (max 60)`);
    if (/\.description$/.test(k) && v.length > 160) problems.push(`${code}: ${k} description is ${v.length} chars (max 160)`);
    if (code === 'en' && /\b(we|our|us)\b/i.test(v)) problems.push(`${code}: "we/our/us" in ${k}: ${v}`);
  }
  return live ? problems : [];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = fileURLToPath(new URL('../src/i18n/', import.meta.url));
  const read = (code) => JSON.parse(readFileSync(join(dir, `${code}.json`), 'utf8'));
  const en = read('en');
  const files = new Set(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)));
  const live = new Set(liveLocales().map((l) => l.code));
  let problems = [];
  for (const l of LOCALES) {
    if (!files.has(l.code)) { if (live.has(l.code)) problems.push(`${l.code}: live but src/i18n/${l.code}.json is missing`); continue; }
    problems = problems.concat(checkLocale(l.code, read(l.code), en, { live: live.has(l.code) }));
  }
  for (const p of problems) console.error(p);
  console.log(problems.length ? `i18n-check: ${problems.length} problem(s)` : `i18n-check: ok, ${live.size} live locale(s)`);
  process.exit(problems.length ? 1 : 0);
}
```

- [ ] **Step 4: Run the tests and the script**

Run: `node --test tests/i18n-check.test.mjs && node scripts/i18n-check.mjs`
Expected: 4 passing; script prints `i18n-check: ok, 1 live locale(s)`. If it reports a problem in `en.json` (a title over 60 characters from the live site, for example), shorten that title in `en.json` and note it in the commit message; the limit is the spec's.

- [ ] **Step 5: Run the full `npm run build` and `npm test`**

```bash
npm test 2>&1 | tail -5
npm run build 2>&1 | tail -6
```

Expected: all tests pass; build ends with the four script lines all `ok`.

- [ ] **Step 6: Commit**

```bash
git add scripts/i18n-check.mjs tests/i18n-check.test.mjs src/i18n/en.json
git commit -m "v2: i18n completeness and length check in the build"
```

### Task 8: wrangler config, headers, check-public for the new layout

**Files:**
- Modify: `wrangler.jsonc` (assets block), `public/_headers`, `scripts/check-public.sh`

- [ ] **Step 1: Edit `wrangler.jsonc`**

Replace the `assets` block and the comment above it:

```jsonc
  // Only the build output is served. src/, scripts/, docs/, old-site/ and every
  // config file sit outside dist/ and cannot be reached, which is what
  // scripts/check-public.sh proves after each deploy.
  "assets": {
    "directory": "./dist",
    "html_handling": "none",
    "not_found_handling": "404-page",
    "binding": "ASSETS"
  },
```

Keep every other key (`name`, `main`, `compatibility_date`, `workers_dev: false`, the routes, `observability`).

- [ ] **Step 2: Rewrite `public/_headers`**

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Hashed build assets never change under the same name.
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Search index files are hashed too.
/pagefind/*
  Cache-Control: public, max-age=31536000, immutable

# Clips and posters. Long lived but not immutable, a file can be re-encoded
# under the same name.
/media/*
  Cache-Control: public, max-age=2592000

# HTML and the sitemap revalidate on every visit so a deploy reaches
# returning visitors at once.
/*.html
  Cache-Control: public, max-age=0, must-revalidate
/sitemap.xml
  Cache-Control: public, max-age=0, must-revalidate
```

- [ ] **Step 3: Edit `scripts/check-public.sh`**

Replace the `MUST_404` and `MUST_200` arrays:

```bash
MUST_404=(
  /CLAUDE.md /CLAUDE.local.md
  /docs/superpowers/specs/2026-10-12-macdio-web-v2-design.md
  /docs/feature-requests.md /docs/research/2026-10-12-competitors.md
  /.serena/project.yml /scripts/indexnow.sh /scripts/check-public.sh /scripts/sitemap.mjs
  /worker.js /wrangler.jsonc /.gitignore /CNAME /package.json /astro.config.mjs
  /src/pages/index.astro /src/i18n/en.json /old-site/index.html /old-site/redesign.css
  /node_modules/astro/package.json /.wrangler/cache/wrangler-account.json
  /public/ /public/index.html /dist/ /dist/index.html
)
# The site breaks without these, so a 404 here is also a failure.
MUST_200=(/ /index.html /features.html /mac.html /guides/ /pricing.json /sitemap.xml /robots.txt /_astro/)
```

`/_astro/` as a directory will not be 200; use the first stylesheet instead: replace `/_astro/` in `MUST_200` with a lookup at run time, added right after the arrays:

```bash
# One hashed asset, read from the live home page, so the CDN path is proven too.
asset=$(curl -s "$HOST/" | grep -o '/_astro/[^"]*\.css' | head -1)
[ -n "$asset" ] && MUST_200+=("$asset")
```

and wrap the `www` section so local runs can skip it:

```bash
if [ -z "${SKIP_WWW:-}" ]; then
  ... existing www checks unchanged ...
fi
```

- [ ] **Step 4: Prove it locally**

```bash
npm run build >/dev/null 2>&1
(npx wrangler dev --port 8787 >/tmp/wrangler-dev.log 2>&1 &) ; sleep 8
SKIP_WWW=1 bash scripts/check-public.sh http://127.0.0.1:8787 ; echo "exit $?"
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8787/does-not-exist.html
curl -sI http://127.0.0.1:8787/index.html | grep -i -E 'cache-control|x-content-type'
pkill -f "wrangler dev"; sleep 1
```

Expected: `exit 0`, the missing page returns `404` with the Starlight 404 page body, headers show `must-revalidate` and `nosniff`.

- [ ] **Step 5: Commit**

```bash
git add wrangler.jsonc public/_headers scripts/check-public.sh
git commit -m "v2: serve dist/, 404 page, cache headers for hashed assets and media, check-public for the new layout"
```

### Task 9: Media encode pipeline

**Files:**
- Create: `scripts/media-encode.sh`
- Create (generated): `public/media/*.mp4`, `*.webm`, `*.jpg` (37 clips, the unblurred CarPlay cover excluded) plus two stills

- [ ] **Step 1: Write `scripts/media-encode.sh`**

```zsh
#!/bin/zsh
# Web-size versions of the showcase clips: public/media/<scene>.{mp4,webm,jpg}
# Source: ~/MacdioBuild/showcase/media/web (38 clips at device resolution).
# Widths by device so a phone clip is never shipped at 1320 px.
# Usage: scripts/media-encode.sh [source-dir] [one-scene-name]
set -euo pipefail
SRC=${1:-$HOME/MacdioBuild/showcase/media/web}
ONLY=${2:-}
OUT=$(cd "$(dirname "$0")/.." && pwd)/public/media
mkdir -p "$OUT"

width() {
  case "$1" in
    iphone-*|watch-*) echo 600 ;;
    ipad-*|mac-*) echo 1200 ;;
    tv-*|carplay-*) echo 1280 ;;
    *) echo 1200 ;;
  esac
}

over=0
for f in "$SRC"/*.mp4; do
  n=$(basename "$f" .mp4)
  [[ -n "$ONLY" && "$n" != "$ONLY" ]] && continue
  # The unblurred cover is a copyrighted image; only the blurred variant ships.
  [[ "$n" == carplay-nowplaying ]] && continue
  w=$(width "$n")
  ffmpeg -v error -y -i "$f" -vf "scale=$w:-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart -an "$OUT/$n.mp4"
  ffmpeg -v error -y -i "$OUT/$n.mp4" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -an "$OUT/$n.webm"
  ffmpeg -v error -y -sseof -1 -i "$OUT/$n.mp4" -frames:v 1 -update 1 -q:v 3 "$OUT/$n.jpg"
  s=$(stat -f %z "$OUT/$n.mp4"); kb=$((s / 1024))
  flag=ok; [[ $s -gt 2097152 ]] && { flag=OVER-2MB; over=$((over + 1)); }
  printf '%-30s %4dpx %6d KB mp4  %6d KB webm  %s\n' "$n" "$w" "$kb" "$(( $(stat -f %z "$OUT/$n.webm") / 1024 ))" "$flag"
done

# Stills that have no clip of their own (notes, episode songs).
for p in "$SRC"/*.png; do
  n=$(basename "$p" .png)
  [[ -n "$ONLY" && "$n" != "$ONLY" ]] && continue
  [[ -f "$SRC/$n.mp4" ]] && continue
  w=$(width "$n")
  ffmpeg -v error -y -i "$p" -vf "scale=$w:-2" -q:v 3 "$OUT/$n.jpg"
  printf '%-30s %4dpx still\n' "$n" "$w"
done

echo "media: $(ls "$OUT"/*.mp4 | wc -l | tr -d ' ') clips, $over over 2 MB"
[[ $over -eq 0 ]]
```

- [ ] **Step 2: Run it**

```bash
chmod +x scripts/media-encode.sh
scripts/media-encode.sh 2>&1 | tail -45
ls public/media | wc -l
du -sh public/media
ls public/media | grep -c nowplaying     # must be 3 (blurred mp4, webm, jpg), never 6
```

Expected: 37 clips encoded, every mp4 under 2 MB (if one is over, re-run that scene with `-crf 26`: `ffmpeg ... -crf 26 ...` by editing the script's crf for that device class and note it in the commit), two stills, total well under 60 MB. Takes about 10 minutes.

- [ ] **Step 3: Check one clip of each device visually**

```bash
ffprobe -v error -show_entries stream=width,height:format=duration -of csv=p=0 public/media/iphone-songid.mp4 public/media/mac-transcript.mp4 public/media/tv-songid.mp4 public/media/carplay-favorites.mp4 public/media/watch-songid.mp4
```

Expected: widths 600, 1200, 1280, 1280, 600; durations equal to the sources. Open `public/media/iphone-songid.jpg` and `public/media/carplay-nowplaying-blurred.jpg` with the Read tool and confirm the poster is the last frame and the cover is blurred.

- [ ] **Step 4: Commit**

```bash
git add scripts/media-encode.sh public/media
git commit -m "v2: web-size showcase clips and posters in public/media (37 clips, 2 stills)"
```

### Task 10: Dated counts and the claims register

**Files:**
- Create: `scripts/counts.sh`, `src/data/counts.json`, `src/data/claims.md`

- [ ] **Step 1: Write `scripts/counts.sh`**

```zsh
#!/bin/zsh
# Writes src/data/counts.json: station count from the Radio Browser directory
# (dir.macdio.app mirrors it) and the podcast count from Podcast Index, with
# the date. Pages print these with "as of <date>", never a bare round number.
set -euo pipefail
OUT=$(cd "$(dirname "$0")/.." && pwd)/src/data/counts.json
UA='macdio.app site build (counts)'
stations=$(curl -sf -A "$UA" https://de1.api.radio-browser.info/json/stats || curl -sf -A "$UA" https://dir.macdio.app/json/stats)
stations=$(printf '%s' "$stations" | python3 -c 'import json,sys; print(json.load(sys.stdin)["stations"])')
key=$(cat ~/.podcastindex/api-key); secret=$(cat ~/.podcastindex/secret); now=$(date +%s)
auth=$(printf '%s%s%s' "$key" "$secret" "$now" | shasum -a 1 | cut -d' ' -f1)
podcasts=$(curl -sf https://api.podcastindex.org/api/1.0/stats/current -A "$UA" \
  -H "X-Auth-Key: $key" -H "X-Auth-Date: $now" -H "Authorization: $auth" \
  | python3 -c 'import json,sys; print(json.load(sys.stdin)["stats"]["feedCountTotal"])')
printf '{\n  "stations": %s,\n  "podcasts": %s,\n  "checkedOn": "%s"\n}\n' "$stations" "$podcasts" "$(date +%F)" > "$OUT"
cat "$OUT"
```

- [ ] **Step 2: Run it**

```bash
chmod +x scripts/counts.sh && scripts/counts.sh
```

Expected: a JSON file with two integers (stations in the tens of thousands, podcasts in the millions) and today's date. If Podcast Index refuses (401), check that `~/.podcastindex/api-key` and `secret` have no trailing newline problems: `wc -c ~/.podcastindex/*`.

- [ ] **Step 3: Write `src/data/claims.md`**

```md
# Claims register

Every concrete capability, platform, format, limit, number and price the site
states appears here with the file or screen in the app repo
(`~/Developments/Dev/shortwave`) that implements it and the date it was read.
A sentence with no entry here does not ship. "Not implemented" entries exist so
nobody adds the claim later by accident.

Status values: verified (read in code on the date), not implemented, open (to
read before the page that needs it is written).

| Claim | Where it is implemented | Status | Date |
| -- | -- | -- | -- |
| Platforms: iPhone, iPad, Mac (native), Apple TV, Apple Watch, CarPlay | targets Macdio, MacdioiOS, MacdioTV, MacdioWatch; `MacdioiOS/App/CarPlaySceneDelegate.swift` | verified | 2026-10-12 |
| One Universal Purchase covers every platform, no subscription | bundle id com.macdio.app on all targets (CLAUDE.md), price per territory in `public/pricing.json` | verified | 2026-10-12 |
| Song identification from the stream without the microphone | `Macdio/Services/Audio/ShazamService.swift` (ShazamKit on decoded stream audio) | verified | 2026-10-12 |
| Split-track live radio recording | `Macdio/Services/Recording/RecordingService.swift`, `StreamRecorder.swift` | verified | 2026-10-12 |
| Synced lyrics on live radio | `Macdio/Services/Lyrics/LyricsService.swift` (LRCLIB) | verified | 2026-10-12 |
| On-device podcast transcripts | `Macdio/Services/Podcast/` transcription (Speech framework); languages: open | open | |
| Highlights to Apple Notes, Notion, Obsidian, Bear, Craft, Readwise | commit 5f91b0a in macdio-web names six; confirm each destination in app code | open | |
| Highlights by Siri | open | open | |
| Chapters, episode summary, transcript search | showcase clips exist (iphone-chapters, iphone-summary, iphone-transcript-search); read the code before stating details | open | |
| Up Next holds a live station next to an episode | `ShowcaseRuntime.swift` comment on #227 | verified | 2026-10-12 |
| Apple Watch standalone playback | MacdioWatch target; confirm cellular streaming without the phone | open | |
| Apple TV Top Shelf | `com.macdio.app.MacdioTopShelf` extension (CLAUDE.md) | verified | 2026-10-12 |
| Clock Mode bedside radio (iOS only) | memory project_clock_mode (builds 133 to 141); alarm: open | open | |
| Menu bar player (Mac only) | showcase clip mac-menubar; code path: open | open | |
| Importing favourites from TuneIn, myTuner or Broadcasts | open; likely not implemented | open | |
| OPML import and export of podcast subscriptions | open | open | |
| Station count | `src/data/counts.json` stations, dated | verified by script | run date |
| Podcast count | `src/data/counts.json` podcasts, dated | verified by script | run date |
| Own station directory dir.macdio.app used when Radio Browser does not answer | tracker #561, memory reference_dir_macdio_app | verified | 2026-10-12 |
| No account, no ads, no tracking in the app | open: confirm analytics SDKs absent in the app (grep for third-party SDKs) | open | |
| Android or web version | not implemented | not implemented | 2026-10-12 |
```

- [ ] **Step 4: Commit**

```bash
git add scripts/counts.sh src/data/counts.json src/data/claims.md
git commit -m "v2: dated station and podcast counts, claims register for every statement the site makes"
```

### Task 11: Hallmark audit of the live site

**Files:**
- Create: `docs/research/2026-10-12-hallmark-audit.md`

- [ ] **Step 1: Run the audit**

Invoke the `hallmark` skill with `audit https://macdio.app` (read only). Before the skill's rules are applied, read the open observations that name it:

```bash
grep -l "skill:.*hallmark" /Users/xfn/.claude/skill-observations/observation-log/*.md
```

and apply 0001 (fixed-element centring), 0003 (capture audit), 0004 (claims against code) to the audit's findings.

- [ ] **Step 2: Save the punch list**

Write the ranked punch list the skill returns to `docs/research/2026-10-12-hallmark-audit.md` with a short header (date, URL, what was scored). No em dash, no `---`.

- [ ] **Step 3: Commit**

```bash
git add docs/research/2026-10-12-hallmark-audit.md
git commit -m "Research: Hallmark audit of the live macdio.app before the redesign"
```

### Task 12: Developer notes and the F1 wrap

**Files:**
- Create: `docs/dev.md`
- Modify: `docs/feature-requests.md` (W1 progress line)

- [ ] **Step 1: Write `docs/dev.md`**

```md
# macdio.app v2: how to build, test and deploy

Branch `v2` until launch. Node 26.

- `npm install` once.
- `npm run dev`: local preview at http://127.0.0.1:4321/ with live reload (English only
  unless `LIVE_ALL=1 npm run dev`).
- `npm test`: unit tests for the Worker, locale paths, sitemap and i18n check.
- `npm run build`: Astro build into `dist/`, then sitemap, hreflang check, link check,
  i18n check. Any failure stops the build.
- `npx wrangler dev --port 8787`: the real Worker in front of `dist/` for redirect tests:
  `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' -H 'Accept-Language: tr' http://127.0.0.1:8787/`
- `SKIP_WWW=1 bash scripts/check-public.sh http://127.0.0.1:8787`: the leak check against
  the local server.
- `scripts/media-encode.sh`: regenerates `public/media/` from the showcase clips.
- `scripts/counts.sh`: refreshes `src/data/counts.json` (run before a release).
- Deploy (only after Sait's "tamam", from `main` after merging `v2`):
  `npm run build && npx wrangler deploy && bash scripts/check-public.sh`.
- Rollback: `npx wrangler rollback`.

Languages go live by setting `live: true` in `src/site/locales.mjs` once
`src/i18n/<code>.json` is complete (`node scripts/i18n-check.mjs` passes).
```

- [ ] **Step 2: Tracker line**

In `docs/feature-requests.md`, under W1, append:

```md
  F1 foundation done on branch `v2` (2026-10-12): Astro + Starlight skeleton, 33 marketing
  routes in every live locale, Worker language redirect with tests, sitemap with hreflang,
  hreflang/link/i18n checks in the build, web-size media, counts, claims register,
  Hallmark audit. Not deployed. Next: F2 English design.
```

- [ ] **Step 3: Final F1 verification**

```bash
npm test 2>&1 | tail -3
npm run build 2>&1 | tail -5
LIVE_ALL=1 npm run build 2>&1 | tail -5
git status --short | wc -l
git log origin/v2..v2 --oneline | wc -l
```

Expected: tests pass, both builds end in four `ok` lines, working tree clean, 0 unpushed commits.

- [ ] **Step 4: Commit**

```bash
git add docs/dev.md docs/feature-requests.md
git commit -m "v2: developer notes; tracker W1 F1 done"
```
