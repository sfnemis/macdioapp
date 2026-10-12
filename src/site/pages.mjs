// Marketing pages by folder. Slugs without ".html"; the route files add it.
export const ROOT_PAGES = [
  'features', 'iphone', 'ipad', 'mac', 'apple-tv', 'apple-watch', 'carplay', 'podcasts', 'pricing',
  'stations', 'submit-station', 'support',
  'privacy', 'privacy-ios', 'privacy-macos', 'privacy-tvos', 'privacy-watchos',
  'transparency', 'accessibility', 'community', 'presskit',
  'tunein-alternative', 'mytuner-alternative', 'pocket-casts-alternative', 'overcast-alternative', 'snipd-alternative',
];
export const FEATURE_PAGES = ['podcast-transcripts', 'highlights', 'song-id', 'recording', 'synced-lyrics'];
export const COMPARE_PAGES = ['apple-podcasts'];

export const ALL_PATHS = [
  '/',
  ...ROOT_PAGES.map((p) => `/${p}.html`),
  ...FEATURE_PAGES.map((p) => `/features/${p}.html`),
  ...COMPARE_PAGES.map((p) => `/compare/${p}.html`),
];
