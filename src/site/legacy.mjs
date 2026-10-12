// The live site's pages, kept whole under src/legacy/<locale>/ exactly as
// they were served. The build takes the page-specific parts out of each file
// (title, description, keywords, robots, JSON-LD, <main>, inline body scripts)
// and Legacy.astro adds the shared shell. Links written relative to the page
// ("mac.html", "assets/x.webp", "../index.html") become root-relative, and a
// page link points into the locale folder when that locale has the page.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { localePath } from './paths.mjs';

// process.cwd() rather than import.meta.url: Astro bundles this module into
// dist/ chunks at build time, where a URL relative to the module is wrong.
export const ROOT = join(process.cwd(), 'src', 'legacy');

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|#39);/g, (e) => ENTITIES[e]);
const attr = (html, re) => { const m = html.match(re); return m ? m[1] : ''; };

export function extract(html) {
  const head = html.slice(0, html.indexOf('</head>'));
  const main = html.match(/<main\b([^>]*)>([\s\S]*?)<\/main>/);
  const body = main ? html.slice(html.indexOf('</main>')) : '';
  return {
    title: decode(attr(head, /<title>([\s\S]*?)<\/title>/)),
    description: decode(attr(head, /<meta name="description" content="([^"]*)"/)),
    keywords: decode(attr(head, /<meta name="keywords" content="([^"]*)"/)),
    robots: attr(head, /<meta name="robots" content="([^"]*)"/),
    ogType: attr(head, /<meta property="og:type" content="([^"]*)"/) || 'website',
    jsonld: [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1].trim()),
    mainAttrs: main ? main[1].trim() : '',
    // The live home page wrapped the crawler sitelinks inside <main>; the
    // shell renders nav and footer server-side now, so the block goes.
    main: main ? main[2].replace(/<div id="footer-slot">[\s\S]*?<\/nav>\s*<\/div>/, '').trim() : '',
    bodyScripts: [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]),
  };
}

const SKIP = /^(?:https?:|\/|#|mailto:|tel:|data:|javascript:)/;

export function localizeHtml(html, lang, exists) {
  return html.split(/(<script\b[\s\S]*?<\/script>)/).map((part, i) => {
    if (i % 2) return part;
    return part.replace(/\b(href|src|data-src|poster)="([^"]*)"/g, (all, name, value) => {
      if (!value || SKIP.test(value)) return all;
      const [, file, rest] = ('/' + value.replace(/^(?:\.\.\/)+/, '')).match(/^([^#?]*)(.*)$/);
      let path = file === '/index.html' ? '/' : file;
      if ((path.endsWith('.html') || path.endsWith('/')) && exists(lang, path)) path = localePath(lang, path);
      return `${name}="${path}${rest}"`;
    });
  }).join('');
}

export function pathToFile(path) {
  return (path.endsWith('/') ? path + 'index.html' : path).slice(1);
}

export function hasPage(code, path) {
  return existsSync(join(ROOT, code, pathToFile(path)));
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

// FAQPage JSON-LD built from the questions the page actually shows
// (<details class="faq-item"><summary>Q</summary><div class="faq-a">A</div>).
// Google requires the marked-up FAQ to match the visible one, and hand-kept
// copies drifted (support.html listed 5 of 8 questions, tunein-alternative
// worded two differently), so the visible FAQ is the only source.
const plain = (h) => decode(h.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
export function faqJsonld(main) {
  const items = [...main.matchAll(/<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-a">([\s\S]*?)<\/div>\s*<\/details>/g)];
  if (!items.length) return null;
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((m) => ({ '@type': 'Question', name: plain(m[1]), acceptedAnswer: { '@type': 'Answer', text: plain(m[2]) } })) });
}

// A page with no visible FAQ keeps whatever JSON-LD it has.
export function syncFaq(jsonld, main) {
  const faq = faqJsonld(main);
  if (!faq) return jsonld;
  const isFaq = (s) => { try { return JSON.parse(s)['@type'] === 'FAQPage'; } catch { return false; } };
  return [...jsonld.filter((s) => !isFaq(s)), faq];
}

// One page, ready for Legacy.astro: extracted, its links localized and its
// FAQPage JSON-LD rebuilt from the visible FAQ.
export function loadPage(code, path) {
  const page = extract(readFileSync(join(ROOT, code, pathToFile(path)), 'utf8'));
  page.main = localizeHtml(page.main, code, hasPage);
  page.jsonld = syncFaq(page.jsonld, page.main);
  return page;
}

// English site paths ('/', '/mac.html', '/guides/', '/guides/x.html') the
// locale has files for.
export function legacyPages(code) {
  const dir = join(ROOT, code);
  if (!existsSync(dir)) return [];
  return walk(dir).filter((f) => f.endsWith('.html')).map((f) => {
    const rel = '/' + f.slice(dir.length + 1).split('\\').join('/');
    return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
  }).sort();
}
