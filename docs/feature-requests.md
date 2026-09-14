# Tracked list — macdio.app site

Requests and findings, newest first. Nothing leaves this list without a line
saying what happened to it.

## 2026-09-14

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
