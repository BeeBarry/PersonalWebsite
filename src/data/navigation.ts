interface NavItem {
    title: string;
    path: string;
    isEnabled: boolean;
    isExternal?: boolean;
}

export const navigationItems: NavItem[] = [
    {
        title: "Blogg",
        path: "/posts/",
        isEnabled: true
    },
    {
        title: "Learn Hub",
        path: "/learn-hub/",
        isEnabled: true
    },
    {
        title: "GitHub",
        path: "https://github.com/BeeBarry",
        isEnabled: true,
        isExternal: true
    },
    {
        title: "Works",
        path: "/works/",
        isEnabled: false // Inaktiverad tills den behövs
    }
];