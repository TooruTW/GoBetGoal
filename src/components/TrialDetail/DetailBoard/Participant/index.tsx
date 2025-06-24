import gsap from "gsap";
import PlayerCard from "./PlayerCard";
import { useEffect, useRef, useState } from "react";
import type { Participant } from "@/components/types/Participant";




export default function Participant(props:{participant:Participant[]}) {
    const {participant} = props
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [list,setList] = useState(participant)

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

const handleDelete:(event:string)=>void = (event)=>{
    setList((prev)=>{
        return(
            prev.filter((item)=>(item.id !== event))
        )
    })
}
  return (
    <div ref={cardContainerRef} className="flex justify-between gap-4">
      {list.map((item) => {
        return (
          <PlayerCard
            key={item.id}
            id={item.id}
            playerName={item.playerName}
            playerTotalTrials={item.playerTotalTrials}
            isFriend={item.isFriend}
            playerImgUrl={item.playerImgUrl}
            handleDelete={handleDelete}
          />
        );
      })}
      {Array.from({ length: 6 - list.length }).map((_, index) => {
        return (
          <PlayerCard
            key={`unknown-${index}`}
            id={`unknown-${index}`}
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
