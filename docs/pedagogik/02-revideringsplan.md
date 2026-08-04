# Revideringsplan — hela Learn Hub till grundmodellen

Alla 19 artiklar ska hålla samma nivå som referensartiklarna. Standarden är
[`01-grundmodellen.md`](01-grundmodellen.md); facit är de fyra klara artiklarna.

**Klart (4):** `git-vad-git-sparar` · `git-branch-merge-konflikter` · `intro-till-kubernetes` ·
`kubernetes-trafik-in-i-klustret`

**Kvar (15).** Ordningen nedan är arbetsordningen — hela serier i taget, så den röda tråden och
bryggorna kan justeras i ett svep.

## Arbetssätt per artikel

1. Läs föregående och följande del i serien först. Bryggan i slutet ska ställa den fråga nästa del
   faktiskt besvarar.
2. Behåll allt sakinnehåll som redan finns. Revideringen är en **omstrukturering**, inte en
   omskrivning av fakta — de befintliga fallgroparna, `Split`-kontrasterna och `Check`-frågorna är
   redan bra och ska följa med.
3. Bryt ner till 15–22 sektioner, ett begrepp per rubrik, i beroendeordning.
4. Lägg till: vs-sektioner, rollrelevans, förväxlingar, Prova själv, snabbsammanfattning, doodle-briefer.
5. Behåll `kom-ihag` och `Check`, utöka `Check` till 5–6 frågor.
6. Verifiera: `pnpm build`, `pnpm astro check`, kodrader ≤55 tecken, alla obligatoriska sektioner.

**Efter varje serie:** kontrollera att inget begrepp används före sin definition *över artikelgränser*,
och att bryggorna hänger ihop.

---

# Docker (4 artiklar)

Tas först. Serien är hubbens ingång och den enda med illustrationer som ska bytas ut.

### 1.0 Introduktion till Docker · `intro-to-docker.mdx`
**Nu:** 1448 ord · 5 h2 · saknar *Var vi är* helt · 4 klarblå `ZoomableImage`

**Målstruktur:** Var vi är · Vad Docker är · Vad en container är · Container vs virtuell maskin ·
Vad en image är · Image vs container · Lager · Vad ett registry är · Registry, repository och tagg ·
Vad Docker Compose är · Docker vs Docker Compose · Vad det här betyder i ditt arbete · Vanliga
nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** container vs VM (den viktigaste i hela hubben) · image vs container ·
Docker vs Docker Compose

**Prova själv:** `docker run hello-world` → `docker ps` (tomt!) → `docker ps -a` (containern finns
kvar, stoppad) → `docker images`. *Förvirringen att föregripa:* `docker ps` visar bara körande
containrar, och hello-world avslutas direkt — det ser ut som att ingenting hände.

**Rollrelevans:** du bygger images och kör Compose lokalt varje vecka; registry-drift och
orkestrering är någon annans jobb tills du går mot drift.

**Doodles:** ersätt alla fyra blå. (1) VM-stapel bredvid container-stapel, samma bredd, olika höjd
på "OS"-lagret. (2) En image-låda med tre pilar ut till tre identiska containrar. (3) En hylla märkt
"registry" med lådor märkta `:v2`, `:v3`, `:latest`. (4) En fil märkt `compose.yaml` med tre pilar
till tre lådor i en ring.

**Att se upp med:** artikeln saknar *Var vi är* — den ska skrivas ny och koppla till hubbens
ingång, inte till en tidigare del.

### 1.1 Skriv din första Dockerfile · `dockerfile-och-images.mdx`
**Nu:** 1321 ord · 8 h2

**Målstruktur:** Var vi är · Vad en Dockerfile är · Dockerfile vs image vs container · `FROM` ·
`WORKDIR` och `COPY` · `RUN` vs `CMD` · Varje instruktion blir ett lager · Lagercachen · Varför
ordningen spelar roll · `.dockerignore` · `latest` är inget löfte · Vad det här betyder i ditt
arbete · Vanliga nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning ·
Nästa del

**vs-sektioner:** Dockerfile vs image vs container (trestegs) · `RUN` vs `CMD` (klassikern) ·
`COPY` vs `ADD`

**Prova själv:** `docker build -t test .` → `docker history test` (se lagren) → ändra sista raden i
Dockerfile → bygg igen och räkna `CACHED`-raderna. *Förvirringen:* `CACHED` betyder inte att bygget
misslyckades, och flyttar du `COPY . .` högre upp försvinner cachen för allt under.

**Rollrelevans:** du skriver Dockerfiles och läser byggloggar; multi-stage builds och
image-signering kan vänta.

**Doodle:** recept → maträtt (Dockerfile → image → container som tre steg). Lagerstapel med
streckad linje där cachen bryts.

### 1.2 Flera containrar som hittar varandra · `docker-compose-natverk.mdx`
**Nu:** 1259 ord · 7 h2

**Målstruktur:** Var vi är · Vad Docker Compose är · Compose vs flera `docker run` · Filen ·
Vad en service är · Tjänstnamnet är ett DNS-namn · Nätverket Compose skapar automatiskt ·
`ports` vs `expose` · Värdens port vs containerns port · `localhost` betyder olika saker ·
`depends_on` betyder inte "redo" · Vad det här betyder i ditt arbete · Vanliga nybörjarförväxlingar ·
Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** Compose vs flera `docker run` · `ports` vs `expose` · värdens `localhost` vs
containerns

**Prova själv:** `docker compose up -d` → `docker compose ps` → `docker network ls` →
`docker compose exec frontend getent hosts api` (namnet slår upp!). *Förvirringen:* `localhost`
inuti en container är containern själv, inte din dator — det är den vanligaste
anslutningsmissen i hela Docker.

**Rollrelevans:** Compose är din lokala utvecklingsmiljö dagligen; i drift ersätts den av
Kubernetes, men filen du skriver här är den du översätter därifrån.

**Doodle:** två containrar inuti en ring märkt "compose-nätverk", pil mellan dem märkt `api` — och
en pil utifrån som studsar på ringen om ingen `ports` finns.

### 1.3 Volymer — data som överlever containern · `docker-volymer.mdx`
**Nu:** 1189 ord · 6 h2

**Målstruktur:** Var vi är · Var en container skriver · Varför data försvinner · Vad en volym är ·
Named volume vs bind mount · Volym vs image-lager · Sökvägssyntaxen `värd:container` · `down` vs
`down -v` · Databaser i containrar · Vad det här betyder i ditt arbete · Vanliga
nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** named volume vs bind mount · volym vs image-lager · `down` vs `down -v`

**Prova själv:** skriv en fil i en container → `docker rm` containern → starta en ny mot samma volym
→ filen finns kvar. Sedan `docker volume ls` och `docker volume inspect`. *Förvirringen:* vissa
images (t.ex. `postgres`) skapar anonyma volymer själva, så `docker volume ls` visar poster med
hash-namn som du inte skapat.

**Rollrelevans:** du monterar källkod som bind mount i utveckling varje dag; volymbackuper och
lagringsklasser i drift kan vänta.

**Doodle:** container som en låda med streckad botten, volymen som en solid låda under som står kvar
när containern lyfts bort.

---

# Nätverk (2 artiklar)

Prioriteras näst — den är hubbens motsvarighet till roadmap.sh:s lektion 1, och den enda där den
**numrerade resan** är rätt struktur.

### 1.0 Från adressfältet till servern · `natverk-fran-adressfaltet-till-servern.mdx`
**Nu:** 1425 ord · 8 h2

**Målstruktur:** Var vi är · Vad som händer när du trycker enter (numrerad resa, **steg 1–6 som
egna h2**) · URL:ens delar · Vad DNS är · Vad en IP-adress är · IPv4 vs IPv6 · Vad en port är ·
Port vs IP-adress · `localhost` och 127.0.0.1 · Vad TCP gör · HTTP vs HTTPS · Refused vs timeout ·
Vad det här betyder i ditt arbete · Vanliga nybörjarförväxlingar · Prova själv · kom-ihåg · Check ·
Snabb sammanfattning · Nästa del

**vs-sektioner:** IPv4 vs IPv6 · port vs IP-adress · refused vs timeout (finns redan, lyft till
egen vs-form) · HTTP vs HTTPS

**Prova själv:** `dig +short github.com` (flera adresser — normalt) → `curl -I https://github.com` →
`nc -vz github.com 443` mot `nc -vz github.com 444`. *Förvirringen:* `dig` ger olika svar vid olika
tillfällen och det är inte ett fel; `nc` mot stängd port hänger tills timeout i stället för att svara
direkt — vilket är precis skillnaden artikeln lär ut.

**Rollrelevans:** du läser felmeddelanden och skiljer "fel adress" från "fel port" från "brandvägg"
varje vecka; paketnivå och routingprotokoll rör dig inte.

**Doodles:** (1) resan i sex steg som en vågrät kedja. (2) `https://shop.example.se:443/produkter?sida=2`
uppdelad i rutor med pilar ner till etiketter — anatomiformen.

**Att se upp med:** använd den numrerade resan som seriens karta, och låt 1.1 uttryckligen zooma in
på ett av stegen.

### 1.1 Metoder, statuskoder och headers · `natverk-metoder-statuskoder-headers.mdx`
**Nu:** 1576 ord · 8 h2

**Målstruktur:** Var vi är · Ett anrop är text · Request-raden · Vad en metod är · GET vs POST ·
Säkra och idempotenta metoder · PUT vs PATCH · Vad en statuskod är · Första siffran räcker ·
401 vs 403 · 301 vs 302 · Vad en header är · Request- vs response-headers · `Content-Type` ·
Vad kroppen är · HTTP är stateless · Vad det här betyder i ditt arbete · Vanliga
nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** rikast i hubben — GET vs POST · PUT vs PATCH · 401 vs 403 · 301 vs 302 ·
request- vs response-headers

**Prova själv:** `curl -v https://api.github.com` (se hela anropet som text) → DevTools Network-flik
→ klicka ett anrop och hitta metod, status, headers. *Förvirringen:* `curl -v` blandar rader som
börjar med `>` (skickat) och `<` (mottaget); 304 dyker upp vid omladdning och betyder inte fel.

**Rollrelevans:** statuskodens första siffra avgör om du felsöker din kod eller någon annans —
det är det du gör dagligen; HTTP/2 och HTTP/3 kan vänta.

**Doodles:** (1) `2xx 3xx 4xx 5xx` som fyra fönster på rad — taxonomiformen. (2) browser ⇄ server
med två märkta pilar — tvåvägscykeln.

---

# API (2 artiklar)

### 1.0 Vad ett API är och vem som anropar vem · `api-vad-ett-api-ar.mdx`
**Nu:** 1305 ord · 8 h2

**Målstruktur:** Var vi är · Vad ett API är · API vs webbsida · Klient och server · Vad en endpoint
är · Vad en resurs är · Resurs vs databasrad · Request och response · Vad JSON är · Varför inte
prata direkt med databasen · Internt vs publikt API · Vad det här betyder i ditt arbete · Vanliga
nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** API vs webbsida · resurs vs databasrad (finns som "Representationen är inte raden"
— gör om till vs-form) · internt vs publikt

**Prova själv:** `curl -s https://api.github.com/users/BeeBarry | head -20`. *Förvirringen:* utan
token får du 403 efter ett sextiotal anrop per timme, och felet ser ut som ett behörighetsfel fast
det är en hastighetsgräns.

**Rollrelevans:** du konsumerar API:er dagligen och bygger dem snart; autentiseringsflöden och
rate limiting tas senare.

**Doodle:** två klienter (webb + mobil) → en API-låda → en databas. Streckad pil direkt från klient
till databas, överkryssad.

### 1.1 Designa ett REST-API som håller · `api-designa-rest-som-haller.mdx`
**Nu:** 1196 ord · 6 h2 — hubbens minsta, behöver mest utbyggnad

**Målstruktur:** Var vi är · Vad REST är · REST vs "HTTP-API" · Resurser, inte verb · Vad URL:en
ska beskriva · Metoden bär verbet · Fem operationer på en resurs · Vad en samling är ·
Sökväg vs query-parameter · Statuskoder i API-svar · 201 och `Location` · Vad idempotens är ·
POST vs PUT vs PATCH · Felsvar som går att göra något åt · Versionering · Vad det här betyder i ditt
arbete · Vanliga nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning ·
Nästa del

**vs-sektioner:** REST vs HTTP-API · sökväg vs query-parameter · POST vs PUT vs PATCH

**Prova själv:** `curl -i https://api.github.com/repos/withastro/astro` — läs statusrad, `ETag`,
`Content-Type`. Sedan samma anrop med `-H "If-None-Match: <etag>"` → `304 Not Modified`.
*Förvirringen:* 304 har tom kropp och ser ut som ett trasigt svar.

**Rollrelevans:** du designar endpoints i varje ny feature; HATEOAS och OpenAPI-generering kan vänta.

**Doodle:** en resurs-URL med fem pilar ut, en per metod, var och en märkt med vad den gör.

---

# SQL (2 artiklar)

### 1.0 Tabeller, nycklar och relationer · `sql-tabeller-nycklar-relationer.mdx`
**Nu:** 1508 ord · 8 h2

**Målstruktur:** Var vi är · Vad en relationsdatabas är · Tabell, rad och kolumn · Vad en datatyp är ·
Datatypen är ett löfte · Vad en primärnyckel är · Primärnyckel vs unik kolumn · Vad en främmande
nyckel är · En till många · Många till många · Kopplingstabellen · Vad NULL betyder · NULL vs tom
sträng vs 0 · Vad det här betyder i ditt arbete · Vanliga nybörjarförväxlingar · Prova själv ·
kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** primärnyckel vs unik kolumn · NULL vs tom sträng vs 0 (viktigast) ·
en-till-många vs många-till-många

**Prova själv:** `sqlite3 :memory:` — finns förinstallerat på macOS, kräver ingen uppsättning.
`CREATE TABLE`, två `INSERT`, en `SELECT`, sedan en `INSERT` som bryter mot en främmande nyckel.
*Förvirringen:* SQLite kontrollerar inte främmande nycklar förrän du kört
`PRAGMA foreign_keys = ON;` — utan den raden ser det ut som att regeln inte gäller.

**Rollrelevans:** du läser och skriver scheman i varje projekt; normalformer och partitionering kan
vänta — namnge "normalisering" och skjut upp den.

**Doodle:** två tabeller som rutnät med en pil från `order.kund_id` till `kund.id`.

### 1.1 JOIN — och varför frågor blir långsamma · `sql-join-och-prestanda.mdx`
**Nu:** 1511 ord · 7 h2

**Målstruktur:** Var vi är · Vad en JOIN är · Vad `ON` gör · INNER vs LEFT · Vad LEFT JOIN gör med
det som saknas · Vad ett index är · Index vs primärnyckel · Vad en full table scan är · Vad EXPLAIN
visar · Varför frågan blev långsam · Vad N+1 är · N+1 vs en JOIN · När ett index inte hjälper ·
Priset för ett index · Vad det här betyder i ditt arbete · Vanliga nybörjarförväxlingar · Prova
själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** INNER vs LEFT · index vs primärnyckel · N+1 vs JOIN

**Prova själv:** i `sqlite3 :memory:` — skapa två tabeller, kör `EXPLAIN QUERY PLAN SELECT …`, se
`SCAN`, lägg till index, kör igen, se `SEARCH … USING INDEX`. *Förvirringen:* på små tabeller väljer
optimeraren ibland scan ändå, eftersom det är snabbare — vilket ser ut som att indexet inte fungerar.

**Rollrelevans:** N+1 är den vanligaste prestandabuggen i webbappar och du kommer att orsaka den;
query planners och partitionering kan vänta.

**Doodle:** två radlistor som sätts ihop till en bred rad, med de rader som saknar motpart markerade
som `NULL` i LEFT-fallet.

---

# Terraform (2 artiklar)

### 1.0 Vad Infrastructure as Code löser · `vad-infrastructure-as-code-loser.mdx`
**Nu:** 1320 ord · 8 h2

**Målstruktur:** Var vi är · Vad Infrastructure as Code är · IaC vs att klicka i portalen ·
Vad deklarativt betyder · Deklarativt vs imperativt · Vad Terraform är · Terraform vs Ansible ·
Terraform vs Bicep och ARM · Vad drift är · Fallgropen: att klicka efter att man börjat · Varför
inte bara ett bash-skript · Vem gör vad, och när · Vad det här betyder i ditt arbete · Vanliga
nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** IaC vs portalen · deklarativt vs imperativt · Terraform vs Ansible ·
Terraform vs Bicep

**Prova själv:** `terraform version` → skriv en `main.tf` med bara ett `terraform`-block →
`terraform fmt` (se hur den rättar indenteringen) → `terraform validate`. *Förvirringen:*
`validate` kräver att `terraform init` körts först, annars klagar den på providers som inte hämtats
— vilket ser ut som ett syntaxfel.

**Rollrelevans:** du läser och granskar `.tf`-filer i merge requests långt innan du äger dem;
moduldesign och state-migrering kan vänta.

**Doodle:** samma miljö tre gånger (test/stage/prod) som utgår från en fil — mot tre olika lådor
som klickats fram för hand och glidit isär.

### 1.1 Provider, resource och state · `terraform-provider-resource-state.mdx`
**Nu:** 1527 ord · 10 h2 — närmast målet redan

**Målstruktur:** Var vi är · Vad HCL är · Vad ett block är · `terraform`-blocket · Varför versionen
ska stå där · Vad en provider är · `provider`-blocket · Vad en resource är · Resurstyp vs
resursnamn vs `name` · Vad en referens är · Beroendegrafen · `terraform init` · `terraform plan` ·
`terraform apply` · `plan` vs `apply` · Vad state är · State vs konfigurationsfil · Var state ska bo ·
State vs låsfilen · Vad det här betyder i ditt arbete · Vanliga nybörjarförväxlingar · Prova själv ·
kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** resurstyp vs resursnamn vs `name` (finns i löptext — lyft till egen rubrik) ·
`plan` vs `apply` · state vs låsfil · state vs konfigurationsfil

**Prova själv:** `terraform init` i en mapp med filen från artikeln → titta i `.terraform/` och i
`.terraform.lock.hcl` → `terraform plan`. *Förvirringen:* `plan` misslyckas med
*could not acquire access token* om du inte är inloggad mot Azure — det är inte fel på filen, och
det bevisar att `plan` faktiskt frågar leverantören.

**Rollrelevans:** du läser planer i merge requests och skriver enkla resurser; remote backends och
moduler kommer när du äger en miljö.

**Doodle:** tre lådor — `main.tf`, `terraform.tfstate`, "Azure" — med pilar som visar att plan
jämför alla tre.

**Att se upp med:** artikeln har redan bra vs-material inbakat i löptext. Revideringen är mest att
bryta ut rubriker, lägga till Prova själv, rollrelevans och förväxlingar.

---

# Linux (2 artiklar)

### 1.0 Filsystemet och var du befinner dig · `linux-filsystemet.mdx`
**Nu:** 1229 ord · 7 h2

**Målstruktur:** Var vi är · Vad ett skal är · Skal vs terminal · Vad prompten säger dig ·
Vad filsystemsträdet är · Vad roten är · Roten vs hemkatalogen · Vad en sökväg är · Absolut vs
relativ sökväg · `.` och `..` · De fyra kommandona · Vad dolda filer är · Katalogerna som betyder
något · Vad det här betyder i ditt arbete · Vanliga nybörjarförväxlingar · Prova själv · kom-ihåg ·
Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** skal vs terminal (verklig och underskattad) · roten `/` vs hemmet `~` ·
absolut vs relativ sökväg

**Prova själv:** `pwd` → `ls -la` → `cd ..` → `cd -` → `cd` utan argument. *Förvirringen:* `cd` utan
argument tar dig hem, inte upp; och `ls` visar inget för dolda filer utan `-a`, vilket får en
till synes tom katalog att se trasig ut.

**Rollrelevans:** varje container du felsöker och varje server du loggar in på möter dig med en
prompt; skalskript och `find`-flaggor kan vänta.

**Doodle:** trädet från `/` med tre grenar, `~` inringad — anatomiformen tillämpad på en sökväg:
`/home/lisa/projekt/app.js` uppdelad i rutor.

### 1.1 Rättigheter, processer och rör · `linux-rattigheter-processer-ror.mdx`
**Nu:** 1489 ord · 7 h2

**Målstruktur:** Var vi är · Vad rättigheter är · `-rwxr-xr--` tecken för tecken · Användare, grupp
och övriga · Vad exekveringsrätt betyder · Varför `./` behövs · Vad PATH är · Vad en process är ·
Process vs program · Vad ett PID är · Vad stdout och stderr är · stdout vs stderr · Vad ett rör är ·
Att spara utdata i en fil · `>` vs `>>` · Vad `sudo` gör · Vad det här betyder i ditt arbete ·
Vanliga nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb sammanfattning · Nästa del

**vs-sektioner:** process vs program · stdout vs stderr (den som förklarar varför `|` ibland "tappar"
felmeddelanden) · `>` vs `>>`

**Prova själv:** `ls -l /bin/ls` → `echo $PATH | tr ':' '\n'` → `ps aux | head -5` →
`ls /finns-inte 2>/dev/null` (felet försvinner) mot `ls /finns-inte | grep x` (felet syns ändå).
*Förvirringen:* just det sista — ett rör tar bara stdout, så felmeddelandet går förbi röret och
hamnar på skärmen ändå.

**Rollrelevans:** `Permission denied` i en container och `command not found` i en pipeline är två av
de vanligaste felen du kommer att möta; `chmod`-oktaltal och `systemd` kan vänta.

**Doodle:** två rör från en låda — ett heldraget märkt `stdout` in i nästa kommando, ett streckat
märkt `stderr` som går rakt ut till skärmen.

---

# Kubernetes (1 artikel kvar)

### 1.2 Konfiguration, hemligheter och hälsokontroller · `kubernetes-config-secrets-probes.mdx`
**Nu:** 1411 ord · 6 h2

**Målstruktur:** Var vi är · Varför konfiguration inte hör hemma i imagen · Vad en ConfigMap är ·
Vad en Secret är · ConfigMap vs Secret · En Secret är inte krypterad · Miljövariabel vs monterad fil ·
Vad som händer när värdet ändras · Vad en probe är · Vad liveness gör · Vad readiness gör ·
Liveness vs readiness · Vad startup-proben löser · Fallgropen: fel probe på fel ställe · Vad det här
betyder i ditt arbete · Vanliga nybörjarförväxlingar · Prova själv · kom-ihåg · Check · Snabb
sammanfattning · Nästa del

**vs-sektioner:** ConfigMap vs Secret · miljövariabel vs monterad fil · liveness vs readiness
(den enskilt viktigaste i artikeln)

**Prova själv:** `kubectl create secret generic test --from-literal=pw=hemligt --dry-run=client -o yaml`
→ se värdet i `data:` → `echo aGVtbGlndA== | base64 -d`. *Förvirringen:* base64 är kodning, inte
kryptering — vem som helst med läsrätt på Secreten kan avkoda den, vilket är hela poängen med
avgränsningen.

**Rollrelevans:** du sätter miljövariabler och skriver probes i varje manifest; extern
hemlighetshantering (Key Vault, sealed secrets) och RBAC kommer med driftansvar.

**Doodle:** samma image-låda tre gånger märkta test/stage/prod, med olika ConfigMap-lappar
inhängda — och en probe som en klocka med pil in i podden.

---

## Kvalitetsgrind före avslut

Kör detta över hela hubben när revideringen är klar, inte per artikel:

- 19/19 har alla obligatoriska sektioner
- 19/19 har 15–22 h2
- 19/19 har minst tre vs-sektioner
- 0 kodrader över 55 tecken
- 0 nedvärderande ord (`helt enkelt`, `bara`, `självklart`, `trivialt`)
- 0 meningar över 30 ord
- Inget begrepp används före sin definition, inom eller mellan artiklar i samma serie
- Varje *Nästa del* ställer den fråga nästa artikel faktiskt besvarar
- `pnpm build` + `pnpm astro check` rena, mobil och desktop kontrollerade
