# Revideringsplan — release av barrynamdari.se

Framtagen genom en granskning i sex spår (färg/kontrast, HR-UX, innehåll, kod/prestanda,
mobil, release-hygien), där varje fynd faktagranskats adversariellt mot koden och planen
därefter kompletthetskritiserats. 55 verifierade fynd ligger bakom dokumentet.

Alla sökvägar är relativa till repo-roten. Radnummer speglar koden vid granskningstillfället —
verifiera innan du redigerar.

---

## Släppläge

Presentationslagret är klart, innehållet är det inte. Bygget är grönt (26 sidor, ~1,7 s, inga
döda interna länkar, korrekta canonicals), mörkt läge håller genomgående 8,3–17,6:1 i kontrast,
och den klientnära arkitekturen är genomtänkt. Men i prod finns 2 projektsidor, 0 blogginlägg,
0 learn-artiklar och 3 av 13 färdiga HR-kort, och två navigationsingångar leder rakt in i tomma
sidor.

Teknik-guiden, som är hela marknadsföringsidén, kan inte delas som den är: den saknar og:image
(LinkedIn renderar den bildlös), saknar synlig rubrik, och på iPad i porträtt är två av fyra
flikar helt oåtkomliga. Dessutom saknas konverteringssteget — en HR-person som läser guiden och
blir intresserad har ingen tydlig väg att höra av sig. Ljust läge är inte releaseklart:
olivaccenten ligger på 3,11:1 och slår ut guidens flikar, chips och knappar under AA.

Före publik release: fyll eller dölj de tomma sektionerna, laga flikraden på surfplatta, lägg
till og:image och en kontaktväg, och rätta faktafelen om ditt eget projekt och ditt eget certifikat.

---

## Blockerare

| # | Problem | Varför det stoppar | Åtgärd | Storlek |
|---|---------|--------------------|--------|---------|
| **B1** | **/posts tom i prod** — fyra lorem-inlägg, alla `draft: true`; listsidan visar "Noteringar är på väg" | "Fältnoteringar" ligger i huvudnavet och länkas från startsidan. Skrivprov är juniorens starkaste bevis — en tom flik kostar dubbelt | Skriv 1–2 inlägg, eller dölj nav-posten | L / S |
| **B2** | **/learn-hub tomt** — 5 kategorisidor som alla säger "Inga artiklar här ännu" | Sex byggda återvändsgränder. `devOnly` döljer i navet men sektionen är öppen via startsidans Utforska-rad och namnges i about-texten | Publicera Docker-artikeln + skriv en till + filtrera tomma kategorier | M |
| **B3** | **Flikraden klipps 768–1023 px** — FAQ och Ordlista oåtkomliga på iPad i porträtt | `main` är `md:overflow-x-hidden`, så raden går inte ens att swipa. Exakt iPad-porträtt, på sidan som delas på LinkedIn | Flytta layouten `md:` → `lg:` **inkl. JS-brytpunkterna** (se 1.1) | M |
| **B4** | **og:image saknas helt** | Hela poängen med /for-hr är delning på LinkedIn. `twitter:card=summary_large_image` utan bild lovar stor bild och levererar ingen | og-bilder + metataggar i BaseLayout | M |
| **B5** | **Flaggskeppsprojektet har faktafel** — "Astro 6" på fem ställen (faktiskt 7.1.1) + två funktioner som inte finns i koden | Första projektet en teknisk läsare öppnar, och det handlar om sajten hen står på | Rätta `project-1.md` | S |
| **B6** | **"AWS 900"** med AWS-logga överst på startsidan | Motsvarar inget existerande certifikat (nummerformatet är Microsofts). Läser som slarv på det första en rekryterare kan verifiera | Officiellt namn + rätt leverantörslogga | S |
| **B7** | **Ingen kontaktväg för målgruppen** | Enda kontakten är en omärkt 19 px kuvertikon i sidebaren. HR-personen som läser guiden och blir intresserad har ingen "hör av dig"-yta. Det är hela konverteringssteget i marknadsföringsidén | Kontaktsektion på startsidan + avslutande CTA i botten av /for-hr/ | M |

---

## Vägval — motstridiga förslag och vad som valts

| Fråga | Alternativ | Vald linje |
|---|---|---|
| Flikraden på surfplatta | Höj `hr.css` 640 → 900 px **eller** byt `md:` → `lg:` i layouten | **`md:` → `lg:`.** 900 px är för snålt — klippning kvarstår 901–917 px. Layoutbytet ger `main` 768 px vid 768 px viewport; flikraden behöver 589 px. Ett ingrepp löser två problem. |
| HR-kromet på mobil | Tre förslag, varav ett trasigt (`position: static` på `.hr-topbar` + sticky på barnet fungerar inte — sticky begränsas av förälderns border-box) | **Behåll sticky på `.hr-topbar`, dölj `.hr-switch` under 768 px bakom en 44×44-knapp.** |
| Utkastkorten | Dölj helt (filtrera `getStaticPaths`) **eller** separera visuellt | **Separera.** Filtrering ger 404 på korslänkarna från `Faq.astro` och `Translate.astro` (de slår upp mot hela `hrCards`). Att visa utkast är dessutom ett uttalat beslut i `hr-content.json` (`_meta.draftRule`). |
| Projektbilderna | Migrera till `astro:assets` **eller** komprimera på plats | **Komprimera nu, migrera efter release.** Migreringen rör posts/learn-scheman och alla konsumenter — M-till-L för samma besökarvinst som tio minuters `sips`. |
| Fokusringen | Global `box-shadow: 0 0 0 4px var(--c-bg)` på `:focus-visible` | **Nej.** Lägger opak sidbakgrunds-halo även på element som ligger på `--c-card`, och tappas tyst där en mer specifik regel sätter `box-shadow`. Accentbytet (1.2) löser 2,87:1-fallet; komplettera bara med `outline-color` på accentfyllda kontroller. |
| Learn Hub | Publicera **eller** prod-guarda bort sektionen | **Publicera.** Docker-artikeln är 1 115 ord och håller kvalitet — billigare att rätta fem korrekturfel än att bygga bort en sektion du vill ha. |
| Sitemap | "Sajten är osynlig för sökmotorer" | **Överdrivet.** Alla 26 sidor är internlänkade och avsaknad av robots.txt betyder implicit "allow all". Görs ändå, men som tio-minuterspost ihop med og-taggarna. |
| `pushState` för flikbyten | Byt `replaceState` → `pushState` | **Efter release.** Astros ClientRouter har egen popstate-hanterare som läser `history.state.index`; naiv pushState ger `undefined` där och trasig scroll-restaurering. |
| Egen token för kontrollgränser | Lägg `--c-border-control` för sökfältet | **Struket.** 1.3 ger `.hr-search__input` tillräcklig kontrast ändå — en extra token för ett element är mer underhåll än värde. |

---

## Etapper

Ordningen följer beroenden, inte granskningsområden. **Etapp 0** först eftersom byggoutputen i git
dränker varje efterföljande diff. **Etapp 1** är fundamentet: brytpunkten flyttar alla mätvärden på
mobil och surfplatta, och accenttokenet ändrar färgen i varje komponent — finputsar man komponenterna
först får man göra om det. **Etapp 2** är dokumenthuvudet: billigt, isolerat, innehåller en blockerare.
**Etapp 3** är Teknik-guiden, som förutsätter både layout och tokens. **Etapp 4** är vikt och buggar.
**Etapp 5** är innehåll — startar dag ett och löper parallellt, för texter tar kalendertid.

---

### Etapp 0 — Rensa arbetsytan

#### 0.1 Ta bort byggoutput ur git och utöka .gitignore — S
**Filer:** `.gitignore`

52 av repots 165 trackade filer är genererad output. En enda `pnpm build` ger 6 raderade,
4 modifierade och 17 nya filer i `git status`. Verifierat riskfritt: `.gitlab-ci.yml` kör
`pnpm build` i pages-jobbet och publicerar `artifacts: paths: [public]` — artefakten byggs alltid
från källkod, aldrig från den committade kopian.

```bash
git rm -r --cached public
```

`.gitignore` kompletteras med:

```gitignore
# byggoutput (Astro outDir — byggs i CI)
public/

# astro-cache & dev-loggar
.astro/
*.log

# verktygsartefakter
.claude/
.playwright-mcp/
.tmp-preview/
.vscode/

# screenshots från designsessioner
/*.png

# macOS
.DS_Store
```

Ledande slash på `/*.png` träffar bara roten — `static/*.png` förblir trackat. Committa
`.gitignore` i samma commit som borttagningen.

> **Verifiera skarpt:** slutsatsen bygger på config-läsning, men `pages`-jobbet är det som faktiskt
> publicerar sajten. Kör en gång på `develop` och bekräfta att Pages fortfarande serverar rätt
> innan du litar på det.

#### 0.2 Radera oreferade bilder i static/ — S
Tio filer, 5,07 MB, refereras varken från byggd HTML eller `src/`: `profilepic.png` (3,26 MB —
dubblett, startsidan importerar `src/assets/images/profilepic.png`), `space.webp`, `bn_1.png`,
`blog.webp`, `laptop.webp`, `7.png`, `noise.png` (`.noise-overlay` är `display:none`), `404.webp`,
`GitHub.webp`, `youtube.webp`.

**Rör inte** `blog-post.webp`, `image-1/2.webp`, `docker-intro.svg`, `intro-to-docker-pic1/2.svg`,
`6.png`, `8.png` — de refereras från draft-innehåll som ska publiceras.

---

### Etapp 1 — Fundament: brytpunkter och färg

#### 1.1 Flytta layouten till `lg:` — inklusive JS-brytpunkterna — M *(B3)*
**Filer:** `src/layouts/AppLayout.astro:19,23` · `src/components/layout/{Sidebar,Nav,Brand,ThemeToggle}.astro` ·
`src/components/site/StickyBar.astro:18` · `src/pages/{index,works,posts}.astro` + `learn-hub/*` ·
**`src/scripts/stickyBar.ts:15`** · **`src/scripts/hrGuide.ts:391`**

Idag slår `md:w-80` till redan vid 768 px: `main` blir 398 px brett och textkolumnen 317 px —
smalare än samma sida på en 390 px-telefon. Det är grundorsaken till B3.

**Detta är den ändring som lättast går fel.** Brytpunkten lever på två ställen:

1. **CSS/markup:** byt `md:` → `lg:` och `max-md:` → `max-lg:`. Utöver de tre uppenbara filerna
   finns `md:` i minst fyra till: `StickyBar.astro:18` (`md:px-10`), `Brand.astro:7,18`
   (`md:mb-12`, `md:block` på taglinen), `ThemeToggle.astro:10` (`md:h-8 md:w-8`), samt
   sidornas `md:px-10 md:py-12`. **Brand är värst:** vid 768–1023 blir headern staplad men visar
   fortfarande desktop-taglinen och `mb-12` — precis den höjd fixen ska ta bort. **ThemeToggle**
   krymper till 32 px, under 44 px-kravet i 3.6.

2. **JavaScript:** `stickyBar.ts:15` och `hrGuide.ts:391` har båda
   `window.matchMedia("(min-width: 768px)")` som avgör om de läser `main.scrollTop` eller
   `window.scrollY`. Efter layoutbytet scrollar sidan på `window` i intervallet 768–1023, medan
   skripten tror att `main` är scroll-container. **Sticky-baren och kortens innehållsförteckning
   går sönder på exakt iPad-porträtt — enheten B3 handlar om.** Byt till 1024 i båda, eller lyft
   ut till en delad konstant.

I samma svep, mobilnavet: ta bort `flex-wrap` och `max-md:justify-between` från `Nav.astro:15`
(behåll `overflow-x-auto no-scrollbar`), lägg `max-lg:hidden` på subtitle-spannet och
`max-lg:min-w-0` på länken. Idag wrappar navet till en ojämn 3+1-layout där "För HR" — den
viktigaste posten för målgruppen — hamnar ensam på rad två, och `<aside>` äter 283 px av varje
mobilskärm innan något innehåll (räkna med ~199 px efteråt).

**Gör 4.2 i samma commit** — den redigerar samma funktioner i samma två skript.

**Håll ögonen på:** `hr.css` har ett tjugotal `@media (min-width: 768px)`-block som fortsätter slå
till vid 768 medan layouten nu är staplad. Inget går sönder, men paddingen blir desktop-generös i
staplat läge. Verifiera på 360 / 390 / 768 / 834 / 1000 / 1024 / 1440.

#### 1.2 Ljus accent till `#446f0a` — S
**Filer:** `src/styles/global.css:101`

`--c-accent: #5f9c0a` ger 3,11:1 mot pappersbakgrunden och används både som länkfärg och som
fyllning under nästan vit text. Det slår ut guidens aktiva flik, aktiva chips, primärknappar och
TOC-markeringar — allt under AA 4,5:1.

`#446f0a` ger **5,51:1** mot `--c-bg`, **5,91:1** mot `--c-card`, **4,99:1** mot `--c-muted`, och
som fyllning 5,51:1 med `--c-accent-contrast` ovanpå. Samma gulgröna hue-familj (~84°) som mörka
lägets `#b9f24d`, men läser som skogsgrön i stället för grumlig oliv. **Rör inte mörka läget** —
det ligger på 14,86:1.

Komplettera: ta bort `outline: none` på `hr.css:295` (sökfältet), sätt
`outline-color: var(--c-accent-contrast)` enbart på accentfyllda kontroller.

#### 1.3 Ge ljust läge ytseparation — S *(delvis smaksak)*
**Filer:** `src/styles/global.css:95,96,107` (+ `:57` för mörkt)

Card mot bg är 1,07:1, surface mot card 1,08:1, bordern 1,25:1 — ljust läge kollapsar till ett
odifferentierat pappersark. Flikgruppen är designad som segmented control men behållaren syns inte.

Sänk bakgrunden i stället för att lyfta kortet, så papperskänslan bevaras:
`--c-bg: #f2f0ea` (card/bg → 1,13:1), `--c-surface: rgba(0,0,0,0.05)`, skugga till
`0 10px 40px -12px rgba(60,50,20,0.18)`. Texttokens håller med marginal (16,3:1 och 7,8:1).
Motsvarande lyft i mörkt: `--c-card: #17171b`.

Verifierat riskfritt: inga hårdkodade `#f7f6f2` utanför global.css, ingen `theme-color`-meta,
inget inline-skript som låser bakgrundsfärgen.

> Detta är ett hierarkifynd, inte ett WCAG-krav. Rekommendationen är att göra det — men tycker du
> att ljusa vyn ser rätt ut, hoppa över och behåll 1.2 (som är ett skarpt AA-fel, inte valfritt).

---

### Etapp 2 — Dokumenthuvud, semantik och delbarhet

#### 2.1 og:image och resten av og-paketet — M *(B4)*
**Filer:** `src/layouts/BaseLayout.astro:13,17-20,75-81` · `static/og-default.png` (ny) ·
`static/og-hr.png` (ny) · `src/pages/for-hr/index.astro` · `src/pages/for-hr/[card].astro` ·
`src/pages/posts/[...slug].astro` · `src/pages/projects/[...slug].astro`

Props deklarerar `image?: string` men destrukturerar den **aldrig** — prop-kedjan finns
(`AppLayout` spreadar redan vidare), bara sista ledet saknas.

Skapa 1200×630-bilder (mörk bakgrund, accent `#b9f24d`, texten "Teknik-guiden — tech förklarat för
HR" respektive namn + roll), destrukturera `image = '/og-default.png'` och lägg till:

```astro
<meta property="og:image" content={new URL(image, Astro.site!)} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={title} />
<meta property="twitter:image" content={new URL(image, Astro.site!)} />
<meta property="og:site_name" content="Barry Namdari" />
<meta property="og:locale" content="sv_SE" />
```

Absolut URL krävs — LinkedIn följer inte relativa. `Astro.site!` behövs under TypeScript strict.

**Per sida, inte bara default:** inläggen har redan `image` i frontmatter (`posts.astro:64` visar
att den används) — skicka den vidare, annars får varje delat inlägg samma generiska bild. Samma
för projekt. Sätt även `og:type="article"` på artikel- och projektsidor. Skicka `image="/og-hr.png"`
från HR-sidorna.

#### 2.2 h1 på startsidan — S
**Filer:** `src/pages/index.astro:33-37`

Dokumentet börjar på h2. Byt taglinens `<p>` till `<h1>` med samma klasser — texten fungerar redan
som rubrik. Lägg `mb-0` eftersom `@layer base` ger h1 `margin: 0 0 0.5rem`. Tailwind-utilities
vinner över baslagret, så `text-xl`/`font-bold` behålls.

#### 2.3 Nästlade `<main>` → `<article>` — S
**Filer:** `404.astro:8,24` · `posts/[...slug].astro:30,50` · `projects/[...slug].astro:36,91` ·
`learn-hub/[category]/[article].astro:34,47` · `for-hr/[card].astro:50,70,73,203`

`AppLayout.astro:23` renderar redan ett `<main>`; fem sidor öppnar ytterligare ett i sloten. Alla
13 HR-kortsidor exponerar två main-landmärken — flaggas garanterat av axe/Lighthouse. Byt de inre
till `<article>` med oförändrade klassnamn (inga selektorer är taggbundna — verifierat). Gör
samtidigt `hrGuide.ts:389`s `document.querySelector("main")` entydig.

#### 2.4 Skip-link — S
**Filer:** `src/layouts/AppLayout.astro:18,23` · `src/styles/global.css` (intill rad 244, utanför `@layer base`)

Nio fokuserbara element upprepas före första innehållselementet på varje sidladdning. WCAG 2.4.1
nivå A. Ge `<main>` `id="innehall"` + `tabindex="-1"`, lägg
`<a href="#innehall" class="skip-link">Hoppa till innehållet</a>` som första barn i wrappern.

#### 2.5 Flytta charset först i head — S
**Filer:** `src/layouts/BaseLayout.astro:27-60`

`<meta charset>` ligger på byte 1048 — 24 byte utanför specens 1024-bytesfönster, eftersom två
`is:inline`-skript med svenska kommentarer ligger före. Räddas idag av att GitLab Pages skickar
rätt Content-Type, men beroendet är osynligt och bryter vid hostbyte, lokal filöppning och
arkivering. Flytta `charset` + `viewport` först; tema-init behöver bara ligga före stylesheet-länken.

#### 2.6 robots.txt, sitemap och webmanifest — S
**Filer:** `static/robots.txt` (ny) · `static/site.webmanifest` (ny) · `astro.config.mjs:13` ·
`src/layouts/BaseLayout.astro:63-67`

Kör `pnpm astro add sitemap` (`site` är redan satt) och filtrera bort `/design-system`. Skapa
`static/robots.txt` med `Sitemap: https://barrynamdari.se/sitemap-index.xml` — observera att
`publicDir` är `./static`, inte `./public`. Alla fem PWA-ikoner finns och länkas; det som fattas är
manifestet och `theme-color` (`--c-bg: #0b0b0d`, `--c-accent: #b9f24d`).

#### 2.7 Analytics — S
**Filer:** `src/layouts/BaseLayout.astro`

Cookielöst (GoatCounter eller Plausible) så ingen samtyckesbanner behövs. **Måste haka på
`astro:page-load`**, annars räknas bara första sidvisningen på grund av View Transitions.

> Flyttad hit från "efter release" med avsikt: **releasen är experimentet.** Utan mätning kan du
> aldrig svara på om LinkedIn-delningen fungerade — och då är hela guidens sekundära syfte
> oobserverbart.

---

### Etapp 3 — Teknik-guiden som landningssida

#### 3.1 Synlig rubrik, kortare ledtext, begripliga fliketiketter — S
**Filer:** `for-hr/index.astro:25,27-36` · `HrTabBar.astro:19-24` ·
`{Library,Translate,Faq,Glossary}.astro` · `hr.css:223-233`

Sidan har ingen synlig rubrik: h1 är `sr-only` och största synliga text är en korttitel på 17 px,
medan kortdetaljsidans titel är 30 px. Besökaren kommer utifrån och möter en 10 px versal eyebrow
och en grå ledtext — ingen visuell ankarpunkt.

- Gör h1 synlig: `clamp(30px, 8vw, 40px)` (`7vw` ger bara 27 px på 390 px-skärm).
- Korta ledtexten till en mening.
- Byt fliketiketter från producentens ord till besökarens:
  **Bibliotek → Slå upp**, **Översätt → Annonsen**, **FAQ → Frågor**, Ordlista oförändrad.
- Lägg introrad överst i varje panel (`<h2>` + `<p class="hr-panel__intro">`) — sidhuvudet ligger
  utanför panelerna och står därför oförändrat på alla fyra flikar. På mobil möts man dessutom av
  Översätt-dragspelet helt utan förklaring, eftersom kolumnrubriken är `display: none` under 768 px.

Rubrikerna behövs även för 3.5.

#### 3.2 Krymp kromet på mobil — M
**Filer:** `hr.css:113-121,124-140,321-331,796-797` · `HrTabBar.astro:42-71` ·
`Library.astro:70` · `hrGuide.ts:99`

På ett HR-kort vid 360×740 börjar första meningen **624 px ner** — 84 % av skärmen är krom, och
sticky-baren äter 192 px permanent även under scroll (29 % av en iPhone SE). På listsidan börjar
första kortet på y=758, och chipet "Arbetssätt" ligger utanför skärmkanten utan scroll-indikator.

1. **Kortsidan:** under 768 px, `.hr-switch { display: none }` + en 44×44 sökikon-knapp i
   `.hr-topbar__bar` (bara `variant="detail"`) som togglar `data-switch-open` och fokuserar inputen.
   Panelen öppnas redan på `focus`, och stängning vid klick utanför/Escape finns bunden i
   `hrGuide.ts:357`. Ger tillbaka 96 px. Sänk `scroll-margin-top` 210 → 120 px i samma mediafråga.
   *Minimivariant: dölj bara `.hr-switch` utan knapp — "Alla kort" leder till biblioteket som har
   egen sök.*
2. **Listsidan:** flytta `.hr-metaline` till botten av bibliotekspanelen; visa `.hr-count` bara när
   sök/filter är aktivt (`countEl.hidden = !query && type === "Alla"` i `hrGuide.ts:99`).
3. **Chipsraden:** `mask-image: linear-gradient(to right, #000 calc(100% - 32px), transparent)` på
   `.hr-chips` och `.hrd-jump` — **bara i `@media (max-width: 767px)`**, eftersom `hr.css:329-330`
   gör chipsen wrappande på desktop där en högerfade skulle se ut som ett fel.

Tillsammans med 1.1 bör första kortet hamna kring y≈560 och kortets ingress kring y≈440. Verifiera.

#### 3.3 Gör utkasten ärliga — M
**Filer:** `hr.ts:150-176,191-193` · `Library.astro:91-97` · `for-hr/[card].astro:49-69` ·
`hr.css:425-435,444`

10 av 13 kort är utkast, och enda visuella skillnaden i listan är en 9,5 px grå badge. Tre av fyra
grupper består till 100 % av utkast, och metaraden marknadsför "13 kort".

- Sortera klara först inom varje grupp i `groupLibrary()`:
  `.sort((a,b) => Number(isDraft(a)) - Number(isDraft(b)))`
- Byt badge-copy "Utkast" → **"Kommer snart"** och dämpa kortet:
  `.hrcard:has(.hrcard__badge) { opacity: .72; border-style: dashed }`
- Ärlig metarad: `${done} kort klara · ${hrCards.length - done} på gång · ${hrFaq.length} frågor`
- Ge utkastsidan en väg vidare: rad under "Kortet är på gång" som länkar till Backendutvecklare,
  React och Kubernetes.

#### 3.4 Ta bort FAQ-filtret — S
**Filer:** `Faq.astro:13-26,36`

Vid ankomst visas 3 av 11 frågor, det finns inget "Alla"-chip (till skillnad från Bibliotek och
Ordlista som båda har det), och ingen väg att se alla samtidigt — medan metaraden lovar 11 frågor.
Med elva frågor kostar filtret mer än det ger. Rendera alla i ett dragspel, visa kategorin som
liten monoetikett per rad.

*Vill du behålla chipsen: lägg till "Alla" först och hantera i `hrGuide.ts:186` — men ta då bort
`i === 0 && "is-active"` och `aria-pressed={i === 0}` på rad 18/20, annars renderas två aktiva chips.*

#### 3.5 Tillgänglighet: föräldralösa roller och tysta uppdateringar — S
**Filer:** `for-hr/index.astro:38,41,44,47` · `Library.astro:70` · `HrTabBar.astro:110` · `hrGuide.ts:99`

Fyra sektioner har `role="tabpanel"` men det finns ingen `tablist`, ingen `tab`, inget
`aria-controls` — flikarna är vanliga länkar (vilket är rätt mönster och ska förbli så). Ta bort
`role="tabpanel"`, sätt `role="region"` + `aria-labelledby` mot rubrikerna från 3.1.

Lägg `aria-live="polite" aria-atomic="true"` **i markup** (inte via script — annars annonseras inte
första ändringen) på `.hr-count` och `[data-hr-switch-count]`, och låt `hrGuide.ts:99` skriva hela
meningen: `${shown} av ${cards.length} kort visas`. Idag ändras "13 träffar" till "2 träffar" utan
att någon får veta — WCAG 4.1.3.

#### 3.6 Träffytor och sökfält — S
**Filer:** `hr.css:43-55,282-292,299-313,809-821` · `global.css:1954-1965` · `for-hr/[card].astro:77-85`

`.hr-topbar__back` ("Alla kort") är **71×19 px utan padding** — enda tydliga vägen tillbaka från ett
kort, i en sticky bar, för en målgrupp som läser med tummen. Det enda elementet som underskrider
WCAG 2.2:s 24×24. Sätt `min-height: 44px; padding: 0 8px; margin-left: -8px; font-size: 13px`
(baren är 95 px hög på mobil). Samma teknik på `.backlink` och `.hrd-faq__all` (båda 20 px höga).
`.hrd-jump__link` → `padding: 9px 12px`. **Lämna chipsen på 36 px** — de klarar kravet, och en
höjning äter vinsten från 3.2.

Sätt `.hr-search__input` till `font-size: 16px` i basregeln och `14px` i `@media (min-width: 768px)`.
Under 16 px zoomar iOS Safari in viewporten vid fokus och zoomar inte tillbaka — direkt efter den
primära interaktionen i guiden.

Lägg en synlig etikett "HOPPA TILL" före `.hrd-jump` (dölj i 1200 px-mediat där sido-TOC:n tar över)
— pillerraden läses annars som ämnestaggar, och den är enda överblicken av ett 8–9 sektioner långt
kort på mobil.

#### 3.7 Konverteringssteget — M *(B7)*
**Filer:** `src/pages/for-hr/index.astro` · `src/pages/index.astro` · `src/config/site.ts`

Guiden slutar idag utan uppmaning: den enda CTA:n i Bibliotek-fliken handlar om att *föreslå ett
kort*, inte om att kontakta dig. En rekryterare som just läst tre kort och tänkt "den här personen
kan förklara" har ingen väg vidare.

- **Botten av /for-hr/** (alla fyra flikar, inte bara Bibliotek): ett avslutande block —
  "Rekryterar du just nu?" med kort text om att du är öppen för roller, plus LinkedIn + mejl som
  **textknappar med etikett**, inte ikoner.
- **Startsidan:** en kontaktsektion med samma innehåll. Överväg CV-länk (PDF i `static/`).
- Mejladressen finns redan i `site.social` — återanvänd den, hårdkoda inte.

---

### Etapp 4 — Vikt, buggar och kodhälsa

#### 4.1 Komprimera projektbilderna — S
**Filer:** `static/dev_1..dev_4.png`, `static/bn_2..bn_4.png`

En projektsida laddar 803 kB råa PNG:er (`dev_1.png` är 2476×1316 px) i en ~300 px bred ruta.
`/works/` drar 339 kB. Skala till max ~1600 px bredd, konvertera till WebP med behållna filnamn —
noll kodändring, samma URL:er. Förvänta 80–90 % minskning.

#### 4.2 Laga lyssnarläckan — M *(gör i samma commit som 1.1)*
**Filer:** `stickyBar.ts:10,33-35` · `hrGuide.ts:433-435,442-443`

Uppmätt i Chrome: efter fyra klientnavigeringar körs fyra window-scroll-handlers vid varje
scroll-event, tre mot detached DOM. Guarden sitter på ett element som byts ut vid varje
View-Transition-swap, så `bind()` går alltid igenom. Precis det flöde sajten marknadsförs för —
någon som klickar sig genom 10–20 kort — drabbas hårdast.

Följ mönstret som redan finns i repot (`ZoomableImage.astro:105` `let listenersAttached = false`,
och `switchDismissBound` i `hrGuide.ts:12`): flytta `update` till modul-scope, låt den slå upp
elementen vid varje anrop, registrera window-lyssnarna en gång bakom en modulflagga.
Element-lokala lyssnare kan ligga kvar — de dör med elementet.

> Samma filer och funktioner som 1.1:s JS-brytpunkter. Görs de separat skriver du om `update()`
> två gånger och testar samma scroll-beteende två gånger.

#### 4.3 Projektbilder på mobil — S/M
**Filer:** `projects/[...slug].astro:115-123` · `ZoomableImage.astro:34-38,156,159`

Bilderna är skärmdumpar med brödtext, visas i 332×208 px med `object-fit: cover` (kapar ~23 % av
bredden) och lightboxen är avstängd under 600 px. Hela den visuella bevisningen försvinner för
mobilläsaren. Ta bort beskärningen under 768 px (`aspect-ratio: auto; object-fit: contain`), gör
bilden till en vanlig länk till originalet på mobil.

**Aktivera inte den befintliga lightboxen** — den är `max-width: 90%`, vilket på 390 px ger 351 px,
alltså 19 px bättre än idag.

#### 4.4 Tre enradsfixar i samma commit — S
**Filer:** `domainFilter.ts:45` · `ZoomableImage.astro:42` · `astro.config.mjs:25,34`

- Lägg `window.scrollTo({ top: 0, behavior: "smooth" })` bredvid `main.scrollTo` — `main` är ingen
  scroll-container under `lg` efter 1.1, så chip-klick scrollar aldrig upp på mobil
  (`hrGuide.ts:36-39` gör redan rätt).
- `color: #666` → `var(--c-text-muted)` i bildtexten (3,28:1 i mörkt läge, byter inte tema).
- `subsets: ['latin', 'latin-ext']` → `['latin']`. 20 844 B laddas med preload-prioritet för ett
  teckenomfång sajten aldrig använder — en skanning av all byggd HTML hittar noll tecken i
  latin-ext-intervallen. Ompröva om du senare skriver namn med č/ā/ş.

---

### Etapp 5 — Innehåll (starta dag ett, löper parallellt)

Detta är det svagast täckta området i förhållande till ambitionen, och det som tar kalendertid.
Målet nedan matchar önskemålet: **2 blogginlägg, 2 learn-artiklar, alla projektbeskrivningar,
4 HR-kort.**

#### 5.1 Fältnoteringar: skriv två inlägg — L *(B1)*
**Filer:** `src/content/posts/post-1..4.md` · `src/config/site.ts:41` · `src/pages/index.astro:159`

Radera lorem-filerna (inget återanvändbart) och skriv **två** inlägg. Uppslag med material redan i
repot:

1. *"Från Docker-container till Azure — vad jag lärde mig av att deploya DevOps Tools"*
   (`domains: ['cloud']`)
2. *"CoAP och MQTT — varför uppkopplade enheter inte kan prata HTTP"* (`domains: ['embedded']`,
   täcker samtidigt luckan i 5.7)

Hinner du bara ett: publicera det och behåll fliken. Hinner du inget: sätt `devOnly: true` på
nav-posten och ta bort Utforska-länken. **Rekommendation:** skriv minst ett — en tom flik som lovar
skrivprov är sämre än ingen flik, men ett skrivprov är det starkaste beviset du har.

#### 5.2 Learn Hub: publicera Docker + skriv Kubernetes — M *(B2)*
**Filer:** `src/content/learn/intro-to-docker.mdx:3,16,26,28,60,177,179` ·
`learn-hub/[category]/index.astro:9-13` · `learn-hub/index.astro`

Rätta först fem korrekturfel i Docker-artikeln: `" det funkar ju inte på min dator"` (rakt
citattecken + inledande blanksteg), `av  tex. C#` (dubbelt blanksteg), `så att att alla`,
"specifiera/specifierar" → specificera, tankstreck utan spatier på rad 16.

> HR-innehållet får typografiska citattecken automatiskt via `typo()` i `hr.ts:199-207` — markdown
> har ingen sådan hjälp, så det måste skrivas korrekt i källan.

Ta bort `draft: true`, och **skriv artikel två: Kubernetes** — naturlig fortsättning på
Docker-artikeln, samma berättarröst, och den knyter direkt an till HR-kortet om Kubernetes.
Filtrera kategorier med noll artiklar ur `getStaticPaths` och hubb-listan, så sektionen krymper
ärligt till det som finns. **Behåll `devOnly` i navet tills det finns ≥3 artiklar** — startsidans
Utforska-länk blir den medvetna ingången.

#### 5.3 Alla projektbeskrivningar — M *(B5 + kritikerns komplettering)*

**`project-1.md` (Barrynamdari.se) — S:** "Astro 6" står på **fem** ställen (glöm inte rad 27, mitt
i brödtexten). Stryk rad 34 helt (`IntersectionObserver`-reveals och sheet-drawer finns inte i
koden) och skriv om rad 35. Lägg till det som är sant och mer imponerande idag: HR-sektionen med
scroll-spy-innehållsförteckning, det datadrivna innehållslagret
(`hr-content.json` separerat från presentation) och GitLab CI som bygger och publicerar Pages.

**`project-3.md` (DevOps Tools) — S:** det **enda andra live-projektet**, och beskrivningen är
generisk: *"En fullstack webbsida som lär ut om olika verktyg som används inom DevOps rollen."*
Skriv om efter samma mall som alla bra case: **problem → din roll → stack → resultat**. Sätt
`website` (står `TBA`) eller ta bort fältet, och kontrollera att `year: '2024'` stämmer.

**`project-4.md` (Duck Quotes) — beslut krävs:** ligger `draft: true` med platshållartext
(`description: 'Smygläs om detta projekt som snart lanseras..'`, brödtexten slutar mitt i en mening:
*"tar konceptet ett steg längre genom att...."*). Välj en linje:
(a) skriv färdigt och publicera, (b) låt ligga som draft — den syns ändå inte i prod, eller
(c) radera. **Rekommendation:** (b) om du inte hinner skriva klart — men lämna den inte halvfärdig
och glömd.

#### 5.4 Rätta certifikatnamnet — S *(B6)*
**Filer:** `src/config/site.ts:76-78`

Skriv ut fullständigt officiellt namn. Är det Microsofts AZ-900:
`"Microsoft Certified: Azure Fundamentals (AZ-900)"` + `icon: "logos:microsoft-azure"` — annars
visas fel leverantörslogga. Ta bort `badge`-fältet på båda posterna: det pekar på `static/certs/`
som inte existerar och läses aldrig av `index.astro`.

*Vilket certifikat du faktiskt har går inte att avgöra ur koden — det är din uppgift.*

#### 5.5 Alt-texter och slugs — S
**Filer:** `project-3.md:13,16,19,22,24,33` · `project-4.md:14,17` · filnamn i
`src/content/projects/` och `src/content/posts/`

`alt="first image of your project."` ligger live i `public/works/index.html` och tre gånger i
projekt-3. Byt till vad bilderna visar. Ta bort trailing space på rad 24, rätta "eventuell github repo".

Byt filnamn: `project-1.md → barrynamdari-se.md`, `project-3.md → devops-tools.md`,
`project-4.md → duck-quotes.md`. Filnamnet blir slug, så URL:en `/projects/project-1/` är det som
klistras in i mejl och står i adressfältet under en intervju — och numreringen har ett hål
(project-2 saknas). Verifierat säkert: noll hårdkodade id-referenser utanför `src/content/`.

> **Gör detta före 2.6 (sitemap) eller acceptera att sitemapen byggs om** — den regenereras vid
> varje `pnpm build`, så det är ofarligt, men gör slugbytet **före indexering** så du slipper redirects.

#### 5.6 Skriv fyra HR-kort — L
**Filer:** `src/data/hr-content.json`

I denna ordning, motiverat av vad HR faktiskt söker på:
1. **`hr-fe`** (Frontendutvecklare) — mest korslänkad i FAQ, 5 träffar
2. **`hr-devops`** — enda kortet som både FAQ och Översätt pekar på, och rollen du positionerar dig mot
3. **`hr-docker`** — förutsättning för att Kubernetes-kortet ska gå att förstå
4. **`hr-cicd`**

Använd `hr-backend` som mall rakt av — strukturen `what/analogy/tasks/fits/confuse/cv/ask/junior/senior`
fungerar. De tre färdiga korten, FAQ, Översätt och Ordlistan håller genuint publicerbar kvalitet.

#### 5.7 Bevisa eller ta bort embedded-inriktningen — M
**Filer:** `src/data/domains.ts:29-34` · `src/config/site.ts:121-122` · `src/content/`

Startsidan lyfter tre likvärdiga inriktningar, varav *"IoT & Embedded — hårdvarunära kod, CoAP/LTE-M
och enheter ute i fält"* har noll innehåll bakom sig (`grep -rn embedded src/content/` → 0 träffar).
Det är den nisch som skiljer dig från andra juniorer, och en rekryterare som klickar den hittar
ingenting — vilket får hela positioneringen att låta påhittad.

Enklast: fältnoteringen om CoAP/MQTT (5.1). Bäst: något från Smrtec-arbetet som går att beskriva
utan kunddata. Är embedded inte längre aktuellt — ta bort domänen och CoAP/MQTT ur stacken hellre
än att låta påståendet stå obevisat.

#### 5.8 Namnkonsekvens — S
**Filer:** `posts.astro:45` · `posts/[...slug].astro:20` · `site.ts:24-30,55`

Listsidans h1 säger "Noteringar & djupdyk" medan flik och sticky bar säger "Fältnoteringar", och
artikelns `<title>`-suffix säger "· Skrivet". Välj **"Fältnoteringar"** överallt. Gör
"cloud(-)utvecklare" konsekvent mellan `meta.description` och `hero.role`.

---

## Rimlig ordning att jobba i

1. **Repo-städ** (0.1 + 0.2) — först, annars dränker varje build alla efterföljande diffar.
   Verifiera CI-artefakten skarpt en gång.
2. **Starta skrivandet samma dag** — bestäm linjen för /posts (5.1), rätta project-1 (5.3) och
   certifikatet (5.4). Två av tre är trettio minuters arbete och tar bort två blockerare direkt;
   det tredje behöver kalendertid och ska ligga och gro medan du kodar.
3. **`md:` → `lg:` inkl. JS-brytpunkterna + lyssnarläckan** (1.1 + 4.2, samma commit) — löser B3
   och flyttar alla mätvärden i etapp 3. Måste före HR-mobilarbetet.
4. **Färgtokens** (1.2, ev. 1.3) — ändrar färgen i varje komponent du sedan finputsar.
5. **Dokumenthuvudet** (2.1–2.7) — blockerare B4 plus sex billiga, isolerade fixar i samma område.
6. **Teknik-guiden: rubrik, copy, mobilkrom, konverteringssteg** (3.1, 3.2, 3.7) — tyngsta
   UX-vinsten, och det som gör guiden delbar *och* verkningsfull.
7. **Teknik-guiden: utkast, FAQ, a11y, träffytor** (3.3–3.6) — bygger på rubrikerna från steg 6
   (`aria-labelledby` behöver dem).
8. **Bilder och småfixar** (4.1, 4.3, 4.4) — oberoende, men bör med i releasen.
9. **Learn Hub, alt-texter, slugs** (5.2, 5.5) — sist av kodändringarna; slugbytet strax före
   indexering.
10. **Bygg om, mät om** på 360 / 390 / 768 / 834 / 1024 / 1440 i **båda teman**. Kontrollera att
    `document.scrollWidth === innerWidth` överallt och att alla fyra flikar är nåbara. Merga till
    `develop` och pusha — **CI triggas bara på `develop`**, och arbetsbranchen finns bara lokalt.

### Kan vänta till efter release

- **Död CSS** (~500–600 rader i `global.css`: hela `.showcase`-familjen 388–482, `.post__body`,
  `.navbar__*`, `.ds-*`). Noll besökarvärde, icke-noll regressionsrisk precis före lansering. Egen
  commit utan andra ändringar, diffa `public/**/*.html` efteråt. Verifiera per klass — analysen är
  en undre gräns och draft-innehåll fångas bara via `src/`-grepen.
- **`astro:assets`-migrering** av bilderna (efter komprimeringen i 4.1) — rätt långsiktigt, men rör
  posts/learn-scheman och alla konsumenter.
- **Historik för flikbyten** (`pushState`) — kräver test mot ClientRouters popstate-hanterare.
- **`<noscript>`-fallback** för de tre dolda panelerna — dölj `.hr-gloss__controls` och sökfälten,
  inte bara `.hr-chips`, annars står en död sorteringsknapp kvar.
- **JSON-LD Person-schema** och **CI-cache** (rätt variabel är `PNPM_STORE_PATH`, inte `PNPM_HOME`).
- **Fler HR-kort** utöver de fyra i 5.6, och **tredje Learn Hub-artikeln**.
