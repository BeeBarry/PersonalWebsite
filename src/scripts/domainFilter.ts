// Delad innehållsfiltrering. Togglar synlighet på server-renderade kort/rader
// utifrån deras data-tags (space-separerade taggar: type ELLER domän).
// "all" visar allt. Stödjer FLERA filterbars på samma sida (t.ex. sidans egen
// + den i sticky-headern) som styr samma [data-filter-target] och hålls i synk.
// Vid filterbyte scrollas main mjukt till toppen. Idempotent + re-bindas på
// astro:page-load (View Transitions).
export function initDomainFilter() {
    function bind() {
        const bars = Array.from(
            document.querySelectorAll<HTMLElement>("[data-domain-filterbar]"),
        );
        if (!bars.length || bars[0].dataset.filterBound === "1") return;
        const targets = Array.from(
            document.querySelectorAll<HTMLElement>("[data-filter-target]"),
        );
        if (!targets.length) return;
        bars.forEach((b) => (b.dataset.filterBound = "1"));

        const allChips = bars.flatMap((bar) =>
            Array.from(bar.querySelectorAll<HTMLButtonElement>("button[data-filter]")),
        );
        const main = document.querySelector<HTMLElement>("main");

        const apply = (value: string, scroll: boolean) => {
            targets.forEach((list) => {
                let shown = 0;
                list.querySelectorAll<HTMLElement>("[data-tags]").forEach((el) => {
                    const ds = (el.dataset.tags ?? "").split(" ").filter(Boolean);
                    const match = value === "all" || ds.includes(value);
                    el.hidden = !match;
                    if (match) shown++;
                });
                const empty = list.parentElement?.querySelector<HTMLElement>(
                    "[data-filter-empty]",
                );
                if (empty) empty.hidden = shown !== 0;
            });
            // Synka aktiv-state över ALLA chips (sidan + sticky-header).
            allChips.forEach((c) => {
                const on = c.dataset.filter === value;
                c.classList.toggle("is-active", on);
                c.setAttribute("aria-pressed", String(on));
            });
            // Mjuk scroll till toppen så nyfiltrerat innehåll visas lugnt.
            if (scroll && main) main.scrollTo({ top: 0, behavior: "smooth" });
        };

        allChips.forEach((c) =>
            c.addEventListener("click", () => apply(c.dataset.filter ?? "all", true)),
        );
    }
    bind();
    document.addEventListener("astro:page-load", bind);
}
