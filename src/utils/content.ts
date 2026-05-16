// Avgör om ett collection-entry ska visas.
// I prod-bygget döljs draft: true. I `astro dev` visas allt (förhandsgranskning).
// Används som filter i getCollection(...) och i getStaticPaths().
export const showEntry = ({ data }: { data: { draft?: boolean } }): boolean =>
  import.meta.env.PROD ? data.draft !== true : true;
