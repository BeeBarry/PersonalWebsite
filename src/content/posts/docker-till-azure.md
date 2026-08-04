---
title: 'Från Docker-container till Azure — vad jag lärde mig av att deploya DevOps Tools'
description: 'Appen fungerade lokalt. Sedan skulle den starta i molnet — och det var där jag faktiskt lärde mig skillnaden mellan en image och en miljö.'
author: Barry
date: '14-04-2026'
domains: ['cloud']
read: '6 min'
tags: 'Docker · Azure · .NET'
icon: Server
---

DevOps Tools började som ett sätt att lära mig namnen på verktygen i pipelinen. Jag byggde en
fullstack-app i Blazor med databas, inloggning och en admin-panel, och den gjorde precis vad den
skulle — på min laptop. Det verkliga lärandet började när jag skulle flytta den någon annanstans.

Jag hade läst att containers löser ”det funkar på min dator”. Det jag inte hade förstått var att de
löser problemet genom att tvinga dig att formulera vad *miljön* faktiskt är. Så länge appen bara
kördes lokalt kunde jag vara vag. En Dockerfile tillåter inte vaghet.

## Imagen är en artefakt, inte en installation

Mitt första försök såg ut ungefär som man kan tro: kopiera in hela projektmappen, kör `dotnet
publish` inuti containern, klart. Resultatet blev en image som var flera gånger större än den
behövde vara, eftersom den innehöll hela SDK:t, NuGet-cachen och en del filer jag inte visste att
jag hade.

Lösningen var multi-stage build — bygg i en image som har verktygen, kopiera bara resultatet till en
som inte har dem:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "DevOpsTools.dll"]
```

Runtime-imagen har inga byggverktyg alls. Den blev en bråkdel av storleken, och — vilket jag tycker
är den intressantare vinsten — den innehåller inget som en angripare kan bygga med.

## Misstaget: jag byggde in miljön i bygget

Här gjorde jag mitt tydligaste fel. Connection-strängen till databasen låg i `appsettings.json`, och
`appsettings.json` kopierades in i imagen. Det fungerade utmärkt så länge det bara fanns en miljö.

När jag skulle köra samma app mot en databas i molnet insåg jag vad jag hade byggt: en image som var
låst till *en specifik* databas. Ville jag byta miljö fick jag bygga om. Och den image jag testat var
alltså inte samma artefakt som den jag skulle deploya — vilket gör hela poängen med att testa
imagen ganska tunn.

Rätt modell är enkel när man väl sett den: **imagen är samma i alla miljöer, konfigurationen kommer
utifrån.** I .NET faller miljövariabler in i konfigurationen automatiskt, där dubbelt understreck
motsvarar nästlingen i JSON-filen:

```bash
docker run -p 8080:8080 \
  -e ConnectionStrings__Default="Server=...;Database=..." \
  devops-tools:latest
```

Samma resonemang gäller databasfilen. Skriver containern data till sitt eget filsystem försvinner
den när containern byts ut — och en container ska kunna bytas ut, det är hela idén. Data hör hemma i
en volym eller i en hanterad databastjänst, aldrig i imagen.

## Azure: registry först, tjänst sedan

Steget till Azure blev mindre dramatiskt än jag väntat mig, just för att containern redan var en
färdig artefakt. Imagen pushas till ett container registry, och App Service pekas mot den. Molnet
behöver aldrig veta att appen är skriven i .NET — den vet bara att det finns en image och en port.

Det som faktiskt kostade mig tid var att containern startade och dog direkt, om och om igen, utan
att jag såg varför. Portalens statusruta sa ”stoppad”, vilket är sant men inte hjälpsamt. Först när
jag började läsa loggströmmen fick jag ett riktigt felmeddelande:

```bash
az webapp log tail --name <appnamn> --resource-group <resursgrupp>
```

Felet var trivialt — appen lyssnade på en annan port än den plattformen skickade trafik till. Men
lärdomen var inte trivial. Lokalt felsöker jag genom att titta på appen. I molnet finns ingen app att
titta på förrän den startat, så det första man behöver bygga är inte funktioner, det är sikt.
Loggarna är inte något man kopplar på när något går fel; de är förutsättningen för att man ska kunna
göra det.

## Vad jag gör annorlunda nu

Jag börjar numera med Dockerfilen tidigare, medan projektet fortfarande är litet. Det är obehagligare
att containerisera en app som redan har åsikter om var filer ligger än en som knappt har någon kod.
Och jag skriver ner varje inställning som skiljer sig mellan min maskin och allt annat — det blir min
lista över miljövariabler, och den listan är i praktiken deploy-dokumentationen.

Om du ska prova själv skulle jag föreslå en övning som lärde mig mer än några timmars läsning: ta din
image, kör den på en helt tom maskin, och notera varje sak den saknar för att starta. Det du
antecknar är skillnaden mellan din kod och ditt system — och det är den skillnaden deploy faktiskt
handlar om.
