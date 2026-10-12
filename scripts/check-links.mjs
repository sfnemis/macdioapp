// Every site-relative href, src, poster and clip data attribute in dist/ must
// point at a file that exists. A directory URL ("/guides/") resolves the way
// the Worker serves it: index.html.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export function linkTargets(html) {
  const out = [];
  for (const m of html.matchAll(/\b(?:href|src|data-src|poster|data-poster|data-webm|data-mp4)="(\/[^"#?]*)/g)) {
    // A URL is percent-encoded; the file on disk is not ("Popular%20Nearby.webp").
    let target = decodeURIComponent(m[1]);
    if (target.startsWith('//') || target.startsWith('/cdn-cgi/')) continue;
    if (target.endsWith('/')) target += 'index.html';
    out.push(target);
  }
  return out;
}

// Cloudflare matches file names exactly; macOS (APFS) does not, and
// existsSync is also true for a directory. A link counts only when every
// segment matches a directory entry exactly and the last one is a file.
const listing = new Map();
export function existsExactly(root, target) {
  let dir = root;
  const parts = target.split('/').filter(Boolean);
  for (let i = 0; i < parts.length; i++) {
    if (!listing.has(dir)) { try { listing.set(dir, new Set(readdirSync(dir))); } catch { return false; } }
    if (!listing.get(dir).has(parts[i])) return false;
    dir = join(dir, parts[i]);
  }
  return parts.length > 0 && statSync(dir).isFile();
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
      if (!existsExactly(dist, target)) { problems++; console.error(`broken: ${key}`); }
    }
  }
  console.log(problems ? `check-links: ${problems} broken link(s)` : `check-links: ok, ${seen.size} internal references`);
  process.exit(problems ? 1 : 0);
}
