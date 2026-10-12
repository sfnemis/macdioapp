// The community hub (Discourse) as a feed. Shared by the build-time script
// (scripts/hub.mjs, writes src/data/hub.json) and the Worker route /api/hub
// that the "what's new" badge reads in the browser. No Node imports here:
// wrangler bundles this file into the Worker.
export const HUB = 'https://hub.devdio.pro';
export const RELEASE_NOTES_PATH = '/c/macdio/release-notes/6.json';

export function pickTopics(json, categories, limit) {
  return json.topic_list.topics
    // Only the category's own "About the ... category" topic is left out. A
    // release note can be pinned too (3.0.4 was), so pinned is no filter.
    .filter((t) => !/^About the /.test(t.title))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
    .map((t) => ({ id: t.id, title: t.title, url: `${HUB}/t/${t.slug}/${t.id}`, date: t.created_at.slice(0, 10), category: categories[t.category_id] ?? '' }));
}
