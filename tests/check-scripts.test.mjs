import { test } from 'node:test';
import assert from 'node:assert/strict';
const { scriptProblems } = await import('../scripts/check-scripts.mjs');

test('inline scripts and the site scripts are allowed on a marketing page', () => {
  const html = '<head><script>var a=1</script><script type="application/ld+json">{}</script></head><script src="/parts.js"></script><script src="/redesign.js"></script>';
  assert.deepEqual(scriptProblems(html), []);
});

test('Google Analytics is gone: any gtag tag or inline loader is a problem', () => {
  assert.match(scriptProblems('<script async src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>')[0], /Google Analytics/);
  assert.match(scriptProblems("<script>if(location.hostname==='macdio.app'){gtag('config','G-QR2MZ9NF2N')}</script>")[0], /Google Analytics/);
});

test('Umami counts visits from the self-hosted server, only on macdio.app', () => {
  const ok = '<script defer src="https://stats.devdio.pro/script.js" data-website-id="cef17e25-0c90-4678-a353-b397a24ef5c5" data-domains="macdio.app"></script>';
  assert.deepEqual(scriptProblems(ok), []);
  assert.match(scriptProblems(ok.replace(' data-domains="macdio.app"', ''))[0], /data-domains/);
  // Umami Cloud was left on 2026-10-13 (W29): its tag is an unknown external script now.
  assert.match(scriptProblems(ok.replace('stats.devdio.pro', 'cloud.umami.is'))[0], /external script https:\/\/cloud\.umami\.is/);
});

test('the Umami recorder (replay and heatmaps, W30) is allowed from the self-hosted server only', () => {
  const rec = '<script defer src="https://stats.devdio.pro/recorder.js" data-website-id="cef17e25-0c90-4678-a353-b397a24ef5c5"></script>';
  assert.deepEqual(scriptProblems(rec), []);
  assert.match(scriptProblems(rec.replace('stats.devdio.pro', 'cloud.umami.is'))[0], /external script/);
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
