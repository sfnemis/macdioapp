import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.LIVE_ALL = '1';
const { toUrlPath, groupPages, renderSitemap } = await import('../scripts/sitemap.mjs');

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

test('renderSitemap writes one url per variant with every alternate and x-default', () => {
  const xml = renderSitemap(groupPages(files, read));
  assert.match(xml, /<loc>https:\/\/macdio\.app\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/macdio\.app\/tr\/<\/loc>/);
  assert.doesNotMatch(xml, /index\.html/);
  assert.doesNotMatch(xml, /\/ios\//);
  const home = xml.split('<url>').find((u) => u.includes('<loc>https://macdio.app/</loc>'));
  assert.match(home, /hreflang="tr" href="https:\/\/macdio\.app\/tr\/"/);
  assert.match(home, /hreflang="x-default" href="https:\/\/macdio\.app\/"/);
  assert.equal((xml.match(/<url>/g) || []).length, 6);
});
