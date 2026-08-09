// Learn Hub-kategorier. `domain` mappar varje kategori till sajtens domän-
// taxonomi (web/cloud/embedded) så learn-hub kan filtreras konsekvent med
// Arbete/Fältnoteringar. `isVisible` styr om kategorin listas.
import type { DomainSlug } from "./domains";

export interface Category {
    title: string;
    description: string;
    /** Iconify-namn från lokalt installerat paket (bundlas, ingen runtime-fetch). */
    icon: string;
    slug: string;
    domain: DomainSlug;
    isVisible?: boolean;
}

export const categories: Category[] = [
    {
        title: "Docker",
        description: "Containerisering från grunden till avancerad nivå.",
        icon: "skill-icons:docker",
        slug: "docker",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Kubernetes",
        description: "Orkestrera och hantera containrar i produktion.",
        icon: "skill-icons:kubernetes",
        slug: "kubernetes",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Terraform",
        description: "Infrastructure as Code med Terraform.",
        icon: "skill-icons:terraform-light",
        slug: "terraform",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Ansible",
        description: "Konfiguration som kod — utan agent på maskinerna.",
        icon: "skill-icons:ansible",
        slug: "ansible",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Azure",
        description: "Molntjänster och cloud-native utveckling.",
        icon: "skill-icons:azure-light",
        slug: "azure",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "AWS",
        description: "Konton, regioner och ARN — molnet med Amazons ord.",
        icon: "skill-icons:aws-light",
        slug: "aws",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "CI/CD & pipelines",
        description: "Från commit till drift — utan att någon kör kommandon för hand.",
        icon: "mdi:cog-sync-outline",
        slug: "cicd",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "ArgoCD & GitOps",
        description: "Klustret hämtar hem sitt eget önskade läge från Git.",
        icon: "logos:argo",
        slug: "argocd",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Observability",
        description: "Loggar, mätvärden och spårning — att se sitt system i drift.",
        icon: "mdi:pulse",
        slug: "observability",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Grafana",
        description: "Från mätvärde till en panel någon faktiskt tittar på.",
        icon: "skill-icons:grafana-light",
        slug: "grafana",
        domain: "cloud",
        isVisible: true,
    },
    // Loki är det enda av de nya verktygen utan varumärkeslogga i något av de
    // fyra installerade ikonpaketen — därför neutral mdi:, som ärver accenten.
    {
        title: "Loki",
        description: "Loggar som går att fråga — utan att indexera varje ord.",
        icon: "mdi:text-box-search-outline",
        slug: "loki",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "InfluxDB",
        description: "Tidsseriedata — mätvärden som kommer i en aldrig sinande ström.",
        icon: "logos:influxdb",
        slug: "influxdb",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Cybersecurity",
        description: "Säkerhet i moderna applikationer.",
        icon: "mdi:shield-lock-outline",
        slug: "cybersecurity",
        domain: "web",
        isVisible: true,
    },
    // Fundamenten. Ligger sist eftersom cloud-stacken är den profil en
    // rekryterare ska se först — men de är förkunskapen till allt ovanför,
    // och det är dem elever hänvisas till.
    {
        title: "Linux & terminalen",
        description: "Filsystemet, rättigheter och processer från grunden.",
        icon: "skill-icons:linux-light",
        slug: "linux",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Nätverk & HTTP",
        description: "Vad som händer mellan adressfältet och servern.",
        icon: "mdi:lan-connect",
        slug: "natverk",
        domain: "web",
        isVisible: true,
    },
    // Enda kategorin i domänen embedded. Utan den döljer domänfiltret på
    // learn-hub hela domänen, eftersom det bara listar domäner med artiklar.
    {
        title: "IoT & Embedded",
        description: "När datorn är liten, batteridriven och sitter någon annanstans.",
        icon: "mdi:chip",
        slug: "embedded",
        domain: "embedded",
        isVisible: true,
    },
    {
        title: "Git & versionshantering",
        description: "Ögonblicksbilder, grenar och konflikter — utan magi.",
        icon: "skill-icons:git",
        slug: "git",
        domain: "web",
        isVisible: true,
    },
    {
        title: "API:er & REST",
        description: "Kontraktet mellan system som ska prata med varandra.",
        icon: "mdi:api",
        slug: "api",
        domain: "web",
        isVisible: true,
    },
    {
        title: "Databaser & SQL",
        description: "Tabeller, relationer och varför frågor blir långsamma.",
        icon: "mdi:database-outline",
        slug: "sql",
        domain: "web",
        isVisible: true,
    },
];
