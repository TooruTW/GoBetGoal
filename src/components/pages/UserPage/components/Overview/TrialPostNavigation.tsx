import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type TrialPostNavigationProps = {
  className?: string;
  selectedTab: "trial" | "post";
  setSelectedTab: (tab: "trial" | "post") => void;
};

export default function TrialPostNavigation({
  className = "",
  selectedTab,
  setSelectedTab,
}: TrialPostNavigationProps) {
  const navRef = useRef<HTMLDivElement>(null);
  // 選擇tab的動畫
  useGSAP(
    () => {
      let position = 0;
      switch (selectedTab) {
        case "trial":
          position = 0;
          break;
        case "post":
          position = 90;
          break;
        default:
          break;
      }

      gsap.to(".select-box", {
        xPercent: position,
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
    { dependencies: [selectedTab], scope: navRef }
  );

  // 處理點擊事件
  const handleTabClick = (tab: "trial" | "post") => {
    setSelectedTab(tab);
  };

  return (
    <nav
      ref={navRef}
      className={`w-40 px-4 py-2  rounded-lg bg-schema-surface-container flex justify-between text-p-small relative self-start ${className}`}
    >
      <div className="absolute left-1 top-0 w-1/2 rounded-lg h-full border-1 border-schema-outline pointer-events-none select-box"></div>
      <div
        className={`cursor-pointer ${
          selectedTab === "trial" ? "brightness-100" : "brightness-50"
        }`}
        onClick={() => handleTabClick("trial")}
      >
        我的試煉
      </div>
      <div
        className={`cursor-pointer ${
          selectedTab === "post" ? "brightness-100" : "brightness-50"
        }`}
        onClick={() => handleTabClick("post")}
      >
        我的貼文
      </div>
    </nav>
  );
}
