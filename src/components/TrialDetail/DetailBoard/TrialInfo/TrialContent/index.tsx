import { useEffect, useRef, useState } from "react";
import CountDown from "./CountDown";
import TextContent from "./TextContent";

interface acceptProps {
  deadLine: Date;
  start: Date;
}

const fakeTrialInfo = {
  title: "28天哈佛減肥法 0 /28",
  content: "上傳三餐照片，符合當日菜單",
  info: { frequency: "每日", stageNum: 28, duration: 28, people: 6 },
};

export default function TrailContent(props: acceptProps) {
  const { deadLine, start } = props;
  const [target, setTarget] = useState(start);
  const [countDownState, setCountDownState] =
    useState("判斷中......");
  const isTrialInProgressRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      if (now >= start.getTime() && now <= deadLine.getTime()) {
        setTarget(deadLine);
        setCountDownState("打卡死線還剩下......");
        isTrialInProgressRef.current = true;

      } else if (now >= deadLine.getTime()) {
        setCountDownState("關卡結束");
        isTrialInProgressRef.current = false;
      } else if( now <= start.getTime() ){
        setCountDownState("距離試煉開始還有......")
        isTrialInProgressRef.current = false;

      }
    }, 1000);
    return () => clearInterval(timer);
  }, [start, deadLine]);

  return (
    <div className="flex gap-6 max-lg:flex-col-reverse max-lg:items-center">
      {/* left */}
      <div
        className={`flex flex-col gap-2 ${
          isTrialInProgressRef.current? "":" opacity-40 max-lg:hidden"
        }`}
      >
        <p>{countDownState}</p>
        <CountDown timeToCount={target} />
      </div>
      {/* right */}

      <TextContent
        title={fakeTrialInfo.title}
        content={fakeTrialInfo.content}
        trailInfo={fakeTrialInfo.info}
      />
    </div>
  );
}
