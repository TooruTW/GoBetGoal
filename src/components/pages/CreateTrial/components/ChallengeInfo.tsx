import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function ChallengeInfo() {
  const color = "#eba7e4";
  const templeteimgurl = "/challengeimg.png";
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${color}, transparent)`,
      }}
      className="rounded-2xl px-6 py-7 relative flex flex-col gap-4"
    >
      <img src={templeteimgurl} alt="" className="size-35 absolute -top-1/3 right-6 rotate-9" />
      <div>
        <h1 className="text-h1 font-bold">templete title </h1>
        <span className="text-label text-schema-on-surface-variant">
          templete description
        </span>
      </div>

      <ul className="flex justify-between">
        <li>
          <p className="text-label">關卡頻率</p> <p className="text-p">1</p>
        </li>
        <li>
          <p className="text-label">關卡數量</p> <p className="text-p">28</p>
        </li>
        <li>
          <p className="text-label">試煉總時長 （天）</p>
          <p className="text-p"> 28 </p>
        </li>
        <li>
          <p className="text-label">人數上限</p> <p className="text-p">6</p>
        </li>
        <li>
          <p className="text-label">審查方式</p>{" "}
          <p className="text-p">AI 審查</p>
        </li>
      </ul>

      <div className="flex justify-between items-center">
        <Button variant="createTrialDetail">
          <span>看試煉詳情 </span>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </Button>
        <div></div>
      </div>
    </div>
  );
}
