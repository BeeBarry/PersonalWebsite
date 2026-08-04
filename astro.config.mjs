import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://barrynamdari.se',
  outDir: './public',
  publicDir: './static',
  integrations: [
    icon(),
    mdx(),
    // Sitemap till /sitemap-index.xml (pekas ut från static/robots.txt).
    // Design-systemet är ett internt referensark och ska inte indexeras.
    sitemap({
      filter: (page) => !page.includes('/design-system'),
    }),
  ],

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
      // Endast latin: en skanning av src/ och static/ hittar noll tecken i
      // latin-ext-intervallen (svenska å/ä/ö ligger i latin).
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Spline Sans Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'Menlo', 'monospace'],
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
