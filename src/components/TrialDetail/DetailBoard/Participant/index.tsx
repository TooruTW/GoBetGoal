import PlayerCard from "./PlayerCard";

export default function Participant() {
  return (
    <div>
      <PlayerCard
        playerName="John Cena"
        playerTotalTrials={100}
        isFriend={false}
        playerImgUrl="/avatar/girlPurpleCurly.webp"
      />
    </div>
  );
}
