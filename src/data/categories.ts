// Learn Hub-kategorier.
//
// TVÅ AXLAR, och de gör olika jobb:
//
// `domain` är sajtens yrkestaxonomi (web/cloud/embedded) och beskriver vilken
// del av profilen något hör till. Den delar namn med Arbete och Fältnoteringar.
// Den används INTE för att navigera hubben — tre domäner kan inte organisera
// nitton kategorier, och ett filter som säger "Cloud 14" utför inget arbete.
//
// `group` är hubbens egen indelning och den enda som renderas. Grupperna följer
// hubbens röda tråd nedifrån och upp: fundamenten först, det som vilar på dem
// sedan. Ordningen i CATEGORY_GROUPS är visningsordningen.
import type { DomainSlug } from "./domains";

export const CATEGORY_GROUPS = [
    {
        slug: "fundament",
        title: "Fundamenten",
        description: "Det allt annat vilar på — och det enda som varken är knutet till en leverantör eller ett verktyg.",
    },
    // Cybersecurity låg tidigare i "fundament". Den flyttades hit när identitet
    // och hemligheter tillkom: tre kategorier som ställer samma fråga från olika
    // håll hör ihop, och "fundament" ska bära det som allt annat vilar på.
    {
        slug: "sakerhet",
        title: "Säkerhet & åtkomst",
        description: "Vem som släpps in, vad som stoppas, och var hemligheterna bor.",
    },
    {
        slug: "data",
        title: "Data & API:er",
        description: "Kontraktet mellan system, och lagringen bakom det.",
    },
    // Gruppen heter varken "Meddelanden" eller "Event" — principkategorin i den
    // gör det, och en grupp som upprepar sin första kategori utför inget arbete.
    // "Köer & strömmar" namnger i stället de två formerna: RabbitMQ har köer,
    // Kafka har en ström som ligger kvar.
    {
        slug: "meddelanden",
        title: "Köer & strömmar",
        description: "System som slutar vänta på varandra — och vad det kostar i garantier.",
    },
    {
        slug: "containrar",
        title: "Containrar & orkestrering",
        description: "Paketeringen, och det som kör paketen över flera maskiner.",
    },
    {
        slug: "iac",
        title: "Infrastruktur som kod",
        description: "Terraform skapar lådan, Ansible fyller den.",
    },
    {
        slug: "moln",
        title: "Molnplattformar",
        description: "De två leverantörerna, med deras egna ord för samma saker.",
    },
    {
        slug: "leverans",
        title: "Leverans",
        description: "Vägen från commit till drift — pipelinen som trycker ut, och klustret som hämtar hem.",
    },
    // Gruppen heter INTE samma sak som kategorin i den. Samma regel som för
    // <Del />-etiketter inne i en artikel: en rubrik som upprepar raden under
    // sig tillför ingenting. Gruppen namnger området, kategorin sin del av det.
    {
        slug: "observability",
        title: "Drift & observability",
        description: "Principerna för att se sitt system i drift — och verktygen som gör dem konkreta.",
    },
    {
        slug: "iot",
        title: "IoT & Embedded",
        description: "Den enda delen av hubben som rör hårdvara, och den enda där batteriet är en designparameter.",
    },
] as const;

export type CategoryGroupSlug = (typeof CATEGORY_GROUPS)[number]["slug"];

export interface Category {
    title: string;
    description: string;
    /** Iconify-namn från lokalt installerat paket (bundlas, ingen runtime-fetch). */
    icon: string;
    slug: string;
    /** Yrkestaxonomin. Delas med Arbete/Fältnoteringar, renderas inte i hubben. */
    domain: DomainSlug;
    /** Hubbens egen indelning — det som faktiskt visas. */
    group: CategoryGroupSlug;
    isVisible?: boolean;
}

export const categories: Category[] = [
    {
        title: "Docker",
        description: "Containerisering från grunden till avancerad nivå.",
        icon: "skill-icons:docker",
        slug: "docker",
        group: "containrar",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Kubernetes",
        description: "Orkestrera och hantera containrar i produktion.",
        icon: "skill-icons:kubernetes",
        slug: "kubernetes",
        group: "containrar",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Helm",
        description: "Chart, values och release — paketet som gör manifesten återanvändbara.",
        icon: "logos:helm",
        slug: "helm",
        group: "containrar",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Terraform",
        description: "Infrastructure as Code med Terraform.",
        icon: "skill-icons:terraform-light",
        slug: "terraform",
        group: "iac",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Ansible",
        description: "Konfiguration som kod — utan agent på maskinerna.",
        icon: "skill-icons:ansible",
        slug: "ansible",
        group: "iac",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Azure",
        description: "Molntjänster och cloud-native utveckling.",
        icon: "skill-icons:azure-light",
        slug: "azure",
        group: "moln",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "AWS",
        description: "Konton, regioner och ARN — molnet med Amazons ord.",
        icon: "skill-icons:aws-light",
        slug: "aws",
        group: "moln",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "CI/CD & pipelines",
        description: "Från commit till drift — utan att någon kör kommandon för hand.",
        icon: "mdi:cog-sync-outline",
        slug: "cicd",
        group: "leverans",
        domain: "cloud",
        isVisible: true,
    },
    // Bröts ut ur "cicd" 2026-08-09, av samma skäl som Prometheus och
    // OpenTelemetry lämnade "observability": principkategorin ska kunna växa
    // med deploystrategier och kvalitetsgrindar utan att bli en GitHub-serie.
    {
        title: "GitHub Actions",
        description: "Workflow-filen, jobben och inloggningen som inte bär på en hemlighet.",
        icon: "skill-icons:githubactions-light",
        slug: "github-actions",
        group: "leverans",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "ArgoCD & GitOps",
        description: "Klustret hämtar hem sitt eget önskade läge från Git.",
        icon: "logos:argo-icon",
        slug: "argocd",
        group: "leverans",
        domain: "cloud",
        isVisible: true,
    },
    // Samma ordning som i observability-gruppen: principerna först, sedan ett
    // verktyg per form — strömmen som ligger kvar, och kön som töms.
    {
        title: "Meddelanden & event",
        description: "Hur ett system talar med ett annat utan att stå kvar och vänta på svar.",
        icon: "mdi:inbox-arrow-down",
        slug: "meddelanden",
        group: "meddelanden",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Kafka",
        description: "En logg som ligger kvar, delad i partitioner och läst i egen takt.",
        icon: "skill-icons:kafka",
        slug: "kafka",
        group: "meddelanden",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "RabbitMQ",
        description: "Exchange, binding och kö — och konsumenten som måste kvittera.",
        icon: "skill-icons:rabbitmq-light",
        slug: "rabbitmq",
        group: "meddelanden",
        domain: "cloud",
        isVisible: true,
    },
    // Namnet bär tillägget "& SRE" med flit. Bredvid Grafana och Loki läser
    // "Observability" ensamt som ett sjätte verktyg; tillägget säger att det är
    // praktiken och principerna. SLI, SLO, felbudget och jour är SRE-begrepp.
    {
        title: "Observability & SRE",
        description: "De tre signalerna, och hur du avgör när något är illa nog att bry sig om.",
        icon: "mdi:pulse",
        slug: "observability",
        group: "observability",
        domain: "cloud",
        isVisible: true,
    },
    // Ordningen i gruppen är inte alfabetisk utan pedagogisk: principerna
    // först, sedan ett verktyg per signal — mätvärde, logg, spår — och sist
    // ytan som visar alla tre.
    {
        title: "Prometheus",
        description: "Mätvärden över tid, och ett frågespråk byggt för dem.",
        icon: "skill-icons:prometheus",
        slug: "prometheus",
        group: "observability",
        domain: "cloud",
        isVisible: true,
    },
    // Loki är det enda av verktygen utan varumärkeslogga i något av de fyra
    // installerade ikonpaketen — därför neutral mdi:, som ärver accenten.
    {
        title: "Loki",
        description: "Loggar som går att fråga — utan att indexera varje ord.",
        icon: "mdi:text-box-search-outline",
        slug: "loki",
        group: "observability",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "OpenTelemetry",
        description: "Standarden som gör ett anrop följbart över tjänstegränser.",
        icon: "logos:opentelemetry-icon",
        slug: "opentelemetry",
        group: "observability",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Grafana",
        description: "Från mätvärde till en panel någon faktiskt tittar på.",
        icon: "skill-icons:grafana-light",
        slug: "grafana",
        group: "observability",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "InfluxDB",
        description: "Tidsseriedata — mätvärden som kommer i en aldrig sinande ström.",
        icon: "logos:influxdb-icon",
        slug: "influxdb",
        group: "data",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Cybersecurity",
        description: "Säkerhet i moderna applikationer.",
        icon: "mdi:shield-lock-outline",
        slug: "cybersecurity",
        group: "sakerhet",
        domain: "web",
        isVisible: true,
    },
    {
        title: "Linux & terminalen",
        description: "Filsystemet, rättigheter och processer från grunden.",
        icon: "skill-icons:linux-light",
        slug: "linux",
        group: "fundament",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Nätverk & HTTP",
        description: "Vad som händer mellan adressfältet och servern.",
        icon: "mdi:lan-connect",
        slug: "natverk",
        group: "fundament",
        domain: "web",
        isVisible: true,
    },
    {
        title: "IoT & Embedded",
        description: "När datorn är liten, batteridriven och sitter någon annanstans.",
        icon: "mdi:chip",
        slug: "embedded",
        group: "iot",
        domain: "embedded",
        isVisible: true,
    },
    {
        title: "Git & versionshantering",
        description: "Ögonblicksbilder, grenar och konflikter — utan magi.",
        icon: "skill-icons:git",
        slug: "git",
        group: "fundament",
        domain: "web",
        isVisible: true,
    },
    // Ligger i "fundament" och inte i en egen verktygsgrupp med flit: hela
    // poängen med kategorin är att den är oberoende av ramverk. Bo sa
    // uttryckligen nej till ett xUnit-spår — bevisramverket i artiklarna är
    // `python3 -m unittest`, som finns på varje macOS utan installation.
    {
        title: "Testning & QA",
        description: "Vad ett test bevisar — och vad det bara ser ut att bevisa.",
        icon: "mdi:test-tube",
        slug: "testning",
        group: "fundament",
        domain: "web",
        isVisible: true,
    },
    {
        title: "API:er & REST",
        description: "Kontraktet mellan system som ska prata med varandra.",
        icon: "mdi:api",
        slug: "api",
        group: "data",
        domain: "web",
        isVisible: true,
    },
    {
        title: "Databaser & SQL",
        description: "Tabeller, relationer och varför frågor blir långsamma.",
        icon: "mdi:database-outline",
        slug: "sql",
        group: "data",
        domain: "web",
        isVisible: true,
    },
];
