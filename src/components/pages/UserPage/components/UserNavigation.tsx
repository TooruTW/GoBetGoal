import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type UserNavigationProps = {
  className?: string;
};

export default function UserNavigation({
  className = "",
}: UserNavigationProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const { id } = useParams();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  // 選擇tab
  useEffect(() => {
    const pathname = location.pathname.split("/");
    const tab = pathname[pathname.length - 1];
    switch (tab) {
      case "overview":
        setSelectedTabIndex(0);
        break;
      case "achievements":
        setSelectedTabIndex(1);
        break;
      case "friends":
        setSelectedTabIndex(2);
        break;
      case "settings":
        setSelectedTabIndex(3);
        break;
      default:
        break;
    }
  }, [location, id]);

  // 選擇tab的動畫
  useGSAP(() => {
    let position = 1;
    let widthScale = 1;
    switch (selectedTabIndex) {
      case 0:
        position = 0;
        widthScale = 1;
        break;
      case 1:
        position = 44;
        widthScale = 1;
        break;
      case 2:
        position = 88;
        widthScale = 1;
        break;
      case 3:
        position = 134;
        widthScale = 1.5;
        break;
      default:
        break;
    }

    gsap.to(".select-box", {
      x: position,
      duration: 0.5,
      width: widthScale * 12.5 * 4 + "px",
      ease: "power2.inOut",
    });
  }, {dependencies: [selectedTabIndex],scope:navRef});

  return (
    <nav
      ref={navRef}
      className={`w-55 px-4 py-2 rounded-lg bg-schema-surface-container flex justify-between text-p-small relative self-start ${className}`}
    >
      <div className="absolute left-1 top-0 w-12.5 rounded-lg h-full scale-y-80 border-1 border-schema-outline pointer-events-none select-box"></div>
      <Link to={`overview`}>
        <div
          className={`cursor-pointer ${
            selectedTabIndex === 0 ? "brightness-100" : "brightness-50"
          }`}
        >
          總覽
        </div>
      </Link>
      <Link to="achievements">
        <div
          className={`cursor-pointer ${
            selectedTabIndex === 1 ? "brightness-100" : "brightness-50"
          }`}
        >
          成就
        </div>
      </Link>
      <Link to="friends">
        <div
          className={`cursor-pointer ${
            selectedTabIndex === 2 ? "brightness-100" : "brightness-50"
          }`}
        >
          好友
        </div>
      </Link>
      <Link to="settings">
        <div
          className={`cursor-pointer ${
            selectedTabIndex === 3 ? "brightness-100" : "brightness-50"
          }`}
        >
          帳號設置
        </div>
      </Link>
    </nav>
  );
}
