import { useEffect, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { monsterDefault } from "@/assets/monster/index.ts";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api";

type acceptProps = {
  className?: string;
};
const fakeData = {
  candy_count: 0,
  charactor_img_link: monsterDefault,
  cheat_blanket: 0,
  nick_name: "朋友1",
  system_preference_color_mode: "light",
  total_trial_count: 0,
  liked_posts_count: 0,
  friend_count: 0,
  user_id: "1",
  purchase_challenge: [],
  purchase_avatar: [],
};

export default function Invitition({ className }: acceptProps) {
  const [invititionList, setInvititionList] = useState<UserInfoSupa[]>([]);

  const { id } = useParams();
  const { data: trial, isLoading, error } = useTrialSupa(id as string);

  const friendList = useSelector((state: RootState) => state.friends.friends);
  useEffect(() => {
    if (isLoading) return;
    if (error) return;
    if (!trial) return;
    const playerSet = new Set(trial.map((item) => item.user_info.user_id));
    console.log(playerSet);
    const friendNotInPlayerSet = friendList.filter(
      (item) => !playerSet.has(item.user_id)
    );
    console.log(friendNotInPlayerSet);
    setInvititionList(friendNotInPlayerSet);
  }, [friendList, id, isLoading, error, trial]);

  return (
    <div
      className={`${className} backdrop-blur-xs bg-schema-surface-container-high/50 flex flex-col items-center justify-center`}
    >
      <div>
        <h2 className="text-h2">邀請列表</h2>
        <ul className="flex flex-col bg-schema-surface-container rounded-md py-8">
          {invititionList.map((item) => (
            <li
              key={item.user_id}
              className="flex items-center bg-schema-surface-container-high justify-between gap-4 px-4 py-2 border-b border-schema-outline"
            >
              <div
                style={{
                  backgroundImage: `url(${item.charactor_img_link})`,
                  backgroundSize: "160%",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "white",
                }}
                className="w-15 aspect-square rounded-full"
              ></div>

              <ul className="grid grid-cols-3 gap-2 w-full">
                <li className="text-h3 text-center    ">{item.nick_name}</li>
                <li className="text-h3">完成試煉：{item.total_trial_count}</li>
                <li className="text-h3">熱門貼文：{item.liked_posts_count}</li>
              </ul>
            </li>
          ))}
        </ul>
        <Button variant="trialDetail" className="w-full">
          邀請好友
        </Button>
      </div>
    </div>
  );
}
