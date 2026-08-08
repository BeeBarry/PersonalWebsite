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
  /* ---- Docker 1.1 · Vad byggkontexten är — STIL: HANDRITAD ---- */
  "byggkontexten-ramen": `
<svg viewBox="0 0 880 450" role="img" aria-label="Punkten sist i docker build är inringad och en pil går från den till en streckad ram runt projektmappen. Allt inuti ramen skickas till Docker. En fil under ramen når inte in.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M427 25 Q448 26 447 51 Q448 76 427 77 Q408 76 408 50 Q408 26 427 25 Z" stroke-width="1.5" opacity="0.6"/><path d="M428 82 Q422 106 340 114 Q314 118 302 120"/><path d="M294 115 L300 128 L306 115"/><path d="M120 140 Q390 137 660 140 Q662 205 660 270 Q390 273 120 270 Q118 205 120 140 Z" stroke-dasharray="9 10" stroke-width="1.5" opacity="0.55"/><path d="M180 170 Q255 170 329 171 Q332 205 329 239 Q255 241 179 240 Q178 205 180 170 Z"/><path d="M379 170 Q485 168 590 170 Q592 205 590 240 Q485 240 381 241 Q379 205 379 170 Z"/><path d="M664 205 Q690 204 712 205"/><path d="M705 199 L718 205 L705 211"/><path d="M730 164 Q790 163 849 166 Q851 205 849 245 Q790 246 731 244 Q729 205 730 164 Z"/><path d="M401 349 Q510 348 620 350 Q622 385 619 421 Q510 422 401 421 Q399 385 401 349 Z"/><path d="M510 344 Q508 322 510 302" stroke-dasharray="7 8"/><path d="M500 278 L520 298"/><path d="M520 278 L500 298"/>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="end">
    <text x="380" y="58">docker build -t app:1.0</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="428" y="58">.</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="255" y="212">app/</text>
    <text x="485" y="212">package.json</text>
    <text x="790" y="212">Docker</text>
    <text x="510" y="392">../nycklar</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="250" y="306">byggkontexten</text>
  </g>
</svg>`,
  /* ---- Docker 1.2 · Vad localhost betyder inuti en container — STIL: HANDRITAD ---- */
  "localhost-tre-maskiner": `
<svg viewBox="0 0 880 330" role="img" aria-label="Tre lådor märkta din dator, api och db. Varje låda har en pil som vänder tillbaka in i sig själv, och alla tre bär etiketten localhost.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M61 170 Q160 169 259 169 Q262 215 259 259 Q160 262 60 261 Q58 215 61 170 Z"/><path d="M340 170 Q440 170 541 170 Q540 215 539 260 Q440 260 341 259 Q338 215 340 170 Z"/><path d="M621 171 Q720 169 821 170 Q821 215 821 260 Q720 261 619 261 Q620 215 621 171 Z"/><path d="M222 166 Q226 122 180 120 Q134 120 138 158"/><path d="M132 155 L138 166 L144 155"/><path d="M502 166 Q506 122 460 120 Q414 120 418 158"/><path d="M412 155 L418 166 L424 155"/><path d="M782 166 Q786 122 740 120 Q694 120 698 158"/><path d="M692 155 L698 166 L704 155"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="160" y="223">din dator</text>
    <text x="440" y="223">api</text>
    <text x="720" y="223">db</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="160" y="300">localhost</text>
    <text x="440" y="300">localhost</text>
    <text x="720" y="300">localhost</text>
  </g>
</svg>`,
  /* ---- Kubernetes 1.2 · Selector vs Deployment-namn — STIL: HANDRITAD ---- */
  "selectorn-matchar-lappen": `
<svg viewBox="0 0 880 470" role="img" aria-label="En Service håller upp en lapp med app kolon api. Två poddar bär samma lapp och nås av heldragna pilar. Den tredje bär app kolon versalt API och pilen dit är streckad och överkryssad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M330 51 Q440 48 550 51 Q551 90 550 131 Q440 130 330 130 Q330 90 330 51 Z"/><path d="M440 132 Q441 145 440 156"/><path d="M369 157 Q440 157 509 159 Q511 180 510 201 Q440 203 369 201 Q370 180 369 157 Z"/><path d="M410 206 Q290 226 172 288"/><path d="M164 283 L170 296 L176 283"/><path d="M440 206 Q441 250 440 288"/><path d="M434 283 L440 296 L446 283"/><path d="M470 206 Q590 226 706 262" stroke-dasharray="8 9"/><path d="M707 265 L725 283"/><path d="M725 265 L707 283"/><path d="M69 300 Q160 300 250 301 Q252 340 251 381 Q160 380 69 381 Q68 340 69 300 Z"/><path d="M349 299 Q440 298 531 301 Q530 340 530 381 Q440 382 350 379 Q348 340 349 299 Z"/><path d="M630 300 Q720 300 809 299 Q811 340 809 381 Q720 382 630 380 Q629 340 630 300 Z"/><path d="M89 400 Q160 400 230 401 Q230 422 230 444 Q160 446 90 443 Q88 422 89 400 Z"/><path d="M369 399 Q440 398 511 401 Q511 422 509 444 Q440 445 370 445 Q370 422 369 399 Z"/><path d="M649 401 Q720 398 789 399 Q792 422 790 444 Q720 445 649 444 Q650 422 649 401 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="97">Service · api</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="160" y="347">pod</text>
    <text x="440" y="347">pod</text>
    <text x="720" y="347">pod</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="440" y="186">app: api</text>
    <text x="160" y="428">app: api</text>
    <text x="440" y="428">app: api</text>
    <text x="720" y="428">app: API</text>
  </g>
</svg>`,
  /* ---- Kubernetes 1.2 · Ingress-objektet vs Ingress-controllern — STIL: HANDRITAD ---- */
  "ingress-utan-controller": `
<svg viewBox="0 0 880 340" role="img" aria-label="Ingress-objektet till vänster, en tom streckad plats i mitten märkt finns inte, och tjänsten till höger. Båda pilarna är streckade.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M80 150 Q190 148 300 150 Q300 205 301 259 Q190 262 81 259 Q79 205 80 150 Z"/><path d="M360 151 Q470 149 579 150 Q581 205 580 261 Q470 260 361 260 Q360 205 360 151 Z" stroke-dasharray="8 9" opacity="0.38"/><path d="M640 151 Q730 150 819 150 Q820 205 821 260 Q730 260 639 260 Q639 205 640 151 Z"/><path d="M304 205 Q328 204 350 205" stroke-dasharray="7 8"/><path d="M343 199 L356 205 L343 211"/><path d="M584 205 Q606 204 628 205" stroke-dasharray="7 8"/><path d="M621 199 L634 205 L621 211"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="190" y="211">reglerna</text>
    <text x="730" y="211">api</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.4">
    <text x="470" y="211">finns inte</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="190" y="300">Ingress-objektet</text>
    <text x="470" y="300">Ingress-controllern</text>
    <text x="730" y="300">tjänsten</text>
  </g>
</svg>`,
  /* ---- Kubernetes 1.3 · Miljövariabel vs monterad fil — STIL: HANDRITAD ---- */
  "variabeln-star-kvar": `
<svg viewBox="0 0 880 360" role="img" aria-label="Samma container två gånger. Vid start har både miljövariabeln och den monterade filen värdet info. Efter en ändring i ConfigMap har bara filen bytt till debug.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M80 121 Q230 119 379 119 Q380 200 379 280 Q230 282 80 279 Q80 200 80 121 Z"/><path d="M95 207 Q230 205 365 207" opacity="0.4"/><path d="M499 121 Q650 118 799 120 Q801 200 801 281 Q650 280 501 280 Q498 200 499 121 Z"/><path d="M515 207 Q650 205 785 207" opacity="0.4"/><g stroke-width="1.1" opacity="0.26"><path d="M558 270 L512 224"/><path d="M604 270 L548 214"/><path d="M650 270 L594 214"/><path d="M696 270 L640 214"/><path d="M742 270 L686 214"/><path d="M788 270 L732 214"/><path d="M788 224 L778 214"/></g><path d="M386 200 Q440 199 484 200"/><path d="M477 194 L490 200 L477 206"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="265" y="180">LOG_LEVEL=info</text>
    <text x="265" y="235">/cfg/log=info</text>
    <text x="685" y="180">LOG_LEVEL=info</text>
    <text x="685" y="235">/cfg/log=debug</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="135" y="180">env</text>
    <text x="135" y="235">fil</text>
    <text x="555" y="180">env</text>
    <text x="555" y="235">fil</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="440" y="92">ConfigMap ändras</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="230" y="330">vid start</text>
    <text x="650" y="330">efteråt</text>
  </g>
</svg>`,
  /* ---- Terraform 1.1 · Vad drift är — STIL: HANDRITAD ---- */
  "driften-ar-avstandet": `
<svg viewBox="0 0 880 400" role="img" aria-label="main.tf säger size lika med 2 och verkligheten säger size lika med 8. Lådorna ligger på olika höjd och avståndet mellan dem är märkt drift. En konsol med muspekare pekar in i verkligheten.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M71 80 Q200 80 330 81 Q331 125 330 169 Q200 172 71 171 Q69 125 71 80 Z"/><path d="M70 239 Q180 238 290 241 Q291 285 290 330 Q180 331 70 330 Q70 285 70 239 Z"/><path d="M76 268 Q180 266 284 268"/><path d="M150 300 L150 322 L156 316 L161 326 L166 324 L161 314 L169 313 Z"/><path d="M380 240 Q510 239 640 240 Q640 285 639 330 Q510 331 381 331 Q379 285 380 240 Z"/><path d="M294 285 Q330 284 368 285"/><path d="M361 279 L374 285 L361 291"/><path d="M334 125 L752 125" stroke-dasharray="6 8" opacity="0.4"/><path d="M646 285 L752 285" stroke-dasharray="6 8" opacity="0.4"/><path d="M760 131 Q761 205 760 279"/><path d="M754 136 L760 123 L766 136"/><path d="M754 274 L760 287 L766 274"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="200" y="132">size = 2</text>
    <text x="510" y="292">size = 8</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="812" y="212">drift</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="200" y="206">main.tf</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="180" y="364">konsolen</text>
    <text x="510" y="364">verkligheten</text>
  </g>
</svg>`,
  /* ---- Terraform 1.2 · Resurstyp vs resursnamn vs name — STIL: HANDRITAD ---- */
  "tre-namn-i-blocket": `
<svg viewBox="0 0 880 340" role="img" aria-label="Ett resource-block där typen, resursnamnet och argumentet name är understrukna. Tre pilar leder ner till tre lådor märkta name, typen och resursnamnet, med ägaren under varje.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M198 84 Q311 82 424 84"/><path d="M438 84 Q455 82 472 84"/><path d="M128 132 Q229 130 330 132"/><path d="M230 138 Q206 170 187 196"/><path d="M179 191 L185 204 L191 191"/><path d="M400 90 Q422 140 432 194"/><path d="M429 191 L435 204 L441 191"/><path d="M455 90 Q580 130 695 194"/><path d="M694 191 L700 204 L706 191"/><path d="M90 210 Q185 209 280 211 Q282 240 279 270 Q185 270 91 270 Q89 240 90 210 Z"/><path d="M339 211 Q435 209 531 210 Q531 240 529 270 Q435 272 340 271 Q339 240 339 211 Z"/><path d="M590 211 Q700 209 809 210 Q810 240 810 271 Q700 270 589 271 Q589 240 590 211 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="end">
    <text x="186" y="70">resource</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="start">
    <text x="196" y="70">"azurerm_resource_group"</text>
    <text x="436" y="70">"rg"</text>
    <text x="484" y="70">{</text>
    <text x="128" y="118">name = "rg-shop-prod"</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="185" y="248">name</text>
    <text x="435" y="248">typen</text>
    <text x="700" y="248">resursnamnet</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="185" y="306">Azure</text>
    <text x="435" y="306">providern</text>
    <text x="700" y="306">din fil</text>
  </g>
</svg>`,
  /* ---- Linux 1.1 · Vad prompten säger — STIL: HANDRITAD ---- */
  "prompten-rad-for-rad": `
<svg viewBox="0 0 880 300" role="img" aria-label="Prompten lisa snabel-a shop-prod-01 kolon tilde dollar. Tre delar är understrukna med var sin pil ner till en låda. Sista tecknet har en anteckning bredvid sig.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M252 112 Q282 110 311 112"/><path d="M358 112 Q450 110 542 112"/><path d="M588 112 Q595 110 601 112"/><path d="M281 116 Q240 150 194 186"/><path d="M184 181 L190 194 L196 181"/><path d="M450 116 Q446 152 442 186"/><path d="M434 181 L440 194 L446 181"/><path d="M594 116 Q640 150 686 186"/><path d="M684 181 L690 194 L696 181"/><path d="M89 200 Q190 200 290 200 Q291 235 290 269 Q190 270 89 271 Q90 235 89 200 Z"/><path d="M340 199 Q440 198 539 201 Q542 235 541 270 Q440 271 340 270 Q339 235 340 199 Z"/><path d="M591 201 Q690 200 790 200 Q790 235 790 269 Q690 271 591 270 Q588 235 591 201 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="26" fill="currentColor" text-anchor="start">
    <text x="250" y="80">lisa</text>
    <text x="326" y="80">@</text>
    <text x="356" y="80">shop-prod-01</text>
    <text x="557" y="80">:</text>
    <text x="587" y="80">~</text>
    <text x="616" y="80">$</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start" opacity="0.62">
    <text x="672" y="86">$ vanlig · # root</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="190" y="244">användaren</text>
    <text x="440" y="244">maskinen</text>
    <text x="690" y="244">katalogen</text>
  </g>
</svg>`,
  /* ---- Linux 1.2 · Vad PATH är — STIL: HANDRITAD ---- */
  "path-raden": `
<svg viewBox="0 0 880 450" role="img" aria-label="Tre kataloger i en streckad ram märkt PATH genomsöks i tur och ordning och slutar i command not found. Katalogen du står i ligger utanför ramen.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M30 105 Q345 102 660 105 Q662 170 660 235 Q345 238 30 235 Q28 170 30 105 Z" stroke-dasharray="9 10" stroke-width="1.5" opacity="0.55"/><path d="M130 86 Q128 104 130 118"/><path d="M124 113 L130 126 L136 113"/><path d="M50 129 Q130 129 209 131 Q211 170 209 209 Q130 211 50 210 Q49 170 50 129 Z"/><path d="M251 131 Q350 129 449 131 Q450 170 451 211 Q350 210 249 211 Q250 170 251 131 Z"/><path d="M490 129 Q555 130 619 129 Q622 170 619 211 Q555 210 490 209 Q490 170 490 129 Z"/><path d="M214 170 Q229 169 238 170"/><path d="M231 164 L244 170 L231 176"/><path d="M454 170 Q469 169 478 170"/><path d="M465 164 L478 170 L465 176"/><path d="M624 170 Q638 169 646 170"/><path d="M639 164 L652 170 L639 176"/><path d="M250 311 Q380 309 510 311 Q512 350 511 391 Q380 391 249 390 Q250 350 250 311 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18" fill="currentColor" text-anchor="middle">
    <text x="130" y="58">deploy.sh</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="130" y="177">/usr/bin</text>
    <text x="350" y="177">/usr/local/bin</text>
    <text x="555" y="177">/bin</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start">
    <text x="668" y="176">command not found</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="380" y="357">./deploy.sh</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="345" y="272">PATH, i ordning</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="380" y="424">katalogen du står i</text>
  </g>
</svg>`,
  /* ---- Git 1.2 · Merge vs rebase — STIL: HANDRITAD ---- */
  "merge-vs-rebase": `
<svg viewBox="0 0 880 350" role="img" aria-label="Till vänster möts två utvecklingslinjer i en merge-commit. Till höger ligger samma commits på en rak linje, men två av dem har fått primtecken för att visa att de är nya objekt.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M70 93 Q95 95 95 119 Q95 145 70 145 Q45 145 44 119 Q45 95 70 93 Z"/><path d="M160 94 Q185 95 186 121 Q185 145 159 147 Q135 145 134 120 Q135 95 160 94 Z"/><path d="M380 95 Q405 95 406 120 Q405 145 381 145 Q355 145 354 120 Q355 95 380 95 Z"/><path d="M229 199 Q255 200 256 226 Q255 250 230 252 Q205 250 204 225 Q205 200 229 199 Z"/><path d="M321 198 Q345 200 347 225 Q345 250 320 252 Q295 250 294 225 Q295 200 321 198 Z"/><path d="M96 120 Q115 119 134 120"/><path d="M186 120 Q270 118 354 120"/><path d="M178 138 Q194 170 212 207"/><path d="M256 225 Q275 224 294 225"/><path d="M338 207 Q352 170 362 138"/><path d="M520 95 Q545 95 545 120 Q545 145 520 146 Q495 145 495 120 Q495 95 520 95 Z"/><path d="M611 94 Q635 95 636 119 Q635 145 610 147 Q585 145 584 121 Q585 95 611 94 Z"/><path d="M700 94 Q725 95 726 120 Q725 145 700 147 Q675 145 673 121 Q675 95 700 94 Z"/><path d="M791 94 Q815 95 815 120 Q815 145 789 145 Q765 145 765 120 Q765 95 791 94 Z"/><path d="M546 120 Q565 119 584 120"/><path d="M636 120 Q655 119 674 120"/><path d="M726 120 Q745 119 764 120"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="70" y="126">A</text>
    <text x="160" y="126">B</text>
    <text x="380" y="126">M</text>
    <text x="230" y="231">C</text>
    <text x="320" y="231">D</text>
    <text x="520" y="126">A</text>
    <text x="610" y="126">B</text>
    <text x="700" y="126">C'</text>
    <text x="790" y="126">D'</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="745" y="180">nya hashar</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="225" y="315">merge</text>
    <text x="655" y="315">rebase</text>
  </g>
</svg>`,
  /* ---- API 1.1 · Resurs vs databasrad — STIL: HANDRITAD ---- */
  "resursen-ar-ett-urval": `
<svg viewBox="0 0 880 430" role="img" aria-label="Databasraden till vänster har sex fält. Tre heldragna pilar går vidare till svaret till höger. Tre streckade pilar slutar i tomma luften.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 91 Q250 89 441 90 Q440 225 440 360 Q250 361 60 360 Q59 225 60 91 Z"/><path d="M62 135 Q250 134 438 135"/><path d="M62 180 Q250 179 438 180"/><path d="M62 225 Q250 224 438 225"/><path d="M62 270 Q250 269 438 270"/><path d="M62 315 Q250 314 438 315"/><path d="M290 92 Q291 225 290 358"/><path d="M581 89 Q720 90 859 89 Q862 158 861 226 Q720 226 580 225 Q578 158 581 89 Z"/><path d="M582 135 Q720 134 858 135"/><path d="M582 180 Q720 179 858 180"/><path d="M700 92 Q701 158 700 223"/><path d="M444 112 Q510 111 570 112"/><path d="M563 106 L576 112 L563 118"/><path d="M444 157 Q510 156 570 157"/><path d="M563 151 L576 157 L563 163"/><path d="M444 202 Q510 201 570 202"/><path d="M563 196 L576 202 L563 208"/><path d="M444 247 Q490 246 530 247" stroke-dasharray="7 8"/><path d="M444 292 Q490 291 530 292" stroke-dasharray="7 8"/><path d="M444 337 Q490 336 530 337" stroke-dasharray="7 8"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="175" y="120">id</text>
    <text x="365" y="120">8842</text>
    <text x="175" y="165">namn</text>
    <text x="365" y="165">Skruvmejsel</text>
    <text x="175" y="210">pris</text>
    <text x="365" y="210">149</text>
    <text x="175" y="255">inkopspris</text>
    <text x="365" y="255">62</text>
    <text x="175" y="300">leverantor_id</text>
    <text x="365" y="300">7</text>
    <text x="175" y="345">senast_andrad_av</text>
    <text x="365" y="345">lisa</text>
    <text x="640" y="120">id</text>
    <text x="780" y="120">8842</text>
    <text x="640" y="165">namn</text>
    <text x="780" y="165">Skruvmejsel</text>
    <text x="640" y="210">pris</text>
    <text x="780" y="210">149</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="250" y="400">databasraden</text>
    <text x="720" y="400">svaret</text>
  </g>
</svg>`,
  /* ---- API 1.1 · Validering i klienten är ingen validering — STIL: HANDRITAD ---- */
  "grinden-gar-att-runda": `
<svg viewBox="0 0 880 400" role="img" aria-label="Webbläsaren går genom formulärets kontroller till API:et. curl går utanför grinden och når API:et direkt.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M50 80 Q150 78 250 80 Q250 125 250 171 Q150 172 49 170 Q49 125 50 80 Z"/><path d="M361 70 Q460 69 559 70 Q560 125 560 181 Q460 181 361 180 Q358 125 361 70 Z"/><path d="M659 139 Q750 138 839 140 Q840 190 839 241 Q750 242 659 241 Q658 190 659 139 Z"/><path d="M51 269 Q150 269 249 271 Q252 315 251 361 Q150 361 51 359 Q50 315 51 269 Z"/><path d="M252 125 Q300 124 348 125"/><path d="M341 119 L354 125 L341 131"/><path d="M564 125 Q612 128 640 164"/><path d="M639 164 L652 170 L639 176"/><path d="M252 315 Q450 318 570 276 Q615 258 640 220"/><path d="M639 209 L652 215 L639 221"/>
  </g>
  <g font-family="var(--font-mono)" font-size="16.5" fill="currentColor" text-anchor="middle">
    <text x="150" y="132">webbläsaren</text>
    <text x="460" y="132">formuläret</text>
    <text x="750" y="196">API:et</text>
    <text x="150" y="322">curl</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="460" y="214">klientens kontroller</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="430" y="352">går runt</text>
  </g>
</svg>`,
  /* ---- API 1.2 · POST vs PUT vid skapande — STIL: HANDRITAD ---- */
  "vem-skriver-numret": `
<svg viewBox="0 0 880 430" role="img" aria-label="Vid POST skickas paketet utan nummer och servern sätter id 8842. Vid PUT står 8842 redan på paketet och servern lägger den där.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M79 81 Q190 79 301 79 Q302 135 299 190 Q190 190 81 189 Q80 135 79 81 Z"/><path d="M190 194 Q191 216 190 238"/><path d="M184 233 L190 246 L196 233"/><path d="M80 259 Q190 259 300 260 Q301 310 300 360 Q190 361 79 361 Q79 310 80 259 Z"/><path d="M580 81 Q690 79 801 81 Q802 135 800 190 Q690 191 579 191 Q579 135 580 81 Z"/><path d="M592 146 Q690 144 788 146" opacity="0.4"/><path d="M690 194 Q691 216 690 238"/><path d="M684 233 L690 246 L696 233"/><path d="M581 261 Q690 259 800 260 Q802 310 800 361 Q690 362 580 360 Q578 310 581 261 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="190" y="142">{ namn, pris }</text>
    <text x="690" y="126">{ namn, pris }</text>
    <text x="690" y="172">8842</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="190" y="300">servern</text>
    <text x="690" y="316">servern</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="190" y="332">id = 8842</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="190" y="400">POST /produkter</text>
    <text x="690" y="400">PUT /produkter/8842</text>
  </g>
</svg>`,
  /* ---- SQL 1.1 · Många till många — STIL: HANDRITAD ---- */
  "kopplingstabellen": `
<svg viewBox="0 0 880 340" role="img" aria-label="Tabellen produkt_taggar i mitten har tre rader. Varje rad pekar med en pil åt vänster mot en produkt och en pil åt höger mot en tagg. Två av pilarna korsar varandra.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M59 104 Q150 105 240 105 Q242 180 241 256 Q150 256 59 256 Q58 180 59 104 Z"/><path d="M62 180 Q150 179 238 180"/><path d="M341 91 Q470 88 600 91 Q602 180 600 269 Q470 272 340 271 Q338 180 341 91 Z"/><path d="M342 150 Q470 149 598 150"/><path d="M342 210 Q470 209 598 210"/><path d="M470 92 Q471 180 470 268"/><path d="M700 105 Q780 103 860 104 Q862 180 859 256 Q780 257 701 255 Q698 180 700 105 Z"/><path d="M702 180 Q780 179 858 180"/><path d="M760 107 Q761 180 760 253"/><path d="M336 120 Q292 124 256 138"/><path d="M336 180 Q292 172 256 148"/><path d="M261 136 L248 142 L261 148"/><path d="M336 240 Q292 234 256 212"/><path d="M261 211 L248 217 L261 223"/><path d="M604 120 Q650 124 688 138"/><path d="M604 240 Q650 210 688 148"/><path d="M683 136 L696 142 L683 148"/><path d="M604 180 Q650 190 688 212"/><path d="M683 211 L696 217 L683 223"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="150" y="150">8842</text>
    <text x="150" y="225">8843</text>
    <text x="405" y="127">8842</text>
    <text x="535" y="127">3</text>
    <text x="405" y="187">8842</text>
    <text x="535" y="187">7</text>
    <text x="405" y="247">8843</text>
    <text x="535" y="247">3</text>
    <text x="730" y="150">3</text>
    <text x="810" y="150">rea</text>
    <text x="730" y="225">7</text>
    <text x="810" y="225">nyhet</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="150" y="310">produkter</text>
    <text x="470" y="310">produkt_taggar</text>
    <text x="780" y="310">taggar</text>
  </g>
</svg>`,
  /* ---- Azure 1.0 · Resurs-ID:t är hela adressen — STIL: HANDRITAD ---- */
  "resurs-id-raden": `
<svg viewBox="0 0 768 336" role="img" aria-label="Ett resurs-ID brutet på fyra rader i en ruta. Varje rad har en pil åt höger till sitt namn: prenumeration, resursgrupp, leverantör och resurs.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 57 Q295 54 531 56 Q531 170 530 284 Q295 285 59 283 Q59 170 60 57 Z"/><path d="M64 113 Q300 112 528 113" stroke-dasharray="6 7" opacity="0.45"/><path d="M64 170 Q300 169 528 170" stroke-dasharray="6 7" opacity="0.45"/><path d="M64 227 Q300 226 528 227" stroke-dasharray="6 7" opacity="0.45"/><path d="M536 84 Q552 85 566 84"/><path d="M562 78 L572 84 L562 90"/><path d="M536 141 Q552 142 566 141"/><path d="M562 135 L572 141 L562 147"/><path d="M536 198 Q552 199 566 198"/><path d="M562 192 L572 198 L562 204"/><path d="M536 255 Q552 256 566 255"/><path d="M562 249 L572 255 L562 261"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13.5" fill="currentColor" text-anchor="start">
    <text x="78" y="89">/subscriptions/12345678-…-90ab</text>
    <text x="78" y="146">/resourceGroups/shop-prod</text>
    <text x="78" y="203">/providers/Microsoft.Storage</text>
    <text x="78" y="260">/storageAccounts/shopbilder</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="start">
    <text x="590" y="89">prenumeration</text>
    <text x="590" y="146">resursgrupp</text>
    <text x="590" y="203">leverantör</text>
    <text x="590" y="260">resurs</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="295" y="320">ett resurs-ID</text>
  </g>
</svg>`,
  /* ---- Azure 1.0 · Logisk zon vs fysisk zon — STIL: HANDRITAD ---- */
  "zon-ettan": `
<svg viewBox="0 0 880 420" role="img" aria-label="Tre hus i en streckad region. Två klippbräden under regionen, båda märkta zon 1, pekar med streckade pilar upp mot olika hus.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M241 29 Q540 29 840 30 Q842 125 839 221 Q540 221 239 220 Q239 125 241 29 Z" stroke-dasharray="9 10" opacity="0.45"/><path d="M280 96 Q350 96 419 95 Q420 139 421 182 Q350 183 279 182 Q279 139 280 96 Z"/><path d="M266 98 L350 46 L434 98"/><path d="M480 95 Q550 96 619 97 Q621 139 621 182 Q550 184 480 181 Q480 139 480 95 Z"/><path d="M466 98 L550 46 L634 98"/><path d="M681 97 Q750 95 819 95 Q822 139 819 181 Q750 183 679 181 Q680 139 681 97 Z"/><path d="M666 98 L750 46 L834 98"/><path d="M60 269 Q160 270 261 271 Q262 307 259 343 Q160 346 59 344 Q58 307 60 269 Z"/><path d="M341 271 Q440 269 540 271 Q541 307 539 343 Q440 345 341 345 Q340 307 341 271 Z"/><path d="M160 266 Q230 232 344 196" stroke-dasharray="8 9"/><path d="M344 204 L350 191 L356 204"/><path d="M440 266 Q580 242 744 196" stroke-dasharray="8 9"/><path d="M744 204 L750 191 L756 204"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="350" y="150">az1</text>
    <text x="550" y="150">az2</text>
    <text x="750" y="150">az3</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="163" y="314">zon 1</text>
    <text x="443" y="314">zon 1</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.55">
    <text x="540" y="208">swedencentral</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13.5" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="163" y="368">Prenumeration A</text>
    <text x="443" y="368">Prenumeration B</text>
  </g>
</svg>`,
  /* ---- Azure 1.1 · Container Apps skalar till noll — STIL: HANDRITAD ---- */
  "skala-till-noll": `
<svg viewBox="0 0 880 380" role="img" aria-label="Till vänster två repliker på en heldragen platta märkt dagtid. Till höger en streckad tom platta märkt natten, med en mätare som står på noll.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M59 248 Q230 247 399 247 Q400 260 400 271 Q230 274 59 271 Q58 260 59 248 Z"/><path d="M479 249 Q650 246 819 249 Q822 260 821 273 Q650 274 479 272 Q479 260 479 249 Z" stroke-dasharray="8 9" opacity="0.35"/><path d="M90 158 Q150 158 211 158 Q211 201 210 243 Q150 244 89 243 Q90 201 90 158 Z"/><path d="M239 158 Q300 157 359 157 Q362 201 361 244 Q300 244 239 244 Q240 201 239 158 Z"/><path d="M509 159 Q570 157 630 157 Q632 201 630 243 Q570 246 509 243 Q510 201 509 159 Z" stroke-dasharray="7 8" opacity="0.28"/><path d="M659 157 Q720 158 781 157 Q781 201 781 244 Q720 244 661 243 Q658 201 659 157 Z" stroke-dasharray="7 8" opacity="0.28"/><path d="M821 170 Q849 171 849 200 Q849 229 821 229 Q791 229 790 199 Q791 171 821 170 Z"/><path d="M820 200 Q806 194 800 184"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="150" y="208">replik</text>
    <text x="300" y="208">replik</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="820" y="208">0</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="230" y="318">dagtid</text>
    <text x="650" y="318">natten</text>
  </g>
</svg>`,
  /* ---- Azure 1.1 · Stoppad vs frigjord virtuell maskin — STIL: HANDRITAD ---- */
  "stoppad-vs-frigjord": `
<svg viewBox="0 0 880 400" role="img" aria-label="Två avstängda serverlådor. Den vänstra står på en skrafferad platta märkt hårdvaran reserverad, den högra svävar över en streckad tom platta märkt hårdvaran släppt.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M59 269 Q220 266 381 267 Q380 281 379 293 Q220 295 60 294 Q59 281 59 269 Z"/><g stroke-width="1.1" opacity="0.42"><path d="M88 290 L70 272"/><path d="M110 290 L92 272"/><path d="M132 290 L114 272"/><path d="M154 290 L136 272"/><path d="M176 290 L158 272"/><path d="M198 290 L180 272"/><path d="M220 290 L202 272"/><path d="M242 290 L224 272"/><path d="M264 290 L246 272"/><path d="M286 290 L268 272"/><path d="M308 290 L290 272"/><path d="M330 290 L312 272"/><path d="M352 290 L334 272"/><path d="M374 290 L356 272"/></g><path d="M111 130 Q220 130 329 129 Q331 196 331 262 Q220 264 111 261 Q110 196 111 130 Z"/><path d="M300 138 Q313 139 314 152 Q313 165 301 164 Q287 165 286 153 Q287 139 300 138 Z"/><path d="M300 143 Q301 150 300 157"/><path d="M500 267 Q660 266 820 268 Q822 281 819 294 Q660 296 500 294 Q500 281 500 267 Z" stroke-dasharray="8 9" opacity="0.33"/><path d="M550 111 Q660 109 770 111 Q771 176 769 243 Q660 243 551 242 Q548 176 550 111 Z"/><path d="M741 118 Q753 119 752 131 Q753 145 739 146 Q727 145 726 131 Q727 119 741 118 Z"/><path d="M740 123 Q741 130 740 137"/>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="220" y="200">VM</text>
    <text x="660" y="180">VM</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13.5" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="220" y="330">hårdvaran reserverad</text>
    <text x="660" y="330">hårdvaran släppt</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="220" y="376">stoppad</text>
    <text x="660" y="376">frigjord</text>
  </g>
</svg>`,
  /* ---- AWS 1.0 · ARN:ens anatomi — STIL: HANDRITAD ---- */
  "arn-raden": `
<svg viewBox="0 0 880 244" role="img" aria-label="En ARN uppdelad i sex rutor med en pil ner till varje dels namn. Rutorna för region och konto är tomma och skrafferade.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M149 73 Q440 74 730 74 Q733 99 731 124 Q440 124 149 123 Q147 99 149 73 Z"/><path d="M245 78 Q246 100 245 120" stroke-dasharray="6 7" opacity="0.5"/><path d="M341 78 Q342 100 341 120" stroke-dasharray="6 7" opacity="0.5"/><path d="M421 78 Q422 100 421 120" stroke-dasharray="6 7" opacity="0.5"/><path d="M501 78 Q502 100 501 120" stroke-dasharray="6 7" opacity="0.5"/><path d="M581 78 Q582 100 581 120" stroke-dasharray="6 7" opacity="0.5"/><g stroke-width="1.1" opacity="0.42"><path d="M445 120 L425 100"/><path d="M465 120 L425 80"/><path d="M485 120 L443 78"/><path d="M497 112 L463 78"/><path d="M497 92 L483 78"/></g><g stroke-width="1.1" opacity="0.42"><path d="M525 120 L505 100"/><path d="M545 120 L505 80"/><path d="M565 120 L523 78"/><path d="M577 112 L543 78"/><path d="M577 92 L563 78"/></g><path d="M197 130 Q198 148 197 164"/><path d="M191.0 160 L197.0 170 L203.0 160"/><path d="M293 130 Q294 148 293 164"/><path d="M287.0 160 L293.0 170 L299.0 160"/><path d="M381 130 Q382 148 381 164"/><path d="M375.0 160 L381.0 170 L387.0 160"/><path d="M461 130 Q462 148 461 164"/><path d="M455.0 160 L461.0 170 L467.0 160"/><path d="M541 130 Q542 148 541 164"/><path d="M535.0 160 L541.0 170 L547.0 160"/><path d="M656 130 Q657 148 656 164"/><path d="M650.0 160 L656.0 170 L662.0 160"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="197.0" y="105">arn</text>
    <text x="293.0" y="105">aws</text>
    <text x="381.0" y="105">s3</text>
    <text x="656.0" y="105">min-hink</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14.5" fill="currentColor" text-anchor="middle">
    <text x="197.0" y="200">prefix</text>
    <text x="293.0" y="200">partition</text>
    <text x="381.0" y="200">tjänst</text>
    <text x="461.0" y="200">region</text>
    <text x="541.0" y="200">konto</text>
    <text x="656.0" y="200">resurs</text>
  </g>
</svg>`,
  /* ---- AWS 1.0 · Resursgrupp vs taggar — STIL: HANDRITAD ---- */
  "taggen-inte-behallaren": `
<svg viewBox="0 0 880 384" role="img" aria-label="Till vänster två lådor inuti en ram. Till höger två fristående lådor med varsin hängande lapp, omslutna av en streckad ellips.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M70 101 Q235 100 401 101 Q402 190 401 281 Q235 280 69 280 Q69 190 70 101 Z"/><path d="M105 146 Q160 146 215 145 Q217 188 215 230 Q160 232 104 229 Q104 188 105 146 Z"/><path d="M246 147 Q300 145 356 145 Q357 188 355 229 Q300 231 245 229 Q243 188 246 147 Z"/><path d="M520 146 Q575 146 631 145 Q631 188 630 230 Q575 230 519 230 Q519 188 520 146 Z"/><path d="M700 145 Q755 144 809 145 Q811 188 810 230 Q755 232 699 229 Q699 188 700 145 Z"/><path d="M573 230 Q574 240 573 250"/><path d="M546 250 Q573 248 599 249 Q601 264 600 277 Q573 280 546 279 Q544 264 546 250 Z"/><path d="M753 230 Q754 240 753 250"/><path d="M727 251 Q753 250 780 250 Q781 264 781 278 Q753 278 726 279 Q725 264 727 251 Z"/><path d="M660 82 Q856 84 859 201 Q856 316 660 318 Q464 316 460 200 Q464 84 660 82 Z" stroke-dasharray="9 10" opacity="0.45"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle">
    <text x="573" y="268">prod</text>
    <text x="753" y="268">prod</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="235" y="352">resursgruppen</text>
    <text x="660" y="352">taggarna</text>
  </g>
</svg>`,
  /* ---- AWS 1.1 · Fargate tar bort noden — STIL: HANDRITAD ---- */
  "fargate-utan-nod": `
<svg viewBox="0 0 880 366" role="img" aria-label="Till vänster två tasks som står på en heldragen instans. Till höger samma två tasks över en streckad, tom platta.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M70 219 Q235 220 399 220 Q400 259 400 298 Q235 299 69 298 Q69 259 70 219 Z"/><path d="M107 125 Q164 122 220 125 Q221 165 219 205 Q164 207 109 206 Q108 165 107 125 Z"/><path d="M249 123 Q306 123 363 125 Q364 165 361 206 Q306 208 250 206 Q249 165 249 123 Z"/><path d="M481 221 Q645 220 811 220 Q810 259 811 299 Q645 300 481 297 Q479 259 481 221 Z" stroke-dasharray="8 9" opacity="0.3"/><path d="M518 125 Q574 123 630 124 Q631 165 631 207 Q574 208 518 206 Q517 165 518 125 Z"/><path d="M660 124 Q716 122 772 124 Q773 165 773 207 Q716 206 660 206 Q659 165 660 124 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="164" y="172">task</text>
    <text x="306" y="172">task</text>
    <text x="574" y="172">task</text>
    <text x="716" y="172">task</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="235" y="266">EC2-instans</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.42">
    <text x="645" y="266">ingen instans</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="235" y="344">EC2-läget</text>
    <text x="645" y="344">Fargate</text>
  </g>
</svg>`,
  /* ---- AWS 1.1 · Publik vs elastisk IP — STIL: HANDRITAD ---- */
  "ip-lappen-byts": `
<svg viewBox="0 0 880 380" role="img" aria-label="Två maskiner med varsin skylt. Den vänstra skylten dras iväg av en streckad pil, den högra hålls fast av två spikar.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M80 85 Q200 85 321 86 Q322 151 321 217 Q200 216 81 215 Q78 151 80 85 Z"/><path d="M200 216 Q201 224 200 232"/><path d="M110 232 Q200 231 291 233 Q291 255 290 279 Q200 279 110 278 Q109 255 110 232 Z"/><path d="M298 255 Q342 264 374 252" stroke-dasharray="7 8"/><path d="M367 244 L380 250 L367 256"/><path d="M560 87 Q680 85 800 86 Q802 151 799 216 Q680 218 560 216 Q559 151 560 87 Z"/><path d="M680 216 Q681 224 680 232"/><path d="M590 232 Q680 232 771 232 Q772 255 770 279 Q680 279 589 278 Q588 255 590 232 Z"/><path d="M607 249 Q612 249 613 256 Q612 261 607 261 Q600 261 599 254 Q600 249 607 249 Z"/><path d="M754 249 Q760 249 759 254 Q760 261 754 261 Q748 261 748 256 Q748 249 754 249 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="200" y="158">EC2</text>
    <text x="680" y="158">EC2</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14.5" fill="currentColor" text-anchor="middle">
    <text x="200" y="262">52.16.7.9</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14.5" fill="currentColor" text-anchor="middle">
    <text x="680" y="262">elastisk</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="200" y="344">publik IP</text>
    <text x="680" y="344">elastisk IP</text>
  </g>
</svg>`,
  /* ---- CI/CD 1.0 · Artefakt vs cache — STIL: HANDRITAD ---- */
  "artefakten-och-cachen": `
<svg viewBox="0 0 880 380" role="img" aria-label="Till vänster lämnas en låda vidare mellan två jobb med heldragna pilar. Till höger går en streckad dubbelriktad linje mellan ett jobb och en låda på en hylla.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 149 Q125 150 190 151 Q191 195 190 240 Q125 241 59 240 Q58 195 60 149 Z"/><path d="M194 195 Q202 196 210 195"/><path d="M203 189 L216 195 L203 201"/><path d="M222 166 Q255 164 287 166 Q288 195 288 225 Q255 226 222 224 Q220 195 222 166 Z"/><path d="M292 195 Q300 196 308 195"/><path d="M301 189 L314 195 L301 201"/><path d="M319 149 Q385 150 450 151 Q451 195 450 241 Q385 242 319 239 Q319 195 319 149 Z"/><path d="M540 150 Q660 148 790 150"/><path d="M542 162 Q660 160 788 162"/><path d="M544 162 Q542 186 546 208"/><path d="M786 161 Q788 186 784 208"/><path d="M605 87 Q666 86 725 89 Q728 117 726 146 Q666 147 606 146 Q606 117 605 87 Z"/><path d="M600 250 Q670 250 739 249 Q741 293 741 337 Q670 337 600 337 Q600 293 600 250 Z"/><path d="M668 244 Q670 208 668 172" stroke-dasharray="7 8"/><path d="M662 179 L668 166 L674 179"/><path d="M662 237 L668 250 L674 237"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="125" y="200">jobb 1</text>
    <text x="385" y="200">jobb 2</text>
    <text x="670" y="298">jobb</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="255" y="364">artefakten</text>
    <text x="665" y="364">cachen</text>
  </g>
</svg>`,
  /* ---- CI/CD 1.1 · Matrisen — STIL: HANDRITAD ---- */
  "matrisen-fyra-korningar": `
<svg viewBox="0 0 880 380" role="img" aria-label="Ett jobb till vänster med fyra pilar ut till ett rutnät med fyra jobb, ett per kombination av Node-version och operativsystem.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M70 149 Q150 149 230 149 Q230 200 230 249 Q150 251 71 250 Q68 200 70 149 Z"/><path d="M430 79 Q510 77 589 78 Q592 126 591 173 Q510 174 430 175 Q428 126 430 79 Z"/><path d="M430 207 Q510 207 591 207 Q590 256 590 303 Q510 304 430 304 Q430 256 430 207 Z"/><path d="M620 77 Q700 76 779 77 Q781 126 779 173 Q700 174 620 174 Q618 126 620 77 Z"/><path d="M621 207 Q700 207 780 209 Q782 256 781 303 Q700 304 620 305 Q620 256 621 207 Z"/><path d="M232 186 Q330 150 420 126"/><path d="M413 120 L426 126 L413 132"/><path d="M232 194 Q330 176 420 176"/><path d="M413 170 L426 176 L413 182"/><path d="M232 206 Q330 214 420 240"/><path d="M413 234 L426 240 L413 246"/><path d="M232 214 Q330 240 420 290"/><path d="M413 284 L426 290 L413 296"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="150" y="206">ett jobb</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="510" y="116">22</text>
    <text x="700" y="116">22</text>
    <text x="510" y="246">24</text>
    <text x="700" y="246">24</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13.5" fill="currentColor" text-anchor="middle" opacity="0.7">
    <text x="510" y="148">ubuntu</text>
    <text x="700" y="148">windows</text>
    <text x="510" y="278">ubuntu</text>
    <text x="700" y="278">windows</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="150" y="352">i filen</text>
    <text x="605" y="352">fyra jobb</text>
  </g>
</svg>`,
  /* ---- CI/CD 1.1 · Nyckeln som upphör — STIL: HANDRITAD ---- */
  "nyckeln-som-upphor": `
<svg viewBox="0 0 880 356" role="img" aria-label="Till vänster en heldragen nyckel som hänger på en ring. Till höger samma nyckel ritad med streckade linjer, inuti en streckad ram.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M141 125 Q183 127 184 170 Q183 213 139 215 Q97 213 96 170 Q97 127 141 125 Z"/><path d="M184 170 Q196 171 208 170"/><path d="M238 140 Q267 141 268 169 Q267 199 237 201 Q209 199 208 170 Q209 141 238 140 Z"/><path d="M265 158 Q341 156 416 158 Q418 170 416 181 Q341 182 266 181 Q265 170 265 158 Z"/><path d="M353 183 Q359 181 367 183 Q367 192 365 201 Q359 203 351 202 Q351 192 353 183 Z"/><path d="M378 181 Q385 182 393 182 Q394 192 392 201 Q385 202 377 203 Q376 192 378 181 Z"/><path d="M555 103 Q706 104 856 104 Q857 170 855 236 Q706 238 556 235 Q554 170 555 103 Z" stroke-dasharray="9 10" opacity="0.4"/><path d="M616 140 Q645 141 646 169 Q645 199 617 201 Q587 199 585 169 Q587 141 616 140 Z" stroke-dasharray="7 8" opacity="0.5"/><path d="M645 158 Q719 158 793 157 Q794 170 793 183 Q719 183 643 183 Q643 170 645 158 Z" stroke-dasharray="7 8" opacity="0.5"/><path d="M731 183 Q737 182 743 181 Q746 192 745 202 Q737 203 731 202 Q729 192 731 183 Z" stroke-dasharray="7 8" opacity="0.5"/><path d="M755 182 Q763 181 770 182 Q772 192 771 201 Q763 202 757 201 Q755 192 755 182 Z" stroke-dasharray="7 8" opacity="0.5"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="290" y="318">secret</text>
    <text x="706" y="318">OIDC-token</text>
  </g>
</svg>`,
  /* ---- Observability 1.0 · De tre signalerna — STIL: HANDRITAD ---- */
  "tre-signalerna": `
<svg viewBox="0 0 880 400" role="img" aria-label="En uppslagen bok, en mätare med visare, och tre lådor med en rak tråd som går genom alla tre med en knut i varje.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M71 110 Q185 109 300 109 Q300 185 299 260 Q185 261 70 259 Q69 185 71 110 Z"/><path d="M185 112 Q186 184 185 258"/><path d="M96 146 Q140 145 172 146"/><path d="M198 146 Q242 145 274 146"/><path d="M96 176 Q140 175 172 176"/><path d="M198 176 Q242 175 274 176"/><path d="M96 206 Q140 205 172 206"/><path d="M198 206 Q242 205 274 206"/><path d="M96 236 Q140 235 172 236"/><path d="M198 236 Q242 235 274 236"/><path d="M474 106 Q551 109 553 185 Q551 261 476 263 Q399 261 397 186 Q399 109 474 106 Z"/><path d="M475 185 Q452 168 436 142"/><path d="M474 178 Q482 178 482 186 Q482 192 475 193 Q468 192 467 185 Q468 178 474 178 Z"/><path d="M420 145 L429 152"/><path d="M475 117 L475 128"/><path d="M530 145 L521 152"/><path d="M660 118 Q750 116 841 119 Q840 144 839 169 Q750 170 660 169 Q659 144 660 118 Z"/><path d="M660 193 Q750 194 840 194 Q842 220 840 245 Q750 246 659 245 Q660 220 660 193 Z"/><path d="M661 270 Q750 270 839 270 Q841 296 840 321 Q750 323 660 321 Q660 296 661 270 Z"/><path d="M750 100 Q754 220 750 340" stroke-width="1.6"/><path d="M750 136 Q757 137 756 143 Q757 151 749 152 Q743 151 744 144 Q743 137 750 136 Z"/><path d="M749 213 Q757 213 758 221 Q757 227 749 228 Q743 227 744 221 Q743 213 749 213 Z"/><path d="M750 288 Q757 289 758 296 Q757 303 750 303 Q743 303 743 297 Q743 289 750 288 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="185" y="352">logg</text>
    <text x="475" y="352">mätvärde</text>
    <text x="750" y="368">spårning</text>
  </g>
</svg>`,
  /* ---- Observability 1.0 · Kardinalitetsexplosionen — STIL: HANDRITAD ---- */
  "kardinalitetsexplosionen": `
<svg viewBox="0 0 880 380" role="img" aria-label="Två hyllor. Den vänstra har fem lådor med luft emellan, den högra är proppfull av smala lådor.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M56 236 Q230 234 404 236"/><path d="M56 248 Q230 246 404 248"/><path d="M60 248 Q58 272 62 294"/><path d="M400 247 Q402 272 398 294"/><path d="M71 149 Q99 149 126 150 Q127 193 127 236 Q99 236 73 237 Q71 193 71 149 Z"/><path d="M140 149 Q167 149 194 149 Q194 193 194 237 Q167 238 139 235 Q138 193 140 149 Z"/><path d="M209 151 Q235 149 263 150 Q263 193 261 236 Q235 237 208 236 Q208 193 209 151 Z"/><path d="M277 149 Q303 149 330 150 Q331 193 330 236 Q303 238 275 235 Q276 193 277 149 Z"/><path d="M345 151 Q371 149 399 150 Q399 193 399 235 Q371 238 344 236 Q343 193 345 151 Z"/><path d="M476 236 Q650 234 824 236"/><path d="M476 248 Q650 246 824 248"/><path d="M480 248 Q478 272 482 294"/><path d="M820 247 Q822 272 818 294"/><path d="M482 150 Q489 148 496 151 Q497 193 495 235 Q489 237 482 236 Q481 193 482 150 Z" stroke-width="1.4"/><path d="M499 150 Q506 148 513 150 Q515 193 512 235 Q506 236 500 236 Q497 193 499 150 Z" stroke-width="1.4"/><path d="M516 149 Q523 149 530 150 Q530 193 529 236 Q523 237 515 236 Q514 193 516 149 Z" stroke-width="1.4"/><path d="M533 151 Q540 148 547 151 Q549 193 548 235 Q540 237 534 237 Q531 193 533 151 Z" stroke-width="1.4"/><path d="M551 150 Q557 148 565 149 Q565 193 565 235 Q557 236 549 236 Q549 193 551 150 Z" stroke-width="1.4"/><path d="M567 150 Q574 148 582 150 Q583 193 582 236 Q574 237 568 237 Q567 193 567 150 Z" stroke-width="1.4"/><path d="M584 151 Q591 149 597 150 Q598 193 599 237 Q591 237 585 235 Q584 193 584 151 Z" stroke-width="1.4"/><path d="M600 151 Q608 148 615 149 Q615 193 614 236 Q608 236 602 236 Q601 193 600 151 Z" stroke-width="1.4"/><path d="M617 150 Q625 149 631 150 Q634 193 632 235 Q625 238 619 236 Q616 193 617 150 Z" stroke-width="1.4"/><path d="M635 149 Q642 149 649 151 Q650 193 650 235 Q642 237 634 237 Q633 193 635 149 Z" stroke-width="1.4"/><path d="M653 150 Q659 149 667 150 Q666 193 665 236 Q659 236 651 237 Q651 193 653 150 Z" stroke-width="1.4"/><path d="M669 150 Q676 149 683 150 Q685 193 682 236 Q676 236 669 235 Q667 193 669 150 Z" stroke-width="1.4"/><path d="M686 149 Q693 150 699 150 Q700 193 699 236 Q693 237 686 237 Q686 193 686 149 Z" stroke-width="1.4"/><path d="M704 151 Q710 150 717 150 Q718 193 717 235 Q710 237 704 237 Q703 193 704 151 Z" stroke-width="1.4"/><path d="M721 150 Q727 149 734 150 Q736 193 734 236 Q727 237 719 236 Q719 193 721 150 Z" stroke-width="1.4"/><path d="M736 149 Q744 149 751 149 Q752 193 750 237 Q744 236 737 236 Q735 193 736 149 Z" stroke-width="1.4"/><path d="M754 150 Q761 148 769 150 Q768 193 769 236 Q761 237 755 236 Q754 193 754 150 Z" stroke-width="1.4"/><path d="M771 151 Q778 148 785 151 Q785 193 784 236 Q778 236 772 235 Q769 193 771 151 Z" stroke-width="1.4"/><path d="M788 149 Q795 150 802 149 Q804 193 802 237 Q795 237 788 235 Q786 193 788 149 Z" stroke-width="1.4"/><path d="M806 151 Q812 150 819 149 Q819 193 818 236 Q812 237 806 236 Q805 193 806 151 Z" stroke-width="1.4"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="230" y="346">status</text>
    <text x="650" y="346">status + user_id</text>
  </g>
</svg>`,
  /* ---- Observability 1.1 · Pull vs push — STIL: HANDRITAD ---- */
  "pull-och-push": `
<svg viewBox="0 0 880 386" role="img" aria-label="Till vänster hämtar en databas från två tjänster med pilar som pekar mot databasen. Till höger skickar tjänsterna själva, med pilar som pekar från dem.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 86 Q120 85 180 86 Q181 118 179 150 Q120 151 59 150 Q58 118 60 86 Z"/><path d="M60 215 Q120 215 181 216 Q180 248 181 279 Q120 280 60 281 Q58 248 60 215 Z"/><path d="M277 145 Q342 145 409 146 Q409 188 408 230 Q342 232 276 230 Q274 188 277 145 Z"/><path d="M270 174 Q226 148 186 122"/><path d="M193 112 L180 118 L193 124"/><path d="M270 202 Q226 228 186 248"/><path d="M193 245 L180 251 L193 257"/><path d="M479 87 Q538 85 599 86 Q600 118 599 151 Q538 150 478 149 Q476 118 479 87 Z"/><path d="M478 216 Q538 214 599 216 Q598 248 599 279 Q538 280 479 279 Q477 248 478 216 Z"/><path d="M694 145 Q760 144 827 146 Q826 188 825 229 Q760 232 695 231 Q692 188 694 145 Z"/><path d="M604 122 Q648 148 688 174"/><path d="M681 172 L694 178 L681 184"/><path d="M604 248 Q648 228 688 202"/><path d="M681 192 L694 198 L681 204"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="120" y="124">tjänst</text>
    <text x="120" y="254">tjänst</text>
    <text x="538" y="124">tjänst</text>
    <text x="538" y="254">tjänst</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="342" y="194">db</text>
    <text x="760" y="194">db</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="234" y="352">pull</text>
    <text x="652" y="352">push</text>
  </g>
</svg>`,
  /* ---- Observability 1.1 · Medelvärdet döljer svansen — STIL: HANDRITAD ---- */
  "medelvardet-doljer-svansen": `
<svg viewBox="0 0 880 372" role="img" aria-label="Elva staplar som växer åt höger. En vågrät linje märkt medel ligger lågt och passerar under den sista, mycket högre stapeln, som är märkt p95.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M71 230 Q94 228 118 230 Q120 249 119 268 Q94 268 70 269 Q69 249 71 230 Z"/><path d="M136 225 Q160 222 183 224 Q184 246 184 269 Q160 268 137 268 Q135 246 136 225 Z"/><path d="M201 217 Q226 216 251 218 Q252 243 250 269 Q226 270 201 268 Q200 243 201 217 Z"/><path d="M269 215 Q292 213 315 214 Q317 241 316 269 Q292 269 267 268 Q268 241 269 215 Z"/><path d="M333 211 Q358 209 382 211 Q382 239 383 267 Q358 268 335 269 Q334 239 333 211 Z"/><path d="M399 207 Q424 205 447 207 Q450 237 447 267 Q424 270 400 267 Q400 237 399 207 Z"/><path d="M467 201 Q490 201 513 203 Q514 235 514 267 Q490 268 466 267 Q466 235 467 201 Z"/><path d="M532 197 Q556 194 579 196 Q582 232 579 268 Q556 269 531 268 Q530 232 532 197 Z"/><path d="M598 188 Q622 186 647 188 Q646 228 645 269 Q622 268 599 269 Q596 228 598 188 Z"/><path d="M663 172 Q688 171 712 172 Q713 220 712 267 Q688 269 664 268 Q664 220 663 172 Z"/><path d="M731 119 Q754 117 778 118 Q778 193 778 269 Q754 270 730 268 Q728 193 731 119 Z"/><path d="M56 208 Q440 206 824 208" stroke-dasharray="9 9"/><path d="M796 118 Q798 152 796 186"/><path d="M790 179 L796 192 L802 179"/><path d="M60 288 Q440 290 824 288" opacity="0.5"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="start" opacity="0.75">
    <text x="62" y="200">medel</text>
  </g>
  <g font-family="var(--font-mono)" font-size="16" fill="currentColor" text-anchor="middle">
    <text x="796" y="108">p95</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="440" y="332">svarstider, sorterade</text>
  </g>
</svg>`,
  /* ---- Cyber 1.0 · Hotet och sprickan — STIL: HANDRITAD ---- */
  "hotet-och-sprickan": `
<svg viewBox="0 0 880 380" role="img" aria-label="Ett streckat moln till vänster med en streckad pil mot en heldragen tegelvägg till höger, där en spricka går genom väggen.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M146 97 Q236 97 237 140 Q236 183 146 183 Q56 183 53 139 Q56 97 146 97 Z" stroke-dasharray="8 9"/><path d="M119 85 Q159 85 161 109 Q159 135 118 136 Q77 135 76 110 Q77 85 119 85 Z" stroke-dasharray="8 9"/><path d="M180 93 Q213 92 213 115 Q213 136 181 136 Q147 136 146 115 Q147 92 180 93 Z" stroke-dasharray="8 9"/><path d="M469 96 Q630 95 791 96 Q791 191 791 286 Q630 287 470 286 Q469 191 469 96 Z"/><path d="M472 144 Q630 142 788 144"/><path d="M472 191 Q630 190 788 191"/><path d="M472 238 Q630 238 788 238"/><path d="M576 98 Q577 191 576 284"/><path d="M682 98 Q683 191 682 284"/><path d="M620 98 L636 138 L612 174 L640 216 L616 254 L630 286"/><path d="M234 132 Q380 128 596 152" stroke-dasharray="8 9"/><path d="M589 148 L602 154 L589 160"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="140" y="340">hot</text>
    <text x="630" y="340">sårbarhet</text>
  </g>
</svg>`,
  /* ---- Cyber 1.0 · Förtroendegränsen — STIL: HANDRITAD ---- */
  "fortroendegransen": `
<svg viewBox="0 0 880 360" role="img" aria-label="En streckad lodrät linje delar bilden. En pil från internet korsar linjen genom en kontrollpunkt in i appen. En andra pil från appen till databasen korsar ingenting.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M400 40 Q403 170 400 300" stroke-dasharray="9 10" opacity="0.5"/><path d="M69 140 Q170 138 269 141 Q270 185 270 231 Q170 232 70 230 Q69 185 69 140 Z"/><path d="M490 78 Q580 78 671 77 Q672 120 669 163 Q580 164 490 162 Q488 120 490 78 Z"/><path d="M490 207 Q580 206 671 205 Q671 248 669 289 Q580 291 489 290 Q488 248 490 207 Z"/><path d="M274 184 Q350 168 476 128"/><path d="M469 120 L482 126 L469 132"/><path d="M400 136 Q415 135 415 150 Q415 165 400 166 Q385 165 386 149 Q385 135 400 136 Z"/><path d="M580 166 Q582 184 580 198"/><path d="M574 191 L580 204 L586 191"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="170" y="192">internet</text>
    <text x="580" y="126">app</text>
    <text x="580" y="254">databas</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="170" y="330">obetrott</text>
    <text x="580" y="330">betrott</text>
  </g>
</svg>`,
  /* ---- Cyber 1.1 · Injektionen bryter ut — STIL: HANDRITAD ---- */
  "injektionen-bryter-ut": `
<svg viewBox="0 0 880 392" role="img" aria-label="Två likadana remsor med en streckad lucka. I den övre ryms lappen i luckan, i den undre är lappen bredare än hela remsan och sticker ut på båda sidor.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M150 80 Q440 78 730 79 Q731 108 730 136 Q440 136 150 135 Q148 108 150 80 Z"/><path d="M391 87 Q460 86 530 87 Q531 108 531 127 Q460 130 390 129 Q389 108 391 87 Z" stroke-dasharray="6 7" opacity="0.45"/><path d="M410 90 Q460 91 510 91 Q511 108 511 125 Q460 126 410 125 Q409 108 410 90 Z"/><path d="M151 239 Q440 240 731 241 Q731 268 730 296 Q440 297 150 295 Q149 268 151 239 Z"/><path d="M391 249 Q460 247 529 248 Q532 268 530 288 Q460 289 391 288 Q389 268 391 249 Z" stroke-dasharray="6 7" opacity="0.45"/><path d="M95 252 Q440 251 785 252 Q787 268 785 284 Q440 285 95 285 Q93 268 95 252 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="460" y="113">lisa</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle">
    <text x="440" y="273">' OR '1'='1</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="180">avsedd indata</text>
    <text x="440" y="352">indata som bryter ut</text>
  </g>
</svg>`,
  /* ---- Cyber 1.1 · XSS vs CSRF — STIL: HANDRITAD ---- */
  "xss-och-csrf": `
<svg viewBox="0 0 880 372" role="img" aria-label="Till vänster två pilar fram och tillbaka mellan angripare och webbläsare. Till höger en streckad pil ner i webbläsaren och en pil vidare till tjänsten, utan returpil.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M39 121 Q113 120 185 119 Q187 162 187 204 Q113 204 39 204 Q39 162 39 121 Z"/><path d="M252 120 Q327 118 403 121 Q404 162 403 203 Q327 204 252 204 Q250 162 252 120 Z"/><path d="M192 146 Q216 145 240 146"/><path d="M233 140 L246 146 L233 152"/><path d="M246 180 Q216 181 192 180"/><path d="M199 174 L186 180 L199 186"/><path d="M468 119 Q543 120 619 120 Q620 162 618 204 Q543 206 467 204 Q466 162 468 119 Z"/><path d="M687 119 Q763 120 838 120 Q838 162 838 204 Q763 206 688 204 Q687 162 687 119 Z"/><path d="M624 162 Q652 161 680 162"/><path d="M673 156 L686 162 L673 168"/><path d="M485 20 Q546 18 606 20 Q608 46 606 72 Q546 74 485 73 Q485 46 485 20 Z"/><path d="M546 74 Q548 92 546 108" stroke-dasharray="7 8"/><path d="M540 101 L546 114 L552 101"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="113" y="168">angripare</text>
    <text x="327" y="168">webbläsare</text>
    <text x="543" y="168">webbläsare</text>
    <text x="763" y="168">tjänsten</text>
    <text x="546" y="52">angripare</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="220" y="336">XSS</text>
    <text x="653" y="336">CSRF</text>
  </g>
</svg>`,
  /* ---- Git 1.2 · fetch vs pull — STIL: HANDRITAD ---- */
  "fetch-och-pull": `
<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler. I båda går en pil från origin ner till origin/main. Bara i den högra går en andra pil vidare till arbetskopian.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 57 Q125 56 190 57 Q190 85 189 114 Q125 115 60 113 Q58 85 60 57 Z"/><path d="M61 176 Q125 176 191 176 Q190 205 190 234 Q125 236 60 233 Q58 205 61 176 Z"/><path d="M249 175 Q325 175 401 177 Q400 205 400 234 Q325 234 249 235 Q249 205 249 175 Z"/><path d="M125 118 Q127 142 125 166"/><path d="M119 159 L125 172 L131 159"/><path d="M499 57 Q565 56 630 55 Q631 85 630 114 Q565 116 500 113 Q498 85 499 57 Z"/><path d="M501 177 Q565 174 630 175 Q631 205 630 234 Q565 236 499 234 Q499 205 501 177 Z"/><path d="M690 175 Q765 174 841 175 Q841 205 841 235 Q765 236 691 234 Q689 205 690 175 Z"/><path d="M565 118 Q567 142 565 166"/><path d="M559 159 L565 172 L571 159"/><path d="M634 205 Q660 204 684 205"/><path d="M677 199 L690 205 L677 211"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle">
    <text x="125" y="90">origin</text>
    <text x="125" y="210">origin/main</text>
    <text x="385" y="210">arbetskopian</text>
    <text x="565" y="90">origin</text>
    <text x="565" y="210">origin/main</text>
    <text x="825" y="210">arbetskopian</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="230" y="330">fetch</text>
    <text x="670" y="330">pull</text>
  </g>
</svg>`,
  /* ---- Git 1.2 · Squash vs merge-commit — STIL: HANDRITAD ---- */
  "squash-eller-merge": `
<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster tre commits ovanför huvudlinjen med en streckad pil ner till en enda commit. Till höger är de tre commitarna sammanbundna med huvudlinjen i båda ändar.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M50 220 Q220 218 390 220"/><path d="M81 209 Q90 210 90 221 Q90 230 80 230 Q70 230 69 219 Q70 210 81 209 Z"/><path d="M349 211 Q360 210 361 219 Q360 230 351 229 Q340 230 340 221 Q340 210 349 211 Z"/><path d="M160 150 Q205 149 250 150"/><path d="M160 142 Q169 141 169 149 Q169 159 160 159 Q151 159 150 151 Q151 141 160 142 Z"/><path d="M204 142 Q214 141 214 149 Q214 159 205 158 Q196 159 196 151 Q196 141 204 142 Z"/><path d="M250 141 Q259 141 258 150 Q259 159 249 159 Q241 159 240 150 Q241 141 250 141 Z"/><path d="M260 158 Q312 186 336 210" stroke-dasharray="7 8"/><path d="M329 209 L342 215 L329 221"/><path d="M490 220 Q660 218 830 220"/><path d="M520 210 Q530 210 530 219 Q530 230 519 231 Q510 230 510 221 Q510 210 520 210 Z"/><path d="M791 210 Q800 210 799 219 Q800 230 791 229 Q780 230 780 220 Q780 210 791 210 Z"/><path d="M600 150 Q645 149 690 150"/><path d="M599 141 Q609 141 608 150 Q609 159 600 159 Q591 159 590 150 Q591 141 599 141 Z"/><path d="M644 140 Q654 141 653 151 Q654 159 645 160 Q636 159 635 151 Q636 141 644 140 Z"/><path d="M690 142 Q699 141 699 150 Q699 159 689 160 Q681 159 680 149 Q681 141 690 142 Z"/><path d="M530 212 Q562 178 594 154"/><path d="M698 156 Q746 186 780 212"/>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="220" y="296">squash</text>
    <text x="660" y="296">merge-commit</text>
  </g>
</svg>`,

  /* ---- K8s 1.3 · CPU stryps vs minne dödas ---- */
  "tva-tak-en-container": `
<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler med samma vågräta tak. Till vänster viker den stigande kurvan av under taket och fortsätter. Till höger slutar den i ett kryss vid taket. I båda fallen fortsätter en streckad linje upp genom taket.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M40 132 Q210 130 380 132"/><path d="M52 292 Q152 286 236 141"/><path d="M236 141 Q262 110 288 80" stroke-dasharray="7 8" opacity="0.4"/><path d="M236 141 Q306 144 376 142"/><path d="M480 132 Q650 130 820 132"/><path d="M492 292 Q592 286 676 141"/><path d="M676 141 Q702 110 728 80" stroke-dasharray="7 8" opacity="0.4"/><path d="M660 125 L692 157"/><path d="M692 125 L660 157"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start" opacity="0.7">
    <text x="42" y="116">limit</text>
    <text x="482" y="116">limit</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="210" y="336">cpu · stryps</text>
    <text x="650" y="336">minne · dödas</text>
  </g>
</svg>`,

  /* ---- K8s 1.3 · Schemaläggaren räknar requests, inte förbrukning ---- */
  "reserverat-inte-anvant": `
<svg viewBox="0 0 880 340" role="img" aria-label="En nod med tre streckade fack som fyller den helt. I botten av varje fack ligger en liten skrafferad nivå som upptar en bråkdel av facket. Över bilden förklaras streckad ram som reserverat och skraffering som använt.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 60 Q78 59 96 60" stroke-dasharray="8 9" opacity="0.55"/><g stroke-width="1.1" opacity="0.42"><path d="M354 70 L340 56"/><path d="M368 70 L348 50"/><path d="M376 64 L362 50"/></g><path d="M59 96 Q440 95 820 96 Q822 179 821 261 Q440 264 60 261 Q58 179 59 96 Z"/><path d="M81 118 Q194 118 307 117 Q307 179 306 240 Q194 242 83 240 Q80 179 81 118 Z" stroke-dasharray="8 9" opacity="0.55"/><g stroke-width="1.1" opacity="0.42"><path d="M112 236 L90 214"/><path d="M134 236 L104 206"/><path d="M156 236 L126 206"/><path d="M178 236 L148 206"/><path d="M200 236 L170 206"/><path d="M222 236 L192 206"/><path d="M244 236 L214 206"/><path d="M266 236 L236 206"/><path d="M288 236 L258 206"/><path d="M298 224 L280 206"/></g><path d="M329 118 Q440 117 552 117 Q552 179 551 241 Q440 240 328 239 Q326 179 329 118 Z" stroke-dasharray="8 9" opacity="0.55"/><g stroke-width="1.1" opacity="0.42"><path d="M358 236 L336 214"/><path d="M380 236 L350 206"/><path d="M402 236 L372 206"/><path d="M424 236 L394 206"/><path d="M446 236 L416 206"/><path d="M468 236 L438 206"/><path d="M490 236 L460 206"/><path d="M512 236 L482 206"/><path d="M534 236 L504 206"/><path d="M544 224 L526 206"/></g><path d="M574 119 Q686 118 799 119 Q799 179 798 240 Q686 240 575 241 Q573 179 574 119 Z" stroke-dasharray="8 9" opacity="0.55"/><g stroke-width="1.1" opacity="0.42"><path d="M604 236 L582 214"/><path d="M626 236 L596 206"/><path d="M648 236 L618 206"/><path d="M670 236 L640 206"/><path d="M692 236 L662 206"/><path d="M714 236 L684 206"/><path d="M736 236 L706 206"/><path d="M758 236 L728 206"/><path d="M780 236 L750 206"/><path d="M790 224 L772 206"/></g>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="start" opacity="0.62">
    <text x="106" y="65">reserverat</text>
    <text x="386" y="65">använt</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="306">noden</text>
  </g>
</svg>`,

  /* ---- TF 1.2 · En modul lämnar bara ut det den deklarerat ---- */
  "modulens-tva-slitsar": `
<svg viewBox="0 0 880 400" role="img" aria-label="En stängd låda med två heldragna pilar in från vänster och en heldragen pil ut åt höger. Underifrån går en streckad pil mot lådans inre, överkryssad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M331 121 Q440 120 549 121 Q550 195 550 269 Q440 272 331 270 Q330 195 331 121 Z"/><path d="M96 168 Q212 166 320 168"/><path d="M313 162 L326 168 L313 174"/><path d="M96 226 Q212 228 320 226"/><path d="M313 220 L326 226 L313 232"/><path d="M556 196 Q676 194 792 196"/><path d="M785 190 L798 196 L785 202"/><path d="M440 348 Q438 300 440 250" stroke-dasharray="7 8" opacity="0.5"/><path d="M434 257 L440 244 L446 257"/><path d="M424 292 L456 320"/><path d="M456 292 L424 320"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="end" opacity="0.7">
    <text x="92" y="162">prefix</text>
    <text x="92" y="220">roll</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start" opacity="0.7">
    <text x="802" y="190">namn</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="104">modules/namn</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="440" y="378">local.namn</text>
  </g>
</svg>`,

  /* ---- TF 1.2 · sensitive döljer utskriften, inte lagringen ---- */
  "gardinen-inte-kassaskapet": `
<svg viewBox="0 0 880 400" role="img" aria-label="Till vänster en terminal med en gardin hängande framför sig. Till höger en fil med tre synliga textrader och ingenting framför.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M81 120 Q230 118 381 120 Q382 205 381 289 Q230 290 81 291 Q78 205 81 120 Z"/><path d="M80 158 Q230 156 380 158"/><path d="M64 112 Q230 109 396 112"/><path d="M96 118 Q103 200 96 282" stroke-width="1.4" opacity="0.55"/><path d="M132 118 Q139 200 132 282" stroke-width="1.4" opacity="0.55"/><path d="M168 118 Q175 200 168 282" stroke-width="1.4" opacity="0.55"/><path d="M204 118 Q211 200 204 282" stroke-width="1.4" opacity="0.55"/><path d="M240 118 Q247 200 240 282" stroke-width="1.4" opacity="0.55"/><path d="M276 118 Q283 200 276 282" stroke-width="1.4" opacity="0.55"/><path d="M312 118 Q319 200 312 282" stroke-width="1.4" opacity="0.55"/><path d="M348 118 Q355 200 348 282" stroke-width="1.4" opacity="0.55"/><path d="M540 118 Q634 116 706 118 L748 162 Q751 226 748 290 Q634 293 542 291 Q538 204 540 118 Z"/><path d="M706 118 Q705 146 708 162 Q728 164 748 162"/><path d="M568 206 Q638 204 712 206" stroke-width="1.3" opacity="0.6"/><path d="M568 236 Q638 234 712 236" stroke-width="1.3" opacity="0.6"/><path d="M568 266 Q638 264 712 266" stroke-width="1.3" opacity="0.6"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.75">
    <text x="230" y="148">&lt;sensitive&gt;</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="230" y="344">utskriften</text>
    <text x="644" y="344">terraform.tfstate</text>
  </g>
</svg>`,

  /* ---- Azure 1.2 · Principal, roll och scope möts i en tilldelning ---- */
  "tre-delar-en-tilldelning": `
<svg viewBox="0 0 880 372" role="img" aria-label="Tre linjer märkta principal, roll och scope löper ihop i en ring, och ur ringen går en pil ut till en ruta märkt behörighet.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M196 96 Q300 96 372 190"/><path d="M196 196 Q300 196 372 196"/><path d="M196 296 Q300 296 372 202"/><path d="M405 169 Q429 171 431 197 Q429 221 403 223 Q379 221 377 195 Q379 171 405 169 Z"/><path d="M432 196 Q548 194 664 196"/><path d="M657 190 L670 196 L657 202"/><path d="M676 163 Q751 164 826 165 Q827 196 826 229 Q751 230 676 229 Q676 196 676 163 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="end" opacity="0.8">
    <text x="188" y="102">principal</text>
    <text x="188" y="202">roll</text>
    <text x="188" y="302">scope</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="751" y="262">behörighet</text>
  </g>
</svg>`,

  /* ---- Azure 1.2 · Tjänstprincipal vs managed identity ---- */
  "fickan-som-ar-tom": `
<svg viewBox="0 0 880 400" role="img" aria-label="Till vänster en app med en nyckel i, och samma nyckel en gång till i en fil under. Till höger en app med en tom streckad ficka och en streckad pil upp från ett streckat token.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M56 119 Q206 118 356 121 Q357 190 356 260 Q206 260 57 261 Q54 190 56 119 Z"/><path d="M105 157 Q115 157 115 168 Q115 179 104 178 Q93 179 93 169 Q93 157 105 157 Z"/><path d="M115 168 Q138 169 160 168"/><path d="M146 168 Q147 177 146 184"/><path d="M158 168 Q159 176 158 182"/><path d="M120 296 Q206 294 291 295 Q293 327 292 358 Q206 358 120 359 Q120 327 120 296 Z" stroke-width="1.4" opacity="0.7"/><path d="M149 314 Q161 315 162 326 Q161 337 149 338 Q139 337 139 327 Q139 315 149 314 Z"/><path d="M161 326 Q184 327 206 326"/><path d="M192 326 Q193 335 192 342"/><path d="M204 326 Q205 334 204 340"/><path d="M524 120 Q674 119 825 120 Q824 190 825 259 Q674 260 525 259 Q524 190 524 120 Z"/><path d="M556 151 Q598 149 639 150 Q642 176 639 202 Q598 204 557 202 Q555 176 556 151 Z" stroke-dasharray="7 8" opacity="0.45"/><path d="M700 300 Q702 268 700 238" stroke-dasharray="7 8" opacity="0.6"/><path d="M694 245 L700 232 L706 245"/><path d="M645 300 Q700 299 754 301 Q755 322 754 344 Q700 346 646 344 Q645 322 645 300 Z" stroke-dasharray="7 8" opacity="0.6"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="206" y="246">appen</text>
    <text x="674" y="246">appen</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="206" y="342">och i filen</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="700" y="330">token</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.45">
    <text x="598" y="180">tom</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="206" y="384">tjänstprincipal</text>
    <text x="674" y="384">managed identity</text>
  </g>
</svg>`,

  /* ---- AWS 1.2 · Identitetsbaserad vs resursbaserad policy ---- */
  "lappen-pa-vem": `
<svg viewBox="0 0 880 372" role="img" aria-label="Två paneler med samma pil från en person till en behållare. I den vänstra sitter en skrafferad lapp under personen, i den högra under behållaren.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M100 171 Q125 171 125 197 Q125 221 100 222 Q75 221 74 197 Q75 171 100 171 Z"/><path d="M78 232 Q100 214 122 232"/><path d="M136 196 Q216 194 294 196"/><path d="M287 190 L300 196 L287 202"/><path d="M313 165 Q356 162 401 163 Q401 196 400 227 Q356 229 313 229 Q310 196 313 165 Z"/><path d="M68 251 Q101 250 134 249 Q135 272 135 293 Q101 296 68 294 Q67 272 68 251 Z" stroke-width="1.4" opacity="0.75"/><g stroke-width="1.1" opacity="0.4"><path d="M90 288 L74 272"/><path d="M106 288 L74 256"/><path d="M122 288 L90 256"/><path d="M128 278 L106 256"/><path d="M128 262 L122 256"/></g><path d="M540 171 Q565 171 567 196 Q565 221 539 221 Q515 221 514 197 Q515 171 540 171 Z"/><path d="M518 232 Q540 214 562 232"/><path d="M576 196 Q656 194 734 196"/><path d="M727 190 L740 196 L727 202"/><path d="M753 164 Q796 163 839 164 Q840 196 841 227 Q796 229 753 227 Q751 196 753 164 Z"/><path d="M771 251 Q803 248 835 250 Q836 272 837 293 Q803 295 770 294 Q769 272 771 251 Z" stroke-width="1.4" opacity="0.75"/><g stroke-width="1.1" opacity="0.4"><path d="M792 288 L776 272"/><path d="M808 288 L776 256"/><path d="M824 288 L792 256"/><path d="M830 278 L808 256"/><path d="M830 262 L824 256"/></g>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="100" y="318">policyn</text>
    <text x="830" y="318">policyn</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="230" y="352">identitetsbaserad</text>
    <text x="670" y="352">resursbaserad</text>
  </g>
</svg>`,

  /* ---- AWS 1.2 · Förtroendepolicy släpper in, behörighetspolicy tillåter ---- */
  "rollens-tva-policyer": `
<svg viewBox="0 0 880 372" role="img" aria-label="En låda märkt rollen med en dörr på vänster sida och ett fönster på höger. En heldragen pil går in genom dörren, en streckad pil ut genom fönstret.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M301 109 Q440 109 579 111 Q580 200 580 291 Q440 292 300 291 Q299 200 301 109 Z"/><path d="M300 168 Q298 200 300 232"/><path d="M300 168 Q330 166 358 168 Q360 200 358 232 Q330 234 300 232"/><path d="M348 202 Q351 200 348 198"/><path d="M150 200 Q222 198 292 200"/><path d="M285 194 L298 200 L285 206"/><path d="M520 156 Q550 154 578 156 Q580 186 578 214 Q550 216 520 214 Q518 186 520 156 Z"/><path d="M549 156 Q551 186 549 214"/><path d="M520 185 Q550 183 578 185"/><path d="M588 200 Q660 198 730 200" stroke-dasharray="7 8"/><path d="M723 194 L736 200 L723 206"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="end" opacity="0.7">
    <text x="146" y="194">vem</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start" opacity="0.7">
    <text x="742" y="194">vad</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="440" y="90">rollen</text>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="middle" opacity="0.75">
    <text x="220" y="330">förtroendepolicy</text>
    <text x="672" y="330">behörighetspolicy</text>
  </g>
</svg>`,

  /* ---- Cyber 1.2 · Kryptering går åt två håll, hashning åt ett ---- */
  "envagsmuren": `
<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster två lådor med pilar åt båda håll och en nyckel emellan. Till höger går en pil genom en skrafferad mur men returpilen stoppas av den och är överkryssad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M40 146 Q100 145 161 145 Q160 180 160 215 Q100 216 40 213 Q38 180 40 146 Z"/><path d="M251 146 Q310 146 370 147 Q371 180 369 213 Q310 215 249 214 Q250 180 251 146 Z"/><path d="M164 166 Q205 164 244 166"/><path d="M237 160 L250 166 L237 172"/><path d="M246 198 Q205 200 166 198"/><path d="M173 192 L160 198 L173 204"/><path d="M461 146 Q520 144 579 147 Q581 180 580 214 Q520 214 460 215 Q459 180 461 146 Z"/><path d="M700 147 Q760 146 820 146 Q822 180 820 214 Q760 214 699 215 Q699 180 700 147 Z"/><path d="M584 164 Q639 162 694 164"/><path d="M687 158 L700 164 L687 170"/><path d="M629 124 Q639 124 648 125 Q650 176 648 228 Q639 229 631 228 Q629 176 629 124 Z"/><g stroke-width="1.1" opacity="0.5"><path d="M645 223 L633 211"/><path d="M645 209 L633 197"/><path d="M645 195 L633 183"/><path d="M645 181 L633 169"/><path d="M645 167 L633 155"/><path d="M645 153 L633 141"/><path d="M645 139 L633 127"/></g><path d="M696 202 Q682 203 668 202" stroke-dasharray="6 7"/><path d="M675 196 L662 202 L675 208"/><path d="M625 188 L653 216"/><path d="M653 188 L625 216"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="100" y="256">klartext</text>
    <text x="310" y="256">chiffer</text>
    <text x="520" y="256">klartext</text>
    <text x="760" y="256">hash</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="205" y="308">kryptering</text>
    <text x="640" y="308">hashning</text>
  </g>
</svg>`,

  /* ---- Cyber 1.2 · Session vs token, och vad utloggning kan stryka ---- */
  "biljetten-och-listan": `
<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster en biljett med en pil till en lista där en rad är överstruken. Till höger en biljett med text i och ingen lista alls, med en överkryssad streckad linje tvärs över.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 161 Q112 158 165 160 Q165 189 164 217 Q112 218 61 218 Q58 189 60 161 Z"/><path d="M76 178 Q112 176 148 178" stroke-width="1.2" opacity="0.55"/><path d="M170 188 Q212 186 250 188"/><path d="M243 182 L256 188 L243 194"/><path d="M257 118 Q342 116 426 118 Q426 184 425 249 Q342 250 258 251 Q256 184 257 118 Z"/><path d="M260 151 Q342 150 424 151"/><path d="M260 184 Q342 183 424 184"/><path d="M260 217 Q342 216 424 217"/><path d="M266 184 Q342 182 418 184"/><path d="M599 160 Q652 159 704 161 Q705 189 703 219 Q652 219 599 217 Q599 189 599 160 Z"/><path d="M616 178 Q652 176 688 178" stroke-width="1.2" opacity="0.55"/><path d="M616 194 Q652 192 688 194" stroke-width="1.2" opacity="0.55"/><path d="M584 188 Q656 190 720 188" stroke-dasharray="6 7" opacity="0.6"/><path d="M636 172 L668 204"/><path d="M668 172 L636 204"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="112" y="254">id</text>
    <text x="342" y="272">listan hos servern</text>
    <text x="652" y="254">allt står i den</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="240" y="314">session</text>
    <text x="652" y="314">token</text>
  </g>
</svg>`,

  /* ---- Obs 1.2 · N+1 syns som ett staket i vattenfallet ---- */
  "vattenfallet-och-staketet": `
<svg viewBox="0 0 880 440" role="img" aria-label="Ett vattenfallsdiagram med två breda staplar överst, sedan tio korta staplar i en trappa nedåt höger, och en bred stapel underst.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M80 104 Q440 103 800 104" stroke-width="2"/><path d="M122 146 Q450 145 778 146" stroke-width="2"/><path d="M158 186 Q189 185 220 186" stroke-width="3"/><path d="M210 202 Q241 201 272 202" stroke-width="3"/><path d="M262 218 Q293 217 324 218" stroke-width="3"/><path d="M314 234 Q345 233 376 234" stroke-width="3"/><path d="M366 250 Q397 249 428 250" stroke-width="3"/><path d="M418 266 Q449 265 480 266" stroke-width="3"/><path d="M470 282 Q501 281 532 282" stroke-width="3"/><path d="M522 298 Q553 297 584 298" stroke-width="3"/><path d="M574 314 Q605 313 636 314" stroke-width="3"/><path d="M626 330 Q657 329 688 330" stroke-width="3"/><path d="M150 372 Q470 371 790 372" stroke-width="2"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="start" opacity="0.62">
    <text x="78" y="94">GET /orders</text>
    <text x="120" y="136">handler</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="start" opacity="0.62">
    <text x="148" y="362">rendering</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start" opacity="0.75">
    <text x="700" y="196">10 × SELECT</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.45">
    <text x="460" y="420">tiden går åt höger</text>
  </g>
</svg>`,

  /* ---- Obs 1.2 · Bruten kontextspridning ger två spår ---- */
  "kedjan-som-bryts": `
<svg viewBox="0 0 880 320" role="img" aria-label="Tre sammanlänkade lådor uppe till vänster och två nere till höger. Den streckade pilen mellan grupperna är överkryssad.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M59 85 Q102 82 143 83 Q146 107 144 130 Q102 130 60 130 Q60 107 59 85 Z"/><path d="M177 84 Q218 83 259 85 Q262 107 259 130 Q218 131 176 129 Q175 107 177 84 Z"/><path d="M292 84 Q334 84 375 85 Q376 107 377 131 Q334 131 293 130 Q290 107 292 84 Z"/><path d="M144 107 Q156 106 168 107"/><path d="M161 101 L174 107 L161 113"/><path d="M260 107 Q272 106 284 107"/><path d="M277 101 L290 107 L277 113"/><path d="M400 152 Q432 176 464 200" stroke-dasharray="7 8" opacity="0.45"/><path d="M414 158 L446 190"/><path d="M446 158 L414 190"/><path d="M524 196 Q566 194 609 196 Q610 219 608 241 Q566 243 524 241 Q523 219 524 196 Z"/><path d="M639 196 Q682 196 723 195 Q726 219 724 242 Q682 244 641 243 Q640 219 639 196 Z"/><path d="M608 219 Q620 218 632 219"/><path d="M625 213 L638 219 L625 225"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="222" y="72">trace A</text>
    <text x="640" y="184">trace B</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.5">
    <text x="222" y="180">frontend → api</text>
    <text x="640" y="292">→ lager → db</text>
  </g>
</svg>`,

  /* ---- Nätverk 1.2 · Kedjan slutar i ditt eget rotlager ---- */
  "kedjan-till-roten": `
<svg viewBox="0 0 880 400" role="img" aria-label="Två kort ovanpå varandra till vänster med en pil uppåt mellan dem, och en streckad pil vidare till ett tredje kort som ligger på en laptop till höger.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M602 200 Q700 198 798 200 Q800 250 798 288 Q700 290 604 288 Q598 244 602 200 Z"/><path d="M582 302 Q700 299 818 302 Q818 310 810 312 Q700 315 590 312 Q582 310 582 302 Z"/><path d="M189 109 Q280 108 369 111 Q371 155 371 200 Q280 202 189 200 Q189 155 189 109 Z"/><path d="M202 126 Q280 124 358 126" stroke-width="1.1" opacity="0.5"/><path d="M202 139 Q280 137 358 139" stroke-width="1.1" opacity="0.5"/><path d="M189 249 Q280 248 370 251 Q372 295 371 340 Q280 341 189 339 Q190 295 189 249 Z"/><path d="M202 266 Q280 264 358 266" stroke-width="1.1" opacity="0.5"/><path d="M202 279 Q280 277 358 279" stroke-width="1.1" opacity="0.5"/><path d="M280 244 Q282 226 280 210"/><path d="M274 217 L280 204 L286 217"/><path d="M376 154 Q470 152 566 154" stroke-dasharray="7 8"/><path d="M559 148 L572 154 L559 160"/><path d="M629 219 Q700 216 772 219 Q772 246 771 273 Q700 274 628 274 Q628 246 629 219 Z"/><path d="M640 234 Q700 232 760 234" stroke-width="1.1" opacity="0.5"/><path d="M640 247 Q700 245 760 247" stroke-width="1.1" opacity="0.5"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="end" opacity="0.62">
    <text x="176" y="160">mellanled</text>
    <text x="176" y="300">servercert</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.45">
    <text x="471" y="138">måste sluta här</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="700" y="364">ditt rotlager</text>
  </g>
</svg>`,

  /* ---- Nätverk 1.2 · SNI väljer certifikat på en delad IP ---- */
  "sni-valjer-certet": `
<svg viewBox="0 0 880 372" role="img" aria-label="En klient till vänster med en pil in i en serverlåda som innehåller tre certifikat, varav ett är heldraget och två streckade. Under pilen ligger en lapp med värdnamnet.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M521 97 Q670 94 821 96 Q820 200 821 304 Q670 304 521 305 Q519 200 521 97 Z"/><path d="M548 119 Q600 118 653 121 Q653 148 652 175 Q600 177 549 176 Q548 148 548 119 Z" stroke-dasharray="7 8" opacity="0.4"/><path d="M548 182 Q600 180 651 181 Q652 210 653 238 Q600 239 547 238 Q547 210 548 182 Z"/><path d="M548 244 Q600 243 652 243 Q654 272 653 299 Q600 300 548 300 Q547 272 548 244 Z" stroke-dasharray="7 8" opacity="0.4"/><path d="M60 168 Q135 166 209 169 Q211 196 210 223 Q135 226 59 225 Q60 196 60 168 Z"/><path d="M216 196 Q330 194 442 196"/><path d="M435 190 L448 196 L435 202"/><path d="M300 237 Q360 234 419 235 Q422 258 421 281 Q360 280 299 279 Q299 258 300 237 Z" stroke-width="1.3" opacity="0.65"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.75">
    <text x="135" y="202">klienten</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="360" y="264">namnet i klartext</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="670" y="86">en IP-adress</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.6">
    <text x="600" y="220">valt</text>
  </g>
</svg>`,

  /* ---- API 1.2 · Token bucket — jämn påfyllning, skurvis uttag ---- */
  "hinken-fylls-pa": `
<svg viewBox="0 0 880 400" role="img" aria-label="En hink med mynt i, en jämn streckad droppe uppifrån, och en skopa till höger som tar flera mynt på en gång.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M400 62 Q402 100 400 138" stroke-dasharray="5 12"/><path d="M394 131 L400 144 L406 131"/><path d="M330 168 Q400 166 470 168 Q462 264 452 320 Q400 326 348 320 Q338 264 330 168 Z"/><path d="M322 168 Q400 164 478 168" stroke-width="2.2"/><path d="M373 255 Q385 255 386 267 Q385 281 371 280 Q359 281 360 267 Q359 255 373 255 Z"/><path d="M405 270 Q417 269 416 283 Q417 295 403 295 Q391 295 390 283 Q391 269 405 270 Z"/><path d="M437 254 Q449 253 448 267 Q449 279 436 280 Q423 279 423 266 Q423 253 437 254 Z"/><path d="M390 220 Q403 219 402 231 Q403 245 390 244 Q377 245 377 231 Q377 219 390 220 Z"/><path d="M425 214 Q437 215 438 229 Q437 241 424 240 Q411 241 411 227 Q411 215 425 214 Z"/><path d="M560 214 Q622 212 684 214 Q676 262 668 288 Q622 294 578 288 Q568 258 560 214 Z"/><path d="M488 236 Q524 234 556 236"/><path d="M503 230 L490 236 L503 242"/><path d="M600 239 Q612 240 613 252 Q612 264 600 263 Q588 264 589 253 Q588 240 600 239 Z"/><path d="M637 237 Q648 238 648 250 Q648 262 637 261 Q624 262 624 251 Q624 238 637 237 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.6">
    <text x="400" y="44">påfyllning, jämn takt</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="400" y="368">hinken</text>
    <text x="622" y="368">ett anrop</text>
  </g>
</svg>`,

  /* ---- API 1.2 · CORS upprätthålls av webbläsaren, inte servern ---- */
  "grinden-star-hos-klienten": `
<svg viewBox="0 0 880 372" role="img" aria-label="En serverlåda till höger skickar samma svar till två klienter till vänster. Framför den övre klienten står ett galler, framför den undre ingenting.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M641 119 Q735 119 829 119 Q831 185 830 250 Q735 251 640 250 Q640 185 641 119 Z"/><path d="M71 129 Q145 127 221 129 Q222 160 221 191 Q145 192 70 193 Q70 160 71 129 Z"/><path d="M70 258 Q145 258 219 258 Q221 290 220 322 Q145 324 69 322 Q70 290 70 258 Z"/><path d="M630 156 Q470 154 340 158"/><path d="M347 152 L334 158 L347 164"/><path d="M630 208 Q440 240 226 286"/><path d="M233 282 L220 288 L233 294"/><path d="M296 108 Q298 160 296 212"/><path d="M262 132 Q296 130 330 132" stroke-width="1.3" opacity="0.7"/><path d="M262 160 Q296 158 330 160" stroke-width="1.3" opacity="0.7"/><path d="M262 188 Q296 186 330 188" stroke-width="1.3" opacity="0.7"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.78">
    <text x="145" y="166">webbläsare</text>
    <text x="145" y="296">curl</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="296" y="244">CORS</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.5">
    <text x="735" y="282">samma svar, båda gångerna</text>
  </g>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="735" y="110">API:et</text>
  </g>
</svg>`,

  /* ---- Git 1.3 · Reflogen minns var grenen stod ---- */
  "reflogen-minns-vagen": `
<svg viewBox="0 0 880 400" role="img" aria-label="En heldragen rad commits åt höger och en streckad rad nedanför som ingen pekar på. En streckad pil från den heldragna raden ner till den streckade är märkt reflog.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M99 136 Q114 136 114 150 Q114 164 101 165 Q86 164 85 149 Q86 136 99 136 Z"/><path d="M199 136 Q214 136 213 149 Q214 164 201 164 Q186 164 186 150 Q186 136 199 136 Z"/><path d="M114 150 Q150 148 186 150"/><path d="M214 164 Q252 220 286 272" stroke-dasharray="6 7" opacity="0.45"/><path d="M301 137 Q314 136 315 149 Q314 164 299 164 Q286 164 285 149 Q286 136 301 137 Z"/><path d="M401 137 Q414 136 414 151 Q414 164 401 165 Q386 164 387 150 Q386 136 401 137 Z"/><path d="M499 137 Q514 136 514 150 Q514 164 500 164 Q486 164 487 149 Q486 136 499 137 Z"/><path d="M214 150 Q250 148 286 150"/><path d="M314 150 Q350 148 386 150"/><path d="M414 150 Q450 148 486 150"/><path d="M300 266 Q314 266 314 281 Q314 294 300 295 Q286 294 286 281 Q286 266 300 266 Z" stroke-dasharray="6 7" opacity="0.45"/><path d="M399 265 Q414 266 413 281 Q414 294 399 293 Q386 294 387 281 Q386 266 399 265 Z" stroke-dasharray="6 7" opacity="0.45"/><path d="M214 280 Q250 278 286 280" stroke-dasharray="6 7" opacity="0.45"/><path d="M314 280 Q350 278 386 280" stroke-dasharray="6 7" opacity="0.45"/><path d="M520 196 Q470 250 428 288" stroke-dasharray="7 8"/><path d="M409 286 L422 292 L409 298"/>
  </g>
  <g font-family="var(--font-mono)" font-size="15" fill="currentColor" text-anchor="start" opacity="0.8">
    <text x="556" y="148">rabatt</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="start" opacity="0.5">
    <text x="556" y="286">föräldralösa</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="end" opacity="0.62">
    <text x="474" y="262">reflog</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.45">
    <text x="400" y="368">samma ändring, andra hashar</text>
  </g>
</svg>`,

  /* ---- SQL 1.2 · Läs-ändra-skriv förlorar den första skrivningen ---- */
  "lost-update-tva-spar": `
<svg viewBox="0 0 880 400" role="img" aria-label="Två vågräta spår med tre hållpunkter var, förskjutna i tid. Båda läser 100, båda skriver 70.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M90 126 Q380 124 670 126"/><path d="M130 111 Q145 111 145 125 Q145 141 129 140 Q115 141 115 125 Q115 111 130 111 Z"/><path d="M329 111 Q345 111 346 126 Q345 141 329 142 Q315 141 314 125 Q315 111 329 111 Z"/><path d="M560 111 Q575 111 575 126 Q575 141 561 140 Q545 141 546 126 Q545 111 560 111 Z"/><path d="M150 246 Q440 244 730 246"/><path d="M191 230 Q205 231 206 245 Q205 261 191 262 Q175 261 175 245 Q175 231 191 230 Z"/><path d="M389 230 Q405 231 406 245 Q405 261 390 261 Q375 261 375 245 Q375 231 389 230 Z"/><path d="M619 230 Q635 231 636 246 Q635 261 620 261 Q605 261 604 245 Q605 231 619 230 Z"/><path d="M70 348 Q400 346 800 348" stroke-width="1.3" opacity="0.4"/><path d="M793 342 L806 348 L793 354"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="130" y="80">läser 100</text>
    <text x="330" y="80">räknar 70</text>
    <text x="560" y="80">skriver 70</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="190" y="306">läser 100</text>
    <text x="390" y="306">räknar 70</text>
    <text x="620" y="306">skriver 70</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="end" opacity="0.8">
    <text x="60" y="132">A</text>
    <text x="60" y="252">B</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.5">
    <text x="400" y="382">två uttag à 30, saldot blev 70</text>
  </g>
</svg>`,

  /* ---- SQL 1.2 · Databasen minns vilken migration som körts sist ---- */
  "migrationerna-och-market": `
<svg viewBox="0 0 880 400" role="img" aria-label="Fyra filer i en stapel. De två nedersta är heldragna, de två översta streckade. En pil från vänster pekar på den översta heldragna.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M239 93 Q390 90 539 93 Q541 118 540 145 Q390 145 239 145 Q238 118 239 93 Z" stroke-dasharray="7 8" opacity="0.45"/><path d="M239 159 Q390 157 539 158 Q541 184 541 209 Q390 211 239 209 Q239 184 239 159 Z" stroke-dasharray="7 8" opacity="0.45"/><path d="M241 223 Q390 223 540 225 Q542 250 539 275 Q390 276 240 275 Q238 250 241 223 Z"/><path d="M240 289 Q390 290 539 290 Q541 316 539 341 Q390 342 240 342 Q238 316 240 289 Z"/><path d="M160 250 Q196 248 232 250"/><path d="M225 244 L238 250 L225 256"/><path d="M61 228 Q108 226 157 229 Q156 250 157 271 Q108 274 61 272 Q58 250 61 228 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="start" opacity="0.7">
    <text x="560" y="124">0004_…</text>
    <text x="560" y="190">0003_…</text>
    <text x="560" y="256">0002_…</text>
    <text x="560" y="322">0001_…</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.7">
    <text x="108" y="254">databasen</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.45">
    <text x="390" y="378">kvar att köra ligger ovanför</text>
  </g>
</svg>`,

  /* ---- Docker 1.4 · Skalet i vägen vidarebefordrar inte SIGTERM ---- */
  "signalen-till-pid-ett": `
<svg viewBox="0 0 880 320" role="img" aria-label="Två paneler med samma inkommande pil märkt SIGTERM. I den vänstra träffar den en låda märkt sh, och pilen vidare till appen är streckad och överkryssad. I den högra träffar den appen direkt.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M40 176 Q80 174 118 176"/><path d="M111 170 L124 176 L111 182"/><path d="M129 143 Q173 142 217 144 Q217 176 217 207 Q173 209 130 208 Q128 176 129 143 Z"/><path d="M222 176 Q248 174 274 176" stroke-dasharray="6 7" opacity="0.5"/><path d="M267 170 L280 176 L267 182"/><path d="M236 160 L262 192"/><path d="M262 160 L236 192"/><path d="M289 144 Q336 144 383 143 Q385 176 384 208 Q336 208 287 208 Q287 176 289 144 Z" stroke-dasharray="7 8" opacity="0.45"/><path d="M560 176 Q600 174 638 176"/><path d="M631 170 L644 176 L631 182"/><path d="M650 144 Q698 144 745 145 Q746 176 747 209 Q698 208 651 208 Q649 176 650 144 Z"/>
  </g>
  <g font-family="var(--font-mono)" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.7">
    <text x="76" y="164">SIGTERM</text>
    <text x="596" y="164">SIGTERM</text>
  </g>
  <g font-family="var(--font-mono)" font-size="14" fill="currentColor" text-anchor="middle">
    <text x="173" y="184">sh</text>
    <text x="386" y="184">app</text>
    <text x="698" y="184">app</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="230" y="268">shell-form · 10 s</text>
    <text x="698" y="268">exec-form · 0 s</text>
  </g>
</svg>`,

  /* ---- Linux 1.2 · TOFU litar en gang, en CA i forvag ---- */
  "tofu-och-rotlagret": `
<svg viewBox="0 0 880 340" role="img" aria-label="Till vänster två datorer och en anteckningsbok under den ena. Till höger två datorer och en tredje låda ovanför som pekar ner mot servern.">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M61 149 Q115 149 169 149 Q172 179 170 207 Q115 209 59 209 Q59 179 61 149 Z"/><path d="M299 151 Q355 149 409 150 Q410 179 410 209 Q355 210 300 209 Q298 179 299 151 Z"/><path d="M176 172 Q238 170 294 172"/><path d="M287 166 L300 172 L287 178"/><path d="M294 196 Q238 198 176 196" stroke-dasharray="6 7"/><path d="M183 190 L170 196 L183 202"/><path d="M91 252 Q145 250 199 253 Q201 277 200 302 Q145 302 90 302 Q90 277 91 252 Z"/><path d="M116 268 Q145 266 174 268" stroke-width="1.1" opacity="0.55"/><path d="M116 284 Q145 282 174 284" stroke-width="1.1" opacity="0.55"/><path d="M499 150 Q555 148 609 150 Q612 179 610 209 Q555 208 499 207 Q498 179 499 150 Z"/><path d="M740 150 Q795 149 851 149 Q852 179 849 207 Q795 209 740 208 Q740 179 740 150 Z"/><path d="M616 172 Q678 170 734 172"/><path d="M727 166 L740 172 L727 178"/><path d="M601 43 Q675 42 751 44 Q750 72 749 101 Q675 102 599 99 Q600 72 601 43 Z"/><path d="M676 106 Q678 128 676 144" stroke-dasharray="6 7" opacity="0.6"/><path d="M670 137 L676 150 L682 137"/>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.7">
    <text x="115" y="184">du</text>
    <text x="355" y="184">servern</text>
    <text x="555" y="184">du</text>
    <text x="795" y="184">servern</text>
  </g>
  <g font-family="var(--font-mono)" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.62">
    <text x="145" y="318">known_hosts</text>
    <text x="675" y="80">rotlagret</text>
  </g>
  <g font-family="var(--font-mono)" font-size="17" fill="currentColor" text-anchor="middle">
    <text x="220" y="120">TOFU</text>
    <text x="660" y="318">CA</text>
  </g>
</svg>`,
};
