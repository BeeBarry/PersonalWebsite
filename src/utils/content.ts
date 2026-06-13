// Innehållsutilities som delas mellan sidor.

// Avgör om ett collection-entry ska visas.
// I prod-bygget döljs draft: true. I `astro dev` visas allt (förhandsgranskning).
// Används som filter i getCollection(...) och i getStaticPaths().
export const showEntry = ({ data }: { data: { draft?: boolean } }): boolean =>
  import.meta.env.PROD ? data.draft !== true : true;

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
