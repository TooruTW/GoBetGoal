import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LogoDark from "@/assets/logo/LogoDark.svg";
import LogoLight from "@/assets/logo/LogoLight.svg";
import LogoImgDark from "@/assets/logo/LogoImgDark.svg";
import LogoImgLight from "@/assets/logo/LogoImgLight.svg";
import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";

export default function TitleText() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

  return (
    <h1 className="h-8">
      <img
        src={
          isDarkMode
            ? LogoDark
            : LogoLight
        }
        alt="Logo"
        className="sm:hidden h-8"
      />
      <img
        src={
          isDarkMode
            ? LogoImgDark
            : LogoImgLight
        }
        alt="Logo"
        className="hidden sm:block md:hidden h-8"
      />
      {/* Tablet and above: Show logo with text */}
      <img
        src={
          isDarkMode
            ? LogoImgTxtDark
            : LogoImgTxtLight
        }
        alt="Logo with text"
        className="hidden md:block h-8"
      />
    </h1>
  );
}
