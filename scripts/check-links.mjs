// Every site-relative href, src, poster and clip data attribute in dist/ must
// point at a file that exists. A directory URL ("/guides/") resolves the way
// the Worker serves it: index.html.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export function linkTargets(html) {
  const out = [];
  for (const m of html.matchAll(/\b(?:href|src|data-src|poster|data-webm|data-mp4)="(\/[^"#?]*)/g)) {
    // A URL is percent-encoded; the file on disk is not ("Popular%20Nearby.webp").
    let target = decodeURIComponent(m[1]);
    if (target.startsWith('//') || target.startsWith('/cdn-cgi/')) continue;
    if (target.endsWith('/')) target += 'index.html';
    out.push(target);
  }
  return out;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  let problems = 0;
  const seen = new Set();
  for (const f of walk(dist)) {
    if (!f.endsWith('.html')) continue;
    for (const target of linkTargets(readFileSync(f, 'utf8'))) {
      const key = `${relative(dist, f)} -> ${target}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!existsSync(join(dist, target))) { problems++; console.error(`broken: ${key}`); }
    }
  }
  console.log(problems ? `check-links: ${problems} broken link(s)` : `check-links: ok, ${seen.size} internal references`);
  process.exit(problems ? 1 : 0);
}
