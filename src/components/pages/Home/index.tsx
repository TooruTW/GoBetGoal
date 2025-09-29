import Character from "./Character/index.tsx";
import MainMachine from "./MainMachine/index.tsx";
import GameSurround from "./components/GameSurround.tsx";
import { useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { monsterDefault } from "@/assets/monster";
import AwardList from "./components/AwardList.tsx";
import PostSection from "./components/PostSection.tsx";
import RunField from "./components/RunField.tsx";
import Footer from "./components/Footer.tsx";
import CTA from "./components/CTA.tsx";
import Plan from "../Shop/components/Plan.tsx";
import { Button } from "@/components/ui/button.tsx";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
import FallingText from "./components/FallingText.tsx";
import mainBack from "@/assets/main/mainBack.webp";
import { useSound } from "@/hooks/useSound";
import { useHomeAnimation } from "./hooks/useHomeAnimation";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { HOME_RESOURCES } from "./hooks/homeResources";
import LoadingProgress from "./components/LoadingProgress";
import AudioController from "./components/Audio.tsx";

export default function Home() {
  // 只選擇需要的狀態，避免整個 account 物件變化觸發重新渲染
  const isDarkMode = useSelector(
    (state: RootState) => state.account.system_preference_color_mode === "dark"
  );
  const userId = useSelector((state: RootState) => state.account.user_id);
  const imageRef = useRef<HTMLImageElement>(null);
  const playClick = useSound("/sounds/blast.mp3");

  // 使用 useMemo 優化 Logo 路徑計算
  const logoPath = useMemo(
    () => (isDarkMode ? LogoImgTxtDark : LogoImgTxtLight),
    [isDarkMode]
  );

  // 使用 useMemo 優化 Link 的 to 屬性
  const linkPath = useMemo(
    () => ({
      pathname: userId ? "/create-trial" : "/auth",
    }),
    [userId]
  );

  // 使用自定義動畫 hook
  const { mainMachineRef, animationState } = useHomeAnimation();
  const { isCarouselMode, isSlideOver } = animationState;

  // 使用圖片預載入 hook
  const { preloadState, preloadResources } = useImagePreloader();

  useEffect(() => {
    window.scrollTo(0, 0);

    // 開始預載入資源
    const startPreloading = async () => {
      try {
        await preloadResources(HOME_RESOURCES);
      } catch (error) {
        console.warn("資源預載入過程中出現錯誤:", error);
      }
    };

    startPreloading();
  }, [preloadResources]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 overflow-hidden">
      {/* 載入進度顯示 */}
      <LoadingProgress
        progress={preloadState.progress}
        isComplete={preloadState.isComplete}
        errors={preloadState.errors}
      />

      <AudioController />

      {/* MainMachine 區域 */}
      <div
        ref={mainMachineRef}
        className="w-full h-screen flex flex-col items-center justify-center relative snap-auto snap-center snap-always"
      >
        <div className="absolute z-40 top-20 left-1/2 -translate-x-1/2 w-full px-3 flex flex-col items-center">
          <img
            src={logoPath}
            alt="Logo"
            className="animate-pulse z-20 pointer-events-none mb-2 w-90"
          />
          <p className=" mb-4">
            跟朋友邊玩遊戲邊養成理想身材 ，跟咬一口貝果一樣輕鬆
          </p>

          <Link to={linkPath} className="block cursor-pointer">
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
