// Language menus show `flag` (tracker W22): the country of the App Store
// locale each language ships as (en-US, pt-BR, ar Saudi Arabia, zh-Hans
// China, zh-Hant Taiwan).
// The 14 languages the app ships in. `code` is the URL prefix (lowercase),
// `lang` the HTML lang and hreflang value. A locale is generated, linked and
// listed in the sitemap only while `live` is true; F4 flips them one by one.
// LIVE_ALL=1 turns every locale on for local tests.
export const LOCALES = [
  { code: 'en', flag: '🇺🇸', lang: 'en', label: 'English', dir: 'ltr', live: true },
  { code: 'tr', flag: '🇹🇷', lang: 'tr', label: 'Türkçe', dir: 'ltr', live: true },
  { code: 'de', flag: '🇩🇪', lang: 'de', label: 'Deutsch', dir: 'ltr', live: true },
  { code: 'fr', flag: '🇫🇷', lang: 'fr', label: 'Français', dir: 'ltr', live: true },
  { code: 'es', flag: '🇪🇸', lang: 'es', label: 'Español', dir: 'ltr', live: true },
  { code: 'it', flag: '🇮🇹', lang: 'it', label: 'Italiano', dir: 'ltr', live: true },
  { code: 'ja', flag: '🇯🇵', lang: 'ja', label: '日本語', dir: 'ltr', live: true },
  { code: 'nl', flag: '🇳🇱', lang: 'nl', label: 'Nederlands', dir: 'ltr', live: true },
  { code: 'pl', flag: '🇵🇱', lang: 'pl', label: 'Polski', dir: 'ltr', live: true },
  { code: 'pt-br', flag: '🇧🇷', lang: 'pt-BR', label: 'Português (Brasil)', dir: 'ltr', live: true },
  { code: 'ru', flag: '🇷🇺', lang: 'ru', label: 'Русский', dir: 'ltr', live: true },
  { code: 'ar', flag: '🇸🇦', lang: 'ar', label: 'العربية', dir: 'rtl', live: true },
  { code: 'zh-hans', flag: '🇨🇳', lang: 'zh-Hans', label: '简体中文', dir: 'ltr', live: true },
  { code: 'zh-hant', flag: '🇹🇼', lang: 'zh-Hant', label: '繁體中文', dir: 'ltr', live: true },
];

export const DEFAULT = 'en';

export function liveLocales() {
  return LOCALES.filter((l) => l.live || process.env.LIVE_ALL === '1');
}

export function byCode(code) {
  return LOCALES.find((l) => l.code === code);
}
