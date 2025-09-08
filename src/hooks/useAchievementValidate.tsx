import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useUserAchievementSupa,
  useAchievementSupa,
  usePostUserAchiSupa,
  useGetAllParticipateTrial,
} from "@/api";
import { useState, useEffect } from "react";

type AchievementData = {
  id: string;
  created_at: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

export const useAchievementValidate = () => {
  const userId = useSelector((state: RootState) => state.account.user_id);
  const { data: userAchievementData, isLoading: userAchievementLoading } =
    useUserAchievementSupa(userId);
  const { data: achievementData, isLoading: achievementLoading } =
    useAchievementSupa();
  const { mutate: postUserAchi } = usePostUserAchiSupa();

  const [achievementStatusData, setAchievementStatusData] = useState<{
    allAchi: AchievementData[];
    doneAchi: AchievementData[];
    yetAchi: AchievementData[];
  } | null>(null);

  // 自動執行成就狀態分析
  useEffect(() => {
    if (!userId || userAchievementLoading || achievementLoading) return;
    if (!achievementData || !userAchievementData) return;
    const yetAchi = achievementData.filter(
      (achi) =>
        !userAchievementData.some(
          (userAchi) => userAchi.achievement_id === achi.id
        )
    );
    const doneAchi = achievementData.filter((achi) =>
      userAchievementData.some(
        (userAchi) => userAchi.achievement_id === achi.id
      )
    );
    setAchievementStatusData({
      allAchi: achievementData,
      doneAchi: doneAchi,
      yetAchi: yetAchi,
    });
  }, [
    userId,
    userAchievementData,
    achievementData,
    userAchievementLoading,
    achievementLoading,
  ]);

  const valiFirstCharge = () => {
    if (!userId) return;
    const achiId = "564d7e06-1d0a-4211-b2d8-802191dabbbb";
    const description = "你已經獲得成就：來財";
    const imgUrl = "/image/award/CandyAward1.webp";
    if (!achievementStatusData) return;
    const isGet = achievementStatusData.doneAchi.some(
      (achi) => achi.id === achiId
    );
    if (isGet) {
      console.log(isGet, "already get");
      return { isGet: true };
    }
    postUserAchi({
      user_id: userId,
      achievement_id: achiId,
    });
    return { isGet: false, description: description, imgUrl: imgUrl };
  };

  const {
    data: allTrialAndParticipant,
    isLoading: allTrialAndParticipantLoading,
  } = useGetAllParticipateTrial();

  const finishTrial1Times = () => {
    if (!userId) return;
    const achiId = "35f8c672-4ac8-4482-8723-6b9498a2ccc9";
    const targetCount = 1;
    const description = "你已經獲得成就：堅持就是勝利";
    const imgUrl = "/image/award/TrialCompleteAward3.webp";
    if (!achievementStatusData) return;

    const isGet = achievementStatusData.doneAchi.some(
      (achi) => achi.id === achiId
    );
    if (isGet) {
      console.log(isGet, "already get",achiId);
      return { isGet: true };
    }

    if (!allTrialAndParticipant || allTrialAndParticipantLoading) return;
    const userAllTrial = allTrialAndParticipant.filter(
      (item) => item.participant_id === userId && item.is_close
    );
    const completeCount = userAllTrial.length;
    if (completeCount === targetCount - 1) {
      postUserAchi({
        user_id: userId,
        achievement_id: achiId,
      });
      console.log(isGet, "already get",achiId);
      return { isGet: false, description: description, imgUrl: imgUrl };
    }
  };

  return {
    achievementStatusData,
    valiFirstCharge,
    finishTrial1Times,
    isLoading: userAchievementLoading || achievementLoading,
  };
};
