// Each live locale must carry exactly the keys of en.json, within the title
// and description limits, with no em dash. English must not say we/our/us
// for the developer (one person makes Macdio). Non-live locales are skipped.
// The same rules run over every legacy page (src/legacy/<locale>/): title,
// description, JSON-LD and the visible text of <main>. Title and description
// lengths on legacy pages are warnings until the SEO pass rewrites them.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, liveLocales } from '../src/site/locales.mjs';
import { legacyPages, loadPage } from '../src/site/legacy.mjs';

// Case-sensitive on purpose: "US" (the country) is fine, "us" and "Us" are not.
const WE = /(?:\b(?:we|We|our|Our)\b|\bus\b|\bUs\b)/;

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
    if (code === 'en' && WE.test(v)) problems.push(`${code}: "we/our/us" in ${k}: ${v}`);
  }
  return live ? problems : [];
}

const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&');

export function checkPage(code, path, page) {
  const problems = [];
  const warnings = [];
  const fields = { title: page.title, description: page.description, 'JSON-LD': page.jsonld.join('\n'), main: visible(page.main) };
  for (const [k, v] of Object.entries(fields)) {
    if (v.includes('—')) problems.push(`${code} ${path}: em dash in ${k}`);
    if (code === 'en') {
      const m = v.match(new RegExp(`.{0,40}${WE.source}.{0,40}`));
      if (m) problems.push(`${code} ${path}: "we/our/us" in ${k}: ${m[0].replace(/\s+/g, ' ').trim()}`);
    }
  }
  if (page.title.length > 60) warnings.push(`${code} ${path}: title is ${page.title.length} chars (max 60)`);
  if (page.description.length > 160) warnings.push(`${code} ${path}: description is ${page.description.length} chars (max 160)`);
  return { problems, warnings };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = fileURLToPath(new URL('../src/i18n/', import.meta.url));
  const read = (code) => JSON.parse(readFileSync(join(dir, `${code}.json`), 'utf8'));
  const en = read('en');
  const files = new Set(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)));
  const live = new Set(liveLocales().map((l) => l.code));
  let problems = [];
  let warnings = [];
  let pages = 0;
  for (const l of LOCALES) {
    if (!files.has(l.code)) { if (live.has(l.code)) problems.push(`${l.code}: live but src/i18n/${l.code}.json is missing`); continue; }
    problems = problems.concat(checkLocale(l.code, read(l.code), en, { live: live.has(l.code) }));
    if (!live.has(l.code)) continue;
    for (const path of legacyPages(l.code)) {
      pages++;
      const r = checkPage(l.code, path, loadPage(l.code, path));
      problems = problems.concat(r.problems);
      warnings = warnings.concat(r.warnings);
    }
  }
  for (const w of warnings) console.warn(`warning: ${w}`);
  for (const p of problems) console.error(p);
  console.log(problems.length ? `i18n-check: ${problems.length} problem(s)` : `i18n-check: ok, ${live.size} live locale(s), ${pages} pages, ${warnings.length} length warning(s)`);
  process.exit(problems.length ? 1 : 0);
}
