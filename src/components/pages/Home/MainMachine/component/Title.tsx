import { useSelector } from "react-redux";
import { RootState } from "@/store";
import FaultyTerminal from "@/components/shared/reactBit/FaultyTerminal";

export default function Title() {
  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";
  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      <img
        src={
          isDarkMode
            ? "/src/assets/logo/LogoImgTxtDark.svg"
            : "/src/assets/logo/LogoImgTxtLight.svg"
        }
        alt="Logo"
        className=" w-2/3 absolute z-20 pointer-events-none"
      />
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
      <p className="text-2xl font-bold text-center mt-4">
        你覺得自己夠自律嗎？
      </p>
    </div>
  );
}
