import PlayerCard from "./PlayerCard";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export type ParticipantsProps = {
  id: string;
  character_img_link: string;
  nick_name: string;
  completeRate: string;
  cheatCount: number;
};

export default function Participants({
  participants,
  onClick,
}: {
  participants: ParticipantsProps[];
  onClick: (id: string) => void;
}) {
  const participantsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".player-card",
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power2.inOut",
      }
    );
  });

  return (
    <div
      className="flex flex-col gap-4 items-center w-2/5 min-w-100 translate-x-4 max-xl:w-full max-xl:translate-x-0 max-xl:px-4 relative"
      ref={participantsRef}
    >
      {participants.map((participant, index) => (
        <PlayerCard
          key={index}
          character_img_link={participant.character_img_link}
          nick_name={participant.nick_name}
          completeRate={participant.completeRate}
          cheatCount={participant.cheatCount}
          onClick={() => onClick(participant.id)}
          rank={index + 1}
          className="player-card"
        />
      ))}
    </div>
  );
}
