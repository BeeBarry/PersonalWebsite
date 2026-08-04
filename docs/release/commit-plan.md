# Commit-plan — revideringen av barrynamdari.se

Sju commits som följer planens etapper. Kör dem i ordning; varje `git add` är explicit så att inget oväntat följer med.

---

## 1. Repo-städ: avtracka byggoutput, utöka .gitignore, rensa bilder

`public/` är Astros `outDir` och har legat i git som en dubblett av källorna. `git rm -r --cached` tar bort filerna ur indexet men lämnar dem kvar på disken — helt säkert eftersom CI bygger `public/` själv och publicerar den som Pages-artefakt. Samma sak för `.astro/` (Astros cache). Här ligger också de oreferade bilderna i `static/` och plandokumenten.

```bash
git rm -r --cached public .astro
```

```bash
git add .gitignore
```

```bash
git add static/404.webp static/7.png static/GitHub.webp static/blog.webp static/bn_1.png static/laptop.webp static/noise.png static/profilepic.png static/space.webp static/youtube.webp
```

```bash
git add docs/release/revideringsplan.md docs/refactor/
```

```bash
git commit -m "Avtracka byggoutput och rensa arbetsytan

- Tar public/ (Astros outDir) och .astro/ ur git — filerna ligger kvar på
  disken, men CI bygger dem själv och publicerar public/ som Pages-artefakt.
- Utökar .gitignore med byggoutput, astro-cache, dev-loggar,
  verktygsartefakter och designsessionernas skärmdumpar i repo-roten.
- Raderar tio oreferade bilder i static/ (bl.a. profilepic.png på 3,2 MB som
  numera importeras från src/assets/images/).
- Lägger in revideringsplanen och refaktorunderlaget under docs/."
```

---

## 2. Fundament: brytpunkten till `lg:`, färgen och lyssnarläckan

Layoutens desktopläge bröt vid `md:` (768 px), där sidopanelen blev för trång. Allt flyttas till `lg:` (1024 px) — och JS-brytpunkten får en enda källa så att CSS och skript inte kan glida isär. Färgändringarna bor i samma `global.css` och åker med.

```bash
git add src/scripts/breakpoints.ts src/scripts/stickyBar.ts src/scripts/domainFilter.ts src/layouts/AppLayout.astro src/components/layout/Brand.astro src/components/layout/Nav.astro src/components/layout/Sidebar.astro src/components/layout/ThemeToggle.astro src/components/site/StickyBar.astro src/styles/global.css
```

```bash
git commit -m "Flytta layoutens brytpunkt till lg och justera paletten

- Byter md: mot lg: (1024 px) i skalet, sidopanelen, navigationen och den
  sticky baren — sidopanelen var oläslig i 768–1023 px.
- Inför src/scripts/breakpoints.ts med DESKTOP_MQ som enda källa för
  JS-brytpunkten, så scroll-containern aldrig kan glida isär från CSS.
- Lagar lyssnarläckan i stickyBar: lyssnarna kopplas nu bort vid
  astro:before-swap i stället för att staplas för varje sidbyte.
- Mörkar ljusa lägets accent till #446f0a för godkänd kontrast och ger
  ljust läge ytseparation (bg #f2f0ea mot kort #fffefb, djupare skugga).
- Skip-linkens stil och hoppmålet #innehall ligger i samma filer och följer
  med här; resten av tillgänglighetsarbetet ligger i nästa commit."
```

---

## 3. Dokumenthuvud: delbarhet, indexering och semantik

Allt som rör `<head>`, sökmotorer och sidsemantik. `@astrojs/sitemap` är det enda nya beroendet, därav `package.json` + låsfilen.

```bash
git add src/layouts/BaseLayout.astro src/config/site.ts astro.config.mjs package.json pnpm-lock.yaml static/robots.txt static/site.webmanifest static/og-default.png static/og-hr.png src/pages/404.astro 'src/pages/posts/[...slug].astro' 'src/pages/projects/[...slug].astro' 'src/pages/learn-hub/[category]/[article].astro'
```

```bash
git commit -m "Ge sidorna ett komplett dokumenthuvud

- Lägger till og:image med absolut URL, og:site_name, og:locale och
  twitter:image — delningar på LinkedIn och Slack visade tidigare ingen bild.
- Flyttar charset och viewport allra först i head; specen läser bara de
  första 1024 byten.
- Byter nästlade <main> mot <article> på inläggs-, projekt-, artikel- och
  404-sidan, så dokumentet bara har ett main-landmärke.
- Lägger till robots.txt, sitemap (design-systemet filtreras bort) och
  webmanifest, samt en inert GoatCounter-hook som räknar på astro:page-load.
- Rättar certifikatet till Microsoft Certified: Azure Fundamentals (AZ-900)
  i site.ts, som ändå ändras här för analytics-konfigurationen."
```

---

## 4. Teknik-guiden som landningssida

HR-fliken går från flikskal till en sida som förklarar sig själv, är ärlig om vad som är utkast och fungerar med tangentbord.

```bash
git add src/pages/for-hr/index.astro 'src/pages/for-hr/[card].astro' src/components/hr/Faq.astro src/components/hr/HrTabBar.astro src/components/hr/Library.astro src/scripts/hrGuide.ts src/styles/hr.css src/data/hr.ts
```

```bash
git commit -m "Gör Teknik-guiden begriplig vid första anblicken

- Ger sidan en synlig rubrik, kortare ledtext och fliketiketter som säger
  vad man får — besökaren mötte annars ett filter utan sammanhang.
- Krymper kromet på mobil så innehållet syns ovanför vikningen.
- Gör utkasten ärliga: klara kort sorteras först, metaraden räknar
  \"klara\" och \"på gång\" separat i stället för att lova tretton kort.
- Tar bort FAQ-filtret, som filtrerade elva frågor i tre kategorier.
- Fixar föräldralösa ARIA-roller, tysta uppdateringar utan live-region,
  för små träffytor och sökfältets fokusläge."
```

---

## 5. Vikt, buggar och kodhälsa

```bash
git add static/bn_2.png static/bn_3.png static/bn_4.png static/dev_1.png static/dev_2.png static/dev_3.png static/dev_4.png src/components/ZoomableImage.astro src/components/site/Icon.astro src/pages/learn-hub/index.astro 'src/pages/learn-hub/[category]/index.astro'
```

```bash
git commit -m "Krymp projektbilderna och laga småbuggarna

- Komprimerar sju projektbilder, från ~1,7 MB till ~0,34 MB totalt.
- Låter projektbilder öppnas som vanlig länk under md, där lightboxen är
  avstängd — och markerar länken data-astro-reload så ClientRouter inte
  laddar ner bilden två gånger.
- Ger bildtexten var(--c-text-muted) i stället för hårdkodad #666, som var
  oläslig i mörkt läge.
- Tystar två ts(2322) i Icon.astro med as const och en smalare aria-hidden.
- Genererar inga sidor för tomma Learn Hub-kategorier och döljer
  domänfiltret när det bara finns en domän att välja."
```

---

## 6. Innehåll: riktiga inlägg, projekt och HR-kort

Platshållarna (`post-1`–`post-4`, `project-1/3/4`, inklusive Duck Quotes) försvinner och ersätts av skrivet material. `git add src/content/` tar både tilläggen och raderingarna.

```bash
git add src/content/ src/data/hr-content.json src/pages/posts.astro src/pages/works.astro
```

```bash
git commit -m "Byt platshållarinnehåll mot skrivet material

- Raderar sju platshållare (post-1–4, project-1/3/4, däribland Duck Quotes)
  som lovade innehåll sajten inte hade.
- Publicerar två fältnoteringar (CoAP och MQTT, Docker till Azure) och två
  riktiga projektbeskrivningar (barrynamdari.se, DevOps-verktyg).
- Publicerar Docker-artikeln och lägger till Intro till Kubernetes i
  Learn Hub.
- Skriver ut fyra HR-kort i sin helhet: frontendutvecklare, DevOps-ingenjör,
  Docker och CI/CD.
- Enar namnet på listan och detaljsidan till \"Fältnoteringar\"."
```

---

## 7. Startsidan: rubrik, certifikat och kontaktsteg

```bash
git add src/pages/index.astro
```

```bash
git commit -m "Ge startsidan en h1 och ett tydligt kontaktsteg

- Gör taglinen till sidans h1 — dokumentet saknade rubriknivå 1 helt.
- Renderar certifikaten som leverantörslogga plus officiellt namn, utan
  badge-platshållare som aldrig fanns.
- Lägger till en kontaktsektion som avslutar sidan: vad jag söker, plus
  LinkedIn och mejl hämtade ur site.social så adresserna bara finns på
  ett ställe.
- Byter kvarvarande md: mot lg: så startsidan följer skalets brytpunkt."
```

---

## Efterkontroll

```bash
git status --porcelain
```

Utskriften ska vara tom — allt spårat är då committat och resten fångas av `.gitignore`.

## Not om release

Pipelinen triggas bara på branchen `develop`. Arbetet ligger på `breeze-refactor-based-on-checkpoint-previous`, så det når inte produktion förrän det mergas till `develop`.