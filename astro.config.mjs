import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://barrynamdari.se',
  outDir: './public',
  publicDir: './static',
  integrations: [icon(), mdx()],

  // Portfolio-temats fonter via Astro 6 inbyggda Fonts-API.
  // Schibsted Grotesk = display + brödtext, Spline Sans Mono = mono/labels.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-display',
      fallbacks: ['system-ui', 'sans-serif'],
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.google(),
      name: 'Spline Sans Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'Menlo', 'monospace'],
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
