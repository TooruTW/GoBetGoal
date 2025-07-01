import type { Participant } from "@/components/types/Participant";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

export default function PlayerCard(props: { participantInfo: Participant }) {
  const {
    playerName = "unknown",
    playerImgUrl = "noImg",
    playerTotalTrials = 0,
    likedPosts = 0,
    friends = 0,
  } = props.participantInfo;

  const [position, setPosition] = useState<number>(0);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.deltaX > 0) {
        if (eventData.deltaX > 50 && eventData.deltaX < 100) {
          setPosition(100);
        }
      } else {
        if (eventData.deltaX < -50 && eventData.deltaX > -100) {
          setPosition(-100);
        }
      }
    },
    onSwiping: (eventData) => {
      if (eventData.deltaX > 0) {
        if (position > 100) return;
        setPosition(eventData.deltaX);
      } else {
        if (position < -100) return;
        setPosition(eventData.deltaX);
      }
    },
    onTap: () => {
      if (position !== 0) setPosition(0);
    },
  });

  useEffect(() => {
    if (position > -50 && position < 50) {
      setPosition(0);
    }
  }, [position]);

  return (
    <div
      {...handlers}
      className="w-full h-20 flex gap-2 items-end justify-center relative"
      style={{ transform: `translateX(${position}px)` }}
    >
      <div className="absolute bottom-0 left-0 w-full h-2/3 scale-x-[1.1] parallelogram-border z-0"></div>
      <div className="w-full h-full z-20 flex justify-between items-center max-w-100">
        <img
          className="object-cover h-full z-10 mb-2"
          src={playerImgUrl}
          alt="playerImg"
        />
        <h4 className="self-end mb-4">{playerName}</h4>
        <ul className="flex gap-2 self-end ">
          <li className="flex flex-col items-center">
            <span className="text-muted/50 font-medium">成功試煉</span>
            <span>{playerTotalTrials}</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-muted/50 font-">朋友</span>
            <span>{friends}</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-muted/50 font-">貼文讚</span>
            <span>{likedPosts}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
