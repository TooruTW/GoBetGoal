import { useGetUserInfoAllSupa } from "@/api";
import Playlistcard from "./PlayerlistCard";
import { useEffect, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { Link } from "react-router-dom";

export default function Ranking() {
  const { data, isLoading, error } = useGetUserInfoAllSupa();
  const [rankingList, setRankingList] = useState<UserInfoSupa[]>([]);

  useEffect(() => {
    if (data && !isLoading && !error) {
      const newList = data.sort(
        (a, b) => b.liked_posts_count - a.liked_posts_count
      );
      const top5 = newList.slice(0, 5);
      setRankingList(top5);
    }
  }, [data, isLoading, error]);

  return (
    <div className="rounded-lg lg:bg-schema-surface-container max-lg:w-full max-lg:gap-4 lg:py-6 h-auto  flex lg:flex-col items-center text-schema-on-surface ">
      <div className="flex flex-col items-center">
        <p className="text-p font-semibold text-nowrap">社交達人榜</p>
        <p className="text-label text-schema-on-surface-variant max-lg:hidden">
          你就是唯一的神！
        </p>
      </div>
      <div className="w-full max-lg:hidden">
        {rankingList.map((item) => (
          <Playlistcard
            key={item.user_id}
            id={item.user_id}
            imageUrl={item.character_img_link}
            name={item.nick_name}
            successCount={item.total_trial_count || 0}
            likeCount={item.liked_posts_count || 0}
          />
        ))}
      </div>
      <div className="w-full lg:hidden flex justify-start">
        {rankingList.map((item) => (
          <Link to={`/user/${item.user_id}`}>
            <div className="items-center gap-3 p-2  text-sm">
              <img
                src={item.character_img_link}
                alt="avatar"
                className="rounded-full w-10 h-10 object-cover object-top bg-schema-surface-container-high"
              />
              <p>{item.nick_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
