import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Candy from "../Header/Navigator/Candy" ;

type RegisterSuccessProps = {
  nickname: string;
  avatar: string;
};

export default function RegisterSuccess({ nickname, avatar }: RegisterSuccessProps) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/home");
    }, 200000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="w-full h-screen md:w-auto  md:h-auto   shadow-2xl rounded-lg p-6 bg-[var(--card)]  flex flex-col items-center justify-center gap-4">
        <div className="flex items-end -gap-10 justify-center">
          <img src={avatar} alt="選擇的頭像" className="w-60 rounded-full mx-auto my-4" />
          <img src="/monster/monsterDefault.webp" alt="monster" className="w-32 h-36 -ml-24" />
        </div>
      <div className=" flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-bold ">歡迎 {nickname} 進入樂園！</h2>
        <p className="text-sm border-gradient-set-1">快拿糖果去參加試煉吧，減肥為了吃更多糖果</p>
      </div>
        <Candy amount={10000} />
        <p className="text-sm text-gray-600">{seconds}s後自動跳轉首頁</p>
    </div>
  );
}