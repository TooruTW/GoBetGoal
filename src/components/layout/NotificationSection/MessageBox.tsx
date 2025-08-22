import dayjs from "dayjs";
import { NotificationData } from ".";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useDeleteNotificationSupa } from "@/api";
import { monsterDefault } from "@/assets/monster";
import { useGetUserInfoSupa } from "@/api/getUserInfoSupa";
import {
  useTrialSupa,
  usePatchAcceptTrialInvite,
  usePatchFriendRequest,
} from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function MessageBox({
  notification,
  onRead,
}: {
  notification: NotificationData;
  onRead: (id: string) => void;
}) {
  const { id, content, created_at, type, is_read, from_id, action_id } =
    notification;
  const [buttonType, setButtonType] = useState<
    "accept" | "navigate" | "announcement"
  >("announcement");
  const [isRead, setIsRead] = useState(is_read);
  const isMarked = useRef(false);
  // const { mutate: deleteNotification } = useDeleteNotificationSupa();
  const listRef = useRef<HTMLLIElement>(null);
  const dayDiff = dayjs(created_at).diff(dayjs(), "day");
  const [avatar, setAvatar] = useState<string>(monsterDefault);
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data: playerInfo } = useGetUserInfoSupa(from_id ?? "");
  const { data: trialInfo } = useTrialSupa(from_id ?? "");
  const { mutate: joinTrial } = usePatchAcceptTrialInvite();
  const { mutate: acceptFriend } = usePatchFriendRequest();

  const animationActive = useRef(false);

  useEffect(() => {
    const avatarLink =
      playerInfo?.[0]?.character_img_link ||
      trialInfo?.[0]?.trial.challenge?.img ||
      monsterDefault;
    setAvatar(avatarLink);
  }, [playerInfo, trialInfo]);

  useEffect(() => {
    switch (type) {
      case "friend_request":
        setButtonType("accept");
        break;
      case "trial_invite":
        setButtonType("accept");
        break;
      case "trial_count_down":
        setButtonType("navigate");
        break;
      case "trial_close":
        setButtonType("navigate");
        break;
      case "trial_invite_accept":
        setButtonType("navigate");
        break;
      case "friend_request_accept":
        setButtonType("navigate");
        break;
      case "trial_start":
        setButtonType("navigate");
        break;
      case "post_liked":
        setButtonType("navigate");
        break;
      default:
        break;
    }
  }, [type]);

  const { contextSafe } = useGSAP({ scope: listRef });

  const leaveAnimation = contextSafe(() => {
    gsap.to(listRef.current, {
      xPercent: 100,
      scale: 0,
      height: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        console.log("delete");
        // deleteNotification(id);
      },
    });
  });

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!action_id || !from_id) return;
    console.log("accept", action_id);

    switch (type) {
      case "friend_request":
        console.log("friend_request", action_id);
        acceptFriend({
          request_id: action_id,
          address_id: userID,
          isAccept: true,
        });
        break;
      case "trial_invite":
        console.log("trial_invite", action_id);
        joinTrial({ trial_id: action_id, participant_id: userID });
        break;

      default:
        break;
    }
    leaveAnimation();
  };

  const handleRead = () => {
    setIsRead(true);
    if (!is_read && !isMarked.current) {
      isMarked.current = true;
      onRead(id);
    }
  };

  const handleNavigate = () => {
    let url = "";
    switch (type) {
      case "trial_count_down":
        url = `/trials/detail/${action_id}/0`;
        break;
      case "trial_close":
        url = `/trials/detail/${action_id}/0`;
        break;
      case "trial_invite_accept":
        url = `/trials/detail/${action_id}/0`;
        break;
      case "friend_request_accept":
        url = `/user/${action_id}`;
        break;
      case "trial_start":
        url = `/trials/detail/${action_id}/0`;
        break;
      case "post_liked":
        url = `/social-pages/post/${action_id}`;
        break;

      default:
        break;
    }
    console.log("navigate to", url);
    window.open(url, "_blank");
  };

  const handleNavigateHover = contextSafe(() => {
    if (animationActive.current) return;
    animationActive.current = true;
    const tl = gsap.timeline();
    tl.to(".right-arrow", {
      x: 100,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: {
        amount: 0.25,
        from: "end",
      },
    })
      .set(
        ".right-arrow",
        {
          x: -100,
        },
        1
      )
      .to(".right-arrow", {
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: {
          amount: 0.25,
          from: "end",
        },
      })
      .then(() => {
        animationActive.current = false;
      });
  });

  return (
    <li
      ref={listRef}
      key={id}
      className={`flex justify-between gap-4 items-center flex-col px-2 py-1 max-md:gap-2 max-md:text-label ${
        isRead ? "" : "bg-schema-surface-container-highest"
      }`}
      onClick={handleRead}
    >
      <div className={`grid grid-cols-[1fr_4fr_1fr] gap-1 w-full`}>
        <div className="size-12 overflow-hidden rounded-full bg-schema-surface-container-low">
          <img
            src={avatar}
            alt="avatar"
            className="w-full object-cover scale-150 translate-y-2"
          />
        </div>
        <div
          className={`w-full flex flex-col gap-1 ${
            buttonType === "announcement" && "col-span-2"
          }`}
        >
          <p className="text-p text-schema-on-surface-variant"> {content}</p>
          <span className="text-label-small text-schema-on-surface-variant pl-2">
            {dayDiff > 0 ? dayDiff + "天前" : "今天"}
          </span>
        </div>
        {buttonType === "accept" ? (
          <div className="flex items-center justify-center gap-2 option">
            <Button variant="notification" onClick={handleAccept}>
              接受
            </Button>
          </div>
        ) : (
          buttonType === "navigate" && (
            <div
              className="flex items-center option justify-center overflow-hidden"
              onMouseEnter={handleNavigateHover}
              onClick={handleNavigate}
            >
              <MdKeyboardArrowRight className="right-arrow text-schema-on-surface-variant size-6 -mx-2" />
              <MdKeyboardArrowRight className="right-arrow text-schema-on-surface-variant size-6 -mx-2" />
              <MdKeyboardArrowRight className="right-arrow text-schema-on-surface-variant size-6 -mx-2" />
            </div>
          )
        )}
      </div>
    </li>
  );
}
