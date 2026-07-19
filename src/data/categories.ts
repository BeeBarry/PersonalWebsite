// Learn Hub-kategorier. `domain` mappar varje kategori till sajtens domän-
// taxonomi (web/cloud/embedded) så learn-hub kan filtreras konsekvent med
// Arbete/Fältnoteringar. `isVisible` styr om kategorin listas.
import type { DomainSlug } from "./domains";

export interface Category {
    title: string;
    description: string;
    iconUrl: string;
    slug: string;
    domain: DomainSlug;
    isVisible?: boolean;
}

export const categories: Category[] = [
    {
        title: "Docker",
        description: "Containerisering från grunden till avancerad nivå.",
        iconUrl: "https://api.iconify.design/skill-icons/docker.svg",
        slug: "docker",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Kubernetes",
        description: "Orkestrera och hantera containrar i produktion.",
        iconUrl: "https://api.iconify.design/skill-icons/kubernetes.svg",
        slug: "kubernetes",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Terraform",
        description: "Infrastructure as Code med Terraform.",
        iconUrl: "https://api.iconify.design/skill-icons/terraform-light.svg",
        slug: "terraform",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Azure",
        description: "Molntjänster och cloud-native utveckling.",
        iconUrl: "https://api.iconify.design/skill-icons/azure-light.svg",
        slug: "azure",
        domain: "cloud",
        isVisible: true,
    },
    {
        title: "Cybersecurity",
        description: "Säkerhet i moderna applikationer.",
        iconUrl: "https://api.iconify.design/material-symbols:security.svg",
        slug: "cybersecurity",
        domain: "web",
        isVisible: true,
    },
];
