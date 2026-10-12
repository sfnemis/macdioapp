import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Guide pages carry their first publication date and their FAQ pairs in the
// frontmatter; StarlightHead.astro turns them into Article and FAQPage JSON-LD.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        datePublished: z.coerce.date().optional(),
        faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
      }),
    }),
  }),
};
