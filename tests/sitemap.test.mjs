import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.LIVE_ALL = '1';
const { toUrlPath, groupPages, sourceOf, renderSitemaps, renderSitemapIndex } = await import('../scripts/sitemap.mjs');

const files = ['index.html', 'tr/index.html', 'features.html', 'tr/features.html', 'guides/index.html',
  'guides/carplay-radio.html', 'ios/index.html', '404.html', 'pagefind/x.html'];
const bodies = {
  'ios/index.html': '<meta name="robots" content="noindex,follow">',
};
const read = (f) => bodies[f] || '<html>';

test('toUrlPath turns index files into directory URLs and keeps .html elsewhere', () => {
  assert.equal(toUrlPath('index.html'), '/');
  assert.equal(toUrlPath('tr/index.html'), '/tr/');
  assert.equal(toUrlPath('guides/carplay-radio.html'), '/guides/carplay-radio.html');
});

test('groupPages groups locale variants and drops 404, pagefind and noindex pages', () => {
  const groups = groupPages(files, read);
  assert.deepEqual([...groups.keys()].sort(), ['/', '/features.html', '/guides/', '/guides/carplay-radio.html']);
  assert.deepEqual([...groups.get('/').entries()], [['en', '/'], ['tr', '/tr/']]);
});

const lastmod = (code, path) => `2026-11-0${code === 'tr' ? 2 : 1}`;

test('renderSitemaps writes one file per language, each url with its lastmod and every alternate', () => {
  const maps = renderSitemaps(groupPages(files, read), lastmod);
  assert.deepEqual([...maps.keys()].sort(), ['en', 'tr']);
  const en = maps.get('en'), tr = maps.get('tr');
  assert.match(en, /<loc>https:\/\/macdio\.app\/<\/loc>\n    <lastmod>2026-11-01<\/lastmod>/);
  assert.match(tr, /<loc>https:\/\/macdio\.app\/tr\/<\/loc>\n    <lastmod>2026-11-02<\/lastmod>/);
  assert.doesNotMatch(en, /<loc>https:\/\/macdio\.app\/tr\//);
  assert.doesNotMatch(en + tr, /index\.html/);
  assert.doesNotMatch(en + tr, /\/ios\//);
  const home = en.split('<url>').find((u) => u.includes('<loc>https://macdio.app/</loc>'));
  assert.match(home, /hreflang="tr" href="https:\/\/macdio\.app\/tr\/"/);
  assert.match(home, /hreflang="x-default" href="https:\/\/macdio\.app\/"/);
  const trHome = tr.split('<url>').find((u) => u.includes('<loc>https://macdio.app/tr/</loc>'));
  assert.match(trHome, /hreflang="en" href="https:\/\/macdio\.app\/"/);
  assert.equal((en.match(/<url>/g) || []).length + (tr.match(/<url>/g) || []).length, 6);
});

test('renderSitemaps refuses a url without a lastmod', () => {
  assert.throws(() => renderSitemaps(groupPages(files, read), () => undefined), /no <lastmod>/);
});

test('renderSitemapIndex lists one sitemap per language, English first', () => {
  const xml = renderSitemapIndex(['tr', 'en'], new Map([['en', '2026-11-01'], ['tr', '2026-11-02']]));
  assert.deepEqual([...xml.matchAll(/<loc>([^<]+)/g)].map((m) => m[1]), ['https://macdio.app/sitemap-en.xml', 'https://macdio.app/sitemap-tr.xml']);
  assert.match(xml, /sitemap-tr\.xml<\/loc>\n    <lastmod>2026-11-02/);
});

test('sourceOf finds the file behind every kind of url', () => {
  const yes = () => true;
  assert.equal(sourceOf('en', '/', yes), 'src/legacy/en/index.html');
  assert.equal(sourceOf('tr', '/', yes), 'src/legacy/tr/index.html');
  assert.equal(sourceOf('en', '/mac.html', yes), 'src/legacy/en/mac.html');
  assert.equal(sourceOf('de', '/features/song-id.html', yes), 'src/legacy/de/features/song-id.html');
  assert.equal(sourceOf('en', '/guides/siri-radio.html', yes), 'src/content/docs/guides/siri-radio.md');
  assert.equal(sourceOf('tr', '/guides/siri-radio.html', yes), 'src/content/docs/tr/guides/siri-radio.md');
  assert.equal(sourceOf('tr', '/guides/', yes), 'src/i18n/tr.json');
  assert.equal(sourceOf('en', '/nope.html', () => false), null);
});
