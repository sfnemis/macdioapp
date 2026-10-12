import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { pickLocale, mapTag } from '../worker.js';

const env = { ASSETS: { fetch: async (req) => new Response('asset:' + new URL(req.url).pathname, { status: 200 }) } };
const get = (path, headers = {}) => worker.fetch(new Request('https://macdio.app' + path, { headers }), env);

test('mapTag maps regions and scripts to the 14 codes', () => {
  assert.equal(mapTag('tr-tr'), 'tr');
  assert.equal(mapTag('pt-pt'), 'pt-br');
  assert.equal(mapTag('pt'), 'pt-br');
  assert.equal(mapTag('zh-tw'), 'zh-hant');
  assert.equal(mapTag('zh-hant-hk'), 'zh-hant');
  assert.equal(mapTag('zh'), 'zh-hans');
  assert.equal(mapTag('zh-cn'), 'zh-hans');
  assert.equal(mapTag('en-gb'), 'en');
  assert.equal(mapTag('sv'), null);
  assert.equal(mapTag('*'), null);
});

test('pickLocale honours q values and order, falls back to en', () => {
  assert.equal(pickLocale('de;q=0.8, en;q=0.9'), 'en');
  assert.equal(pickLocale('tr-TR,tr;q=0.9,en;q=0.8'), 'tr');
  assert.equal(pickLocale('sv, fi'), 'en');
  assert.equal(pickLocale('*'), 'en');
  assert.equal(pickLocale(''), 'en');
  assert.equal(pickLocale(null), 'en');
  assert.equal(pickLocale('tr;q=abc'), 'tr');
  assert.equal(pickLocale(';;,,'), 'en');
});

test('pickLocale lets a valid cookie win and ignores an unknown one', () => {
  assert.equal(pickLocale('tr', 'lang=de'), 'de');
  assert.equal(pickLocale('tr', 'a=b; lang=en; c=d'), 'en');
  assert.equal(pickLocale('tr', 'lang=xx'), 'tr');
});

test('/ redirects a Turkish browser, serves English to crawlers and to English browsers', async () => {
  const r1 = await get('/', { 'Accept-Language': 'tr-TR,tr;q=0.9' });
  assert.equal(r1.status, 302);
  assert.equal(r1.headers.get('Location'), 'https://macdio.app/tr/');
  assert.equal(r1.headers.get('Vary'), 'Accept-Language');
  const r2 = await get('/', { 'Accept-Language': 'tr', 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' });
  assert.equal(r2.status, 200);
  assert.equal(await r2.text(), 'asset:/index.html');
  const r3 = await get('/', { 'Accept-Language': 'en-US,en;q=0.9' });
  assert.equal(r3.status, 200);
  assert.equal(r3.headers.get('Vary'), 'Accept-Language');
  const r4 = await get('/', {});
  assert.equal(r4.status, 200);
});

test('/ with a lang cookie follows the cookie', async () => {
  const r = await get('/', { 'Accept-Language': 'tr', Cookie: 'lang=de' });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('Location'), 'https://macdio.app/de/');
  const r2 = await get('/', { 'Accept-Language': 'tr', Cookie: 'lang=en' });
  assert.equal(r2.status, 200);
});

test('directory URLs serve their index.html and deep links are never redirected', async () => {
  assert.equal(await (await get('/tr/', { 'Accept-Language': 'de' })).text(), 'asset:/tr/index.html');
  assert.equal(await (await get('/guides/', {})).text(), 'asset:/guides/index.html');
  assert.equal(await (await get('/features.html', { 'Accept-Language': 'tr' })).text(), 'asset:/features.html');
});
