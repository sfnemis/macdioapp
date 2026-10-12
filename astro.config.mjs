import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { liveLocales } from './src/site/locales.mjs';

// Starlight owns Astro's i18n config (setting both is an error). Its locale
// map mirrors src/site/locales.mjs so guides and marketing pages agree on
// which languages exist.
const starlightLocales = Object.fromEntries(
  liveLocales().map((l) => [
    l.code === 'en' ? 'root' : l.code,
    { label: l.label, lang: l.lang, ...(l.dir === 'rtl' ? { dir: 'rtl' } : {}) },
  ]),
);

export default defineConfig({
  site: 'https://macdio.app',
  // preserve: features.astro -> /features.html, tr/index.astro -> /tr/index.html,
  // so every URL the live site has today keeps working.
  build: { format: 'preserve' },
  integrations: [
    // Starlight adds @astrojs/sitemap unless an integration of that name is
    // present. The site builds its own sitemap (scripts/sitemap.mjs) because
    // the integration drops ".html" and mislabels locale roots, so this stub
    // keeps Starlight from adding it; sitemap.mjs also writes the
    // sitemap-index.xml that Starlight links in <head>.
    { name: '@astrojs/sitemap', hooks: {} },
    starlight({
      title: 'Macdio Guides',
      defaultLocale: 'root',
      locales: starlightLocales,
      sidebar: [{ label: 'Guides', items: [{ label: 'All guides', link: '/guides/' }] }],
      pagefind: true,
      lastUpdated: true,
      credits: false,
      expressiveCode: false,
      customCss: ['./src/styles/tokens.css', './src/styles/starlight.css'],
    }),
  ],
});
