# Implementationsdokument – Refaktorering & uppfräschning av portföljsidan

> Status: planerad. Arbetssätt: en slice i taget, du godkänner innan nästa.
> Källa för alla tekniska beslut: officiell Astro-dokumentation (via Context7).

## Ändamål

Sidan (`barrynamdari.se`, statisk Astro-site på GitLab Pages) ska:

1. Få ett robust, framtidssäkert fundament (Astro 6 + Content Layer + pnpm).
2. Dölja Learn Hub i prod **utan att radera** ofärdigt innehåll.
3. Aktivera bloggen.
4. Förenkla arbetsflödet (skriva inlägg / byta färg-font / lägga projekt).
5. Fräscha upp/göra om designen (designbeslut tas separat, steg 2-uppföljning).

Beslut tagna med ägaren: behåll GitLab Pages, uppgradera till Astro 6,
draft-fält som döljs i prod, byt npm → pnpm.

## Slices

| Slice | Innehåll | Beroende |
|-------|----------|----------|
| **A** | pnpm-migration + GitLab CI (Corepack) | – (görs först) |
| **B** | Astro 6 + Content Layer + `draft`-fält + ta bort TestReact | A |
| **C** | Synlighet: dölj Learn Hub i prod, aktivera blogg, märk stubbar draft | B |
| **D+** | Design & innehåll | C – definieras efter designbeslut |

Varje slice har ett eget dokument i denna mapp med exakt scope, kodexempel,
"gör / gör inte" och verifiering.

## Övergripande "gör inte"

- Ändra inte hosting (GitLab Pages behålls).
- Inga nya beroenden utöver det varje slice uttryckligen anger.
- Refaktorera inte orelaterad kod eller designa om i slice A–C.
- Radera inget ofärdigt innehåll.

## Nuvarande arkitektur (referens)

- Astro 5.11.0, `@astrojs/mdx`, `@astrojs/react`, React 19, Tailwind 4 (vite).
- `astro.config.mjs`: `outDir: './public'`, `publicDir: './static'` (omkastat
  mot standard, för GitLab Pages-artefakten – lämnas orört, dokumenteras här).
- Collections (legacy, `src/content/config.ts`): `projects`, `learn`;
  `posts` saknar schema men anropas i kod.
- Innehåll som ska bevaras men döljas i prod: alla `learn`-artiklar,
  `post-1..4.md` (lorem ipsum), `project-4.md` (Duck Quotes, stub).

## Filer som rör Content Layer-migrationen (slice B)

`slug`/`render()` används här och måste migreras till `id`/`render(entry)`:

- `src/content/config.ts` → flyttas till `src/content.config.ts`
- `src/pages/works.astro` (`card.slug`)
- `src/pages/posts.astro` (`cardPost.slug`)
- `src/pages/projects/[...slug].astro` (`entry.slug`, `entry.render()`)
- `src/pages/posts/[...slug].astro` (`entry.slug`, `entry.render()`)
- `src/pages/learn-hub/[category]/[article].astro` (`entry.render()`)
- `src/pages/learn-hub/[category]/index.astro` (använder redan `article.id` ✓)
- `src/pages/learn-hub/index.astro` (endast `getCollection`, ✓)

URL:er ändras **inte**: glob-loaderns `id` för platta `.md`/`.mdx`-filer blir
filnamnet utan filändelse, samma som dagens `slug`.
