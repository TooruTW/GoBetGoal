import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserInfoSupa } from "@/api";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  const { id } = useParams();
  const { data: userInfo, error, isLoading } = useGetUserInfoSupa(id);

  useEffect(() => {
    if (error) {
      console.log("error", error);
      return;
    }
    if (!isLoading && !userInfo) {
      console.log("no userInfo");
      navigate(`/authentication/auth-account/${id}`);
    }
    if (!isLoading && userInfo) {
      navigate("/");
    }
  }, [userInfo, error, navigate, id, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-screen md:w-auto  md:h-auto  shadow-2xl rounded-lg p-6 bg-[var(--card)]  flex flex-col items-center justify-center gap-4">
        <img
          src="/monster/monsterDefault.webp"
          alt="monster"
          className="w-40"
        />
        <h2 className="text-lg font-bold mb-2">登入成功</h2>
        <p className="text-sm text-gray-600">歡迎回來！</p>
        <p className="text-sm text-gray-600">{seconds}s後自動跳轉首頁</p>
      </div>
    </div>
  );
}
