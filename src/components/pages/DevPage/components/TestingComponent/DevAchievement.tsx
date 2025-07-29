import { useAchievementSupa } from "@/api";
import { useEffect } from "react";

export default function DevAchievement() {
  const { data, error, isLoading } = useAchievementSupa();

  useEffect(() => {
    if (isLoading || error || !data) return;

    console.log(data);
  }, [data, error, isLoading]);

  return (
    <div>
      <ul className="grid grid-cols-4 gap-4">
        {data &&
          data.map((achievement) => {
            return (
              <li key={achievement.id} className="opacity-30">
                <p>{achievement.id}</p>
                <p>{achievement.oreder}</p>
                <p>{achievement.title}</p>
                <p>{achievement.description}</p>
                <img src={achievement.icon_url} alt="" />
                <p>{achievement.created_at}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
