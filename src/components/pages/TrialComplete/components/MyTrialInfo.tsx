import { useEffect, useRef } from "react";
import TrialBriefInfo from "./TrialBriefInfo";
import { BriefInfoProps } from "./TrialBriefInfo";
import Aurora from "@/components/shared/reactBit/Aurora";
import gsap from "gsap";

export interface ResultProps {
  charactor_img_link:string;
  nick_name:string;
  trialReward:number;
  trialCompleteRate:string;
  cheatCount:number;
}

interface TrialCompleteProps {
  trialBrief?: BriefInfoProps;
  certification?: ResultProps;
}

export default function MyTrialInfo(props: TrialCompleteProps) {
  const { trialBrief, certification } = props;
const resultRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!resultRef.current) return;
    gsap.fromTo(resultRef.current, {
      opacity: 0,
      yPercent:100,
      duration: 1,
      ease: "power2.inOut",
    },{
      opacity: 1,
      yPercent:0,
      duration: 1,
      ease: "power2.inOut",
    });
  },[certification])

  
  if (!trialBrief || !certification) return <h1>Loading...</h1>;

  return (
    <div className="flex relative justify-between gap-10 items-center w-full max-h-80 h-full border-b-4 border-schema-outline px-5 max-xl:flex-col-reverse max-xl:gap-2 max-xl:max-h-none overflow-hidden">
      <TrialBriefInfo
        category={trialBrief.category}
        result={trialBrief.result}
        trialName={trialBrief.trialName}
        challengeName={trialBrief.challengeName}
        challengeCount={trialBrief.challengeCount}
        trialDescription={trialBrief.trialDescription}
        trialFrequency={trialBrief.trialFrequency}
        trialTotalDays={trialBrief.trialTotalDays}
        trialPeople={trialBrief.trialPeople}
      />
      <img src={certification.charactor_img_link} alt="user" className="w-full max-w-1/2 object-cover object-top max-xl:w-1/3 z-10 self-start" />
      <div ref={resultRef} className="absolute bottom-0 right-1/4 translate-x-1/2 bg-schema-surface-container-highest w-1/2 z-10 pt-4 pb-2 flex justify-center gap-10 items-center rounded-tl-3xl">
        <h2 className="text-h2">完成率：{certification.trialCompleteRate}</h2>
        <h2 className="text-h2">快樂遮羞布使用量：{certification.cheatCount}</h2>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-0 rotate-180">
        <Aurora
          colorStops={["#EBA7E4", "#FF94B4", "#EAC3EB"]}
          blend={0.5}
          amplitude={0.5}
          speed={1}
        />
      </div>
    </div>
  );
}
