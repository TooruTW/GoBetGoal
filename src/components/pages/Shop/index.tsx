import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Plan from "./components/Plan";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Shop() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromNavigation = location.state?.fromNavigation === true;
  const from = location.state?.from || "/";

  const handleGoBack = () => navigate(from, { replace: true });
  const priceOffRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
    gsap.from(priceOffRef.current, {
      scale: 100,
      opacity: 0,
      duration: 1.5,
      ease: "bounce",
    })
  },[])

  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center relative ${
        isFromNavigation ? "bg-background fixed z-20" : ""
      }`}
    >
      <div className="flex flex-col md:w-4/5 p-3 justify-center items-center  ">
        <div className="relative w-full ">
          {!isFromNavigation && (
            <div className=" absolute top-1/2 -translate-y-1/2 left-0">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleGoBack}
                className="flex items-center gap-2 hover:bg-schema-surface-container-high"
              >
                <ArrowLeft size={132} />
                <span className="hidden sm:inline">返回</span>
              </Button>
            </div>
          )}
          <h2 className="text-h2 font-title text-center ">貝果幣不夠了？</h2>
        </div>
        <p className="text-schema-on-surface-variant text-label">
          兌換一些快樂吧？買爆酷炫角色形象、試煉模板，去跟朋友對戰贏獎金！
        </p>
        <p className="text-schema-on-surface-variant text-label">
          現實中你也許還沒變成富翁，但在這裡花少少錢就能實現財富自由！
        </p>
      </div>

      <Plan isActive={true} />
      <div ref={priceOffRef} className="absolute text-5xl bg-red-500 rounded-lg p-4 top-10 right-10 -rotate-3 font-black">開幕大特價！！</div>
    </div>
  );
}
