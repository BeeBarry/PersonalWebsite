# Slice B – Astro 6 + Content Layer + draft-mekanism

**Mål:** uppgradera till Astro 6, migrera content collections till Content
Layer (krav i v6), inför `draft`-fält som döljs i prod, ta bort TestReact.

**Beroende:** Slice A (pnpm) klar och grön.

## Bakgrund (officiell v6-migrationsguide)

Astro 6 har **helt tagit bort** legacy content collections. Krav:
- Config-filen måste heta `src/content.config.ts` (inte `src/content/config.ts`).
- Varje collection måste ha en `loader` (`glob()` från `astro/loaders`).
- `defineCollection({ type: 'content', ... })` → `type` tas bort, `loader` läggs till.
- Entry-API ändras: `entry.slug` → `entry.id`, och `await entry.render()` →
  `import { render } from 'astro:content'; const { Content } = await render(entry);`

## Scope (gör)

### 1. Uppgradera beroenden

Uppgradera `astro` till v6 + kompatibla `@astrojs/mdx`, `@astrojs/react`.
Använd Astros uppgraderingsväg:
```bash
pnpm dlx @astrojs/upgrade
```
Verifiera med build efter varje steg.

### 2. Flytta + skriv om collection-config

`src/content/config.ts` → **`src/content.config.ts`**. Lägg till glob-loaders,
ta bort `type`, lägg till `draft`-fält samt `posts`-schemat (saknas idag):

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const draftField = z.boolean().default(false);

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({ url: z.string(), alt: z.string() }),
    worksImage1: z.object({ url: z.string(), alt: z.string() }),
    worksImage2: z.object({ url: z.string(), alt: z.string() }),
    worksImage3: z.object({ url: z.string(), alt: z.string() }).optional(),
    worksImage4: z.object({ url: z.string(), alt: z.string() }).optional(),
    platform: z.string(),
    stack: z.string(),
    website: z.string(),
    github: z.string(),
    draft: draftField,
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['docker','kubernetes','terraform','azure','cybersecurity']),
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    order: z.number(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    draft: draftField,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.string(),
    image: z.object({ url: z.string(), alt: z.string() }),
    draft: draftField,
  }),
});

export const collections = { projects, learn, posts };
```

> `**/[^_]*` = ignorera filer som börjar med `_` (Astro-konvention för utkast).

### 3. Liten delad hjälpfunktion för draft-filtrering

Filtreringen behövs på 7 ställen → en delad util undviker att något missas.
Skapa `src/utils/content.ts`:

```ts
// true om entryt ska visas: i prod döljs draft, i dev visas allt
export const showEntry = ({ data }: { data: { draft?: boolean } }) =>
  import.meta.env.PROD ? data.draft !== true : true;
```

### 4. Migrera anropsställen (`slug`→`id`, `render`, draft-filter)

- `src/pages/works.astro`: `getCollection("projects", showEntry)`;
  `card.slug` → `card.id`.
- `src/pages/posts.astro`: `getCollection("posts", showEntry)`;
  `cardPost.slug` → `cardPost.id`.
- `src/pages/projects/[...slug].astro`: i `getStaticPaths`
  `getCollection("projects", showEntry)`, `entry.slug` → `entry.id`;
  byt `await entry.render()` →
  `import { render } from 'astro:content'; const { Content } = await render(entry);`
- `src/pages/posts/[...slug].astro`: samma mönster som projects.
- `src/pages/learn-hub/[category]/[article].astro`: `getCollection('learn', showEntry)`
  i `getStaticPaths`; byt till `render(entry)` (använder redan `entry.id` ✓).
- `src/pages/learn-hub/[category]/index.astro`: lägg `showEntry` i
  `getCollection('learn', ...)` tillsammans med kategori-filtret.
- `src/pages/learn-hub/index.astro`: filtrera artikelräkningen med `showEntry`.

### 5. Ta bort TestReact — REDAN GJORD (hotfix)

Framflyttad: `TestReact.tsx` var otrackad i git och bröt CI-bygget i ren klon.
Borttagen från `src/pages/index.astro` + filen raderad. `@astrojs/react`
behålls tills vidare (inga byggvarningar); utvärdera borttagning i Slice D.

## Gör inte

- Ändra inte `outDir`/`publicDir` i `astro.config.mjs` (egen ev. slice).
- Ändra inte URL-struktur, design eller innehållstexter.
- Inför inte `image()`-helpern (separat designbeslut).
- Markera inte innehåll som draft här – det görs i Slice C.

## Verifiering

- `pnpm build` – inga "Legacy content config"-fel, inga typfel.
- `pnpm dev` – portfölj, blogg-sida, Learn Hub renderar; URL:er oförändrade
  (`/projects/project-1/`, `/posts/post-1/`, `/learn-hub/docker/intro-to-docker/`).
- Inga `entry.slug`/`entry.render()` kvar (grep).
- Diff av `public/`: samma sidor genereras som före (inget innehåll draftat än).

## Faktiskt utfall

- Uppgraderat: `astro` 5.18.1 → **6.3.3**, `@astrojs/mdx` → **5.0.6**,
  `@astrojs/react` → **5.0.5** (React 19 / Tailwind 4 oförändrade).
- `src/content/config.ts` borttagen, `src/content.config.ts` skapad med
  `glob()`-loaders + `draft`-fält + nytt `posts`-schema (slut på
  auto-genererings-deprecation-varningen).
- `src/utils/content.ts` (`showEntry`) skapad och inkopplad i alla 7
  anropsställen. `entry.slug`→`entry.id`, `entry.render()`→`render(entry)`.
- Verifierat: `pnpm build` grönt, **19 sidor**, URL:er oförändrade
  (`/projects/project-1/`, `/posts/post-1/`,
  `/learn-hub/docker/intro-to-docker/`). `pnpm dev` 200 på alla rutter,
  inga fel/varningar. Inget innehåll draftat än (görs i Slice C) → samma
  sidor som före, som förväntat.
- Git: `src/content/config.ts` visas som ostagad radering (du sköter git).

## Officiell referens

- Astro v6 upgrade guide: borttagna legacy content collections; flytta config
  till `src/content.config.ts`; `glob()`-loader krav.
- Content collections guide: `defineCollection` + `glob` + Zod-schema;
  draft-filter `import.meta.env.PROD ? data.draft !== true : true`.
- `astro:content`: `render(entry)` ersätter `entry.render()`.
