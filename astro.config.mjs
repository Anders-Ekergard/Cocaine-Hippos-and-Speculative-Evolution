import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to the real domain before deploying (used for sitemap + share cards).
export default defineConfig({
  site: 'https://after-escobar.netlify.app',
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') })],
});
