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
MUST_200=(/ /index.html /features.html /mac.html /guides/ /pricing.json /sitemap.xml /robots.txt)
# One hashed asset, read from the guide hub (marketing pages inline their small CSS), so the CDN path is proven too.
asset=$(curl -s "$HOST/guides/" | grep -o '/_astro/[^"]*\.css' | head -1)
[ -n "$asset" ] && MUST_200+=("$asset")

fail=0
for path in "${MUST_404[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$HOST$path")
  if [ "$code" != "404" ]; then
    echo "LEAK: $path is $code, expected 404"
    fail=1
  fi
done
for path in "${MUST_200[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$HOST$path")
  if [ "$code" != "200" ]; then
    echo "MISSING: $path is $code, expected 200"
    fail=1
  fi
done

if [ -z "${SKIP_WWW:-}" ]; then
# macdio.app is a custom domain, so the workers.dev subdomain would only be a
# second public copy of the site on a host that ignores the pages' canonical.
# workers_dev is false in wrangler.jsonc; this proves it stayed false.
# www is a custom domain of its own, so it has to be checked, not assumed.
www_code=$(curl -s -o /dev/null -w '%{http_code}' "$WWW/")
if [ "$www_code" != "301" ]; then
  echo "UNEXPECTED: $WWW/ is $www_code, expected a 301 to the apex"
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
