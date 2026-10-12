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
  // file: features.astro -> /features.html and Starlight writes ".html" on every
  // link it generates (under "preserve" it strips the extension, which is a 404
  // with html_handling "none"). Index pages come from dynamic routes that return
  // a literal "index" segment, so /tr/index.html and /guides/index.html keep the
  // URLs the live site has today.
  build: { format: 'file' },
  // Marketing pages ship no JavaScript beyond two inline scripts and GA4 (spec
  // 3.1); Starlight would otherwise turn on Astro's prefetch module everywhere.
  prefetch: false,
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
      sidebar: [{ label: 'Guides', items: [{ label: 'All guides', link: '/guides/index.html' }] }],
      pagefind: true,
      lastUpdated: true,
      credits: false,
      expressiveCode: false,
      customCss: ['./src/styles/tokens.css', './src/styles/starlight.css'],
      // Starlight's own Head writes a canonical of the form /guides.html/ under
      // preserve format and no hreflang for a single locale; this one uses the
      // same helpers as Base.astro so both halves of the site agree.
      components: { Head: './src/components/StarlightHead.astro', SiteTitle: './src/components/StarlightSiteTitle.astro' },
    }),
  ],
});
