// components/TemplateLoop.tsx
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGetChallenges } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setChallengeTemplate } from "@/store/slices/challengeTemplate";
import TemplateCard from "@/components/pages/CreateTrial/components/TemplateCard";

export default function TemplateLoop() {
  const { data, isLoading } = useGetChallenges();
  const purchasedChallenges = useSelector(
    (state: RootState) => state.account.purchase_challenge
  );
  const [templateList, setTemplateList] = useState<
    {
      challengeName: string;
      isLocked: boolean;
      challengeId: string;
      imageUrl: string;
      color: string;
    }[]
  >([]);
  const dispatch = useDispatch();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // 整理資料
  useEffect(() => {
    if (isLoading || !data) return;

    dispatch(setChallengeTemplate(data));
    setTemplateList(
      data.map((template) => ({
        challengeName: template.title,
        isLocked: false,
        challengeId: template.id.toString(),
        imageUrl: `${template.img}`,
        color: template.color,
      }))
    );
  }, [data, isLoading, purchasedChallenges, dispatch]);

  // GSAP 跑馬燈效果
  useGSAP(
    () => {
      if (!templateList.length || !trackRef.current) return;

      const track = trackRef.current;
      // 取得軌道寬度
      const distance = track.scrollWidth / 2; // 除以2因為我們複製了一份

      gsap.to(track, {
        x: -distance,
        duration: 15,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: (x) => `${parseFloat(x) % distance}px`,
        },
      });
    },
    { scope: marqueeRef, dependencies: [templateList] }
  );

  if (isLoading) return <div className="text-center">載入中...</div>;
  if (!templateList.length)
    return <div className="text-center">沒有挑戰資料</div>;

  const loopList = [...templateList, ...templateList];

  return (
    <div ref={marqueeRef} className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="marquee-track flex gap-4 whitespace-nowrap"
      >
        {loopList.map((template, index) => (
          <div key={`${template.challengeId}-${index}`} className="shrink-0">
            <TemplateCard {...template} />
          </div>
        ))}
      </div>
    </div>
  );
}
