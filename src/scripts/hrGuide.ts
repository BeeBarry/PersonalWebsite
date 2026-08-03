// Teknik-guidens klientlogik: inre flikar (segmented control + ?flik=-djuplänk),
// bibliotekssök & typfilter, dragspel (Översätt/FAQ), FAQ-kategorier och
// ordlistans sök/kategori/sortering med bokstavsavdelare. Rent DOM-arbete på
// server-renderat innehåll — utan JS visas Bibliotek och allt är läsbart.
// Idempotent + rebindas på astro:page-load (View Transitions), som sajtens
// övriga script (domainFilter.ts, stickyBar.ts).

const TABS = ["bib", "ovs", "faq", "ord"] as const;

// Modul-scope-guard: kort-switcherns "stäng vid klick utanför"-lyssnare binds
// bara en gång (överlever View Transitions, letar switchern dynamiskt).
let switchDismissBound = false;

function initTabs(root: HTMLElement) {
  const tabs = Array.from(
    root.querySelectorAll<HTMLAnchorElement>("[data-hr-tab]"),
  );
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-hr-panel]"),
  );
  // Topbaren finns även på kort-sidan (utan paneler) — där ska flikarna navigera
  // tillbaka till rätt sektion, så vi lämnar länkarna orörda.
  if (!tabs.length || !panels.length) return;
  const main = document.querySelector<HTMLElement>("main");

  const show = (id: string, updateUrl: boolean, scroll: boolean) => {
    tabs.forEach((t) => {
      const on = t.dataset.hrTab === id;
      t.classList.toggle("is-active", on);
      if (on) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    panels.forEach((p) => {
      p.hidden = p.dataset.hrPanel !== id;
    });
    if (scroll) {
      main?.scrollTo({ top: 0 });
      window.scrollTo({ top: 0 });
    }
    if (updateUrl) {
      const url = new URL(location.href);
      if (id === "bib") url.searchParams.delete("flik");
      else url.searchParams.set("flik", id);
      history.replaceState({}, "", url);
    }
  };

  // Fånga klick client-side (annars navigerar länken); ger snabb växling utan
  // omladdning på startsidan.
  tabs.forEach((t) =>
    t.addEventListener("click", (e) => {
      e.preventDefault();
      show(t.dataset.hrTab || "bib", true, true);
    }),
  );

  // Öppna flik från ?flik= (djuplänk, t.ex. "Alla frågor i FAQ →").
  const wanted = new URL(location.href).searchParams.get("flik");
  if (wanted && TABS.includes(wanted as (typeof TABS)[number]) && wanted !== "bib") {
    show(wanted, false, false);
  }
}

function initLibrary(root: HTMLElement) {
  const lib = root.querySelector<HTMLElement>("[data-hr-library]");
  if (!lib) return;

  const input = lib.querySelector<HTMLInputElement>("[data-hr-search-input]");
  const clears = Array.from(
    lib.querySelectorAll<HTMLButtonElement>("[data-hr-search-clear]"),
  );
  const typeChips = Array.from(
    lib.querySelectorAll<HTMLButtonElement>("[data-hr-type]"),
  );
  const cards = Array.from(lib.querySelectorAll<HTMLElement>("[data-hr-card]"));
  const groups = Array.from(lib.querySelectorAll<HTMLElement>("[data-hr-group]"));
  const countEl = lib.querySelector<HTMLElement>("[data-hr-count]");
  const empty = lib.querySelector<HTMLElement>("[data-hr-empty]");
  const searchWrap = lib.querySelector<HTMLElement>("[data-hr-search-wrap]");

  let query = "";
  let type = "Alla";

  const apply = () => {
    let shown = 0;
    cards.forEach((c) => {
      const matchType = type === "Alla" || c.dataset.hrTyp === type;
      const matchQuery = !query || (c.dataset.hrSearch ?? "").includes(query);
      const vis = matchType && matchQuery;
      c.hidden = !vis;
      if (vis) shown++;
    });
    groups.forEach((g) => {
      const any = Array.from(
        g.querySelectorAll<HTMLElement>("[data-hr-card]"),
      ).some((c) => !c.hidden);
      g.hidden = !any;
    });
    if (countEl) countEl.textContent = `${shown} ${shown === 1 ? "träff" : "träffar"}`;
    if (empty) empty.hidden = shown !== 0;
    searchWrap?.toggleAttribute("data-has-value", query.length > 0);
  };

  const setType = (value: string) => {
    type = value;
    typeChips.forEach((c) => {
      const on = c.dataset.hrType === value;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
  };

  input?.addEventListener("input", () => {
    query = input.value.trim().toLowerCase();
    apply();
  });
  typeChips.forEach((chip) =>
    chip.addEventListener("click", () => {
      setType(chip.dataset.hrType ?? "Alla");
      apply();
    }),
  );
  clears.forEach((btn) =>
    btn.addEventListener("click", () => {
      query = "";
      if (input) input.value = "";
      setType("Alla"); // README: rensa nollställer även typ-filtret
      apply();
      input?.focus();
    }),
  );

  apply();
}

// Dragspel (Översätt + FAQ): en öppen i taget per accordion.
function initAccordions(root: HTMLElement) {
  const accordions = Array.from(
    root.querySelectorAll<HTMLElement>("[data-hr-accordion]"),
  );

  accordions.forEach((acc) => {
    const heads = Array.from(
      acc.querySelectorAll<HTMLButtonElement>("[data-hr-acc-head]"),
    );

    const setOpen = (head: HTMLButtonElement, open: boolean) => {
      head.setAttribute("aria-expanded", String(open));
      const body = head.parentElement?.querySelector<HTMLElement>(
        "[data-hr-acc-body]",
      );
      if (body) body.hidden = !open;
      const sign = head.querySelector<HTMLElement>(".hr-acc__sign");
      if (sign) sign.textContent = open ? "−" : "+";
    };

    heads.forEach((head) =>
      head.addEventListener("click", () => {
        const wasOpen = head.getAttribute("aria-expanded") === "true";
        heads.forEach((h) => setOpen(h, false));
        if (!wasOpen) setOpen(head, true);
      }),
    );
  });
}

function initFaqCats(root: HTMLElement) {
  const faq = root.querySelector<HTMLElement>("[data-hr-faq]");
  if (!faq) return;

  const chips = Array.from(
    faq.querySelectorAll<HTMLButtonElement>("[data-hr-faqcat]"),
  );
  const items = Array.from(
    faq.querySelectorAll<HTMLElement>("[data-hr-faqitem]"),
  );

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      const cat = chip.dataset.hrFaqcat;
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      items.forEach((it) => {
        it.hidden = it.dataset.hrCat !== cat;
      });
    }),
  );
}

function initGlossary(root: HTMLElement) {
  const gloss = root.querySelector<HTMLElement>("[data-hr-glossary]");
  if (!gloss) return;

  const input = gloss.querySelector<HTMLInputElement>("[data-hr-gloss-input]");
  const clear = gloss.querySelector<HTMLButtonElement>("[data-hr-gloss-clear]");
  const searchWrap = gloss.querySelector<HTMLElement>("[data-hr-search-wrap]");
  const chips = Array.from(
    gloss.querySelectorAll<HTMLButtonElement>("[data-hr-glosscat]"),
  );
  const sortBtn = gloss.querySelector<HTMLButtonElement>("[data-hr-gloss-sort]");
  const sortLabel = gloss.querySelector<HTMLElement>("[data-hr-sort-label]");
  const list = gloss.querySelector<HTMLElement>("[data-hr-gloss-list]");
  const empty = gloss.querySelector<HTMLElement>("[data-hr-gloss-empty]");
  const rows = Array.from(
    gloss.querySelectorAll<HTMLElement>("[data-hr-gloss-row]"),
  );
  if (!list) return;

  let query = "";
  let cat = "Alla";
  let sort: "az" | "top" = "az";

  const render = () => {
    const visible = rows.filter((r) => {
      const mc = cat === "Alla" || r.dataset.hrCat === cat;
      const mq = !query || (r.dataset.hrSearch ?? "").includes(query);
      return mc && mq;
    });

    visible.sort((a, b) =>
      sort === "az"
        ? (a.dataset.hrTerm ?? "").localeCompare(b.dataset.hrTerm ?? "", "sv")
        : Number(a.dataset.hrOrder) - Number(b.dataset.hrOrder),
    );

    // Bygg om avdelarna varje gång (bara i A–Ö-läge).
    list.querySelectorAll("[data-hr-letter-sep]").forEach((el) => el.remove());
    rows.forEach((r) => {
      r.hidden = true;
    });

    let lastLetter = "";
    visible.forEach((r) => {
      if (sort === "az") {
        const letter = r.dataset.hrLetter ?? "";
        if (letter !== lastLetter) {
          const sep = document.createElement("div");
          sep.className = "hr-gloss__letter";
          sep.setAttribute("data-hr-letter-sep", "");
          sep.textContent = letter;
          list.appendChild(sep);
          lastLetter = letter;
        }
      }
      r.hidden = false;
      list.appendChild(r);
    });

    if (empty) empty.hidden = visible.length !== 0;
    searchWrap?.toggleAttribute("data-has-value", query.length > 0);
  };

  input?.addEventListener("input", () => {
    query = input.value.trim().toLowerCase();
    render();
  });
  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      cat = chip.dataset.hrGlosscat ?? "Alla";
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      render();
    }),
  );
  sortBtn?.addEventListener("click", () => {
    sort = sort === "az" ? "top" : "az";
    if (sortLabel) sortLabel.textContent = sort === "az" ? "A–Ö" : "Vanligast först";
    render();
  });
  clear?.addEventListener("click", () => {
    query = "";
    if (input) input.value = "";
    render();
    input?.focus();
  });

  render();
}

// Kort-switcher i kort-sidans topbar: sök + typ-chips filtrerar en meny av alla
// kort. Låter användaren byta kort i fullskärm utan att gå tillbaka till listan.
function initSwitcher(root: HTMLElement) {
  const sw = root.querySelector<HTMLElement>("[data-hr-switcher]");
  if (!sw) return;

  const input = sw.querySelector<HTMLInputElement>("[data-hr-switch-input]");
  const clear = sw.querySelector<HTMLButtonElement>("[data-hr-switch-clear]");
  const wrap = sw.querySelector<HTMLElement>("[data-hr-switch-wrap]");
  const typeChips = Array.from(
    sw.querySelectorAll<HTMLButtonElement>("[data-hr-switch-types] [data-hr-type]"),
  );
  const panel = sw.querySelector<HTMLElement>("[data-hr-switch-panel]");
  const items = Array.from(
    sw.querySelectorAll<HTMLElement>("[data-hr-switch-item]"),
  );
  const count = sw.querySelector<HTMLElement>("[data-hr-switch-count]");
  const empty = sw.querySelector<HTMLElement>("[data-hr-switch-empty]");
  if (!panel) return;

  let query = "";
  let type = "Alla";

  const apply = () => {
    let shown = 0;
    items.forEach((it) => {
      const mt = type === "Alla" || it.dataset.hrTyp === type;
      const mq = !query || (it.dataset.hrSearch ?? "").includes(query);
      const vis = mt && mq;
      it.hidden = !vis;
      if (vis) shown++;
    });
    if (count) count.textContent = `${shown} kort`;
    if (empty) empty.hidden = shown !== 0;
    wrap?.toggleAttribute("data-has-value", query.length > 0);
  };

  const open = () => (panel.hidden = false);

  input?.addEventListener("focus", open);
  input?.addEventListener("input", () => {
    query = input.value.trim().toLowerCase();
    apply();
    open();
  });
  typeChips.forEach((chip) =>
    chip.addEventListener("click", () => {
      type = chip.dataset.hrType ?? "Alla";
      typeChips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      apply();
      open();
    }),
  );
  clear?.addEventListener("click", () => {
    query = "";
    if (input) input.value = "";
    type = "Alla";
    typeChips.forEach((c) => {
      const on = c.dataset.hrType === "Alla";
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    apply();
    input?.focus();
  });

  // Stäng vid klick utanför / Escape (binds en gång, letar switchern dynamiskt).
  if (!switchDismissBound) {
    switchDismissBound = true;
    document.addEventListener("click", (e) => {
      const s = document.querySelector<HTMLElement>("[data-hr-switcher]");
      const p = s?.querySelector<HTMLElement>("[data-hr-switch-panel]");
      if (s && p && !s.contains(e.target as Node)) p.hidden = true;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const p = document.querySelector<HTMLElement>("[data-hr-switch-panel]");
      if (p) p.hidden = true;
    });
  }

  apply();
}

// Innehållsförteckning (kort-detalj): markera aktivt avsnitt vid scroll
// (scroll-spy) och mjuk-scrolla vid klick. Fungerar för både sidopanelen
// (desktop) och den horisontella hoppa-till-raden (mobil).
function initToc(root: HTMLElement) {
  const links = Array.from(
    root.querySelectorAll<HTMLAnchorElement>("[data-hr-toc-link]"),
  );
  if (!links.length) return;

  const ids = [...new Set(links.map((l) => l.dataset.hrTocLink ?? ""))];
  const targets = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);
  if (!targets.length) return;

  const main = document.querySelector<HTMLElement>("main");
  const topbar = root.querySelector<HTMLElement>(".hr-topbar");
  const desktop = window.matchMedia("(min-width: 768px)");
  // Offset = sticky topbarens faktiska höjd + luft (mäts dynamiskt).
  const offset = () => (topbar?.offsetHeight ?? 120) + 20;

  const setActive = (id: string) => {
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.hrTocLink === id));
  };

  const update = () => {
    const refY = offset() + 8;
    let active = targets[0].id;
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= refY) active = t.id;
    }
    setActive(active);
  };

  links.forEach((l) =>
    l.addEventListener("click", (e) => {
      const id = l.dataset.hrTocLink ?? "";
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      // Instant scroll (fungerar överallt); CSS scroll-behavior på containern
      // ger mjuk animation i browsers som stödjer det.
      const off = offset();
      if (desktop.matches && main) {
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
      history.replaceState(null, "", `#${id}`);
      setActive(id);
    }),
  );

  main?.addEventListener("scroll", update, { passive: true });
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}

export function initHrGuide() {
  function bind() {
    const root = document.querySelector<HTMLElement>(".hr");
    if (!root || root.dataset.hrBound === "1") return;
    root.dataset.hrBound = "1";

    initTabs(root);
    initLibrary(root);
    initAccordions(root);
    initFaqCats(root);
    initGlossary(root);
    initSwitcher(root);
    initToc(root);
  }
  bind();
  document.addEventListener("astro:page-load", bind);
}
