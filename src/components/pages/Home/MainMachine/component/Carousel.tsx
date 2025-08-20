import { Swiper, SwiperSlide } from "swiper/react";
import FaultyTerminal from "@/components/shared/reactBit/FaultyTerminal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import GameComponent from "./GameComponent";

import {
  EffectFade,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { Button } from "@/components/ui/button";

// import Title from "./Title";

export default function App() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  const [showGame, setShowGame] = useState("");

  return (
    <div className=" w-2/5 aspect-video  text-white border-2 border-blue-500 overflow-hidden absolute top-1/2 -translate-y-1/2">
      <Swiper
        spaceBetween={1000}
        direction={"vertical"}
        mousewheel={{
          forceToAxis: true, // 只允許單方向（垂直）滾動
          releaseOnEdges: true, // 到邊界才釋放滾動事件
          sensitivity: 0.3, // 調低靈敏度（預設是 1）
        }}
        effect="fade"
        navigation
        keyboard={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Mousewheel, Keyboard]}
        className="w-full h-full"
      >
        <SwiperSlide className="flex items-center justify-center bg-center bg-cover relative">
          <div className="relative z-10">
            <img
              src={
                isDarkMode
                  ? "/src/assets/logo/LogoImgTxtDark.svg"
                  : "/src/assets/logo/LogoImgTxtLight.svg"
              }
              alt="Logo"
              className=" w-2/3 relative z-20 pointer-events-none"
            />
          </div>
          <div className="w-full h-auto aspect-video absolute z-0  ">
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
        <SwiperSlide className="flex items-center justify-center bg-center bg-cover relative">
          <div className="relative z-10 ">
            <p>你覺得自己夠自律嗎？</p>
          </div>
          <div className="w-full h-auto aspect-video absolute z-0  ">
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
        <SwiperSlide className="flex items-center justify-center bg-center bg-cover relative">
          <div className="relative z-10">
            <p>不是你不夠自律</p>
            <p>是你沒有把人生當成遊戲！</p>
          </div>
          <div className="w-full h-auto aspect-video absolute z-0  ">
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
        <SwiperSlide className="flex flex-col items-center justify-center bg-center bg-cover relative">
          <div className="relative z-10 flex flex-col items-center gap-4">
            <p className="font-bold text-h4">
              跟朋友一起來場改變人生的遊戲嗎？
            </p>
            <Button onClick={() => setShowGame("開始遊戲")}>開始遊戲</Button>
          </div>
          <div className="w-full h-auto aspect-video absolute z-0  ">
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
        <SwiperSlide className="flex flex-col items-center justify-center bg-center bg-cover relative">
          <GameComponent />
        </SwiperSlide>
      </Swiper>

      {showGame && <GameComponent />}
    </div>
  );
}
