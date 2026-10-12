import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { ALL_PATHS } = await import('../src/site/pages.mjs');
const en = JSON.parse(readFileSync(new URL('../src/i18n/en.json', import.meta.url), 'utf8'));

test('every marketing path has English strings and every string has a path', () => {
  assert.deepEqual([...ALL_PATHS].sort(), Object.keys(en.pages).sort());
  assert.equal(ALL_PATHS.length, 33);
});

test('the live URLs that are marketing pages are all present', () => {
  for (const p of ['/', '/features.html', '/iphone.html', '/ipad.html', '/mac.html', '/apple-tv.html', '/apple-watch.html',
    '/tunein-alternative.html', '/stations.html', '/submit-station.html', '/support.html', '/privacy.html', '/privacy-ios.html',
    '/privacy-macos.html', '/privacy-tvos.html', '/privacy-watchos.html', '/transparency.html', '/accessibility.html',
    '/community.html', '/presskit.html']) {
    assert.ok(ALL_PATHS.includes(p), p);
  }
});
