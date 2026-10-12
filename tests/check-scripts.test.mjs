import { test } from 'node:test';
import assert from 'node:assert/strict';
const { scriptProblems } = await import('../scripts/check-scripts.mjs');

test('inline scripts and the site scripts are allowed on a marketing page', () => {
  const html = '<head><script>var a=1</script><script type="application/ld+json">{}</script></head><script src="/parts.js"></script><script src="/redesign.js"></script>';
  assert.deepEqual(scriptProblems(html), []);
});

test('a GA4 tag that loads on any host is a problem: localhost and previews would count as visits', () => {
  const p = scriptProblems('<script async src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>');
  assert.equal(p.length, 1);
  assert.match(p[0], /GA4 tag loads on every host/);
});

test('a module script or any other external script is a problem', () => {
  const html = '<head><script type="module" src="/_astro/page.abc.js"></script><script src="https://cdn.example.com/x.js"></script></head>';
  const problems = scriptProblems(html);
  assert.equal(problems.length, 2);
  assert.match(problems[0], /_astro\/page\.abc\.js/);
  assert.match(problems[1], /cdn\.example\.com/);
});

test('a JSON-LD block that does not parse, or that a stray </script> cut short, is a problem', () => {
  assert.deepEqual(scriptProblems('<script type="application/ld+json">{"@type":"FAQPage","text":"a \\u003c/script> b"}</script>'), []);
  const p = scriptProblems('<script type="application/ld+json">{"@type":"FAQPage","text":"a </script> b"}</script>');
  assert.equal(p.length, 1);
  assert.match(p[0], /JSON-LD/);
});
