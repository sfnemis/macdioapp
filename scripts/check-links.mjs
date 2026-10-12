// Every site-relative href and src in dist/ must point at a file that exists.
// A directory URL ("/guides/") resolves the way the Worker serves it: index.html.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}
let problems = 0;
const seen = new Set();
for (const f of walk(dist)) {
  if (!f.endsWith('.html')) continue;
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)/g)) {
    let target = m[1];
    if (target.startsWith('//') || target.startsWith('/cdn-cgi/')) continue;
    if (target.endsWith('/')) target += 'index.html';
    const key = `${relative(dist, f)} -> ${target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!existsSync(join(dist, target))) { problems++; console.error(`broken: ${key}`); }
  }
}
console.log(problems ? `check-links: ${problems} broken link(s)` : `check-links: ok, ${seen.size} internal references`);
process.exit(problems ? 1 : 0);
