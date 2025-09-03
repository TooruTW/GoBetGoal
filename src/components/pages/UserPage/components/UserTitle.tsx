import Aurora from "@/components/shared/reactBit/Aurora";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type acceptProps = {
  userInfo?: UserInfoSupa;
  isSelf: boolean;
};

export default function UserTitle({ userInfo, isSelf }: acceptProps) {
  const {
    nick_name,
    character_img_link,
    total_trial_count,
    liked_posts_count,
    friend_count,
  } = userInfo || {};
  const friendList = useSelector((state: RootState) => state.friends.friends);
  const { id } = useParams();
  const [isAddFriendAble, setIsAddFriendAble] = useState(true);

  useEffect(() => {
    if ( !id) return;
    if (friendList.length <= 0) return;
    const isAdded = friendList.some((friend) => {
      const isInclude = friend.user_id === id;
      return isInclude;
    });

    setIsAddFriendAble(!isAdded);
  }, [friendList, id]);

  return (
    <div className="flex flex-col sm:flex-row w-full md:px-6 relative h-[320px] sm:h-auto ">
      <div className="h-[200px] sm:w-1/2 overflow-hidden max-w-330 z-10 relative">
        {character_img_link ? (
          <img
            src={character_img_link}
            alt="avatar"
            className="w-3/5 mx-auto"
          />
        ) : (
          <div className="w-3/5 h-full mx-auto flex flex-col gap-4 items-center justify-center">
            <Skeleton className="w-1/3 aspect-square rounded-full" />
            <Skeleton className="w-2/3 h-10 rounded-t-full" />
          </div>
        )}
      </div>
      <div className="w-full sm:w-1/2 flex flex-col my-6 gap-4 z-10 px-3 md:px-10">
        <p className="font-bold text-2xl">
          {nick_name ? nick_name : "載入中..."}
        </p>
        <div className="flex justify-between">
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">成功試煉數</p>{" "}
            <p>{total_trial_count || 0}</p>
          </div>
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">朋友數</p>{" "}
            <p>{friend_count || 0}</p>
          </div>
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">貼文讚數</p>{" "}
            <p>{liked_posts_count || 0}</p>
          </div>
        </div>
        {isAddFriendAble && !isSelf ? (
          <Button className="w-1/2">加好友</Button>
        ) : (
          <></>
        )}
      </div>
      <div className="opacity-50 absolute z-0 top-0 left-0 w-screen h-full pointer-events-none">
        <Aurora
          colorStops={["#EBA7E4", "#FF94B4", "#EAC3EB"]}
          blend={1}
          amplitude={0.2}
          speed={1}
        />
      </div>
    </div>
  );
}
