import PlayerCard from "./PlayerCard";

export default function Participants() {
  return (
    <div className="flex flex-col gap-4 items-center w-1/3 min-w-100 translate-x-4">
      <PlayerCard />  
      <PlayerCard />  
      <PlayerCard />  

    </div>
  );
}