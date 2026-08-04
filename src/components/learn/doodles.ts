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
};
