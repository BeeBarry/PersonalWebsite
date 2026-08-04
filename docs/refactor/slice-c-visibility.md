# Slice C – Synlighet: dölj Learn Hub, aktivera blogg

**Mål:** i prod – aktivera bloggen, dölj Learn Hub och allt ofärdigt innehåll
(bevaras, syns i dev). Inget raderas.

**Beroende:** Slice B (draft-mekanism + `showEntry`) klar och grön.

## Scope (gör)

### 1. Markera ofärdigt innehåll som draft

Lägg `draft: true` i frontmatter på:
- Alla `src/content/learn/*.mdx` (hela Learn Hub döljs i prod).
- `src/content/posts/post-1.md … post-4.md` (lorem ipsum-stubbar).
- `src/content/projects/project-4.md` (Duck Quotes, stub).

Färdiga projekt (`project-1`, `project-3`) lämnas utan `draft` (visas).
`showEntry` (Slice B) gör att de döljs i prod men syns i `pnpm dev`.

### 2. Navigation: aktivera blogg, dölj Learn Hub i prod

`src/data/navigation.ts` – lägg till valfritt `devOnly`-fält i `NavItem`,
sätt Blogg `isEnabled: true`, och Learn Hub `devOnly: true`:

```ts
interface NavItem {
  title: string;
  path: string;
  isEnabled: boolean;
  isExternal?: boolean;
  icon?: string;
  devOnly?: boolean;   // visas bara i dev
}
```
Blogg: `isEnabled: true`. Learn Hub: behåll `isEnabled: true`, lägg
`devOnly: true`.

`src/components/Navigation.astro` – uppdatera filtret:
```astro
{navigationItems
  .filter(item => item.isEnabled && (!item.devOnly || import.meta.env.DEV))
  .map(item => ( ... ))}
```

### 3. Inga Learn Hub-artikelsidor i prod

Tack vare `showEntry` i `getStaticPaths` (Slice B) genereras inga
learn-artikelsidor i prod. `/learn-hub/`-indexet och kategori-sidorna
kvarstår men visar tomma listor och är **olänkade** i prod – acceptabelt och
enkelt (ingen redirect-komplexitet i statiskt bygge).

## Gör inte

- Radera inga filer eller bilder (allt bevaras).
- Bygg ingen lösenords-/auth-mekanism för Learn Hub – out of scope.
- Ändra inte design eller innehållstext här.

## Verifiering

- `pnpm dev`: Learn Hub-länk syns, alla artiklar + drafts nåbara; Blogg-länk syns.
- `pnpm build` (prod): 
  - Navigation saknar Learn Hub, har Blogg.
  - `public/` innehåller inga draftade sidor: grep efter
    `learn-hub/docker/intro-to-docker`, `posts/post-1`, `projects/project-4`
    → ska saknas. `projects/project-1`, `projects/project-3` → ska finnas.
  - Innehållsfilerna finns kvar i `src/content/` (inget raderat).

## Faktiskt utfall

- `draft: true` tillagt i: `learn/intro-to-docker.mdx`, `learn/azure-basics.mdx`,
  `posts/post-1..4.md`, `projects/project-4.md`. Inga filer raderade.
- `navigation.ts`: `Blogg` → `isEnabled: true`; `Learn Hub` → `devOnly: true`.
  `NavItem` fick fält `devOnly?: boolean`.
- `Navigation.astro`: filter `item.isEnabled && (!item.devOnly || import.meta.env.DEV)`.
- **Prod-bygge:** 19 → **12 sidor**. Verifierat saknas: `posts/post-1..4`,
  `projects/project-4`, `learn-hub/.../intro-to-docker`, `.../azure-basics`.
  Verifierat finns: `projects/project-1`, `projects/project-3`, `/posts/`,
  `/works/`, `/`. Prod-nav: `Blogg, GitHub, Projekt` (Learn Hub borta).
- **Dev:** alla draftade sidor nåbara (200) + Learn Hub-länk syns i nav.
- Källfiler i `src/content/` orörda (allt bevarat).

## Officiell referens

- Astro content collections: draft-filter via `import.meta.env.PROD`.
- `import.meta.env.DEV`/`PROD` (Vite/Astro) för miljöberoende rendering.
