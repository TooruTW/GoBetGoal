import { useAchievementSupa, useGetUserAchievementSupa } from "@/api";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SpotlightCard from "@/components/shared/reactBit/SpotlightCard";

type Achievement = {
  id?: number;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

interface acceptProps {
  girdCols?: string;
  user?: string;
}

export default function Achievement(props: acceptProps) {
  const { girdCols, user } = props;
  const { data, isLoading, error } = useAchievementSupa();
  const { data: userAchievements } = useGetUserAchievementSupa(user || "");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // 獲取用戶已獲得的成就ID陣列
  const userAchievementIds = userAchievements?.map((item) => item.id) || [];
  console.log("userAchievementIds", userAchievementIds);
  console.log("userAchievements", userAchievements);
  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
    if (data) setAchievements(data);
  }, [data, isLoading, error, props]);

  useEffect(() => {
    if (!cardContainerRef.current?.children.length) return;
    gsap.fromTo(
      cardContainerRef.current.children,
      {
        y: "50",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back",
        stagger: 0.1,
      }
    );
  }, [cardContainerRef, achievements]);

  return (
    <div ref={cardContainerRef} className={`grid gap-2 ${girdCols}`}>
      {achievements.length > 0 &&
        achievements.map((achievement) => {
          const isUnlocked = userAchievementIds.includes(achievement.id);

          return (
            <li
              className={`flex flex-col text-center ${
                !isUnlocked ? "grayscale" : ""
              }`}
              key={achievement.id}
            >
              <SpotlightCard
                className="custom-spotlight-card h-full flex flex-col items-center"
                spotlightColor="rgba(255, 255, 255, 0.2)"
              >
                <img
                  src={achievement.icon_url}
                  alt={achievement.title}
                  className="w-40"
                />
                <h2 className="font-bold text-nowrap">{achievement.title}</h2>
                <p className="text-sm opacity-50">{achievement.description}</p>
              </SpotlightCard>
            </li>
          );
        })}
    </div>
  );
}
