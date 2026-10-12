// Every URL the old site listed in its sitemap must exist in dist/ (spec
// success criterion 2). PENDING names the ones a later phase delivers; an
// entry that starts existing must be removed from PENDING, so the list only
// shrinks and the launch gate does not depend on memory.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PENDING = [
  '/tr/', '/de/',                                   // F4 translations
  '/guides/best-internet-radio-apps.html', '/guides/carplay-radio.html', '/guides/find-radio-stream-url.html',
  '/guides/how-to-listen-to-radio-on-mac.html', '/guides/identify-song-on-radio.html', '/guides/iphone-fm-radio.html',
  '/guides/radio-on-apple-watch.html', '/guides/record-internet-radio.html', '/guides/siri-radio.html', // F3 guide hub
];

export function legacyPaths(xml) {
  return [...xml.matchAll(/<loc>https:\/\/macdio\.app([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
}

export function missingLegacy(paths, exists, pending) {
  const file = (p) => (p.endsWith('/') ? p + 'index.html' : p);
  const missing = paths.filter((p) => !exists(file(p)) && !pending.includes(p));
  const resolved = pending.filter((p) => exists(file(p)));
  return { missing, resolved };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const paths = legacyPaths(readFileSync(join(root, 'old-site/sitemap.xml'), 'utf8'));
  const { missing, resolved } = missingLegacy(paths, (p) => existsSync(join(root, 'dist', p)), PENDING);
  for (const p of missing) console.error(`legacy URL missing from dist: ${p}`);
  // LIVE_ALL builds every locale for local tests, so pending locale roots show up early; only a normal build must prune PENDING.
  const stale = process.env.LIVE_ALL === '1' ? [] : resolved;
  for (const p of stale) console.error(`legacy URL now exists, remove it from PENDING in scripts/check-legacy.mjs: ${p}`);
  const problems = missing.length + stale.length;
  console.log(problems ? `check-legacy: ${problems} problem(s)` : `check-legacy: ok, ${paths.length - PENDING.length} of ${paths.length} legacy URLs present, ${PENDING.length} pending`);
  process.exit(problems ? 1 : 0);
}
