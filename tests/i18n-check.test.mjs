import { test } from 'node:test';
import assert from 'node:assert/strict';
const { flatten, checkLocale, checkPage } = await import('../scripts/i18n-check.mjs');

test('checkPage applies the em dash and we/our/us rules to a legacy page and warns on length', () => {
  const page = { title: 'x'.repeat(61), description: 'Fine.', jsonld: ['{"text": "We built it"}'], main: '<p>Let us know</p><script>var we = 1;</script>' };
  const r = checkPage('en', '/x.html', page);
  assert.equal(r.problems.length, 2);
  assert.match(r.problems[0], /JSON-LD: .*We built it/);
  assert.match(r.problems[1], /main: Let us know/);
  assert.equal(r.warnings.length, 1);
  assert.match(r.warnings[0], /title is 61 chars/);
  const ok = checkPage('tr', '/', { title: 'Radyo', description: 'Bize yazın', jsonld: [], main: '<p>We</p>' });
  assert.deepEqual(ok.problems, []);
  const dash = checkPage('en', '/', { title: 'A — B', description: '', jsonld: [], main: '' });
  assert.match(dash.problems[0], /em dash in title/);
});

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
