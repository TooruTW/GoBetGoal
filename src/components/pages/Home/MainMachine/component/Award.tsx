import { useGetUserInfoAllSupa } from "@/api";
import Playlistcard from "@/components/pages/SocialPages/components/PlayerlistCard";
import { useEffect, useState, useRef } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Ranking() {
  const { data, isLoading, error } = useGetUserInfoAllSupa();
  const [rankingList, setRankingList] = useState<UserInfoSupa[]>([]);
  const rankingListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data && !isLoading && !error) {
      const newList = data.sort(
        (a, b) => (b.total_trial_count || 0) - (a.total_trial_count || 0)
      );
      const top10 = newList.slice(0, 10);
      setRankingList(top10);
    }
  }, [data, isLoading, error]);

  useGSAP(()=>{
    if(!rankingListRef.current || !rankingList.length) return;
    
    gsap.fromTo(".ranking-card", {
      opacity: 0,
      yPercent: 100,
    },{
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger:{
        amount:0.5,
        from:"start",
      },
      ease: "power2.inOut",
    });
    gsap.fromTo(".sub-ranking-card", {
      opacity: 0,
      xPercent: 100,
    },{
      opacity: 1,
      xPercent: 0,
      duration: 1,
      stagger:{
        amount:0.5,
        from:"start",
      },
      ease: "power2.inOut",
    });
 
  },{scope:rankingListRef,dependencies:[rankingList]});

  return (
    <div ref={rankingListRef} className="  py-6 md:flex  items-center w-full justify-center">
      {/* 🔹 Top 3 排名 */}
      <div className="flex sm:flex-nowrap gap-2 md:gap-4 md:w-2/3  mb-8 justify-center">
        {rankingList.slice(0, 3).map((item, index) => (
          <div
            key={item.user_id}
            className="flex flex-col items-center justify-center w-1/3 text-nowrap ranking-card"
          >
            <div className="relative">
              <img
                src={item.character_img_link}
                alt={item.nick_name}
                className=""
              />
              <span className="absolute -top-2 -left-2  text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {index + 1}
              </span>
            </div>
            <span className="mt-2 font-bold">{item.nick_name}</span>
            <span className="text-sm text-schema-on-surface-variant">
              成功試煉 {item.total_trial_count || 0}
            </span>
            <span className="text-sm text-schema-on-surface-variant">
              貼文讚數 {item.liked_posts_count || 0}
            </span>
          </div>
        ))}
      </div>

      {/* 🔹 4 ~ 10 排名 */}
      <div className="    text-nowrap md:w-1/3 flex flex-wrap sub-ranking-card">
        {rankingList.slice(3, 10).map((item, index) => (
          <div
            key={item.user_id}
            className="flex items-center gap-2 p-3 min-w-1/2 sub-ranking-card"
          >
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
