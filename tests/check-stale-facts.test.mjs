import { test } from 'node:test';
import assert from 'node:assert/strict';
const { staleFacts, rulesFor, softwareVersionText, APP_VERSION, APP_DATE } = await import('../scripts/check-stale-facts.mjs');

const jsonLd = (version, date) => `<script type="application/ld+json">{"softwareVersion": "${version}", "datePublished": "2026-04-17", "dateModified": "${date}", "author": {"name": "x"}}</script>`;

test('old facts are caught in any language, current ones pass', () => {
  assert.deepEqual(staleFacts('<p>About 7.8 MB, 0% idle CPU.</p>'), ['app-size']);
  assert.deepEqual(staleFacts('<p>Vendu dans plus de 160+ pays</p>'), ['country-count']);
  assert.deepEqual(staleFacts('<p>Ponad 50 000+ stacji</p>'), ['station-count']);
  assert.deepEqual(staleFacts('<p>Vendu dans plus de 160\u00a0+ pays</p>'), ['country-count']);
  assert.deepEqual(staleFacts('<p>Plus de 50\u00a0000+ stations</p>'), ['station-count']);
  assert.deepEqual(staleFacts('<p>Plus de 50\u202f000+ stations</p>'), ['station-count']);
  assert.deepEqual(staleFacts('<p>Requires iOS 18 or later</p>'), ['old-ios']);
  assert.deepEqual(staleFacts('<p>à 128, 192 ou 256 kbps</p>'), ['re-encode-bitrates']);
  assert.deepEqual(staleFacts('<p>60,000+ stations, 175 countries, iOS 26, tvOS 18, 4.7 million podcasts.</p>'), []);
  assert.deepEqual(staleFacts('<script>var x = "7.8 MB";</script><p>ok</p>'), []);
  assert.deepEqual(staleFacts('<script type="application/ld+json">{"softwareVersion": "3.0.4"}</script>'), ['software-version']);
  assert.deepEqual(staleFacts(`<script type="application/ld+json">{"softwareVersion": "${APP_VERSION}"}</script>`), []);
});

test('the version text names the devices only when the platforms differ', () => {
  assert.equal(softwareVersionText({ ios: '3.2.1', mac: '3.2.1', tv: '3.2.1' }), '3.2.1');
  assert.equal(softwareVersionText({ ios: '3.2.2', mac: '3.2.1', tv: '3.2.1' }), '3.2.2 (iPhone, iPad, Apple Watch), 3.2.1 (Mac, Apple TV)');
  assert.equal(softwareVersionText({ ios: '3.10', mac: '3.10', tv: '3.9' }), '3.10 (iPhone, iPad, Apple Watch, Mac), 3.9 (Apple TV)');
});

test('a release for iPhone and iPad only cannot be written as the version of every platform', () => {
  const mixed = softwareVersionText({ ios: '3.2.2', mac: '3.2.1', tv: '3.2.1' });
  const rules = rulesFor(mixed, '2026-11-14');
  assert.deepEqual(staleFacts(jsonLd('3.2.2', '2026-11-14'), rules), ['software-version']);
  assert.deepEqual(staleFacts(jsonLd('3.2.1', '2026-11-14'), rules), ['software-version']);
  assert.deepEqual(staleFacts(jsonLd(mixed, '2026-11-14'), rules), []);
});

test('the date beside the version is the day that version went live; other dates on a page are left alone', () => {
  assert.deepEqual(staleFacts(jsonLd(APP_VERSION, '2026-10-22')), ['app-date']);
  assert.deepEqual(staleFacts(jsonLd(APP_VERSION, APP_DATE)), []);
  assert.deepEqual(staleFacts('<script type="application/ld+json">{"@type": "TechArticle", "dateModified": "2026-10-12"}</script>'), []);
});
