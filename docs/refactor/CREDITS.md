# Credits

## Visuell grund – "grunge"-temat

Den visuella designen (bakgrundsbild `src/assets/images/bg.jpg`, oklch-färg-
palett och typografival Road Rage / JetBrains Mono) är härledd från det
öppna temat **grunge**.

- © 2025 Jess Gaspar
- Licens: MIT

Endast grafiska delar (bakgrund, färgpalett, typsnitt) har återanvänts –
ingen layout, komponentstruktur eller funktionalitet från temat.

`scripts/generate-noise.mjs` (grain-overlay → `static/noise.png`) använder en
brus-algoritm härledd från **tailwindcss-noise** (MIT). Paketet i sig används
inte som beroende; bilden genereras statiskt för att undvika en tung
native-dependency (node-canvas).
