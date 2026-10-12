// Marketing pages ship no JavaScript except inline scripts and the site's own
// files (parts.js, redesign.js, hub-badge.js). The GA4 tag is added by an
// inline script on macdio.app only; a static gtag tag would count every
// localhost and preview load as a visit, so it fails here, guides included.
// Guide pages (Starlight)
// are allowed their search and table of contents scripts, so paths with a
// "guides" segment are skipped.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_SRC = /^\/(?:parts|redesign|hub-badge)\.js$/;

export function scriptProblems(html) {
  const problems = [];
  // Every JSON-LD block must parse; a "</script>" inside a string would end
  // the block early and leave the rest of it as page text.
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`JSON-LD does not parse: ${e.message}`); }
  }
  for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
    const src = m[1].match(/\bsrc="([^"]*)"/);
    if (!src) continue;
    if (ALLOWED_SRC.test(src[1])) continue;
    if (src[1].startsWith('https://www.googletagmanager.com/')) { problems.push('GA4 tag loads on every host; load it from the macdio.app-only inline script'); continue; }
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
