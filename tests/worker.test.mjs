import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { pickLocale, mapTag, handle } from '../worker.js';
import { LOCALES } from '../src/site/locales.mjs';

const ALL = LOCALES.map((l) => l.code);
const env = { ASSETS: { fetch: async (req) => new Response('asset:' + new URL(req.url).pathname, { status: 200 }) } };
// `handle` takes the live locale list explicitly so the redirect cases do not depend on
// which languages are live today; `worker.fetch` uses the real list.
const get = (path, headers = {}, live = ['en', 'tr', 'de']) => handle(new Request('https://macdio.app' + path, { headers }), env, live);

test('mapTag maps regions and scripts to the 14 codes', () => {
  assert.equal(mapTag('tr-tr', ALL), 'tr');
  assert.equal(mapTag('pt-pt', ALL), 'pt-br');
  assert.equal(mapTag('pt', ALL), 'pt-br');
  assert.equal(mapTag('zh-tw', ALL), 'zh-hant');
  assert.equal(mapTag('zh-hant-hk', ALL), 'zh-hant');
  assert.equal(mapTag('zh', ALL), 'zh-hans');
  assert.equal(mapTag('zh-cn', ALL), 'zh-hans');
  assert.equal(mapTag('en-gb', ALL), 'en');
  assert.equal(mapTag('sv', ALL), null);
  assert.equal(mapTag('*', ALL), null);
});

test('pickLocale honours q values and order, falls back to en', () => {
  assert.equal(pickLocale('de;q=0.8, en;q=0.9', '', ALL), 'en');
  assert.equal(pickLocale('tr-TR,tr;q=0.9,en;q=0.8', '', ALL), 'tr');
  assert.equal(pickLocale('sv, fi', '', ALL), 'en');
  assert.equal(pickLocale('*', '', ALL), 'en');
  assert.equal(pickLocale('', '', ALL), 'en');
  assert.equal(pickLocale(null, '', ALL), 'en');
  assert.equal(pickLocale('tr;q=abc', '', ALL), 'tr');
  assert.equal(pickLocale(';;,,', '', ALL), 'en');
});

test('pickLocale lets a valid cookie win and ignores an unknown one', () => {
  assert.equal(pickLocale('tr', 'lang=de', ALL), 'de');
  assert.equal(pickLocale('tr', 'a=b; lang=en; c=d', ALL), 'en');
  assert.equal(pickLocale('tr', 'lang=xx', ALL), 'tr');
});

test('pickLocale only returns codes from the list it is given', () => {
  assert.equal(pickLocale('tr', '', ['en', 'de']), 'en');
  assert.equal(pickLocale('tr, de;q=0.5', '', ['en', 'de']), 'de');
  assert.equal(pickLocale('tr', 'lang=tr', ['en', 'de']), 'en');
  assert.equal(pickLocale('pt-BR', '', ['en', 'de']), 'en');
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

test('a locale that is not live never gets a redirect, even when the browser asks for it', async () => {
  const notLive = LOCALES.find((l) => !l.live);
  if (!notLive) return;
  const r = await worker.fetch(new Request('https://macdio.app/', { headers: { 'Accept-Language': notLive.code, Cookie: `lang=${notLive.code}` } }), env);
  assert.equal(r.status, 200);
  assert.equal(await r.text(), 'asset:/index.html');
});

test('/api/hub returns the three newest release notes with ids, and a 502 with an empty list when the hub is down', async () => {
  const topics = [
    { id: 109, slug: 'macdio-3-0', title: 'Macdio 3.0 is out', created_at: '2026-09-30T10:00:00Z', category_id: 6 },
    { id: 50, slug: 'about', title: 'About the Release Notes category', created_at: '2026-01-01T00:00:00Z', category_id: 6, pinned: true },
    { id: 105, slug: 'macdio-2-7-5', title: 'Macdio 2.7.5 is out', created_at: '2026-09-16T10:00:00Z', category_id: 6 },
    { id: 102, slug: 'macdio-2-7', title: 'Macdio 2.7 is live', created_at: '2026-09-12T10:00:00Z', category_id: 6 },
    { id: 90, slug: 'macdio-2-6', title: 'Macdio 2.6', created_at: '2026-08-01T10:00:00Z', category_id: 6 },
  ];
  const fakeFetch = async (url) => { assert.match(url, /hub\.devdio\.pro\/c\/macdio\/release-notes\/6\.json/); return new Response(JSON.stringify({ topic_list: { topics } }), { status: 200 }); };
  const res = await handle(new Request('https://macdio.app/api/hub'), env, ['en'], fakeFetch);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('Cache-Control'), /max-age=300/);
  const body = await res.json();
  assert.deepEqual(body.releaseNotes.map((t) => t.id), [109, 105, 102]);
  assert.equal(body.releaseNotes[0].url, 'https://hub.devdio.pro/t/macdio-3-0/109');
  const down = await handle(new Request('https://macdio.app/api/hub'), env, ['en'], async () => new Response('nope', { status: 503 }));
  assert.equal(down.status, 502);
  assert.deepEqual((await down.json()).releaseNotes, []);
});

test('a miss is answered with the site 404 page, status 404; directory URLs still map to index.html', async () => {
  const assets = { ASSETS: { fetch: async (req) => { const p = new URL(req.url).pathname; if (p === '/404.html') return new Response('<h1>Not found</h1>', { status: 200, headers: { 'Content-Type': 'text/html' } }); if (p === '/guides/index.html' || p === '/index.html') return new Response('page:' + p, { status: 200 }); return new Response('', { status: 404 }); } } };
  const miss = await handle(new Request('https://macdio.app/nope.html'), assets, ['en']);
  assert.equal(miss.status, 404);
  assert.equal(await miss.text(), '<h1>Not found</h1>');
  const dirMiss = await handle(new Request('https://macdio.app/nope/'), assets, ['en']);
  assert.equal(dirMiss.status, 404);
  assert.equal(await dirMiss.text(), '<h1>Not found</h1>');
  const guides = await handle(new Request('https://macdio.app/guides/'), assets, ['en']);
  assert.equal(guides.status, 200);
  assert.equal(await guides.text(), 'page:/guides/index.html');
});
