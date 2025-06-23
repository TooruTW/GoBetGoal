import DetailBoard from "./DetailBoard";
import SideBoard from "./SideBoard";

export default function TrialDetail() {
  return (
    <div className="flex py-20 w-full max-w-330 relative">
      <DetailBoard />
      <div className=" absolute bottom-0 left-0">
        <SideBoard />
      </div>
    </div>
  );
}
