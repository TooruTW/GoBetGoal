import gsap from "gsap";
import PlayerCard from "./PlayerCard";
import { useEffect, useRef } from "react";

const participantList = [
  {
    playerName: "阿強",
    playerTotalTrials: 12,
    isFriend: true,
    playerImgUrl: "/avatar/girlJacketBandage.webp",
  },
  {
    playerName: "小美",
    playerTotalTrials: 27,
    isFriend: false,
    playerImgUrl: "/avatar/girlSkirtBubble.webp",
  },
  {
    playerName: "獵魔士Geralt",
    playerTotalTrials: 42,
    isFriend: true,
    playerImgUrl: "/avatar/girlJacketYoga.webp",
  },
  {
    playerName: "貓貓教主",
    playerTotalTrials: 9,
    isFriend: false,
    playerImgUrl: "/avatar/girlPurpleHeadphone.webp",
  },
  {
    playerName: "雷姆",
    playerTotalTrials: 15,
    isFriend: false,
    playerImgUrl: "/avatar/girlBearJacket.webp",
  },
];

export default function Participant() {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardContainerRef.current) return;
    gsap.fromTo(
      cardContainerRef.current.children,
      {
        x: "100vw",
      },
      {
        x: 0,
        duration: 0.5,
        ease:"back",
        stagger: 0.1,
      }
    );
  }, [cardContainerRef]);

  return (
    <div ref={cardContainerRef} className="flex justify-between gap-4">
      {participantList.map((item, index) => {
        return (
          <PlayerCard
            key={`player-${index}`}
            playerName={item.playerName}
            playerTotalTrials={item.playerTotalTrials}
            isFriend={item.isFriend}
            playerImgUrl={item.playerImgUrl}
          />
        );
      })}
      {Array.from({ length: 6 - participantList.length }).map((_, index) => {
        return (
          <PlayerCard
            key={`unknown-${index}`}
            playerName="unknown"
            playerTotalTrials={0}
            isFriend={true}
            playerImgUrl={"noImg"}
          />
        );
      })}
    </div>
  );
}
