import { useEffect, useRef, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type acceptProps = {
  className?: string;
};

export default function Invitition({ className }: acceptProps) {
  const [invititionList, setInvititionList] = useState<UserInfoSupa[]>([]);
  const [selectedInvitition, setSelectedInvitition] = useState<string[]>([]);

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

  const invititionListRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (invititionList.length === 0) return;
      gsap.from(".avatar", {
        delay: 1,
        scale: 0,
        duration: 1,
        rotation: 360,
        ease: "power2.inOut",
        stagger: 0.1,
      });
    },
    { dependencies: [invititionList], scope: invititionListRef }
  );
  useGSAP(
    () => {
      if (friendList.length === 0) return;
      if (selectedInvitition.length < invititionList.length) {
        gsap.to(".unselected", {
          duration: 0.1,
          filter: "brightness(0.9)",
          fontWeight: "normal",
          x: 0,
          borderBottom: "none",
        });
      }
      if (selectedInvitition.length > 0) {
        gsap.to(".selected", {
          duration: 0.1,
          filter: "brightness(1)",
          fontWeight: "extrabold",
          x: 25,
          borderBottom: "5px solid var(--color-schema-outline)",
        });
      }
    },
    { dependencies: [selectedInvitition], scope: invititionListRef }
  );

  const handleSelect = (userId: string) => {
    if (selectedInvitition.includes(userId)) {
      setSelectedInvitition(selectedInvitition.filter((id) => id !== userId));
    } else {
      setSelectedInvitition([...selectedInvitition, userId]);
    }
  };

  return (
    <div
      className={`${className} backdrop-blur-xs bg-schema-surface-container-high/50 flex flex-col items-center justify-center`}
    >
      <div ref={invititionListRef}>
        <h2 className="text-h2">邀請列表</h2>
        <ul className="flex flex-col bg-schema-surface-container rounded-md py-8 pr-10">
          {invititionList.map((item) => (
            <li
              key={item.user_id}
              className={`flex items-center justify-between gap-4 px-4 pt-4 active:scale-95 cursor-pointer brightness-90 ${
                selectedInvitition.includes(item.user_id)
                  ? "selected"
                  : "unselected"
              }`}
              onClick={() => handleSelect(item.user_id)}
            >
              <div
                style={{
                  backgroundImage: `url(${item.charactor_img_link})`,
                  backgroundSize: "160%",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-15 aspect-square avatar"
              ></div>

              <ul className="grid grid-cols-3 gap-2 w-full">
                <li className="text-h3 text-center">{item.nick_name}</li>
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
