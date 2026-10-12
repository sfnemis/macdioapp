#!/usr/bin/env bash
# Prove that nothing private is reachable on macdio.app.
#
# The web root is ./dist (the Astro build output) and nothing outside it can be served, which is what
# makes most of the list below structurally impossible rather than merely
# forbidden. It used to be the repository root, and that leaked the wrangler
# account cache and the worker sourcemap in August, then CLAUDE.local.md,
# docs/ and .serena/ on 2026-09-14. The check stays because a config can be
# changed back by accident, and because /public/... proves the swap held.
#
# Run after every deploy:  bash scripts/check-public.sh
set -uo pipefail
HOST="${1:-https://macdio.app}"
WWW="https://www.macdio.app"   # second custom domain, 301s to the apex

MUST_404=(
  /CLAUDE.md /CLAUDE.local.md
  /docs/superpowers/specs/2026-10-12-macdio-web-v2-design.md
  /docs/feature-requests.md /docs/research/2026-10-12-competitors.md
  /.serena/project.yml /scripts/indexnow.sh /scripts/check-public.sh /scripts/sitemap.mjs
  /worker.js /wrangler.jsonc /.gitignore /CNAME /package.json /astro.config.mjs
  /src/pages/index.astro /src/i18n/en.json /old-site/index.html /old-site/redesign.css
  /node_modules/astro/package.json /.wrangler/cache/wrangler-account.json
  /public/ /public/index.html /dist/ /dist/index.html
)
# The site breaks without these, so a 404 here is also a failure.
MUST_200=(/ /index.html /features.html /mac.html /guides/ /guides/siri-radio.html /tr/ /de/ /pricing.html /podcasts.html /carplay.html /features/song-id.html /compare/apple-podcasts.html /pricing.json /sitemap.xml /robots.txt /hub-badge.js)
# One hashed asset, read from the guide hub (marketing pages inline their small CSS), so the CDN path is proven too.
asset=$(curl -s "$HOST/guides/" | grep -o '/_astro/[^"]*\.css' | head -1)
[ -n "$asset" ] && MUST_200+=("$asset")

fail=0
for path in "${MUST_404[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Sec-Fetch-Mode: navigate' "$HOST$path")
  if [ "$code" != "404" ]; then
    echo "LEAK: $path is $code, expected 404"
    fail=1
  fi
done
for path in "${MUST_200[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Sec-Fetch-Mode: navigate' "$HOST$path")
  if [ "$code" != "200" ]; then
    echo "MISSING: $path is $code, expected 200"
    fail=1
  fi
done

# A Turkish browser landing on "/" is sent to /tr/ (Accept-Language, Worker).
read -r al_code al_loc < <(curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' -H 'Sec-Fetch-Mode: navigate' -H 'Accept-Language: tr-TR,tr;q=0.9' "$HOST/")
if [ "$al_code" != "302" ] || [ "${al_loc%/tr/}" = "$al_loc" ]; then
  echo "LANGUAGE: / with Accept-Language tr is $al_code ${al_loc:-}, expected a 302 to /tr/"
  fail=1
fi

# /api/hub depends on hub.devdio.pro. When the hub is down the badge simply
# does not show, so a failure here is reported but does not fail the deploy.
hub_code=$(curl -s -o /dev/null -w '%{http_code}' "$HOST/api/hub")
[ "$hub_code" != "200" ] && echo "WARN: /api/hub is $hub_code (hub.devdio.pro unreachable?), the What's new badge stays hidden until it answers"

if [ -z "${SKIP_WWW:-}" ]; then
# macdio.app is a custom domain, so the workers.dev subdomain would only be a
# second public copy of the site on a host that ignores the pages' canonical.
# workers_dev is false in wrangler.jsonc; this proves it stayed false.
# www is a custom domain of its own, so it has to be checked, not assumed.
read -r www_code www_loc < <(curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "$WWW/")
if [ "$www_code" != "301" ] || [ "$www_loc" != "https://macdio.app/" ]; then
  echo "UNEXPECTED: $WWW/ is $www_code ${www_loc:-}, expected a 301 to https://macdio.app/"
  fail=1
fi

dev_code=$(curl -s -o /dev/null -w '%{http_code}' https://macdio-web.sfn-test.workers.dev/)
if [ "$dev_code" = "200" ]; then
  echo "LEAK: macdio-web.sfn-test.workers.dev serves the site again, expected it disabled"
  fail=1
fi
fi

if [ "$fail" = 0 ]; then
  echo "$HOST: ${#MUST_404[@]} private paths hidden, ${#MUST_200[@]} public paths served, workers.dev off"
fi
exit "$fail"
