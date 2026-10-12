// Marketing pages ship no JavaScript except inline scripts, the site's own
// two files (parts.js, redesign.js) and the GA4 tag. Guide pages (Starlight)
// are allowed their search and table of contents scripts, so paths with a
// "guides" segment are skipped.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_SRC = /^(?:https:\/\/www\.googletagmanager\.com\/|\/(?:parts|redesign|hub-badge)\.js$)/;

export function scriptProblems(html) {
  const problems = [];
  for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
    const src = m[1].match(/\bsrc="([^"]*)"/);
    if (!src) continue;
    if (ALLOWED_SRC.test(src[1])) continue;
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
    if (!f.endsWith('.html') || f === '404.html' || /(^|\/)(guides|pagefind)\//.test(f)) continue;
    pages++;
    for (const p of scriptProblems(readFileSync(join(dist, f), 'utf8'))) { problems++; console.error(`${f}: ${p}`); }
  }
  console.log(problems ? `check-scripts: ${problems} problem(s)` : `check-scripts: ok, ${pages} marketing pages without external scripts`);
  process.exit(problems ? 1 : 0);
}
