// Locale-aware numbers, dates and prices for the templates. Codes are the
// site's URL codes; Intl wants BCP 47 tags, hence the small map.
const INTL = { en: 'en-GB', 'pt-br': 'pt-BR', 'zh-hans': 'zh-Hans', 'zh-hant': 'zh-Hant' };
const tag = (lang) => INTL[lang] ?? lang;

export function formatCount(n, lang) {
  return new Intl.NumberFormat(tag(lang)).format(n);
}

export function longDate(iso, lang) {
  return new Intl.DateTimeFormat(tag(lang), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));
}

export function countries(pricing) {
  return Object.keys(pricing.prices).length;
}

export function price(pricing, cc, lang) {
  const p = pricing.prices[cc] ?? pricing.default;
  const text = new Intl.NumberFormat(tag(lang), { style: 'currency', currency: p.c }).format(p.p);
  return { amount: p.p, currency: p.c, text };
}
