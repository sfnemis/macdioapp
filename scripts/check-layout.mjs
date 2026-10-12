// Layout check (tracker W20), run against wrangler dev before a deploy:
//   npm run build && npx wrangler dev --port 8787 --local   (other terminal)
//   PLAYWRIGHT_CORE=<path to playwright-core> node scripts/check-layout.mjs [path prefix]
// Every marketing page of every locale in Chrome: text that hugs the edge at
// 1440 px (an element that only looked centred inside a centring section, a
// heading running into both edges), and content that leaves a 375 px screen
// outside a sideways scroller (html clips it, so the visitor loses it).
// playwright-core is not a dependency of the site; point PLAYWRIGHT_CORE at any
// install (for example the npx cache), it drives the installed Google Chrome.
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const BASE = process.env.BASE || 'http://localhost:8787';
const only = process.argv[2] || '';
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(DIST).map((p) => '/' + relative(DIST, p)).filter((p) => p.endsWith('.html') && !/\/(pagefind|_astro)\//.test(p) && !/\/guides\//.test(p) && !/^\/ios\//.test(p) && (!only || p.startsWith(only)));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const wide = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
const narrow = await (await browser.newContext({ viewport: { width: 375, height: 800 }, reducedMotion: 'reduce' })).newPage();
const out = [];
for (const path of pages) {
  await wide.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  const edge = await wide.evaluate(() => {
    const hits = [];
    const skip = (el) => el.closest('nav, .nav, .mobile-menu, .hero-eq, .hero-aurora, .hub-card, .lightbox, footer, [aria-hidden="true"]') || getComputedStyle(el).position === 'fixed';
    const scrolly = (el) => { for (let e = el.parentElement; e; e = e.parentElement) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowX)) return true; } return false; };
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.nodeValue.trim().length > 2 ? 1 : 2 });
    const seen = new Set();
    while (tw.nextNode()) {
      const el = tw.currentNode.parentElement;
      if (!el || seen.has(el) || skip(el) || scrolly(el)) continue;
      seen.add(el);
      const r = document.createRange(); r.selectNodeContents(tw.currentNode);
      const b = r.getBoundingClientRect();
      if (!b.width || !b.height) continue;
      if (b.left < 60 || b.right > innerWidth - 60) hits.push(`${el.tagName.toLowerCase()}.${el.className || ''} "${tw.currentNode.nodeValue.trim().slice(0, 50)}" x=${Math.round(b.left)}..${Math.round(b.right)}`);
    }
    return hits.slice(0, 6);
  });
  await narrow.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  const over = await narrow.evaluate(() => {
    // Content that sticks out of the viewport and is not inside a sideways
    // scroller: html clips it (overflow-x: clip), so the visitor loses it.
    const inScroller = (el) => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) if (/(auto|scroll)/.test(getComputedStyle(e).overflowX)) return true; return false; };
    const hidden = (el) => el.closest('.mobile-menu, .nav-more-menu, .hero-aurora, .hero-eq, [aria-hidden="true"], .vh') || getComputedStyle(el).position === 'fixed';
    const wideEls = [];
    for (const el of document.querySelectorAll('body *')) { const b = el.getBoundingClientRect(); if (b.width && b.right > innerWidth + 1 && !hidden(el) && !inScroller(el)) { wideEls.push(`${el.tagName.toLowerCase()}.${el.className} r=${Math.round(b.right)}`); if (wideEls.length > 3) break; } }
    return { sw: wideEls.length ? 999 : innerWidth, wideEls };
  });
  if (edge.length || over.sw > 375) out.push(`${path}\n  edge@1440: ${edge.join(' | ') || '-'}\n  overflow@375: ${over.sw > 375 ? over.sw + ' ' + over.wideEls.join(', ') : '-'}`);
}
console.log(out.length ? out.join('\n') : 'clean');
console.log(`check-layout: ${pages.length} pages checked, ${out.length} with findings`);
await browser.close();
process.exit(out.length ? 1 : 0);
