// The guide hub: groups and their guides come from src/i18n/<code>.json
// ("guides" section), one source for the Starlight sidebar (astro.config.mjs,
// with a translation per locale that has a JSON file) and the hub index
// pages. Slugs are the file names under src/content/docs/[<code>/]guides/
// and the URLs /[<code>/]guides/<slug>.html. Plain Node (fs) because
// astro.config.mjs imports this before Vite exists.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES, DEFAULT } from '../site/locales.mjs';

const I18N = join(process.cwd(), 'src', 'i18n');
const DOCS = join(process.cwd(), 'src', 'content', 'docs');
const read = (code) => JSON.parse(readFileSync(join(I18N, `${code}.json`), 'utf8'));

export const GROUPS = read(DEFAULT).guides.groups;
export const ALL_GUIDES = GROUPS.flatMap((g) => g.guides);

// Locales whose guides exist as Markdown under src/content/docs/<code>/guides/.
export const guideLocales = () => LOCALES.filter((l) => l.code === DEFAULT || existsSync(join(DOCS, l.code, 'guides')));

// Starlight sidebar entries with per-locale labels. Links end in .html because
// the site serves files (build.format "file"); Starlight prefixes the locale.
export function sidebar() {
  const strings = Object.fromEntries(readdirSync(I18N).filter((f) => f.endsWith('.json')).map((f) => [f.slice(0, -5), read(f.slice(0, -5)).guides]));
  const lang = (code) => LOCALES.find((l) => l.code === code)?.lang;
  const tr = (pick) => Object.fromEntries(Object.entries(strings).filter(([code]) => code !== DEFAULT && lang(code)).map(([code, g]) => [lang(code), pick(g)]).filter(([, v]) => v));
  return [
    { label: strings[DEFAULT].h1, translations: tr((g) => g.h1), items: [{ label: strings[DEFAULT].allGuides, translations: tr((g) => g.allGuides), link: '/guides/index.html' }] },
    ...GROUPS.map((g, gi) => ({
      label: g.label,
      translations: tr((s) => s.groups[gi]?.label),
      items: g.guides.map((x, xi) => ({ label: x.label, translations: tr((s) => s.groups[gi]?.guides[xi]?.label), link: `/guides/${x.slug}.html` })),
    })),
  ];
}
