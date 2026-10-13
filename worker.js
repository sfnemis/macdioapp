// Runs only when no static asset matches the request (Cloudflare serves
// assets first), so it sees "/", "/<lang>/" and other directory URLs, never
// a deep ".html" link that exists. Its jobs: pick a language for "/" from the
// visitor's browser preference (or their earlier choice in the "lang"
// cookie), serve index.html for directory URLs, send "/tr" to "/tr/", answer
// misses with the 404 page of the locale they fall under, and serve
// /api/hub for the "what's new" badge. Nothing about visitors is stored.
//
// Only live locales (src/site/locales.mjs) are ever redirected to: a language
// that is not built yet would be a 404. wrangler bundles the import.

import { LOCALES as ALL_LOCALES } from './src/site/locales.mjs';
import { HUB, RELEASE_NOTES_PATH, pickTopics } from './src/site/hub.mjs';

const LIVE = ALL_LOCALES.filter((l) => l.live).map((l) => l.code);
const BOTS = /googlebot|bingbot|applebot|duckduckbot|yandex|baiduspider|gptbot|claudebot|anthropic-ai|perplexitybot|facebookexternalhit|twitterbot|linkedinbot|slurp|ahrefsbot|semrushbot/i;

// /api/hub: the three newest release notes from the community hub, for the
// badge (public/hub-badge.js). The browser talks only to macdio.app. The
// Browsers get max-age=0 and ask every time: a browser max-age is raised to
// the zone's 3-day Browser Cache TTL by Cloudflare, which kept a new release
// note out of browsers for days (found 2026-10-13). The edge copy below uses
// s-maxage.
// answer is kept in this data centre's cache for ten minutes (caches.default,
// which works whatever the hub's own headers say; the hub sends no-store), so
// the hub sees about one request per location per ten minutes, never one per
// visitor, however often someone calls this route.
const HUB_KEY = 'https://macdio.app/api/hub';
const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff' };

export async function hubFeed(fetchFn = fetch, ctx = null, cache = null) {
  if (cache) {
    const hit = await cache.match(new Request(HUB_KEY));
    if (hit) return hit;
  }
  try {
    const r = await fetchFn(HUB + RELEASE_NOTES_PATH, { headers: { Accept: 'application/json', 'User-Agent': 'macdio.app (what\'s new badge)' } });
    if (!r.ok) throw new Error(`hub ${r.status}`);
    const releaseNotes = pickTopics(await r.json(), { 6: 'Release Notes' }, 3);
    const res = new Response(JSON.stringify({ releaseNotes }), { status: 200, headers: { ...JSON_HEADERS, 'Cache-Control': 'public, max-age=0, s-maxage=600, must-revalidate' } });
    if (cache && ctx) ctx.waitUntil(cache.put(new Request(HUB_KEY), res.clone()));
    return res;
  } catch {
    // A fixed message: the upstream error can carry a fragment of the hub's HTML.
    return new Response(JSON.stringify({ releaseNotes: [], error: 'hub unavailable' }), { status: 502, headers: { ...JSON_HEADERS, 'Cache-Control': 'public, max-age=60' } });
  }
}

export function mapTag(tag, locales = LIVE) {
  const t = tag.toLowerCase();
  if (t === '*' || !t) return null;
  let code = null;
  if (t === 'pt' || t.startsWith('pt-')) code = 'pt-br';
  else if (t === 'zh' || t.startsWith('zh-')) code = /hant|-tw|-hk|-mo/.test(t) ? 'zh-hant' : 'zh-hans';
  else code = t.split('-')[0];
  return locales.includes(code) ? code : null;
}

export function pickLocale(acceptLanguage, cookie, locales = LIVE) {
  const picked = (cookie || '').match(/(?:^|;\s*)lang=([a-z-]+)/i);
  if (picked && locales.includes(picked[1].toLowerCase())) return picked[1].toLowerCase();
  if (!acceptLanguage) return 'en';
  const ranked = acceptLanguage
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const weight = q ? parseFloat(q.slice(2)) : 1;
      return { tag: tag.trim(), q: Number.isFinite(weight) ? weight : 1, i };
    })
    .filter((r) => r.tag && r.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { tag } of ranked) {
    const code = mapTag(tag, locales);
    if (code) return code;
  }
  return 'en';
}

export async function handle(request, env, locales = LIVE, fetchFn = fetch, ctx = null, cache = null) {
  const url = new URL(request.url);
  if (url.pathname === '/api/hub') return hubFeed(fetchFn, ctx, cache);
  if (url.pathname === '/') {
    const ua = request.headers.get('User-Agent') || '';
    if (!BOTS.test(ua)) {
      const code = pickLocale(request.headers.get('Accept-Language'), request.headers.get('Cookie'), locales);
      if (code !== 'en') {
        return new Response(null, {
          status: 302,
          headers: { Location: `${url.origin}/${code}/`, Vary: 'Accept-Language, Cookie', 'Cache-Control': 'private, no-store' },
        });
      }
    }
  }
  if (url.pathname.endsWith('/')) {
    const rewritten = new URL(url);
    rewritten.pathname = url.pathname + 'index.html';
    const res = await notFound(await env.ASSETS.fetch(new Request(rewritten, request)), env, url, locales);
    if (url.pathname !== '/') return res;
    // The English home is what visitors without a redirect get, so it depends
    // on their language and cookie: never a shared cache entry.
    const headers = new Headers(res.headers);
    headers.set('Vary', 'Accept-Language, Cookie');
    headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
    return new Response(res.body, { status: res.status, headers });
  }
  return notFound(await env.ASSETS.fetch(request), env, url, locales);
}

// The asset layer answers a miss with an empty 404 (not_found_handling
// "none"). A path with no extension whose "<path>/index.html" exists is a
// directory typed without its slash ("/tr", "/guides"): send it to the slashed
// URL. Anything else gets the 404 page of the locale the path falls under,
// still as a 404.
async function notFound(res, env, url, locales) {
  if (res.status !== 404) return res;
  const last = url.pathname.split('/').pop();
  if (last && !last.includes('.')) {
    const index = await env.ASSETS.fetch(new Request(new URL(url.pathname + '/index.html', url.origin)));
    if (index.ok) return Response.redirect(`${url.origin}${url.pathname}/${url.search}`, 301);
  }
  const code = url.pathname.split('/')[1];
  const localized = locales.includes(code) && code !== 'en' ? `/${code}/404.html` : '/404.html';
  let page = await env.ASSETS.fetch(new Request(new URL(localized, url.origin)));
  if (!page.ok && localized !== '/404.html') page = await env.ASSETS.fetch(new Request(new URL('/404.html', url.origin)));
  if (!page.ok) return res;
  const headers = new Headers(page.headers);
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return new Response(page.body, { status: 404, headers });
}

export default {
  fetch(request, env, ctx) {
    const cache = typeof caches !== 'undefined' ? caches.default : null;
    return handle(request, env, LIVE, fetch, ctx, cache);
  },
};
