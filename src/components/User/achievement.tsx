import { useAchievementSupa } from "@/api";
import { useEffect, useState } from "react";
type Achievement = {
  id?: number;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

export default function Achievement() {
  const { data, isLoading, error } = useAchievementSupa();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
      if (isLoading) return;
      if (error) console.log(error);
      if (data) setAchievements(data);
    }, [data, isLoading, error]);

  return (
    <div className="w-full  py-20">
      <section className="w-full  flex flex-col justify-center items-center">
          <ul className="grid grid-cols-3 md:grid-cols-6 gap-0 md:gap-4 max-w-330 mx-auto">
            {achievements.length > 0 &&
              achievements.map((achievement) => (
                <li
                  className=" p-4  flex flex-col text-center"
                  key={achievement.id}
                >
                  <img
                    src={achievement.icon_url}
                    alt={achievement.title}
                    className="w-40"
                  />
                  <h2 className="font-bold">
                    {achievement.title}
                  </h2>
                  <p className="text-sm opacity-50"> {achievement.description}</p>


                </li>
              ))}
          </ul>
      </section>
    </div>
  );
}
