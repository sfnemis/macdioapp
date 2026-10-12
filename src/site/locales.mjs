// The 14 languages the app ships in. `code` is the URL prefix (lowercase),
// `lang` the HTML lang and hreflang value. A locale is generated, linked and
// listed in the sitemap only while `live` is true; F4 flips them one by one.
// LIVE_ALL=1 turns every locale on for local tests.
export const LOCALES = [
  { code: 'en', lang: 'en', label: 'English', dir: 'ltr', live: true },
  { code: 'tr', lang: 'tr', label: 'Türkçe', dir: 'ltr', live: true },
  { code: 'de', lang: 'de', label: 'Deutsch', dir: 'ltr', live: true },
  { code: 'fr', lang: 'fr', label: 'Français', dir: 'ltr', live: false },
  { code: 'es', lang: 'es', label: 'Español', dir: 'ltr', live: true },
  { code: 'it', lang: 'it', label: 'Italiano', dir: 'ltr', live: false },
  { code: 'ja', lang: 'ja', label: '日本語', dir: 'ltr', live: false },
  { code: 'nl', lang: 'nl', label: 'Nederlands', dir: 'ltr', live: true },
  { code: 'pl', lang: 'pl', label: 'Polski', dir: 'ltr', live: true },
  { code: 'pt-br', lang: 'pt-BR', label: 'Português (Brasil)', dir: 'ltr', live: false },
  { code: 'ru', lang: 'ru', label: 'Русский', dir: 'ltr', live: false },
  { code: 'ar', lang: 'ar', label: 'العربية', dir: 'rtl', live: true },
  { code: 'zh-hans', lang: 'zh-Hans', label: '简体中文', dir: 'ltr', live: false },
  { code: 'zh-hant', lang: 'zh-Hant', label: '繁體中文', dir: 'ltr', live: true },
];

export const DEFAULT = 'en';

export function liveLocales() {
  return LOCALES.filter((l) => l.live || process.env.LIVE_ALL === '1');
}

export function byCode(code) {
  return LOCALES.find((l) => l.code === code);
}
