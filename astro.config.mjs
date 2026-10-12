import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar, guideLocales } from './src/data/guides.mjs';

// Starlight owns Astro's i18n config (setting both is an error). A locale
// joins the guide hub when its guides exist under src/content/docs/<code>/
// (guideLocales); the marketing pages handle their own locales through
// src/legacy/<code>/.
const starlightLocales = Object.fromEntries(guideLocales().map((l) => [l.code === 'en' ? 'root' : l.code, { label: l.label, lang: l.lang, ...(l.dir === 'rtl' ? { dir: 'rtl' } : {}) }]));
export default defineConfig({
  site: 'https://macdio.app',
  // file: features.astro -> /features.html and Starlight writes ".html" on every
  // link it generates (under "preserve" it strips the extension, which is a 404
  // with html_handling "none"). Index pages come from dynamic routes that return
  // a literal "index" segment, so /tr/index.html and /guides/index.html keep the
  // URLs the live site has today.
  build: { format: 'file' },
  // Marketing pages ship no JavaScript beyond the site's two files and GA4;
  // Starlight would otherwise turn on Astro's prefetch module everywhere.
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
      locales: starlightLocales,
      defaultLocale: 'root',
      sidebar: sidebar(),
      social: [
        { icon: 'x.com', label: 'Macdio on X', href: 'https://x.com/macdioapp' },
        { icon: 'instagram', label: 'Macdio on Instagram', href: 'https://www.instagram.com/macdioapp' },
        { icon: 'tiktok', label: 'Macdio on TikTok', href: 'https://www.tiktok.com/@macdioapp' },
        { icon: 'youtube', label: 'Macdio on YouTube', href: 'https://www.youtube.com/@macdioapp' },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      // src/pages/404.astro is the site's 404 in the marketing shell.
      disable404Route: true,
      pagefind: true,
      lastUpdated: true,
      credits: false,
      expressiveCode: false,
      customCss: ['./src/styles/starlight.css'],
      // Dark only, the Macdio brand in the title, the author line in the
      // footer, and a Head that follows the site's canonical and hreflang rules.
      components: {
        Head: './src/components/StarlightHead.astro',
        SiteTitle: './src/components/StarlightSiteTitle.astro',
        ThemeProvider: './src/components/StarlightThemeProvider.astro',
        ThemeSelect: './src/components/StarlightThemeSelect.astro',
        LanguageSelect: './src/components/StarlightLanguageSelect.astro',
        Footer: './src/components/StarlightFooter.astro',
      },
    }),
  ],
});
