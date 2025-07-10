import type { Participant } from "@/components/types/Participant";

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
    <div className=" md:flex w-full px-6  ">
        <div className="h-[200px] md:w-1/2 overflow-hidden max-w-330">
            <img
                src="/avatar/girlPurpleCurly.webp"
                alt="avatar"
                className="w-full "
            />
        </div>
        
        <div className="md:w-1/2 flex-col my-6">
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
    </div>
  );
}