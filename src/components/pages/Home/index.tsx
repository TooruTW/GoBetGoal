// import { Link } from "react-router-dom";
import Character from "./Character";
import MainMachine from "./MainMachine/index.tsx";
import GameSurround from "./MainMachine/component/GameSurround.tsx";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { monsterDefault } from "@/assets/monster";
// import Progress from "./MainMachine/component/Progress.tsx";
import AwardList from "./MainMachine/component/AwardList.tsx";
import PostSection from "./MainMachine/component/PostSection.tsx";
import RunField from "./MainMachine/component/RunField.tsx";
import Footer from "./MainMachine/component/Footer.tsx";
import CTA from "./MainMachine/component/CTA.tsx";
import Plan from "../Shop/components/Plan.tsx";
import { Button } from "@/components/ui/button.tsx";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
import FallingText from "./MainMachine/component/FallingText.tsx";
import mainBack from "@/assets/main/mainBack.webp";
import { useSound } from "@/hooks/useSound";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  const mainMachineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isSlideOver, setIsSlideOver] = useState(false);
  const playClick = useSound("/sounds/blast.mp3");

  // 控制 carousel 模式的狀態
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // MainMachine 的動畫
  useGSAP(() => {
    if (!mainMachineRef.current) return;
    const tl = gsap.timeline();
    tl.to(mainMachineRef.current, {
      keyframes: [
        { scale: 1, opacity: 0 },
        { scale: 1, opacity: 1 },
        { scale: 10, opacity: 1 },
        { scale: 10, opacity: 1 },
        { scale: 5, opacity: 1 },
      ],
      duration: 1,
      scrollTrigger: {
        trigger: mainMachineRef.current,
        start: "top top",
        end: "+=1000%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // 當動畫進度在 scale: 12 階段時啟用 carousel 模式
          if (progress >= 0.4 && progress <= 0.6) {
            setIsCarouselMode(true);
          } else {
            setIsCarouselMode(false);
          }
          if (progress >= 1) {
            setIsSlideOver(true);
          } else {
            setIsSlideOver(false);
          }
        },
      },
    });
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 overflow-hidden">
      {/* MainMachine 區域 */}
      <div
        ref={mainMachineRef}
        className="w-full h-screen flex flex-col items-center justify-center relative snap-auto snap-center snap-always"
      >
        <div className="absolute z-40 top-20 left-1/2 -translate-x-1/2 w-full px-3 flex flex-col items-center">
          <img
            src={isDarkMode ? LogoImgTxtDark : LogoImgTxtLight}
            alt="Logo"
            className="animate-pulse z-20 pointer-events-none mb-2 w-90"
          />
          <p className=" mb-4">
            跟朋友邊玩遊戲邊養成理想身材 ，跟咬一口貝果一樣輕鬆
          </p>

          <Link
            to={{
              pathname: account.user_id ? "/create-trial" : "/auth",
            }}
            className="block cursor-pointer"
          >
            <Button onClick={playClick}>立即體驗</Button>
          </Link>
        </div>

        <img
          src={mainBack}
          alt="mc"
          className={`h-1/3 z-10 pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 ${
            isSlideOver && "hidden"
          }`}
        />

        <div className="w-full overflow-x-hidden aspect-[5/3] flex justify-center items-center relative my-auto z-0">
          <GameSurround />
          <img
            ref={imageRef}
            src={monsterDefault}
            alt="monster"
            className="w-1/18 m-auto absolute top-1/3 left-1/2 -translate-x-1/2 z-20 animate-bounce"
            draggable="false"
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
          {/* 保持原本簡單的傳遞方式 */}
          <MainMachine isCarouselMode={isCarouselMode} />
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
        <FallingText />
      </div>

      <Character />
      <RunField />
      <PostSection />
      <AwardList />

      <div className="py-30 px-3">
        <h2 className="text-h2">一個貝果的錢，讓你有肆意的資本</h2>
        <Plan isActive={false} />
      </div>

      <CTA />
      <Footer />
    </div>
  );
}
