import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserInfoSupa } from "@/api";
import { monsterCongrats } from "@/assets/monster";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import GameSurround from "../../Home/MainMachine/component/GameSurround";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  const { id } = useParams();
  const { data: userInfo, error, isLoading } = useGetUserInfoSupa(id || "");

  useEffect(() => {
    if (error) {
      console.log("error", error);
      return;
    }
    if (!isLoading && !userInfo) {
      console.log("no userInfo");
      navigate(`/auth-account/${id}`);
    }
  }, [userInfo, error, navigate, id, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      navigate("/");
    }

    return () => {
      clearInterval(interval);
    };
  }, [navigate, seconds]);

  const account = useSelector((state: RootState) => state.account);
  const isDarkMode = account.system_preference_color_mode === "dark";

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <DotLottieReact
        src="https://lottie.host/c85d62ad-f964-49d6-8ff8-b244b290cf93/BHYfjAyDEv.lottie"
        loop
        autoplay
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full  pointer-events-none "
      />
      <div className="w-full overflow-x-hidden aspect-[5/3] flex justify-center items-center relative my-auto z-0">
        <GameSurround />
      </div>

      <div className="w-full absolute  md:w-auto  md:h-auto   rounded-lg p-6  flex flex-col items-center justify-center gap-4">
        <img
          src={monsterCongrats}
          alt="monster"
          className="w-40 animate-bounce pt-10"
        />
        <h2 className="text-lg font-bold mb-2">歡迎回來</h2>
        <img
          src={
            isDarkMode
              ? "/src/assets/logo/LogoTxtDark.svg"
              : "/src/assets/logo/LogoTxtLight.svg"
          }
          alt="Logo"
          className="hidden sm:block md:hidden h-8"
        />
        <p className="text-sm text-schema-on-surface-variant">
          {seconds}s後自動跳轉首頁
        </p>
      </div>
    </div>
  );
}
