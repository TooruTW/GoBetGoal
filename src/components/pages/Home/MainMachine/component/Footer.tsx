import FlowingMenu from "@/components/shared/reactBit/FlowingMenu";

const data = [
  {
    link: "#",
    text: "我的試煉",
    image: "/image/template/Template50.webp",
  },
  {
    link: "#",
    text: "社交平台",
    image: "/image/template/TemplateHeart.webp",
  },
  {
    link: "#",
    text: "Monterey",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    link: "#",
    text: "Sequoia",
    image: "https://picsum.photos/600/400?random=4",
  },
];

export default function Title() {
  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      <div className="h-150px w-full relative">
        <FlowingMenu items={data} />
      </div>
    </div>
  );
}
