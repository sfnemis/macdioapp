import { test } from 'node:test';
import assert from 'node:assert/strict';
const { legacyPaths, missingLegacy } = await import('../scripts/check-legacy.mjs');

test('legacyPaths reads every loc from the old sitemap as a site path', () => {
  const xml = '<urlset><url><loc>https://macdio.app/</loc></url><url><loc>https://macdio.app/mac.html</loc></url><url><loc>https://macdio.app/guides/</loc></url></urlset>';
  assert.deepEqual(legacyPaths(xml), ['/', '/mac.html', '/guides/']);
});

test('missingLegacy reports absent paths unless they are pending, and pending paths that now exist', () => {
  const exists = (p) => ['/index.html', '/mac.html', '/guides/index.html'].includes(p);
  const r = missingLegacy(['/', '/mac.html', '/guides/', '/tr/', '/guides/x.html'], exists, ['/tr/', '/guides/x.html', '/guides/']);
  assert.deepEqual(r.missing, []);
  assert.deepEqual(r.resolved, ['/guides/']);
  const r2 = missingLegacy(['/tr/'], exists, []);
  assert.deepEqual(r2.missing, ['/tr/']);
});
