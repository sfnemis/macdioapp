// Facts that were corrected in the English on 2026-10-12 and must not come
// back in any language: the markup check compares tags, not words, so a
// translation can keep an old number with matching markup. Each rule is a
// language-neutral pattern (numbers, product tokens) for something that was
// wrong. Runs over every page and guide of every locale, English included.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const RULES = [
  { id: 'app-size', re: /7[.,]8\s?(MB|Mo|МБ|ميغابايت)/i, why: 'the app is about 82 MB, not 7.8 MB' },
  { id: 'crash-claim', re: /DEAD10CC/i, why: 'no crash-proof claim on the site' },
  { id: 'country-count', re: /(?<![\d.,])160(\+| \+| \+)/, why: 'sold in 175 countries and regions' },
  { id: 'station-count', re: /(?<![\d])50[.,   ]?000(\+|\s?\+)/, why: 'the directory has 60,000+ stations' },
  { id: 'old-ios', re: /(iOS|iPadOS)\s?18(?![\d.])/, why: 'iOS and iPadOS need 26; tvOS 18 is fine' },
  { id: 're-encode-bitrates', re: /128,?\s?192,?\s?(or|ou|oder|o|of|lub|или|或|または|أو|veya|e|y)?\s?256/i, why: 'recordings have no quality setting' },
  { id: 'software-version', re: /"softwareVersion":\s*"3\.0\.0"/, why: 'the app is 3.0.4' },
];

function walk(dir) {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

const visible = (s) => s.replace(/<script(?! type="application\/ld\+json")[\s\S]*?<\/script>/g, ' ');

export function staleFacts(text) {
  return RULES.filter((r) => r.re.test(visible(text))).map((r) => r.id);
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
