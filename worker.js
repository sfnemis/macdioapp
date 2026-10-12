// Runs only when no static asset matches the request (Cloudflare serves
// assets first), so it sees "/", "/<lang>/" and other directory URLs, never
// a deep ".html" link. Two jobs: pick a language for "/" from the visitor's
// browser preference (or their earlier choice in the "lang" cookie) and
// serve index.html for directory URLs. Nothing is stored.

const LOCALES = ['en', 'tr', 'de', 'fr', 'es', 'it', 'ja', 'nl', 'pl', 'pt-br', 'ru', 'ar', 'zh-hans', 'zh-hant'];
const BOTS = /googlebot|bingbot|applebot|duckduckbot|yandex|baiduspider|gptbot|claudebot|anthropic-ai|perplexitybot|facebookexternalhit|twitterbot|linkedinbot|slurp|ahrefsbot|semrushbot/i;

export function mapTag(tag) {
  const t = tag.toLowerCase();
  if (t === '*' || !t) return null;
  if (t === 'pt' || t.startsWith('pt-')) return 'pt-br';
  if (t === 'zh' || t.startsWith('zh-')) return /hant|-tw|-hk|-mo/.test(t) ? 'zh-hant' : 'zh-hans';
  const primary = t.split('-')[0];
  return LOCALES.includes(primary) ? primary : null;
}

export function pickLocale(acceptLanguage, cookie) {
  const picked = (cookie || '').match(/(?:^|;\s*)lang=([a-z-]+)/i);
  if (picked && LOCALES.includes(picked[1].toLowerCase())) return picked[1].toLowerCase();
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
    const code = mapTag(tag);
    if (code) return code;
  }
  return 'en';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      const ua = request.headers.get('User-Agent') || '';
      if (!BOTS.test(ua)) {
        const code = pickLocale(request.headers.get('Accept-Language'), request.headers.get('Cookie'));
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
  },
};
