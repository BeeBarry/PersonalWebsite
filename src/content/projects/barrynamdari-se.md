---
title: 'Barrynamdari.se'
type: portfolio
domains: ['web']
description: 'Den här portfoliosajten — statisk Astro 7 med View Transitions, en datadriven HR-guide och GitLab CI som publicerar till Pages.'
kind: 'Portfolio-projekt'
year: '2026'
image:
    url: '/bn_logo.svg'
    alt: 'Barrynamdari.se-logotyp'
worksImage1:
    url: '/bn_3.png'
    alt: 'Startsida'
worksImage2:
    url: '/bn_4.png'
    alt: 'Arbete-vy'
worksImage4:
  url: '/bn_2.png'
  alt: 'Artikelvy'
platform: Web
stack: Astro 7, TypeScript, Tailwind v4, MDX
website: https://barrynamdari.se/
github: https://github.com/BeeBarry/PersonalWebsite
---

Den här sajten är min hub för portfolio och fältnoteringar — alltihop byggt
statiskt med **Astro 7** för snabb laddningstid och bra SEO.

✅ **Astro 7 + Content Layer** med markdown/MDX-baserade collections för projekt och posts<br>
✅ **Teknik-guiden för HR** — ett datadrivet innehållslager (`hr-content.json` helt separerat från presentationen), djuplänkbara kort, sticky innehållsförteckning med scroll-spy och en kort-switcher med sök och typfilter<br>
✅ **View Transitions** via `ClientRouter` — SPA-känsla utan client-side ramverk<br>
✅ **Mörkt/ljust tema** utan FOUC: inline-skript före första målningen, persistens i localStorage och ombindning på `astro:after-swap`<br>
✅ **Astro Fonts API** med Schibsted Grotesk + Spline Sans Mono (auto-preload, subsetting)<br>
✅ **Tailwind v4** med CSS-först-tokens och `@theme inline` för tema-växling<br>
✅ **GitLab CI** bygger sajten på varje push och publicerar artefakten till GitLab Pages<br>
✅ **TypeScript strict** och noll runtime-JS-ramverk — all interaktivitet är små idempotenta skript som binds om vid varje sidbyte

Lärdomen: en personlig sajt är värd att finslipa. Den får vara den första
stora portföljbiten i sig själv.
