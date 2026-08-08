---
title: 'Devdash: ett fysiskt hjälpmedel för fokus vid skrivbordet'
description: 'Jag ville göra två saker utan att öppna fler fönster: styra arbetsljuset och se att en fokussession faktiskt pågår. Det blev en Arduino UNO R4 WiFi, en ratt och en liten LED-matris.'
author: Barry
date: '05-08-2026'
domains: ['embedded', 'cloud']
read: '7 min'
tags: 'Arduino · Pomodoro · Elgato · GitHub Actions'
icon: Activity
---

Devdash är ett litet projekt på skrivbordet. Idén är inte att ersätta datorns dashboardar, utan att
flytta ut några få saker som är praktiska att se eller ändra utan att byta fönster.

I den version som kör nu gör den två saker: den styr en Elgato Key Light med en fysisk ratt och den
håller en Pomodoro-timer på Arduino-kortets LED-matris. Nästa del är att lägga till en enkel vy för
GitHub Actions, så att en pågående eller felande pipeline kan synas utan att GitHub-fliken behöver
vara öppen.

## Varför en fysisk dashboard

Jag märker lätt när ett verktyg på skärmen drar till sig mer uppmärksamhet än uppgiften jag
egentligen ska göra. Att kontrollera ljuset eller en timer är små handlingar, men de leder ofta
till att jag öppnar fler flikar och börjar titta på annat.

Devdash begränsar sig därför medvetet. En ratt gör en sak i taget. LED-matrisen kan inte visa
mycket information, men den kan visa ett tillstånd utan att kräva att jag läser en hel sida.

## Kortet och ratten

Hårdvaran är en Arduino UNO R4 WiFi med en Modulino Knob. UNO-kortet har Wi-Fi, en Qwiic-anslutning
och en inbyggd LED-matris med 12 gånger 8 dioder. Det räcker för både nätverksanrop och en liten
visuell återkoppling. [Arduino beskriver UNO R4 WiFi](https://docs.arduino.cc/hardware/uno-r4-wifi)
som ett kort med just LED-matris och Qwiic, och [Modulino Knob](https://docs.arduino.cc/hardware/modulino-knob)
är gjord för samma typ av fysisk inmatning.

En kort tryckning byter vy. Att vrida på ratten ändrar det som är relevant i vyn. Ett långt tryck
är vyns handling, till exempel att starta en timer eller tända och släcka lampan.

    kort tryck  → byt vy
    vrid         → ändra ett värde
    långt tryck  → utför handlingen

Det är en liten interaktion, men den gjorde att koden behövde hålla reda på korta och långa tryck
och på hur mycket ratten faktiskt har vridits sedan förra avläsningen.

## Pomodoro på 96 dioder

Pomodoro-vyn börjar med 25 minuter som standard. Ratten kan ställa tiden från 10 sekunder för ett
snabbtest upp till 60 minuter. Ett långt tryck startar timern.

När sessionen körs använder Devdash hela matrisen som en enkel visning av återstående tid. De 96
dioderna släcks en i taget, rad för rad. Det säger inte exakt hur många minuter som återstår, men
det går att se direkt om sessionen precis har startat, är halvvägs eller nästan klar.

    start                         slut
    ████████████                  ············
    ████████████                  ············
    ████████████        →         ············
    ████████████                  ············

Om jag vill veta exakt tid vrider jag på ratten. Då scrollar minuter och sekunder en gång över
matrisen. När timern är klar pulserar matrisen kort och visar sedan en liten bock tills jag
kvitterar den.

## Ljuset följer fokus, men tar inte över

Pomodoro-vyn skickar en händelse när fokustiden börjar och när den avslutas. Elgato-vyn lyssnar på
den händelsen även om just den vyn inte visas på matrisen.

När en fokussession börjar sätter Devdash Key Light till 70 procents ljusstyrka och en kallare
arbetston, ungefär 5 000 K. När sessionen är slut, eller när den varit pausad längre än två
minuter, sänker den lampan till 35 procent och en varmare ton, ungefär 3 300 K.

Det finns en medveten begränsning här: Devdash tänder inte en lampa som redan är släckt. Koden
läser först lampans aktuella läge och hoppar över fokusinställningen om lampan är av. Jag vill att
den ska respektera ett manuellt val, inte bestämma att mitt skrivbord alltid ska vara upplyst.

## Ratten kan också styra lampan direkt

I Elgato-vyn visar LED-matrisen lampans ljusstyrka som en fyllnad. När jag öppnar vyn hämtar
Devdash först lampans aktuella läge. Varje steg på ratten ändrar sedan ljusstyrkan med en procent.
Ett långt tryck tänder eller släcker lampan och behåller den senast använda ljusstyrkan.

Den nya inställningen skickas till lampans lokala HTTP-gränssnitt. Vid snabb vridning väntar
firmwaren minst en halv sekund mellan skrivningar och skickar det sista värdet, i stället för att
skicka ett anrop för varje klick.

Om lampan eller nätverket inte svarar visar matrisen en liten felmarkering och väntar fem sekunder
innan nästa försök. Det är en liten detalj, men den hindrar ratten från att skapa en ström av
misslyckade anrop.

## Nätet får inte stoppa timern

Pomodoro-delen fungerar utan Wi-Fi. Det var ett viktigt val, eftersom just timern är den funktion
som ska fungera när nätet strular eller när lampan inte svarar.

Wi-Fi används för Elgato-styrningen och för den kommande GitHub-integrationen. Om anslutningen
misslyckas startar Devdash ändå, men Elgato-vyn visar att den inte kan läsa lampans läge.

## Pipeline-vyn är nästa del

Repositoryt innehåller redan en liten HTTPS-klient för GitHub och ett test som kontrollerar
anslutning och token-behörighet mot GitHubs API. Den nuvarande firmwaren har däremot bara två
registrerade vyer: Pomodoro och Elgato. Den visar ännu inte workflow-runs på LED-matrisen.

Nästa del är att använda samma nätlager för att läsa status från GitHub Actions och översätta den
till ett litet antal tydliga tillstånd på matrisen: pågår, lyckades eller kräver uppmärksamhet.
Tanken är inte att få en full pipeline-logg på 96 dioder. Tanken är att se om jag behöver öppna
GitHub just nu.

För detta räcker en read-only fine-grained token med Actions-behörighet för de valda reporna.
[GitHubs officiella behörighetsöversikt](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)
visar att läsning av workflow-runs stöds med Actions: read.

## Vad projektet har lärt mig hittills

Det mest intressanta har inte varit att få en lampa att reagera på en timer. Det har varit att
bestämma var gränserna ska gå.

LED-matrisen är liten, så varje vy måste välja en enda sak att visa. Ljusstyrning får inte köra över
ett manuellt avstängt ljus. Och nätverksfel får inte göra att fokustimern slutar fungera.

Det är den typen av avgränsningar jag vill fortsätta med i pipeline-vyn. Devdash ska ge en lugn
signal när något behöver mig, inte bli ännu en skärm som konkurrerar om uppmärksamheten.
