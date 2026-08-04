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
    /**
     * Konkreta områden inom domänen — visas som punktlista på startsidan.
     * Håll dem korta (3–6 ord) och sanna; de läses som påståenden om vad du gör.
     */
    bullets: string[];
    /**
     * Iconify-namn för kortets ikon (t.ex. "mdi:cloud-outline"). Utelämnas →
     * ingen ikon renderas. Fyll i när ikonbiblioteket är valt.
     */
    icon?: string;
}

export const domains: Domain[] = [
    {
        slug: "web",
        title: "Fullstack & Web",
        short: "Fullstack",
        description: "Fullstack-appar, sajter och utvecklarverktyg.",
        bullets: [
            "Astro, React och Blazor i frontend",
            "API:er i C#/.NET och Node mot SQL",
            "Komponentbibliotek och designsystem",
        ],
    },
    {
        slug: "cloud",
        title: "Cloud & DevOps",
        short: "Cloud",
        description: "Skalbar infrastruktur, containrar, pipelines och drift.",
        bullets: [
            "Docker och Kubernetes i drift",
            "Infrastruktur som kod med Terraform",
            "CI/CD som bygger, testar och släpper",
        ],
    },
    {
        slug: "embedded",
        title: "IoT & Embedded",
        short: "IoT",
        description: "Hårdvarunära kod, CoAP/LTE-M och enheter ute i fält.",
        bullets: [
            "CoAP och MQTT över LTE-M",
            "Sensordata från fält till moln",
            "C nära hårdvaran",
        ],
    },
];

// Hjälpare: domän-objekt per slug (titel/kort/beskrivning i UI).
export const domainBySlug = new Map<string, Domain>(domains.map((d) => [d.slug, d]));
