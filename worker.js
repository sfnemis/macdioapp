// Runs only when no static asset matches the request (Cloudflare serves
// assets first), so it sees "/", "/<lang>/" and other directory URLs, never
// a deep ".html" link. Two jobs: pick a language for "/" from the visitor's
// browser preference (or their earlier choice in the "lang" cookie) and
// serve index.html for directory URLs. Nothing is stored.
//
// Only live locales (src/site/locales.mjs) are ever redirected to: a language
// that is not built yet would be a 404. wrangler bundles the import.

import { LOCALES as ALL_LOCALES } from './src/site/locales.mjs';

const LIVE = ALL_LOCALES.filter((l) => l.live).map((l) => l.code);
const BOTS = /googlebot|bingbot|applebot|duckduckbot|yandex|baiduspider|gptbot|claudebot|anthropic-ai|perplexitybot|facebookexternalhit|twitterbot|linkedinbot|slurp|ahrefsbot|semrushbot/i;

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

export async function handle(request, env, locales = LIVE) {
  const url = new URL(request.url);
  if (url.pathname === '/') {
    const ua = request.headers.get('User-Agent') || '';
    if (!BOTS.test(ua)) {
      const code = pickLocale(request.headers.get('Accept-Language'), request.headers.get('Cookie'), locales);
      if (code !== 'en') {
        return new Response(null, {
          status: 302,
          headers: { Location: `${url.origin}/${code}/`, Vary: 'Accept-Language', 'Cache-Control': 'private, no-store' },
        });
      }
    }
  }
  if (url.pathname.endsWith('/')) {
    const rewritten = new URL(url);
    rewritten.pathname = url.pathname + 'index.html';
    const res = await env.ASSETS.fetch(new Request(rewritten, request));
    if (url.pathname !== '/') return res;
    const headers = new Headers(res.headers);
    headers.set('Vary', 'Accept-Language');
    return new Response(res.body, { status: res.status, headers });
  }
  return env.ASSETS.fetch(request);
}

export default {
  fetch(request, env) {
    return handle(request, env, LIVE);
  },
};
