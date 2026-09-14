#!/usr/bin/env bash
# Prove that nothing private is reachable on macdio.app.
#
# This matters here more than on most sites: wrangler.jsonc publishes the whole
# repository ("directory": "."), so a new file is public by default and stays
# public until .assetsignore mentions it. Three rounds of this have already
# happened: the wrangler account cache and the worker sourcemap in August, then
# CLAUDE.local.md, docs/ and .serena/ on 2026-09-14.
#
# Run after every deploy:  bash scripts/check-public.sh
set -uo pipefail
HOST="${1:-https://macdio.app}"

MUST_404=(
  /CLAUDE.md /CLAUDE.local.md
  /docs/superpowers/specs/2026-05-16-macdio-web-redesign-design.md
  /.serena/project.yml /.serena/project.local.yml
  /scripts/indexnow.sh /scripts/check-public.sh
  /worker.js /wrangler.jsonc /.gitignore /.assetsignore
  /.wrangler/cache/wrangler-account.json
)
# The site breaks without these, so a 404 here is also a failure.
MUST_200=(/ /index.html /mac.html /pricing.json /parts.js /sitemap.xml /robots.txt)

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

if [ "$fail" = 0 ]; then
  echo "$HOST: ${#MUST_404[@]} private paths hidden, ${#MUST_200[@]} public paths served"
fi
exit "$fail"
