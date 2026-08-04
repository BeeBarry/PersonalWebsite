# Grundmodellen för Learn Hub

Den pedagogiska standarden för allt innehåll i hubben. Destillerad ur mönsteranalysen i
[`00-referens-monsteranalys.md`](00-referens-monsteranalys.md) och **bekräftad 2026-08-04** mot
fyra referensartiklar: `git-vad-git-sparar`, `git-branch-merge-konflikter`, `intro-till-kubernetes`
och `kubernetes-trafik-in-i-klustret`.

Är något oklart — läs någon av de fyra. De är facit, inte exempel.

Modellen har **fem lager**. De byggs uppifrån och ner: skelettet först, sedan dragen, sedan
meningarna. Ett lager som saknas syns alltid nedåt.

```
Lager 1  SKELETTET   sektionerna och deras ordning
Lager 2  DRAGEN      tio retoriska drag som fyller sektionerna
Lager 3  MENINGEN    hur en mening får se ut
Lager 4  NIVÅN       hur mycket djup som släpps in
Lager 5  BILDEN      när, vilken sort, och hur den ser ut
```

---

## Lager 1 — Skelettet

### Granulariteten är signaturen

**15–22 h2-rubriker per artikel.** Detta är den viktigaste enskilda regeln, och den som skiljer
modellen mest från hur hubben såg ut innan.

Varje sektion svarar på **en** fråga och är 2–5 korta stycken. Rubrikerna ensamma ska lära ut
ämnets anatomi — läser någon bara innehållsförteckningen ska de få den mentala modellen.

Rubriken är alltså inte en etikett på ett textblock. Den är en minnesnyckel och en sökingång.

### Sektionsordningen

| Sektion | Uppgift |
|---|---|
| **Var vi är** | Återberätta föregående del i en mening, säg vad den här löser, deklarera zoomnivån |
| **Vad X är** | Definitionen. En sektion per begrepp, i beroendeordning — inget begrepp används före det definierats |
| **X vs Y** | Egen sektion per förväxlingspar. Se nedan |
| *(fallgropar)* | `Callout type="fallgrop"` där de hör hemma i flödet, inte samlade i slutet |
| **Vad det här betyder i ditt arbete** | Rollrelevans. Vad läsaren faktiskt kommer att göra, och vad som kan vänta |
| **Vanliga nybörjarförväxlingar** | Kompakt svepning, en förväxling per stycke, ingen punktlista |
| **Prova själv** | Verkligt kommando + vad du ska se + den förvirrande utdatan förklarad |
| `Callout type="kom-ihag"` | 5–6 kärnpunkter, boxade |
| `<Check />` | 5–6 frågor med dolt svar |
| **Snabb sammanfattning** | Punktlista som speglar sektionerna, en punkt per sektion |
| **Nästa del** | Bryggan. Gärna en fråga som nästa del besvarar |

**Både `kom-ihag` och snabbsammanfattningen ska finnas.** Boxen fångar den som skummar,
punktlistan är den kompletta repetitionen. De gör olika jobb.

### Scenariot ska inte inleda

Tidigare inledde artiklarna med ett namngivet scenario. **Det gör de inte längre.** Artikeln
öppnar med *Var vi är* och går direkt på definitionerna.

Rollistan (Lisa, Maria, Johan, e-handelssystemet) finns kvar men flyttad: personerna dyker upp
inuti sektionerna där de behövs, som illustration av ett konkret fall — inte som ingång.

### Sektionsblock — makrostrukturen

15–22 rubriker är rätt antal, men en platt lista av dem över 12 skärmars scroll saknar
makrostruktur. `<Del titel="…" />` märker upp var ett block börjar, i både brödtexten och
innehållsförteckningen, **utan att röra rubriknivåerna** — alla h2 finns kvar som egna poster.

```mdx
<Del titel="Commiten" />

## Vad en commit är
```

| Regel | Värde |
|---|---|
| Block per artikel | **2–4** innehållsblock, plus slutblocket |
| Sektioner per block | **minst 3** |
| Slutblockets etikett | alltid **`Öva och förstå`** — de fem sista sektionerna |
| Etikett | artikelspecifikt substantiv ur ämnet: *Grenen*, *Resan*, *Nycklarna* |

**Etiketterna är per artikel, inte en fast uppsättning.** En generisk vokabulär
(*Begreppen · Praktiken*) hade varit konsekvent men innehållslös — och en mall att fylla är
precis det som börjar forma innehållet efter sig. Undantaget är slutblocket, vars fem sektioner
är ordagrant identiska i alla artiklar.

**Riktningsregeln — den viktigaste:**

> **Grupperingen beskriver artikeln. Den styr den aldrig.**
>
> Etiketten hämtas ur sektionerna, aldrig tvärtom: skriv artikeln färdig, läs sedan av vilka block
> den råkade bli. Faller sektionerna inte redan i sammanhängande följder — gruppera inte. Flytta
> **aldrig** en sektion för att en gruppering ska gå ihop. **Noll block är ett giltigt utfall.**

Att grupperingen gick att införa i alla 19 artiklar utan att flytta en enda sektion är ingen
slump: beroendeordningen klustrar redan besläktade begrepp. Blocken gör en befintlig egenskap
synlig — de lägger inte till ett krav.

### "X vs Y" är en sektionstyp

Varje förväxlingspar får **egen rubrik**, inte en bisats i löptext. Formen är alltid densamma:

```
## Pod vs container

En container är den körande instansen av en image. Det är samma sak som i Docker.

En pod är Kubernetes omslag runt en eller flera sådana containrar. Kubernetes schemalägger,
flyttar, räknar och startar om poddar — aldrig enskilda containrar.

Därför heter kommandot `kubectl get pods` och inte `kubectl get containers`.
```

Definition, definition, konsekvens. Tre stycken räcker nästan alltid.

**Minst tre vs-sektioner per artikel.** Välj de par läsaren faktiskt blandar ihop, inte de mest
formellt korrekta distinktionerna.

---

## Lager 2 — De tio dragen

Dragen är checkbara enheter. Vid granskning pekar man på ett saknat drag vid namn i stället för
att säga "gör det tydligare".

| Drag | Formel | Var det hör hemma |
|---|---|---|
| **1. Ankaret** | Återberätta förra delen i en mening, sedan vad den här löser | Första stycket |
| **2. Definitionen** | `X är Y.` — måste funka fristående i en ordlista | Först i varje begreppssektion |
| **3. Avgränsningen** | `X är inte Z.` som hel mening — och som egen vs-sektion för de stora paren | Direkt efter definitionen |
| **4. Bilden** | En fysisk analogi, märkt med sin gräns | När begreppet är abstrakt |
| **5. Avlastningen** | `Du behöver inte kunna X nu — poängen är Y.` | Efter en detaljtung passage |
| **6. Dörren** | Namnge djupet som skjuts upp och var det tas | Där utelämnandet sker |
| **7. Beviset** | Den minsta artefakt som fortfarande är äkta | I varje begreppssektion |
| **8. Kontrasten** | Fel bredvid rätt, i `Split` | Fallgropen |
| **9. Ekot** | Sektionens kärnmening som fristående sista rad | Sist i sektionen |
| **10. Rollrelevansen** | Vad läsaren gör dagligen, vad som kan vänta, och vad som ändras i en annan roll | Egen sektion nära slutet |

### Regeln för definitionen

Varje begreppssektion **öppnar med ett påstående**, aldrig med en fråga, en berättelse eller en
inledande bisats.

> En **gren** är en fil som innehåller en commit-hash.
> En **Ingress** är en uppsättning regler för hur inkommande trafik ska fördelas mellan flera tjänster.

Första meningen ska kunna klippas ut och läggas i en ordlista utan redigering.

### Regeln för avlastningen

Formuleras alltid som ett **par**: det som får släppas, och det som ska fastna.

> Vad control plane består av internt — API-server, schemaläggare, en databas som heter etcd —
> behöver du inte kunna nu. Det räcker att veta att den finns och att det är den du talar med.

Utan andra halvan blir avlastningen ett hål i stället för ett fokus.

### Regeln för rollrelevansen

Tre saker, i den ordningen: vad läsaren kommer att göra **varje vecka**, vad som kan **vänta**,
och vad som ändras om läsaren går mot en **annan roll**.

> Som utvecklare skriver du Service- och Ingress-manifest, och du felsöker med de fyra kommandona
> ovan. […] Att sätta upp själva Ingress-controllern […] är oftast någon annans jobb — men det är
> också det som gör att din regel plötsligt slutar fungera.

### Regeln för beviset

Det minsta som fortfarande är äkta. Två rader HTTP slår fyrtio rader realistiskt anrop. Aldrig
pseudokod där riktig kod ryms, aldrig `foo`/`bar` där ett verkligt namn finns.

**Två breddgränser, av olika skäl:**

| Innehåll | Gräns | Varför |
|---|---|---|
| Kodblock | **55 tecken** | Ryms i läsvyns 512–520 px på desktop utan sidscroll |
| ASCII-diagram | **40 tecken** | Måste rymmas i mobilens 315 px — se nedan |

Kod som scrollar i sin egen ruta på mobil är **rätt beteende**: sidan scrollar aldrig, och en läsare
accepterar att dra i ett YAML-block. Ett **diagram** som kräver sidledsdragning motverkar däremot sitt
eget syfte — poängen med bilden är att den ska gå att uppfatta i ett svep.

Diagramgränsen är alltså inte kosmetisk. Den är skillnaden mellan en bild som fungerar på telefon och
en som inte gör det.

Uppmätt i webbläsaren 2026-08-04: desktop (1400 px fönster) ger 512–520 px ≈ 66 tecken kodbredd,
mobil (375 px) ger 315 px ≈ 40 tecken. Verifieras maskinellt före avslut.

---

## Lager 3 — Meningen

Rytmen ligger redan rätt (median 13,5 ord, 1,9 meningar per stycke över hubben). Reglerna nedan
håller den.

**Skriv så här:**
- Presens. Aktiv form. Andra person: *du*, *din webbläsare*, *ditt team*.
- Varje handling har en utpekad utförare. Inte "filen läses" utan "Terraform läser filen".
- Ett stycke är 1–3 meningar.
- Upprepa substantivet i stället för att använda pronomen. Varje stycke ska gå att läsa ur sitt
  sammanhang: *"Servern tar emot anropet och skickar tillbaka ett svar"*, inte *"den skickar
  tillbaka ett"*.
- Motsatspar får identisk satsbyggnad.
- Hedga med precision: *oftast*, *för det mesta*, *på nybörjarnivå*.
- Engelska facktermer behålls oöversatta, i svensk syntax. Förklara en gång, använd konsekvent.
- **Alla värden är äkta och klistringsbara.** `104.21.80.1`, `docker-desktop`, `api.github.com`.
  Aldrig `foo`, aldrig `<ditt-namn-här>`.

**Skriv aldrig så här:**
- Nedvärderande ord: *helt enkelt*, *bara*, *självklart*, *trivialt*, *som du vet*.
- Dramatiskt register: *kraftfullt*, *magiskt*, *revolutionerande*, utropstecken.
- Meningar över 30 ord.
- Passiv form när utföraren är känd.
- Ett nytt begrepp i en bisats. Nya begrepp får egen mening, helst egen rubrik.

---

## Lager 4 — Nivån

**Deklarera zoomen i *Var vi är*.** Läsaren ska veta om det här är kartan eller ett hus på den.

> Den här delen ger överblicken över vad Kubernetes är och vilka fyra begrepp du behöver för att
> läsa vilken introduktion som helst. Detaljerna kommer i senare delar.

**Begreppstaket beror på artikeltyp.** En djupartikel håller sig till ~7 nya begrepp. En
översiktsartikel får ta fler (10–12) men måste då luta hårdare på Dörren — varje utelämnat djup
namnges.

**Beroendeordning.** Inget begrepp får användas innan det fått sin sektion. Måste ett namn nämnas
tidigare flaggas det på plats: *"en översättning som DNS sköter — vi tar DNS i egen del."*

**Doseringen per begrepp:**

```
definition → vad det gör → varför det finns → ett konkret exempel
→ vad det INTE är → namngiven dörr till djupet
```

**Serien är en resa, artikeln är en inzoomning.** Varje del fyller ett hål som en tidigare del
uttryckligen lämnade. Sista sektionen ställer frågan nästa del besvarar.

---

## Lager 5 — Bilden

### Lärkitet bär strukturen

| Komponent | Betydelse | Använd när |
|---|---|---|
| `Flow` | "leder till" | Något sker i ordning: init → plan → apply |
| `Stack` | "vilar på" | Lager ligger på varandra: LoadBalancer → NodePort → ClusterIP |
| `Split` | "i stället för" | Fel bredvid rätt, före bredvid efter |
| `Callout` | textens funktion | `varfor` · `sa-gor-du` · `fallgrop` · `kom-ihag` |
| `Check` | återhämtning | Alltid, före snabbsammanfattningen |
| `Del` | "här börjar ett block" | 2–4 gånger + slutblocket, se Lager 1 |

### Doodlen bär metaforen och anatomin

`Flow`/`Stack`/`Split` visar **struktur** — leder till, vilar på, i stället för. Doodlen visar hur
något **ser ut** och vad det **liknar**. Det är två olika jobb, och det är därför doodlen ska se
annorlunda ut än kitet.

**1–2 doodles per artikel.** Sju funktioner att välja ur: två vägar till samma mål · indirektion
över tid · anatomi · tvåvägscykel · fördelning · taxonomi · uppslag före anslutning.

#### Arbetsgången — i den här ordningen

**1. Skriv briefen först**, som en blockquote i MDX. Den renderas synligt tills bilden finns, så
platsen aldrig glöms bort:

```markdown
> **DOODLE** — En vägskylt märkt `api:5000` med heldragen pil in från "Frontend". Från skylten tre
> streckade pilar ut till tre lådor märkta "pod", varav en är överkryssad. Under: "Skylten står
> still. Poddarna byts ut."
```

Briefen ska ange: objekten, pilarnas typ, etiketterna och texten under bilden.

**2. Stäm av mot vad som redan står i sektionen.** Detta steg är inte valfritt — det kostade två
färdigritade bilder att lära sig. Finns en `Flow` eller `Stack` i samma stycke som redan säger
samma sak, **rita inte**. Två lådstaplar efter varandra är repetitivt hur väl den andra än är
ritad, och två bilder om samma sak i samma sektion bryter mot komplementaritetsregeln nedan.

Kontrollera också om poängen hör hemma *inuti* en befintlig komponent i stället — cachelinjen i
Docker 1.1 hör till `Stack`, inte till en egen bild.

**3. Rita, som SVG i `src/components/learn/doodles.ts`.** MDX anropar den på namn:

```mdx
<Doodle name="vm-vs-container" caption="Skillnaden är rutan som inte finns." />
```

`Doodle.astro` slår upp namnet och kastar ett begripligt fel om det inte finns, så en felstavning
stoppar bygget i stället för att tyst rendera tomt.

#### Varför inlinad SVG och inte en bildfil

En `<img src="…svg">` ärver **inte** `currentColor`. På en mörk läsvy hade en svart-på-vit bild lyst
som ett fönster, och lösningen hade blivit två filer per bild som ändå inte följer temaväxlaren.

Inlinad SVG ritar med `currentColor` och fungerar i båda lägena med en fil. Verifierat: samma bild
ger `rgb(242,242,244)` i mörkt läge och `rgb(20,19,13)` i ljust.

#### Formregler

| Regel | Värde |
|---|---|
| Färg | ingen — `currentColor`, dämpad till 82 % mot brödtexten |
| Linje | **en tjocklek, 2.0**, rundade hörn och ändar |
| Vingling | **1.2** ("stadig hand"). 4.0 = skiss, 0 = linjal |
| Volym | skraffering, aldrig fyllning |
| Text | monofont, substantiv plus högst en verbfras |
| Pilar | **heldragen = faktiskt flöde · streckad = härlett, uteblivet eller senare** |
| Objekt | max fem, var och en med etikett under sig |
| Metafor | fysiska föremål — laptop, hylla, vägskylt, fil med vikt hörn |
| Format | bred bild, generös luft, bildtext under |

**Rundade hörn behålls oavsett vingling.** Det är de, inte vinglingen, som gör att bilden läser som
en teckning i stället för som ett diagram. Tas de bort landar man i lärkitets formspråk och doodlen
tappar sin egen röst.

Stilen skruvas i [`scripts/doodles/generate.py`](../../scripts/doodles/generate.py) — parametern
`J`. Skriptet återskapar exakt de bilder som ligger i `doodles.ts`, så det går att ändra stil på
hela hubben utan att rita om något för hand.

#### Etiketter ska ha luft

Två av tre omritningar handlade om text som krockade med streck. Regeln som följer: **en etikett
ska ha minst ett halvt radavstånd fri luft från närmaste linje.** Ligger den närmare läses den som
en del av linjen, inte som en etikett.

Det gäller särskilt streckade linjer, där ögat redan letar efter mönster.

#### Komplementär, inte redundant

Bilden visar *var* och *hur det hänger ihop*; texten säger *vad det betyder*. **Kan bilden strykas
utan förlust ska den strykas** — och den prövningen görs i steg 2, innan något ritas.

---

## Prova själv

1. **Ett kommando**, kopierbart, som gör något verkligt.
2. **En mening om vad du ska titta efter** i utdatan.
3. **Föregrip förvirringen som övningen själv orsakar.**

Punkt 3 är det som gör sektionen värd något:

> Du kan försöka `cat .git/refs/heads/main` och få *No such file or directory* — det betyder inte
> att grenen saknas, utan att Git packat ihop sina referenser i `.git/packed-refs`.

**Företräde för läsande kommandon** på något läsaren redan har. Går det inte, använd ett lokalt
slängbart läge (Docker Desktops kluster, `sqlite3 :memory:`) och säg att det är slängbart.

Ibland **är felmeddelandet övningen** — `kubectl get pods` utan kluster bevisar att kubectl är en
klient. Använd det medvetet.

### Kör kommandona innan du påstår vad de ger

**Detta är regeln som fångar flest fel, och den går inte att ersätta med noggrann läsning.**

Ett `Prova själv` som beskriver fel utdata är värre än inget alls: läsaren drar slutsatsen att
*de* gjort fel. Varje kommando ska köras, och den faktiska utdatan ska styra texten.

Fyra påståenden som såg helt rimliga ut och var fel — samtliga upptäckta först vid körning:

| Påstod | Verkligheten |
|---|---|
| sqlite3 svarar `SEARCH … USING INDEX` | den svarar `USING COVERING INDEX` |
| insättning av 200 000 rader "tar några sekunder" | den tar 65 ms |
| en lång HCL-rad kan brytas efter `=` | `fmt` accepterar det, `validate` underkänner det |
| `terraform plan` faller utan inloggning | den lyckades — men bara för att maskinen var inloggad |

Det sista är det farligaste: **testet såg ut att bekräfta något och gjorde det inte.** Kontrollera
alltid *varför* något lyckades, inte bara *att* det gjorde det. Går det inte att avgöra — skriv
inget påstående om det.

### Kontrollera överlapp mot redan skrivna serier

Innan en artikel skrivs: läs igenom vilka begrepp de färdiga serierna redan äger.

Ett begrepp definieras **en gång i hubben**. Senare artiklar ankrar bakåt i en mening och går
vidare. Nätverksserien äger `GET vs POST`, `PUT vs PATCH` och idempotens — API-serien upprepar dem
alltså inte, utan kan i stället ägna utrymmet åt *design*.

Kontrollen är inte formalia. Den ändrade vad API 1.1 handlar om, och frigjorde plats för sex
sektioner som annars aldrig hade fått rum.

### Kör sveptestet efter varje ändring

Räknebara kriterier hittar avdrift som omläsning missar — inklusive i artiklar som redan är
godkända. Sveptestet fann att Git 1.0 bara hade två vs-sektioner sex serier efter att den
förklarats klar, och en 63-teckensrad som skrivits in samma dag.

Kontrollera per artikel: **h2 15–22 · vs ≥3 · kodrader ≤55 · ASCII-diagram ≤40 · alla sju
obligatoriska sektionerna · `Del`-block 2–4 om minst 3 sektioner · etiketten upprepar inte
rubriken under sig.**

I webbläsaren räcker ett anrop: `fetch` kategorisidorna, extrahera artikellänkarna, `fetch` +
`DOMParser` varje artikel, och mät kodrader med canvas `measureText` och typsnittet hämtat ur en
verklig `.prose pre`. Panelen måste ha riktig bredd först — annars rapporterar den `innerWidth: 0`
och varje breddmätning blir skräp.

---

## Revideringsprotokollet

I den här ordningen — fel i ett tidigt lager gör senare granskning meningslös.

1. **Granulariteten** — hur många h2? Under 15: vilka sektioner ska delas?
2. **Skelettet** — finns alla obligatoriska sektionerna?
3. **Dragen** — vilka av de tio saknas, och var? Rapporteras vid namn.
4. **Nivån** — beroendeordning bruten? Odeklarerad zoom? Tyst utelämnat djup?
5. **Meningen** — över 30 ord, passiv form, nedvärderande ord, pronomen som kräver sammanhang,
   påhittade värden.
6. **Bilden** — rätt komponent? Redundant? Kodrader över 55 tecken?

**Utdataformat:** tabell med `rubrik → saknat drag → konkret omskrivning`. Aldrig ett påpekande
utan föreslagen formulering.

---

## Snabbchecklistan

**Innan du skriver:**

- [ ] Läst minst en färdig artikel i serien som facit — inte bara den här modellen
- [ ] Läst föregående och följande del, så bryggan ställer rätt fråga
- [ ] Kontrollerat vilka begrepp redan skrivna serier äger, så inget definieras två gånger

**Artikeln:**

- [ ] 15–22 h2-rubriker; innehållsförteckningen ensam lär ut ämnets anatomi
- [ ] 2–4 `<Del />`-block om minst 3 sektioner var, plus `Öva och förstå` — eller inga alls
- [ ] Ingen `Del`-etikett upprepar rubriken under sig. En bar term över *Vad X är* är rätt;
      en upprepad fras är fel
- [ ] Öppnar med *Var vi är* med deklarerad zoomnivå — inte med ett scenario
- [ ] Varje begreppssektion öppnar med en ordlistefärdig definition
- [ ] Minst tre `X vs Y`-sektioner med egen rubrik
- [ ] Minst en avlastning: "det här behöver du inte nu — det som ska sitta är …"
- [ ] Allt utelämnat djup är namngivet, inget tyst bortvalt
- [ ] Alla värden och kommandon är äkta och klistringsbara
- [ ] Fallgropen visar fel bredvid rätt i `Split`
- [ ] Sektionen *Vad det här betyder i ditt arbete*
- [ ] Sektionen *Vanliga nybörjarförväxlingar*
- [ ] *Prova själv*: kommando + vad du ska se + den förvirrande utdatan förklarad
- [ ] `kom-ihag`-box **och** speglande snabbsammanfattning — båda
- [ ] `Check` med 5–6 frågor
- [ ] *Nästa del* ställer frågan nästa artikel besvarar
- [ ] 1–2 doodles — ritade, eller brief om de inte ritats än
- [ ] Doodlen stämd mot `Flow`/`Stack` i samma sektion: säger de samma sak, rita inte
- [ ] Inga nedvärderande ord, inget dramatiskt register, inga meningar över 30 ord
- [ ] Kodrader under 55 tecken — och **ASCII-diagram under 40**, verifierat maskinellt

**Innan du säger att den är klar:**

- [ ] **Varje kommando i *Prova själv* är kört**, och texten beskriver den faktiska utdatan
- [ ] Kontrollerat *varför* ett kommando lyckades, inte bara att det gjorde det
- [ ] Sveptestet kört över **hela hubben**, inte bara den nya artikeln
- [ ] `pnpm build` + `pnpm astro check`, kontrollerat i både 1400 px och 375 px
