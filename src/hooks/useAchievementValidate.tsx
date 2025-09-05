import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useUserAchievementSupa,
  useAchievementSupa,
  usePostUserAchiSupa,
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

  const valiFristCharge = () => {
    if (!achievementStatusData) return;
    const isGet = achievementStatusData.doneAchi.some(
      (achi) => achi.id === "564d7e06-1d0a-4211-b2d8-802191dabbbb"
    );
    if (isGet) {
      console.log(isGet, "aleady get");
      return {isGet:true ,description: "你已經獲得成就：來財", imgUrl:"/image/award/CandyAward1.webp"}
    }
    console.log("valiFristCharge");

    postUserAchi({
      user_id: userId,
      achievement_id: "564d7e06-1d0a-4211-b2d8-802191dabbbb",
    });
    return {isGet:false ,description: "你已經獲得成就：來財", imgUrl:"/image/award/CandyAward1.webp"}
  };

  return {
    achievementStatusData,
    valiFristCharge,
    isLoading: userAchievementLoading || achievementLoading,
  };
};
