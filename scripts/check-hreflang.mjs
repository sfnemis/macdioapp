// Every page's <link rel="alternate" hreflang> set must equal the sitemap's
// set for that page, and its canonical must be its own URL. Starlight pages
// and marketing pages both go through the site's head helpers; this proves
// the two halves and the sitemap agree.
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
