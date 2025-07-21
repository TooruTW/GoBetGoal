type SocialPlateFormCategory = {
    id: string;
    name: string;
    url: string;
}

export const socialPlateFormCategory: SocialPlateFormCategory[] = [
    {
        id: "all",
        name: "所有看板",
        url: "/social-pages/category/all",
    },
    {
        id: "hot",
        name: "即時熱門看板",
        url: "/social-pages/category/hot",
    },
    {
        id: "sport",
        name: "運動試煉",
        url: "/social-pages/category/sport",
    },
    {
        id: "diet",
        name: "飲食試煉",
        url: "/social-pages/category/diet",
    },
    {
        id: "sleep",
        name: "作息試煉",
        url: "/social-pages/category/sleep",
    },
]