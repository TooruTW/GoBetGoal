import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import ImageLoader from "./ImageLoader";
import type { Participant } from "@/components/types/Participant";
import { useNavigate } from "react-router-dom";
interface acceptProps {
  participant?: Participant;
  handleDelete?: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => void;
}

export default function PlayerCard(props: acceptProps) {
  const navigate = useNavigate();
  const { participant, handleDelete } = props;
  function handleAddFriend() {
    if (!isFriend) {
      console.log("add friend", participant?.id);
    }
  }

  function handleNavigateToProfile() {
    console.log("navigate to profile", participant?.id);
    navigate(`/profile/${participant?.id}`);
  }

  const {
    id = "",
    playerName = "unknown",
    playerImgUrl = "noImg",
    playerTotalTrials = 0,
    isFriend = false,
    likedPosts = 0,
    friends = 0,
  } = participant || {};

  const isCloseAbleRef = useRef(playerName !== "unknown");

  return (
    <div className="group flex flex-col items-center gap-4 max-w-1/6 w-full bg-card-bg rounded-md py-6 ">
      <IoClose
        id={id}
        onClick={(event) => handleDelete?.(event, id)}
        className={`self-end text-3xl mx-6 opacity-0 scale-0  group-hover:opacity-100 transition ${
          isCloseAbleRef.current && "group-hover:scale-100"
        }`}
      />
      <div className="h-65 w-full ">
        <ImageLoader imgUrl={playerImgUrl} />
      </div>
      <div className="self-start w-full px-6">
        <p className=" font-bold text-h4 ">{playerName}</p>
        <p className="flex justify-between">
          <span>成功試煉數</span> <span> {playerTotalTrials}</span>
        </p>
        <p className="flex justify-between">
          <span>朋友數</span> <span>{friends}</span>
        </p>
        <p className="flex justify-between">
          <span>貼文讚數</span> <span>{likedPosts}</span>
        </p>
      </div>

    {isCloseAbleRef.current?(  <button
        onClick={handleAddFriend}
        className={`rounded-md bg-bg-tags text-black py-2 w-8/10 ${
          isFriend && "opacity-50"
        }`}
      >
        {isFriend ? "已成為好友" : "加好友"}
      </button>):(
        <button
          className={`rounded-md bg-bg-tags text-black py-2 w-8/10 opacity-50`}
        >
          別加這個啦
        </button>
      )}

      {isCloseAbleRef.current ? (
        <button
          onClick={handleNavigateToProfile}
          className={`rounded-md bg-bg-tags text-black py-2 w-8/10`}
        >
          查看個人頁面
        </button>
      ) : (
        <button
          className={`rounded-md bg-bg-tags text-black py-2 w-8/10 opacity-50`}
        >
          沒什麼好看的
        </button>
      )}
    </div>
  );
}
