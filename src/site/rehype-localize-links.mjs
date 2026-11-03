// A translated guide's Markdown links are written as English site paths, and
// nothing in Starlight or Astro localizes them. This does, at render time, so a
// link in /tr/guides/ stays in Turkish whenever the locale has the target page.
import { hasPage } from './legacy.mjs';
import { localePath } from './paths.mjs';

export default function rehypeLocalizeLinks() {
  return (tree, file) => {
    const code = (file.path || '').match(/src\/content\/docs\/([^/]+)\/guides\//)?.[1];
    if (!code) return;
    const visit = (node) => {
      const m = node.tagName === 'a' && String(node.properties?.href).match(/^(\/(?!\/)[^#?]*)(.*)$/);
      if (m && (m[1].endsWith('.html') || m[1].endsWith('/')) && hasPage(code, m[1])) node.properties.href = localePath(code, m[1]) + m[2];
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
