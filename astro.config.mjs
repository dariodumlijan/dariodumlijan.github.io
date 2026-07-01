// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';

const ASTRO_IMAGE_RE = /(__ASTRO_IMAGE_=")([^"]+)(")/g;

/**
 * Post-processes the intermediate HTML that Satteri returns (before Astro's
 * image pipeline runs) to inject `loading:"eager"` into the __ASTRO_IMAGE_ markers.
 * @param {string} html
 * @returns {string}
 */
function injectEagerLoading(html) {
  let count = 0;
  return html.replace(ASTRO_IMAGE_RE, (match, prefix, encoded, suffix) => {
    try {
      const decoded = encoded.replace(/&(?:#x22|quot);/g, '"').replace(/&(?:#x27|apos);/g, "'");
      const props = JSON.parse(decoded);
      props.loading = 'eager';
      if (count === 0) props.fetchpriority = 'high';
      count++;
      // Re-encode as HTML entities to match the expected format
      const reEncoded = JSON.stringify(props).replace(/"/g, '&quot;');
      return prefix + reEncoded + suffix;
    } catch {
      return match;
    }
  });
}

/**
 * A satteri processor wrapper that eagerly loads the first N images per page.
 * @param {Parameters<typeof satteri>[0]} [opts]
 */
function eagerSatteri(opts) {
  const base = satteri(opts);
  return {
    ...base,
    /** @param {any} shared */
    createRenderer(shared) {
      const rendererPromise = base.createRenderer(shared);
      return Promise.resolve(rendererPromise).then((renderer) => ({
        ...renderer,
        /** @param {string} content @param {any} renderOpts */
        async render(content, renderOpts) {
          const result = await renderer.render(content, renderOpts);
          result.code = injectEagerLoading(result.code);
          return result;
        },
      }));
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://dariodumlijan.com',
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    sitemap({ lastmod: new Date() }),
  ],
  markdown: {
    processor: eagerSatteri(),
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
  },
});
