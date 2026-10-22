import { test } from 'node:test';
import assert from 'node:assert/strict';
const { staleFacts, APP_VERSION } = await import('../scripts/check-stale-facts.mjs');

test('old facts are caught in any language, current ones pass', () => {
  assert.deepEqual(staleFacts('<p>About 7.8 MB, 0% idle CPU.</p>'), ['app-size']);
  assert.deepEqual(staleFacts('<p>Vendu dans plus de 160+ pays</p>'), ['country-count']);
  assert.deepEqual(staleFacts('<p>Ponad 50 000+ stacji</p>'), ['station-count']);
  assert.deepEqual(staleFacts('<p>Requires iOS 18 or later</p>'), ['old-ios']);
  assert.deepEqual(staleFacts('<p>à 128, 192 ou 256 kbps</p>'), ['re-encode-bitrates']);
  assert.deepEqual(staleFacts('<p>60,000+ stations, 175 countries, iOS 26, tvOS 18, 4.7 million podcasts.</p>'), []);
  assert.deepEqual(staleFacts('<script>var x = "7.8 MB";</script><p>ok</p>'), []);
  assert.deepEqual(staleFacts('<script type="application/ld+json">{"softwareVersion": "3.0.4"}</script>'), ['software-version']);
  assert.deepEqual(staleFacts(`<script type="application/ld+json">{"softwareVersion": "${APP_VERSION}"}</script>`), []);
});
