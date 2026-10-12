import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { liveLocales, DEFAULT } from './site/locales.mjs';

// Guide pages carry their first publication date and their FAQ pairs in the
// frontmatter; StarlightHead.astro turns them into Article and FAQPage JSON-LD.
//
// The same glob Starlight's docsLoader uses, limited to the English guides and
// the folders of live locales: a locale still being translated
// (src/content/docs/<code>/ without live: true) would otherwise be built as
// English content under /<code>/guides/ and as a fallback in every locale.
const folders = liveLocales().map((l) => (l.code === DEFAULT ? 'guides' : `${l.code}/guides`));
const pattern = `{${folders.map((f) => `${f}/**/[^_]*.{md,mdx}`).join(',')}}`;

// Starlight ships its interface strings as zh-CN and zh-TW; the site's locales
// are zh-Hans and zh-Hant, so the same strings are provided under those tags
// (src/content/i18n/), or the Chinese guides show "On this page" in English.
export const collections = {
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  docs: defineCollection({
    loader: glob({ base: './src/content/docs', pattern }),
    schema: docsSchema({
      extend: z.object({
        datePublished: z.coerce.date().optional(),
        faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
      }),
    }),
  }),
};
