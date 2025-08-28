// import { Link } from "react-router-dom";
import Character from "./Character";
import MainMachine from "./MainMachine/index.tsx";
import GameSurround from "./MainMachine/component/GameSurround.tsx";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";

import { monsterDefault } from "@/assets/monster";
import Run from "./MainMachine/component/Run.tsx";
import Progress from "./MainMachine/component/Progress.tsx";
import AwardList from "./MainMachine/component/AwardList.tsx";
import PostSection from "./MainMachine/component/PostSection.tsx";
import RunField from "./MainMachine/component/RunField.tsx";
import Ball from "./MainMachine/component/Footer.tsx";
import CTA from "./MainMachine/component/CTA.tsx";
import Plan from "../Shop/components/Plan.tsx";
import { Button } from "@/components/ui/button.tsx";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

  const mainMachineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const runRef = useRef<HTMLDivElement>(null);
  const runContainerRef = useRef<HTMLDivElement>(null);

  // 控制 carousel 模式的狀態
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  // MainMachine 的動畫
  useGSAP(() => {
    if (!mainMachineRef.current) return;

    const tl = gsap.timeline();

    tl.to(mainMachineRef.current, {
      keyframes: [
        { scale: 1, opacity: 0 },
        { scale: 1, opacity: 1 },
        { scale: 12, opacity: 1, x: 0 },
        { scale: 4, opacity: 1, x: -100 },
        { scale: 1, opacity: 1, x: -1220 },
      ],
      duration: 1,
      scrollTrigger: {
        trigger: mainMachineRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // 當動畫進度在 scale: 7 階段時啟用 carousel 模式
          if (progress >= 0.4 && progress <= 0.6) {
            if (!isCarouselMode) {
              setIsCarouselMode(true);
            }
          } else {
            if (isCarouselMode) {
              setIsCarouselMode(false);
            }
          }
        },
      },
    });
  });

  // RunRef 的獨立動畫 - 當滑動到 runContainer 時觸發
  useGSAP(() => {
    if (!runRef.current || !runContainerRef.current) return;

    gsap.timeline().to(runRef.current, {
      keyframes: [
        { scale: 0.5, opacity: 1, x: 0 },
        { scale: 0.5, opacity: 1, x: -1200 },
        { scale: 1.5, opacity: 1, x: -800 },
        { scale: 0.8, opacity: 1, x: -1200 },
        { scale: 0.3, opacity: 0.8, x: -1600 },
      ],
      duration: 1,
      scrollTrigger: {
        trigger: runContainerRef.current,
        start: "top bottom",
        end: "+=500%",
        scrub: 1,
      },
    });
  });

  // Monster 浮動動畫
  useGSAP(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        yPercent: 0,
      },
      {
        yPercent: -10,
        duration: 1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      }
    );
  });

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* MainMachine 區域 */}
      <div
        ref={mainMachineRef}
        className="w-full min-h-screen flex flex-col items-center justify-center relative snap-auto snap-center snap-always"
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full mx-3 flex flex-col items-center">
          <img
            src={
              isDarkMode
                ? "/src/assets/logo/LogoImgTxtDark.svg"
                : "/src/assets/logo/LogoImgTxtLight.svg"
            }
            alt="Logo"
            className="animate-pulse z-20 pointer-events-none mb-2 w-90"
          />
          <p className=" mb-4">
            跟朋友邊玩遊戲邊養成理想身材 ，跟咬一口貝果一樣輕鬆
          </p>

          <Link
            to={{
              pathname: account.user_id ? "trials/list/my/all" : "/auth",
            }}
            className="block cursor-pointer"
          >
            <Button>立即體驗</Button>
          </Link>
        </div>

        <img
          src="/src/assets/main/mainBack.webp"
          alt="mc"
          className="h-1/3 z-20 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        />
        <div className="w-full overflow-x-hidden aspect-[5/3] flex justify-center items-center relative my-auto">
          <GameSurround />
          <img
            ref={imageRef}
            src={monsterDefault}
            alt="monster"
            className="w-1/18 m-auto absolute top-1/3 left-1/2 -translate-x-1/2 z-20"
          />
          {/* 傳遞 carousel 模式狀態給 MainMachine */}
          <MainMachine isCarouselMode={isCarouselMode} />
        </div>

        <div className="absolute h-2/3 right-0 translate-x-full snap-auto snap-center snap-always">
          <Run />
        </div>
      </div>

      <Character />
      <RunField />
      <PostSection />
      <Progress />

      <AwardList />
      <div className="py-30 px-3">
        <h2 className="text-h2">一個貝果的錢，讓你有肆意的資本</h2>
        <Plan />
      </div>

      <CTA />
      <Ball />
    </div>
  );
}
