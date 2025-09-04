import FaultyTerminal from "@/components/shared/reactBit/FaultyTerminal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRef, useState } from "react";
import GameComponent from "./GameComponent";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
// import SlotMachine from "./SlotMachine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface CarouselProps {
  className?: string;
  isCarouselMode?: boolean;
}

export default function Carousel({ className, isCarouselMode }: CarouselProps) {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  const [showGame, setShowGame] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  useGSAP(
    () => {
      if (!isCarouselMode || !carouselRef.current || isTriggered) return;
      setIsTriggered(true);

      gsap.to(".title-icon", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      });

      gsap.to(".slide", {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          markers: true,
          onUpdate: (self) => {
            console.log(self.progress);
            setSlideIndex(Math.max(0, Math.floor(self.progress * 5) - 1));
          },
        },
      });
    },
    { dependencies: [isCarouselMode] }
  );

  return (
    <div
      ref={carouselRef}
      className={`aspect-video text-white overflow-hidden text-[4px] ${className}`}
    >
      <div className="w-full h-full">
        {/* 第一個頁面 - Logo 頁面 */}
        <div
          className={`flex items-center justify-center bg-schema-surface-container w-full h-full relative slide ${
            slideIndex === 0 ? "block" : "hidden"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10">
            <img
              src={isDarkMode ? LogoImgTxtDark : LogoImgTxtLight}
              alt="Logo"
              className="w-2/3 relative z-20 pointer-events-none title-icon opacity-0"
            />
          </div>
          <div className="w-full h-auto aspect-video absolute z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={1}
              pause={false}
              scanlineIntensity={1}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0}
              tint="#eba7e4"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation={false}
              brightness={0.5}
            />
          </div>
        </div>

        {/* 第二個頁面 - 介紹文字 */}
        <div
          className={`flex items-center justify-center w-full h-full relative bg-schema-surface-container slide ${
            slideIndex === 1 ? "block" : "hidden"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10">
            <p>想減重總是行動不起來？</p>
          </div>
        </div>

        {/* 第三個頁面 - 空白頁面 */}
        <div
          className={`flex items-center justify-center bg-schema-surface-container w-full h-full relative slide ${
            slideIndex === 2 ? "block" : "hidden"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10">
            <p>不是你不夠自律</p>
            <p>是你沒有把減重當成遊戲！</p>
          </div>
        </div>

        {/* 第四個頁面 - 空白頁面 */}
        <div
          className={`flex flex-col items-center justify-center bg-schema-surface-container w-full h-full relative border slide ${
            slideIndex === 3 ? "block" : "hidden"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 flex flex-col items-center py-auto">
            {" "}
            <p>跟朋友來場遊戲</p>
            <p>一起輕鬆瘦身嗎？</p>
            <button
              onClick={() => setShowGame("開始遊戲")}
              className="rounded-full bg-schema-primary px-[5%] py-[1%] text-schema-inverse-on-surface"
            >
              開始遊戲
            </button>
          </div>
        </div>

        {/* 第五個頁面 - 遊戲組件 */}
        <div
          className={`flex flex-col items-center justify-center bg-schema-surface-container w-full h-full relative slide ${
            slideIndex === 4 ? "block" : "hidden"
          }`}
        >
          <GameComponent />
        </div>

        {/* 第六個頁面 - 老虎機 */}
        {/* <div
          className={`flex flex-col items-center justify-center bg-schema-surface-container w-full h-full relative slide ${
            slideIndex === 5 ? "block" : "hidden"
          }`}
        >
          <SlotMachine />
        </div> */}
      </div>

      {showGame && <GameComponent />}
    </div>
  );
}
