import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://barrynamdari.se',
  outDir: './public',
  publicDir: './static',
  integrations: [mdx()]
});