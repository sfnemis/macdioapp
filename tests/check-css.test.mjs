import { test } from 'node:test';
import assert from 'node:assert/strict';
const { cssProblems } = await import('../scripts/check-css.mjs');

test('token references pass, raw colours and font families fail', () => {
  assert.deepEqual(cssProblems('a { color: var(--color-accent); font-family: var(--font-body); }', 'x.css'), []);
  const p = cssProblems('a { color: #6366f1; background: rgb(1 2 3); border-color: oklch(50% 0.1 277); font-family: "Geist", sans-serif; }', 'x.css');
  assert.equal(p.length, 4);
  assert.match(p[0], /x\.css: #6366f1/);
  assert.match(p[3], /font-family/);
});

test('transparent, currentColor, inherit and alpha-only values are allowed', () => {
  assert.deepEqual(cssProblems('a { color: currentColor; background: transparent; border-color: inherit; box-shadow: 0 1px 2px oklch(from var(--color-ink) l c h / 0.05); }', 'x.css'), []);
});

test('astro style blocks and style attributes are scanned too', () => {
  const astro = '<div style="color:#fff"></div>\n<style>\n.x { color: var(--color-ink); }\n.y { background: #000; }\n</style>';
  const p = cssProblems(astro, 'C.astro');
  assert.equal(p.length, 2);
});

test('comments and meta tags are not styling', () => {
  const text = '/* stamp: paper oklch(98% 0.006 277) #fff */\n<meta name="theme-color" content="#050507">\n<style>a { color: var(--color-ink); }</style>';
  assert.deepEqual(cssProblems(text, 'B.astro'), []);
});
