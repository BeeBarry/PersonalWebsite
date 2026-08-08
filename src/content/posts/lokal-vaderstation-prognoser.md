---
title: 'En lokal väderstation för att jämföra prognoser'
description: 'Jag ville se hur SMHI och Open-Meteo stämmer där jag bor. Det blev ett litet system med Arduino, Raspberry Pi och en datamodell som behövde bli mer genomtänkt än jag först trodde.'
author: Barry
date: '05-08-2026'
domains: ['embedded', 'cloud']
read: '8 min'
tags: 'Arduino · Raspberry Pi · MQTT · InfluxDB'
icon: Activity
---

Jag ville svara på en ganska avgränsad fråga: när en väderprognos säger en viss temperatur
sex timmar framåt, hur nära ligger den då temperaturen där jag faktiskt bor?

Det går inte att svara på med en vanlig väderapp. Appen visar den senaste prognosen, men inte
vad prognosen sa innan vädret inträffade. Därför byggde jag en liten väderstation som samlar egna
mätningar, två prognoskällor och en närliggande officiell mätstation på samma ställe.

Projektet kör lokalt på en Raspberry Pi 5. Det är inte ett försök att ersätta SMHI. Det är ett sätt
att förstå vad prognoserna betyder på en specifik plats och vad som krävs för att kunna jämföra dem
på ett rimligt sätt.

## Utgångspunkten: min plats är inte en prognosruta

En prognos bygger på modeller och geografiska punkter. Min sensor sitter utomhus på en bestämd
plats, med sina egna förutsättningar. Skillnaden mellan de två är en del av det jag vill kunna se,
inte något som ska döljas.

Temperatur är huvudvärdet i projektet. Luftfuktighet är ett andra värde som följer med. Övriga
värden, som vind, molnighet och lufttryck, samlas främst för att senare kunna ge sammanhang åt
skillnaderna.

## Sensorn ute

Sensornoden är en Arduino UNO R4 WiFi med Modulino Thermo och Modulino Light. Thermo-modulen mäter
temperatur och luftfuktighet. Light-modulen ger ett lux-värde som jag främst använder för att se
skillnaden mellan skugga och dagsljus.

UNO R4 WiFi passade projektet eftersom den har Wi-Fi, en Qwiic-anslutning och en liten LED-matris
på kortet. Modulino Thermo är också gjord för att anslutas till UNO R4 WiFi eller andra
Qwiic-kompatibla kort. [Arduino beskriver både kortet](https://docs.arduino.cc/hardware/uno-r4-wifi)
och [Thermo-modulen](https://docs.arduino.cc/hardware/modulino-thermo) i sin egen dokumentation.

Arduino-koden läser av sensorn och skickar ett JSON-meddelande över MQTT varje minut. Den visar
också avrundad temperatur på LED-matrisen, så jag kan kontrollera att noden lever utan att öppna en
dashboard.

    Arduino + Modulino
            │ MQTT
            ▼
       Raspberry Pi 5

## Raspberry Pi som nav

Raspberry Pi 5 kör fem Docker-tjänster: Mosquitto, en Python-poller, InfluxDB 2, Grafana och
Telegraf. Mosquitto tar emot MQTT-meddelanden från Arduino-kortet. Pollern hämtar också prognoser
från SMHI och Open-Meteo samt observationer från SMHI:s närmaste relevanta mätstation.

    Arduino ──MQTT──▶ Mosquitto ──▶ poller ──▶ InfluxDB
    SMHI ─────HTTP──────────────────▶ poller
    Open-Meteo ─HTTP─────────────────▶ poller
                                              │
                                          Grafana

Grafana visar vädret, medan Telegraf samlar driftdata om Pi:n och containrarna. Det gör att en
lucka i väderdatan inte behöver bli ett mysterium: jag kan se om sensorn, pollern eller själva
maskinen slutade rapportera.

## Två prognoser och en referens

Pollern hämtar prognoser en gång i timmen från SMHI och Open-Meteo. SMHI:s prognosdata innehåller
bland annat temperatur, lufttryck och molnighet, med tydliga enheter i
[SMHI:s parameterdokumentation](https://opendata.smhi.se/metfcst/snow1gv1/parameters).
Open-Meteo lämnar timvärden och låter anropet ange exempelvis m/s för vind, vilket jag gör för att
inte blanda enheter från källorna. Det framgår av
[Open-Meteos API-dokumentation](https://open-meteo.com/en/docs).

Jag hämtar varje prognos för två platser: min sensorns koordinater och den officiella stationens
koordinater. Stationen ligger ungefär 9,5 kilometer bort. Om jag jämför stationens observation
med en prognos för min egen plats blandar jag in avståndet i felet. Genom att spara båda
koordinaterna kan jag skilja på den frågan och frågan om min egen plats avviker från stationen.

## Varför den senaste prognosen inte räcker

Det viktigaste jag lärde mig i projektet är att en prognos måste sparas innan utfallet är känt.
Annars går det inte att säga hur bra prognosen var sex, tolv eller fyrtioåtta timmar i förväg.

I första versionen skrev jag prognoser på deras giltiga tid. När en senare hämtning kom in med samma
tid ersatte den den tidigare. InfluxDB identifierar en datapunkt med measurement, taggar och
tidstämpel; ett nytt värde med samma kombination kan ersätta ett tidigare fältvärde. Det är
dokumenterat i [InfluxDB:s beskrivning av dubblettpunkter](https://docs.influxdata.com/influxdb/v2/reference/faq/).

Nu får varje prognos en tagg som heter lead_h. Den beskriver hela antalet timmar från hämtningens
timme till den tidpunkt prognosen gäller. Samma temperatur för samma klockslag kan därför finnas
kvar som flera prognosversioner.

    Hämtad 08:20 → prognos för 14:00 → lead_h = 6
    Hämtad 12:20 → prognos för 14:00 → lead_h = 2

Det är den här historiken som senare gör det möjligt att fråga: vilka fel gör en källa långt i
förväg, och vilka fel finns fortfarande precis innan timmen inträffar?

## Två serier med olika syfte

Jag sparar en prognosserie för analys och en för dashboarden. Analysserien innehåller alla
prognosversioner och skrivs inte över. Dashboardserien innehåller bara den senaste prognosen och
får skrivas över när en ny kommer in.

Den uppdelningen blev viktig. En graf behöver det senaste svaret. En analys behöver veta vad
systemet faktiskt visste vid en viss tidpunkt. Det är två olika behov och därför två olika serier.

## Rådata får vara rådata

Sensorn sparar temperatur, luftfuktighet och ljus med den tid då Raspberry Pi tar emot meddelandet.
Arduino-kortet har ingen egen klocka som synkroniseras i projektet, så mottagningstiden är den
ärligaste tid jag har.

Jag ändrar inte sensordata vid insamlingen. I stället flaggar jag misstänkta värden senare, när jag
analyserar dem. Exempel är temperaturer utanför rimligt intervall, orimligt stora förändringar per
minut, en sensor som verkar ha hängt sig och värden som kan vara uppvärmda av direkt sol.

Det innebär att jag kan förbättra reglerna och köra dem på historiken igen utan att först ha kastat
bort mätvärden. Det gör också att jag kan se varför ett värde inte ska användas, i stället för att
bara få en tyst lucka i datan.

## Ett praktiskt problem: ljus och placering

Lux-värdet från Modulino Light är inte ett mått på solinstrålning. Med den nuvarande
biblioteksinställningen når sensorn ett tak ungefär vid 11–12 klx, vilket är långt under direkt
solljus. Jag använder därför värdet som en relativ signal om ljus och skugga, inte som ett exakt
fysiskt mått.

Sensorn har inte heller något strålningsskydd ännu. Direkt sol kan därför ge en varm
temperaturavläsning. Det är en begränsning i nuvarande upplägg, och en anledning till att
rådatan behöver behållas tillsammans med tydliga kvalitetsflaggor.

## Det som kör i dag

Systemet är driftsatt på hårdvaran och samlar data utomhus. Varje timme hämtas nya prognoser och
stationsobservationer. Grafana visar aktuell prognos bredvid lokala mätningar, och en separat
dashboard visar hur Raspberry Pi och containrarna mår.

MQTT-brokern är avsiktligt bara ett lokalt experiment på nätverket. Den ska inte exponeras publikt
innan autentisering och behörighetsregler finns på plats.

## Nästa steg är att först samla tillräckligt bra data

Jag vill senare undersöka om det går att korrigera en prognos för just den här platsen. Det är inte
nästa kodändring. Först behöver stationen klara en period med stabil datainsamling: minst 14 dagar
där lokala mätningar, prognoshämtningar och stationens observationer håller den kvalitet jag satt
upp som gräns.

När den gränsen är passerad är nästa sak att exportera kvalitetskontrollerade par till en molnmiljö
och jämföra en enkel modell med den oförändrade prognosen. Fram till dess är projektets viktigaste
uppgift mindre spektakulär: att fortsätta samla data som går att lita på.
