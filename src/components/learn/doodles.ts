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
//   handritad — vinglig linje, överskjutande hörn, skraffering. Läser som en
//               anteckning. Kontrasterar mot lärkitets precisa lådor.
//   teknisk   — raka linjer, samma radie och vikt som Flow/Stack. Läser som en
//               del av kitet.

export const DOODLES: Record<string, string> = {
  /* ---- Docker 1.0 · Container vs virtuell maskin — STIL: HANDRITAD ---- */
  "vm-vs-container": `
<svg viewBox="0 0 880 404" role="img" aria-label="Två staplar bredvid varandra. Den virtuella maskinen har ett gäst-OS-lager som containern saknar.">
  <g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M63 79 Q192 74 320 78 Q325 104 321 131 Q192 136 62 132 Q57 105 63 79 Z"/>
    <path d="M61 142 Q192 137 322 141 Q326 174 320 207 Q192 212 63 208 Q58 175 61 142 Z"/>
    <path d="M63 218 Q192 213 321 217 Q325 243 320 270 Q192 275 62 271 Q58 244 63 218 Z"/>
    <path d="M62 281 Q192 276 322 280 Q326 307 320 336 Q192 341 63 337 Q57 308 62 281 Z"/>
    <g stroke-width="1.15" opacity="0.65">
      <path d="M74 206 L120 142"/><path d="M106 207 L152 143"/><path d="M138 206 L184 142"/>
      <path d="M170 207 L216 143"/><path d="M202 206 L248 142"/><path d="M234 207 L280 143"/>
      <path d="M266 206 L312 144"/>
    </g>
    <path d="M561 79 Q690 74 818 78 Q823 104 819 131 Q690 136 560 132 Q555 105 561 79 Z"/>
    <path d="M559 142 Q690 137 820 141 Q824 174 818 207 Q690 212 561 208 Q556 175 559 142 Z"
          stroke-dasharray="8 9" opacity="0.4"/>
    <path d="M561 218 Q690 213 819 217 Q823 243 818 270 Q690 275 560 271 Q556 244 561 218 Z"/>
    <path d="M560 281 Q690 276 820 280 Q824 307 818 336 Q690 341 561 337 Q555 308 560 281 Z"/>
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
  <text x="689" y="180" font-family="var(--font-mono)" font-size="15" fill="currentColor"
        text-anchor="middle" opacity="0.42">finns inte</text>
  <g font-family="var(--font-mono)" font-size="18.5" fill="currentColor" text-anchor="middle">
    <text x="191" y="376">Virtuell maskin</text>
    <text x="689" y="376">Container</text>
  </g>
</svg>`,


  /* ---- Docker 1.0 · Registry, repository och tagg — STIL: HANDRITAD ---- */
  "registry-hyllan": `
<svg viewBox="0 0 880 400" role="img" aria-label="En hylla med tre lådor märkta v1, v2 och latest. En klammer under dem märkt repository.">
  <g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
<path d="M150 258 Q440 253 750 257"/><path d="M152 272 Q440 267 748 271"/><path d="M154 272 Q150 300 156 326"/><path d="M746 271 Q750 300 744 326"/><path d="M204 148 Q276 144 347 153 Q350 202 349 254 Q276 260 207 256 Q205 202 204 148 Z"/><path d="M378 150 Q446 146 513 152 Q523 202 515 256 Q446 259 380 253 Q370 202 378 150 Z"/><path d="M543 147 Q616 146 689 152 Q689 202 683 257 Q616 254 550 255 Q539 202 543 147 Z"/><path d="M212 296 Q212 308 224 309 L438 311 Q450 311 450 322 Q450 311 462 310 L732 308 Q744 307 744 295" stroke-width="1.4" opacity="0.7"/>
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
  <g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
<path d="M72 108 Q160 104 232 107 L272 150 Q276 212 272 274 Q160 280 74 275 Q68 192 72 108 Z"/><path d="M232 107 Q230 134 234 150 Q254 153 272 150"/><path d="M436 190 Q436 26 646 24 Q856 26 856 190 Q856 350 646 352 Q436 350 436 190 Z" stroke-width="1.6" opacity="0.55"/><path d="M540 79 Q657 73 778 81 Q779 109 777 143 Q657 141 539 138 Q534 109 540 79 Z"/><path d="M534 159 Q657 156 775 163 Q784 191 777 222 Q657 225 537 225 Q533 191 534 159 Z"/><path d="M536 238 Q657 241 778 239 Q781 273 774 306 Q657 306 533 304 Q533 273 536 238 Z"/><path d="M276 192 Q360 190 420 142 Q450 118 524 112"/><path d="M276 192 Q400 190 524 192"/><path d="M276 192 Q360 194 420 242 Q450 266 524 272"/><path d="M517 105 L530 111 L517 117"/><path d="M517 186 L530 192 L517 198"/><path d="M517 267 L530 273 L517 279"/>
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
  <g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
<path d="M262 186 Q262 58 520 56 Q782 58 782 186 Q782 320 520 322 Q262 320 262 186 Z" stroke-width="1.6" opacity="0.55"/><path d="M320 146 Q404 139 485 143 Q495 182 487 216 Q404 221 323 215 Q314 182 320 146 Z"/><path d="M572 142 Q656 140 740 150 Q745 182 743 220 Q656 221 570 217 Q571 182 572 142 Z"/><path d="M492 182 Q530 180 566 182"/><path d="M557 176 L570 182 L557 188"/><path d="M60 152 Q120 148 178 151 Q182 190 178 224 Q120 228 62 224 Q56 188 60 152 Z"/><path d="M44 236 Q120 232 196 235 Q186 250 172 252 Q120 255 66 252 Q52 250 44 236 Z"/><path d="M200 194 Q226 196 248 190" stroke-dasharray="8 8"/><path d="M252 176 L268 204"/><path d="M268 176 L252 204"/>
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
  <g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
<path d="M98 76 Q210 71 322 75 Q328 122 322 168" /><path d="M98 76 Q92 122 98 168"/><path d="M98 168 Q210 173 322 168" stroke-dasharray="7 8" opacity="0.55"/><path d="M210 104 Q208 170 210 214"/><path d="M204 207 L210 220 L216 207"/><path d="M131 230 Q220 227 310 236 Q311 268 311 306 Q220 306 135 306 Q125 268 131 230 Z"/><path d="M538 46 Q650 41 762 45 Q768 92 762 138" stroke-dasharray="8 9" opacity="0.28"/><path d="M538 46 Q532 92 538 138" stroke-dasharray="8 9" opacity="0.28"/><path d="M650 176 Q648 150 650 128" opacity="0.45"/><path opacity="0.45" d="M644 137 L650 124 L656 137"/><path d="M568 230 Q660 233 746 234 Q750 268 752 304 Q660 305 575 308 Q567 268 568 230 Z"/>
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
