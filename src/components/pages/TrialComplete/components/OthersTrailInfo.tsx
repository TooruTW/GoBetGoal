import Participants from "./Participants";
import UploadImgs from "./UploadImgs";
import { monsterDefault } from "@/assets/monster";

const fakeParticipants = [
  {
    charactor_img_link: monsterDefault,
    nick_name: "妖獸園長",
    completeRate: "28/28",
    cheatCount: 7,
  },
  {
    charactor_img_link: monsterDefault,
    nick_name: "妖獸園長",
    completeRate: "28/28",
    cheatCount: 7,
  },
];

export default function OthersTrailInfo() {
  return (
    <div className="flex justify-between items-start gap-10 w-full p-6 max-xl:flex-col-reverse max-xl:gap-10 max-xl:max-h-none">
      <Participants participants={fakeParticipants} />
      <UploadImgs />
    </div>
  );
}