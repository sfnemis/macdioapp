import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tagStoreLinks } from '../scripts/store-campaign.mjs';

const tagged = 'href="https://apps.apple.com/app/macdio/id6761737888?pt=96130860&amp;ct=macdio-web&amp;mt=8"';

test('every App Store link to Macdio gets the macdio-web campaign, storefront paths included', () => {
  assert.equal(tagStoreLinks('<a href="https://apps.apple.com/app/macdio/id6761737888">x</a>'), `<a ${tagged}>x</a>`);
  assert.match(tagStoreLinks('<a href="https://apps.apple.com/de/app/macdio/id6761737888">'), /apps\.apple\.com\/de\/app\/macdio\/id6761737888\?pt=96130860&amp;ct=macdio-web&amp;mt=8"/);
});

test('a link that already carries a query, JSON-LD and the click counter selector are left alone', () => {
  const ios = '<a href="https://apps.apple.com/app/macdio/id6761737888?pt=96130860&amp;ct=macdio-ios&amp;mt=8">';
  assert.equal(tagStoreLinks(ios), ios);
  const ld = '"downloadUrl": "https://apps.apple.com/app/macdio/id6761737888"';
  assert.equal(tagStoreLinks(ld), ld);
  const sel = `a[href^="https://apps.apple.com/"]`;
  assert.equal(tagStoreLinks(sel), sel);
});
