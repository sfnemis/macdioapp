// Marketing pages ship no JavaScript except inline scripts, the site's own
// files (parts.js, redesign.js, hub-badge.js) and Umami, the cookie-free visit
// counter (tracker W28), self-hosted at stats.devdio.pro since W29, with its
// recorder for replay and heatmaps (W30). The counter's tag must carry
// data-domains="macdio.app" so local previews and test runs are not counted.
// Google Analytics is gone from the site (2026-10-13); any gtag tag or loader
// fails here, guides included.
// Guide pages (Starlight)
// are allowed their search and table of contents scripts, so paths with a
// "guides" segment are skipped.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_SRC = /^\/(?:parts|redesign|hub-badge)\.js$/;
const UMAMI = 'https://stats.devdio.pro/script.js'; // self-hosted Umami (W29)
// Session replay and heatmaps (W30). It records only once the tracker above has
// a session, and the tracker never sends outside macdio.app (data-domains).
const UMAMI_RECORDER = 'https://stats.devdio.pro/recorder.js';

export function scriptProblems(html) {
  const problems = [];
  // Every App Store click is counted (W34); a page that links to the store
  // without the counter would undercount silently.
  // A redirect stub (/ios/) sends everyone to the store at once and is exempt.
  const storeRedirect = /location\.replace\('https:\/\/apps\.apple\.com\//.test(html);
  if (!storeRedirect && html.includes('href="https://apps.apple.com/') && !html.includes('/* app-store-clicks */')) problems.push('App Store link without the App Store click counter (src/components/AppStoreClicks.astro)');
  if (/googletagmanager\.com|gtag\(|G-QR2MZ9NF2N/.test(html)) problems.push('Google Analytics is still on the page; the site counts visits with Umami only');
  // Every JSON-LD block must parse; a "</script>" inside a string would end
  // the block early and leave the rest of it as page text.
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`JSON-LD does not parse: ${e.message}`); }
  }
  for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
    const src = m[1].match(/\bsrc="([^"]*)"/);
    if (!src) continue;
    if (ALLOWED_SRC.test(src[1])) continue;
    if (src[1].startsWith('https://www.googletagmanager.com/')) continue; // reported above
    if (src[1] === UMAMI_RECORDER) continue;
    if (src[1] === UMAMI) { if (!/\bdata-domains="macdio\.app"/.test(m[1])) problems.push('Umami without data-domains="macdio.app" counts local previews and test runs'); continue; }
    problems.push(`external script ${src[1]}`);
  }
  return problems;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  let problems = 0;
  let pages = 0;
  for (const f of walk(dist).map((p) => relative(dist, p))) {
    if (!f.endsWith('.html') || /(^|\/)pagefind\//.test(f)) continue;
    // Guide pages (Starlight) may load its search and table-of-contents
    // scripts; only their JSON-LD is checked.
    const guide = /(^|\/)guides\//.test(f);
    pages++;
    for (const p of scriptProblems(readFileSync(join(dist, f), 'utf8'))) {
      if (guide && p.startsWith('external script')) continue;
      problems++; console.error(`${f}: ${p}`);
    }
  }
  console.log(problems ? `check-scripts: ${problems} problem(s)` : `check-scripts: ok, ${pages} pages: JSON-LD parses everywhere, no external scripts outside the guides`);
  process.exit(problems ? 1 : 0);
}
