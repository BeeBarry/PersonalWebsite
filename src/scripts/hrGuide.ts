// Teknik-guidens klientlogik: inre flikar (segmented control + ?flik=-djuplänk),
// bibliotekssök & typfilter, dragspel (Översätt/FAQ) och ordlistans
// sök/kategori/sortering med bokstavsavdelare. Rent DOM-arbete på
// server-renderat innehåll — utan JS visas Bibliotek och allt är läsbart.
// Idempotent + rebindas på astro:page-load (View Transitions), som sajtens
// övriga script (domainFilter.ts, stickyBar.ts).

const TABS = ["bib", "ovs", "faq", "ord"] as const;

// Modul-scope-guard: kort-switcherns "stäng vid klick utanför"-lyssnare binds
// bara en gång (överlever View Transitions, letar switchern dynamiskt).
let switchDismissBound = false;
// Samma mönster för astro:page-load-bindningen — annars staplas den vid
// varje navigering.
let pageLoadBound = false;

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
      // Bevara history.state — Astros ClientRouter lagrar sitt `index` där och
      // avbryter tyst i onPopState om state saknas eller nollas. Skriver vi över
      // det slutar bakåtknappen byta sida (bara adressfältet ändras).
      history.replaceState(history.state, "", url);
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
    // Hel mening: räknaren är aria-live, och "13 träffar → 2 träffar" säger
    // inget för den som lyssnar. Raden visas bara när den säger något — i
    // utgångsläget är "13 av 13" bara krom ovanför första kortet.
    if (countEl) {
      countEl.textContent = `${shown} av ${cards.length} kort visas`;
      countEl.hidden = !query && type === "Alla";
    }
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

// Dragspel (Annonsen): en öppen i taget per accordion. Frågor använde tidigare
// samma mekanik men har egen logik nu, se initFaq.
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

// Frågor: rutnät av frågor + en svarsyta per grupp. Ett dragspel i flera
// spalter går inte — svaret bor då inne i sin spalt och river ett hål bredvid
// sig när det fälls ut. Här är bläddrandet (rutnätet, som aldrig rör sig) skilt
// från läsandet (svarsytan, alltid på samma plats under sin grupp).
//
// En öppen i taget, över alla grupper. Klick på en redan öppen fråga stänger
// den — då står rutnätet ensamt, vilket är det bästa läget för att skumma.
function initFaq(root: HTMLElement) {
  const faq = root.querySelector<HTMLElement>("[data-hr-faq]");
  if (!faq) return;

  const questions = Array.from(
    faq.querySelectorAll<HTMLButtonElement>("[data-hr-q]"),
  );
  const answers = Array.from(faq.querySelectorAll<HTMLElement>("[data-hr-a]"));
  if (!questions.length || !answers.length) return;

  const show = (id: string | null) => {
    questions.forEach((q) => {
      const on = q.dataset.hrQ === id;
      q.classList.toggle("is-open", on);
      q.setAttribute("aria-expanded", String(on));
    });
    answers.forEach((a) => {
      a.hidden = a.dataset.hrA !== id;
    });
  };

  questions.forEach((q) =>
    q.addEventListener("click", () => {
      const open = q.getAttribute("aria-expanded") === "true";
      const id = open ? null : (q.dataset.hrQ ?? null);
      show(id);
      if (!id) return;

      // Svarsytan ligger under HELA gruppen, inte under den klickade frågan.
      // På desktop, där gruppen är en rad, spelar det ingen roll — men i en
      // spalt (mobil) kan svaret hamna två kort längre ner än fingret.
      // block:"nearest" scrollar bara när det verkligen behövs, så ett svar
      // som redan syns står stilla.
      const answer = answers.find((a) => a.dataset.hrA === id);
      answer?.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }),
  );

  // Inget anrop till show() här: server-renderingen har redan f1 öppen och
  // resten hidden. Ett anrop hade bara kunnat orsaka ett hopp innan scriptet
  // hunnit köra.
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
  const count = gloss.querySelector<HTMLElement>("[data-hr-gloss-count]");
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

    // Samma regel som bibliotekets räknare: hel mening (raden är aria-live, och
    // "16 → 4" säger inget för den som lyssnar), och den visas bara när den
    // säger något. I utgångsläget är "16 av 16" bara krom ovanför första ordet.
    if (count) {
      count.textContent = `${visible.length} av ${rows.length} ord visas`;
      count.hidden = !query && cat === "Alla";
    }
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

// Stänger både kort-menyn och (på mobil) den hopfällda sökraden. Slår upp
// elementen vid varje anrop, så samma funktionsreferens överlever en swap.
function closeSwitch() {
  const panel = document.querySelector<HTMLElement>("[data-hr-switch-panel]");
  if (panel) panel.hidden = true;
  document
    .querySelector<HTMLElement>("[data-hr-topbar]")
    ?.removeAttribute("data-switch-open");
  document
    .querySelector<HTMLButtonElement>("[data-hr-switch-toggle]")
    ?.setAttribute("aria-expanded", "false");
}

// Kort-switcher i kort-sidans topbar: sök + typ-chips filtrerar en meny av alla
// kort. Låter användaren byta kort i fullskärm utan att gå tillbaka till listan.
// Under 768 px är hela raden hopfälld bakom sökknappen i baren (data-switch-open
// på topbaren) — den kostade annars 96 px av varje skärm.
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
  // Knappen ligger i topbarens övre rad, alltså utanför [data-hr-switcher].
  const topbar = root.querySelector<HTMLElement>("[data-hr-topbar]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-hr-switch-toggle]");
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
    if (count) count.textContent = `${shown} av ${items.length} kort visas`;
    if (empty) empty.hidden = shown !== 0;
    wrap?.toggleAttribute("data-has-value", query.length > 0);
  };

  const open = () => (panel.hidden = false);

  toggle?.addEventListener("click", () => {
    if (topbar?.hasAttribute("data-switch-open")) {
      closeSwitch();
      return;
    }
    topbar?.setAttribute("data-switch-open", "");
    toggle.setAttribute("aria-expanded", "true");
    open();
    input?.focus();
  });

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
      const target = e.target as Node | null;
      if (!s || !target || s.contains(target)) return;
      // Sökknappen togglar själv — annars stängde bubblan det klicket just öppnat.
      if (target instanceof Element && target.closest("[data-hr-switch-toggle]"))
        return;
      closeSwitch();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const wasOpen = !!document.querySelector("[data-hr-topbar][data-switch-open]");
      closeSwitch();
      // Tillbaka till knappen som öppnade raden — annars tappas fokus i tomma
      // luften när sökfältet försvinner.
      if (wasOpen)
        document
          .querySelector<HTMLButtonElement>("[data-hr-switch-toggle]")
          ?.focus();
    });
  }

  apply();
}

function bindHrGuide() {
  const root = document.querySelector<HTMLElement>(".hr");
  if (!root || root.dataset.hrBound === "1") return;
  root.dataset.hrBound = "1";

  initTabs(root);
  initLibrary(root);
  initAccordions(root);
  initFaq(root);
  initGlossary(root);
  initSwitcher(root);
}

export function initHrGuide() {
  bindHrGuide();
  if (!pageLoadBound) {
    pageLoadBound = true;
    document.addEventListener("astro:page-load", bindHrGuide);
  }
}
