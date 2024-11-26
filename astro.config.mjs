// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      iconDir: 'src/assets/icons'
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
