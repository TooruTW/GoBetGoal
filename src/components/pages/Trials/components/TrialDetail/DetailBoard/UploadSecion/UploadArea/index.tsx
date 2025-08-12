import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import ChallengeBox from "./ChallengeBox";
import { useEffect, useState } from "react";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function UploadArea({trial}:acceptProps) {
  const [currentChallenge, setCurrentChallenge] = useState<TrialDetailSupa | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  useEffect(()=>{
    console.log(trial,"trial");
  },[trial])

  const handleSwitch = (isNext:boolean)=>{
    if(isNext){
      if(currentIndex === trial.length) return;
      setCurrentIndex(currentIndex + 1);
    }else{
      if(currentIndex === 1) return;
      setCurrentIndex(currentIndex - 1);
    }
  }

  useEffect(()=>{
    const challenge = trial.find((item) => item.stage_index === currentIndex)
    if(!challenge) return;
    setCurrentChallenge(challenge)
  },[currentIndex,trial])

  return (
    <div className="h-full w-full relative">
      <ChallengeBox currentChallenge={currentChallenge} />
      <GrFormNext className="size-10 hover:bg-schema-outline rounded-full -translate-y-1/2 absolute top-1/2 right-0" onClick={() => handleSwitch(true)} />
      <GrFormPrevious className="size-10 hover:bg-schema-outline rounded-full -translate-y-1/2 absolute top-1/2 left-0" onClick={() => handleSwitch(false)} />
    </div>
  );
}
