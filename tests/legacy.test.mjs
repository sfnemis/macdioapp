import { test } from 'node:test';
import assert from 'node:assert/strict';
const { extract, localizeHtml, legacyPages, hasPage, pathToFile, loadPage } = await import('../src/site/legacy.mjs');

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>
<title>Macdio: Live Radio &amp; Podcasts</title>
<meta name="description" content="60,000+ stations &amp; podcasts.">
<meta name="keywords" content="radio, podcasts">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://macdio.app/">
<script type="application/ld+json">
{ "@type": "SoftwareApplication" }
</script>
<script type="application/ld+json">{ "@type": "FAQPage" }</script>
<link rel="stylesheet" href="redesign.css">
</head>
<body>
<div id="nav-slot"></div>
<main id="top">
<section class="section hero" id="hero"><h1>One App.</h1></section>
<div id="footer-slot">
  <nav class="static-sitelinks" aria-label="Site links">
  <a href="mac.html">Internet radio app for Mac</a>
  </nav>
</div>
</main>
<script src="parts.js"></script>
<script src="redesign.js"></script>
</body>
</html>`;

test('extract takes the page-specific head and main, without the sitelinks block', () => {
  const p = extract(page);
  assert.equal(p.title, 'Macdio: Live Radio & Podcasts');
  assert.equal(p.description, '60,000+ stations & podcasts.');
  assert.equal(p.keywords, 'radio, podcasts');
  assert.equal(p.robots, 'index, follow');
  assert.deepEqual(p.jsonld, ['{ "@type": "SoftwareApplication" }', '{ "@type": "FAQPage" }']);
  assert.equal(p.mainAttrs, 'id="top"');
  assert.equal(p.ogType, 'website');
  assert.equal(p.main, '<section class="section hero" id="hero"><h1>One App.</h1></section>');
  assert.deepEqual(p.bodyScripts, []);
});

test('extract keeps a page-specific inline body script and a classed main', () => {
  const html = '<html><head><title>Stations</title></head><body><main class="platform-page"><p>x</p></main>\n<div id="footer-slot"><nav class="static-sitelinks"><a href="a.html">a</a></nav></div>\n<script src="parts.js"></script>\n<script>\nvar API = 1;\n</script>\n</body></html>';
  const p = extract(html);
  assert.equal(p.mainAttrs, 'class="platform-page"');
  assert.equal(p.main, '<p>x</p>');
  assert.deepEqual(p.bodyScripts, ['\nvar API = 1;\n']);
  assert.equal(p.keywords, '');
  assert.deepEqual(p.jsonld, []);
});

test('localizeHtml makes relative links root-relative and localizes page links the locale has', () => {
  const exists = (code, path) => code === 'en' || path === '/';
  const html = '<a href="mac.html">m</a> <a href="../index.html#compare">h</a> <a href="guides/">g</a> <img src="assets/a.webp"> <source data-src="assets/vids/x.mp4"> <a href="#identify">i</a> <a href="https://x.com/">x</a> <a href="mailto:a@b.c">e</a> <a href="/already.html">r</a> <a href="macdio_PressKit.pdf">p</a>';
  assert.equal(localizeHtml(html, 'en', exists),
    '<a href="/mac.html">m</a> <a href="/#compare">h</a> <a href="/guides/">g</a> <img src="/assets/a.webp"> <source data-src="/assets/vids/x.mp4"> <a href="#identify">i</a> <a href="https://x.com/">x</a> <a href="mailto:a@b.c">e</a> <a href="/already.html">r</a> <a href="/macdio_PressKit.pdf">p</a>');
  assert.equal(localizeHtml('<a href="mac.html">m</a> <a href="../index.html#compare">h</a>', 'tr', exists),
    '<a href="/mac.html">m</a> <a href="/tr/#compare">h</a>');
});

test('localizeHtml leaves script contents alone', () => {
  const html = '<script>\nvar s = \'<img src="\' + logo + \'">\';\n</script><a href="mac.html">m</a>';
  assert.equal(localizeHtml(html, 'en', () => true), '<script>\nvar s = \'<img src="\' + logo + \'">\';\n</script><a href="/mac.html">m</a>');
});

test('pathToFile maps site paths to files in a locale folder', () => {
  assert.equal(pathToFile('/'), 'index.html');
  assert.equal(pathToFile('/guides/'), 'guides/index.html');
  assert.equal(pathToFile('/mac.html'), 'mac.html');
  assert.equal(pathToFile('/guides/x.html'), 'guides/x.html');
});

test('legacyPages lists the English site paths a locale has on disk', () => {
  const en = legacyPages('en');
  assert.ok(en.includes('/'));
  assert.ok(en.includes('/mac.html'));
  // The guides are Starlight Markdown now, not legacy pages.
  assert.ok(!en.some((p) => p.startsWith('/guides/')));
  assert.ok(!en.includes('/sitemap.xml'));
  assert.ok(legacyPages('tr').includes('/'));
  assert.ok(hasPage('tr', '/'));
  assert.ok(!hasPage('xx', '/'));
  assert.deepEqual(legacyPages('xx'), []);
});

test('loadPage reads a live page with its links localized', () => {
  const home = loadPage('en', '/');
  assert.equal(home.title, 'Macdio: Live Radio & Podcasts');
  assert.equal(home.jsonld.length, 3);
  assert.ok(home.main.includes('href="/features.html"'));
  assert.ok(home.main.includes('src="/assets/app-icon-276.png"'));
  assert.ok(!home.main.includes('static-sitelinks'));
  const compare = loadPage('en', '/tunein-alternative.html');
  assert.equal(compare.ogType, 'article');
  assert.equal(compare.mainAttrs, 'class="platform-page"');
  const tr = loadPage('tr', '/');
  assert.ok(tr.main.includes('src="/assets/screenshots/iPhone_web/Discover-b.webp"'));
});

test('faqJsonld builds FAQPage from the visible FAQ and syncFaq replaces a stale FAQPage block', async () => {
  const { faqJsonld, syncFaq } = await import('../src/site/legacy.mjs');
  const main = '<div class="faq"><details class="faq-item"><summary>Is it free?</summary><div class="faq-a">No. It is <a href="/pricing.html">14.99 US dollars</a> once &amp; for all.</div></details><details class="faq-item"><summary>Android?</summary><div class="faq-a">No.</div></details></div>';
  const ld = JSON.parse(faqJsonld(main));
  assert.equal(ld['@type'], 'FAQPage');
  assert.deepEqual(ld.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), [['Is it free?', 'No. It is 14.99 US dollars once & for all.'], ['Android?', 'No.']]);
  const stale = ['{"@type":"Article"}', '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Old","acceptedAnswer":{"@type":"Answer","text":"old"}}]}'];
  const out = syncFaq(stale, main);
  assert.equal(out.length, 2);
  assert.equal(out[0], '{"@type":"Article"}');
  assert.equal(JSON.parse(out[1]).mainEntity.length, 2);
  assert.deepEqual(syncFaq(['{"@type":"Article"}'], main).map((s) => JSON.parse(s)['@type']), ['Article', 'FAQPage']);
  assert.deepEqual(syncFaq(['{"@type":"Article"}'], '<p>No FAQ</p>'), ['{"@type":"Article"}']);
});
