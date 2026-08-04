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
        title: "Cybersecurity",
        description: "Säkerhet i moderna applikationer.",
        icon: "mdi:shield-lock-outline",
        slug: "cybersecurity",
        domain: "web",
        isVisible: true,
    },
];
