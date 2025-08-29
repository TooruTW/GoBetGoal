import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import FaultyTerminal from "@/components/shared/reactBit/FaultyTerminal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import GameComponent from "./GameComponent";

import {
  EffectFade,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import SlotMachine from "./SlotMachine";

interface CarouselProps {
  isCarouselMode?: boolean;
}

export default function Carousel({ isCarouselMode }: CarouselProps) {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  const [showGame, setShowGame] = useState("");
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  // 當 Swiper 初始化時儲存實例
  const handleSwiperInit = (swiper: SwiperType) => {
    setSwiperRef(swiper);
  };

  // 根據 carousel 模式動態調整 Swiper 配置
  useEffect(() => {
    if (swiperRef) {
      if (isCarouselMode) {
        // 啟用滾輪控制
        swiperRef.mousewheel.enable();
        swiperRef.keyboard.enable();
        swiperRef.allowSlideNext = true;
        swiperRef.allowSlidePrev = true;
        swiperRef.allowTouchMove = true;

        // 阻止滾輪事件冒泡到父元素
        const swiperEl = swiperRef.el;
        if (swiperEl) {
          swiperEl.style.pointerEvents = "auto";
        }
      } else {
        // 禁用滾輪控制
        swiperRef.mousewheel.disable();
        const swiperEl = swiperRef.el;
        if (swiperEl) {
          swiperEl.style.pointerEvents = "none";
        }
      }
    }
  }, [isCarouselMode, swiperRef]);

  return (
    <div className="w-3/5 aspect-video text-white overflow-hidden absolute top-1/6 text-[4px]">
      <Swiper
        onSwiper={handleSwiperInit}
        spaceBetween={0}
        direction={"vertical"}
        mousewheel={true} // 簡化設定
        effect="fade"
        navigation={false} // 先關閉導航按鈕
        keyboard={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Mousewheel, Keyboard]}
        className="w-full h-full"
        onSlideChange={(swiper) => {
          console.log("Slide changed to:", swiper.activeIndex);
        }}
      >
        <SwiperSlide className="flex items-center justify-center bg-schema-surface-container w-full h-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10">
            <img
              src={
                isDarkMode
                  ? "/src/assets/logo/LogoImgTxtDark.svg"
                  : "/src/assets/logo/LogoImgTxtLight.svg"
              }
              alt="Logo"
              className="w-2/3 relative z-20 pointer-events-none"
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
        </SwiperSlide>

        <SwiperSlide className="flex items-center justify-center w-full h-full relative bg-schema-surface-container">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10">
            <p>想減重總是行動不起來？</p>
            <p>不是你不夠自律</p>
            <p>是你沒有把減重當成遊戲！</p>
            <p>跟朋友來場遊戲</p>
            <p>一起輕鬆瘦身嗎？</p>
            <button
              onClick={() => setShowGame("開始遊戲")}
              className="rounded-full bg-schema-primary px-[5%] py-[1%] text-schema-inverse-on-surface"
            >
              開始遊戲
            </button>
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex items-center justify-center bg-schema-surface-container w-full h-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10"></div>
        </SwiperSlide>

        <SwiperSlide className="flex flex-col items-center justify-center bg-schema-surface-container w-full h-full relative border">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 flex flex-col items-center py-auto"></div>
        </SwiperSlide>

        <SwiperSlide className="flex flex-col items-center justify-center bg-schema-surface-container w-full h-full relative">
          <GameComponent />
        </SwiperSlide>

        <SwiperSlide className="flex flex-col items-center justify-center bg-schema-surface-container w-full h-full relative">
          <SlotMachine />
        </SwiperSlide>
      </Swiper>

      {showGame && <GameComponent />}
    </div>
  );
}
