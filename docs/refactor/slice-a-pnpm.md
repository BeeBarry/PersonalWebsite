# Slice A – pnpm-migration + GitLab CI

**Mål:** byta pakethanterare från npm till pnpm på ett sätt som inte skapar
dolda långsiktiga fel. Ren baslinje innan Astro 6 ändrar beroenden.

**Beroende:** ingen. Görs först.

## Varför

pnpm är snabbare och sparar disk (global store + hårdlänkar). Astro stödjer
pnpm officiellt. Projektets beroenden är få och standard → låg risk för pnpm:s
strikta `node_modules` (phantom-deps).

## Scope (gör)

1. **Pinna pnpm via Corepack.** Lägg till i `package.json`:
   ```json
   "packageManager": "pnpm@<version>"
   ```
   (välj senaste stabila pnpm; Corepack låser exakt denna version lokalt = i CI).
2. **Generera lockfil:** `corepack enable && pnpm install` → skapar
   `pnpm-lock.yaml`. **Ta bort `package-lock.json`.**
   Sätt även `COREPACK_ENABLE_DOWNLOAD_PROMPT: "0"` i `variables:` så Corepacks
   nedladdning av pnpm i CI inte hänger på en interaktiv `[Y/n]`-prompt.
3. **`.gitlab-ci.yml`** – uppdatera *båda* jobben (`test_develop`, `pages`).
   Lägg `corepack enable` i `before_script` och byt kommandon:
   ```yaml
   before_script:
     - corepack enable
     - pnpm install --frozen-lockfile
   script:
     - pnpm build
   ```
   (I `pages`-jobbet behålls git-kommandona oförändrade; bara `npm ci` →
   `corepack enable` + `pnpm install --frozen-lockfile` och
   `npm run build` → `pnpm build`.)
4. **Build-script-allowlist:** pnpm 11 blockerar build-scripts för alla
   beroenden by default (säkerhet). Astro-bygget kräver `esbuild` och `sharp`.
   pnpm 11 genererar automatiskt `pnpm-workspace.yaml` med nyckeln
   `allowBuilds:` – sätt:
   ```yaml
   allowBuilds:
     esbuild: true
     sharp: true
   ```
   (OBS: i pnpm 11 är det `allowBuilds` i `pnpm-workspace.yaml`, **inte**
   `pnpm.onlyBuiltDependencies` i `package.json` – den ignoreras tyst.)
   Allowlist `sharp` här täcker även framtida `image()`-användning.
5. Uppdatera ev. `README`/dok som nämner `npm`-kommandon.

### Deploy förenklad (beslut under Slice A)

Det gamla `pages`-jobbet gjorde `git checkout -B main` → `git merge develop`
→ `git push main` med `CI_PUSH_TOKEN`. Den token löpte ut och blockerade
deployen. Eftersom GitLab Pages publicerar artefakten `public/` direkt (kräver
inte att koden ligger på `main`) togs hela merge/push-main-steget bort:

- `pages`-jobbet kör nu bara `pnpm build` + `artifacts: public/`.
- Borttaget: git-identitet, `git fetch`, checkout/merge/push, `CI_PUSH_TOKEN`,
  samt `GIT_DEPTH: 0` / `GIT_STRATEGY: clone` (fanns bara för merge).
- `CI_PUSH_TOKEN`-variabeln i Settings → CI/CD används inte längre (kan tas
  bort manuellt vid tillfälle, ofarlig att lämna).
- Konsekvens: `main`-branchen speglas inte längre av CI. Det är ok – `main`
  användes inte för Pages. `develop` är fortsatt deploy-trigger.

### Faktiskt utfall

- `packageManager` pinnad till `pnpm@11.0.9` (= versionen som genererade
  lockfilen lokalt → identiskt i CI via Corepack, ingen versionsdrift).
- `pnpm-workspace.yaml` skapad med `allowBuilds: { esbuild: true, sharp: true }`.
- `pnpm-lock.yaml` skapad, `package-lock.json` borttagen.
- README innehöll inga `npm`-kommandon (ingen ändring behövd).
- Lokal verifiering grön: clean `pnpm install --frozen-lockfile`, `pnpm build`
  (19 sidor), `pnpm dev` (`/`, `/works/`, `/posts/post-1/` → 200).

## Gör inte

- Ändra inte `astro.config.mjs`, beroendeversioner eller någon källkod.
- Lägg inte till `.npmrc` med `shamefully-hoist=true` "för säkerhets skull" –
  bara om ett konkret byggfel kräver en specifik `public-hoist-pattern`.
- Rör inte git-/deploy-logiken i `pages`-jobbet utöver pakethanterar-bytet.

## Verifiering

- Lokalt: `rm -rf node_modules && corepack enable && pnpm install --frozen-lockfile && pnpm build` → grönt, `public/` byggs.
- `pnpm dev` startar och sidan fungerar.
- GitLab-pipeline grön på `develop` (både `test_develop` och `pages`).
- `git status`: `pnpm-lock.yaml` tillagd, `package-lock.json` borttagen.

## Officiell referens

- Astro install/setup: pnpm stöds (`pnpm add astro`).
- Astro images-guide: under strikt pakethantering kan `sharp` behöva
  installeras explicit (`pnpm add sharp`).
