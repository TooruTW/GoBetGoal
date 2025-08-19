import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useTrialSupa } from "@/api/index";

import { Button } from "@/components/ui/button";
import OthersTrialInfo from "./components/OthersTrialInfo";
import MyTrialInfo from "./components/MyTrialInfo";
import SharePage from "./components/SharePage";

import { ParticipantsProps } from "./components/Participants";
import { BriefInfoProps } from "./components/TrialBriefInfo";
import { ResultProps } from "./components/MyTrialInfo";

export default function TrialComplete() {
  const { id } = useParams();
  const { data, isLoading, error } = useTrialSupa(id?.toString() || "");

  const sharePageRef = useRef<HTMLDivElement>(null);

  const userInfo = useSelector((state: RootState) => state.account);
  const [rewardRate, setRewardRate] = useState(1.5);
  const [trialBrief, setTrialBrief] = useState<BriefInfoProps | null>(null);
  const [certification, setCertification] = useState<ResultProps | null>(null);
  const [participants, setParticipants] = useState<ParticipantsProps[] | null>(
    null
  );
  const [images, setImages] = useState<string[][]>([]);

  const [selectedUserID, setSelectedUserID] = useState<string>("");

  const userID = useSelector((state: RootState) => state.account.user_id);

  // select id to show result
  useEffect(() => {
    if (isLoading || !participants) return;

    if (userID) {
      setSelectedUserID(userID);
    } else {
      const userID = participants[0].id;
      setSelectedUserID(userID);
    }
  }, [userID, isLoading, participants]);

  // calculate reward rate
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
          character_img_link: history.user_info.character_img_link,
          nick_name: history.user_info.nick_name,
          completeRate: `${
            history.status === "pass" || history.status === "cheat" ? 1 : 0
          }`,
          cheatCount: history.status === "cheat" ? 1 : 0,
        });
      } else {
        const participant = participantMap.get(history.participant_id);
        if (participant) {
          participant.completeRate = `${
            parseInt(participant.completeRate) +
            (history.status === "pass" || history.status === "cheat" ? 1 : 0)
          }`;
          participant.cheatCount =
            participant.cheatCount + (history.status === "cheat" ? 1 : 0);
        }
      }
    });

    const formedDataArr: ParticipantsProps[] = [];
    participantMap.forEach((value) => {
      const formedData = {
        ...value,
        completeRate: `${value.completeRate} / ${data[0].trial.challenge.stage_count}`,
      };
      formedDataArr.push(formedData);
    });

    formedDataArr.sort((a, b) => {
      const aCompleteRate = parseInt(a.completeRate.split(" / ")[0]);
      const bCompleteRate = parseInt(b.completeRate.split(" / ")[0]);

      return bCompleteRate - aCompleteRate;
    });

    setParticipants(formedDataArr);
  }, [data, isLoading]);

  // set trial brief info
  useEffect(() => {
    if (isLoading || !data || !selectedUserID) return;

    const filteredData = data.filter(
      (item) => item.participant_id === selectedUserID
    );

    console.log(filteredData, "filteredData");

    const imageArray = filteredData.map((data) => data.upload_image || []);
    setImages(imageArray);

    const category = filteredData[0].trial.challenge.category;
    const result = filteredData[0].trial.trial_status as
      | "pass"
      | "perfect"
      | "fail";
    const trialName = filteredData[0].trial.title;
    const challengeName = filteredData[0].trial.challenge.title;
    const challengeCount = filteredData.length;
    const trialDescription = filteredData[0].trial.challenge.description;
    const trialFrequency = String(filteredData[0].trial.challenge.frequency);
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
      character_img_link: filteredData[0].user_info.character_img_link,
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
      character_img_link: userInfo.character_img_link,
      nick_name: userInfo.nick_name,
      trialReward: trialReward,
      trialCompleteRate: trialCompleteRate,
      cheatCount: cheatCount,
    });
  }, [data, isLoading, rewardRate, selectedUserID]);

  // share page animation
  const { contextSafe } = useGSAP({ scope: sharePageRef });
  // 先隱藏元素
  useGSAP(
    () => {
      // 設定初始狀態
      if (!sharePageRef.current) return;
      gsap.set(sharePageRef.current, {
        opacity: 0,
        yPercent: 100,
      });
    },
    {
      dependencies: [sharePageRef.current],
    }
  );
  const handleShowSharePage = contextSafe(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      gsap.fromTo(
        sharePageRef.current,
        {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "power2.inOut",
        },
        {
          opacity: 1,
          duration: 1,
          yPercent: 0,
          ease: "power2.inOut",
        }
      );
    }
  );
  const handleHideSharePage = contextSafe(() => {
    gsap.to(sharePageRef.current, {
      opacity: 0,
      duration: 1,
      yPercent: 100,
      ease: "power2.inOut",
    });
  });
  useClickOutside(sharePageRef, () => {
    handleHideSharePage();
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 items-center w-full overflow-hidden">
      <div className="flex flex-col gap-20 items-center max-w-400 w-full py-10 max-xl:gap-2 relative z-0">
        {trialBrief && certification && (
          <MyTrialInfo trialBrief={trialBrief} certification={certification} />
        )}
        {participants && participants.length > 0 && images.length > 0 && (
          <OthersTrialInfo
            participants={participants}
            images={images}
            onClick={(id) => setSelectedUserID(id)}
          />
        )}
        <Button
          className="w-full rounded-md text-p font-bold text-schema-on-primary cursor-pointer disabled:opacity-0 disabled:cursor-none"
          onClick={(e) => handleShowSharePage(e)}
          disabled={selectedUserID !== userID || !userID}
        >
          結算結果並分享到大平台
        </Button>
      </div>

      <div
        ref={sharePageRef}
        className="w-full fixed bottom-0 max-h-4/5 z-10 bg-schema-surface-container flex justify-center items-center rounded-t-4xl border-2 border-t-schema-outline border-l-schema-outline border-r-schema-outline py-20"
      >
        <SharePage
          userImage={userInfo.character_img_link}
          userName={userInfo.nick_name}
          trialName={trialBrief?.trialName || ""}
          trialReward={certification?.trialReward.toString() || "0"}
          onClose={handleHideSharePage}
        />
      </div>
    </div>
  );
}
