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
            "Fullstack- & cloudutvecklare med intresse för IoT och embedded.",
        author: "barrynamdari",
        lang: "sv",
    },

    // Cookielös statistik. Tom sträng = inget spårningsskript renderas alls.
    // Aktivera: skapa ett konto på goatcounter.com och skriv in kodnamnet här
    // (t.ex. "barrynamdari" om adressen blir barrynamdari.goatcounter.com).
    // BaseLayout hakar då på astro:page-load, så View Transitions räknas rätt.
    analytics: {
        // `as string` (inte literaltypen "") så villkoret i BaseLayout typar rätt.
        goatcounter: "" as string,
    },

    // Textbaserat varumärke ("barry" + accent-dot), inte logotypbild.
    brand: {
        name: "barry",
        /** Kort positionering under lettermärket i sidebaren. Medvetet skild
         *  från meta.description, som är sökmotorernas text och ska vara en
         *  hel mening. */
        tagline: "Fullstack · Cloud · Embedded",
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
        "Jag började i projektledning och rörde mig mot koden. Idag arbetar jag helst där applikationen och infrastrukturen möts — det är där jag lär mig mest, och där jag har lättast att se vad som faktiskt håller när det väl körs skarpt.",
        "Fokus ligger på molnnativ utveckling och skalbar infrastruktur, med ett genuint intresse för IoT och embedded. Jag gillar DevOps-tänk, tydlig arkitektur — och att förklara det jag lär mig, därav Learn Hub.",
    ],

    // Certifikat. Renderas i index.astro som Iconify-ikon (`icon`) + namn.
    certs: [
        {
            name: "AWS Certified Cloud Practitioner",
            icon: "simple-icons:amazonwebservices",
        },
        {
            name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
            icon: "logos:microsoft-azure",
        },
    ],

    // Verktyg & tekniker, grupperade.
    //
    // IKONREGEL: färgad logga (@iconify-json/logos) när den syns mot MÖRK
    // bakgrund — annars enfärgad (simple-icons/mdi), som ärver textfärgen och
    // därför fungerar i båda temana. Mörkt är sajtens default, så mörkt vinner.
    //
    // Uppmätt mot kortytan #17171b: AWS ordmärke #252f3e ger 1,31:1 — i
    // praktiken osynligt, bara den orange bågen syntes. Astros #17191e är
    // bakgrunden själv. Next.js-ordmärket ritas i currentColor men är brett och
    // krympte till en liten remsa i den kvadratiska ikonrutan. Alla tre bytta
    // mot enfärgade märken. Azure, React, Python m.fl. har god kontrast och
    // behåller sina färger.
    stackGroups: [
        {
            title: "Språk",
            items: [
                { name: "C#", icon: "logos:c-sharp" },
                { name: "C", icon: "simple-icons:c" },
                { name: "JavaScript", icon: "logos:javascript" },
                { name: "SQL", icon: "mdi:database" },
                { name: "Python", icon: "logos:python" },
            ],
        },
        {
            title: "Frameworks & Libraries",
            items: [
                { name: "React", icon: "logos:react" },
                { name: "Next.js", icon: "simple-icons:nextdotjs" },
                { name: "Tailwind", icon: "logos:tailwindcss-icon" },
                { name: "Astro", icon: "simple-icons:astro" },
                { name: "TypeScript", icon: "logos:typescript-icon" },
            ],
        },
        {
            title: "Cloud & DevOps",
            items: [
                { name: "Azure", icon: "logos:microsoft-azure" },
                { name: "AWS", icon: "simple-icons:amazonwebservices" },
                { name: "Terraform", icon: "logos:terraform-icon" },
                { name: "Kubernetes", icon: "logos:kubernetes" },
                { name: "Docker", icon: "logos:docker-icon" },
                { name: "Prometheus", icon: "logos:prometheus" },
                { name: "Grafana", icon: "logos:grafana" },
                { name: "ArgoCD", icon: "logos:argo-icon" },
            ],
        },
        // Embedded och protokollen är två grupper, inte en. Slås de ihop blir
        // kolumnen dubbelt så lång som de andra, och rubriken måste ljuga om
        // halva innehållet — en broker är inte hårdvarunära och ett kretskort
        // är inget protokoll. Två grupper ger dessutom ett 3×2-rutnät med en
        // ledig plats, alltså faktisk plats för nästa rubrik.
        {
            title: "Embedded",
            items: [
                { name: "nRF Connect SDK", icon: "simple-icons:nordicsemiconductor" },
                { name: "Zephyr", icon: "mdi:chip" },
                { name: "Arduino", icon: "logos:arduino" },
                { name: "Raspberry Pi", icon: "logos:raspberry-pi" },
            ],
        },
        {
            title: "Protokoll & meddelanden",
            items: [
                { name: "MQTT", icon: "mdi:transit-connection-variant" },
                { name: "CoAP", icon: "mdi:access-point" },
                { name: "AMQP", icon: "mdi:swap-horizontal" },
                { name: "RabbitMQ", icon: "logos:rabbitmq-icon" },
                { name: "Mosquitto", icon: "simple-icons:eclipsemosquitto" },
                { name: "CBOR", icon: "mdi:code-braces" },
            ],
        },
    ],

    footer: {
        copyright: `© ${new Date().getFullYear()} barry`,
    },
} as const;

export default site;
