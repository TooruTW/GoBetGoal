// import { Link } from "react-router-dom";
import Character from "./Character";
import MainMachine from "./MainMachine/index.tsx";
import GameSurround from "./MainMachine/component/GameSurround.tsx";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/store";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { monsterDefault } from "@/assets/monster";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // const userId = useSelector((state: RootState) => state.account.user_id);
  const mainMachineRef = useRef<HTMLDivElement>(null);
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  const imageRef = useRef<HTMLImageElement>(null);


  useGSAP(() => {
    gsap.timeline().to(mainMachineRef.current, {
      keyframes: [
        { scale: 1, opacity: 0 },
        { scale: 1, opacity: 1 },
        { scale: 7, opacity: 1 },
        { scale: 1, opacity: 1 },
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
      <div className="relative"></div>
      <div
        ref={mainMachineRef}
        className="w-full aspect-[5/3] flex justify-center items-center relative my-auto"
      >
        <img
          src="/src/assets/main/mainBack.webp"
          alt="mc"
          className="h-1/3 z-20 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        />
        <img
          src={
            isDarkMode
              ? "/src/assets/logo/LogoImgTxtDark.svg"
              : "/src/assets/logo/LogoImgTxtLight.svg"
          }
          alt="Logo"
          className="w-1/3 z-20 pointer-events-none absolute top-1/5 left-1/2 -translate-x-1/2"
        />
        <GameSurround />
        <img
          ref={imageRef}
          src={monsterDefault}
          alt="monster"
          className="w-40  m-auto"
        />

       

        <MainMachine />
      </div>

      <Character />
    </div>
  );
}
