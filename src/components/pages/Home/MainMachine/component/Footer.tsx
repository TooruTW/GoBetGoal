import Ballpit from "@/components/shared/reactBit/Ballpit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Machine2 from "./Machine2.tsx";
import BottomNav from "./BottomNav.tsx";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
import { monsterCongrats, monsterSleep, monsterSport } from "@/assets/monster";

export default function Footer() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  return (
    <div className="h-screen relative overflow-hidden w-screen flex flex-col items-center justify-end">
      <img
        src={
          isDarkMode
            ? LogoImgTxtDark
            : LogoImgTxtLight
        }
        alt="Logo"
        className="animate-pulse w-full sm:w-1/2 md:w-1/3 lg:w-1/4 z-30 pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2"
      />

      <img
        src={monsterCongrats}
        alt=""
        className="animate-bounce w-30 absolute top-1/6 md:top-1/3  right-3"
      />
      <img
        src={monsterSleep}
        alt=""
        className="animate-bounce  w-40 absolute top-4 md:top-1/2  right-1/3 rotate-9"
      />
      <img
        src={monsterSport}
        alt=""
        className="animate-bounce  w-30 absolute top-1/6 md:top-1/3  right-1/2 -rotate-12"
      />
      <div className="z-20 w-full h-full">
        {" "}
        <Ballpit
          count={200}
          gravity={0.3}
          friction={1}
          wallBounce={1.5}
          followCursor={true}
        />
      </div>

      <BottomNav />
      <Machine2 />
    </div>
  );
}
