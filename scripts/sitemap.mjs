// Builds the sitemaps from the files Astro wrote: one dist/sitemap-<code>.xml per
// language with one <url> per page, its <lastmod> and xhtml:link alternates for
// every other variant plus x-default (English). dist/sitemap.xml is the index, at
// the URL robots.txt and the search consoles already know. The Astro sitemap
// integration drops ".html" and mislabels locale roots, so the site has its own
// generator. Starlight links /sitemap-index.xml in <head>, so the same index is
// written there too.
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
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

// The file a URL's words live in. Its last commit is that URL's <lastmod>.
export function sourceOf(code, path, exists) {
  const guide = path.match(/^\/guides\/(.+)\.html$/);
  if (guide) return `src/content/docs/${code === DEFAULT ? '' : code + '/'}guides/${guide[1]}.md`;
  if (path === '/guides/') return `src/i18n/${code}.json`;
  const legacy = `src/legacy/${code}/${path.endsWith('/') ? path + 'index.html' : path.slice(1)}`.replace('//', '/');
  return exists(legacy) ? legacy : null;
}

// Newest commit date of every file under src/, in one pass over the history.
export function commitDates(root) {
  if (execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: root, encoding: 'utf8' }).trim() === 'true') throw new Error('sitemap: shallow clone, <lastmod> would be wrong');
  const log = execFileSync('git', ['-c', 'core.quotePath=false', 'log', '--format=%x00%cs', '--name-only', '--', 'src'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  const dates = new Map();
  for (const commit of log.split('\0').slice(1)) {
    const [date, ...files] = commit.split('\n').filter(Boolean);
    for (const f of files) if (!dates.has(f)) dates.set(f, date);
  }
  return dates;
}

export function renderSitemaps(groups, lastmod) {
  const out = new Map();
  for (const [path, variants] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const alts = [...variants.entries()].map(([code, url]) => `    <xhtml:link rel="alternate" hreflang="${langOf(code)}" href="${SITE}${url}"/>`);
    if (variants.has(DEFAULT)) alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${variants.get(DEFAULT)}"/>`);
    for (const [code, url] of variants) {
      const date = lastmod(code, path);
      if (!date) throw new Error(`sitemap: no <lastmod> for ${url}`);
      out.set(code, (out.get(code) || '') + `  <url>\n    <loc>${SITE}${url}</loc>\n    <lastmod>${date}</lastmod>\n${alts.join('\n')}\n  </url>\n`);
    }
  }
  return new Map([...out].map(([code, urls]) => [code, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}</urlset>\n`]));
}

// English first, then the order of src/site/locales.mjs.
export function renderSitemapIndex(codes, lastmods) {
  const items = LOCALES.filter((l) => codes.includes(l.code)).map((l) => `  <sitemap>\n    <loc>${SITE}/sitemap-${l.code}.xml</loc>\n    <lastmod>${lastmods.get(l.code)}</lastmod>\n  </sitemap>\n`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('')}</sitemapindex>\n`;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  const files = walk(dist).map((f) => relative(dist, f));
  const groups = groupPages(files, (f) => readFileSync(join(dist, f), 'utf8'));
  const root = fileURLToPath(new URL('../', import.meta.url));
  const dates = commitDates(root);
  const lastmod = (code, path) => dates.get(sourceOf(code, path, (f) => existsSync(join(root, f))));
  const maps = renderSitemaps(groups, lastmod);
  for (const [code, xml] of maps) writeFileSync(join(dist, `sitemap-${code}.xml`), xml);
  const newest = new Map([...maps].map(([code, xml]) => [code, [...xml.matchAll(/<lastmod>([^<]+)/g)].map((m) => m[1]).sort().pop()]));
  const index = renderSitemapIndex([...maps.keys()], newest);
  writeFileSync(join(dist, 'sitemap.xml'), index);
  writeFileSync(join(dist, 'sitemap-index.xml'), index);
  const n = [...groups.values()].reduce((a, m) => a + m.size, 0);
  console.log(`sitemap: ${n} urls in ${groups.size} groups, ${maps.size} sitemaps`);
}
