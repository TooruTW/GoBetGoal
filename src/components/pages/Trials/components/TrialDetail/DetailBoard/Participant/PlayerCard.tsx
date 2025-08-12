import React, { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageLoader from "./ImageLoader";
import { useNavigate, useParams } from "react-router-dom";
import type { UserInfoSupa } from "@/types/UserInfoSupa";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePostFriendsRequest } from "@/api/postFriendsRequest";
import { useQueryClient } from "@tanstack/react-query";

type acceptProps = {
  participant?: UserInfoSupa;
  handleDelete?: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => void;
  onClickInvitition?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  owner?: string;
  isInTheTrial?: boolean;
};

export default function PlayerCard(props: acceptProps) {
  const navigate = useNavigate();
  const { participant, handleDelete, onClickInvitition, owner, isInTheTrial } =
    props;
  const [isFriend, setIsFriend] = useState(false);

  const userId = useSelector((state: RootState) => state.account.user_id);
  const [isRequestingFriend, setIsRequestingFriend] = useState(false);
  const { id } = useParams();

  const [isYourself, setIsYourself] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!participant) return;
    if (participant.user_id === userId) {
      setIsYourself(true);
    }
    if (participant?.user_id === owner) {
      setIsOwner(true);
    }
  }, [participant, userId, owner]);

  const friendList = useSelector((state: RootState) => state.friends.friends);

  useEffect(() => {
    if (!participant || friendList[0] === undefined) return;
    const isFriend = friendList.some(
      (user) => user.user_id === participant.user_id
    );
    setIsFriend(isFriend);
    const isRequestingFriend = friendList.some(
      (user) =>
        user.user_id === participant.user_id && user.friend_state === "pending"
    );
    setIsRequestingFriend(isRequestingFriend);
  }, [friendList, participant, isFriend]);

  const queryClient = useQueryClient();
  const { mutate: postAddFriend } = usePostFriendsRequest();

  function handleAddFriend(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!participant) return;
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

  function handleNavigateToProfile(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    navigate(`/user/${participant?.user_id}`);
  }

  const {
    user_id = "",
    nick_name = "unknown",
    charactor_img_link = "noImg",
    total_trial_count = 0,
    liked_posts_count = 0,
    friend_count = 0,
  } = participant || {};

  const isCloseAbleRef = useRef(nick_name !== "unknown");
  const inviteButtonRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP();
  const flashEffect = contextSafe(() => {
    if (!inviteButtonRef.current) return;
    const tl = gsap.timeline();
    tl.to(inviteButtonRef.current, {
      opacity: 0.4,
    }).to(inviteButtonRef.current, {
      opacity: 1,
    });
  });
  useEffect(() => {
    if (!inviteButtonRef.current) return;
    const timer = setInterval(() => {
      const chance = Math.random();
      if (chance > 0.2) return;
      flashEffect();
    }, 2000);
    return () => clearInterval(timer);
  }, [flashEffect]);

  const handleInvite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClickInvitition?.(e);
  };

  const handleChangeTrialInfo = () => {
    navigate(`/trials/detail/${id}/${user_id}`);
  };

  return (
    <div className="w-full">
      {isCloseAbleRef.current ? (
        <div
          className="group flex flex-col items-center justify-between gap-4 w-full bg-schema-surface-container/20 rounded-md py-6"
          onClick={handleChangeTrialInfo}
        >
          <IoClose
            id={user_id}
            onClick={(event) => handleDelete?.(event, user_id)}
            className={`self-end text-3xl mx-6 opacity-0 scale-0  group-hover:opacity-100 transition ${
              isCloseAbleRef.current &&
              !isYourself &&
              !isOwner &&
              "group-hover:scale-100"
            }`}
          />
          <div className="h-65 w-full ">
            <ImageLoader imgUrl={charactor_img_link} />
          </div>
          <div className="self-start flex flex-col justify-between gap-4 w-full px-6 min-h-44">
            <p className=" font-bold text-h4 ">{nick_name}</p>
            <div className="flex flex-col gap-4">
              <p className="flex justify-between">
                <span>成功試煉數</span> <span> {total_trial_count}</span>
              </p>
              <p className="flex justify-between">
                <span>朋友數</span> <span>{friend_count}</span>
              </p>
              <p className="flex justify-between">
                <span>貼文讚數</span> <span>{liked_posts_count}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              onClick={handleAddFriend}
              className={`rounded-md bg-schema-inverse-surface text-schema-inverse-on-surface py-2 w-8/10 ${
                isFriend || !userId
                  ? "opacity-50"
                  : isYourself
                  ? "opacity-0"
                  : "opacity-100"
              } `}
              disabled={isYourself || isFriend || !userId}
            >
              {!userId
                ? "請先登入"
                : isFriend
                ? isRequestingFriend
                  ? "已送出邀請"
                  : "已成為好友"
                : "加好友"}
            </button>
            <button
              onClick={handleNavigateToProfile}
              className={`rounded-md bg-schema-inverse-surface text-schema-inverse-on-surface py-2 w-8/10`}
            >
              查看個人頁面
            </button>
          </div>
        </div>
      ) : (
        <div className="group flex flex-col items-center justify-center w-full h-full bg-schema-surface-container/20 rounded-md py-6 relative">
          <div className="h-65 w-full ">
            <ImageLoader imgUrl={charactor_img_link} />
          </div>
          {isInTheTrial && (
            <Button
              ref={inviteButtonRef}
              variant="trialDetail"
              className="absolute bottom-6 w-8/10 font-normal active:scale-95 "
              style={{ fontSize: "var(--text-p)" }}
              onClick={handleInvite}
            >
              邀請好友
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
