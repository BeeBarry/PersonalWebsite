---
title: 'CoAP och MQTT — varför uppkopplade enheter inte kan prata HTTP'
description: 'Jag kom från webben, där HTTP är luften man andas. I IoT-världen är samma protokoll ofta ett dåligt val — och skälen har mindre med teknik att göra än med batteri, radiotid och vem som ringer vem.'
author: Barry
date: '26-05-2026'
domains: ['embedded']
read: '7 min'
tags: 'IoT · MQTT · CoAP'
icon: Activity
# Dold i prod tills texten är reviderad. Syns i dev och i preview-miljön.
draft: true
---

När jag började titta på uppkopplade enheter var min första reflex den mest webbutvecklarmässiga
tänkbara: enheten kan väl bara göra ett `POST` till ett API? Den har ju nät. Det tog ett tag innan
jag förstod varför nästan ingen gör så, och svaret handlar förvånansvärt lite om protokollteori.

## Kostnaden ligger i radion, inte i koden

En sensor som ska hålla flera år på ett batteri kan inte ha nätverket påslaget. Den vaknar, skickar
något, och somnar. Allt som sker under vakenperioden kostar ström — och det dyraste är att hålla
radion igång, inte att räkna.

Det är där HTTP blir obekvämt. Ett anrop innebär TCP-handskakning, sedan TLS-handskakning, sedan
headers i klartext där `Content-Type` och `User-Agent` ensamma kan vara större än själva mätvärdet.
För en temperaturavläsning på fyra byte är det en absurd overhead. Lägg till att enheten kanske
sitter på ett mobilnät där man betalar per megabyte, gånger tusen enheter, gånger varje kvart.

Det andra problemet är riktningen. HTTP är byggt för att klienten frågar och servern svarar. Men en
sensor bakom NAT går inte att ringa upp — du kan inte skicka den en fråga, den måste höra av sig.
Och vill du styra något, en ventil eller en lampa, måste kommandot ta sig *ut* till enheten. Med
HTTP blir svaret ofta att enheten pollar med jämna mellanrum, vilket betyder att radion är igång
hela tiden för att nästan varje gång få veta att ingenting hänt.

## MQTT: alla pratar med en broker

MQTT löser riktningsproblemet genom att vända på det. Ingen enhet ringer någon annan. Alla ansluter
till en broker och håller kopplingen öppen. Sedan *publicerar* man på ämnen och *prenumererar* på
ämnen:

```
hem/kok/temperatur      →  21.4
hem/kok/ventil/set      →  open
```

Enheten prenumererar på `hem/kok/ventil/set` och får kommandot i samma öppna koppling som den
skickade mätvärdet i. Ingen polling, ingen inkommande port, ingen NAT-akrobatik. Och protokollet är
snålt: det fasta headerfältet i ett MQTT-paket är två byte.

Två saker i MQTT förstod jag först när jag saknade dem.

**Retained messages.** Brokern kan spara det senast publicerade värdet på ett ämne och ge det direkt
till nya prenumeranter. Utan det får en dashboard som just startat tomma rutor tills varje sensor
råkar vakna nästa gång — vilket kan vara en kvart. Med det får den ett värde omedelbart, om än ett
lite gammalt.

**Last Will and Testament.** Du registrerar redan vid anslutning ett meddelande som brokern ska
publicera åt dig om du försvinner utan att säga hej då. Det är den enda rimliga vägen till ”offline”
i ett system där enheter tystnar utan förvarning. Jag byggde först ett system som antog att tystnad
betydde ”inget nytt att rapportera” — det såg utmärkt ut ända tills något faktiskt gick sönder, för
en död enhet och en nöjd enhet ser exakt likadana ut.

Sedan finns QoS-nivåerna: 0 (skicka och hoppas), 1 (minst en gång, kan bli dubbletter) och 2 (exakt
en gång). Min instinkt var att 2 är ”bäst”. Men 2 kostar en fyrvägs-handskakning per meddelande, och
för ett temperaturvärde som ändå ersätts om trettio sekunder är det ström man betalar för ingenting.
QoS 1 plus ett idempotent mottagande — alltså att en dubblett inte gör skada — räcker nästan alltid.
QoS är en avvägning mot batteri, inte en kvalitetsinställning.

## CoAP: HTTP:s idéer, utan TCP

CoAP går en annan väg. I stället för att byta ut request/response-modellen behåller det den — `GET`,
`POST`, `PUT`, `DELETE` mot resurser med URI:er — men kör över UDP och kodar allt binärt. Headern är
fyra byte. En sensor kan alltså exponera `coap://enhet/sensors/temp` och kännas nästan som ett
REST-API, fast paketet får plats i en enda radioram.

Eftersom UDP inte garanterar leverans bygger CoAP in det själv, valfritt: *confirmable*-meddelanden
kvitteras, *non-confirmable* gör det inte. Du väljer per meddelande om det är värt en bekräftelse.
Och `Observe` låter en klient registrera intresse för en resurs och få uppdateringar när den ändras —
publish/subscribe-beteende utan att någon broker behöver stå i mitten. Säkerheten ligger i DTLS,
alltså TLS anpassat för UDP.

## Hur jag väljer nu

Frågan jag ställer först är inte ”vilket protokoll är bäst” utan **vem behöver prata med vem, och vem
sover?** Många enheter som skickar till ett gemensamt system, där en central instans också ska kunna
styra dem: MQTT, brokern är hela poängen. Enskilda enheter i ett begränsat nät som ska svara på
förfrågningar, där man vill slippa en broker som kan gå ner: CoAP.

Det som förändrade mitt sätt att tänka var att sluta se protokollet som ett transportval och börja se
det som ett *energibudgetval*. Nästa gång du designar något uppkopplat, räkna vakenperioder i stället
för anrop per sekund. Talet blir mycket mindre, och det bestämmer nästan allt annat.
