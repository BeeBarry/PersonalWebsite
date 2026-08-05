// Innehållslager för Teknik-guiden (HR-fliken). Typar och tolkar
// src/data/hr-content.json (redaktionell copy, redigeras fritt utan kodändring)
// och exponerar hjälpare för gruppering, räknare och korslänkning.
//
// Taxonomin bär hela sektionen: `typ` = VAD något är (roll vs färdighet),
// `dom` = VAR i produkten. Biblioteket grupperar roller för sig, resten per
// domän — så skillnaden syns utan att förklaras. Se README i handoff-mappen.
import hrContent from "./hr-content.json";

// ---- Taxonomi ---------------------------------------------------------------

export type HrTyp = "Roll" | "Språk" | "Ramverk" | "Verktyg" | "Arbetssätt";
export type HrDomän =
  | "Frontend"
  | "Backend"
  | "Cloud & DevOps"
  | "Data & AI"
  | "Tvärs över teamet";

// Ordning för typ-chips i Bibliotek (Alla läggs till i UI:t).
export const HR_TYPES: HrTyp[] = [
  "Roll",
  "Språk",
  "Ramverk",
  "Verktyg",
  "Arbetssätt",
];

// Ordning som domän-grupperna renderas i (roller alltid först, se groupLibrary).
export const HR_DOMAINS: HrDomän[] = [
  "Frontend",
  "Backend",
  "Cloud & DevOps",
  "Data & AI",
  "Tvärs över teamet",
];

// ---- Datatyper --------------------------------------------------------------

export interface HrConfusePair {
  /** Rubrik, t.ex. "Backend ≠ fullstack". */
  a: string;
  /** Förklaring. */
  b: string;
}

export interface HrAsk {
  /** Frågan HR kan ställa. */
  q: string;
  /** Vad ett bra svar låter som. */
  good: string;
}

export interface HrCard {
  id: string;
  title: string;
  typ: HrTyp;
  dom: HrDomän;
  /** One-liner i listan (finns även på utkast). */
  one: string;
  /** Utkast saknar `what` och visas med UTKAST-badge + "på gång"-block. */
  draft?: boolean;
  what?: string;
  analogy?: string;
  tasks?: string[];
  fits?: string[];
  confuse?: HrConfusePair[];
  /** Ord man ser i CV:t → mono-chips. */
  cv?: string[];
  ask?: HrAsk[];
  junior?: string;
  senior?: string;
}

export interface HrFaqItem {
  id: string;
  /** Var i processen HR står: Vanligast | Annonsen | Screening | CV & nivåer. */
  cat: string;
  /** Kort-id:n frågan hör ihop med (korslänkning åt båda håll). */
  tags: string[];
  q: string;
  a: string;
}

export interface HrTranslateRow {
  /** Frasen annonsen säger. */
  say: string;
  /** Ev. kort-id att djuplänka till. */
  card?: string;
  means: string;
  /** "Leta efter". */
  look: string;
  /** Varningsremsa. */
  watch: string;
}

export interface HrGlossaryTerm {
  /** Term. */
  t: string;
  cat: string;
  /** Definition (en mening). */
  d: string;
}

// Casta den importerade JSON:en till våra typer (JSON-import ger breda
// string-typer; taxonomin valideras redaktionellt, inte av kompilatorn).
const content = hrContent as unknown as {
  _meta: { lastUpdated: string };
  cards: HrCard[];
  faqCategories: string[];
  faq: HrFaqItem[];
  translate: HrTranslateRow[];
  glossaryCategories: string[];
  glossary: HrGlossaryTerm[];
};

export const hrCards: HrCard[] = content.cards;
export const hrFaq: HrFaqItem[] = content.faq;
export const hrFaqCategories: string[] = content.faqCategories;
export const hrTranslate: HrTranslateRow[] = content.translate;
export const hrGlossary: HrGlossaryTerm[] = content.glossary;
export const hrGlossaryCategories: string[] = content.glossaryCategories;

// ---- Ikoner -----------------------------------------------------------------
//
// Ikonen är presentation, inte innehåll, och bor därför här och inte i
// hr-content.json — samma uppdelning som src/data/categories.ts gör för
// Learn Hub.
//
// Inga nya beroenden: namnen kommer ur de fyra Iconify-paket som redan är
// installerade. Konventionen är densamma som på startsidan:
//   `logos:*`  riktiga varumärkesloggor, i sina egna färger
//   `mdi:*`    roller och arbetssätt utan logga — enfärgade, ärver textfärgen
//
// Saknas ett id faller iconFor tillbaka på en neutral kort-ikon, så guiden
// aldrig kraschar på ett nytt kort någon lagt till i JSON:en.
export const hrCardIcon: Record<string, string> = {
  // Varumärken
  "hr-react": "logos:react",
  "hr-k8s": "logos:kubernetes",
  "hr-ts": "logos:typescript-icon",
  "hr-py": "logos:python",
  "hr-cs": "logos:c-sharp",
  "hr-docker": "logos:docker-icon",
  // Enfärgad, inte logos:nextjs-icon: den senare är en svart cirkel med vit N
  // och tappar sin form mot det mörka kortet. Enfärgade märken ärver
  // currentColor och fungerar därför i båda temana — se ikonregeln i
  // config/site.ts.
  "hr-next": "simple-icons:nextdotjs",

  // Roller och arbetssätt — valda för att vara begripliga utan förklaring:
  // servern bakom appen, skärmen framför den, DevOps-loopen, dataflödet,
  // grenen som byggs om vid varje ändring, och tavlan teamet står vid.
  "hr-backend": "mdi:server-outline",
  "hr-fe": "mdi:monitor-dashboard",
  "hr-devops": "mdi:infinity",
  "hr-data": "mdi:database-sync-outline",
  "hr-cicd": "mdi:source-branch-sync",
  "hr-scrum": "mdi:view-dashboard-variant-outline",
};

export const iconFor = (id: string): string =>
  hrCardIcon[id] ?? "mdi:card-text-outline";

// ---- Hjälpare ---------------------------------------------------------------

// Utkast = kort utan `what` (README: draftRule). draft:true är en explicit
// markering, men avsaknad av `what` räcker — då kan "på gång"-blocket alltid
// visas utan att en flagga glöms bort.
export const isDraft = (c: HrCard): boolean => c.draft === true || !c.what;

export const cardById = (id: string): HrCard | undefined =>
  hrCards.find((c) => c.id === id);

// FAQ-poster vars `tags` innehåller kortets id — samma array driver båda
// ingångarna (kortets "Vanliga frågor om X" och FAQ-flikens "Läs kortet"-chips).
export const faqForCard = (id: string): HrFaqItem[] =>
  hrFaq.filter((f) => f.tags.includes(id));

export interface HrGroup {
  key: string;
  title: string;
  sub: string;
  cards: HrCard[];
}

// Bibliotekets gruppering: roller först i egen grupp, därefter en grupp per
// domän (i HR_DOMAINS-ordning) med de kort som INTE är roller. Tomma grupper
// utelämnas. Tar emot en (ev. filtrerad) kortlista så samma logik kan
// återanvändas på klienten om det någonsin behövs.
export function groupLibrary(cards: HrCard[] = hrCards): HrGroup[] {
  const groups: HrGroup[] = [];

  // Klara kort först inom varje grupp — annars möts besökaren av utkast i tre
  // av fyra grupper. `filter` ger en ny array, så sorteringen muterar inte
  // källdatan (och grupperna behåller sin inbördes ordning).
  const doneFirst = (list: HrCard[]) =>
    list.sort((a, b) => Number(isDraft(a)) - Number(isDraft(b)));

  const roles = cards.filter((c) => c.typ === "Roll");
  if (roles.length) {
    groups.push({
      key: "roles",
      title: "Roller i ett utvecklingsteam",
      sub: "Själva jobbet — det ni sätter i annonsrubriken",
      cards: doneFirst(roles),
    });
  }

  for (const dom of HR_DOMAINS) {
    const inDom = cards.filter((c) => c.typ !== "Roll" && c.dom === dom);
    if (inDom.length) {
      groups.push({
        key: dom,
        title: dom,
        sub: "Färdigheter och verktyg",
        cards: doneFirst(inDom),
      });
    }
  }

  return groups;
}

// Kort som är helt skrivna, i biblioteksordning. Driver både metaraden och
// utkastsidans "läs de färdiga korten"-rad — så listan aldrig kan bli inaktuell.
export const doneCards = (): HrCard[] => hrCards.filter((c) => !isDraft(c));

const MONTHS_SV = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

// "uppdaterad juli 2026" ur "2026-07".
export function updatedLabel(): string {
  const [y, m] = content._meta.lastUpdated.split("-").map(Number);
  const month = MONTHS_SV[(m ?? 1) - 1] ?? "";
  return `uppdaterad ${month} ${y ?? ""}`.trim();
}

// Metaraden i biblioteket: "3 kort klara · 10 på gång · 11 frågor · uppdaterad
// juli 2026". Räknar klara kort separat — "13 kort" lovade mer än guiden håller.
export function hrMetaLine(): string {
  const done = doneCards().length;
  const pending = hrCards.length - done;
  const parts = [`${done} kort klara`];
  if (pending > 0) parts.push(`${pending} på gång`);
  parts.push(`${hrFaq.length} frågor`, updatedLabel());
  return parts.join(" · ");
}

// Typografisk städning av redaktionell copy vid rendering (källan i JSON hålls
// enkel att skriva med raka tecken).
//
// SVENSKA citattecken: ”så här” — samma tecken (U+201D) före och efter, till
// skillnad från engelskans “så här”. Därför behövs ingen open/close-växling.
// Apostrof mellan bokstäver blir ’. Em-streck (—) i copyn lämnas orörda.
export function typo(input?: string): string {
  if (!input) return "";
  return input
    .replace(/"/g, "”")
    .replace(/(\p{L})'(\p{L})/gu, "$1’$2");
}
