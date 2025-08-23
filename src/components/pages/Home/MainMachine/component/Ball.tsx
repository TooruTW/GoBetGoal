import Ballpit from "@/components/shared/reactBit/Ballpit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Machine2 from "./Machine2";

export default function AchievementLoop() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  return (
    <div className="h-screen relative overflow-hidden w-screen flex flex-col items-center">
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoImgTxtDark.svg"
            : "/src/assets/logo/LogoImgTxtLight.svg"
        }
        alt="Logo"
        className="animate-pulse w-full sm:w-1/2 md:w-1/3 lg:w-1/4 z-0 pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2"
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

      <Machine2 />
    </div>
  );
}
