interface NavItem {
    title: string;
    path: string;
    isEnabled: boolean;
    isExternal?: boolean;
    icon?: string;
    devOnly?: boolean; // visas bara i `astro dev`, döljs i prod-bygget
}

// Portfolio-navigation: Hem (implicit via brand-länk), Arbete, Skrivet.
// Learn Hub bibehålls i koden men visas inte i frontend.
export const navigationItems: NavItem[] = [
    {
        title: "Arbete",
        path: "/works/",
        isEnabled: true
    },
    {
        title: "Skrivet",
        path: "/posts/",
        isEnabled: true
    },
    {
        title: "Learn Hub",
        path: "/learn-hub/",
        isEnabled: false, // dolt i frontend; rutten fungerar via direkt-URL
        devOnly: true
    }
];
