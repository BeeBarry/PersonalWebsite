interface NavItem {
    title: string;
    path: string;
    isEnabled: boolean;
    isExternal?: boolean;
    icon?: string;
}

export const navigationItems: NavItem[] = [
    {
        title: "Blogg",
        path: "/posts/",
        isEnabled: false
    },
    {
        title: "Learn Hub",
        path: "/learn-hub/",
        isEnabled: true,
        icon: "https://api.iconify.design/mdi/book-open-page-variant.svg"
    },
    {
        title: "GitHub",
        path: "https://github.com/BeeBarry",
        isEnabled: true,
        isExternal: true,
        icon: "https://api.iconify.design/mdi/github.svg"
    },
    {
        title: "Projekt",
        path: "/works/",
        isEnabled: true,
        icon: "https://api.iconify.design/mdi/briefcase.svg"
    }
];