import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function TitleText() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

  return (
    <h1 className="h-8">
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoDark.svg"
            : "/src/assets/logo/LogoLight.svg"
        }
        alt="Logo"
        className="sm:hidden h-8"
      />
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoImgDark.svg"
            : "/src/assets/logo/LogoImgLight.svg"
        }
        alt="Logo"
        className="hidden sm:block md:hidden h-8"
      />
      {/* Tablet and above: Show logo with text */}
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoImgTxtDark.svg"
            : "/src/assets/logo/LogoImgTxtLight.svg"
        }
        alt="Logo with text"
        className="hidden md:block h-8"
      />
    </h1>
  );
}
