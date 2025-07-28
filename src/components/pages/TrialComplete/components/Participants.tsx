import PlayerCard from "./PlayerCard";

export interface ParticipantsProps {
  id: string;
  charactor_img_link: string;
  nick_name: string;
  completeRate: string;
  cheatCount: number;
}

export default function Participants({
  participants,
}: {
  participants: ParticipantsProps[];
}) {
  return (
    <div className="flex flex-col gap-4 items-center w-2/5 min-w-100 translate-x-4 max-xl:w-full max-xl:translate-x-0 max-xl:px-4">
      {participants.map((participant, index) => (
        <PlayerCard
          key={index}
          charactor_img_link={participant.charactor_img_link}
          nick_name={participant.nick_name}
          completeRate={participant.completeRate}
          cheatCount={participant.cheatCount}
        />
      ))}
    </div>
  );
}
