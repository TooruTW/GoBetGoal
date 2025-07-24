import Participants from "./Participants";
import UploadImgs from "./UploadImgs";

export default function OthersTrailInfo() {
  return (
    <div className="flex justify-between items-center gap-10 w-full p-6">
      <Participants />
      <UploadImgs />
    </div>
  );
}