import { useAchievementSupa, useUserAchievementSupa } from "@/api";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SpotlightCard from "@/components/shared/reactBit/SpotlightCard";
import { monsterCry } from "@/assets/monster";

type Achievement = {
  id?: number;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

interface AcceptProps {
  gridCols?: string;
  user?: string;
  showType?: "all" | "user";
}

export default function Achievement(props: AcceptProps) {
  const { gridCols, showType = "all" } = props;
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [userAchiSet, setUserAchiSet] = useState<Set<number>>(new Set());

  const {
    data: allAchievement,
    error: allError,
    isLoading: isAllLoading,
  } = useAchievementSupa();

  const {
    data: userAchievement,
    error: userError,
    isLoading: isUserLoading,
  } = useUserAchievementSupa(userId);

  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // 計算要顯示的成就列表
  const displayAchievements = useMemo(() => {
    if (!allAchievement) return [];

    if (showType === "user") {
      // 只顯示用戶已獲得的成就，最多8個
      const userAchievements = allAchievement
        .filter((achievement) => userAchiSet.has(achievement.id))
        .slice(0, 8);
      return userAchievements;
    }

    // 顯示所有成就
    return allAchievement;
  }, [allAchievement, userAchiSet, showType]);

  // 處理用戶成就數據
  useEffect(() => {
    if (isUserLoading || userError || !userAchievement) return;

    const userAchiSet = new Set(
      userAchievement.map((achi) => achi.achievement_id)
    );
    setUserAchiSet(userAchiSet);
  }, [userAchievement, userError, isUserLoading]);

  // GSAP 動畫效果
  useEffect(() => {
    if (!cardContainerRef.current?.children.length) return;

    gsap.fromTo(
      cardContainerRef.current.children,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }
    );
  }, [displayAchievements]);

  // 載入狀態
  if (isAllLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // 錯誤狀態
  if (allError || userError) {
    return (
      <div className="text-center text-red-500 p-4">
        <img src={monsterCry} alt="" className=" w-full md:w-1/3" />
        載入成就時發生錯誤，請稍後再試
      </div>
    );
  }

  return (
    <div>
      {showType === "user" && allAchievement && (
        <div className="text-sm text-schema-on-surface-variant">
          已獲得成就：{displayAchievements.length} / {allAchievement.length}個
        </div>
      )}

      <div ref={cardContainerRef} className={`grid gap-2 ${gridCols}`}>
        {displayAchievements.map((achievement) => {
          const isUnlocked = userAchiSet.has(achievement.id);
          return (
            <div className="flex flex-col text-center" key={achievement.id}>
              <SpotlightCard
                className={`custom-spotlight-card h-full flex flex-col items-center transition-opacity duration-300 ${
                  showType === "user" || isUnlocked
                    ? "opacity-100"
                    : "opacity-30 grayscale"
                }`}
                spotlightColor="rgba(255, 255, 255, 0.2)"
              >
                <img
                  src={achievement.icon_url}
                  alt={achievement.title}
                  className="w-40"
                  loading="lazy"
                />
                <h2 className="font-bold text-nowrap">{achievement.title}</h2>
                <p className="text-sm opacity-50">{achievement.description}</p>

                {/* 可選：顯示解遖狀態 */}
                {showType === "all" && (
                  <div className="mt-2">
                    {isUnlocked ? (
                      <span className="text-xs text-green-500">✓ 已解鎖</span>
                    ) : (
                      <span className="text-xs text-gray-400">未解鎖</span>
                    )}
                  </div>
                )}
              </SpotlightCard>
            </div>
          );
        })}

        {/* 當用戶模式下沒有成就時的提示 */}
      </div>
      {showType === "user" && displayAchievements.length === 0 && (
        <div className="flex flex-col items-center  w-full">
          <img src={monsterCry} alt="" className=" w-full md:w-1/3" />
          <p className=" text-center text-schema-on-surface-variant py-8">
            還沒有獲得任何成就，快去探索吧！
          </p>
        </div>
      )}
    </div>
  );
}
