import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserInfoSupa } from "@/api";
import { monsterDefault } from "@/assets/monster";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <DotLottieReact
        src="https://lottie.host/c85d62ad-f964-49d6-8ff8-b244b290cf93/BHYfjAyDEv.lottie"
        loop
        autoplay
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
      />
      <div className="w-full h-screen md:w-auto  md:h-auto  shadow-2xl rounded-lg p-6 bg-[var(--card)]  flex flex-col items-center justify-center gap-4">
        <img src={monsterDefault} alt="monster" className="w-40" />
        <h2 className="text-lg font-bold mb-2">歡迎回來！</h2>
        <p className="text-sm text-gray-500">{seconds}s後自動跳轉首頁</p>
      </div>
    </div>
  );
}
