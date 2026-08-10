// Innehållsutilities som delas mellan sidor.
import { categories } from "../data/categories";

// EN flagga styr allt ofärdigt innehåll: draft-poster, Learn Hub-kategorier
// med isVisible: false, och HR-sektionen.
//
// Varför inte import.meta.env.PROD? För att Cloudflare kör `astro build` för
// BÅDA miljöerna — prod-deployen från main och preview-deployen från develop.
// Miljöläget kan alltså inte skilja dem åt, och previewen hade visat exakt
// samma sak som prod. Preview-miljön sätter i stället PUBLIC_SHOW_UNPUBLISHED
// =true i Cloudflares Environment variables. PUBLIC_-prefixet är medvetet:
// Astro 6 slutade spegla icke-publika variabler till import.meta.env, och
// värdet är ingen hemlighet.
export const SHOW_UNPUBLISHED =
  import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_UNPUBLISHED === "true";

// HR-sektionen (/for-hr/) är ofärdig och byggs bara när flaggan är på.
export const SHOW_HR = SHOW_UNPUBLISHED;

// De Learn Hub-kategorier som ska genereras i det här bygget. Dolda kategorier
// får ingen sida alls i prod — inte en olänkad sida — så de kan varken hamna i
// sitemapen eller nås via en gissad URL.
export const buildableCategorySlugs = new Set(
  categories.filter((c) => c.isVisible || SHOW_UNPUBLISHED).map((c) => c.slug),
);

// Avgör om ett collection-entry ska visas.
// draft: true döljs i prod-bygget, visas i dev och i preview-miljön.
// Används som filter i getCollection(...) och i getStaticPaths().
export const showEntry = ({ data }: { data: { draft?: boolean } }): boolean =>
  SHOW_UNPUBLISHED ? true : data.draft !== true;

// Learn Hub har två grindar: artikelns egen draft-flagga OCH kategorins
// isVisible. Båda sitter här så att ingen sida kan byggas utan att också
// listas — det var så olänkade prod-URL:er uppstod tidigare.
export const showLearnEntry = (entry: {
  data: { draft?: boolean; category: string };
}): boolean =>
  showEntry(entry) && buildableCategorySlugs.has(entry.data.category);

// Posterna använder datumformatet "DD-MM-YYYY" → parsa för korrekt sortering.
// Returnerar millisekunder (timestamp) så listor kan sorteras med subtraktion.
// Tolererar även ISO-format "YYYY-MM-DD" och Date-objekt.
export const parsePostDate = (d: string | Date): number => {
  if (d instanceof Date) return d.getTime();
  if (typeof d !== 'string') return 0;
  // Försök ISO först
  if (/^\d{4}-\d{2}-\d{2}/.test(d)) {
    const t = new Date(d).getTime();
    if (!Number.isNaN(t)) return t;
  }
  // Annars DD-MM-YYYY
  const parts = d.split('-').map(Number);
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1).getTime();
  }
  return 0;
};

// Plocka ut år som sträng för gruppering. Hanterar "DD-MM-YYYY", ISO och Date.
export const postYear = (d: string | Date): string => {
  if (d instanceof Date) return String(d.getFullYear());
  if (typeof d !== 'string') return '';
  if (/^\d{4}-/.test(d)) return d.slice(0, 4);
  const parts = d.split('-');
  return parts[2] ?? '';
};
