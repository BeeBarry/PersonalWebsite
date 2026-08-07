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
