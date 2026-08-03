// Central sajtkonfiguration (Breeze-mönster) — enda sanningskällan för
// varumärke, navigation, sociala länkar och hero-text. Datadrivet så att
// nav/sidebar kan ändras på ett ställe. Ersätter på sikt src/data/navigation.ts.

export interface NavItem {
    /** Visningsnamn i nav (t.ex. "Arbete"). */
    name: string;
    /** Liten versal underetikett (t.ex. "Projekt"). */
    subtitle: string;
    /** Mål-URL (med trailing slash för sidkataloger). */
    href: string;
    /** Visas bara i `astro dev`, döljs i prod-bygget. */
    devOnly?: boolean;
}

export interface SocialItem {
    name: string;
    href: string;
    /** Iconify-namn (astro-icon), t.ex. "mdi:github". */
    icon: string;
}

const site = {
    meta: {
        title: "Barry Namdari",
        description:
            "Fullstack- & cloud-utvecklare med intresse för IoT och embedded.",
        author: "barrynamdari",
        lang: "sv",
    },

    // Textbaserat varumärke ("barry" + accent-dot), inte logotypbild.
    brand: {
        name: "barry",
    },

    // Vänster-nav. Learn Hub behålls devOnly (nåbar via URL, dold i prod-nav).
    navigation: [
        { name: "Hem", subtitle: "Index", href: "/" },
        { name: "Arbete", subtitle: "Projekt", href: "/works/" },
        { name: "Fältnoteringar", subtitle: "Notes", href: "/posts/" },
        { name: "Learn Hub", subtitle: "Docs", href: "/learn-hub/", devOnly: true },
        { name: "För HR", subtitle: "Rekrytering", href: "/for-hr/" },
    ] as NavItem[],

    social: [
        { name: "GitHub", href: "https://github.com/BeeBarry", icon: "mdi:github" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/barryolofnamdari/", icon: "mdi:linkedin" },
        { name: "Mail", href: "mailto:bonamdari@gmail.com", icon: "mdi:email-outline" },
    ] as SocialItem[],

    hero: {
        // Startsidan leder med roll + positionering, inte namnet (redundant
        // givet lettermärke + URL).
        role: "Fullstack- & cloudutvecklare",
        // Det som gör dig unik — hero-hooken. Redigera fritt.
        tagline:
            "Bygger skalbar infrastruktur i skärningspunkten mellan moln, kod och uppkopplad hårdvara.",
    },

    // "Om mig"-text på startsidan (redigera fritt — detta är dina egna ord).
    about: [
        "Jag började i projektledning och rörde mig mot koden. Idag bygger jag helst i skärningspunkten mellan applikation och infrastruktur, där helheten avgör om något faktiskt håller i produktion.",
        "Fokus ligger på molnnativ utveckling och skalbar infrastruktur, med ett genuint intresse för IoT och embedded. Jag gillar DevOps-tänk, tydlig arkitektur — och att förklara det jag lär mig, därav Learn Hub.",
    ],

    // Certifikat. Lägg badge-bilderna i static/certs/ och peka ut dem med
    // `badge` — annars visas `icon` (AWS-loggan) som platshållare.
    certs: [
        {
            name: "AWS Certified Cloud Practitioner",
            badge: "/certs/aws-cloud-practitioner.png",
            icon: "logos:aws",
        },
        {
            name: "AWS 900",
            badge: "/certs/aws-900.png",
            icon: "logos:aws",
        },
    ],

    // Verktyg & tekniker, grupperade. Färgade loggor (@iconify-json/logos);
    // SQL/protokoll saknar färgloggor → neutrala mdi-ikoner.
    stackGroups: [
        {
            title: "Språk",
            items: [
                { name: "C#", icon: "logos:c-sharp" },
                { name: "C", icon: "logos:c" },
                { name: "JavaScript", icon: "logos:javascript" },
                { name: "SQL", icon: "mdi:database" },
                { name: "Python", icon: "logos:python" },
            ],
        },
        {
            title: "Frameworks & Libraries",
            items: [
                { name: "React", icon: "logos:react" },
                { name: "Next.js", icon: "logos:nextjs" },
                { name: "Tailwind", icon: "logos:tailwindcss-icon" },
                { name: "Astro", icon: "logos:astro-icon" },
                { name: "TypeScript", icon: "logos:typescript-icon" },
            ],
        },
        {
            title: "Cloud & DevOps",
            items: [
                { name: "Azure", icon: "logos:microsoft-azure" },
                { name: "AWS", icon: "logos:aws" },
                { name: "Terraform", icon: "logos:terraform-icon" },
                { name: "Kubernetes", icon: "logos:kubernetes" },
                { name: "Docker", icon: "logos:docker-icon" },
                { name: "Prometheus", icon: "logos:prometheus" },
                { name: "Grafana", icon: "logos:grafana" },
                { name: "ArgoCD", icon: "logos:argo-icon" },
            ],
        },
        {
            title: "Protokoll",
            items: [
                { name: "CoAP", icon: "mdi:access-point" },
                { name: "MQTT", icon: "mdi:transit-connection-variant" },
            ],
        },
    ],

    footer: {
        copyright: `© ${new Date().getFullYear()} barry`,
        builtWith: "byggd med astro",
    },
} as const;

export default site;
