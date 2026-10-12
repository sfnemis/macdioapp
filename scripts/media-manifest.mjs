// Reads public/media/ and writes src/data/media.json with the pixel size and
// duration of every clip and still, so the markup can carry width and height
// (no layout shift) and a missing file fails the build instead of a visitor.
import { readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function parseProbe(csv) {
  const lines = csv.trim().split('\n');
  const [w, h] = lines[0].split(',').map(Number);
  const dur = lines[1] ? Math.round(parseFloat(lines[1]) * 10) / 10 : 0;
  return { w, h, dur };
}

export function buildManifest(files, probe) {
  const manifest = {};
  const names = new Set(files.map((f) => f.replace(/\.(mp4|webm|jpg)$/, '')));
  for (const name of [...names].sort()) {
    const hasMp4 = files.includes(`${name}.mp4`);
    const hasJpg = files.includes(`${name}.jpg`);
    if (hasMp4 && !hasJpg) throw new Error(`${name}.mp4 has no poster (${name}.jpg)`);
    if (hasMp4 && !files.includes(`${name}.webm`)) throw new Error(`${name}.mp4 has no webm`);
    const p = parseProbe(probe(hasMp4 ? `${name}.mp4` : `${name}.jpg`));
    manifest[name] = hasMp4 ? { ...p, kind: 'clip' } : { w: p.w, h: p.h, dur: 0, kind: 'still' };
  }
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const dir = join(root, 'public/media');
  const files = readdirSync(dir).filter((f) => /\.(mp4|webm|jpg)$/.test(f));
  const probe = (f) => execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height:format=duration', '-of', 'csv=p=0', join(dir, f)], { encoding: 'utf8' });
  const manifest = buildManifest(files, probe);
  writeFileSync(join(root, 'src/data/media.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`media manifest: ${Object.keys(manifest).length} entries`);
}
