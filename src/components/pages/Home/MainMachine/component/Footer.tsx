import Ballpit from "@/components/shared/reactBit/Ballpit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Machine2 from "./Machine2.tsx";
import BottomNav from "./BottomNav.tsx";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
import { monsterCongrats, monsterSleep, monsterSport } from "@/assets/monster";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isDesktop, setIsDesktop] = useState(true);
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

  useEffect(() => {
    const touchpoint = navigator.maxTouchPoints;

    if (touchpoint > 0) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
    console.log(touchpoint);
  }, []);

  return (
    <div
      className={`${
        isDesktop ? "h-screen" : "h-full"
      }  relative w-screen flex flex-col items-center justify-end gap-10 py-20`}
    >
      <img
        src={isDarkMode ? LogoImgTxtDark : LogoImgTxtLight}
        alt="Logo"
        className="animate-pulse w-full max-w-100 z-30 pointer-events-none"
      />
      {isDesktop && (
        <div className="w-full h-full flex justify-around items-center">
          <img src={monsterCongrats} alt="" className="animate-bounce w-30 translate-y-3/2" />
          <img src={monsterSleep} alt="" className="animate-bounce w-40 translate-y-1/2" />
          <img src={monsterSport} alt="" className="animate-bounce w-30 translate-y-6/5" />
        </div>
      )}
      <div className="z-20 w-full h-full absolute bottom-0 left-0">
        {isDesktop && (
          <Ballpit
            count={100}
            gravity={0.3}
            friction={1}
            wallBounce={1.5}
            followCursor={true}
          />
        )}
      </div>
      <BottomNav />
      {isDesktop && <Machine2 />}{" "}
    </div>
  );
}
