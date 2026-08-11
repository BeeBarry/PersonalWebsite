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
     * ingen ikon renderas.
     *
     * Ikonerna står bredvid varandra på startsidan och måste därför ha samma
     * optiska vikt. Det avgörs inte av ikonrutan (den är alltid 20px) utan av
     * hur mycket av viewBoxen glyfen faktiskt fyller. Den gamla uppsättningen
     * mätte 16,7 / 13,3 / 11,8 enheter av 24 — den ena läste som en tung ruta,
     * den andra som ett litet märke, trots identiska rutor.
     *
     * De tre domänikonerna mäter 15,9 / 13,3 / 15,0, alla med bläckcentrum
     * ~10. Byter du en: mät med svg.getBBox() och håll höjden inom ett par
     * enheter från de andra, och centrum kring 10 — annars hamnar den i otakt.
     */
    icon?: string;
}

export const domains: Domain[] = [
    {
        slug: "web",
        title: "Fullstack & Web",
        short: "Fullstack",
        description: "Fullstack-appar, sajter och utvecklarverktyg.",
        icon: "mdi:layers-outline",
        bullets: [
            "Astro, React och Next.js i frontend",
            "API:er i C#/.NET och Node mot ORM",
            "Komponentbibliotek och designsystem",
        ],
    },
    {
        slug: "cloud",
        title: "Cloud & DevOps",
        short: "Cloud",
        description: "Skalbar infrastruktur, containrar, pipelines och drift.",
        icon: "mdi:cloud-outline",
        bullets: [
            "Docker och Kubernetes i Azure och self-hosted",
            "Infrastruktur som kod med Terraform, GitOps via ArgoCD",
            "CI/CD i GitLab och Jenkins som bygger, testar och släpper",
        ],
    },
    {
        slug: "embedded",
        title: "IoT & Embedded",
        short: "IoT",
        description: "Hårdvarunära kod, CoAP/LTE-M och enheter ute i fält.",
        icon: "mdi:developer-board",
        bullets: [
            "CoAP och MQTT över LTE-M och WiFi",
            "Sensordata från fält till moln",
            "Förvaltat embedded firmware i Zephyr och nRF",
        ],
    },
];

/**
 * Inriktningarna på startsidan. De tre tekniska posterna återanvänder
 * domäntaxonomin, medan IT-projektledning är en tvärgående kompetens och ska
 * därför inte bli en filterbar innehållsdomän i projekt eller fältnoteringar.
 */
export type Direction = Pick<Domain, "short" | "description" | "bullets" | "icon">;

export const directions: Direction[] = [
    ...domains,
    {
        short: "IT-projektledning",
        description: "Projektledning nära teknik, leverans och förbättringsarbete.",
        icon: "mdi:clipboard-check-outline",
        bullets: [
            "Certifierad Scrum Master",
            "Kortare YH-utbildningar inom Product Owner och Scrum Master",
            "1,5 år i leveransteam och Continuous Improvements",
        ],
    },
];

// Hjälpare: domän-objekt per slug (titel/kort/beskrivning i UI).
export const domainBySlug = new Map<string, Domain>(domains.map((d) => [d.slug, d]));
