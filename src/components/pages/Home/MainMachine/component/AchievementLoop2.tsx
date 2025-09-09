import { useAchievementSupa } from "@/api";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Achievement } from "@/api/getAchievementSupa";
import {
  CandyAward1,
  EatTrialAward1,
  FriendAward1,
  KingAward1,
  SalatAward1,
  SleepTrialAward1,
  SocialAward1,
  SportTrialAward1,
} from "@/assets/Achievement";

export default function AchievementLoop2({ className }: { className?: string }) {
  const { data, isLoading } = useAchievementSupa();
  const [list, setList] = useState<Achievement[]>([]);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isLoading || !data) return;
    setList(data);
  }, [data, isLoading]);

  useGSAP(
    () => {
      if (!logoRef.current || !list.length) return;
      gsap.to(".wrapper", {
        xPercent: 100,
        repeat: -1,
        duration: 10,
        ease: "linear",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none pause",
        },
      });
    },
    { scope: logoRef, dependencies: [list] }
  );

  return (
    <div
      ref={logoRef}
      className={`w-full border-y border-gray-300 bg-schema-surface-container-high py-3 flex items-center overflow-hidden ${className}`}
    >
      <div className="wrapper w-screen flex justify-around items-center h-full shrink-0 -translate-x-full">
        <img loading="lazy" className="h-full" src={CandyAward1} alt="" />
        <img loading="lazy" className="h-full" src={EatTrialAward1} alt="" />
        <img loading="lazy" className="h-full" src={FriendAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={KingAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SalatAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SleepTrialAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SocialAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SportTrialAward1} alt="" />
      </div>
      <div className="wrapper w-screen flex justify-around items-center h-full shrink-0 -translate-x-full">
        <img loading="lazy" className="h-full" src={CandyAward1} alt="" />
        <img loading="lazy" className="h-full" src={EatTrialAward1} alt="" />
        <img loading="lazy" className="h-full" src={FriendAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={KingAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SalatAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SleepTrialAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SocialAward1} alt="" />
        <img loading="lazy" className="h-full max-md:hidden" src={SportTrialAward1} alt="" />
      </div>
    </div>
  );
}
