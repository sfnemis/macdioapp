import { test } from 'node:test';
import assert from 'node:assert/strict';
const { pickTopics } = await import('../scripts/hub.mjs');

const sample = { topic_list: { topics: [
  { id: 109, slug: 'macdio-3-0-is-out', title: 'Macdio 3.0 is out: live radio and podcasts, transcribed on your device', created_at: '2026-09-30T10:00:00Z', category_id: 6, pinned: false },
  { id: 105, slug: 'macdio-2-7-5', title: 'Macdio 2.7.5 is out on iPhone, iPad, Mac and Apple TV', created_at: '2026-09-16T10:00:00Z', category_id: 6, pinned: false },
  { id: 1, slug: 'about', title: 'About the Release Notes category', created_at: '2026-01-01T10:00:00Z', category_id: 6, pinned: true },
  { id: 112, slug: 'sleep', title: 'Persistent / recurring sleep timer', created_at: '2026-10-06T10:00:00Z', category_id: 8, pinned: false },
] } };
const cats = { 6: 'Release notes', 8: 'Feature requests' };

test('pickTopics drops pinned "About" topics, sorts newest first, limits and links', () => {
  const r = pickTopics(sample, cats, 2);
  assert.equal(r.length, 2);
  assert.deepEqual(r[0], { id: 112, title: 'Persistent / recurring sleep timer', url: 'https://hub.devdio.pro/t/sleep/112', date: '2026-10-06', category: 'Feature requests' });
  assert.equal(r[1].date, '2026-09-30');
});

test('a pinned release note still counts: only the "About" topic is left out (3.0.4 was pinned and vanished)', async () => {
  const { pickTopics } = await import('../src/site/hub.mjs');
  const json = { topic_list: { topics: [
    { id: 114, slug: 'macdio-3-0-4', title: 'Macdio 3.0.4 is out', created_at: '2026-10-12T21:40:00Z', category_id: 6, pinned: true },
    { id: 10, slug: 'about', title: 'About the Release Notes category', created_at: '2026-05-15T15:37:00Z', category_id: 6, pinned: true },
    { id: 109, slug: 'macdio-3-0', title: 'Macdio 3.0 is out', created_at: '2026-09-30T23:24:00Z', category_id: 6, pinned: false },
  ] } };
  assert.deepEqual(pickTopics(json, { 6: 'Release Notes' }, 3).map((t) => t.id), [114, 109]);
});
