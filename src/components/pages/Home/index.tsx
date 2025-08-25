// import { Link } from "react-router-dom";
import Character from "./Character";
import MainMachine from "./MainMachine/index.tsx";
import GameSurround from "./MainMachine/component/GameSurround.tsx";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

  // MainMachine 的動畫
  useGSAP(() => {
    gsap.timeline().to(mainMachineRef.current, {
      keyframes: [
        { scale: 1, opacity: 0 },
        { scale: 1, opacity: 1 },
        { scale: 7, opacity: 1, x: 0 },
        { scale: 4, opacity: 1, x: -600 },
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
      },
    });
  });

  // RunRef 的獨立動畫 - 當滑動到 runContainer 時觸發
  useGSAP(() => {
    gsap.timeline().to(runRef.current, {
      keyframes: [
        { scale: 0.5, opacity: 1, x: 0 }, // 從右邊開始
        { scale: 0.5, opacity: 1, x: -1200 }, // 出現並開始往左
        { scale: 1.5, opacity: 1, x: -800 }, // 放大到中間
        { scale: 0.8, opacity: 1, x: -1200 }, // 縮小並繼續往左
        { scale: 0.3, opacity: 0.8, x: -1600 }, // 最終往左消失
      ],
      duration: 1,
      scrollTrigger: {
        trigger: runContainerRef.current, // 使用 runContainer 作為觸發器
        start: "top bottom", // 當 runContainer 進入視窗底部時開始
        end: "+=500%", // 當 runContainer 離開視窗頂部時結束
        scrub: 1,
      },
    });
  });

  // Monster 浮動動畫
  useGSAP(() => {
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      {/* MainMachine 區域 */}
      <div
        ref={mainMachineRef}
        className="w-full min-h-screen flex flex-col items-center justify-center relative snap-auto snap-center snap-always"
      >
        <img
          src={
            isDarkMode
              ? "/src/assets/logo/LogoImgTxtDark.svg"
              : "/src/assets/logo/LogoImgTxtLight.svg"
          }
          alt="Logo"
          className="animate-pulse w-full sm:w-1/2 md:w-1/3 lg:w-1/4 z-20 pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2"
        />
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
            className="w-1/18  m-auto absolute top-1/3 left-1/2 -translate-x-1/2 z-20 "
          />
          <MainMachine />
        </div>
        <Button>立即體驗</Button>

        <div className="absolute h-2/3 right-0 translate-x-full snap-auto snap-center snap-always">
          <Run />
        </div>
      </div>

      <Character />
      <RunField />
      <PostSection />
      <Progress />

      {/* RunRef 區域 - 獨立的滾動觸發區域 */}
      {/* <div className="relative">
        <div
          ref={runContainerRef}
          className="rounded-2xl px-3 overflow-hidden w-3000 h-svh flex items-center justify-center relative bg-amber-400"
        >
          <div
            ref={runRef}
            className=" rounded-2xl h-100 w-3000 flex items-center justify-center text-white text-4xl font-bold"
          >
            <Run />
          </div>
        </div>
      </div> */}

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
