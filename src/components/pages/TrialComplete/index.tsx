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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BriefInfoProps } from "./components/TrialBriefInfo";
import { CertificationProps } from "./components/UserCertification";

export default function TrialComplete() {
  const { id } = useParams();
  const { data, isLoading, error } = useTrialSupa(id?.toString() || "");
  const sharePageRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const userID = useSelector((state: RootState) => state.account.user_id);
  const [trialBrief, setTrialBrief] = useState<BriefInfoProps | null>(null);
  const [certification, setCertification] = useState<CertificationProps | null>(null);

  useEffect(() => {
    if (isLoading || !data || !userID) return;
    console.log(data, "cheaking");

    const filteredData = data.filter((item) => item.participant_id === userID);


    const category = filteredData[0].trial.challenge.category;
    const result = filteredData[0].trial.trial_status;
    const trialName = filteredData[0].trial.title;
    const challengeName = filteredData[0].trial.challenge.title;
    const challengeCount = filteredData.length;
    const trialDescription = filteredData[0].trial.challenge.description;
    const trialFrequency = filteredData[0].trial.challenge.frequency;
    const trialTotalDays = filteredData.length * filteredData[0].trial.challenge.frequency;
    const participantCount = new Set(data.map((item) => item.participant_id)).size;

    setTrialBrief({
      category: category,
      result: result,
      trialName: trialName,
      challengeName: challengeName,
      challengeCount: challengeCount,
      trialDescription: trialDescription,
      trialFrequency: trialFrequency,
      trialTotalDays: trialTotalDays,
      trialPeople: participantCount,
    });

    const awardRate = 1.5;

    const userInfo = {
      charactor_img_link: filteredData[0].user_info.charactor_img_link,
      nick_name: filteredData[0].user_info.nick_name,
    }
    const trialReward = filteredData[0].trial.deposit * awardRate;
    const passCount = filteredData.filter((item) => item.status === "pass").length;
    const cheatCount = filteredData.filter((item) => item.status === "cheat").length;
    const trialCompleteRate = `${passCount + cheatCount} / ${challengeCount}`;

    setCertification({
      userInfo:userInfo,
      trialName:trialName,
      trialReward:trialReward,
      trialCompleteRate:trialCompleteRate,
      cheatCount:cheatCount,
    });

  }, [data, isLoading, userID]);

  useClickOutside(sharePageRef, () => {
    setIsShow(false);
  });
  const handleShowSharePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShow(true);
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
        {trialBrief && certification && <MyTrialInfo trialBrief={trialBrief} certification={certification} />}
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
