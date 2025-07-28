import { Button } from "@/components/ui/button";
import MyTrialInfo from "./components/MyTrialInfo";
import OthersTrailInfo from "./components/OthersTrailInfo";
import { useEffect, useRef, useState } from "react";
import SharePage from "./components/SharePage";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api/getTrialSupa";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BriefInfoProps } from "./components/TrialBriefInfo";
import { CertificationProps } from "./components/UserCertification";
import { ParticipantsProps } from "./components/Participants";

export default function TrialComplete() {
  const { id } = useParams();
  const { data, isLoading, error } = useTrialSupa(id?.toString() || "");
  const sharePageRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const userID = useSelector((state: RootState) => state.account.user_id);
  const userInfo = useSelector((state: RootState) => state.account);
  const [rewardRate, setRewardRate] = useState(1.5);
  const [trialBrief, setTrialBrief] = useState<BriefInfoProps | null>(null);
  const [certification, setCertification] = useState<CertificationProps | null>(
    null
  );
  const [participants, setParticipants] = useState<ParticipantsProps[]>([]);
  const [images, setImages] = useState<string[][]>([]);

  useEffect(() => {
    if (isLoading || !data) return;
    const totalHistory = data.length;
    const passCount = data.filter(
      (item) => item.status === "pass" || item.status === "cheat"
    ).length;

    if (passCount / totalHistory < 0.7) {
      setRewardRate(0);
    } else {
      setRewardRate(totalHistory >= 28 ? 1.5 : 1.2);
    }
  }, [data, isLoading]);

  // all player info
  useEffect(() => {
    if (isLoading || !data) return;

    const participantMap = new Map<string, ParticipantsProps>();

    data.forEach((history) => {
      if (!participantMap.has(history.participant_id)) {
        participantMap.set(history.participant_id, {
          id: history.participant_id,
          charactor_img_link: history.user_info.charactor_img_link,
          nick_name: history.user_info.nick_name,
          completeRate: `${
            history.status === "pass" || history.status === "cheat" ? "1" : "0"
          }`,
          cheatCount: history.status === "cheat" ? 1 : 0,
        });
      } else {
        const participant = participantMap.get(history.participant_id);
        if (participant) {
          participant.completeRate = `${
            parseInt(participant.completeRate) + 1
          }`;
          participant.cheatCount =
            participant.cheatCount + (history.status === "cheat" ? 1 : 0);
        }
      }
    });

    participantMap.forEach((value) => {
      const formedData = {
        ...value,
        completeRate: `${value.completeRate} / ${data[0].trial.challenge.stage_count}`,
      };
      setParticipants((prev) => [...prev, formedData]);
    });
  }, [data, isLoading]);

  useEffect(() => {
    if (isLoading || !data || !userID) return;

    const filteredData = data.filter((item) => item.participant_id === userID);

    const imageArray = filteredData.map((data) => data.upload_image || []);
    setImages(imageArray);

    const category = filteredData[0].trial.challenge.category;
    const result = filteredData[0].trial.trial_status;
    const trialName = filteredData[0].trial.title;
    const challengeName = filteredData[0].trial.challenge.title;
    const challengeCount = filteredData.length;
    const trialDescription = filteredData[0].trial.challenge.description;
    const trialFrequency = filteredData[0].trial.challenge.frequency;
    const trialTotalDays =
      filteredData.length * filteredData[0].trial.challenge.frequency;
    const participantCount = new Set(data.map((item) => item.participant_id))
      .size;

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

    const userInfo = {
      charactor_img_link: filteredData[0].user_info.charactor_img_link,
      nick_name: filteredData[0].user_info.nick_name,
    };
    const trialReward = filteredData[0].trial.deposit * rewardRate;
    const passCount = filteredData.filter(
      (item) => item.status === "pass"
    ).length;
    const cheatCount = filteredData.filter(
      (item) => item.status === "cheat"
    ).length;
    const trialCompleteRate = `${passCount + cheatCount} / ${challengeCount}`;

    setCertification({
      userInfo: userInfo,
      trialName: trialName,
      trialReward: trialReward,
      trialCompleteRate: trialCompleteRate,
      cheatCount: cheatCount,
    });
  }, [data, isLoading, userID, rewardRate]);

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
        {trialBrief && certification && (
          <MyTrialInfo trialBrief={trialBrief} certification={certification} />
        )}
        {participants.length > 0 && images.length > 0 && (
          <OthersTrailInfo participants={participants} images={images} />
        )}
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
          userImage={userInfo.charactor_img_link}
          userName={userInfo.nick_name}
          trialName={trialBrief?.trialName || ""}
          trialReward={certification?.trialReward.toString() || "0"}
        />
      </div>
    </div>
  );
}
