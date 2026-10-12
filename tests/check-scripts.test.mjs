import { test } from 'node:test';
import assert from 'node:assert/strict';
const { scriptProblems } = await import('../scripts/check-scripts.mjs');

test('inline scripts and the GA4 tag are allowed on a marketing page', () => {
  const html = '<head><script>var a=1</script><script async src="https://www.googletagmanager.com/gtag/js?id=G-X"></script><script type="application/ld+json">{}</script></head>';
  assert.deepEqual(scriptProblems(html), []);
});

test('a module script or any other external script is a problem', () => {
  const html = '<head><script type="module" src="/_astro/page.abc.js"></script><script src="https://cdn.example.com/x.js"></script></head>';
  const problems = scriptProblems(html);
  assert.equal(problems.length, 2);
  assert.match(problems[0], /_astro\/page\.abc\.js/);
  assert.match(problems[1], /cdn\.example\.com/);
});
