---
title: 'Barrynamdari.se'
description: 'Den här portfoliosajten — statisk Astro 6 med View Transitions, mörkt/ljust tema och bloggsystem.'
kind: 'Portfolio-projekt'
year: '2026'
image:
    url: '/bn_logo.svg'
    alt: 'Barrynamdari.se logo'
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
stack: Astro 6, TypeScript, Tailwind v4, MDX
website: https://barrynamdari.se/
github: https://github.com/BeeBarry/PersonalWebsite
---

Den här sajten är min hub för portfolio och fältnoteringar — alltihop byggt
statiskt med **Astro 6** för snabb laddningstid och bra SEO.

✅ **Astro 6 + Content Layer** med markdown/MDX-baserade collections för projekt och posts<br>
✅ **View Transitions** för SPA-känsla utan client-side routing<br>
✅ **Astro 6 Fonts API** med Schibsted Grotesk + Spline Sans Mono (auto-preload, subsetting)<br>
✅ **Tailwind v4** med CSS-först-tokens och `@theme inline` för tema-växling<br>
✅ **Mörkt/ljust tema** med persistens via localStorage och `astro:after-swap`<br>
✅ Sheet-drawer för projektdetaljer + IntersectionObserver-reveals<br>
✅ Responsivt: <560px döljer nav, <640px ger bottom-sheet, <720px stackar hero

Lärdomen: en personlig sajt är värd att finslipa. Den får vara den första
stora portföljbiten i sig själv.