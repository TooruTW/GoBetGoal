import { useAchievementSupa, useUserAchievementSupa } from "@/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function DevAchievement() {

    const userId = useSelector((state:RootState)=>state.account.user_id)
    const [userAchiSet, setUserAchiSet] = useState<Set<string>>(new Set())

  const { data:allAchievement, error:allError, isLoading:isAllLoading } = useAchievementSupa();
  const { data:userAchievement, error:userError, isLoading:isUserLoading } = useUserAchievementSupa(userId);

  useEffect(() => {
    if (isAllLoading || allError || !allAchievement) return;
    console.log(allAchievement);
  }, [allAchievement, allError, isAllLoading]);

  useEffect(()=>{
    if(isUserLoading || userError || !userAchievement) return
    console.log(userAchievement,"user")

    const userAchiSet = new Set(userAchievement.map((achi)=>achi.achievement_id))
    setUserAchiSet(userAchiSet)
  },[userAchievement, userError, isUserLoading])

  return (
    <div>
      <ul className="grid grid-cols-4 gap-4">
        {allAchievement &&
          allAchievement.map((achievement) => {
            return (
              <li key={achievement.id} className={`${userAchiSet.has(achievement.id) ? "opacity-100" : "opacity-30"}`}>
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
