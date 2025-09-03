type SocialPlateFormCategory = {
    id: string;
    name: string;
    url: string;
    color:string;
}

export const socialPlateFormCategory: SocialPlateFormCategory[] = [
    {
        id: "all",
        name: "所有看板",
        url: "/social-pages/category/all",
      color:"tertiary"
    },
    {
        id: "sport",
        name: "運動試煉",
        url: "/social-pages/category/sport",
      color:"primary"
    },
    {
        id: "diet",
        name: "飲食試煉",
        url: "/social-pages/category/diet",
      color:"secondary"
    },
    {
        id: "sleep",
        name: "作息試煉",
        url: "/social-pages/category/sleep",
      color:"tertiary"
    },
]