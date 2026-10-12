// Builds dist/sitemap.xml from the files Astro wrote, with one <url> per
// language variant and xhtml:link alternates for every other variant plus
// x-default (English). The Astro sitemap integration drops ".html" and mislabels
// locale roots, so the site has its own generator. Starlight links
// /sitemap-index.xml in <head>, so that file is written too and points here.
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

export function renderSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${SITE}/sitemap.xml</loc></sitemap>\n</sitemapindex>\n`;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  const files = walk(dist).map((f) => relative(dist, f));
  const groups = groupPages(files, (f) => readFileSync(join(dist, f), 'utf8'));
  writeFileSync(join(dist, 'sitemap.xml'), renderSitemap(groups));
  writeFileSync(join(dist, 'sitemap-index.xml'), renderSitemapIndex());
  const n = [...groups.values()].reduce((a, m) => a + m.size, 0);
  console.log(`sitemap: ${n} urls in ${groups.size} groups`);
}
