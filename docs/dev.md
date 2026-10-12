# macdio.app v2: how to build, test and deploy

Branch `v2` until launch. Node 26.

- `npm install` once.
- `npm run dev`: local preview at http://127.0.0.1:4321/ with live reload (English only
  unless `LIVE_ALL=1 npm run dev`).
- `npm test`: unit tests for the Worker, locale paths, sitemap and i18n check.
- `npm run build`: Astro build into `dist/`, then sitemap, hreflang check, link check,
  i18n check. Any failure stops the build.
- `npx wrangler dev --port 8787`: the real Worker in front of `dist/` for redirect tests:
  `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' -H 'Accept-Language: tr' http://127.0.0.1:8787/`
- `SKIP_WWW=1 bash scripts/check-public.sh http://127.0.0.1:8787`: the leak check against
  the local server.
- `scripts/media-encode.sh`: regenerates `public/media/` from the showcase clips.
- `scripts/counts.sh`: refreshes `src/data/counts.json` (run before a release).
- Deploy (only after Sait's "tamam", from `main` after merging `v2`):
  `npm run build && npx wrangler deploy && bash scripts/check-public.sh`.
- Rollback: `npx wrangler rollback`.

Languages go live by setting `live: true` in `src/site/locales.mjs` once
`src/i18n/<code>.json` is complete (`node scripts/i18n-check.mjs` passes).
