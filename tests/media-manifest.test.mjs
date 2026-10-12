import { test } from 'node:test';
import assert from 'node:assert/strict';
const { parseProbe, buildManifest } = await import('../scripts/media-manifest.mjs');

test('parseProbe reads width, height and duration from ffprobe csv', () => {
  assert.deepEqual(parseProbe('600,1300\n12.533333\n'), { w: 600, h: 1300, dur: 12.5 });
});

test('buildManifest pairs mp4 clips and lone jpg stills, and refuses an mp4 without a poster', () => {
  const files = ['a.mp4', 'a.webm', 'a.jpg', 'b.jpg', 'c.mp4', 'c.webm'];
  const probe = (f) => (f.endsWith('.jpg') ? '1200,800\n' : '600,1300\n12.5\n');
  assert.throws(() => buildManifest(files, probe), /c\.mp4 has no poster/);
  const m = buildManifest(files.filter((f) => !f.startsWith('c')), probe);
  assert.deepEqual(m.a, { w: 600, h: 1300, dur: 12.5, kind: 'clip' });
  assert.deepEqual(m.b, { w: 1200, h: 800, dur: 0, kind: 'still' });
});
