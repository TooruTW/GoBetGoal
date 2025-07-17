import type { UserInfoSupa } from "@/types/UserInfoSupa";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

export default function PlayerCard(props: { participantInfo: UserInfoSupa }) {
  const {
    nick_name = "unknown",
    charactor_img_link = "noImg",
    total_trial_count = 0,
    liked_post_count = 0,
    friend_count = 0,
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
      style={{ transform: `translateX(${position}px)` }}
      className="relative"
    >
      <div className="border-2 border-schema-primary absolute top-1/6 left-0 w-full h-2/3 -skew-x-24"></div>
      <div className="grid grid-cols-6 px-4">
        <img
          src={charactor_img_link}
          alt="playerImg"
          className="col-span-1 -translate-y-5 h-full object-cover"
        />
        <h4 className="col-span-2 text-h3 max-md:text-p flex items-center justify-center">
          {nick_name}
        </h4>
        <ul className="col-span-3 text-h4 max-md:text-label flex items-center w-full justify-between">
          <li className="flex flex-col items-center">
            <span>成功試煉</span>
            <span>{total_trial_count}</span>
          </li>
          <li className="flex flex-col items-center">
            <span>朋友</span>
            <span>{friend_count}</span>
          </li>
          <li className="flex flex-col items-center">
            <span>貼文讚數</span>
            <span>{liked_post_count}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
