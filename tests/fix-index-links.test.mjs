import { test } from 'node:test';
import assert from 'node:assert/strict';
const { fixIndexLinks } = await import('../scripts/fix-index-links.mjs');

test('links to a directory index file point at the directory URL instead', () => {
  const html = '<a href="/guides/index.html">All</a><a href="/tr/guides/index.html">Tümü</a><option value="/pt-br/guides/index.html">PT</option><a href="/guides/siri-radio.html">Siri</a><a href="https://x.y/index.html">ext</a>';
  assert.equal(fixIndexLinks(html), '<a href="/guides/">All</a><a href="/tr/guides/">Tümü</a><option value="/pt-br/guides/">PT</option><a href="/guides/siri-radio.html">Siri</a><a href="https://x.y/index.html">ext</a>');
});
