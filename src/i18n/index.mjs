// Strings per locale. Vite loads every src/i18n/<code>.json at build time.
// A locale that has no file falls back to English; the i18n-check script
// makes sure that never happens for a live locale.
const files = import.meta.glob('./*.json', { eager: true, import: 'default' });
const strings = Object.fromEntries(Object.entries(files).map(([p, v]) => [p.slice(2, -5), v]));

export function t(code) {
  return strings[code] ?? strings.en;
}
