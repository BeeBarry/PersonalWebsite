// Domän-taxonomi — enda sanningskällan för innehållssortering (startsidans
// filter + filterchips på /works och /posts). content.config.ts återanvänder
// DOMAIN_SLUGS i sina z.enum så taxonomi och schema aldrig glider isär.
// Ordning speglar positioneringen: kärna (Fullstack, Cloud) först, IoT sist.

export const DOMAIN_SLUGS = ["web", "cloud", "embedded"] as const;
export type DomainSlug = (typeof DOMAIN_SLUGS)[number];

export interface Domain {
    slug: DomainSlug;
    title: string;
    /** Kort etikett för små domän-taggar på kort. */
    short: string;
    description: string;
}

export const domains: Domain[] = [
    {
        slug: "web",
        title: "Fullstack & Web",
        short: "Fullstack",
        description: "Fullstack-appar, sajter och utvecklarverktyg.",
    },
    {
        slug: "cloud",
        title: "Cloud & DevOps",
        short: "Cloud",
        description: "Skalbar infrastruktur, containrar, pipelines och drift.",
    },
    {
        slug: "embedded",
        title: "IoT & Embedded",
        short: "IoT",
        description: "Hårdvarunära kod, CoAP/LTE-M och enheter ute i fält.",
    },
];

// Hjälpare: domän-objekt per slug (titel/kort/beskrivning i UI).
export const domainBySlug = new Map<string, Domain>(domains.map((d) => [d.slug, d]));
