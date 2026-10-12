# Tracked list — macdio.app site

Requests and findings, newest first. Nothing leaves this list without a line
saying what happened to it.

## 2026-10-12

- [ ] **W1 Full redesign of macdio.app** (Sait, 2026-10-12). Replace the whole
  current site with a more modern, simpler, more functional design. Built with
  the Hallmark design skill (audit, then redesign), using the showcase clips and
  stills in `~/MacdioBuild/showcase/media/web/` (app repo tracker #566).
  Everything is tested locally first; nothing deploys until Sait says "tamam".
  F1 foundation done on branch `v2` (2026-10-12): Astro + Starlight skeleton, 33 marketing
  routes in every live locale, Worker language redirect with tests, sitemap with hreflang,
  hreflang/link/i18n checks in the build, web-size media, counts, claims register,
  Hallmark audit. Not deployed. Next: F2 English design.
- [ ] **W9 Community feed on the home page** (Sait, 2026-10-12 17:13). Show the hub
  (https://hub.devdio.pro, hub.macdio.app 301s there) on the home page: latest
  release notes or recently resolved issues, dated and linked. Fetched from the
  Discourse JSON API at build time (no client JS); freshness equals the last
  deploy, so F5 adds a scheduled rebuild or the section says "as of <date>".
- Design brief answers (Sait, 2026-10-12 17:13), for the Hallmark pass in F2:
  audience as proposed plus searchers who arrive from Google and buy on the App
  Store from the site; primary action the App Store download, the community hub
  a close second; tone: an indie developer moving toward professional, every
  statement correct, every feature listed (for example the Wi-Fi station editor
  served from the phone to a computer browser, `Macdio/Services/StationEditorServer.swift`).
- [ ] **W2 Professional guide section** (Sait, 2026-10-12). Rebuild `/guides/`
  on the model of https://linnote.app/guide/ (structured guide hub with
  navigation, per-topic pages) for SEO and GEO. The 9 existing guides carry over.
- [ ] **W3 Site in every app language** (Sait, 2026-10-12). The app ships 14
  localizations (ar, de, en, es, fr, it, ja, nl, pl, pt-BR, ru, tr, zh-Hans,
  zh-Hant); the site gets the same 14, every page, with hreflang. Today only
  `/tr/` and `/de/` exist, one page each.
- [ ] **W4 Automatic language by visitor** (Sait, 2026-10-12). The visitor lands
  in their own language without choosing. Decided 2026-10-12 15:00 (Sait):
  browser language (Accept-Language), Google's recommended method, not country.
  Crawlers never redirected, a manual switcher on every page, choice kept in a
  cookie.
- [ ] **W5 All site media replaced** (Sait, 2026-10-12). Every screenshot and
  video on macdio.app today is replaced by the showcase clips and stills made
  2026-10-12 (`~/MacdioBuild/showcase/media/web/`, 38 clips, iPhone, iPad, Mac,
  Apple TV, Apple Watch, CarPlay). Old `assets/` media goes.
- [ ] **W6 SEO and GEO built in from the start** (Sait, 2026-10-12). Deep
  keyword and competitor analysis before the structure is fixed: "best radio
  app", "best podcast app", iPhone, Mac, Apple TV terms; competitors TuneIn,
  Radio Garden, myTuner, Broadcasts, Overcast and the rest of the field. Every
  page, guide and language is planned against that map; GSC data for the
  current site is the baseline.
- [ ] **W7 Search Console access for the service account is gone** (found
  2026-10-12 15:06). `claude-seo@claude-seo-macdio.iam.gserviceaccount.com`
  (key `~/.config/claude-seo/service_account.json`) gets `sites.list` = empty
  and 403 "User does not have sufficient permission for site
  'sc-domain:macdio.app'"; it read the same property on 2026-09-10. Someone
  removed the user from the property or the property was recreated. Sait adds
  the address back under Search Console > Settings > Users and permissions
  (Restricted is enough). Until then the W6 baseline is the 2026-09-10 reading.
- [ ] **W8 Google Analytics API hosts are DNS-blocked on this network** (found
  2026-10-12 15:08). `analyticsadmin.googleapis.com` and
  `analyticsdata.googleapis.com` resolve to `0.0.0.0` (A) and to a Cloudflare
  block-page address (AAAA) from the LAN resolver 192.168.10.1, also when asking
  1.1.1.1 directly, so the router intercepts DNS. `www.googleapis.com` and
  `searchconsole.googleapis.com` resolve normally. The GA4 MCP server fails with
  "No route to host"; it worked on 2026-09-10. Fix is in the network's DNS filter
  (Sait): allow the two hosts. Not a code problem.

## 2026-09-14

- [x] **Both custom domains are declared in `wrangler.jsonc` now.** `macdio.app`
  and `www.macdio.app` were attached in the dashboard and named nowhere in the
  repo, so `wrangler deploy` reported "No targets deployed for macdio-web" and
  the routing existed only in a web UI. `www.macdio.app` was never probed during
  the leak audit either; it 301s to the apex and every private path is 404
  through it. `check-public.sh` checks it now instead of assuming it.
- [x] **Workers Logs enabled** (`"observability": { "enabled": true }`), with a
  correction to what that buys. Static assets are served before the Worker runs,
  so `worker.js` is only invoked on a miss. A successful fetch of
  `/CLAUDE.local.md` was an asset hit and would not have been logged even with
  observability on. What the logs do show is misses, which is the shape of a
  scanner walking `/.env`, `/.git/config` and `/CLAUDE.md`. Logging asset hits
  would need `assets.run_worker_first`, which bills an invocation on every
  request. Prevention stays `scripts/check-public.sh`.
- [n/a] **Observability on livedio-web.** It is an assets-only Worker with no
  `main` and no script, so no Worker code runs on any request and there would be
  nothing to log. Zone analytics in the Cloudflare dashboard is the only request
  visibility either site has for asset hits.

- [x] **The workers.dev subdomain was a second public copy of the site.**
  `macdio-web.sfn-test.workers.dev` answered 200, and so did a preview URL for
  each of the ten retained versions: eleven hostnames serving pages whose
  canonical points at macdio.app. `"workers_dev": false` in `wrangler.jsonc`
  turned both off, and `scripts/check-public.sh` now fails if the subdomain
  comes back. `livedio-web.sfn-test.workers.dev` already 404s.
- [x] **Checked whether the leaked files were picked up elsewhere.** No Wayback
  captures of `/CLAUDE.local.md`, `/.serena/*` or `/docs/*` (CDX filter query
  returned nothing while a control query for `macdio.app/` returned a 2026-09-10
  capture). Nothing in search results for those paths or for the workers.dev
  hostname.
- [ ] **Re-run the Wayback check once archive.org is back up.** The domain-wide
  CDX listing hit an "Internet Archive services are temporarily offline" page on
  2026-09-14, so only the filtered query was answered. The evidence points to
  no capture, but one query is not a clean confirmation.

- [x] **Homepage meta description should carry the "mac radio" variant.**
  Requested by Sait. `index.html` now opens with "Mac radio app with 55,000+
  stations" across the description, og:description and twitter:description,
  160 characters, with every platform and all three features kept.
- [x] **`/CLAUDE.local.md` was publicly served on macdio.app** and answered 200
  with local filesystem paths and internal workflow notes. So did
  `/docs/superpowers/specs/2026-05-16-macdio-web-redesign-design.md`. Cause:
  `wrangler.jsonc` publishes the whole repo (`"directory": "."`) and
  `.assetsignore` did not cover them. `CLAUDE.md`, `CLAUDE.local.md` and `docs`
  added to `.assetsignore`. No credentials were in either file.
- [x] **`/.serena/project.yml`, `/.serena/project.local.yml` and
  `/scripts/indexnow.sh` were also public**, found in the same audit. The
  Serena files are tool config with no secrets; indexnow.sh carries the
  IndexNow key, which the protocol publishes at `/80c0...txt` anyway, so
  nothing secret leaked. `.serena` and `scripts` added to `.assetsignore`.
- [x] **`scripts/check-public.sh` added.** Probes 12 private paths for 404 and
  7 public ones for 200, and exits non-zero on either failure. Run it after
  every deploy.
- [x] **Root cause fixed: the web root is `./public` now.** `wrangler.jsonc`
  had `"directory": "."`, so every new file was public until someone
  remembered `.assetsignore`, and three separate leaks came from it. The 47
  top-level site entries (144 files) moved under `public/` with `git mv`;
  `worker.js`, `wrangler.jsonc`, `CNAME`, `scripts/`, `docs/`, `.serena/` and
  `CLAUDE.local.md` stay outside it and can no longer be served at all.
  `.assetsignore` shrank to the junk that can still land inside `public/`, and
  `scripts/indexnow.sh` now reads `public/sitemap.xml`. URLs are unchanged: the
  assets directory is the URL root either way.
- [ ] **Meta descriptions on `de/index.html` and `tr/index.html` were not
  touched.** If the "mac radio" variant matters in those markets, they need
  their own wording rather than a translation of this one.
