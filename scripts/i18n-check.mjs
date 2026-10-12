// Each live locale must carry exactly the keys of en.json, within the title
// and description limits, with no em dash. English must not say we/our/us
// for the developer (one person makes Macdio). Non-live locales are skipped.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, liveLocales } from '../src/site/locales.mjs';

export function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out); else out[key] = v;
  }
  return out;
}

export function checkLocale(code, strings, en, { live }) {
  const problems = [];
  const have = flatten(strings);
  const want = flatten(en);
  if (live) {
    for (const k of Object.keys(want)) if (!(k in have)) problems.push(`${code}: missing key ${k}`);
    for (const k of Object.keys(have)) if (!(k in want)) problems.push(`${code}: extra key ${k}`);
  }
  for (const [k, v] of Object.entries(have)) {
    if (typeof v !== 'string') continue;
    if (v.includes('—')) problems.push(`${code}: em dash in ${k}`);
    if (/\.title$/.test(k) && v.length > 60) problems.push(`${code}: ${k} title is ${v.length} chars (max 60)`);
    if (/\.description$/.test(k) && v.length > 160) problems.push(`${code}: ${k} description is ${v.length} chars (max 160)`);
    // Case-sensitive on purpose: "US" (the country) is fine, "us" and "Us" are not.
    if (code === 'en' && /(?:\b(?:we|We|our|Our)\b|\bus\b|\bUs\b)/.test(v)) problems.push(`${code}: "we/our/us" in ${k}: ${v}`);
  }
  return live ? problems : [];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = fileURLToPath(new URL('../src/i18n/', import.meta.url));
  const read = (code) => JSON.parse(readFileSync(join(dir, `${code}.json`), 'utf8'));
  const en = read('en');
  const files = new Set(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)));
  const live = new Set(liveLocales().map((l) => l.code));
  let problems = [];
  for (const l of LOCALES) {
    if (!files.has(l.code)) { if (live.has(l.code)) problems.push(`${l.code}: live but src/i18n/${l.code}.json is missing`); continue; }
    problems = problems.concat(checkLocale(l.code, read(l.code), en, { live: live.has(l.code) }));
  }
  for (const p of problems) console.error(p);
  console.log(problems.length ? `i18n-check: ${problems.length} problem(s)` : `i18n-check: ok, ${live.size} live locale(s)`);
  process.exit(problems.length ? 1 : 0);
}
