import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import ImageLoader from "./ImageLoader";
import { useNavigate } from "react-router-dom";
import type { UserInfoSupa } from "@/components/types/UserInfoSupa";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

interface acceptProps {
  participant?: UserInfoSupa;
  handleDelete?: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => void;
}

export default function PlayerCard(props: acceptProps) {
  const navigate = useNavigate();
  const { participant, handleDelete } = props;
  const isFriendRef = useRef(false);

  const friendList = useSelector((state: RootState) => state.friends);

  useEffect(()=>{
    isFriendRef.current = friendList.friends.some(friend => friend === participant?.user_id)
  },[friendList,participant])

  function handleAddFriend() {
    if (!isFriendRef.current) {
      console.log("add friend", participant?.user_id);
    }
  }

  function handleNavigateToProfile() {
    console.log("navigate to profile", participant?.user_id);
    navigate(`/profile/${participant?.user_id}`);
  }

  const {
    user_id = "",
    nick_name = "unknown",
    charactor_img_link = "noImg",
    total_trial_count = 0,
    liked_post_count = 0,
    friend_count = 0,
  } = participant || {};

 

  const isCloseAbleRef = useRef(nick_name !== "unknown");

  return (
    <div className="group flex flex-col items-center gap-4 max-w-1/6 w-full bg-card-bg rounded-md py-6 ">
      <IoClose
        id={user_id}
        onClick={(event) => handleDelete?.(event, user_id)}
        className={`self-end text-3xl mx-6 opacity-0 scale-0  group-hover:opacity-100 transition ${
          isCloseAbleRef.current && "group-hover:scale-100"
        }`}
      />
      <div className="h-65 w-full ">
        <ImageLoader imgUrl={charactor_img_link} />
      </div>
      <div className="self-start w-full px-6">
        <p className=" font-bold text-h4 ">{nick_name}</p>
        <p className="flex justify-between">
          <span>成功試煉數</span> <span> {total_trial_count}</span>
        </p>
        <p className="flex justify-between">
          <span>朋友數</span> <span>{friend_count}</span>
        </p>
        <p className="flex justify-between">
          <span>貼文讚數</span> <span>{liked_post_count}</span>
        </p>
      </div>

    {isCloseAbleRef.current?(  <button
        onClick={handleAddFriend}
        className={`rounded-md bg-bg-tags text-black py-2 w-8/10 ${
          isFriendRef.current && "opacity-50"
        }`}
      >
        {isFriendRef.current ? "已成為好友" : "加好友"}
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
