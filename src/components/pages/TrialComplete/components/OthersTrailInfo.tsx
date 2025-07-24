import Participants from "./Participants";
import UploadImgs from "./UploadImgs";

export default function OthersTrailInfo() {
  return (
    <div className="flex justify-between w-full">
      <Participants />
      <UploadImgs />
    </div>
  );
}