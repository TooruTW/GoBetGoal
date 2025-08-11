import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import ChallengeBox from "./ChallengeBox";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadArea() {
  const [currentChallenge, setCurrentChallenge] = useState(1);

  const handleSwitch = (isNext:boolean)=>{
    if(isNext){
      setCurrentChallenge(currentChallenge + 1);
    }else{
      if(currentChallenge === 1) return;
      setCurrentChallenge(currentChallenge - 1);
    }
  }

  return (
    <div className="h-full w-full relative">
      <ChallengeBox index={currentChallenge} />
      <GrFormNext className="size-10 hover:bg-schema-outline rounded-full -translate-y-1/2 absolute top-1/2 right-0" onClick={() => handleSwitch(true)} />
      <GrFormPrevious className="size-10 hover:bg-schema-outline rounded-full -translate-y-1/2 absolute top-1/2 left-0" onClick={() => handleSwitch(false)} />
    </div>
  );
}
