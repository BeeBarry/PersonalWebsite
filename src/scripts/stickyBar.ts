// Visar main-panelens sticky-header när man scrollat förbi ett ankare
// ([data-sticky-anchor], placerat efter chipsen/titeln) — inte en gissad
// pixeltröskel, så den funkar oavsett innehållshöjd. Togglar .is-visible
// (CSS sköter den mjuka glid-in-animationen). Idempotent + re-bindas på
// astro:page-load (View Transitions).
import { DESKTOP_MQ } from "./breakpoints";

// Modul-scope-guardar: window-lyssnarna (och astro:page-load-bindningen)
// registreras EN gång per sidsession. Elementen byts ut vid varje
// View-Transition-swap, så en guard på ett element skulle släppa igenom
// nya window-lyssnare vid varje navigering (de gamla pekar mot detached DOM).
let windowListenersBound = false;
let pageLoadBound = false;

// Modul-scope: slår upp elementen vid varje anrop, så samma funktions-
// referens fungerar även efter att DOM bytts ut.
function update() {
    const main = document.querySelector<HTMLElement>("main");
    const bar = document.querySelector<HTMLElement>("[data-sticky-bar]");
    if (!main || !bar) return;

    const anchor = document.querySelector<HTMLElement>("[data-sticky-anchor]");
    const barH = bar.offsetHeight || 52;
    const desktop = window.matchMedia(DESKTOP_MQ).matches;

    let show: boolean;
    // Referenslinje: panelens topp på desktop (intern scroll),
    // skärmens topp (0) på mobil/surfplatta (hela sidan scrollar).
    const refTop = desktop ? main.getBoundingClientRect().top : 0;
    if (anchor) {
        // Visa när ankaret (slutet på chips/titel) når barens underkant,
        // så chipsen "ersätts" smidigt av baren.
        show = anchor.getBoundingClientRect().top <= refTop + barH;
    } else {
        show = (desktop ? main.scrollTop : window.scrollY) > 200;
    }
    bar.classList.toggle("is-visible", show);
}

function bind() {
    const main = document.querySelector<HTMLElement>("main");
    const bar = document.querySelector<HTMLElement>("[data-sticky-bar]");
    if (!main || !bar || bar.dataset.stickyBound === "1") return;
    bar.dataset.stickyBound = "1";

    // Element-lokal lyssnare: dör med elementet vid nästa swap.
    main.addEventListener("scroll", update, { passive: true });

    // Sid-scroll (mobil/surfplatta) + resize: bara en gång per session.
    if (!windowListenersBound) {
        windowListenersBound = true;
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update, { passive: true });
    }
    update();
}

export function initStickyBar() {
    bind();
    if (!pageLoadBound) {
        pageLoadBound = true;
        document.addEventListener("astro:page-load", bind);
    }
}
