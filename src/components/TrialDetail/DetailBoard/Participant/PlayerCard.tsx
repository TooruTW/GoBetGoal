import { IoClose } from "react-icons/io5";
import ImageLoader from "./ImageLoader";
import type { Participant } from "@/components/types/Participant";

interface acceptProps extends Participant {
  handleDelete?: (id: string) => void;
  handleAddFriend?: () => void;
}

export default function PlayerCard(props: acceptProps) {
  const {
    id,
    playerName = "unknown",
    playerImgUrl = "",
    playerTotalTrials = 0,
    isFriend = false,
    handleDelete,
    handleAddFriend,
  } = props;

  return (
    <div className="group flex flex-col items-center gap-4 max-w-1/6 w-full bg-card-bg rounded-md py-6 ">
      <IoClose
        id={id}
        onClick={() => {
          handleDelete?.(id);
        }}
        className="self-end text-3xl mx-6 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition"
      />
      <div className="h-65 w-full ">
        <ImageLoader imgUrl={playerImgUrl} />
      </div>
      <div className="self-start mx-6">
        <p className=" font-bold text-h4 ">{playerName}</p>
        <p className="">參加試煉數 {playerTotalTrials}</p>
      </div>
      {!isFriend && (
        <button
          onClick={handleAddFriend}
          className={`rounded-md bg-bg-tags text-black py-2 w-8/10`}
        >
          加好友
        </button>
      )}
      <button
        onClick={handleAddFriend}
        className={`rounded-md bg-bg-tags text-black py-2 w-8/10`}
      >
        查看個人頁面
      </button>
    </div>
  );
}
