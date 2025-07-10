import type { Participant } from "@/components/types/Participant";

import Aurora from './Aurora';
  


interface PlayerInfoProps {
  participant?: Participant;
}

export default function PlayerInfo({ participant }: PlayerInfoProps) {
  const {
    playerName = "unknown",
    playerTotalTrials = 0,
    friends = 0,
    likedPosts = 0,
  } = participant || {};

  return (
    <div className=" md:flex w-full px-6 relative h-[320px] md:h-auto">
        <div className="h-[200px] md:w-1/2 overflow-hidden max-w-330 z-50 ">
            <img
                src="/avatar/girlPurpleCurly.webp"
                alt="avatar"
                className="w-3/4 "
            />
            
            
        </div>

        
        <div className="md:w-1/2 flex-col my-6 z-50">
            <p className="font-bold text-h4">{playerName}</p>
            <div className="flex justify-between">
                <div className="flex-col justify-center text-center">
                <p className="font-sm opacity-50">成功試煉數</p> <p>{playerTotalTrials}</p>
                </div>
                <div className="flex-col justify-center text-center">
                    <p className="font-sm opacity-50">朋友數</p> <p>{friends}</p>
                </div>
                <div className="flex-col justify-center text-center">
                    <p className="font-sm opacity-50">貼文讚數</p> <p>{likedPosts}</p>
                </div>
            </div>
            
        </div>
        <div className="opacity-30 absolute z-0 top-0 left-0 w-full h-full pointer-events-none">
              <Aurora
              colorStops={["#EBA7E4", "#FF94B4", "#FF3232"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
            </div>
    </div>
  );
}