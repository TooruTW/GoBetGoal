import { useEffect, useRef, useState } from "react";
import CountDown from "./CountDown";

interface acceptProps {
  deadLine: Date;
  start: Date;
}

export default function TrailContent(props: acceptProps) {
  const { deadLine, start } = props;
  const [target, setTarget] = useState(start);
  const [countDownState, setCountDownState] = useState("距離試煉開始還有......")
  const isTrialOverRef = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      if (now >= start.getTime() && now <= deadLine.getTime()) {
        setTarget(deadLine);
        setCountDownState("打卡死線還剩下......")
      }else if(now >= deadLine.getTime()){
        setCountDownState("關卡結束")
        isTrialOverRef.current = true
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [start, deadLine]);

  return (
    <div>
      {/* left */}
      <div className={`flex flex-col gap-2 ${isTrialOverRef.current && "opacity-40"}`}>
        <p>{countDownState}</p>
        <CountDown timeToCount={target} />
      </div>
      {/* right */}
      <div></div>
    </div>
  );
}
