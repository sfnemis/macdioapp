#!/usr/bin/env bash
# Ping IndexNow with every URL in the sitemap. Bing, Yandex and Seznam read it,
# and Bing's index feeds several AI assistants, so a deploy is heard about in
# minutes instead of whenever the next crawl happens. Run after every deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
HOST="macdio.app"
KEY="80c004ef1f5a429ab1d919978a666da5"   # must match $KEY.txt at the site root
test -f "$KEY.txt" || { echo "key file missing: $KEY.txt"; exit 1; }
BODY=$(python3 - "$HOST" "$KEY" <<'PY'
import json, re, sys
host, key = sys.argv[1], sys.argv[2]
urls = re.findall(r"<loc>([^<]+)</loc>", open("sitemap.xml").read())
assert urls, "sitemap has no urls"
print(json.dumps({"host": host, "key": key,
                  "keyLocation": f"https://{host}/{key}.txt", "urlList": urls}))
PY
)
CODE=$(curl -s -o /dev/null -w '%{http_code}' -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' -d "$BODY")
COUNT=$(python3 -c "import json,sys;print(len(json.loads(sys.argv[1])['urlList']))" "$BODY")
echo "IndexNow: HTTP $CODE for $COUNT urls"
[ "$CODE" = "200" ] || [ "$CODE" = "202" ]
