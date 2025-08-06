import { useEffect, useRef, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";

type acceptProps = {
  className?: string;
  onClick: () => void;
};

export default function Invitition({ className,onClick }: acceptProps) {
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
    const friendNotInPlayerSet = friendList.filter(
      (item) => !playerSet.has(item.user_id)
    );
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
          x: -32,
          borderBottom: "8px solid transparent",
        });
      }
      if (selectedInvitition.length > 0) {
        gsap.to(".selected", {
          duration: 0.1,
          filter: "brightness(1)",
          fontWeight: "extrabold",
          x: 0,
          borderBottom: "8px solid var(--color-schema-outline)",
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

  const handleInvite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(selectedInvitition);
    onClick();
  };

  useClickOutside(invititionListRef,()=>{
    console.log("click outside");
    onClick();
  });


  return (
    <div
      className={`${className} backdrop-blur-xs bg-schema-surface-container-high/50 flex flex-col items-center justify-center`}
    >
      <div ref={invititionListRef} className="flex flex-col gap-4 w-full max-w-150 items-center  bg-schema-surface-container py-4">
        <h2 className="text-h2">邀請列表</h2>
        <ul className="flex flex-col rounded-md px-10 max-h-100 overflow-y-auto w-full py-4">
          {invititionList.length > 0 ? invititionList.map((item) => (
            <li
              key={item.user_id}
              className={`flex items-center justify-between gap-4 px-4 pt-4 border-b-8 border-transparent -translate-x-8 active:scale-95 cursor-pointer brightness-90 ${
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
          )): <p className="text-h3">沒有好友可以邀請</p>}
        </ul>
        <Button variant="trialDetail" className="w-4/5" onClick={handleInvite}>
          邀請好友
        </Button>
      </div>
    </div>
  );
}
