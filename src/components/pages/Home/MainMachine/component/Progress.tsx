import { useGetUserInfoAllSupa } from "@/api";
import Playlistcard from "@/components/pages/SocialPages/components/PlayerlistCard";
import { useEffect, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";

export default function Ranking() {
  const { data, isLoading, error } = useGetUserInfoAllSupa();
  const [rankingList, setRankingList] = useState<UserInfoSupa[]>([]);

  useEffect(() => {
    if (data && !isLoading && !error) {
      const newList = data.sort(
        (a, b) => (b.total_trial_count || 0) - (a.total_trial_count || 0)
      );
      const top10 = newList.slice(0, 10);
      setRankingList(top10);
    }
  }, [data, isLoading, error]);

  return (
    <div className="  py-6 md:flex  items-center w-full">
      {/* 🔹 Top 3 排名 */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 md:w-2/3  mb-8">
        {rankingList.slice(0, 3).map((item, index) => (
          <div
            key={item.user_id}
            className="flex flex-col items-center justify-center p-4"
          >
            <div className="relative">
              <img
                src={item.character_img_link}
                alt={item.nick_name}
                className=""
              />
              <span className="absolute -top-2 -right-2  text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {index + 1}
              </span>
            </div>
            <span className="mt-2 font-bold">{item.nick_name}</span>
            <span className="text-sm text-schema">
              成功試煉 {item.total_trial_count || 0}
            </span>
          </div>
        ))}
      </div>

      {/* 🔹 4 ~ 10 排名 */}
      <div className="    text-nowrap md:w-1/3">
        {rankingList.slice(3, 10).map((item, index) => (
          <div key={item.user_id} className="flex items-center gap-2 p-3 ">
            <span className="w-8 text-center font-bold text-lg ">
              {index + 4}
            </span>
            <Playlistcard
              id={item.user_id}
              imageUrl={item.character_img_link}
              name={item.nick_name}
              successCount={item.total_trial_count || 0}
              likeCount={item.liked_posts_count || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
