import { liveLocales, DEFAULT, byCode } from './locales.mjs';

export const SITE = 'https://macdio.app';

// `path` is always the English path: '/', '/features.html', '/guides/x.html'.
export function localePath(code, path) {
  return code === DEFAULT ? path : `/${code}${path}`;
}

export function alternates(path) {
  const list = liveLocales().map((l) => ({ hreflang: l.lang, href: SITE + localePath(l.code, path) }));
  list.push({ hreflang: 'x-default', href: SITE + path });
  return list;
}

// '/tr/features.html' -> { code: 'tr', path: '/features.html' }; anything that
// is not a known locale prefix is English.
export function splitLocale(urlPath) {
  const m = urlPath.match(/^\/([a-z]{2}(?:-[a-z]+)?)(\/.*)?$/);
  if (m && m[1] !== DEFAULT && byCode(m[1])) return { code: m[1], path: m[2] || '/' };
  return { code: DEFAULT, path: urlPath };
}
