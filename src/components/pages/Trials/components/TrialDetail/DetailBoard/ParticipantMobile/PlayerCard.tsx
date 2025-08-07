import type { UserInfoSupa } from "@/types/UserInfoSupa";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { usePostFriendsRequest } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDeleteParticipantInTrialSupa } from "@/api/deleteParticipantInTrialSupa";


type acceptProps = {
  participant?: UserInfoSupa;
  owner?: string;
};

export default function PlayerCard({participant, owner}: acceptProps) {
  const navigate = useNavigate();
  const [position, setPosition] = useState<number>(0);
  const userId = useSelector((state: RootState) => state.account.user_id);
  const friendList = useSelector((state: RootState) => state.friends.friends);

  const {id: trialId} = useParams();
    
  const [isYourself, setIsYourself] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [friendState, setFriendState] = useState<string>("");
  const [isFriend, setIsFriend] = useState(false);

  useEffect(()=>{
    if(!friendList[0]) return;
    console.log(friendList,"friendList");
    const state = friendList.find(item => item.user_id === participant?.user_id)?.friend_state;
        setFriendState(state||"");
        if(state) setIsFriend(true);
  },[friendList,participant])

  useEffect(() => {
    if (!participant) return;
    if (participant.user_id === userId) {
      setIsYourself(true);
    }
    if (participant?.user_id === owner) {
      setIsOwner(true);
    }
  }, [participant, userId, owner]);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.deltaX > 0) {
        if (eventData.deltaX > 50) {
          if(isYourself) return;
          setPosition(200);
        }
      } else {
        if (eventData.deltaX < -50) {
          setPosition(-200);
        }
      }
    },
  });

  const handleTap = () => {
    if (position !== 0) setPosition(0);
  };
  
  const queryClient = useQueryClient();
  const { mutate: postAddFriend } = usePostFriendsRequest();

  function handleAddFriend() {
    if (!participant || isFriend) return;
    postAddFriend(
      {
        request_id: userId,
        address_id: participant.user_id,
        note: "",
      },
      {
        onSuccess: () => {
          console.log("add friend success");
          queryClient.invalidateQueries({ queryKey: ["friends"] });
        },
      }
    );
  }

  const handleViewProfile = () => {
    navigate(`/user/${participant?.user_id}`);
  };

  const { mutate: deleteParticipantInTrial } =
  useDeleteParticipantInTrialSupa();

  const handleExile = () => {
    if(!trialId || isOwner || !participant) return;
    deleteParticipantInTrial(
      {
        trialId: trialId,
        userId: participant.user_id,
      },
      {
        onSuccess: () => {
          console.log("delete success");
          queryClient.invalidateQueries({
            queryKey: ["trial", trialId],
          });
        },
        onError: (error) => {
          console.error("delete failed:", error);
          // 可以添加錯誤提示給使用者
        },
      }
    );
  };

  useEffect(() => {
    if (position > -50 && position < 50) {
      setPosition(0);
    }
  }, [position]);

  return (
    <div
      {...handlers}
      style={{
        transform: `translateX(${position}px) `,
        transition: "transform 0.3s ease-in-out",
      }}
      className="relative"
    >
      <div className="border-2 border-schema-primary absolute top-1/6 left-0 w-full h-2/3 -skew-x-24"></div>
      <div className="relative">
        <div
          className={`absolute z-0 top-1/2 -translate-y-1/2 -left-50 w-50 h-2/3 -skew-x-24 ${isFriend ? "bg-schema-on-background/50" : "bg-schema-on-background"} text-schema-on-primary flex justify-center items-center transition-transform duration-300 origin-right ${
            position > 0 ? "scale-100" : "scale-0"
          }`}
          onClick={handleAddFriend}
        >
          <p className="skew-x-24">{isFriend ? (friendState === "pending" ? "等待確認好友" : "已加好友") : "加好友"}</p>
        </div>
        <div
          className={`absolute z-0 top-1/2 -translate-y-1/2 -right-50 w-50 h-2/3 -skew-x-24 bg-red-500 text-schema-on-primary flex justify-center items-center transition-transform duration-300 origin-left ${
            position < 0 ? "scale-100" : "scale-0"
          }`}
          onClick={handleExile}
        >
          <p className="skew-x-24">{isOwner ? "敢踢房主？" : (isYourself ? "離開試煉" : "踢除玩家")}</p>
        </div>
        <div
          className="grid grid-cols-6 px-6 relative z-10 bg-inherit h-full"
          onClick={handleTap}
        >
          <img
            src={participant?.charactor_img_link}
            alt="playerImg"
            className="col-span-1 w-full -translate-y-5 h-full object-cover"
            onClick={handleViewProfile}
          />
          <h4 className="col-span-2 text-h3 max-md:text-p flex items-center justify-center">
            {participant?.nick_name}
          </h4>
          <ul className="col-span-3 text-h4 max-md:text-label flex items-center w-full justify-between">
            <li className="flex flex-col items-center">
              <span>成功試煉</span>
              <span>{participant?.total_trial_count}</span>
            </li>
            <li className="flex flex-col items-center">
              <span>朋友</span>
              <span>{participant?.friend_count}</span>
            </li>
            <li className="flex flex-col items-center">
              <span>貼文讚數</span>
              <span>{participant?.liked_posts_count}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
