import { useEffect, useRef, useState } from "react";
import { UserInfoSupa } from "@/types/UserInfoSupa";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Link, useParams } from "react-router-dom";
import {
  usePostInviteFriend,
  useTrialSupa,
  useGetTrialParticipantsSupa,
} from "@/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useQueryClient } from "@tanstack/react-query";
import { setToast } from "@/store/slices/toastSlice";

type acceptProps = {
  className?: string;
  onClick: () => void;
};

type InvitationList = UserInfoSupa & {
  invite_status: "pending" | "accept" | "reject" | "none";
};

export default function Invitation({ className, onClick }: acceptProps) {
  const [InvitationList, setInvitationList] = useState<InvitationList[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<string[]>([]);

  const { id } = useParams();
  const { data: trial, isLoading, error } = useTrialSupa(id as string);

  const friendList = useSelector((state: RootState) => state.friends.friends);
  const userId = useSelector((state: RootState) => state.account.user_id);
  const dispatch = useDispatch();

  const { data: inviteStatus, isLoading: isInviteStatusLoading } =
    useGetTrialParticipantsSupa(id as string);

  useEffect(() => {
    if (isLoading || isInviteStatusLoading) return;
    if (error) return;
    if (!trial) return;
    const playerSet = new Set(trial.map((item) => item.user_info.user_id));
    const friendNotInPlayerSet = friendList.filter(
      (item) => !playerSet.has(item.user_id) && item.friend_state === "accept"
    );
    const listWithStatus: InvitationList[] = friendNotInPlayerSet.map(
      (friend) => {
        const status = inviteStatus?.find(
          (item) => item.participant_id === friend.user_id
        );
        if (status) {
          return {
            ...friend,
            invite_status: status.invite_status,
          };
        } else {
          return {
            ...friend,
            invite_status: "none",
          };
        }
      }
    );
    listWithStatus.sort((a, b) => {
      if (a.invite_status === "none") return -1;
      if (b.invite_status === "none") return 1;
      return 0;
    });

    setInvitationList(listWithStatus);
  }, [
    friendList,
    id,
    isLoading,
    error,
    trial,
    inviteStatus,
    isInviteStatusLoading,
  ]);

  const InvitationListRef = useRef<HTMLDivElement>(null);

  const handleInviteStatus = (id: string) => {
    const status = inviteStatus?.find((item) => item.participant_id === id);
    if (!status) return;
    switch (status?.invite_status) {
      case "pending":
        return "等待回覆";
      case "accept":
        return "已接受";
      case "reject":
        return "已拒絕";
    }
  };

  useGSAP(
    () => {
      if (InvitationList.length === 0) return;
      gsap.from(".avatar", {
        delay: 1,
        scale: 0,
        duration: 1,
        rotation: 360,
        ease: "power2.inOut",
        stagger: 0.1,
      });
    },
    { dependencies: [InvitationList], scope: InvitationListRef }
  );
  useGSAP(
    () => {
      if (friendList.length === 0) return;
      if (selectedInvitation.length < InvitationList.length) {
        gsap.to(".unselected", {
          duration: 0.1,
          filter: "brightness(0.9)",
          fontWeight: "normal",
          x: -32,
          borderBottom: "8px solid transparent",
        });
      }
      if (selectedInvitation.length > 0) {
        gsap.to(".selected", {
          duration: 0.1,
          filter: "brightness(1)",
          fontWeight: "extrabold",
          x: 0,
          borderBottom: "8px solid var(--color-schema-outline)",
        });
      }
    },
    { dependencies: [selectedInvitation], scope: InvitationListRef }
  );

  const handleSelect = (userId: string) => {
    if (inviteStatus?.find((item) => item.participant_id === userId)) return;
    if (selectedInvitation.includes(userId)) {
      setSelectedInvitation(selectedInvitation.filter((id) => id !== userId));
    } else {
      setSelectedInvitation([...selectedInvitation, userId]);
    }
  };

  const { mutate: inviteFriend } = usePostInviteFriend();
  const queryClient = useQueryClient();
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isInviting) return; // 防止重複點擊

    console.log(selectedInvitation);
    setIsInviting(true);

    let completedCount = 0;
    const totalInvites = selectedInvitation.length;

    if (totalInvites === 0) {
      setIsInviting(false);
      onClick();
      return;
    }

    selectedInvitation.forEach((friendId) => {
      inviteFriend(
        {
          trial_id: id as string,
          participant_id: friendId,
          invite_by: userId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trial", id] });
            completedCount++;

            // 當所有邀請都完成時，關閉視窗
            if (completedCount === totalInvites) {
              setIsInviting(false);
              onClick();
              setSelectedInvitation([]);
            }
          },
          onError: () => {
            completedCount++;
            // 即使有錯誤也要繼續處理其他邀請
            if (completedCount === totalInvites) {
              setIsInviting(false);
              onClick();
              setSelectedInvitation([]);
            }
          },
        }
      );
    });
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/trials/detail/${id}`
    );
    dispatch(
      setToast({
        content: "已複製邀請連結",
        type: "default",
        imgUrl: "",
        time: 3500,
      })
    );
    console.log("copy");
  };

  useClickOutside(InvitationListRef, () => {
    console.log("click outside");
    onClick();
  });

  return (
    <div
      className={`${className} backdrop-blur-xs bg-schema-surface-container-high/50 flex flex-col items-center justify-center`}
    >
      <div
        ref={InvitationListRef}
        className="flex flex-col gap-4 items-center  bg-schema-surface-container py-4 w-full max-w-150"
      >
        <h2 className="text-h2">邀請列表</h2>
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-h3">發送邀請連結</h3>
          <div className="flex items-center justify-center gap-4 max-lg:flex-col">
            <p className="text-p bg-schema-surface py-2 px-4 rounded-md text-schema-on-surface w-full max-w-80 overflow-hidden text-ellipsis whitespace-nowrap">{`${window.location.origin}/trials/detail/${id}`}</p>
            <Button variant="trialDetail" onClick={handleCopy}>
              複製
            </Button>
          </div>
          <Link to={`/user/${userId}/friends`}>  
          <p className="text-label hover:scale-105 transition-all duration-300 underline underline-offset-4 ">想邀的人不在名單裡嗎？ 去新增吧</p>
          </Link>
        </div>
        <ul className="flex flex-col rounded-md px-10 max-h-100 overflow-y-auto w-full py-4">
          {InvitationList.length > 0 ? (
            InvitationList.map((item) => (
              <li
                key={item.user_id}
                className={`flex items-center justify-between gap-4 px-4 pt-4 border-b-8 border-transparent -translate-x-8 active:scale-95 cursor-pointer brightness-90 ${
                  selectedInvitation.includes(item.user_id)
                    ? "selected"
                    : "unselected"
                }`}
                onClick={() => handleSelect(item.user_id)}
              >
                <div
                  style={{
                    backgroundImage: `url(${item.character_img_link})`,
                    backgroundSize: "160%",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="w-15 aspect-square avatar"
                ></div>

                <ul className="grid grid-cols-3 gap-2 w-full text-nowrap">
                  <li className="text-h4 max-sm:text-p text-center flex items-center justify-center">
                    <p>{item.nick_name}</p>
                  </li>
                  <li className="text-p max-sm:text-label flex flex-col items-center">
                    <p>完成試煉</p>
                    <p>{item.total_trial_count}</p>
                  </li>
                  <li className="text-p max-sm:text-label flex items-center justify-center">
                    {handleInviteStatus(item.user_id)}
                  </li>
                </ul>
              </li>
            ))
          ) : (
            <p className="text-h3">沒有好友可以邀請</p>
          )}
        </ul>
        <Button
          variant="trialDetail"
          className="w-4/5"
          onClick={handleInvite}
          disabled={isInviting}
        >
          {isInviting ? "邀請中..." : "邀請好友"}
        </Button>
      </div>
    </div>
  );
}
