// App Store Connect counts downloads per campaign (Analytics, Acquisition,
// Campaigns) when the store link carries the provider token (pt, the same for
// every app of the account) and a campaign token (ct). The sources keep the
// plain store URL in four forms (legacy HTML, guide Markdown, the i18n
// storeUrl per storefront, JSON-LD); after astro build every App Store link a
// visitor can click is tagged ct=macdio-web here (tracker W35). JSON-LD and
// links that already carry a query, like the /ios/ redirect's ct=macdio-ios,
// are left alone.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CAMPAIGN = 'pt=96130860&amp;ct=macdio-web&amp;mt=8';

export function tagStoreLinks(html) {
  return html.replace(/href="(https:\/\/apps\.apple\.com\/[^"?#]*id6761737888)"/g, `href="$1?${CAMPAIGN}"`);
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  let changed = 0;
  for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
    const s = readFileSync(f, 'utf8');
    const t = tagStoreLinks(s);
    if (t !== s) { writeFileSync(f, t); changed++; }
  }
  console.log(`store-campaign: ${changed} page(s) tagged ct=macdio-web`);
}
