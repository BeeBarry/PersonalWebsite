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

  const refY = tocOffset() + 8;
  let active = targets[0].id;
  for (const t of targets) {
    if (t.getBoundingClientRect().top <= refY) active = t.id;
  }
  links.forEach((l) => l.classList.toggle("is-active", l.dataset.tocLink === active));
}

function onLinkClick(e: MouseEvent) {
  const link = e.currentTarget as HTMLAnchorElement;
  const id = link.dataset.tocLink ?? "";
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();

  // Instant scroll (fungerar överallt); CSS scroll-behavior på containern
  // ger mjuk animation i browsers som stödjer det.
  const off = tocOffset();
  const main = document.querySelector<HTMLElement>("main");
  // Under lg scrollar hela sidan på window — main är ingen scroll-container.
  if (window.matchMedia(DESKTOP_MQ).matches && main) {
    const top =
      el.getBoundingClientRect().top -
      main.getBoundingClientRect().top +
      main.scrollTop -
      off;
    main.scrollTo({ top: Math.max(0, top) });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, top) });
  }
  // `null` som state får Astros onPopState att returnera direkt
  // (router.js: `if (ev.state === null) return`) — bakåtknappen slutar då byta
  // sida. Bevara därför det befintliga state-objektet.
  history.replaceState(history.state, "", `#${id}`);
  setActive(id);
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
