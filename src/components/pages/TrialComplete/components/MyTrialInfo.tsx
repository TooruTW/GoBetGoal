import { useRef } from "react";
import TrialBriefInfo from "./TrialBriefInfo";
import { BriefInfoProps } from "./TrialBriefInfo";
import Aurora from "@/components/shared/reactBit/Aurora";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface ResultProps {
  charactor_img_link: string;
  nick_name: string;
  trialReward: number;
  trialCompleteRate: string;
  cheatCount: number;
}

interface TrialCompleteProps {
  trialBrief?: BriefInfoProps;
  certification?: ResultProps;
}

export default function MyTrialInfo(props: TrialCompleteProps) {
  const { trialBrief, certification } = props;
  const resultRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [avatarRef.current, resultRef.current],
        {
          opacity: 0,
          yPercent: 100,
          rotateY: 0,
        },
        {
          opacity: 1,
          yPercent: 0,
          rotateY: 720,
          duration: 1.5,
          stagger: 0.5,
          ease: "power2.inOut",
        }
      );
    },
    {
      dependencies: [certification],
      scope: resultRef,
    }
  );

  if (!trialBrief || !certification) return <h1>Loading...</h1>;

  return (
    <div className="flex relative justify-center gap-10 items-center w-screen  border-b-4 border-schema-outline px-5 max-xl:flex-col-reverse max-xl:gap-2 max-xl:max-h-none overflow-y-hidden">
      <div className="flex gap-10 w-full items-center justify-center h-60">
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

        <img
          ref={avatarRef}
          src={certification.charactor_img_link}
          alt="user"
          className="w-full max-w-1/3 object-cover max-xl:w-1/3 z-10 self-start"
        />

        <div
          ref={resultRef}
          className="w-1/2 z-10 pt-4 pb-2 flex justify-center gap-10 items-center rounded-tl-3xl"
        >
          <h3 className="text-h3 text-nowrap flex flex-col items-center">
            <span className="text-schema-primary">完成率</span>
            <span className="text-h2">{certification.trialCompleteRate}</span>
          </h3>
          <h3 className="text-h3 text-nowrap flex flex-col items-center">
            <span className="text-schema-primary">快樂遮羞布使用量</span>
            <span className="text-h2">{certification.cheatCount}</span>
          </h3>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-full z-0 rotate-180">
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
