import type { Participant } from "@/components/types/Participant";

export default function PlayerCard(props: { participantInfo: Participant }) {
  const {
    playerName = "unknown",
    playerImgUrl = "noImg",
    playerTotalTrials = 0,
    likedPosts = 0,
    friends = 0,
  } = props.participantInfo;

  return (
    <div className="w-full h-20 flex gap-2 items-end justify-center relative">
      <div className="absolute bottom-0 left-0 w-full h-2/3 parallelogram-border z-0  "></div>
      <div className="w-full h-full z-20 flex justify-between items-center max-w-100">
        <img
          className="object-cover h-full z-10 mb-2"
          src={playerImgUrl}
          alt="playerImg"
        />
          <h4 className ="self-end mb-4">{playerName}</h4>
          <ul className="flex gap-2 self-end ">
            <li className="flex flex-col items-center">
              <span className="text-muted/50 font-medium">成功試煉數</span>
              <span>{playerTotalTrials}</span>
            </li>
            <li className="flex flex-col items-center">
              <span className="text-muted/50 font-">朋友數</span>
              <span>{friends}</span>
            </li>
            <li className="flex flex-col items-center">
              <span className="text-muted/50 font-">貼文讚數</span>
              <span>{likedPosts}</span>
            </li>
          </ul>
        </div>
    </div>
  );
}
