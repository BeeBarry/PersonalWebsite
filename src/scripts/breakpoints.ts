// Enda källan för layoutens desktop-brytpunkt i JavaScript.
// Måste matcha Tailwinds `lg:` (64rem = 1024px) — under den staplas
// AppLayout och HELA SIDAN scrollar på window; från och med den scrollar
// <main> internt. Skript som väljer scroll-container (stickyBar.ts,
// hrGuide.ts) importerar konstanten så att värdena aldrig glider isär.
export const DESKTOP_MQ = "(min-width: 1024px)";
