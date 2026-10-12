import { test } from 'node:test';
import assert from 'node:assert/strict';
const { skeleton, compareHtml, compareMd } = await import('../scripts/check-i18n-markup.mjs');

const en = '<main class="platform-page"><h1 class="reveal d1">Pay once. <span class="grad">Listen everywhere.</span></h1><a class="inline" href="mac.html">Mac</a><script type="application/ld+json">{"@type":"FAQPage","name":"Is it free?"}</script><script>\nvar API = 1;\n</script></main>';

test('skeleton keeps tags, classes, hrefs and sources, not words', () => {
  assert.deepEqual(skeleton('<p class="a b">Hello <a href="/x.html">there</a></p><img src="/i.png">'), ['p.a.b', 'a[/x.html]', '/a', '/p', 'img(/i.png)']);
});

test('a faithful translation passes; changed markup, script, em dash or broken JSON-LD fail', () => {
  const tr = en.replace('Pay once. ', 'Bir kez öde. ').replace('Listen everywhere.', 'Her yerde dinle.').replace('"Is it free?"', '"Ücretsiz mi?"');
  assert.deepEqual(compareHtml(en, tr), []);
  assert.match(compareHtml(en, tr.replace('<span class="grad">', '<span class="accent">'))[0], /markup differs at tag/);
  assert.match(compareHtml(en, tr.replace('var API = 1;', 'var API = 2;'))[0], /inline script differs/);
  assert.match(compareHtml(en, tr.replace('Her yerde', 'Her — yerde'))[0], /em dash/);
  assert.match(compareHtml(en, tr.replace('"Ücretsiz mi?"', '"Ücretsiz "mi?"'))[0], /JSON-LD does not parse/);
});

test('a guide keeps its headings, table rows, list items, frontmatter keys and faq count', () => {
  const enMd = '---\ntitle: "A"\ndescription: "B"\nfaq:\n  - q: "Q1"\n    a: "A1"\n---\n\n## One\n\n- x\n- y\n\n| a | b |\n| -- | -- |\n| 1 | 2 |\n\n### Two\n';
  const ok = enMd.replace('## One', '## Bir').replace('### Two', '### İki');
  assert.deepEqual(compareMd(enMd, ok), []);
  assert.match(compareMd(enMd, ok.replace('### İki\n', ''))[0], /### headings: 1 in en, 0 here/);
  assert.match(compareMd(enMd, ok.replace('  - q: "Q1"\n    a: "A1"\n', ''))[0], /faq entries: 1 vs 0/);
});
