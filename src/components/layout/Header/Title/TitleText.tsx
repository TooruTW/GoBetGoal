import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function TitleText() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

  return (
    <h1>
      {/* Mobile: Only show logo */}
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoTxtDark.svg"
            : "/src/assets/logo/LogoImgLight.svg"
        }
        alt="Logo"
        className="md:hidden h-16"
      />
      {/* Tablet and above: Show logo with text */}
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoImgTxtDark.svg"
            : "/src/assets/logo/LogoImgTxtLight.svg"
        }
        alt="Logo with text"
        className="hidden md:block h-16"
      />
    </h1>
  );
}
