#!/bin/zsh
# Web-size versions of the showcase clips: public/media/<scene>.{mp4,webm,jpg}
# Source: ~/MacdioBuild/showcase/media/web (38 clips at device resolution).
# Widths by device so a phone clip is never shipped at 1320 px.
# Usage: scripts/media-encode.sh [source-dir] [one-scene-name]
set -euo pipefail
SRC=${1:-$HOME/MacdioBuild/showcase/media/web}
ONLY=${2:-}
OUT=$(cd "$(dirname "$0")/.." && pwd)/public/media
mkdir -p "$OUT"

width() {
  case "$1" in
    iphone-*|watch-*) echo 600 ;;
    ipad-*|mac-*) echo 1200 ;;
    tv-*|carplay-*) echo 1280 ;;
    *) echo 1200 ;;
  esac
}

over=0
for f in "$SRC"/*.mp4; do
  n=$(basename "$f" .mp4)
  [[ -n "$ONLY" && "$n" != "$ONLY" ]] && continue
  # The unblurred cover is a copyrighted image; only the blurred variant ships.
  [[ "$n" == carplay-nowplaying ]] && continue
  w=$(width "$n")
  ffmpeg -v error -y -i "$f" -vf "scale=$w:-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart -an "$OUT/$n.mp4"
  ffmpeg -v error -y -i "$OUT/$n.mp4" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -an "$OUT/$n.webm"
  ffmpeg -v error -y -sseof -1 -i "$OUT/$n.mp4" -frames:v 1 -update 1 -q:v 3 "$OUT/$n.jpg"
  s=$(stat -f %z "$OUT/$n.mp4"); kb=$((s / 1024))
  flag=ok; [[ $s -gt 2097152 ]] && { flag=OVER-2MB; over=$((over + 1)); }
  printf '%-30s %4dpx %6d KB mp4  %6d KB webm  %s\n' "$n" "$w" "$kb" "$(( $(stat -f %z "$OUT/$n.webm") / 1024 ))" "$flag"
done

# Stills that have no clip of their own (notes, episode songs).
for p in "$SRC"/*.png; do
  n=$(basename "$p" .png)
  [[ -n "$ONLY" && "$n" != "$ONLY" ]] && continue
  [[ -f "$SRC/$n.mp4" ]] && continue
  w=$(width "$n")
  ffmpeg -v error -y -i "$p" -vf "scale=$w:-2" -q:v 3 "$OUT/$n.jpg"
  printf '%-30s %4dpx still\n' "$n" "$w"
done

echo "media: $(ls "$OUT"/*.mp4 | wc -l | tr -d ' ') clips, $over over 2 MB"
[[ $over -eq 0 ]]
