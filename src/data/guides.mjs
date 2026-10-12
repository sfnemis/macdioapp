// The guide hub: groups and their guides come from src/i18n/<code>.json
// ("guides" section), one source for the Starlight sidebar (astro.config.mjs,
// with a translation per locale that has a JSON file) and the hub index
// pages. Slugs are the file names under src/content/docs/[<code>/]guides/
// and the URLs /[<code>/]guides/<slug>.html. Plain Node (fs) because
// astro.config.mjs imports this before Vite exists.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES, DEFAULT, liveLocales } from '../site/locales.mjs';
import { splitLocale } from '../site/paths.mjs';

const I18N = join(process.cwd(), 'src', 'i18n');
const DOCS = join(process.cwd(), 'src', 'content', 'docs');
const read = (code) => JSON.parse(readFileSync(join(I18N, `${code}.json`), 'utf8'));

export const GROUPS = read(DEFAULT).guides.groups;
export const ALL_GUIDES = GROUPS.flatMap((g) => g.guides);

// Live locales whose guides exist as Markdown under src/content/docs/<code>/guides/.
// A locale still being translated stays out until it is switched live.
export const guideLocales = () => liveLocales().filter((l) => l.code === DEFAULT || existsSync(join(DOCS, l.code, 'guides')));

// Whether locale `code` carries the guide at `path` ('/guides/' or
// '/guides/<slug>.html'): English always; a guide locale for the hub index,
// and for a guide only when its Markdown file exists.
export function hasGuide(code, path) {
  if (code === DEFAULT) return true;
  if (!guideLocales().some((l) => l.code === code)) return false;
  return path.endsWith('/') || existsSync(join(DOCS, code, path.replace(/^\//, '').replace(/\.html$/, '.md')));
}

// Locale code and served path of a Starlight page: Astro.url.pathname is
// "/guides/" for the index route and "/guides/<slug>" for content pages; the
// served file for the latter is "<slug>.html".
export function guideRoute(url) {
  let pathname = url.pathname;
  if (pathname.endsWith('/index.html')) pathname = pathname.slice(0, -'index.html'.length);
  else if (!pathname.endsWith('/') && !pathname.endsWith('.html')) pathname += '.html';
  return splitLocale(pathname);
}

// Starlight sidebar entries with per-locale labels. Links end in .html because
// the site serves files (build.format "file"); Starlight prefixes the locale.
export function sidebar() {
  const strings = Object.fromEntries(readdirSync(I18N).filter((f) => f.endsWith('.json')).map((f) => [f.slice(0, -5), read(f.slice(0, -5)).guides]));
  const lang = (code) => LOCALES.find((l) => l.code === code)?.lang;
  const tr = (pick) => Object.fromEntries(Object.entries(strings).filter(([code]) => code !== DEFAULT && lang(code)).map(([code, g]) => [lang(code), pick(g)]).filter(([, v]) => v));
  return [
    { label: strings[DEFAULT].h1, translations: tr((g) => g.h1), items: [{ label: strings[DEFAULT].allGuides, translations: tr((g) => g.allGuides), link: '/guides/index.html' }] },
    // Matched by slug, not by position: a locale whose strings do not have a
    // new group yet falls back to English instead of borrowing the label of
    // whatever group sits at the same index.
    ...GROUPS.map((g) => ({
      label: g.label,
      translations: tr((s) => s.groups.find((lg) => lg.guides.some((x) => x.slug === g.guides[0].slug))?.label),
      items: g.guides.map((x) => ({ label: x.label, translations: tr((s) => s.groups.flatMap((lg) => lg.guides).find((y) => y.slug === x.slug)?.label), link: `/guides/${x.slug}.html` })),
    })),
  ];
}
