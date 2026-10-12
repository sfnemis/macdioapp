import { test } from 'node:test';
import assert from 'node:assert/strict';
const { linkTargets } = await import('../scripts/check-links.mjs');

test('linkTargets reads href, src, poster and the clip data attributes, as served paths', () => {
  const html = '<a href="/guides/">x</a><img src="/icon-192.png"><video poster="/media/a.jpg" data-webm="/media/a.webm" data-mp4="/media/a.mp4"></video><a href="/features.html#tour">y</a><a href="https://x.y/">z</a><a href="//cdn/x">w</a>';
  assert.deepEqual(linkTargets(html), ['/guides/index.html', '/icon-192.png', '/media/a.jpg', '/media/a.webm', '/media/a.mp4', '/features.html']);
});
