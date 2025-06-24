import { IoClose } from "react-icons/io5";
import ImageLoader from "./ImageLoader";

interface acceptProps {
  playerName: string;
  playerImgUrl: string;
  playerTotalTrials: number;
  isFriend?: boolean;
}

export default function PlayerCard(props: acceptProps) {
  const {
    playerName = "unknown",
    playerImgUrl = "",
    playerTotalTrials = 0,
    isFriend = false,
  } = props;

  return (
    <div className="flex flex-col items-center gap-4 max-w-1/6 bg-card-bg rounded-md py-6">
      <IoClose className=" self-end text-3xl mx-6" />
      <div className="h-96 w-full ">
        <ImageLoader imgUrl={playerImgUrl} />
      </div>
      <div className="self-start mx-6">
        <p className=" font-bold text-h4 ">{playerName}</p>
        <p className="">參加試煉數 {playerTotalTrials}</p>
      </div>
      {!isFriend && <button className={`rounded-md bg-bg-tags text-black py-2 px-2.5`}>
        加好友
      </button>}
    </div>
  );
}
