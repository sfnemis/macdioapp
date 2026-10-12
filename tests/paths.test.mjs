import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.LIVE_ALL = '1';
const { localePath, alternates, splitLocale, SITE } = await import('../src/site/paths.mjs');

test('localePath keeps English at the root and prefixes others', () => {
  assert.equal(localePath('en', '/'), '/');
  assert.equal(localePath('en', '/features.html'), '/features.html');
  assert.equal(localePath('tr', '/'), '/tr/');
  assert.equal(localePath('pt-br', '/features/song-id.html'), '/pt-br/features/song-id.html');
});

test('alternates lists every live locale plus x-default pointing at English', () => {
  const alts = alternates('/mac.html');
  assert.equal(alts.length, 15);
  assert.deepEqual(alts.find((a) => a.hreflang === 'pt-BR'), { hreflang: 'pt-BR', href: `${SITE}/pt-br/mac.html` });
  assert.deepEqual(alts.at(-1), { hreflang: 'x-default', href: `${SITE}/mac.html` });
});

test('splitLocale recognises locale prefixes and nothing else', () => {
  assert.deepEqual(splitLocale('/tr/features.html'), { code: 'tr', path: '/features.html' });
  assert.deepEqual(splitLocale('/zh-hans/'), { code: 'zh-hans', path: '/' });
  assert.deepEqual(splitLocale('/guides/carplay-radio.html'), { code: 'en', path: '/guides/carplay-radio.html' });
  assert.deepEqual(splitLocale('/ios/'), { code: 'en', path: '/ios/' });
  assert.deepEqual(splitLocale('/'), { code: 'en', path: '/' });
});
