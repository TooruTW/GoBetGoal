import { useGetUserInfoAllSupa } from "@/api";
import Playlistcard from "./Playlistcard";
import { useEffect, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";


export default function Ranking() {
const {data ,isLoading ,error} = useGetUserInfoAllSupa();
const [rankingList,setRankingList] = useState<UserInfoSupa[]>([]);

useEffect(()=>{
  if(data && !isLoading && !error){
    console.log(data,"data");
    const newList = data.sort((a,b)=>b.liked_posts_count - a.liked_posts_count);
    const top3 = newList.slice(0,3);
    setRankingList(top3);
  }
},[data,isLoading,error])


  return (
    <div className="rounded-lg bg-schema-surface-container py-6 flex flex-col items-center text-schema-on-surface overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="text-p font-semibold">社交達人榜</p>
        <p className="text-label text-schema-on-surface-variant">
          你就是唯一的神！
        </p>
      </div>
      <div className="w-full">
        {rankingList.map((item) => (
          <Playlistcard
            key={item.user_id}
            id={item.user_id}
            imageurl={item.charactor_img_link}
            name={item.nick_name}
            successCount={item.total_trial_count || 0}
            likeCount={item.liked_posts_count || 0}
          />
        ))}
      </div>
    </div>
  );
}
