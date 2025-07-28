import { Button } from "@/components/ui/button";
import MyTrialInfo from "./components/MyTrialInfo";
import OthersTrailInfo from "./components/OthersTrailInfo";
import { useEffect, useRef, useState } from "react";
import SharePage from "./components/SharePage";
import { monsterDefault } from "@/assets/monster";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api/getTrialSupa";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function TrialComplete() {
  const { id } = useParams();
  const { data, isLoading, error } = useTrialSupa(id?.toString() || "");
  const sharePageRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data, "cheaking");
    }
  }, [data]);

  useClickOutside(sharePageRef, () => {
    setIsShow(false);
    console.log("click outside");
  });
  const handleShowSharePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShow(true);
    console.log("click inside");
  };

  useEffect(() => {
    if (!sharePageRef.current) return;
    if (isShow) {
      gsap.to(sharePageRef.current, {
        opacity: 1,
        duration: 1,
        yPercent: -100,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(sharePageRef.current, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "power2.inOut",
      });
    }
  }, [isShow]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-col gap-20 items-center max-w-400 w-full py-10 max-xl:gap-2 relative z-0">
        <MyTrialInfo />
        <OthersTrailInfo />
        <Button
          className="w-full rounded-md text-p font-bold text-schema-on-primary"
          onClick={handleShowSharePage}
        >
          結算結果並分享到大平台
        </Button>
      </div>

      <div
        ref={sharePageRef}
        className="w-full fixed bottom-0 z-10 bg-schema-surface-container flex justify-center items-center translate-y-full rounded-t-4xl border-2 border-t-schema-outline border-l-schema-outline border-r-schema-outline py-20"
      >
        <SharePage
          userImage={monsterDefault}
          userName={"綠茶婊多多"}
          trialName={"無情燃燒"}
          trialReward={"10000"}
        />
      </div>
    </div>
  );
}
