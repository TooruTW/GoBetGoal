import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import ImageLoader from "./ImageLoader";
import type { Participant } from "@/components/types/Participant";

interface acceptProps {
  participant?: Participant;
  handleDelete?: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => void;
  handleAddFriend?: () => void;
}

export default function PlayerCard(props: acceptProps) {
  const { participant, handleDelete, handleAddFriend } = props;

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
          <span>參加試煉數</span> <span> {playerTotalTrials}</span>
        </p>
        <p className="flex justify-between">
          <span>朋友數</span> <span>{friends}</span>
        </p>
        <p className="flex justify-between">
          <span>貼文讚數</span> <span>{likedPosts}</span>
        </p>
      </div>

      <button
        onClick={handleAddFriend}
        className={`rounded-md bg-bg-tags text-black py-2 w-8/10 ${
          isFriend && "opacity-0 scale-0"
        }`}
      >
        加好友
      </button>

      {isCloseAbleRef.current && (
        <button
          onClick={handleAddFriend}
          className={`rounded-md bg-bg-tags text-black py-2 w-8/10`}
        >
          查看個人頁面
        </button>
      )}
    </div>
  );
}
