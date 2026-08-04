// Innehållsförteckningens klientlogik (ArticleToc.astro): scroll-spy som
// markerar aktivt avsnitt, och mjuk-scroll vid klick med offset för det som
// ligger kvar överst i vyn. Fungerar för båda varianterna — sidopanelen
// (desktop) och den horisontella ”hoppa till”-raden (mobil/surfplatta).
// Idempotent + rebindas på astro:page-load (View Transitions), som sajtens
// övriga script (stickyBar.ts, hrGuide.ts).

import { DESKTOP_MQ } from "./breakpoints";

// Under tre poster är en innehållsförteckning bara brus. Konstanten bor här så
// att komponenten och sidornas layout-klass använder samma tröskel.
export const TOC_MIN_ITEMS = 3;

// Modul-scope-guardar: window-lyssnarna och astro:page-load-bindningen
// registreras EN gång per sidsession — elementen byts ut vid varje swap, så en
// guard på ett element skulle släppa igenom nya lyssnare vid varje navigering.
let windowListenersBound = false;
let pageLoadBound = false;

// Vilket avsnitt ett klick är på väg till. En mjuk scroll passerar varje rubrik
// på vägen, och utan spärr skulle scroll-spy hinna markera dem i tur och ordning
// innan den landar rätt — markeringen skulle blinka förbi mellanliggande
// avsnitt. Medan detta är satt hålls klickets markering kvar.
//
// Spärren är AVSIKTLIGT inte tidsbaserad. En timeout kan fastna (blir spärren
// aldrig släppt slutar scroll-spy uppdatera för resten av sidsessionen), och en
// timeout som är för kort släpper mitt i animationen. Här släpps den i stället
// när scroll-spy själv räknar fram målet — alltså exakt när vi är framme — och
// av vilken användarstyrd scroll som helst. Den kan därför inte hänga sig.
let pendingId: string | null = null;

// Löpande animation, så den kan avbrytas om användaren scrollar själv.
let tweenFrame = 0;

// Rör användaren scrollen själv ska hens avsikt vinna direkt — både markeringen
// och en pågående animation avbryts.
function releasePending() {
  pendingId = null;
  if (tweenFrame) {
    cancelAnimationFrame(tweenFrame);
    tweenFrame = 0;
  }
}

// Mjuk scroll i egen regi i stället för behavior:"smooth". Skälet är kontroll:
// animationen går att avbryta när användaren själv tar över scrollen, och vi
// kan garantera att klicket landar rätt även om inga frames levereras (dold
// flik, strypt rAF) — se skyddsnätet nedan. prefers-reduced-motion hoppar direkt.
function smoothScrollTo(scroller: HTMLElement | null, to: number) {
  const read = () => (scroller ? scroller.scrollTop : window.scrollY);
  const write = (v: number) => {
    if (scroller) scroller.scrollTop = v;
    else window.scrollTo(0, v);
  };

  if (tweenFrame) cancelAnimationFrame(tweenFrame);

  const from = read();
  const distance = to - from;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || Math.abs(distance) < 2) {
    write(to);
    return;
  }

  // Längre hopp får ta lite längre tid, men aldrig så länge att det känns trögt.
  const duration = Math.min(600, Math.max(240, Math.abs(distance) * 0.45));
  const start = performance.now();
  // easeOutCubic: snabb start, mjuk inbromsning — samma karaktär som resten av
  // sajtens rörelser (jfr sticky-barens cubic-bezier).
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  let gotFrame = false;
  const step = (now: number) => {
    gotFrame = true;
    const p = Math.min(1, (now - start) / duration);
    write(from + distance * ease(p));
    if (p < 1) {
      tweenFrame = requestAnimationFrame(step);
    } else {
      tweenFrame = 0;
      // Framme: lämna över till scroll-spy igen. Släppet hänger på att
      // animationen är klar — INTE på att scroll-spy råkar räkna fram just det
      // här målet. Sista rubriken kan nämligen ligga så nära dokumentslutet att
      // den aldrig når referenslinjen, och spärren skulle då aldrig lösas ut.
      pendingId = null;
    }
  };
  tweenFrame = requestAnimationFrame(step);

  // Skyddsnät: rAF stryps helt i dolda dokument (visibilityState "hidden") och
  // kan pausas av browsern i andra lägen. Kommer ingen frame i tid hoppar vi
  // direkt till målet — ett klick i förteckningen ska aldrig kunna bli en
  // no-op, oavsett om animationen hinner köra eller inte.
  setTimeout(() => {
    if (gotFrame) return;
    if (tweenFrame) cancelAnimationFrame(tweenFrame);
    tweenFrame = 0;
    write(to);
    pendingId = null;
  }, 150);
}

// Det som ligger kvar överst när man scrollar: kort-sidans topbar respektive
// läsvyns sticky-bar. De hör till andra komponenter och kan inte märkas upp
// härifrån, därför selektorer — höjden mäts däremot alltid i DOM (den skiljer
// sig mellan sidor och brytpunkter).
const STICKY_ABOVE = ".hr-topbar, [data-sticky-bar]";

function tocOffset() {
  let height = 0;
  document.querySelectorAll<HTMLElement>(STICKY_ABOVE).forEach((el) => {
    const pos = getComputedStyle(el).position;
    if (pos !== "sticky" && pos !== "fixed") return;
    height = Math.max(height, el.offsetHeight);
  });
  return height + 20;
}

function tocLinks() {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]"));
}

function setActive(id: string) {
  tocLinks().forEach((l) => l.classList.toggle("is-active", l.dataset.tocLink === id));
}

// Modul-scope: slår upp elementen vid varje anrop, så samma funktionsreferens
// fungerar även efter att DOM bytts ut vid en View-Transition-swap.
function tocUpdate() {
  const links = tocLinks();
  if (!links.length) return;

  const ids = [...new Set(links.map((l) => l.dataset.tocLink ?? ""))];
  const targets = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);
  if (!targets.length) return;

  // getBoundingClientRect mäter mot VIEWPORTENS topp, men på desktop scrollar
  // innehållet inuti <main> — som självt börjar en bit ner (kortets ram och
  // sidmarginal). Utan den korrigeringen jämförs elementets viewport-position
  // mot en referenslinje som utgår från noll, och rubriken räknas som "ej
  // passerad" trots att den ligger överst i den synliga ytan. Följden var att
  // ett klick markerade FÖREGÅENDE rubrik i stället för den man klickade på.
  const main = document.querySelector<HTMLElement>("main");
  const containerTop =
    window.matchMedia(DESKTOP_MQ).matches && main
      ? main.getBoundingClientRect().top
      : 0;
  const refY = containerTop + tocOffset() + 8;

  let active = targets[0].id;
  for (const t of targets) {
    if (t.getBoundingClientRect().top <= refY) active = t.id;
  }

  // Sista rubriken kan ligga så nära dokumentets slut att den aldrig når
  // referenslinjen — scrollen tar slut först. Har vi nått botten är det den
  // sista posten som gäller, annars kan den aldrig markeras.
  const scroller = window.matchMedia(DESKTOP_MQ).matches && main ? main : null;
  const nearBottom = scroller
    ? scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
    : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  if (nearBottom) active = targets[targets.length - 1].id;

  // På väg mot ett klickat mål: håll kvar markeringen tills animationen är
  // klar (smoothScrollTo nollar pendingId då). Utan detta skulle markeringen
  // blinka förbi varje mellanliggande avsnitt under scrollen.
  if (pendingId) active = pendingId;

  links.forEach((l) => l.classList.toggle("is-active", l.dataset.tocLink === active));
}

function onLinkClick(e: MouseEvent) {
  const link = e.currentTarget as HTMLAnchorElement;
  const id = link.dataset.tocLink ?? "";
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();

  // Markera direkt och håll markeringen tills scroll-spy räknat fram samma mål.
  setActive(id);
  pendingId = id;

  const off = tocOffset();
  const main = document.querySelector<HTMLElement>("main");
  // Under lg scrollar hela sidan på window — main är ingen scroll-container.
  if (window.matchMedia(DESKTOP_MQ).matches && main) {
    const top =
      el.getBoundingClientRect().top -
      main.getBoundingClientRect().top +
      main.scrollTop -
      off;
    smoothScrollTo(main, Math.max(0, top));
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - off;
    smoothScrollTo(null, Math.max(0, top));
  }
  // `null` som state får Astros onPopState att returnera direkt
  // (router.js: `if (ev.state === null) return`) — bakåtknappen slutar då byta
  // sida. Bevara därför det befintliga state-objektet.
  history.replaceState(history.state, "", `#${id}`);
}

function bindToc() {
  const navs = Array.from(document.querySelectorAll<HTMLElement>("[data-toc]"));
  if (!navs.length) return;

  const hasTargets = tocLinks()
    .map((l) => document.getElementById(l.dataset.tocLink ?? ""))
    .some((el) => !!el);
  if (!hasTargets) return;

  navs.forEach((nav) => {
    if (nav.dataset.tocBound === "1") return;
    nav.dataset.tocBound = "1";
    // Element-lokala lyssnare: dör med elementen vid nästa swap.
    nav
      .querySelectorAll<HTMLAnchorElement>("[data-toc-link]")
      .forEach((l) => l.addEventListener("click", onLinkClick));
  });

  // Samma funktionsreferens varje gång → addEventListener avduplicerar om
  // <main> råkar överleva en swap.
  document
    .querySelector<HTMLElement>("main")
    ?.addEventListener("scroll", tocUpdate, { passive: true });

  if (!windowListenersBound) {
    windowListenersBound = true;
    window.addEventListener("scroll", tocUpdate, { passive: true });
    window.addEventListener("resize", tocUpdate, { passive: true });
    // Scrollar användaren själv mitt under ett pågående hopp ska hens avsikt
    // vinna direkt — annars stod klickets markering kvar tills målet nåtts.
    window.addEventListener("wheel", releasePending, { passive: true });
    window.addEventListener("touchstart", releasePending, { passive: true });
    window.addEventListener("keydown", releasePending, { passive: true });
  }
  tocUpdate();
}

export function initToc() {
  bindToc();
  if (!pageLoadBound) {
    pageLoadBound = true;
    document.addEventListener("astro:page-load", bindToc);
  }
}
