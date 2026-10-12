import { test } from 'node:test';
import assert from 'node:assert/strict';
const { flatten, checkLocale } = await import('../scripts/i18n-check.mjs');

const en = { site: { name: 'Macdio' }, pages: { '/': { title: 'Macdio: Live Radio & Podcasts', description: 'Short.' } } };

test('flatten gives dotted keys', () => {
  assert.deepEqual(Object.keys(flatten(en)).sort(), ['pages./.description', 'pages./.title', 'site.name']);
});

test('a live locale missing a key is a problem, a non-live one is a warning only', () => {
  const tr = { site: { name: 'Macdio' }, pages: { '/': { title: 'Macdio: Canlı Radyo' } } };
  assert.match(checkLocale('tr', tr, en, { live: true })[0], /missing key pages\.\/\.description/);
  assert.deepEqual(checkLocale('tr', tr, en, { live: false }), []);
});

test('length limits, em dash and extra keys are problems', () => {
  const bad = { site: { name: 'Macdio', extra: 'x' }, pages: { '/': { title: 'x'.repeat(61), description: 'A dash — here' } } };
  const problems = checkLocale('de', bad, en, { live: true });
  assert.ok(problems.some((p) => /title is 61 chars/.test(p)));
  assert.ok(problems.some((p) => /em dash/.test(p)));
  assert.ok(problems.some((p) => /extra key site\.extra/.test(p)));
});

test('English must not say we, our or us for the developer, but US the country is fine', () => {
  const ok = { site: { name: 'Macdio' }, pages: { '/': { title: 'US price', description: 'Sold in the US store.' } } };
  assert.deepEqual(checkLocale('en', ok, ok, { live: true }), []);
  const enBad = { site: { name: 'Macdio' }, pages: { '/': { title: 'Our radio app', description: 'We built it.' } } };
  const problems = checkLocale('en', enBad, enBad, { live: true });
  assert.ok(problems.some((p) => /"we\/our\/us"/.test(p)));
});
