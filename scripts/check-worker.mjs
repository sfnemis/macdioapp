// Worker behaviour, end to end, against a running copy of the site. Run it
// before every deploy against wrangler dev, and after a deploy against the
// live host:
//   npm run build && npx wrangler dev --port 8787 --local   (other terminal)
//   node scripts/check-worker.mjs http://localhost:8787
//   node scripts/check-worker.mjs https://macdio.app
// For every locale: the Accept-Language redirect at "/", the locale home, a
// page, a feature page, the guide hub and a guide as browser navigations, and
// the lang/dir/title of each. Plus: crawler UAs are never redirected, a
// slashless directory 301s to the slashed URL, a missing page is a 404 in its
// own language, and /api/hub answers.
const BASE = process.argv[2] || 'http://localhost:8787';
const LOCALES = [['en', 'en-US,en;q=0.9'], ['tr', 'tr-TR,tr;q=0.9'], ['de', 'de-DE,de;q=0.9'], ['fr', 'fr-FR,fr;q=0.9'], ['es', 'es-ES,es;q=0.9'], ['it', 'it-IT,it;q=0.9'], ['ja', 'ja-JP,ja;q=0.9'], ['nl', 'nl-NL,nl;q=0.9'], ['pl', 'pl-PL,pl;q=0.9'], ['pt-br', 'pt-BR,pt;q=0.9'], ['ru', 'ru-RU,ru;q=0.9'], ['ar', 'ar-SA,ar;q=0.9'], ['zh-hans', 'zh-CN,zh;q=0.9'], ['zh-hant', 'zh-TW,zh;q=0.9']];
const nav = { 'Sec-Fetch-Mode': 'navigate' };
let bad = 0;
const say = (ok, msg) => { if (!ok) bad++; console.log((ok ? 'ok   ' : 'FAIL ') + msg); };
for (const [code, al] of LOCALES) {
  const r = await fetch(BASE + '/', { redirect: 'manual', headers: { 'Accept-Language': al, ...nav } });
  const want = code === 'en' ? null : `/${code}/`;
  const loc = r.headers.get('location');
  say(code === 'en' ? r.status === 200 : r.status === 302 && loc && loc.endsWith(want), `${code} "/" -> ${r.status} ${loc || ''}`);
  const pre = code === 'en' ? '' : '/' + code;
  for (const p of ['/', '/pricing.html', '/features/song-id.html', '/guides/', '/guides/siri-radio.html', '/stations.html']) {
    const res = await fetch(BASE + pre + p, { headers: { 'Accept-Language': al, Cookie: `lang=${code}`, ...nav } });
    const html = await res.text();
    const lang = (html.match(/<html[^>]*\blang="([^"]+)"/) || [])[1];
    const dir = (html.match(/<html[^>]*\bdir="([^"]+)"/) || [])[1];
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    const okLang = lang && lang.toLowerCase() === (code === 'pt-br' ? 'pt-br' : code === 'zh-hans' ? 'zh-hans' : code === 'zh-hant' ? 'zh-hant' : code);
    say(res.status === 200 && okLang && (code !== 'ar' || dir === 'rtl'), `${code} ${pre + p} ${res.status} lang=${lang} dir=${dir} "${title.slice(0, 40)}"`);
  }
}
const bot = await fetch(BASE + '/', { redirect: 'manual', headers: { 'Accept-Language': 'de-DE', 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' } });
say(bot.status === 200, `Googlebot with de Accept-Language at "/" -> ${bot.status} (never redirected)`);
const slash = await fetch(BASE + '/guides', { redirect: 'manual', headers: nav });
say(slash.status === 301 && (slash.headers.get('location') || '').endsWith('/guides/'), `/guides -> ${slash.status} ${slash.headers.get('location') || ''}`);
const trMiss = await fetch(BASE + '/tr/nope.html', { headers: nav });
const trLang = ((await trMiss.text()).match(/<html[^>]*\blang="([^"]+)"/) || [])[1];
say(trMiss.status === 404 && trLang === 'tr', `missing Turkish page -> ${trMiss.status} lang=${trLang}`);
const api = await fetch(BASE + '/api/hub');
// hub.devdio.pro being down is the hub's outage, not the Worker's: a 502 with
// the fixed error body is the designed answer and only warns.
if (api.status === 502) console.log('warn /api/hub -> 502, hub.devdio.pro unreachable; the badge stays hidden');
else say(api.status === 200, `/api/hub -> ${api.status}`);
console.log(bad ? `${bad} failure(s)` : 'all probes passed');
process.exit(bad ? 1 : 0);
