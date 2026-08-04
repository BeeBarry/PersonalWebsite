---
title: 'DevOps Tools'
type: lab
domains: ['cloud']
description: 'Fullstack Blazor-app som samlar DevOps-verktygen i en kategoriserad katalog — med live GitHub-stjärnor, admin-CRUD och Docker-drift på Azure.'
kind: 'Portfolio-projekt'
year: '2024'
image:
    url: '/devops_logo.svg'
    alt: 'DevOps Tools-logotyp'
worksImage1:
    url: '/dev_1.png'
    alt: 'Startsidan med verktygen grupperade i kategorier — Programming Languages och Cloud Platforms'
worksImage2:
    url: '/dev_2.png'
    alt: 'Detaljvyn för Python med beskrivning, huvudfunktioner, antal GitHub-stjärnor och länkar vidare'
worksImage3:
  url: '/dev_3.png'
  alt: 'Kategorierna Cloud Platforms och CI/CD med kort för AWS, Azure, Google Cloud, GitHub Actions, GitLab CI/CD och Jenkins'
worksImage4:
  url: '/dev_4.png'
  alt: 'Kategorierna Orchestration och Infrastructure as Code med kort för Kubernetes, Docker Swarm, Nomad, Terraform, Pulumi och Ansible'
platform: Web
stack: Blazor, Bootstrap, Azure, Docker
github: https://github.com/BeeBarry/DevOps_Tools
---

När jag började läsa in mig på DevOps var det inte de enskilda verktygen som
var svåra — det var att se var i kedjan de hörde hemma. Dokumentationen finns,
men den ligger utspridd och är skriven för den som redan vet vad hon letar efter.

Jag byggde DevOps Tools som den överblick jag själv saknade, och gjorde hela
kedjan själv: datamodell, backend, gränssnitt och drift. Verktygen ligger
sorterade efter vad de gör — språk, molnplattformar, CI/CD, containrar,
orkestrering och infrastructure as code — och varje verktyg har en kort
förklaring, sina huvudfunktioner och länkar vidare till officiell webbplats
och GitHub-repo.

✅ **Fullstack Blazor**-applikation med frontend, backend och databas<br>
✅ **GitHub API** — synkar aktuellt antal stjärnor för varje verktyg<br>
✅ Identitetshantering med säker **användar-autentisering**<br>
✅ **Admin-panel** med **CRUD** för att lägga till och redigera verktyg utan ny deploy<br>
✅ Deployment på **Azure Cloud**-plattformen<br>
✅ **Docker**-container med volym för databasen<br>
✅ **Responsiv design** med Bootstrap för alla enheter

Resultatet blev sex kategorier som går att skumma på en skärm, och en detaljvy
som svarar på ”vad är det här och när använder jag det?” utan att man behöver
lämna sidan. Att lägga till ett verktyg är i dag ett formulär i admin-panelen,
inte en kodändring — vilket är hela poängen med att ha byggt backend och
databas i stället för en statisk lista.
