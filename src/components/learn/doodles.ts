// Doodle-bibliotek — inlinad SVG per bild.
//
// Varför inline och inte filer i public/: en <img src="…svg"> ärver inte
// currentColor från sidan, så bilden skulle behöva två versioner (ljus/mörk)
// och ändå inte följa temaväxlaren. Inlinad SVG ritar med currentColor och
// fungerar i båda lägena med en enda fil.
//
// Formspråket (docs/pedagogik/00-referens-monsteranalys.md §5): en linjetjocklek,
// skraffering för volym, etikett under varje objekt, heldragen pil = faktiskt
// flöde, max fem objekt, bred bild. Två stilar prövas parallellt:
//
// Stilen sätts av EN parameter i generatorn: hur mycket kanterna får vingla.
// 4.0 = snabb skiss, 1.2 = stadig hand (nuvarande), 0 = teknisk linjekonst.
// Rundade hörn och ändar behålls oavsett — de är det som gör att bilden läser
// som en teckning i stället för som ett diagram.

export const DOODLES: Record<string, string> = {
  /* ---- Docker 1.0 · Container vs virtuell maskin — STIL: HANDRITAD ---- */
  "vm-vs-container": `
<svg viewBox="0 0 880 404" role="img" aria-label="Två staplar bredvid varandra. Den virtuella maskinen har ett gäst-OS-lager som containern saknar.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 77 Q191 76 322 77 Q323 104 322 130 Q191 130 59 130 Q58 104 60 77 Z"/><path d="M60 141 Q191 140 321 139 Q322 173 322 207 Q191 208 60 206 Q58 173 60 141 Z"/><path d="M59 215 Q191 215 322 217 Q322 242 321 268 Q191 268 60 268 Q58 242 59 215 Z"/><path d="M60 278 Q191 276 322 278 Q323 306 322 334 Q191 335 61 334 Q60 306 60 278 Z"/><g stroke-width="1.1" opacity="0.6"><path d="M100 200 L66 166"/><path d="M134 200 L80 146"/><path d="M168 200 L114 146"/><path d="M202 200 L148 146"/><path d="M236 200 L182 146"/><path d="M270 200 L216 146"/><path d="M304 200 L250 146"/><path d="M316 178 L284 146"/></g><path d="M559 77 Q689 76 821 77 Q821 104 820 131 Q689 132 557 130 Q557 104 559 77 Z"/><path d="M559 140 Q689 139 820 140 Q821 173 820 206 Q689 206 559 207 Q557 173 559 140 Z" stroke-dasharray="8 9" opacity="0.38"/><path d="M558 217 Q689 214 821 215 Q820 242 820 268 Q689 268 557 268 Q558 242 558 217 Z"/><path d="M557 277 Q689 278 820 279 Q822 306 819 334 Q689 334 558 335 Q557 306 557 277 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="191" y="111">App</text>
    <text x="191" y="180">Gäst-OS</text>
    <text x="191" y="250">Hypervisor</text>
    <text x="191" y="314">Värd-OS</text>
    <text x="689" y="111">App</text>
    <text x="689" y="250">Docker</text>
    <text x="689" y="314">Värd-OS</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.4">
    <text x="689" y="180">finns inte</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="191" y="376">Virtuell maskin</text>
    <text x="689" y="376">Container</text>
  </g>
</svg>`,


  /* ---- Docker 1.0 · Registry, repository och tagg — STIL: HANDRITAD ---- */
  "registry-hyllan": `
<svg viewBox="0 0 880 400" role="img" aria-label="En hylla med tre lådor märkta v1, v2 och latest. En klammer under dem märkt repository.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M150 258 Q440 255 750 257"/><path d="M152 272 Q440 269 748 271"/><path d="M154 272 Q152 300 156 326"/><path d="M746 271 Q748 300 744 326"/><path d="M206 151 Q276 149 347 149 Q346 202 345 253 Q276 254 205 254 Q205 202 206 151 Z"/><path d="M376 150 Q446 150 517 150 Q518 202 516 254 Q446 256 376 253 Q376 202 376 150 Z"/><path d="M546 150 Q616 149 685 150 Q686 202 685 253 Q616 254 545 253 Q544 202 546 150 Z"/><path d="M212 296 Q212 308 224 309 L438 311 Q450 311 450 322 Q450 311 462 310 L732 308 Q744 307 744 295" stroke-width="1.3" opacity="0.7"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="276" y="208">:v1</text>
    <text x="446" y="208">:v2</text>
    <text x="616" y="208">:latest</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="448" y="104">Registry · ghcr.io</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="448" y="348">Repository · searchapi</text>
  </g>
</svg>`,

  /* ---- Docker 1.0 · Docker vs Docker Compose — STIL: HANDRITAD ---- */
  "compose-en-fil": `
<svg viewBox="0 0 880 400" role="img" aria-label="En fil märkt compose.yaml med tre pilar till tre lådor inneslutna i en ring märkt eget nätverk.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M72 108 Q160 106 232 107 L272 150 Q275 212 272 274 Q160 277 74 275 Q70 192 72 108 Z"/><path d="M232 107 Q231 134 234 150 Q254 152 272 150"/><path d="M436 190 Q436 26 646 24 Q856 26 856 190 Q856 350 646 352 Q436 350 436 190 Z" stroke-width="1.5" opacity="0.5"/><path d="M535 78 Q657 77 777 79 Q778 109 778 139 Q657 142 535 140 Q536 109 535 78 Z"/><path d="M536 160 Q657 158 777 159 Q780 191 778 221 Q657 223 537 221 Q534 191 536 160 Z"/><path d="M536 241 Q657 240 778 243 Q780 273 779 304 Q657 305 535 304 Q536 273 536 241 Z"/><path d="M276 192 Q360 190 420 142 Q450 118 524 112"/><path d="M276 192 Q400 191 524 192"/><path d="M276 192 Q360 193 420 242 Q450 266 524 272"/><path d="M517 105 L530 111 L517 117"/><path d="M517 186 L530 192 L517 198"/><path d="M517 267 L530 273 L517 279"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="172" y="202">compose.yaml</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="657" y="116">webshop</text>
    <text x="657" y="198">api</text>
    <text x="657" y="280">db</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="646" y="384">eget nätverk</text>
  </g>
</svg>`,

  /* ---- Docker 1.2 · Tjänstnamnet är ett värdnamn — STIL: HANDRITAD ---- */
  "compose-natverket": `
<svg viewBox="0 0 880 380" role="img" aria-label="En ring märkt shop_default med två lådor inuti. En laptop utanför når inte in.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M262 186 Q262 58 520 56 Q782 58 782 186 Q782 320 520 322 Q262 320 262 186 Z" stroke-width="1.5" opacity="0.5"/><path d="M320 145 Q404 144 489 147 Q489 182 489 219 Q404 219 321 219 Q318 182 320 145 Z"/><path d="M571 145 Q656 146 739 146 Q741 182 741 218 Q656 218 573 219 Q570 182 571 145 Z"/><path d="M492 182 Q530 181 566 182"/><path d="M557 176 L570 182 L557 188"/><path d="M60 152 Q120 150 178 151 Q181 190 178 224 Q120 226 62 224 Q58 188 60 152 Z"/><path d="M44 236 Q120 234 196 235 Q186 250 172 252 Q120 254 66 252 Q52 250 44 236 Z"/><path d="M200 194 Q226 195 248 190" stroke-dasharray="8 8"/><path d="M252 176 L268 204"/><path d="M268 176 L252 204"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="404" y="190">api</text>
    <text x="656" y="190">db</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.7">
    <text x="530" y="168">db:5432</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="120" y="292">din dator</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="522" y="356">shop_default</text>
  </g>
</svg>`,

  /* ---- Docker 1.3 · Vad en volym är — STIL: HANDRITAD ---- */
  "volymen-star-kvar": `
<svg viewBox="0 0 880 400" role="img" aria-label="Två paneler. I den vänstra skriver containern genom sin botten ner i volymen. I den högra är containern borta och volymen kvar.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M98 76 Q210 74 322 75 Q325 122 322 168"/><path d="M98 76 Q95 122 98 168"/><path d="M98 168 Q210 170 322 168" stroke-dasharray="7 8" opacity="0.5"/><path d="M210 104 Q209 170 210 214"/><path d="M204 207 L210 220 L216 207"/><path d="M131 231 Q220 230 308 233 Q309 268 309 304 Q220 306 132 305 Q132 268 131 231 Z"/><path d="M538 46 Q650 44 762 45 Q765 92 762 138" stroke-dasharray="8 9" opacity="0.26"/><path d="M538 46 Q535 92 538 138" stroke-dasharray="8 9" opacity="0.26"/><path d="M650 176 Q649 150 650 128" opacity="0.42"/><path opacity="0.42" d="M644 137 L650 124 L656 137"/><path d="M573 232 Q660 231 747 233 Q750 268 748 305 Q660 306 573 304 Q570 268 573 232 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="210" y="132">container</text>
    <text x="220" y="278">volym</text>
    <text x="660" y="278">volym</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="210" y="352">containern kör</text>
    <text x="650" y="352">containern borta</text>
  </g>
</svg>`,

  /* ---- Nätverk 1.2 · Ett HTTP-anrop är text — STIL: HANDRITAD ---- */
  "forfragan-och-svar": `
<svg viewBox="0 0 880 372" role="img" aria-label="Ett webbläsarfönster och ett servertorn. En heldragen pil dit med förfrågan och en heldragen pil tillbaka med svaret.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M89 109 Q210 109 331 111 Q331 185 329 261 Q210 260 91 260 Q88 185 89 109 Z"/><path d="M96 148 Q210 146 324 148"/><path d="M115 123 Q120 123 120 130 Q120 135 114 136 Q108 135 109 128 Q108 123 115 123 Z"/><path d="M133 123 Q140 123 139 129 Q140 135 133 135 Q128 135 127 130 Q128 123 133 123 Z"/><path d="M154 123 Q160 123 160 130 Q160 135 154 136 Q148 135 148 129 Q148 123 154 123 Z"/><path d="M600 99 Q675 100 750 99 Q751 195 749 291 Q675 291 599 290 Q599 195 600 99 Z"/><path d="M604 163 Q675 161 746 163"/><path d="M604 226 Q675 224 746 226"/><path d="M624 127 Q630 126 629 132 Q630 138 623 137 Q618 138 619 132 Q618 126 624 127 Z"/><path d="M624 190 Q630 189 631 195 Q630 201 624 201 Q618 201 618 195 Q618 189 624 190 Z"/><path d="M624 252 Q630 252 630 259 Q630 264 624 265 Q618 264 619 257 Q618 252 624 252 Z"/><path d="M338 168 Q460 160 586 152"/><path d="M581 145 L594 151 L581 157"/><path d="M586 238 Q460 246 342 254"/><path d="M347 249 L334 255 L347 261"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="462" y="136">förfrågan</text>
    <text x="462" y="290">svar</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="210" y="332">webbläsaren</text>
    <text x="675" y="332">servern</text>
  </g>
</svg>`,

  /* ---- Nätverk 1.2 · Första siffran räcker — STIL: HANDRITAD ---- */
  "statuskodernas-fyra": `
<svg viewBox="0 0 880 300" role="img" aria-label="Fyra webbläsarfönster märkta 2xx, 3xx, 4xx och 5xx, vart och ett med en symbol för vad gruppen betyder.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M39 87 Q125 85 210 87 Q211 152 209 219 Q125 219 39 219 Q40 152 39 87 Z"/><path d="M46 118 Q125 116 204 118"/><path d="M57 96 Q63 97 63 101 Q63 107 57 106 Q53 107 52 101 Q53 97 57 96 Z"/><path d="M74 97 Q79 97 80 101 Q79 107 74 106 Q69 107 69 101 Q69 97 74 97 Z"/><path d="M89 96 Q95 97 96 102 Q95 107 89 107 Q85 107 86 101 Q85 97 89 96 Z"/><path d="M251 86 Q335 85 420 87 Q422 152 420 218 Q335 219 250 219 Q249 152 251 86 Z"/><path d="M256 118 Q335 116 414 118"/><path d="M268 97 Q273 97 272 101 Q273 107 267 108 Q263 107 262 101 Q263 97 268 97 Z"/><path d="M283 98 Q289 97 290 102 Q289 107 283 106 Q279 107 279 102 Q279 97 283 98 Z"/><path d="M299 97 Q305 97 304 103 Q305 107 301 107 Q295 107 294 103 Q295 97 299 97 Z"/><path d="M460 86 Q545 84 629 86 Q630 152 630 218 Q545 218 459 218 Q459 152 460 86 Z"/><path d="M466 118 Q545 116 624 118"/><path d="M477 96 Q483 97 483 101 Q483 107 478 107 Q473 107 474 102 Q473 97 477 96 Z"/><path d="M495 98 Q499 97 499 102 Q499 107 495 106 Q489 107 490 102 Q489 97 495 98 Z"/><path d="M509 98 Q515 97 516 102 Q515 107 511 108 Q505 107 504 102 Q505 97 509 98 Z"/><path d="M670 87 Q755 84 841 87 Q840 152 840 219 Q755 218 670 218 Q669 152 670 87 Z"/><path d="M676 118 Q755 116 834 118"/><path d="M687 98 Q693 97 693 102 Q693 107 688 107 Q683 107 683 101 Q683 97 687 98 Z"/><path d="M705 98 Q709 97 709 102 Q709 107 704 106 Q699 107 700 101 Q699 97 705 98 Z"/><path d="M719 96 Q725 97 726 101 Q725 107 721 108 Q715 107 715 102 Q715 97 719 96 Z"/><path d="M107 172 L119 188 L145 152"/><path d="M313 168 Q322 167 323 175 Q322 185 312 185 Q304 185 303 175 Q304 167 313 168 Z"/><path d="M313 185 Q314 193 313 200"/><path d="M356 167 Q366 167 367 177 Q366 185 356 186 Q348 185 348 175 Q348 167 356 167 Z"/><path d="M357 185 Q358 193 357 200"/><path d="M310 158 Q335 136 358 158"/><path d="M352 151 L358 162 L364 151"/><path d="M545 146 L568 190 L522 190 Z"/><path d="M545 160 Q546 167 545 174"/><path d="M546 182 Q547 181 547 184 Q547 185 545 185 Q543 185 544 184 Q543 181 546 182 Z"/><path d="M732 140 Q755 139 777 140 Q778 172 776 204 Q755 204 734 203 Q732 172 732 140 Z"/><path d="M736 161 Q755 160 774 161"/><path d="M736 182 Q755 181 774 182"/><path d="M743 147 Q746 147 745 151 Q746 153 744 155 Q740 153 739 149 Q740 147 743 147 Z"/><path d="M742 168 Q746 168 746 170 Q746 174 743 175 Q740 174 740 170 Q740 168 742 168 Z"/><path d="M742 190 Q746 189 747 192 Q746 195 742 194 Q740 195 740 192 Q740 189 742 190 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="125" y="250">2xx</text>
    <text x="335" y="250">3xx</text>
    <text x="545" y="250">4xx</text>
    <text x="755" y="250">5xx</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="125" y="278">lyckades</text>
    <text x="335" y="278">leta vidare</text>
    <text x="545" y="278">fel fråga</text>
    <text x="755" y="278">serverns fel</text>
  </g>
</svg>`,

  /* ---- Nätverk 1.1 · URL:en, del för del — STIL: HANDRITAD ---- */
  "url-raden": `
<svg viewBox="0 0 880 232" role="img" aria-label="En URL uppdelad i fem rutor med en pil ner till varje dels namn. Rutan med värdnamnet är skrafferad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M79 84 Q440 84 802 84 Q802 109 801 133 Q440 135 78 133 Q77 109 79 84 Z"/><path d="M216 88 Q217 110 216 130" stroke-dasharray="6 7" opacity="0.5"/><path d="M420 88 Q421 110 420 130" stroke-dasharray="6 7" opacity="0.5"/><path d="M518 88 Q519 110 518 130" stroke-dasharray="6 7" opacity="0.5"/><path d="M674 88 Q675 110 674 130" stroke-dasharray="6 7" opacity="0.5"/><g stroke-width="1.1" opacity="0.42"><path d="M248 130 L222 104"/><path d="M274 130 L232 88"/><path d="M300 130 L258 88"/><path d="M326 130 L284 88"/><path d="M352 130 L310 88"/><path d="M378 130 L336 88"/><path d="M404 130 L362 88"/><path d="M414 114 L388 88"/></g><path d="M148 140 Q148 158 148 174"/><path d="M141.5 170 L147.5 180 L153.5 170"/><path d="M318 140 Q319 158 318 174"/><path d="M312.0 170 L318.0 180 L324.0 170"/><path d="M469 140 Q470 158 469 174"/><path d="M463.0 170 L469.0 180 L475.0 170"/><path d="M596 140 Q597 158 596 174"/><path d="M590.0 170 L596.0 180 L602.0 170"/><path d="M738 140 Q738 158 738 174"/><path d="M731.5 170 L737.5 180 L743.5 170"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="147.5" y="115">https://</text>
    <text x="318.0" y="115">shop.example.se</text>
    <text x="469.0" y="115">:443</text>
    <text x="596.0" y="115">/produkter</text>
    <text x="737.5" y="115">?sida=2</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="147.5" y="210">protokoll</text>
    <text x="318.0" y="210">värdnamn</text>
    <text x="469.0" y="210">port</text>
    <text x="596.0" y="210">sökväg</text>
    <text x="737.5" y="210">frågesträng</text>
  </g>
</svg>`,

  /* ---- Nätverk 1.1 · IP-adress vs port — STIL: HANDRITAD ---- */
  "porten-ar-dorren": `
<svg viewBox="0 0 880 440" role="img" aria-label="Ett hus med en IP-adress och fyra dörrar märkta med portnummer. En heldragen pil går in i dörren 443.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M259 129 Q480 129 700 130 Q700 220 700 309 Q480 312 260 310 Q258 220 259 129 Z"/><path d="M242 132 L480 58 L718 132"/><path d="M290 310 Q289 265 290 220 Q325 218 360 220 Q361 265 360 310"/><path d="M390 310 Q389 265 390 220 Q425 218 460 220 Q461 265 460 310"/><path d="M490 310 Q489 265 490 220 Q525 218 560 220 Q561 265 560 310"/><path d="M590 310 Q589 265 590 220 Q625 218 660 220 Q661 265 660 310"/><path d="M110 378 Q300 392 430 372 Q500 360 525 334"/><path d="M519 333 L525 320 L531 333"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="480" y="38">93.184.216.34</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="325" y="272">22</text>
    <text x="425" y="272">80</text>
    <text x="525" y="272">443</text>
    <text x="625" y="272">5432</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="150" y="414">anropet</text>
  </g>
</svg>`,

  /* ---- Linux 1.1 · Roten vs hemkatalogen — STIL: HANDRITAD ---- */
  "filsystemstradet": `
<svg viewBox="0 0 880 400" role="img" aria-label="Ett träd som växer nedåt från roten snedstreck, med grenar till etc, usr och home. Under home är lisa inringad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M401 57 Q440 54 479 56 Q482 79 481 103 Q440 102 400 101 Q399 79 401 57 Z"/><path d="M134 158 Q200 156 266 157 Q267 181 266 204 Q200 205 136 204 Q133 181 134 158 Z"/><path d="M374 158 Q440 156 505 158 Q507 181 504 204 Q440 206 375 205 Q373 181 374 158 Z"/><path d="M616 159 Q680 157 746 157 Q746 181 745 204 Q680 204 616 204 Q613 181 616 159 Z"/><path d="M440 104 Q330 108 205 154"/><path d="M440 104 Q441 130 440 154"/><path d="M440 104 Q550 108 675 154"/><path d="M680 206 Q681 224 680 242"/><path d="M614 269 Q680 267 744 269 Q747 291 744 313 Q680 316 615 313 Q615 291 614 269 Z"/><path d="M680 244 Q776 244 779 291 Q776 338 681 338 Q584 338 583 291 Q584 244 680 244 Z" stroke-width="1.5" opacity="0.5"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="88">/</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="200" y="190">etc</text>
    <text x="440" y="190">usr</text>
    <text x="680" y="190">home</text>
    <text x="680" y="300">lisa</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="680" y="374">~</text>
  </g>
</svg>`,

  /* ---- SQL 1.2 · Vad en JOIN är — STIL: HANDRITAD ---- */
  "join-tva-rader-in": `
<svg viewBox="0 0 880 340" role="img" aria-label="Två rutnät med var sin markerad rad, och till höger ett bredare rutnät där de två raderna blivit en.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M61 100 Q160 99 259 99 Q262 186 261 271 Q160 274 60 272 Q58 186 61 100 Z"/><path d="M62 143 Q160 142 258 143"/><path d="M62 186 Q160 185 258 186"/><path d="M62 229 Q160 228 258 229"/><path d="M170 102 Q171 186 170 270"/><path d="M310 100 Q410 99 510 100 Q510 186 509 271 Q410 274 309 273 Q310 186 310 100 Z"/><path d="M312 143 Q410 142 508 143"/><path d="M312 186 Q410 185 508 186"/><path d="M312 229 Q410 228 508 229"/><path d="M420 102 Q421 186 420 270"/><path d="M600 144 Q720 144 839 144 Q842 188 840 230 Q720 233 599 230 Q599 188 600 144 Z"/><path d="M602 188 Q720 187 838 188"/><path d="M680 147 Q681 188 680 229"/><path d="M760 147 Q761 188 760 229"/><g stroke-width="1.1" opacity="0.42"><path d="M90 182 L64 156"/><path d="M116 182 L81 147"/><path d="M142 182 L107 147"/><path d="M168 182 L133 147"/><path d="M194 182 L159 147"/><path d="M220 182 L185 147"/><path d="M246 182 L211 147"/><path d="M256 166 L237 147"/></g><g stroke-width="1.1" opacity="0.42"><path d="M340 182 L314 156"/><path d="M366 182 L331 147"/><path d="M392 182 L357 147"/><path d="M418 182 L383 147"/><path d="M444 182 L409 147"/><path d="M470 182 L435 147"/><path d="M496 182 L461 147"/><path d="M506 166 L487 147"/></g><g stroke-width="1.1" opacity="0.42"><path d="M630 227 L604 201"/><path d="M656 227 L621 192"/><path d="M682 227 L647 192"/><path d="M708 227 L673 192"/><path d="M734 227 L699 192"/><path d="M760 227 L725 192"/><path d="M786 227 L751 192"/><path d="M812 227 L777 192"/><path d="M836 225 L803 192"/><path d="M836 199 L829 192"/></g><path d="M262 165 Q282 164 300 165"/><path d="M293 159 L306 165 L293 171"/><path d="M512 165 Q560 178 590 203"/><path d="M583 202 L596 208 L583 214"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="115" y="129">id</text>
    <text x="215" y="129">kat</text>
    <text x="115" y="172">12</text>
    <text x="215" y="172">4</text>
    <text x="115" y="215">13</text>
    <text x="215" y="215">7</text>
    <text x="115" y="258">14</text>
    <text x="215" y="258">4</text>
    <text x="365" y="129">id</text>
    <text x="465" y="129">namn</text>
    <text x="365" y="172">4</text>
    <text x="465" y="172">Hand</text>
    <text x="365" y="215">7</text>
    <text x="465" y="215">Mät</text>
    <text x="365" y="258">9</text>
    <text x="465" y="258">Verk</text>
    <text x="640" y="174">id</text>
    <text x="720" y="174">kat</text>
    <text x="800" y="174">namn</text>
    <text x="640" y="217">12</text>
    <text x="720" y="217">4</text>
    <text x="800" y="217">Hand</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="160" y="310">produkter</text>
    <text x="410" y="310">kategorier</text>
    <text x="720" y="310">resultatet</text>
  </g>
</svg>`,

  /* ---- SQL 1.1 · Varje faktum ska ha ett enda hem — STIL: HANDRITAD ---- */
  "nyckeln-pekar-hem": `
<svg viewBox="0 0 880 360" role="img" aria-label="Tabellen produkter till höger har flera rader med fyran, och varje fyra pekar med en heldragen pil på en enda rad i kategorier.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 90 Q205 89 350 90 Q351 190 349 289 Q205 292 61 289 Q58 190 60 90 Z"/><path d="M62 130 Q205 129 348 130"/><path d="M62 170 Q205 169 348 170"/><path d="M62 210 Q205 209 348 210"/><path d="M62 250 Q205 249 348 250"/><path d="M150 92 Q151 190 150 288"/><path d="M559 89 Q700 88 840 90 Q842 190 841 291 Q700 292 561 289 Q559 190 559 89 Z"/><path d="M562 130 Q700 129 838 130"/><path d="M562 170 Q700 169 838 170"/><path d="M562 210 Q700 209 838 210"/><path d="M562 250 Q700 249 838 250"/><path d="M650 92 Q651 190 650 288"/><g stroke-width="1.1" opacity="0.42"><path d="M90 208 L64 182"/><path d="M116 208 L80 172"/><path d="M142 208 L106 172"/><path d="M168 208 L132 172"/><path d="M194 208 L158 172"/><path d="M220 208 L184 172"/><path d="M246 208 L210 172"/><path d="M272 208 L236 172"/><path d="M298 208 L262 172"/><path d="M324 208 L288 172"/><path d="M346 204 L314 172"/><path d="M346 178 L340 172"/></g><path d="M556 150 Q460 170 372 190"/><path d="M556 190 Q460 190 372 190"/><path d="M556 270 Q460 230 372 190"/><path d="M371 184 L358 190 L371 196"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="105" y="118">id</text>
    <text x="250" y="118">namn</text>
    <text x="105" y="158">2</text>
    <text x="250" y="158">Elverktyg</text>
    <text x="105" y="198">4</text>
    <text x="250" y="198">Handverktyg</text>
    <text x="105" y="238">7</text>
    <text x="250" y="238">Mätverktyg</text>
    <text x="105" y="278">9</text>
    <text x="250" y="278">Trädgård</text>
    <text x="605" y="118">id</text>
    <text x="745" y="118">kategori_id</text>
    <text x="605" y="158">8842</text>
    <text x="745" y="158">4</text>
    <text x="605" y="198">8843</text>
    <text x="745" y="198">4</text>
    <text x="605" y="238">8844</text>
    <text x="745" y="238">7</text>
    <text x="605" y="278">8845</text>
    <text x="745" y="278">4</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="205" y="330">kategorier</text>
    <text x="700" y="330">produkter</text>
  </g>
</svg>`,

  /* ---- Linux 1.2 · stdout vs stderr — STIL: HANDRITAD ---- */
  "rorets-ovre-kanal": `
<svg viewBox="0 0 880 430" role="img" aria-label="Kommandot ls har två rör ut. Det övre går in i grep, det nedre böjer av förbi grep och slutar på skärmen.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M61 141 Q135 138 210 141 Q212 185 210 230 Q135 231 59 231 Q59 185 61 141 Z"/><path d="M399 129 Q475 129 550 130 Q550 175 549 219 Q475 221 400 220 Q398 175 399 129 Z"/><path d="M660 235 Q745 234 830 237 Q830 291 831 347 Q745 347 661 345 Q659 291 660 235 Z"/><path d="M745 348 Q746 362 745 374"/><path d="M700 376 Q745 374 790 376"/><path d="M212 170 Q300 168 390 170"/><path d="M385 164 L398 170 L385 176"/><path d="M212 208 Q300 210 330 250 Q350 282 420 288 Q520 296 644 292"/><path d="M639 286 L652 292 L639 298"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="135" y="192">ls</text>
    <text x="475" y="182">grep</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="300" y="148">1 · stdout</text>
    <text x="250" y="268">2 · stderr</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="745" y="410">skärmen</text>
  </g>
</svg>`,

  /* ---- Kubernetes 1.1 · Klustret — STIL: HANDRITAD ---- */
  "control-plane-och-noder": `
<svg viewBox="0 0 880 430" role="img" aria-label="En låda märkt control plane med heldragna pilar ner till tre noder, var och en med två poddar inuti.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M320 51 Q440 48 561 50 Q561 95 559 140 Q440 142 320 141 Q318 95 320 51 Z"/><path d="M60 251 Q170 250 281 249 Q282 310 279 369 Q170 371 61 369 Q58 310 60 251 Z"/><path d="M331 250 Q440 250 549 251 Q551 310 550 369 Q440 372 329 371 Q328 310 331 250 Z"/><path d="M599 250 Q710 250 821 251 Q820 310 820 369 Q710 372 600 370 Q600 310 599 250 Z"/><path d="M82 288 Q122 288 163 288 Q163 314 163 340 Q122 341 81 339 Q80 314 82 288 Z"/><path d="M178 288 Q218 287 258 287 Q259 314 258 341 Q218 341 177 339 Q176 314 178 288 Z"/><path d="M353 289 Q392 286 432 287 Q434 314 433 340 Q392 341 353 339 Q352 314 353 289 Z"/><path d="M448 287 Q488 286 527 288 Q530 314 528 341 Q488 340 447 340 Q446 314 448 287 Z"/><path d="M621 288 Q662 286 703 289 Q704 314 703 341 Q662 342 623 340 Q620 314 621 288 Z"/><path d="M718 288 Q758 288 798 288 Q798 314 797 339 Q758 342 717 340 Q716 314 718 288 Z"/><path d="M440 142 Q300 146 210 206 Q180 226 170 238"/><path d="M164 233 L170 246 L176 233"/><path d="M440 142 Q441 194 440 238"/><path d="M434 233 L440 246 L446 233"/><path d="M440 142 Q580 146 670 206 Q700 226 710 238"/><path d="M704 233 L710 246 L716 233"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="102">Control plane</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.7">
    <text x="122" y="320">pod</text>
    <text x="218" y="320">pod</text>
    <text x="392" y="320">pod</text>
    <text x="488" y="320">pod</text>
    <text x="662" y="320">pod</text>
    <text x="758" y="320">pod</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="170" y="402">Nod 1</text>
    <text x="440" y="402">Nod 2</text>
    <text x="710" y="402">Nod 3</text>
  </g>
</svg>`,

  /* ---- Kubernetes 1.1 · Service — STIL: HANDRITAD ---- */
  "service-vagskylten": `
<svg viewBox="0 0 880 410" role="img" aria-label="En vägskylt märkt api:5000 med en heldragen pil in från frontend och tre streckade pilar ut till poddar, varav en är överkryssad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M49 180 Q130 178 210 181 Q211 220 211 261 Q130 262 49 259 Q49 220 49 180 Z"/><path d="M212 220 Q262 219 300 220"/><path d="M295 214 L308 220 L295 226"/><path d="M321 151 Q415 148 510 150 Q512 190 510 230 Q415 230 321 229 Q318 190 321 151 Z"/><path d="M415 232 Q416 282 415 330"/><path d="M385 332 Q415 330 445 332"/><path d="M639 60 Q725 60 810 60 Q811 96 811 133 Q725 133 640 131 Q639 96 639 60 Z"/><path d="M641 177 Q725 177 809 177 Q812 214 809 251 Q725 251 640 250 Q638 214 641 177 Z"/><g opacity="0.42"><path d="M641 296 Q725 294 811 295 Q811 332 810 369 Q725 368 641 369 Q638 332 641 296 Z"/><path d="M658 302 L792 362"/><path d="M792 302 L658 362"/></g><g stroke-dasharray="8 9"><path d="M514 170 Q572 166 600 130 Q615 108 628 98"/><path d="M516 190 Q578 192 628 210"/><path d="M514 210 Q572 214 600 262 Q615 296 628 328"/></g><path d="M623 90 L636 96 L623 102"/><path d="M623 206 L636 212 L623 218"/><path d="M623 326 L636 332 L623 338"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="130" y="228">Frontend</text>
    <text x="415" y="198">api:5000</text>
    <text x="725" y="104">pod</text>
    <text x="725" y="222">pod</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.5">
    <text x="725" y="392">borttagen</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="415" y="372">Servicen</text>
  </g>
</svg>`,

  /* ---- API 1.2 · Samlingar och medlemmar — STIL: HANDRITAD ---- */
  "hyllan-och-ladan": `
<svg viewBox="0 0 880 386" role="img" aria-label="En hylla märkt snedstreck produkter med fem platser. Den tredje lådan är utlyft ovanför hyllan och märkt med sitt eget id.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M280 300 Q540 297 800 299"/><path d="M282 314 Q540 311 798 313"/><path d="M284 314 Q282 340 286 364"/><path d="M796 313 Q798 340 794 364"/><path d="M309 210 Q350 208 389 209 Q391 258 389 306 Q350 307 310 305 Q308 258 309 210 Z"/><path d="M407 209 Q447 209 488 210 Q487 258 486 305 Q447 306 407 306 Q406 258 407 209 Z"/><path d="M601 209 Q641 210 681 211 Q683 258 681 306 Q641 307 601 306 Q599 258 601 209 Z"/><path d="M699 209 Q738 209 777 211 Q778 258 778 307 Q738 306 698 307 Q697 258 699 209 Z"/><path d="M505 210 Q544 210 585 210 Q584 258 585 306 Q544 307 503 307 Q503 258 505 210 Z" stroke-dasharray="7 8" opacity="0.34"/><path d="M544 174 Q545 190 544 202" stroke-dasharray="6 7" opacity="0.5"/><path d="M504 71 Q544 69 583 70 Q586 118 584 166 Q544 166 503 165 Q503 118 504 71 Z"/><path d="M170 118 Q330 116 492 118"/><path d="M487 112 L500 118 L487 124"/><path d="M170 262 Q235 260 298 262"/><path d="M291 256 L304 262 L291 268"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="544" y="48">/produkter/8842</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="330" y="96">GET → en</text>
    <text x="230" y="240">GET → lista</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="544" y="360">/produkter</text>
  </g>
</svg>`,

  /* ---- Terraform 1.2 · Vad state är — STIL: HANDRITAD ---- */
  "state-triangeln": `
<svg viewBox="0 0 880 400" role="img" aria-label="Tre punkter i en triangel: main.tf överst, terraform.tfstate nere till vänster och ett moln för verkligheten nere till höger.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M351 46 Q440 45 529 44 Q531 90 531 136 Q440 137 350 134 Q349 90 351 46 Z"/><path d="M71 279 Q185 278 301 279 Q301 325 300 371 Q185 371 71 369 Q69 325 71 279 Z"/><path d="M600 342 Q568 342 568 316 Q568 294 592 292 Q596 262 630 260 Q650 234 688 240 Q718 226 744 250 Q784 248 790 278 Q814 286 809 312 Q806 340 776 342 Z"/><path d="M390 140 Q300 190 220 210 Q185 220 185 262"/><path d="M179 257 L185 270 L191 257"/><path d="M490 140 Q574 172 650 184 Q700 194 700 220"/><path d="M694 215 L700 228 L706 215"/><g stroke-dasharray="8 9"><path d="M312 330 Q440 336 556 330"/></g><path d="M319 324 L306 330 L319 336"/><path d="M549 324 L562 330 L549 336"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="440" y="96">main.tf</text>
    <text x="185" y="332">terraform.tfstate</text>
    <text x="690" y="306">verkligheten</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="434" y="304">jämförs</text>
  </g>
</svg>`,

  /* ---- Git 1.1 · Git vs GitHub — STIL: HANDRITAD ---- */
  "historiken-ligger-lokalt": `
<svg viewBox="0 0 880 486" role="img" aria-label="En laptop med en punkt-git-mapp inuti och en streckad pil upp till ett moln med GitHub, GitLab och Bitbucket.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M300 128 Q260 128 260 98 Q260 68 294 64 Q300 32 342 30 Q368 6 414 14 Q454 0 490 28 Q544 24 554 60 Q588 70 582 102 Q578 128 532 128 Z"/><path d="M249 203 Q430 204 611 205 Q610 299 609 394 Q430 395 251 393 Q249 299 249 203 Z"/><path d="M214 406 Q430 404 646 406 Q628 428 600 430 Q430 434 260 430 Q232 428 214 406 Z"/><path d="M350 250 L412 250 L426 268 L512 268 Q516 318 512 354 Q430 358 348 354 Q344 302 350 250 Z"/><path d="M430 196 Q428 170 430 144" stroke-dasharray="8 9"/><path d="M424 149 L430 136 L436 149"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle">
    <text x="430" y="92">GitHub · GitLab · Bitbucket</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="430" y="312">.git</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="546" y="168">push · valfritt</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="430" y="466">din dator</text>
  </g>
</svg>`,

  /* ---- Kubernetes 1.3 · Varför konfiguration inte hör hemma i imagen — STIL: HANDRITAD ---- */
  "en-image-tre-miljoer": `
<svg viewBox="0 0 880 420" role="img" aria-label="En låda med en image och tre heldragna pilar ut till test, stage och prod. Vid varje miljö hänger en lapp med olika värde.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M61 151 Q155 150 249 151 Q252 200 250 251 Q155 250 61 249 Q59 200 61 151 Z"/><path d="M521 54 Q605 53 691 54 Q690 95 691 134 Q605 136 520 136 Q519 95 521 54 Z"/><path d="M519 169 Q605 168 689 171 Q691 210 690 251 Q605 251 519 251 Q519 210 519 169 Z"/><path d="M521 285 Q605 285 690 286 Q690 325 689 366 Q605 367 520 365 Q519 325 521 285 Z"/><path d="M692 95 Q702 96 712 95"/><path d="M712 72 Q772 70 832 72 Q833 95 832 118 Q772 119 712 118 Q710 95 712 72 Z"/><path d="M692 210 Q702 211 712 210"/><path d="M713 188 Q772 185 832 186 Q833 210 832 232 Q772 234 711 233 Q710 210 713 188 Z"/><path d="M692 325 Q702 326 712 325"/><path d="M712 301 Q772 302 833 303 Q832 325 832 347 Q772 350 712 348 Q712 325 712 301 Z"/><path d="M252 200 Q380 198 440 140 Q470 110 500 96"/><path d="M499 89 L512 95 L499 101"/><path d="M252 200 Q380 200 500 210"/><path d="M499 206 L512 212 L499 218"/><path d="M252 200 Q380 202 440 270 Q470 300 500 324"/><path d="M499 320 L512 326 L499 332"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="155" y="206">searchapi:v3</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="605" y="101">test</text>
    <text x="605" y="216">stage</text>
    <text x="605" y="331">prod</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle">
    <text x="772" y="101">db=test</text>
    <text x="772" y="216">db=stage</text>
    <text x="772" y="331">db=prod</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="772" y="392">ConfigMap per miljö</text>
  </g>
</svg>`,

  /* ---- Git 1.2 · Gren vs HEAD — STIL: HANDRITAD ---- */
  "grenen-och-head": `
<svg viewBox="0 0 880 380" role="img" aria-label="Tre commits på rad. En flagga märkt main står på den sista, och en mindre flagga märkt HEAD pekar på main-flaggan.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M180 243 Q207 243 208 269 Q207 297 181 297 Q153 297 153 269 Q153 243 180 243 Z"/><path d="M360 243 Q387 243 388 270 Q387 297 360 297 Q333 297 331 269 Q333 243 360 243 Z"/><path d="M540 242 Q567 243 568 271 Q567 297 539 297 Q513 297 512 269 Q513 243 540 242 Z"/><path d="M208 270 Q270 268 332 270"/><path d="M388 270 Q450 268 512 270"/><path d="M540 242 Q541 194 540 146"/><path d="M542 146 Q600 149 658 152 Q646 174 658 196 Q600 199 542 202 Z"/><path d="M730 180 Q731 127 730 74"/><path d="M732 74 Q786 77 840 80 Q830 99 840 118 Q786 121 732 124 Z"/><path d="M730 182 Q722 206 690 200"/><path d="M689 193 L676 199 L689 205"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="180" y="277">A</text>
    <text x="360" y="277">B</text>
    <text x="540" y="277">C</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="596" y="180">main</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="782" y="106">HEAD</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="360" y="340">historiken</text>
  </g>
</svg>`,
};
