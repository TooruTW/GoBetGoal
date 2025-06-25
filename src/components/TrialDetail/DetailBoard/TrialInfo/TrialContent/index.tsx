import { useEffect, useMemo, useRef, useState } from "react";
import CountDown from "./CountDown";
import TextContent from "./TextContent";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

export default function TrailContent() {
  const currentTrial = useSelector((state: RootState) => state.trials);

  const startDate = useMemo(
    () => new Date(currentTrial.startDate),
    [currentTrial.startDate]
  );
  const endDate = useMemo(
    () => new Date(currentTrial.endDate),
    [currentTrial.endDate]
  );



  const [timeToCount, setTimeToCount] = useState<Date | null>(null);

  const [countDownState, setCountDownState] = useState("判斷中......");
  const isTrialInProgressRef = useRef(false);

  useEffect(() => {

    const timer = setInterval(() => {
      const now = new Date().getTime();
      if (now >= startDate.getTime() && now <= endDate.getTime()) {
        setTimeToCount(endDate);
        setCountDownState("打卡死線還剩下......");
        isTrialInProgressRef.current = true;
      } else if (now >= endDate.getTime()) {
        setCountDownState("關卡結束");
        isTrialInProgressRef.current = false;
      } else if (now <= startDate.getTime()) {
        setCountDownState("距離試煉開始還有......");
        setTimeToCount(startDate);
        isTrialInProgressRef.current = false;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <div className="flex gap-6 max-lg:flex-col-reverse max-lg:items-center">
      {/* left */}
      <div
        className={`flex flex-col gap-2 ${
          isTrialInProgressRef.current ? "" : " opacity-40 max-lg:hidden"
        }`}
      >
        <p>{countDownState}</p>
        <CountDown timeToCount={timeToCount} />
      </div>
      {/* right */}

      <TextContent />
    </div>
  );
}
