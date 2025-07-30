import Participants from "./Participants";
import UploadImgs from "./UploadImgs";
import { ParticipantsProps } from "./Participants";

interface OthersTrailInfoProps {
  participants: ParticipantsProps[];
  images: string[][];
  onClick: (id:string)=>void;
}

export default function OthersTrailInfo({
  participants,
  images,
  onClick
}: OthersTrailInfoProps) {
  return (
    <div className="flex justify-between items-start gap-10 w-full p-6 max-xl:flex-col-reverse max-xl:gap-10 max-xl:max-h-none">
      <Participants participants={participants} onClick={onClick}/>
      <UploadImgs images={images} />
    </div>
  );
}
