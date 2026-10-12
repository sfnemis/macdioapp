// Hallmark discipline 3: every colour and font on the site comes from
// src/styles/tokens.css. Scans .css and .astro files under src/ (style blocks,
// style attributes and class-less inline CSS) for raw colour values and
// font-family declarations that bypass the tokens.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAW_COLOUR = /(#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\((?!\s*from\s)[^)]*\))/gi;
const FONT = /font-family\s*:(?!\s*var\(--font-)[^;}]+/gi;
const EXEMPT = new Set(['src/styles/starlight.css']);

export function cssProblems(raw, file) {
  // Comments (the Hallmark stamp quotes the palette) and <meta> tags
  // (theme-color must be a literal) are not styling and are skipped.
  const text = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<meta\b[^>]*>/gi, '').replace(/@font-face\s*\{[^}]*\}/g, '');
  const problems = [];
  for (const m of text.matchAll(RAW_COLOUR)) problems.push(`${file}: ${m[1]} is not a token`);
  for (const m of text.matchAll(FONT)) problems.push(`${file}: ${m[0].trim()} bypasses the font tokens`);
  return problems;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  let problems = [];
  for (const f of walk(join(root, 'src'))) {
    const rel = relative(root, f);
    if (!/\.(css|astro)$/.test(rel) || EXEMPT.has(rel)) continue;
    problems = problems.concat(cssProblems(readFileSync(f, 'utf8'), rel));
  }
  for (const p of problems) console.error(p);
  console.log(problems.length ? `check-css: ${problems.length} problem(s)` : 'check-css: ok, every colour and font under src/ is a token (public/*.css and the legacy pages are not scanned)');
  process.exit(problems.length ? 1 : 0);
}
