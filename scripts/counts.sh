#!/bin/zsh
# Writes src/data/counts.json: station count from the Radio Browser directory
# (dir.macdio.app mirrors it) and the podcast count from Podcast Index, with
# the date. Pages print these with "as of <date>", never a bare round number.
set -euo pipefail
OUT=$(cd "$(dirname "$0")/.." && pwd)/src/data/counts.json
mkdir -p "$(dirname "$OUT")"
UA='macdio.app site build (counts)'
stations=$(curl -sf -A "$UA" https://de1.api.radio-browser.info/json/stats || curl -sf -A "$UA" https://dir.macdio.app/json/stats)
stations=$(printf '%s' "$stations" | python3 -c 'import json,sys; print(json.load(sys.stdin)["stations"])')
key=$(cat ~/.podcastindex/api-key); secret=$(cat ~/.podcastindex/secret); now=$(date +%s)
auth=$(printf '%s%s%s' "$key" "$secret" "$now" | shasum -a 1 | cut -d' ' -f1)
podcasts=$(curl -sf https://api.podcastindex.org/api/1.0/stats/current -A "$UA" \
  -H "X-Auth-Key: $key" -H "X-Auth-Date: $now" -H "Authorization: $auth" \
  | python3 -c 'import json,sys; print(json.load(sys.stdin)["stats"]["feedCountTotal"])')
printf '{\n  "stations": %s,\n  "podcasts": %s,\n  "checkedOn": "%s"\n}\n' "$stations" "$podcasts" "$(date +%F)" > "$OUT"
cat "$OUT"
