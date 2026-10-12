// Pulls the newest release notes and latest topics from the community hub
// (Discourse JSON) into src/data/hub.json. Runs by hand before a build; the
// committed file is what the build uses, so a build never needs the hub to
// be up. The page prints fetchedOn so the date is honest.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const HUB = 'https://hub.devdio.pro';

export function pickTopics(json, categories, limit) {
  return json.topic_list.topics
    .filter((t) => !t.pinned && !/^About the /.test(t.title))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
    .map((t) => ({ title: t.title, url: `${HUB}/t/${t.slug}/${t.id}`, date: t.created_at.slice(0, 10), category: categories[t.category_id] ?? '' }));
}

async function get(path) {
  const r = await fetch(HUB + path, { headers: { 'User-Agent': 'macdio.app site build (hub feed)', Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${path}: ${r.status}`);
  return r.json();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cats = {};
  const c = await get('/categories.json?include_subcategories=true');
  for (const top of c.category_list.categories) { cats[top.id] = top.name; for (const s of top.subcategory_list ?? []) cats[s.id] = s.name; }
  const releaseNotes = pickTopics(await get('/c/macdio/release-notes/6.json'), cats, 3);
  // Release notes have their own column; the latest list shows everything else.
  const latestJson = await get('/latest.json');
  latestJson.topic_list.topics = latestJson.topic_list.topics.filter((t) => t.category_id !== 6);
  const latest = pickTopics(latestJson, cats, 3);
  const out = { fetchedOn: new Date().toISOString().slice(0, 10), releaseNotes, latest };
  writeFileSync(fileURLToPath(new URL('../src/data/hub.json', import.meta.url)), JSON.stringify(out, null, 2) + '\n');
  console.log(`hub: ${releaseNotes.length} release notes, ${latest.length} latest, ${out.fetchedOn}`);
}
