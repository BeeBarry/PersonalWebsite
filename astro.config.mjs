import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://barrynamdari.se',
  outDir: './public',
  publicDir: './static',
  integrations: [mdx(), react()],

  // Typografi (grunge-temats fonter) via Astro 6 inbyggda Fonts-API.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Road Rage',
      cssVariable: '--font-grunge',
      fallbacks: ['system-ui'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      weights: [400, 500, 600, 700, 800],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});