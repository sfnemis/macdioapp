// A translated page must carry exactly the English page's markup: the same
// tags with the same classes in the same order, the same hrefs, the same
// inline script, and a guide the same headings count and table rows. Only
// the words may differ. Runs over every live locale (src/site/locales.mjs); a
// live locale missing a file the English site has is reported too. Locales
// still being translated stay out of the build until they are switched live.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { liveLocales, DEFAULT } from '../src/site/locales.mjs';

const strip = (h) => h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '<script type="application/ld+json"></script>');

export function skeleton(html) {
  return [...strip(html).matchAll(/<\/?([a-z][a-z0-9-]*)\b([^>]*)>/gi)].map((m) => {
    const cls = m[2].match(/\bclass="([^"]*)"/);
    const href = m[2].match(/\bhref="([^"]*)"/);
    const src = m[2].match(/\b(?:src|data-src|data-poster|poster)="([^"]*)"/);
    return (m[0].startsWith('</') ? '/' : '') + m[1].toLowerCase() + (cls ? '.' + cls[1].trim().split(/\s+/).join('.') : '') + (href ? `[${href[1]}]` : '') + (src ? `(${src[1]})` : '');
  });
}

export function inlineScripts(html) {
  return [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1].trim());
}

export function compareHtml(en, other) {
  const a = skeleton(en), b = skeleton(other);
  const problems = [];
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i < a.length || i < b.length) problems.push(`markup differs at tag ${i}: en ${a.slice(i, i + 3).join(' ')} / other ${b.slice(i, i + 3).join(' ')} (${a.length} vs ${b.length} tags)`);
  const sa = inlineScripts(en), sb = inlineScripts(other);
  if (sa.join('\n') !== sb.join('\n')) problems.push('inline script differs');
  if (/—/.test(other)) problems.push('em dash');
  const ld = [...other.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of ld) { try { JSON.parse(m[1]); } catch (e) { problems.push(`JSON-LD does not parse: ${e.message}`); } }
  return problems;
}

export function compareMd(en, other) {
  const problems = [];
  const count = (s, re) => (s.match(re) || []).length;
  for (const [name, re] of [['## headings', /^## /gm], ['### headings', /^### /gm], ['table rows', /^\|/gm], ['list items', /^- /gm], ['images', /!\[/g]]) {
    if (count(en, re) !== count(other, re)) problems.push(`${name}: ${count(en, re)} in en, ${count(other, re)} here`);
  }
  const keys = (s) => (s.match(/^---\n([\s\S]*?)\n---/) || ['', ''])[1].split('\n').filter((l) => /^[a-zA-Z]+:/.test(l)).map((l) => l.split(':')[0]);
  if (keys(en).join() !== keys(other).join()) problems.push(`frontmatter keys: ${keys(en).join(',')} vs ${keys(other).join(',')}`);
  const faq = (s) => (s.match(/^ {2}- q: /gm) || []).length;
  if (faq(en) !== faq(other)) problems.push(`faq entries: ${faq(en)} vs ${faq(other)}`);
  if (/—/.test(other)) problems.push('em dash');
  return problems;
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const legacy = join(root, 'src', 'legacy');
  const docs = join(root, 'src', 'content', 'docs');
  const enPages = walk(join(legacy, 'en')).filter((f) => f.endsWith('.html')).map((f) => relative(join(legacy, 'en'), f));
  const enGuides = readdirSync(join(docs, 'guides')).filter((f) => f.endsWith('.md'));
  let problems = 0, files = 0;
  const say = (m) => { problems++; console.error(m); };
  for (const code of liveLocales().map((l) => l.code).filter((c) => c !== DEFAULT)) {
    for (const rel of enPages) {
      const f = join(legacy, code, rel);
      if (!existsSync(f)) { say(`${code}/${rel}: missing`); continue; }
      files++;
      for (const p of compareHtml(readFileSync(join(legacy, 'en', rel), 'utf8'), readFileSync(f, 'utf8'))) say(`${code}/${rel}: ${p}`);
    }
    const gdir = join(docs, code, 'guides');
    if (!existsSync(gdir)) { say(`${code}: no guides folder`); continue; }
    for (const name of enGuides) {
      const f = join(gdir, name);
      if (!existsSync(f)) { say(`${code}/guides/${name}: missing`); continue; }
      files++;
      for (const p of compareMd(readFileSync(join(docs, 'guides', name), 'utf8'), readFileSync(f, 'utf8'))) say(`${code}/guides/${name}: ${p}`);
    }
  }
  console.log(problems ? `check-i18n-markup: ${problems} problem(s)` : `check-i18n-markup: ok, ${files} translated files match the English markup`);
  process.exit(problems ? 1 : 0);
}
