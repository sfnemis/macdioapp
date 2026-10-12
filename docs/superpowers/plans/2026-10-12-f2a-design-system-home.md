# F2a Design System and Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the macdio.app v2 design system (tokens, base styles, nav, footer, media figure, hub feed) and the English home page as a Workbench-style guided tour of the app, locally, for Sait's first review gate.

**Architecture:** Hallmark-driven design on the F1 Astro skeleton: a custom OKLCH theme anchored on the brand indigo with light and dark papers, system font stack, zero-JS marketing pages except three small inline scripts (theme and language switcher, lazy clip loader, menu close). Components live in `src/components/`, every colour and font comes from `src/styles/tokens.css`, build-time data (counts, prices, hub feed, media manifest) lives in `src/data/`, and a new `check-css.mjs` gate fails the build on inline colours or fonts.

**Tech Stack:** Astro 7.3, Starlight 0.42 (guides only), Node 26, ffprobe (media manifest), Discourse JSON API (hub feed at build time, cached in the repo), Playwright MCP and chrome-devtools MCP for the visual and Lighthouse checks.

**Spec:** `docs/superpowers/specs/2026-10-12-macdio-web-v2-design.md` (sections 5, 7, 8, 9, 11). Inputs: `docs/research/2026-10-12-keywords-and-serps.md` (page map, GEO rules, FAQ wording), `docs/research/2026-10-12-competitors.md`, `docs/research/2026-10-12-hallmark-audit.md`, `docs/research/2026-10-12-feature-inventory.md` (feature claims with code evidence), `src/data/claims.md`.

## Hallmark decisions (the design flow, decided here so every task builds the same page)

Pre-flight findings: Astro 7 (astro.config.mjs L1), tokens in `src/styles/tokens.css` (F1 placeholder, replaced in Task 1), system font stack, no motion library (motion-cut), spacing placeholder. Hallmark preserves: the Astro layout and route files, the system font decision (spec 4 and 7). Hallmark introduces: the custom theme, macrostructures per template, nav and footer archetypes, slop-test gates.

Going with (Sait's answers of 2026-10-12 17:13 plus inference): audience = Apple-device listeners who want radio and podcasts in one app without a subscription, plus searchers arriving from Google who decide here and buy on the App Store; use = the App Store download, with the community hub a close second; tone = technical (precise, measured, every claim verifiable), the voice of one developer moving toward professional. Genre: modern-minimal (brand colour named, restrained brief). Theme route: custom, tuned (brand colour signal), vibe "precise, calm, indigo, honest, one person", anchor `#6366f1` = `oklch(58.5% 0.204 277)`.

Macrostructures (one per template, structural variety across the site):

| Template | Macrostructure | Why |
| -- | -- | -- |
| home | 05 Workbench | 37 real captures exist; the sale is seeing the app work |
| platform (iPhone, iPad, Mac, Apple TV, Apple Watch, CarPlay) | 16 Feature Stack (CSS sticky, no scroll JS) | per-device feature story, captures per device |
| feature (5) | 14 Narrative Workflow | each feature is a real sequence (stream, identify, save) |
| compare (6) | 06 Conversational FAQ with an F3 spec table | the research's page-one questions are the structure |
| pricing | 04 Stat-Led | the price is a real, dated number |
| podcasts | 01 Bento Grid | many small podcast features, each with a clip |
| plain (support, privacy ×5, transparency, accessibility, community, press kit, submit station) | 02 Long Document | prose pages |
| stations | 13 Index-First | a search tool and a list |

Nav: N11 mega-menu panel built on `<details>` (Platforms, Features, plus Guides, Pricing, Community links, App Store button, language and theme). Footer: Ft5 Statement (one closing sentence, wordmark, link row, copyright). Section heads: S2 Hanging, no eyebrows anywhere. CTAs: filled accent-strong for the App Store, C1 outlined chip secondary, C3 typographic links inside prose. Proof: T4 numbered stat strip with dated real counts. Enrichment: real captures in `<figure>` with a hairline border, no drawn chrome. Motion: none on load; clip autoplay when visible; reduced motion shows posters.

Stamp for `src/styles/site.css` (first line):

```css
/* Hallmark · genre: modern-minimal · macrostructure: Workbench (home) · H2 split knobs: ratio=7/5, right=capture, divider=negative-space
 * theme: custom · vibe: "precise, calm, indigo, honest, one person" · paper: oklch(98.5% 0.006 277) / dark oklch(13% 0.012 277) · accent: oklch(54% 0.19 277) / dark oklch(74% 0.15 277)
 * display: system stack (SF, Segoe, Roboto) · body: same · axes: light / system-native / cool · nav: N11 · footer: Ft5
 * studied: no · context: user-provided · 2026-10-12 */
```

Ruling on fonts (recorded for the Hallmark gate that bans system-ui as display): the spec fixes the system stack for 14 languages including Arabic, Japanese and both Chinese scripts, where a Latin web font would not apply; hierarchy comes from the 1.25 scale, weights 300 against 700, measure and colour. Sait can opt into a Latin display face later; it would be one `@font-face` and one token change.

## Global Constraints

- Everything from the F1 plan's Global Constraints still holds (branch `v2`, Node 26, `build.format: 'file'`, 14 locales, only `en` live, text rules: no em dash, no `---`, no we/our/us, commit messages plain English, nothing deploys).
- Every colour and every `font-family` in any `.astro` or `.css` file references a token from `src/styles/tokens.css`; `scripts/check-css.mjs` fails the build otherwise. Exceptions: `tokens.css` itself and `starlight.css` mappings.
- Marketing pages ship no external scripts and at most three inline scripts: theme and language (Base/switchers), lazy clip loader (`Clip.astro`, once per page), menu close (`Nav.astro`). `check-scripts.mjs` already blocks external scripts.
- Every clip or still used on a page comes from `src/data/media.json` (the manifest) and `public/media/`; width and height attributes come from the manifest.
- Every factual sentence on the home page traces to a row in `src/data/claims.md` (status verified) or to `src/data/counts.json`, `public/pricing.json`, `src/data/hub.json` with their dates. No testimonials, no logo wall, no invented numbers (slop-test gate 46).
- Copy goes through the humanizer skill before it enters `src/i18n/en.json` (global rule for published text).
- Mobile floor: 320, 375, 414, 768 px with no horizontal scroll, no wrapped clickable text, `overflow-wrap: anywhere` on display heads, `minmax(0, 1fr)` on image tracks.
- Deletions: none in F2a; `old-site/` stays until F2c.

## Review Focus

1. JavaScript disabled or failed: the nav opens as a plain `<details>` list, clips show their posters, the page follows `prefers-color-scheme` with no theme script. Test in Task 2 (CSS fallback) and Task 3 (noscript behaviour of the figure).
2. `prefers-reduced-motion: reduce`: no clip autoplays, the poster stays, no transitions longer than 150 ms. Test in Task 3.
3. A clip referenced from a page that is missing from the manifest or from `public/media/`: the build fails with the clip name, never a broken video. Test in Task 3.
4. The hub is unreachable at build time: the build passes using the committed `src/data/hub.json` and the page states that file's date. Test in Task 4.
5. 320 px: the stat strip, the nav button row and the App Store button never wrap or overflow; measured by `scrollWidth` in the browser, not by eye. Test in Task 7.

### Task 1: Tokens, base styles, CSS gate

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/site.css`, `src/styles/starlight.css`
- Create: `scripts/check-css.mjs`, `tests/check-css.test.mjs`, `.hallmark/log.json`
- Modify: `package.json` (build chain), `.gitignore` (keep `.hallmark/` committed: nothing to add)

**Interfaces:**
- Produces: token names used by every later task: `--color-paper`, `--color-paper-2`, `--color-paper-3`, `--color-ink`, `--color-ink-2`, `--color-muted`, `--color-rule`, `--color-rule-2`, `--color-accent`, `--color-accent-strong`, `--color-accent-ink`, `--color-focus`; `--font-body`, `--font-display`, `--font-mono`; `--text-xs … --text-4xl`, `--text-display`, `--text-display-s`; `--space-3xs … --space-4xl`; `--radius-sm` (6px), `--radius-md` (10px); `--rule-hair` (1px); `--ease-out`, `--ease-in`, `--ease-in-out`; `--dur-micro`, `--dur-short`, `--dur-long`; `--z-base … --z-tooltip`; `--page-max` (72rem), `--page-gutter` (clamp(1rem, 4vw, 2.5rem)), `--measure` (65ch). Class names: `.wrap`, `.btn`, `.btn--fill`, `.btn--chip`, `.link`, `.prose`, `.tnum`, `.head-hang`, `.visually-hidden`.

- [ ] **Step 1: Write the failing test for the CSS gate**

`tests/check-css.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
const { cssProblems } = await import('../scripts/check-css.mjs');

test('token references pass, raw colours and font families fail', () => {
  assert.deepEqual(cssProblems('a { color: var(--color-accent); font-family: var(--font-body); }', 'x.css'), []);
  const p = cssProblems('a { color: #6366f1; background: rgb(1 2 3); border-color: oklch(50% 0.1 277); font-family: "Geist", sans-serif; }', 'x.css');
  assert.equal(p.length, 4);
  assert.match(p[0], /x\.css: #6366f1/);
  assert.match(p[3], /font-family/);
});

test('transparent, currentColor, inherit and alpha-only values are allowed', () => {
  assert.deepEqual(cssProblems('a { color: currentColor; background: transparent; border-color: inherit; box-shadow: 0 1px 2px oklch(from var(--color-ink) l c h / 0.05); }', 'x.css'), []);
});

test('astro style blocks and style attributes are scanned too', () => {
  const astro = '<div style="color:#fff"></div>\n<style>\n.x { color: var(--color-ink); }\n.y { background: #000; }\n</style>';
  const p = cssProblems(astro, 'C.astro');
  assert.equal(p.length, 2);
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/check-css.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `scripts/check-css.mjs`**

```js
// Hallmark discipline 3: every colour and font on the site comes from
// src/styles/tokens.css. Scans .css and .astro files under src/ (style blocks,
// style attributes and class-less inline CSS) for raw colour values and
// font-family declarations that bypass the tokens.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAW_COLOUR = /(#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\((?!\s*from\s)[^)]*\))/gi;
const FONT = /font-family\s*:\s*(?!var\(--font-)[^;}]+/gi;
const EXEMPT = new Set(['src/styles/tokens.css', 'src/styles/starlight.css']);

export function cssProblems(text, file) {
  const problems = [];
  for (const m of text.matchAll(RAW_COLOUR)) problems.push(`${file}: ${m[1]} is not a token`);
  for (const m of text.matchAll(FONT)) problems.push(`${file}: ${m[0].trim()} bypasses the font tokens`);
  return problems;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  let problems = [];
  for (const f of walk(join(root, 'src'))) {
    const rel = relative(root, f);
    if (!/\.(css|astro)$/.test(rel) || EXEMPT.has(rel)) continue;
    problems = problems.concat(cssProblems(readFileSync(f, 'utf8'), rel));
  }
  for (const p of problems) console.error(p);
  console.log(problems.length ? `check-css: ${problems.length} problem(s)` : 'check-css: ok, every colour and font is a token');
  process.exit(problems.length ? 1 : 0);
}
```

- [ ] **Step 4: Run the test, expect pass**

Run: `node --test tests/check-css.test.mjs`
Expected: 3 passing.

- [ ] **Step 5: Write `src/styles/tokens.css`**

```css
/* macdio.app v2 tokens. Every colour and font on the site is one of these.
   Light paper by default; dark paper under the data-theme attribute set by the
   theme script, and under prefers-color-scheme when no script ran. */
:root {
  --font-body: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;

  --text-xs: 0.8rem;
  --text-sm: 0.9rem;
  --text-base: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.5625rem;
  --text-xl: 1.9531rem;
  --text-2xl: 2.4414rem;
  --text-3xl: 3.0518rem;
  --text-4xl: 3.8147rem;
  --text-display: clamp(2.5rem, 4.5vw + 1rem, 4.75rem);
  --text-display-s: clamp(2rem, 3.5vw + 0.75rem, 3.5rem);

  --space-3xs: 0.125rem;
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 9rem;

  --radius-sm: 6px;
  --radius-md: 10px;
  --rule-hair: 1px;
  --page-max: 72rem;
  --page-gutter: clamp(1rem, 4vw, 2.5rem);
  --measure: 65ch;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --dur-long: 420ms;

  --z-base: 1;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;

  /* light paper, indigo-tinted neutrals (hue 277) */
  --color-paper: oklch(98.5% 0.006 277);
  --color-paper-2: oklch(96% 0.008 277);
  --color-paper-3: oklch(93% 0.010 277);
  --color-ink: oklch(20% 0.012 277);
  --color-ink-2: oklch(34% 0.012 277);
  --color-muted: oklch(48% 0.012 277);
  --color-rule: oklch(86% 0.010 277);
  --color-rule-2: oklch(91% 0.008 277);
  --color-accent: oklch(54% 0.19 277);
  --color-accent-strong: oklch(47% 0.20 277);
  --color-accent-ink: oklch(98.5% 0.006 277);
  --color-focus: oklch(56% 0.22 277);
  color-scheme: light;
}

:root[data-theme="dark"] {
  --color-paper: oklch(13% 0.012 277);
  --color-paper-2: oklch(17% 0.014 277);
  --color-paper-3: oklch(22% 0.014 277);
  --color-ink: oklch(94% 0.008 277);
  --color-ink-2: oklch(80% 0.010 277);
  --color-muted: oklch(66% 0.012 277);
  --color-rule: oklch(30% 0.014 277);
  --color-rule-2: oklch(24% 0.012 277);
  --color-accent: oklch(74% 0.15 277);
  --color-accent-strong: oklch(80% 0.12 277);
  --color-accent-ink: oklch(13% 0.012 277);
  --color-focus: oklch(76% 0.19 277);
  color-scheme: dark;
}

/* Without JavaScript the system preference decides. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-paper: oklch(13% 0.012 277);
    --color-paper-2: oklch(17% 0.014 277);
    --color-paper-3: oklch(22% 0.014 277);
    --color-ink: oklch(94% 0.008 277);
    --color-ink-2: oklch(80% 0.010 277);
    --color-muted: oklch(66% 0.012 277);
    --color-rule: oklch(30% 0.014 277);
    --color-rule-2: oklch(24% 0.012 277);
    --color-accent: oklch(74% 0.15 277);
    --color-accent-strong: oklch(80% 0.12 277);
    --color-accent-ink: oklch(13% 0.012 277);
    --color-focus: oklch(76% 0.19 277);
    color-scheme: dark;
  }
}
```

Contrast (computed 2026-10-12): ink on paper 17.3:1, muted 6.3:1, accent 5.1:1, paper on accent-strong 7.1:1; dark: ink 16.9:1, muted 6.5:1, accent 8.4:1.

- [ ] **Step 6: Write `src/styles/site.css`** (replaces the F1 file; stamp on line 1)

```css
/* Hallmark · genre: modern-minimal · macrostructure: Workbench (home) · H2 split knobs: ratio=7/5, right=capture, divider=negative-space
 * theme: custom · vibe: "precise, calm, indigo, honest, one person" · paper: oklch(98.5% 0.006 277) / dark oklch(13% 0.012 277) · accent: oklch(54% 0.19 277) / dark oklch(74% 0.15 277)
 * display: system stack (SF, Segoe, Roboto) · body: same · axes: light / system-native / cool · nav: N11 · footer: Ft5
 * studied: no · context: user-provided · 2026-10-12 */

*, *::before, *::after { box-sizing: border-box; }
html, body { overflow-x: clip; }
html { -webkit-text-size-adjust: 100%; scroll-padding-block-start: var(--space-xl); }
body {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.55;
  color: var(--color-ink);
  background: var(--color-paper);
  padding-inline: max(0px, env(safe-area-inset-left)) max(0px, env(safe-area-inset-right));
}
:root[data-theme="dark"] body { font-weight: 350; }

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-style: normal;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;
  min-inline-size: 0;
  margin: 0;
}
h1 { font-size: var(--text-display); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-lg); }
p { margin: 0; }
p + p { margin-block-start: var(--space-md); }
a { color: var(--color-accent); text-decoration-thickness: 1px; text-underline-offset: 0.15em; }
a:hover { color: var(--color-accent-strong); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
img, video { max-width: 100%; height: auto; display: block; }
figure { margin: 0; }
strong { font-weight: 700; }
small, .small { font-size: var(--text-sm); }
.muted { color: var(--color-muted); }
.tnum { font-variant-numeric: tabular-nums; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.wrap { max-inline-size: var(--page-max); margin-inline: auto; padding-inline: var(--page-gutter); }
.prose { max-inline-size: var(--measure); line-height: 1.65; }
.prose h2 { margin-block: var(--space-2xl) var(--space-md); }
.prose h3 { margin-block: var(--space-xl) var(--space-sm); }
.prose ul, .prose ol { padding-inline-start: 1.2em; }
.prose li + li { margin-block-start: var(--space-xs); }
.prose table { border-collapse: collapse; inline-size: 100%; }
.prose th, .prose td { text-align: start; padding: var(--space-sm) var(--space-xs); border-block-end: var(--rule-hair) solid var(--color-rule); vertical-align: top; }
.prose th { font-weight: 600; }

.head-hang { padding-block: var(--space-3xl) var(--space-lg); }
.head-hang p { max-inline-size: var(--measure); color: var(--color-ink-2); margin-block-start: var(--space-sm); font-size: var(--text-md); }

.btn {
  display: inline-flex; align-items: center; gap: 0.5em;
  min-block-size: 44px; padding: 0.65rem 1.1rem;
  border-radius: var(--radius-sm); border: var(--rule-hair) solid var(--color-ink);
  color: var(--color-ink); background: transparent; text-decoration: none; white-space: nowrap;
  font-weight: 600; font-size: var(--text-base); line-height: 1;
  transition: transform var(--dur-micro) var(--ease-out), background-color var(--dur-micro) var(--ease-out);
}
.btn:hover { transform: translateY(-1px); color: var(--color-ink); }
.btn:active { transform: translateY(0); }
.btn--fill { background: var(--color-accent-strong); border-color: var(--color-accent-strong); color: var(--color-accent-ink); }
.btn--fill:hover { color: var(--color-accent-ink); }
.btn--chip { border-color: var(--color-rule); }
.link { color: var(--color-ink); text-decoration: underline; text-decoration-color: var(--color-rule); text-underline-offset: 0.2em; white-space: nowrap; }
.link:hover { text-decoration-color: var(--color-accent); color: var(--color-ink); }

.skip { position: absolute; inset-block-start: -100%; inset-inline-start: var(--space-md); z-index: var(--z-toast); background: var(--color-paper-2); padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); }
.skip:focus { inset-block-start: var(--space-xs); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 150ms !important; animation-iteration-count: 1 !important; transition-duration: 150ms !important; }
}
```

- [ ] **Step 7: Write `src/styles/starlight.css`** (maps Starlight to the tokens; F3 extends)

```css
:root {
  --sl-font: var(--font-body);
  --sl-color-accent-low: var(--color-paper-2);
  --sl-color-accent: var(--color-accent);
  --sl-color-accent-high: var(--color-accent-strong);
  --sl-color-white: var(--color-ink);
  --sl-color-gray-1: var(--color-ink-2);
  --sl-color-gray-2: var(--color-muted);
  --sl-color-gray-3: var(--color-muted);
  --sl-color-gray-4: var(--color-rule);
  --sl-color-gray-5: var(--color-rule-2);
  --sl-color-gray-6: var(--color-paper-2);
  --sl-color-black: var(--color-paper);
  --sl-color-bg: var(--color-paper);
  --sl-color-bg-nav: var(--color-paper);
  --sl-color-bg-sidebar: var(--color-paper-2);
  --sl-color-text: var(--color-ink);
  --sl-color-text-accent: var(--color-accent);
  --sl-text-base: var(--text-base);
}
:root[data-theme="dark"] {
  --sl-color-white: var(--color-ink);
  --sl-color-black: var(--color-paper);
}
```

- [ ] **Step 8: Write `.hallmark/log.json`** (project memory the skill reads on the next run)

```json
[
  { "date": "2026-10-12", "macrostructure": "Workbench", "theme": "custom", "theme_axes": "light / system-native / cool", "vibe": "precise, calm, indigo, honest, one person", "enrichment": "real captures in figures", "brief": "macdio.app v2 home page, radio and podcast app for Apple devices" }
]
```

- [ ] **Step 9: Add the gate to the build chain and run everything**

In `package.json` insert `node scripts/check-css.mjs && ` before `node scripts/i18n-check.mjs`. Then:

```bash
npm test 2>&1 | grep -E "^ℹ (tests|pass|fail)"
npm run build 2>&1 | tail -7
```

Expected: tests pass (27); the build ends with sitemap, check-hreflang, check-links, check-scripts, check-legacy, check-css, i18n-check all `ok`. If check-css reports the F1 `site.css` or component colours (`#ffffff` theme-color metas are HTML attributes, not CSS, and are not scanned), replace them with tokens.

- [ ] **Step 10: Commit**

```bash
git add src/styles tests/check-css.test.mjs scripts/check-css.mjs package.json .hallmark/log.json
git commit -m "v2: design tokens (custom indigo theme, light and dark), base styles, CSS token gate in the build"
```

### Task 2: Nav (N11 on details) and footer (Ft5 Statement)

**Files:**
- Modify: `src/components/Nav.astro`, `src/components/Footer.astro`, `src/components/LangSwitcher.astro`, `src/components/ThemeToggle.astro`, `src/layouts/Base.astro`, `src/i18n/en.json` (nav and footer keys)
- Create: `src/components/AppStoreButton.astro`

**Interfaces:**
- Consumes: tokens and classes from Task 1; `t(lang)`, `localePath`, `liveLocales`.
- Produces: `en.json` keys `nav.platforms`, `nav.features`, `nav.menu`, `nav.appStore`, `nav.platformItems[]` and `nav.featureItems[]` (each `{ label, blurb, path }`), `footer.statement`, `footer.links[]` (`{ label, path }`), `footer.madeBy`. `AppStoreButton.astro` props `{ lang, variant: 'fill' | 'chip' }` rendering the store link with the label from `nav.appStore`.

- [ ] **Step 1: Add the strings to `src/i18n/en.json`**

Replace the `nav` and `footer` objects:

```json
"nav": {
  "skip": "Skip to content",
  "menu": "Menu",
  "platforms": "Devices",
  "features": "Features",
  "guides": "Guides",
  "pricing": "Pricing",
  "community": "Community",
  "appStore": "Get it on the App Store",
  "language": "Language",
  "theme": "Switch between light and dark",
  "platformItems": [
    { "label": "iPhone", "blurb": "Radio, podcasts, Clock Mode, widgets", "path": "/iphone.html" },
    { "label": "iPad", "blurb": "Full-screen lyrics and transcripts", "path": "/ipad.html" },
    { "label": "Mac", "blurb": "Native app with a menu bar player", "path": "/mac.html" },
    { "label": "Apple TV", "blurb": "Radio and podcasts on the big screen", "path": "/apple-tv.html" },
    { "label": "Apple Watch", "blurb": "Plays on its own, no phone needed", "path": "/apple-watch.html" },
    { "label": "CarPlay", "blurb": "Favourites and Song ID in the car", "path": "/carplay.html" }
  ],
  "featureItems": [
    { "label": "Podcast transcripts", "blurb": "Made on your device, any episode", "path": "/features/podcast-transcripts.html" },
    { "label": "Highlights", "blurb": "Save a moment to your notes app", "path": "/features/highlights.html" },
    { "label": "Song ID", "blurb": "From the stream, no microphone", "path": "/features/song-id.html" },
    { "label": "Recording", "blurb": "Live radio, split into tracks", "path": "/features/recording.html" },
    { "label": "Synced lyrics", "blurb": "Lined up with the live stream", "path": "/features/synced-lyrics.html" },
    { "label": "Podcasts", "blurb": "4.7 million shows, one purchase", "path": "/podcasts.html" }
  ]
},
"footer": {
  "statement": "One purchase. No account, no ads, no subscription.",
  "madeBy": "Made by Sait Firat NEMIS.",
  "rights": "All rights reserved.",
  "links": [
    { "label": "Support", "path": "/support.html" },
    { "label": "Guides", "path": "/guides/" },
    { "label": "Stations", "path": "/stations.html" },
    { "label": "Submit a station", "path": "/submit-station.html" },
    { "label": "Press kit", "path": "/presskit.html" },
    { "label": "Privacy", "path": "/privacy.html" },
    { "label": "Transparency", "path": "/transparency.html" },
    { "label": "Accessibility", "path": "/accessibility.html" },
    { "label": "Community", "path": "/community.html" }
  ]
}
```

Every blurb is checked against `docs/research/2026-10-12-feature-inventory.md` before this step is committed; a blurb whose feature is "NOT FOUND" there is replaced with a verified one. The watch blurb "Plays on its own, no phone needed" ships only if the inventory confirms standalone playback; otherwise "Radio on your wrist".

- [ ] **Step 2: Write `src/components/AppStoreButton.astro`**

```astro
import { t } from '../i18n/index.mjs';
const { lang, variant = 'fill' } = Astro.props;
const s = t(lang);
<a class={`btn btn--${variant}`} href="https://apps.apple.com/app/macdio/id6761737888" rel="noopener">{s.nav.appStore}</a>
```

- [ ] **Step 3: Write `src/components/Nav.astro`** (N11 mega-menu on `<details>`, two panels, no library)

```astro
import { localePath } from '../site/paths.mjs';
import { t } from '../i18n/index.mjs';
import LangSwitcher from './LangSwitcher.astro';
import ThemeToggle from './ThemeToggle.astro';
import AppStoreButton from './AppStoreButton.astro';
const { lang, path } = Astro.props;
const s = t(lang);
const p = (english) => localePath(lang, english);
const groups = [
  { key: 'platforms', label: s.nav.platforms, items: s.nav.platformItems },
  { key: 'features', label: s.nav.features, items: s.nav.featureItems },
];
<header class="nav wrap">
  <a class="skip" href="#main">{s.nav.skip}</a>
  <div class="nav__bar">
    <a class="nav__brand" href={p('/')}><img src="/icon-192.png" alt="" width="28" height="28"><span>{s.site.name}</span></a>
    <nav class="nav__groups" aria-label={s.nav.menu}>
      {groups.map((g) => (
        <details class="mega" name="mega">
          <summary class="nav__link">{g.label}</summary>
          <div class="mega__panel">
            <ul class="mega__list">
              {g.items.map((it) => (
                <li><a class="mega__item" href={p(it.path)}><b>{it.label}</b><span class="muted">{it.blurb}</span></a></li>
              ))}
            </ul>
          </div>
        </details>
      ))}
      <a class="nav__link" href={p('/guides/')}>{s.nav.guides}</a>
      <a class="nav__link" href={p('/pricing.html')}>{s.nav.pricing}</a>
      <a class="nav__link" href="https://hub.devdio.pro" rel="noopener">{s.nav.community}</a>
    </nav>
    <div class="nav__right">
      <ThemeToggle lang={lang} />
      <details class="mega mega--tools" name="mega">
        <summary class="nav__link" aria-label={s.nav.language}>{lang.toUpperCase()}</summary>
        <div class="mega__panel mega__panel--narrow"><LangSwitcher lang={lang} path={path} /></div>
      </details>
      <AppStoreButton lang={lang} variant="fill" />
    </div>
  </div>
</header>
<script is:inline>
  // Close an open menu panel on outside click or Escape. The menu works
  // without this (details/summary); this only adds the expected dismissal.
  document.addEventListener('click', (e) => {
    document.querySelectorAll('details.mega[open]').forEach((d) => { if (!d.contains(e.target)) d.removeAttribute('open'); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('details.mega[open]').forEach((d) => d.removeAttribute('open'));
  });
</script>
<style>
  .nav { position: relative; z-index: var(--z-dropdown); }
  .nav__bar { display: flex; align-items: center; gap: var(--space-lg); padding-block: var(--space-md); border-block-end: var(--rule-hair) solid var(--color-rule-2); }
  .nav__brand { display: inline-flex; align-items: center; gap: var(--space-xs); color: var(--color-ink); text-decoration: none; font-weight: 700; white-space: nowrap; }
  .nav__brand img { border-radius: var(--radius-sm); }
  .nav__groups { display: none; align-items: center; gap: var(--space-md); }
  .nav__right { margin-inline-start: auto; display: flex; align-items: center; gap: var(--space-sm); }
  .nav__link { color: var(--color-ink-2); text-decoration: none; white-space: nowrap; cursor: pointer; list-style: none; padding: var(--space-xs) var(--space-2xs); border-radius: var(--radius-sm); }
  .nav__link::-webkit-details-marker { display: none; }
  .nav__link:hover { color: var(--color-ink); }
  .mega { position: relative; }
  .mega[open] > .nav__link { color: var(--color-ink); }
  .mega__panel { position: absolute; inset-inline-start: 0; inset-block-start: calc(100% + var(--space-xs)); min-inline-size: 22rem; background: var(--color-paper); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-md); padding: var(--space-md); box-shadow: 0 12px 32px -16px oklch(from var(--color-ink) l c h / 0.25); }
  .mega__panel--narrow { min-inline-size: 12rem; inset-inline-start: auto; inset-inline-end: 0; }
  .mega__list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2xs); }
  .mega__item { display: grid; gap: var(--space-3xs); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); color: var(--color-ink); text-decoration: none; }
  .mega__item:hover { background: var(--color-paper-2); color: var(--color-ink); }
  .mega__item b { font-weight: 600; }
  .mega__item span { font-size: var(--text-sm); }
  @media (min-width: 60rem) {
    .nav__groups { display: flex; }
  }
  @media (max-width: 59.99rem) {
    /* Phones and tablets: the two groups become a single disclosure drawer. */
    .nav__bar { flex-wrap: wrap; }
    .nav__groups { display: contents; }
    .nav__groups > .mega, .nav__groups > a { order: 10; }
    .nav__groups > .mega { inline-size: 100%; }
    .mega__panel { position: static; min-inline-size: 0; border: 0; box-shadow: none; padding-inline: 0; }
    .nav__groups > a.nav__link { padding: var(--space-xs) 0; }
  }
</style>
```

The `name="mega"` attribute makes the details elements exclusive (one open at a time) in browsers that support it; the inline script covers outside-click and Escape.

- [ ] **Step 4: Write `src/components/Footer.astro`** (Ft5 Statement)

```astro
import { localePath } from '../site/paths.mjs';
import { t } from '../i18n/index.mjs';
const { lang } = Astro.props;
const s = t(lang);
const p = (english) => localePath(lang, english);
<footer class="foot wrap">
  <p class="foot__line">{s.footer.statement}</p>
  <div class="foot__meta">
    <span class="foot__mark">{s.site.name}</span>
    <ul class="foot__links">
      {s.footer.links.map((l) => <li><a href={p(l.path)}>{l.label}</a></li>)}
    </ul>
    <p class="muted small">{s.footer.madeBy} © {new Date().getFullYear()} {s.footer.rights}</p>
  </div>
</footer>
<style>
  .foot { padding-block: var(--space-3xl) var(--space-xl); display: grid; gap: var(--space-xl); }
  .foot__line { font-family: var(--font-display); font-size: clamp(1.6rem, 4vw, 2.8rem); line-height: 1.05; letter-spacing: -0.02em; max-inline-size: 28ch; font-weight: 700; }
  .foot__meta { display: grid; gap: var(--space-md); padding-block-start: var(--space-md); border-block-start: var(--rule-hair) solid var(--color-rule); }
  .foot__mark { font-weight: 700; }
  .foot__links { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--space-xs) var(--space-lg); }
  .foot__links a { color: var(--color-ink-2); text-decoration: none; white-space: nowrap; font-size: var(--text-sm); }
  .foot__links a:hover { color: var(--color-ink); text-decoration: underline; }
</style>
```

- [ ] **Step 5: Trim `LangSwitcher.astro` and `ThemeToggle.astro` to the new tokens**

`LangSwitcher.astro`: keep the markup and the cookie script; replace the `.lang` styles with:

```astro
<style>
  .lang ul { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2xs); }
  .lang a { display: block; padding: var(--space-2xs) var(--space-sm); border-radius: var(--radius-sm); color: var(--color-ink); text-decoration: none; white-space: nowrap; }
  .lang a:hover { background: var(--color-paper-2); }
  .lang a[aria-current="page"] { font-weight: 600; }
</style>
```

and make the cookie line `document.cookie = 'lang=' + a.dataset.lang + '; Max-Age=31536000; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');` (the F1 deferred minor 5, now that the switcher is being touched).

`ThemeToggle.astro`: the button carries two SVG glyphs (sun and moon, 16 px, `currentColor`, `aria-hidden`) instead of the "◐" character, and the class `.theme` moves into the component's own `<style>`: `.theme { inline-size: 44px; block-size: 44px; display: inline-grid; place-items: center; border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-sm); background: transparent; color: var(--color-ink); cursor: pointer; }`, with `:root[data-theme="dark"] .theme .sun { display: none }` and `:root:not([data-theme="dark"]) .theme .moon { display: none }`.

- [ ] **Step 6: Remove the old nav and footer rules from `site.css`** (`.nav`, `.brand`, `.theme`, `.lang`, `.footer` blocks from F1 are gone after Task 1's rewrite; confirm with `grep -n "\.footer\|\.brand" src/styles/site.css` returning nothing).

- [ ] **Step 7: Build and check the nav at three widths**

```bash
npm run build 2>&1 | tail -8
grep -c '<details class="mega"' dist/index.html
```

Expected: the build chain all `ok` (check-css included); `3` details elements (two groups and the language panel). Then in the browser (Playwright MCP, `npm run preview` on port 4321): at 1280 px the two groups open on click and close on outside click and Escape; at 375 px the groups render as a stacked disclosure list under the bar; the App Store button never wraps. Save the three screenshots to the scratchpad.

- [ ] **Step 8: Commit**

```bash
git add src/components src/layouts src/i18n/en.json src/styles/site.css
git commit -m "v2: mega-menu nav on details, statement footer, App Store button, language and theme controls on tokens"
```

### Task 3: Media manifest and the Clip figure

**Files:**
- Create: `scripts/media-manifest.mjs`, `tests/media-manifest.test.mjs`, `src/data/media.json` (generated), `src/components/Clip.astro`, `src/components/Still.astro`
- Modify: `package.json` (no chain change; the manifest is committed and refreshed by hand after `media-encode.sh`)

**Interfaces:**
- Produces: `src/data/media.json` as `{ "<name>": { "w": 600, "h": 1300, "dur": 12.5, "kind": "clip" | "still" } }`; `Clip.astro` props `{ name, caption, lang, priority?: boolean }`; `Still.astro` props `{ name, alt, caption? }`. Both throw at build time when the name is not in the manifest.

- [ ] **Step 1: Write the failing test `tests/media-manifest.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
const { parseProbe, buildManifest } = await import('../scripts/media-manifest.mjs');

test('parseProbe reads width, height and duration from ffprobe csv', () => {
  assert.deepEqual(parseProbe('600,1300\n12.533333\n'), { w: 600, h: 1300, dur: 12.5 });
});

test('buildManifest pairs mp4 clips and lone jpg stills, and refuses an mp4 without a poster', () => {
  const files = ['a.mp4', 'a.webm', 'a.jpg', 'b.jpg', 'c.mp4', 'c.webm'];
  const probe = (f) => (f.endsWith('.jpg') ? '1200,800\n' : '600,1300\n12.5\n');
  assert.throws(() => buildManifest(files, probe), /c\.mp4 has no poster/);
  const m = buildManifest(files.filter((f) => !f.startsWith('c')), probe);
  assert.deepEqual(m.a, { w: 600, h: 1300, dur: 12.5, kind: 'clip' });
  assert.deepEqual(m.b, { w: 1200, h: 800, dur: 0, kind: 'still' });
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/media-manifest.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `scripts/media-manifest.mjs`**

```js
// Reads public/media/ and writes src/data/media.json with the pixel size and
// duration of every clip and still, so the markup can carry width and height
// (no layout shift) and a missing file fails the build instead of a visitor.
import { readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function parseProbe(csv) {
  const lines = csv.trim().split('\n');
  const [w, h] = lines[0].split(',').map(Number);
  const dur = lines[1] ? Math.round(parseFloat(lines[1]) * 10) / 10 : 0;
  return { w, h, dur };
}

export function buildManifest(files, probe) {
  const manifest = {};
  const names = new Set(files.map((f) => f.replace(/\.(mp4|webm|jpg)$/, '')));
  for (const name of [...names].sort()) {
    const hasMp4 = files.includes(`${name}.mp4`);
    const hasJpg = files.includes(`${name}.jpg`);
    if (hasMp4 && !hasJpg) throw new Error(`${name}.mp4 has no poster (${name}.jpg)`);
    if (hasMp4 && !files.includes(`${name}.webm`)) throw new Error(`${name}.mp4 has no webm`);
    const p = parseProbe(probe(hasMp4 ? `${name}.mp4` : `${name}.jpg`));
    manifest[name] = hasMp4 ? { ...p, kind: 'clip' } : { w: p.w, h: p.h, dur: 0, kind: 'still' };
  }
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const dir = join(root, 'public/media');
  const files = readdirSync(dir).filter((f) => /\.(mp4|webm|jpg)$/.test(f));
  const probe = (f) => execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height:format=duration', '-of', 'csv=p=0', join(dir, f)], { encoding: 'utf8' });
  const manifest = buildManifest(files, probe);
  writeFileSync(join(root, 'src/data/media.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`media manifest: ${Object.keys(manifest).length} entries`);
}
```

- [ ] **Step 4: Run the test, then generate the manifest**

```bash
node --test tests/media-manifest.test.mjs
node scripts/media-manifest.mjs && head -12 src/data/media.json
```

Expected: 2 passing; `media manifest: 39 entries`; `iphone-songid` is `{ "w": 600, "h": 1300, "dur": 12.5, "kind": "clip" }` (height may differ by a few pixels, it is whatever ffprobe reports).

- [ ] **Step 5: Write `src/components/Clip.astro`**

```astro
// A real capture in a figure: webm and mp4 sources, a jpg poster, width and
// height from the manifest. The sources are attached by a small inline
// script when the figure nears the viewport, so a page never downloads a
// clip the visitor does not reach; with reduced motion, or without
// JavaScript, the poster stays.
import manifest from '../data/media.json';
const { name, caption, priority = false } = Astro.props;
const m = manifest[name];
if (!m || m.kind !== 'clip') throw new Error(`Clip "${name}" is not in src/data/media.json (run scripts/media-manifest.mjs)`);
<figure class="clip" data-clip={name}>
  <video muted loop playsinline preload="none" poster={`/media/${name}.jpg`} width={m.w} height={m.h} data-webm={`/media/${name}.webm`} data-mp4={`/media/${name}.mp4`} aria-label={caption} fetchpriority={priority ? 'high' : undefined}></video>
  <noscript><img src={`/media/${name}.jpg`} alt={caption} width={m.w} height={m.h}></noscript>
  <figcaption>{caption}</figcaption>
</figure>
<script is:inline>
  // One loader per page: Astro dedupes inline scripts from the same component.
  (function () {
    if (window.__clipLoader) return; window.__clipLoader = true;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var save = navigator.connection && navigator.connection.saveData;
    if (reduce || save) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (!v.querySelector('source')) {
            var s1 = document.createElement('source'); s1.src = v.dataset.webm; s1.type = 'video/webm';
            var s2 = document.createElement('source'); s2.src = v.dataset.mp4; s2.type = 'video/mp4';
            v.append(s1, s2); v.load();
          }
          v.play().catch(function () {});
        } else if (!v.paused) { v.pause(); }
      });
    }, { rootMargin: '50% 0px' });
    document.querySelectorAll('figure.clip video').forEach(function (v) { io.observe(v); });
  })();
</script>
<style>
  .clip { display: grid; gap: var(--space-xs); }
  .clip video, .clip img { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-md); background: var(--color-paper-2); inline-size: 100%; block-size: auto; }
  .clip figcaption { font-size: var(--text-sm); color: var(--color-muted); }
</style>
```

- [ ] **Step 6: Write `src/components/Still.astro`**

```astro
import manifest from '../data/media.json';
const { name, alt, caption } = Astro.props;
const m = manifest[name];
if (!m) throw new Error(`Still "${name}" is not in src/data/media.json`);
<figure class="still">
  <img src={`/media/${name}.jpg`} alt={alt} width={m.w} height={m.h} loading="lazy" decoding="async">
  {caption && <figcaption>{caption}</figcaption>}
</figure>
<style>
  .still { display: grid; gap: var(--space-xs); }
  .still img { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-md); inline-size: 100%; block-size: auto; }
  .still figcaption { font-size: var(--text-sm); color: var(--color-muted); }
</style>
```

- [ ] **Step 7: Prove the failure modes**

Temporarily render `<Clip name="does-not-exist" caption="x" />` in `src/pages/index.astro`, run `npx astro build 2>&1 | grep -m1 "not in src/data/media.json"`. Expected: the build fails with that message. Remove the line. Then build normally and open the home page in the browser with `prefers-reduced-motion` emulated (chrome-devtools MCP `emulate`): the video has no `<source>` children and shows the poster. With JavaScript disabled (same tool): the `<noscript>` image renders.

- [ ] **Step 8: Commit**

```bash
git add scripts/media-manifest.mjs tests/media-manifest.test.mjs src/data/media.json src/components/Clip.astro src/components/Still.astro
git commit -m "v2: media manifest with sizes and durations, lazy Clip and Still figures"
```

### Task 4: Hub feed from the community (W9)

**Files:**
- Create: `scripts/hub.mjs`, `tests/hub.test.mjs`, `src/data/hub.json` (fetched, committed), `src/components/HubFeed.astro`
- Modify: `src/i18n/en.json` (`hub` keys)

**Interfaces:**
- Produces: `src/data/hub.json` as `{ "fetchedOn": "2026-10-12", "releaseNotes": [{ "title", "url", "date" }], "latest": [{ "title", "url", "date", "category" }] }` (three each); `HubFeed.astro` props `{ lang }`; `en.json` keys `hub.heading`, `hub.lede`, `hub.releaseNotes`, `hub.latest`, `hub.asOf`, `hub.open`.

- [ ] **Step 1: Write the failing test `tests/hub.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
const { pickTopics } = await import('../scripts/hub.mjs');

const sample = { topic_list: { topics: [
  { id: 109, slug: 'macdio-3-0-is-out', title: 'Macdio 3.0 is out: live radio and podcasts, transcribed on your device', created_at: '2026-09-30T10:00:00Z', category_id: 6, pinned: false },
  { id: 105, slug: 'macdio-2-7-5', title: 'Macdio 2.7.5 is out on iPhone, iPad, Mac and Apple TV', created_at: '2026-09-16T10:00:00Z', category_id: 6, pinned: false },
  { id: 1, slug: 'about', title: 'About the Release Notes category', created_at: '2026-01-01T10:00:00Z', category_id: 6, pinned: true },
  { id: 112, slug: 'sleep', title: 'Persistent / recurring sleep timer', created_at: '2026-10-06T10:00:00Z', category_id: 8, pinned: false },
] } };
const cats = { 6: 'Release notes', 8: 'Feature requests' };

test('pickTopics drops pinned "About" topics, sorts newest first, limits and links', () => {
  const r = pickTopics(sample, cats, 2);
  assert.equal(r.length, 2);
  assert.deepEqual(r[0], { title: 'Persistent / recurring sleep timer', url: 'https://hub.devdio.pro/t/sleep/112', date: '2026-10-06', category: 'Feature requests' });
  assert.equal(r[1].date, '2026-09-30');
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/hub.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `scripts/hub.mjs`**

```js
// Pulls the newest release notes and latest topics from the community hub
// (Discourse JSON) into src/data/hub.json. Runs by hand before a build; the
// committed file is what the build uses, so a build never needs the hub to
// be up. The page prints fetchedOn so the date is honest.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const HUB = 'https://hub.devdio.pro';

export function pickTopics(json, categories, limit) {
  return json.topic_list.topics
    .filter((t) => !t.pinned && !/^About the /.test(t.title))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
    .map((t) => ({ title: t.title, url: `${HUB}/t/${t.slug}/${t.id}`, date: t.created_at.slice(0, 10), category: categories[t.category_id] ?? '' }));
}

async function get(path) {
  const r = await fetch(HUB + path, { headers: { 'User-Agent': 'macdio.app site build (hub feed)', Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${path}: ${r.status}`);
  return r.json();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cats = {};
  const c = await get('/categories.json?include_subcategories=true');
  for (const top of c.category_list.categories) { cats[top.id] = top.name; for (const s of top.subcategory_list ?? []) cats[s.id] = s.name; }
  const releaseNotes = pickTopics(await get('/c/macdio/release-notes/6.json'), cats, 3);
  const latest = pickTopics(await get('/latest.json'), cats, 3);
  const out = { fetchedOn: new Date().toISOString().slice(0, 10), releaseNotes, latest };
  writeFileSync(fileURLToPath(new URL('../src/data/hub.json', import.meta.url)), JSON.stringify(out, null, 2) + '\n');
  console.log(`hub: ${releaseNotes.length} release notes, ${latest.length} latest, ${out.fetchedOn}`);
}
```

- [ ] **Step 4: Run the test, fetch the feed**

```bash
node --test tests/hub.test.mjs
node scripts/hub.mjs && cat src/data/hub.json
```

Expected: 1 passing; `hub.json` lists three release notes (3.0 on 2026-09-30, 2.7.5 on 2026-09-16, 2.7 on 2026-09-12) and three latest topics with dates.

- [ ] **Step 5: Add strings and write `src/components/HubFeed.astro`**

`en.json` `hub` object:

```json
"hub": {
  "heading": "What changed, and what people are asking",
  "lede": "Release notes, bug reports and feature requests live on the community hub. Every entry below links to the thread.",
  "releaseNotes": "Release notes",
  "latest": "Latest on the hub",
  "asOf": "As of",
  "open": "Open the hub"
}
```

`HubFeed.astro`:

```astro
import hub from '../data/hub.json';
import { t } from '../i18n/index.mjs';
const { lang } = Astro.props;
const s = t(lang).hub;
const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
<section class="hub wrap" aria-labelledby="hub-h">
  <div class="head-hang"><h2 id="hub-h">{s.heading}</h2><p>{s.lede}</p></div>
  <div class="hub__cols">
    {[['releaseNotes', hub.releaseNotes], ['latest', hub.latest]].map(([key, items]) => (
      <div>
        <h3>{s[key]}</h3>
        <ul class="hub__list">
          {items.map((it) => (
            <li><a href={it.url} rel="noopener">{it.title}</a><span class="muted small tnum">{fmt(it.date)}{it.category && key === 'latest' ? ` · ${it.category}` : ''}</span></li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  <p class="muted small">{s.asOf} {fmt(hub.fetchedOn)}. <a class="link" href="https://hub.devdio.pro" rel="noopener">{s.open}</a></p>
</section>
<style>
  .hub__cols { display: grid; gap: var(--space-xl); }
  .hub__list { list-style: none; margin: var(--space-md) 0 0; padding: 0; display: grid; gap: var(--space-sm); }
  .hub__list li { display: grid; gap: var(--space-3xs); padding-block-end: var(--space-sm); border-block-end: var(--rule-hair) solid var(--color-rule-2); }
  .hub__list a { color: var(--color-ink); text-decoration: none; }
  .hub__list a:hover { text-decoration: underline; }
  @media (min-width: 60rem) { .hub__cols { grid-template-columns: 1.2fr 1fr; gap: var(--space-2xl); } }
</style>
```

- [ ] **Step 6: Prove the offline path**

Disconnect by pointing the script at a dead host once: `HUB_TEST=1 node -e "import('./scripts/hub.mjs')"` is not needed; instead run `npm run build` with the network blocked for the hub (`sudo` is not available, so simply confirm that `npm run build` does not call `scripts/hub.mjs`: `grep -c hub.mjs package.json` returns 0) and that the page renders `hub.json`'s date. Expected: `0`; the home page (Task 6) shows "As of 12 October 2026".

- [ ] **Step 7: Commit**

```bash
git add scripts/hub.mjs tests/hub.test.mjs src/data/hub.json src/components/HubFeed.astro src/i18n/en.json
git commit -m "v2: community hub feed (release notes and latest topics) fetched into the repo, rendered at build time"
```

### Task 5: Numbers and prices helpers

**Files:**
- Create: `src/site/format.mjs`, `tests/format.test.mjs`

**Interfaces:**
- Produces: `formatCount(n, lang)` → "61,318"; `countries(pricing)` → number of territories in `pricing.json`; `price(pricing, cc)` → `{ amount, currency, text }` with `text` like "$14.99" via `Intl.NumberFormat`; `longDate(iso, lang)` → "12 October 2026".

- [ ] **Step 1: Write the failing test `tests/format.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
const { formatCount, countries, price, longDate } = await import('../src/site/format.mjs');

const pricing = { default: { c: 'USD', p: 14.99 }, prices: { US: { c: 'USD', p: 14.99 }, TR: { c: 'TRY', p: 499.99 }, DE: { c: 'EUR', p: 14.99 } } };

test('counts and dates format for the locale', () => {
  assert.equal(formatCount(61318, 'en'), '61,318');
  assert.equal(formatCount(4739683, 'de'), '4.739.683');
  assert.equal(longDate('2026-10-12', 'en'), '12 October 2026');
});

test('prices come from pricing.json with the territory currency', () => {
  assert.equal(countries(pricing), 3);
  assert.deepEqual(price(pricing, 'TR', 'tr'), { amount: 499.99, currency: 'TRY', text: '₺499,99' });
  assert.equal(price(pricing, 'XX', 'en').text, '$14.99');
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test tests/format.test.mjs`
Expected: FAIL, module not found.

- [ ] **Step 3: Write `src/site/format.mjs`**

```js
const INTL = { en: 'en-GB', 'pt-br': 'pt-BR', 'zh-hans': 'zh-Hans', 'zh-hant': 'zh-Hant' };
const tag = (lang) => INTL[lang] ?? lang;

export function formatCount(n, lang) {
  return new Intl.NumberFormat(tag(lang)).format(n);
}

export function longDate(iso, lang) {
  return new Intl.DateTimeFormat(tag(lang), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));
}

export function countries(pricing) {
  return Object.keys(pricing.prices).length;
}

export function price(pricing, cc, lang) {
  const p = pricing.prices[cc] ?? pricing.default;
  const text = new Intl.NumberFormat(tag(lang), { style: 'currency', currency: p.c }).format(p.p);
  return { amount: p.p, currency: p.c, text };
}
```

- [ ] **Step 4: Run the test, expect pass** (`node --test tests/format.test.mjs` → 2 passing). If `₺499,99` renders differently on this Node (ICU data), accept the exact string Node produces and put that in the test, noting it in the commit message.

- [ ] **Step 5: Commit**

```bash
git add src/site/format.mjs tests/format.test.mjs
git commit -m "v2: locale number, date and price helpers"
```

### Task 6: The home page (Workbench)

**Files:**
- Create: `src/templates/Home.astro`, `src/components/StatStrip.astro`, `src/components/Faq.astro`, `src/components/AuthorLine.astro`, `src/site/jsonld.mjs`
- Modify: `src/pages/index.astro`, `src/pages/[lang]/[page].astro` (index routes through `Home.astro`), `src/i18n/en.json` (`home` object), `src/data/claims.md` (rows closed from the inventory)

**Interfaces:**
- Consumes: `Clip`, `Still`, `AppStoreButton`, `HubFeed`, tokens, `format.mjs`, `counts.json`, `pricing.json`, `hub.json`, `media.json`.
- Produces: `en.json` `home` keys listed in Step 2; `jsonld.mjs` exports `softwareApplication(lang, counts, pricing)`, `faqPage(items)`, `person()`, `webSite(lang)`; `Faq.astro` props `{ items: [{ q, a }] }` rendering `<details>`; `AuthorLine.astro` props `{ lang, checkedOn }`; `StatStrip.astro` props `{ lang }`.

- [ ] **Step 1: Close the claims the home page needs**

Read `docs/research/2026-10-12-feature-inventory.md`. For each claim the home copy makes (Step 2), set the matching row in `src/data/claims.md` to `verified` with the file the inventory cites, or drop the claim. Rows that must be settled before Step 2 is written: Song ID from the stream without the microphone; split-track recording and on which platforms; synced lyrics; on-device transcripts; Highlights destinations; Apple Watch standalone; Wi-Fi station editor (`StationEditorServer.swift`, what it edits, PIN); no account, no analytics SDK; one Universal Purchase; the six platforms. Commit the register update in the same commit as Step 2.

- [ ] **Step 2: Write the home copy, run the humanizer, store it in `en.json`**

Draft (every line is rewritten by the humanizer skill before it is stored; facts stay):

```json
"home": {
  "h1": "Radio and podcasts, on every Apple screen.",
  "lede": "{stations} live stations and {podcasts} podcasts in one app, bought once for iPhone, iPad, Mac, Apple TV, Apple Watch and CarPlay. Song ID reads the stream, so there is no microphone. Transcripts are made on your device.",
  "secondary": "See it on your device",
  "stats": [
    { "value": "{stations}", "label": "live stations" },
    { "value": "{podcasts}", "label": "podcasts" },
    { "value": "6", "label": "Apple platforms, one purchase" },
    { "value": "{price}", "label": "once, in {countries} countries" }
  ],
  "tour": [
    { "clip": "iphone-songid", "h": "Name the song without listening in.", "p": "Tap Song ID and Macdio identifies what the station is playing from the audio it is already receiving. No microphone permission, nothing recorded. Save the track or open it in Apple Music." },
    { "clip": "iphone-transcript", "h": "Every episode, in writing.", "p": "Play a podcast and the transcript is made on your iPhone, iPad or Mac, in the episode's language. Search inside it and jump to the sentence." },
    { "clip": "iphone-mark-notes", "h": "Keep the moment.", "p": "Highlight what you just heard and it goes to Apple Notes, Notion, Obsidian, Bear, Craft or Readwise with the sentence and a link back to the episode." },
    { "clip": "mac-recording", "h": "Record the stream, get a tagged library.", "p": "Recording follows the station's song titles and splits the stream into tracks. Schedule a show and it records while you sleep." },
    { "clip": "iphone-lyrics", "h": "Lyrics that keep up with live radio.", "p": "Synced lyrics line up with what you hear, anchored on the identified song." },
    { "clip": "mac-menubar", "h": "A real Mac app.", "p": "Native, with a menu bar player, keyboard shortcuts and a station editor you can open from any computer on your Wi-Fi to fix your own stations." }
  ],
  "screens": { "h": "The same library on the big screen, on your wrist and in the car.", "items": [
    { "clip": "tv-songid", "caption": "Apple TV" },
    { "clip": "watch-songid", "caption": "Apple Watch, on its own" },
    { "clip": "carplay-favorites", "caption": "CarPlay" }
  ] },
  "business": { "h": "A normal business.", "p": "Macdio is made by one person. You pay once on the App Store and get every platform and every update. There is no account to create, no advertising, no analytics in the app, and no subscription." },
  "compare": { "h": "Compared with the apps you may be using now", "items": [
    { "label": "TuneIn", "path": "/tunein-alternative.html" },
    { "label": "myTuner", "path": "/mytuner-alternative.html" },
    { "label": "Pocket Casts", "path": "/pocket-casts-alternative.html" },
    { "label": "Overcast", "path": "/overcast-alternative.html" },
    { "label": "Snipd", "path": "/snipd-alternative.html" },
    { "label": "Apple Podcasts", "path": "/compare/apple-podcasts.html" }
  ] },
  "faq": [
    { "q": "Is there an app that allows me to listen to FM radio on all my Apple devices?", "a": "Macdio plays internet streams of FM and AM stations on iPhone, iPad, Mac, Apple TV, Apple Watch and CarPlay from one purchase. It does not receive FM over the air; no iPhone does." },
    { "q": "Which radio app has the fewest ads?", "a": "Macdio shows none and never has. The stations' own broadcast ads are part of the stream, as on the air." },
    { "q": "Is it worth paying for a podcast app?", "a": "Macdio is one payment, not a subscription. Transcripts, chapters, highlights and sync are included; nothing is held back for a higher tier." },
    { "q": "Can I transfer my subscriptions between apps?", "a": "{opml}" },
    { "q": "Is there an Android or web version?", "a": "No. Macdio is built for Apple devices only and the directory of stations is on this site." }
  ],
  "checkedOn": "{checkedOn}"
}
```

Placeholders in braces are filled by the template from `counts.json`, `pricing.json` and the date. The `{opml}` answer is written from the inventory's OPML row (import and export, import only, or neither) and the recording tour block states the platforms the inventory confirms (if iOS cannot record, the sentence says Mac). The recording clip name is whichever recording capture exists in the manifest (`iphone-recordings` or a Mac one); the "screens" captions are checked against the Watch standalone row. Run the humanizer on the English text, then write the object into `en.json` and update `i18n-check` expectations (no new limits).

- [ ] **Step 3: Write `src/site/jsonld.mjs`**

```js
import { SITE } from './paths.mjs';
import { price, countries } from './format.mjs';

export function person() {
  return { '@type': 'Person', name: 'Sait Firat NEMIS', url: `${SITE}/` };
}

export function softwareApplication(lang, counts, pricing) {
  const p = price(pricing, 'US', 'en');
  return {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Macdio',
    applicationCategory: 'MultimediaApplication', operatingSystem: 'iOS, iPadOS, macOS, tvOS, watchOS',
    offers: { '@type': 'Offer', price: p.amount, priceCurrency: p.currency, url: 'https://apps.apple.com/app/macdio/id6761737888', availability: 'https://schema.org/InStock' },
    author: person(), inLanguage: lang,
    description: `Internet radio and podcasts for Apple devices. ${counts.stations} stations and ${counts.podcasts} podcasts as of ${counts.checkedOn}; one purchase for ${countries(pricing)} countries.`,
  };
}

export function faqPage(items) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })) };
}

export function webSite(lang) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Macdio', url: `${SITE}/`, inLanguage: lang, author: person() };
}
```

- [ ] **Step 4: Write the small components**

`StatStrip.astro` (T4, 4-up, tabular):

```astro
import counts from '../data/counts.json';
import pricing from '../../public/pricing.json';
import { t } from '../i18n/index.mjs';
import { formatCount, price, countries, longDate } from '../site/format.mjs';
const { lang } = Astro.props;
const s = t(lang).home;
const fill = (str) => str.replace('{stations}', formatCount(counts.stations, lang)).replace('{podcasts}', formatCount(counts.podcasts, lang)).replace('{price}', price(pricing, 'US', 'en').text).replace('{countries}', String(countries(pricing)));
<section class="stats wrap tnum" aria-label="Macdio in numbers">
  <ul>
    {s.stats.map((st) => <li><b>{fill(st.value)}</b><span>{fill(st.label)}</span></li>)}
  </ul>
  <p class="muted small">{t(lang).hub.asOf} {longDate(counts.checkedOn, lang)}.</p>
</section>
<style>
  .stats { padding-block: var(--space-xl); }
  .stats ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-lg) var(--space-md); border-block: var(--rule-hair) solid var(--color-rule); padding-block: var(--space-lg); }
  .stats li { display: grid; gap: var(--space-3xs); min-inline-size: 0; }
  .stats b { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; letter-spacing: -0.02em; line-height: 1; overflow-wrap: anywhere; }
  .stats span { color: var(--color-muted); font-size: var(--text-sm); }
  .stats p { margin-block-start: var(--space-sm); }
  @media (min-width: 60rem) { .stats ul { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
</style>
```

`Faq.astro`:

```astro
const { items, heading, id = 'faq' } = Astro.props;
<section class="faq wrap" aria-labelledby={id}>
  <h2 id={id} class="faq__h">{heading}</h2>
  {items.map((i) => (
    <details class="faq__item"><summary><h3>{i.q}</h3></summary><div class="faq__a prose"><p>{i.a}</p></div></details>
  ))}
</section>
<style>
  .faq { padding-block: var(--space-2xl); max-inline-size: calc(var(--measure) + 2 * var(--page-gutter)); }
  .faq__h { margin-block-end: var(--space-lg); }
  .faq__item { border-block-start: var(--rule-hair) solid var(--color-rule); padding-block: var(--space-md); }
  .faq__item:last-of-type { border-block-end: var(--rule-hair) solid var(--color-rule); }
  .faq__item summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; gap: var(--space-md); align-items: baseline; }
  .faq__item summary::-webkit-details-marker { display: none; }
  .faq__item summary::after { content: "+"; color: var(--color-muted); font-size: var(--text-md); }
  .faq__item[open] summary::after { content: "−"; }
  .faq__item h3 { font-size: var(--text-md); font-weight: 600; }
  .faq__a { padding-block-start: var(--space-sm); color: var(--color-ink-2); }
</style>
```

`AuthorLine.astro`:

```astro
import { t } from '../i18n/index.mjs';
import { longDate } from '../site/format.mjs';
const { lang, checkedOn } = Astro.props;
const s = t(lang);
<p class="author muted small wrap">{s.site.authorLine} {s.hub.asOf.toLowerCase()} {longDate(checkedOn, lang)}.</p>
<style>.author { padding-block: var(--space-lg); }</style>
```

with `en.json` `site.authorLine`: `"Written by Sait Firat NEMIS, developer of Macdio. Checked"` (so the line reads "Written by ..., developer of Macdio. Checked as of 12 October 2026.").

- [ ] **Step 5: Write `src/templates/Home.astro`**

```astro
import Base from '../layouts/Base.astro';
import Clip from '../components/Clip.astro';
import AppStoreButton from '../components/AppStoreButton.astro';
import StatStrip from '../components/StatStrip.astro';
import HubFeed from '../components/HubFeed.astro';
import Faq from '../components/Faq.astro';
import AuthorLine from '../components/AuthorLine.astro';
import counts from '../data/counts.json';
import pricing from '../../public/pricing.json';
import { t } from '../i18n/index.mjs';
import { localePath } from '../site/paths.mjs';
import { formatCount } from '../site/format.mjs';
import { softwareApplication, faqPage, webSite } from '../site/jsonld.mjs';
const { lang } = Astro.props;
const s = t(lang);
const h = s.home;
const page = s.pages['/'];
const lede = h.lede.replace('{stations}', formatCount(counts.stations, lang)).replace('{podcasts}', formatCount(counts.podcasts, lang));
const faq = h.faq.map((f) => ({ q: f.q, a: f.a }));
const jsonld = [webSite(lang), softwareApplication(lang, counts, pricing), faqPage(faq)];
const p = (english) => localePath(lang, english);
<Base lang={lang} path="/" title={page.title} description={page.description} jsonld={jsonld}>
  <section class="hero wrap">
    <div class="hero__text">
      <h1>{h.h1}</h1>
      <p class="hero__lede">{lede}</p>
      <div class="hero__cta"><AppStoreButton lang={lang} /><a class="btn btn--chip" href="#tour">{h.secondary}</a></div>
    </div>
    <Clip name="iphone-songid" caption={h.tour[0].h} priority={true} />
  </section>

  <StatStrip lang={lang} />

  <section id="tour" class="tour wrap">
    {h.tour.map((b, i) => (
      <article class="tour__block" class:list={[{ 'tour__block--flip': i % 2 === 1 }]}>
        <Clip name={b.clip} caption={b.h} />
        <div class="tour__text"><h2>{b.h}</h2><p>{b.p}</p></div>
      </article>
    ))}
    <aside class="tour__cta"><span>{h.h1}</span><AppStoreButton lang={lang} variant="chip" /></aside>
  </section>

  <section class="screens wrap">
    <div class="head-hang"><h2>{h.screens.h}</h2></div>
    <div class="screens__row">{h.screens.items.map((it) => <Clip name={it.clip} caption={it.caption} />)}</div>
  </section>

  <HubFeed lang={lang} />

  <section class="business wrap prose">
    <h2>{h.business.h}</h2>
    <p>{h.business.p}</p>
    <p>{h.compare.h}: {h.compare.items.map((c, i) => <><a class="link" href={p(c.path)}>{c.label}</a>{i < h.compare.items.length - 1 ? ', ' : '.'}</>)}</p>
  </section>

  <Faq items={faq} heading={s.site.faqHeading} />
  <AuthorLine lang={lang} checkedOn={counts.checkedOn} />
</Base>
<style>
  .hero { display: grid; gap: var(--space-xl); padding-block: var(--space-2xl) var(--space-xl); align-items: center; }
  .hero__lede { font-size: var(--text-md); color: var(--color-ink-2); max-inline-size: 48ch; margin-block-start: var(--space-lg); }
  .hero__cta { display: flex; flex-wrap: wrap; gap: var(--space-sm); margin-block-start: var(--space-xl); }
  .tour { display: grid; gap: var(--space-3xl); padding-block: var(--space-2xl); position: relative; }
  .tour__block { display: grid; gap: var(--space-lg); align-items: center; }
  .tour__text { max-inline-size: 40ch; }
  .tour__text p { margin-block-start: var(--space-md); color: var(--color-ink-2); }
  .tour__cta { position: sticky; inset-block-end: 0; display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding: var(--space-sm) var(--space-md); background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-md); z-index: var(--z-sticky); }
  .tour__cta span { font-weight: 600; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .screens { padding-block: var(--space-xl) var(--space-2xl); }
  .screens__row { display: grid; gap: var(--space-lg); grid-template-columns: minmax(0, 1fr); }
  .business { padding-block: var(--space-2xl); }
  @media (min-width: 60rem) {
    .hero { grid-template-columns: 7fr 5fr; gap: var(--space-2xl); }
    .hero figure { max-inline-size: 22rem; justify-self: end; }
    .tour__block { grid-template-columns: 5fr 7fr; gap: var(--space-2xl); }
    .tour__block--flip > :first-child { order: 2; }
    .tour__block figure { max-inline-size: 26rem; }
    .screens__row { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
</style>
```

Add `site.faqHeading: "Questions people ask"` to `en.json`. Route: `src/pages/index.astro` renders `<Home lang="en" />`; in `src/pages/[lang]/[page].astro` render `Home` when `page === 'index'` and `Page` otherwise.

- [ ] **Step 6: Build and read the result**

```bash
npm run build 2>&1 | tail -8
grep -o '<h1>[^<]*</h1>' dist/index.html; grep -c 'application/ld+json' dist/index.html; grep -o 'As of [^.<]*' dist/index.html | head -2
```

Expected: chain all `ok`; the H1; `3` JSON-LD blocks; the dated count line and the hub date.

- [ ] **Step 7: Commit**

```bash
git add src/templates/Home.astro src/components/StatStrip.astro src/components/Faq.astro src/components/AuthorLine.astro src/site/jsonld.mjs src/pages src/i18n/en.json src/data/claims.md
git commit -m "v2: home page as a Workbench tour of real captures, dated counts, hub feed, FAQ and JSON-LD"
```

### Task 7: Visual, mobile and Lighthouse checks, then the review gate

**Files:**
- Create: `scripts/check-viewports.md` (the browser checklist, since the measurement runs through the browser tools, not a script)

- [ ] **Step 1: Serve the build**

```bash
npm run build >/dev/null 2>&1 && (npx astro preview --port 4321 >/tmp/preview.log 2>&1 &); sleep 3; curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4321/
```

Expected: `200`.

- [ ] **Step 2: Screenshots and overflow measurement** (Playwright MCP)

For each width 320, 375, 414, 768, 1280 and each theme (set `localStorage.starlight-theme` to `light` then `dark`, reload): resize, screenshot to the scratchpad as `home-<w>-<theme>.png`, and evaluate:

```js
({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth,
   wrapped: [...document.querySelectorAll('.btn, .nav__link, .foot__links a, .link')].filter(e => e.getClientRects().length > 1).map(e => e.textContent.trim()),
   nowrapOverflow: [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).whiteSpace === 'nowrap' && e.scrollWidth > Math.ceil(e.getBoundingClientRect().width) + 1).map(e => e.className) })
```

Expected at every width: `scrollWidth === clientWidth`, `wrapped: []`, `nowrapOverflow: []` (observation 0001 measured, not eyeballed). Any failure is fixed in the component that owns it (shorten a label first, then `nowrap`, then collapse), rebuilt, re-measured.

- [ ] **Step 3: Reduced motion and no-JS** (chrome-devtools MCP `emulate`)

With `prefers-reduced-motion: reduce`: no `<source>` inside any video, posters visible. With JavaScript disabled: nav groups open as plain disclosure lists, the `noscript` posters render, the theme follows the OS preference. Record the results in the ledger.

- [ ] **Step 4: Lighthouse** (chrome-devtools MCP `lighthouse_audit`, mobile and desktop, on `http://127.0.0.1:4321/`)

Expected: accessibility 100, SEO 100, best practices 100, performance 95 or better on mobile. If performance is below 95, the usual causes are the hero clip poster size (serve a 600 px poster; it already is) and the GA tag (unchanged from the live site; leave it). Save the four scores to the ledger.

- [ ] **Step 5: Slop test**

Load `references/slop-test.md` from the Hallmark skill now (Step 7 of the skill) and walk the 58 gates against `dist/index.html` and the CSS. Record the row for the Hallmark preview block: `58 / 58 ✓` or the failing gate numbers, fix, re-run. Then write the Hallmark preview block (macrostructure, theme, enrichment, sections, motion, slop test, diversification) into the ledger and the final message to Sait.

- [ ] **Step 6: Write `scripts/check-viewports.md`** with the Step 2 snippet and the width and theme matrix, so F2b and F2c repeat the same measurement.

- [ ] **Step 7: Stop the preview, commit, and hand the page to Sait**

```bash
pkill -f "astro preview"; git add scripts/check-viewports.md; git commit -m "v2: viewport and theme check procedure for every template"
```

Then the gate message to Sait: how to open the preview (`npm run dev` in `macdio-web`, http://127.0.0.1:4321/), the screenshots' folder, the Lighthouse scores, the Hallmark preview block, the claims that were dropped because the code did not support them, and the two things he decides: the font question (system stack or a Latin display face) and the hub feed's refresh policy (per deploy, or a weekly scheduled rebuild in F5).
