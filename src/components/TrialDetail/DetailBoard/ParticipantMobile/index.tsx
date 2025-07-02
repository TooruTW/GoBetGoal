import PlayerCard from "./PlayerCard";
import ReactFlipCard from "reactjs-flip-card";
import BackSideCard from "./BackSideCard";
import gsap from "gsap";
import { useEffect, useState } from "react";
import type { Trial } from "@/features/trials/type";
interface acceptProps {
  trial: Trial;
}

export default function ParticipantMobile(props: acceptProps) {
  const { trial } = props;
  const participantList = trial.currentParticipants;

  const [flipStates, setFlipStates] = useState(
    new Array(participantList.length).fill(false)
  );

useEffect(()=>{
    const obj = {val:0}

    gsap.to(obj,{
        val:participantList.length -1,
        duration: participantList.length * 0.25,
        ease:"none",
        delay:1.5,
        onUpdate:()=>{            
            setFlipStates(prev=>{
                const newStates = [...prev];
                newStates[Math.floor(obj.val)] = true;
                return newStates;
            })
        }
    })
},[participantList.length])

  return (
    // container
    <div className="flex flex-col gap-4 px-8 w-full">
      {participantList.map((item, index) => (
        <ReactFlipCard
          containerCss="flip-card"
          key={index}
          flipTrigger="disabled"
          flipByProp={flipStates[index]}
          containerStyle={{ width: "100%", height: "auto" }}
          direction="vertical"
          backComponent={<PlayerCard participantInfo={item} />}
          frontComponent={<BackSideCard />}
        />
      ))}
    </div>
  );
}
