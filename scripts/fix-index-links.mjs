// Starlight links the guide hub as /<locale>/guides/index.html (its sidebar
// "All guides" entry and the language select), a second URL for the
// canonical /<locale>/guides/. A Worker redirect cannot fix it (the Worker
// itself rewrites /guides/ to index.html), so the built pages are rewritten
// after astro build: any same-site link to ".../index.html" points at the
// directory URL.
//
// A translated guide's Markdown links are English site paths, and nothing in
// Starlight localizes them (its own sidebar and pager are already localized).
// The same pass points them at the locale when it has the page. It stays here
// rather than in a rehype plugin because Astro 7 only runs those through
// @astrojs/markdown-remark, which would replace the Markdown processor.
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export function fixIndexLinks(html) {
  return html.replace(/\b(href|value)="(\/(?:[^"/]+\/)*)index\.html"/g, '$1="$2"');
}

// Only the guide body: the language menu in the header has to keep its links.
export function localizeGuideBody(html, code, exists) {
  const start = html.indexOf('<div class="sl-markdown-content">');
  const end = html.indexOf('</main>', start);
  if (start < 0 || end < 0) return html;
  const body = html.slice(start, end).replace(/href="(\/(?!\/)[^"#?]*)([^"]*)"/g, (all, path, rest) =>
    ((path.endsWith('.html') || path.endsWith('/')) && exists(code, path) ? `href="/${code}${path}${rest}"` : all));
  return html.slice(0, start) + body + html.slice(end);
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  const has = (code, path) => existsSync(join(dist, code, path.endsWith('/') ? path + 'index.html' : path));
  let changed = 0;
  for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
    const s = readFileSync(f, 'utf8');
    const code = relative(dist, f).match(/^([^/]+)\/guides\//)?.[1];
    const t = fixIndexLinks(code ? localizeGuideBody(s, code, has) : s);
    if (t !== s) { writeFileSync(f, t); changed++; }
  }
  console.log(`fix-index-links: ${changed} page(s) rewritten`);
}
