# barrynamdari.se

Personlig sajt i **Astro 7** med pnpm. Innehåll i `src/content/`, sidor i `src/pages/`.

```bash
pnpm dev          # utvecklingsserver, port 4321
pnpm build        # bygger till ./public (obs: inte ./dist)
pnpm astro check  # typkontroll
```

---

## Learn Hub — läs det här innan du rör innehållet

`src/content/learn/` innehåller 19 artiklar som följer en **fast pedagogisk modell**. Den är inte en
stilpreferens utan ett arbetsdokument med mätbara regler, och den gäller undantagslöst.

**Obligatorisk läsning innan du skriver eller reviderar en artikel:**

| Fil | Vad den är |
|---|---|
| [`docs/pedagogik/01-grundmodellen.md`](docs/pedagogik/01-grundmodellen.md) | **Standarden.** Fem lager, tio drag, process, checklista |
| [`docs/pedagogik/00-referens-monsteranalys.md`](docs/pedagogik/00-referens-monsteranalys.md) | Analysunderlaget. Mätvärden där är *före* revideringen |
| [`docs/pedagogik/02-revideringsplan.md`](docs/pedagogik/02-revideringsplan.md) | Genomförd plan, behålls som mall |

**Läs också en färdig artikel som facit** — modellen ensam räcker inte. Vilken som helst av
`git-vad-git-sparar`, `intro-till-kubernetes`, `natverk-metoder-statuskoder-headers`.

### De reglerna som oftast bryts

- **15–22 h2 per artikel.** Rubrikerna ska ensamma lära ut ämnets anatomi.
- **Minst tre `X vs Y`-sektioner** med egen rubrik — inte som bisatser.
- **Kör varje kommando i *Prova själv* innan du påstår vad det ger.** Den regeln har fångat fyra
  faktiska fel. Kontrollera också *varför* något lyckades, inte bara att det gjorde det.
- **Kontrollera överlapp mot redan skrivna serier.** Ett begrepp definieras en gång i hubben.
- **Kör sveptestet över hela hubben**, inte bara den artikel du rört.

### Lärkitet

`src/components/learn/` — skickas in via `components`-propen i
`src/pages/learn-hub/[category]/[article].astro`, så MDX använder dem utan import.

`Flow` (leder till) · `Stack` (vilar på) · `Split` (i stället för) · `Callout` · `Check` ·
`Del` (sektionsblock) · `Doodle` (metafor och anatomi).

Tre tekniska fällor som kostat felsökning:

- Bygg komponentmarkup av `div`/`span`. `.site .prose p|ul|li` (0,2,1) slår Astro-scopade
  klasser (0,2,0).
- Kit-tokens (`--lk-*`) ligger på `:root`, inte på `.lk`.
- MDX: citattecken går inte att escapa i ett vanligt JSX-attribut. Använd `caption={'… " …'}`.

### Doodles

SVG i `src/components/learn/doodles.ts`, renderas av `Doodle.astro`, genereras av
`scripts/doodles/generate.py`. **Inlinad SVG, aldrig `<img>`** — en bildfil ärver inte
`currentColor` och skulle kräva en version per tema.

Innan du ritar: stäm av briefen mot `Flow`/`Stack` i samma sektion. Säger de samma sak — rita inte.

---

## Git

Bo committar själv. Föreslå kommandon, kör dem inte.
