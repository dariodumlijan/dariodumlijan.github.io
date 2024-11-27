// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://dariodumlijan.com',
  integrations: [
    icon({
      iconDir: 'src/assets/icons'
    }),
    sitemap({
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
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
