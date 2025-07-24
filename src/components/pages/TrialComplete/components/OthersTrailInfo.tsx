import Participants from "./Participants";
import UploadImgs from "./UploadImgs";

export default function OthersTrailInfo() {
  return (
    <div className="flex justify-between items-start gap-10 w-full p-6 max-xl:flex-col-reverse max-xl:gap-10 max-xl:max-h-none">
      <Participants />
      <UploadImgs />
    </div>
  );
}