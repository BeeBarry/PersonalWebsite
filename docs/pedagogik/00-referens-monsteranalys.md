# Referens: mönsteranalys av roadmap.sh-lektionerna

Analysunderlag för Learn Hubs pedagogik. Citaten är korta utdrag ur roadmap.sh:s lektioner
*How does the internet work?*, *What Is HTTP?* och *What Is a Domain Name?*, sparade för
jämförelse och stilanalys. **De ska aldrig publiceras på sajten** — de finns här som måttstock.

Grundmodellen som destillerats ur analysen: [`01-grundmodellen.md`](01-grundmodellen.md).

> **Det här är analysunderlaget, inte standarden.** Mätvärdena beskriver hubben *före*
> revideringen 2026-08-04 och står kvar för att visa vad gapet var. Gällande regler finns i
> grundmodellen — skiljer de sig åt gäller den.

---

## 1. Retoriken: nio återkommande drag

Varje drag citeras i original och paras med närmaste motsvarighet i våra egna artiklar.
Saknas motsvarighet står gapet utskrivet.

### Ankaret — första meningen kopplar bakåt

> "In the previous lesson, you saw the big picture: your browser connects to a server, sends a
> request, receives data back, and renders a page."

Notera att ankaret **återberättar** föregående lektion i en mening — det räcker inte att hänvisa.
Läsaren som hoppar in mitt i serien får kartan gratis.

Vår motsvarighet (`terraform-provider-resource-state.mdx`, "Var vi är"):

> "Förra delen svarade på *varför*: infrastrukturen ska bo i textfiler som går att granska och
> köra om, och Terraform gör det deklarativt. Nu öppnar vi filen."

**Läge före revideringen: 17/19.** Numera 19/19.

### Definitionen — en mening som fungerar fristående i en ordlista

> "A domain name is an easy-to-remember name for a website, app, or internet service."

> "An HTTP request is a message sent by the client to the server."

Mönstret är alltid `X är Y.` följt av `Den gör Z.` Definitionen kommer **före** all narrativ.
Den är kopierbar rakt in i en ordlista utan att förlora mening.

### Avgränsningen — vad det INTE är, direkt efter definitionen

> "A domain name is not the website itself."

> "HTTP is not the whole internet. It is one protocol that runs on top of the internet."

> "Client and server are roles. The same computer can act as either one."

Det starkaste enskilda draget i materialet. Avgränsningen kommer inom ett par meningar efter
definitionen, aldrig långt senare, och den formuleras alltid som en hel mening — inte som en
parentes.

**Läge före revideringen: 8/19.** Numera har varje artikel minst tre `X vs Y`-sektioner —
draget blev en egen sektionstyp, se grundmodellen Lager 1.

### Bilden — en analogi, alltid märkt med sin gräns

> "DNS is often compared to an address book. That is not the full story, but it is a useful
> first mental model."

> "The domain is like the sign on a building. Hosting is the building behind the sign."

> "Headers are like labels on a package."

Analogierna är fysiska och vardagliga (adressbok, skylt, paket) och **märks som approximationer**
när de är det. Läsaren får veta att modellen kommer att bytas ut senare, vilket gör att den kan
tas emot utan misstanke.

Vi gör redan det omvända, vilket är lika bra — att märka en analogi som *bokstavlig*:

> "Att döpa filen till 'anteckningsbok' är inte en förenkling — det är precis vad den är."

### Avlastningen — uttryckligt tillstånd att inte kunna

> "You do not need to memorize headers right now. The key idea is that headers are metadata."

> "You do not need that detail yet."

> "You do not need to memorize IXPs right now."

> "You do not need to understand the full DNS lookup yet."

Fyra gånger i tre lektioner. Draget gör två saker samtidigt: sänker ångesten och **pekar ut vad
som faktiskt ska fastna** i samma andetag. Det är alltid formulerat som ett par:
*du behöver inte X — poängen är Y.*

**Läge före revideringen: 1/19 — det största retoriska gapet.** Åtgärdat i samtliga.

### Dörren — namngiven framåtpekning

> "We will cover DNS records, nameservers, caching, and lookup flow in the DNS lesson."

> "HTTP has its own dedicated lesson later, so we are staying high-level here."

Djup som utelämnas *namnges och adresseras* — aldrig tyst bortvalt. Läsaren vet att hålet är
avsiktligt och var det fylls igen. Det är skillnaden mellan förenkling och slarv.

### Beviset — den minsta möjliga riktiga artefakten

> ```http
> GET / HTTP/1.1
> Host: roadmap.sh
> ```

Två rader. Inte en påhittad pseudokod, inte ett realistiskt browser-request på fyrtio rader —
det minsta som fortfarande är äkta. Samma disciplin på JSON-kroppen (tre rader) och på
statuskodslistan (en kolumn kod, en kolumn betydelse).

### Kontrasten — fel bredvid rätt

> "github.com — real main domain
> github.com.example.net — not the same domain
> secure-github-login.com — not the same domain"

Roadmap.sh använder kontrasten sparsamt. **Vi gör det bättre** med `Split leftTone="bad"` — se
"Utan state / Med state" i Terraform-delen. Behåll det.

### Ekot — sektionens kärnmening upprepad fristående

Varje avsnitt avslutas med en fristående rad som upprepar poängen, ofta ordagrant omformulerad:

> "HTTP is built around requests and responses. The client asks. The server answers."

> "A domain name gives users a stable name. The servers and IP addresses behind that name can
> change."

Ekot står typografiskt avskilt (i vår hub: `Callout type="kom-ihag"` eller en fetstilt
brödtextrad). Det är sista chansen att fånga läsaren som skummar.

---

## 2. Grammatik och ordval

| Drag | Observation i källan |
|---|---|
| Tempus | Presens genomgående. "The client sends", aldrig "the client will send". |
| Röst | Aktiv. Handlingar har alltid en utpekad utförare: *browsern*, *servern*, *du*. |
| Person | Andra person. "your browser", "you type", "your code returns a response". |
| Register | Inga sammandragningar ("do not", aldrig "don't"). Formellt men enkelt — inte kompisigt. |
| Stycken | 1–3 meningar. Vitrymd som pedagogiskt verktyg, inte som layoutslarv. |
| Hedging | "usually", "often", "for most web traffic", "at a beginner level". Överdriver aldrig. |
| Nedvärdering | Förekommer **aldrig**. Inget "simply", "just", "obviously", "trivially". |
| Uppräkning | Term → glosa i två kolumner, inte punktlista: `GET  read or fetch something`. |
| Parallellism | Motsatspar får identisk satsbyggnad: "The client is the side that asks. The server is the side that answers." |

Egna mätvärden för jämförelse (räknat på brödtext, kod och komponenter borträknade,
2026-08-04, 19 artiklar):

```
median meningslängd     13,5 ord
meningar per stycke      1,9
meningar över 30 ord     10 st totalt (0,5 per artikel)
```

Rytmen ligger alltså redan på källans nivå. **Skriv inte om språket — lägg till dragen.**

---

## 3. Röd tråd: seriens arkitektur

Lektion 1 lägger ut en numrerad resa i sju steg (URL → IP → anslutning → TLS → request →
paket → svar). Varje senare lektion är en **inzoomning på ett av stegen**. Lektion 2 är steg 5,
lektion 3 är steg 1–2.

Det ger tre saker på en gång:

1. Nybörjaren får hela kartan innan något detaljeras.
2. Varje artikel har en självklar plats i helheten — och en självklar rubrik för sitt ankare.
3. Serien kan växa utan att kännas påhängd; nya delar fyller kända hål i en känd karta.

Genomgående används **samma exempel** i alla tre lektionerna: `roadmap.sh`, `example.com`,
`104.21.80.1`. Ingen ny värld per artikel.

Vår motsvarighet är rollistan (Lisa, Maria, Johan, e-handelssystemet) som bär tråden mellan
serier. Den är starkare än roadmap.sh:s generiska "you", eftersom den ger en *anledning* till
att problemet uppstår.

---

## 4. Detaljnivå och holistik

Doseringen följer samma mall för varje nytt begrepp:

```
definition → vad det gör → varför det finns → ett konkret exempel
→ vad det INTE är → namngiven dörr till djupet
```

Zoomnivån **deklareras explicit** i inledningen:

> "This lesson gives you a high-level overview of how the internet works before we dive into
> the details."

Djup som skjuts upp namnges alltid: TCP nämns men förklaras inte, HTTP/3 nämns vid namn med
"works differently under the hood", TLS nämns utan handskakningen. Ingenting utelämnas tyst.

Två avslutande sektioner som vi saknar helt:

**Try It** — ett verkligt kommando, plus förklaring av den förvirrande utdata det ger:

> "Some lines may show `* * *` and that is normal. It usually means a router along the path
> chose not to respond."

Att föregripa förvirringen som övningen själv orsakar är det som gör den ofarlig att göra ensam.

**Common Beginner Confusions** — en kompakt svepning av förväxlingarna, samlade på ett ställe:

> "A domain is not the same as a URL. … `www` is not the internet. It is just a common subdomain."

**Läge före revideringen: 0/19 — det största strukturella gapet.** Numera 19/19, och regeln
att kommandona ska KÖRAS innan utdatan påstås finns i grundmodellen.

---

## 5. Doodlarnas formspråk

> Det här avsnittet beskriver **roadmap.sh:s** bilder, som analys. Våra egna regler — komponenten,
> arbetsgången och formvärdena — står i [`01-grundmodellen.md`](01-grundmodellen.md), Lager 5.
> Skiljer de sig åt gäller grundmodellen.

Sju bilder analyserade. De faller i sju funktioner — vilket i praktiken är en typologi att
välja ur, inte en stilövning.

| # | Bild | Funktion |
|---|---|---|
| D1 | Två laptops → en server, "Via IP Address" / "Via Domain Name" | Två vägar till samma mål |
| D2 | Skylt `example.com` → Server A (*Earlier*) / Server B (*Later*) | Indirektion och stabilitet över tid |
| D3 | URL uppdelad i rutor med pilar ner till `protocol`, `subdomain`, `path` … | Anatomi: namnge delarna i en sträng |
| D4 | Browser ⇄ Server med två märkta pilar | Tvåvägscykeln request/response |
| D5 | URL → Backend Router → `usersHandler` / `aboutHandler` / `rootHandler` | Fördelning: en ingång, flera utgångar |
| D6 | `2xx 3xx 4xx 5xx` som fyra fönster på rad | Taxonomi: kategorier bredvid varandra |
| D7 | Browser → DNS ("Where is roadmap.sh?" / svar), streckad linje → webbserver | Slå upp först, anslut sedan |

Formregler som är konsekventa i alla sju:

- **Svartvitt.** Ingen färg, ingen gradient, ingen skugga utom en klottrad markskugga.
- **En linjetjocklek**, handritad. Volym markeras med skraffering, aldrig med fyllning.
- **Handskriven monofont** för all text, samma storlek för etiketter.
- **Heldragen pil = faktiskt flöde. Streckad pil = härlett, logiskt eller "senare".** Konsekvent
  i D1 (streckad anslutning), D2 (streckade tidsalternativ) och D7 (streckad efter uppslaget).
- **Varje objekt får sin etikett under sig** — "Website Server", "Browser", "DNS Service".
- **Max fem objekt.** En idé per bild, utan undantag.
- **Fysiska metaforer**: laptop, servertorn, vägskylt, webbläsarfönster. Aldrig abstrakta lådor
  när ett föremål finns.
- **Bred bild**, ca 16:9 eller bredare, med generös luft.
- **Texten i bilden är substantiv plus högst en verbfras.** All förklaring ligger i brödtexten.

Viktigast: bilden och texten är **komplementära, inte redundanta**. D3 visar var i strängen
delarna sitter; texten förklarar vad de betyder. Ingen av dem duplicerar den andra.

---

## 6. Vad vi gör bättre — och ska behålla

Roadmap.sh saknar detta helt. Importera inte deras form på bekostnad av vår:

- **Namngivna personer** (Lisa/Maria/Johan) i stället för generiskt "you". Ger problemet ett motiv.
- **Retrieval practice** — `Check` med dolda svar. Roadmap.sh har ingen aktiv återhämtning alls.
- **Kontrastkomponenten** `Split leftTone="bad"` — fel och rätt bredvid varandra, inte i löptext.
- **Callout-taxonomin** (`varfor` / `sa-gor-du` / `fallgrop` / `kom-ihag`) som gör textens
  funktion typografiskt synlig.
- **Seriebryggan** i slutet som namnger nästa del.
- **Semantiska diagram** (`Flow` = leder till, `Stack` = vilar på) med definierad betydelse.
