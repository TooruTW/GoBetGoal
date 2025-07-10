import { useAchievementSupa } from "@/api";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Achievement = {
  id?: number;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

interface AchievementProps {
  gridCols?: number;
  gridColsMd?: number;
  gridColsLg?: number;
}

export default function Achievement({ gridCols, gridColsMd, gridColsLg }: AchievementProps) {
  const { data, isLoading, error } = useAchievementSupa();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
    if (data) setAchievements(data);
  }, [data, isLoading, error]);

  useEffect(() => {
    if (!cardContainerRef.current) return;
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
  }, [achievements]);

  const gridClass = [
    gridCols ? `grid-cols-${gridCols}` : "",
    gridColsMd ? `md:grid-cols-${gridColsMd}` : "",
    gridColsLg ? `lg:grid-cols-${gridColsLg}` : "",
    "grid gap-4"
  ].join(" ").trim();

  return (
    <div
      ref={cardContainerRef}
      className={gridClass}
    >
      {achievements.length > 0 &&
        achievements.map((achievement) => (
          <li
            className="p-4 flex flex-col text-center achievement"
            key={achievement.id}
          >
            <img
              src={achievement.icon_url}
              alt={achievement.title}
              className="w-40"
            />
            <h2 className="font-bold">{achievement.title}</h2>
            <p className="text-sm opacity-50">{achievement.description}</p>
          </li>
        ))}
    </div>
  );
}
