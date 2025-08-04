import GlareHover from "@/components/shared/reactBit/GlareHover";
import type { MonsterImage } from "@/assets/monster";
import CandyDrop from "@/components/pages/Authentication/components/CandyDrop";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { monsterSleep, monsterRun, monsterCongrats } from "@/assets/monster";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type Plan = {
  src: MonsterImage;
  price: number;
  candy: number;
  show: string;
  translate: number;
};

const plan: Plan[] = [
  { src: monsterSleep, price: 19, candy: 10000, show: "1k", translate: 0 },
  { src: monsterRun, price: 99, candy: 100000, show: "100k", translate: 10 },
  {
    src: monsterCongrats,
    price: 299,
    candy: 1000000,
    show: "1M",
    translate: 0,
  },
];

export default function Shop() {
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 判斷是否從其他頁面導航而來（不是從 header 來的）
  const isFromNavigation = location.state?.fromNavigation === true;
  const from = location.state?.from || "/";

  const handleGoBack = () => {
    navigate(from, { replace: true });
  };

  const onClose = () => {
    setShowSuccess(false);
  };
  const depositSuccess = () => {
    console.log("Deposit successful");
    setShowSuccess(true);
    // setTimeout(() => {
    //   navigate(from, { replace: true });
    // }, 2000);
  };

  return (
    <div
      className={`w-full max-w-330 h-screen flex flex-col justify-center items-center relative ${
        isFromNavigation ? "bg-background fixed z-20" : ""
      }`}
    >
      {!isFromNavigation && (
        <div className="w-full ">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="flex items-center gap-2 hover:bg-schema-surface-container-high"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">返回</span>
          </Button>
        </div>
      )}
      <div
        className="flex flex-col md:w-4/5 p-3 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-h2 font-title text-center pb-8">貝果不夠了？</h2>

        <ul className="flex gap-2 md:gap-4">
          {plan.map((item, index) => (
            <li onClick={depositSuccess}>
              <GlareHover
                glareColor="#ffffff"
                key={index}
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={true}
                onHover={() => setShow(true)}
                className={`p-2 md:p-4 flex flex-col  items-center gap-2 h-auto border hover:perspective-dramatic rounded-4xl bg-schema-surface-container-high/75 hover:bg-schema-primary active:bg-schema-primary shadow-lg -translate-y-${item.translate} hover:-translate-y-2 transition-transform hover:scale-105 active:scale-95`}
              >
                <h2 className="font-title md:text-xl">🍬 &nbsp; {item.show}</h2>
                {show && (
                  <CandyDrop
                    trigger={show}
                    onAnimationComplete={() => setShow(false)}
                  />
                )}

                {/* <div className="h-full w-full absolute z-0 flex items-center justify-center -translate-y-8 scale-75 opacity-80">
                  <CandyDrop />
                </div> */}
                <div className="relative z-10 flex flex-col items-center">
                  <img src={item.src} alt={item.src} className="h-full" />
                  <p className="text-sm font-title">NTD {item.price}</p>
                  <Button
                    variant="secondary"
                    className="hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    兌換
                  </Button>
                </div>
              </GlareHover>
            </li>
          ))}
        </ul>
      </div>
      {showSuccess && (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/50 z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-schema-surface-container-high p-6 rounded-lg shadow-lg z-30">
            <h3 className="text-h3 font-bold mb-4">成功儲值！</h3>
            <p className="">現在你就是貝果富翁啦，盡情揮霍吧</p>
            <div className="flex justify-center gap-4">
              <Button
                className="mt-4"
                onClick={() => navigate(from, { replace: true })}
              >
                回去大撒貝果
              </Button>
              <Button variant="outline" className="mt-4" onClick={onClose}>
                繼續儲值
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
