// Delad domän-filtrering. Togglar synlighet på server-renderade kort utifrån
// deras data-domains. "all" visar allt. Klarar flera [data-filter-target]-listor
// på samma sida (t.ex. startsidans Arbete + Skrivet), var och en med egen
// [data-filter-empty]. Idempotent + re-bindas på astro:page-load (View Transitions).
export function initDomainFilter() {
    function bind() {
        const bar = document.querySelector<HTMLElement>('[data-domain-filterbar]');
        if (!bar || bar.dataset.filterBound === '1') return;
        const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-filter-target]'));
        if (!targets.length) return;
        bar.dataset.filterBound = '1';

        const chips = Array.from(bar.querySelectorAll<HTMLButtonElement>('button[data-filter]'));

        const apply = (value: string) => {
            targets.forEach((list) => {
                let shown = 0;
                list.querySelectorAll<HTMLElement>('[data-domains]').forEach((el) => {
                    const ds = (el.dataset.domains ?? '').split(' ').filter(Boolean);
                    const match = value === 'all' || ds.includes(value);
                    el.hidden = !match;
                    if (match) shown++;
                });
                // Per-lista empty-state: [data-filter-empty] i samma förälder.
                const empty = list.parentElement?.querySelector<HTMLElement>('[data-filter-empty]');
                if (empty) empty.hidden = shown !== 0;
            });
            chips.forEach((c) => {
                const on = c.dataset.filter === value;
                c.classList.toggle('is-active', on);
                c.setAttribute('aria-pressed', String(on));
            });
        };

        chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter ?? 'all')));
    }
    bind();
    document.addEventListener('astro:page-load', bind);
}
