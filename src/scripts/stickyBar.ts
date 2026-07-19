// Visar main-panelens sticky-header när man scrollat förbi ett ankare
// ([data-sticky-anchor], placerat efter chipsen/titeln) — inte en gissad
// pixeltröskel, så den funkar oavsett innehållshöjd. Togglar .is-visible
// (CSS sköter den mjuka glid-in-animationen). Idempotent + re-bindas på
// astro:page-load (View Transitions).
export function initStickyBar() {
    function bind() {
        const main = document.querySelector<HTMLElement>("main");
        const bar = document.querySelector<HTMLElement>("[data-sticky-bar]");
        if (!main || !bar || bar.dataset.stickyBound === "1") return;
        bar.dataset.stickyBound = "1";

        const anchor = document.querySelector<HTMLElement>("[data-sticky-anchor]");
        const barH = bar.offsetHeight || 52;
        const desktop = window.matchMedia("(min-width: 768px)");

        const update = () => {
            let show: boolean;
            // Referenslinje: panelens topp på desktop (intern scroll),
            // skärmens topp (0) på mobil (hela sidan scrollar).
            const refTop = desktop.matches ? main.getBoundingClientRect().top : 0;
            if (anchor) {
                // Visa när ankaret (slutet på chips/titel) når barens underkant,
                // så chipsen "ersätts" smidigt av baren.
                show = anchor.getBoundingClientRect().top <= refTop + barH;
            } else {
                show = (desktop.matches ? main.scrollTop : window.scrollY) > 200;
            }
            bar.classList.toggle("is-visible", show);
        };

        // Både panel-scroll (desktop) och sid-scroll (mobil) triggar uppdatering.
        main.addEventListener("scroll", update, { passive: true });
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update, { passive: true });
        update();
    }
    bind();
    document.addEventListener("astro:page-load", bind);
}
