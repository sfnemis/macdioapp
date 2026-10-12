// Starlight links the guide hub as /<locale>/guides/index.html (its sidebar
// "All guides" entry and the language select), a second URL for the
// canonical /<locale>/guides/. A Worker redirect cannot fix it (the Worker
// itself rewrites /guides/ to index.html), so the built pages are rewritten
// after astro build: any same-site link to ".../index.html" points at the
// directory URL.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function fixIndexLinks(html) {
  return html.replace(/\b(href|value)="(\/(?:[^"/]+\/)*)index\.html"/g, '$1="$2"');
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  let changed = 0;
  for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
    const s = readFileSync(f, 'utf8');
    const t = fixIndexLinks(s);
    if (t !== s) { writeFileSync(f, t); changed++; }
  }
  console.log(`fix-index-links: ${changed} page(s) rewritten`);
}
