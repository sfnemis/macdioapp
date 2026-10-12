import { test } from 'node:test';
import assert from 'node:assert/strict';
const { formatCount, countries, price, longDate } = await import('../src/site/format.mjs');

const pricing = { default: { c: 'USD', p: 14.99 }, prices: { US: { c: 'USD', p: 14.99 }, TR: { c: 'TRY', p: 499.99 }, DE: { c: 'EUR', p: 14.99 } } };

test('counts and dates format for the locale', () => {
  assert.equal(formatCount(61318, 'en'), '61,318');
  assert.equal(formatCount(4739683, 'de'), '4.739.683');
  assert.equal(longDate('2026-10-12', 'en'), '12 October 2026');
});

test('prices come from pricing.json with the territory currency', () => {
  assert.equal(countries(pricing), 3);
  assert.deepEqual(price(pricing, 'TR', 'tr'), { amount: 499.99, currency: 'TRY', text: '₺499,99' });
  assert.equal(price(pricing, 'XX', 'en').text, '$14.99');
});
