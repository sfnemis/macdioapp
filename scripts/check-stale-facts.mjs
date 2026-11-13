// Facts that were corrected in the English on 2026-10-12 and must not come
// back in any language: the markup check compares tags, not words, so a
// translation can keep an old number with matching markup. Each rule is a
// language-neutral pattern (numbers, product tokens) for something that was
// wrong. Runs over every page and guide of every locale, English included.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// The versions the App Store sells today, per platform (the Apple Watch app ships inside the iOS
// build). They can differ: 3.2.2 went to iPhone and iPad only, the Mac and Apple TV stayed on 3.2.1.
// Read them from the App Store before changing them, never from a plan.
export const APP_VERSIONS = { ios: '3.2.1', mac: '3.2.1', tv: '3.2.1' };
// The day (UTC) the newest of them went live: the home JSON-LD's dateModified.
export const APP_DATE = '2026-11-11';

const DEVICES = { ios: 'iPhone, iPad, Apple Watch', mac: 'Mac', tv: 'Apple TV' };

// What "softwareVersion" in the home JSON-LD of every locale must say exactly: the bare number while
// every platform has the same one, otherwise each number with its devices, newest first, so that a
// page never claims an iPhone-only release for the Mac. Device names are the same in every language.
export function softwareVersionText(versions = APP_VERSIONS) {
  const devices = new Map();
  for (const [platform, version] of Object.entries(versions)) devices.set(version, [...(devices.get(version) ?? []), DEVICES[platform]]);
  if (devices.size === 1) return [...devices.keys()][0];
  return [...devices]
    .sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }))
    .map(([version, names]) => `${version} (${names.join(', ')})`)
    .join(', ');
}

export const APP_VERSION = softwareVersionText();

const literal = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Spaces that a listing does not show are written as escapes here on purpose: retyping one of these
// lines once turned a no-break space into a plain one and two rules went quiet.
export const rulesFor = (version, date) => [
  { id: 'app-size', re: /7[.,]8\s?(MB|Mo|МБ|ميغابايت)/i, why: 'the app is about 82 MB, not 7.8 MB' },
  { id: 'crash-claim', re: /DEAD10CC/i, why: 'no crash-proof claim on the site' },
  { id: 'country-count', re: /(?<![\d.,])160(\+| \+|\u00a0\+)/, why: 'sold in 175 countries and regions' },
  { id: 'station-count', re: /(?<![\d])50[.,\u00a0\u202f ]?000(\+|\s?\+)/, why: 'the directory has 60,000+ stations' },
  { id: 'old-ios', re: /(iOS|iPadOS)\s?18(?![\d.])/, why: 'iOS and iPadOS need 26; tvOS 18 is fine' },
  { id: 're-encode-bitrates', re: /128,?\s?192,?\s?(or|ou|oder|o|of|lub|или|或|または|أو|veya|e|y)?\s?256/i, why: 'recordings have no quality setting' },
  { id: 'software-version', re: new RegExp(`"softwareVersion":\\s*"(?!${literal(version)}")`), why: `it must say "softwareVersion": "${version}"` },
  // Only the block that carries the version: guides have dates of their own.
  { id: 'app-date', re: new RegExp(`"softwareVersion":[^}]*?"dateModified":\\s*"(?!${literal(date)}")`), why: `the newest version went live on ${date}` },
];

export const RULES = rulesFor(APP_VERSION, APP_DATE);

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

const visible = (s) => s.replace(/<script(?! type="application\/ld\+json")[\s\S]*?<\/script>/g, ' ');

export function staleFacts(text, rules = RULES) {
  return rules.filter((r) => r.re.test(visible(text))).map((r) => r.id);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const files = [...walk(join(root, 'src', 'legacy')), ...walk(join(root, 'src', 'content', 'docs'))].filter((f) => /\.(html|md)$/.test(f));
  let problems = 0;
  for (const f of files) {
    for (const id of staleFacts(readFileSync(f, 'utf8'))) {
      problems++;
      console.error(`${relative(root, f)}: ${id} (${RULES.find((r) => r.id === id).why})`);
    }
  }
  console.log(problems ? `check-stale-facts: ${problems} problem(s)` : `check-stale-facts: ok, ${files.length} files`);
  process.exit(problems ? 1 : 0);
}
