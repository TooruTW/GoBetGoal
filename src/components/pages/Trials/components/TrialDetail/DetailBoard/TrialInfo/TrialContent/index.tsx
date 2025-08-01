import { useEffect, useMemo, useRef, useState } from "react";
import CountDown from "./CountDown";
import TextContent from "./TextContent";
import type { TrialDetailSupa } from "@/types/TrialDetailSupa";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

type acceptProps = {
  trial: TrialDetailSupa[];
};
dayjs.extend(isBetween);


export default function TrailContent(props: acceptProps) {
  const { trial } = props;
  const trialStartDate = useMemo(() => new Date(trial[0].start_at), [trial]);
  const today = dayjs().startOf("day");
  const currentStage = useMemo(
    () =>
      trial.find((item) =>
        today.isBetween(dayjs(item.start_at), dayjs(item.end_at), "day", "[)")
  ),
    [trial, today]
  );

  const [timeToCount, setTimeToCount] = useState<Date | null>(null);

  const [countDownState, setCountDownState] = useState("判斷中......");
  const isTrialInProgressRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStage) {
        setTimeToCount(dayjs(currentStage?.end_at).toDate());
        setCountDownState("打卡死線還剩下......");
        isTrialInProgressRef.current = true;
      } else{
        if(today.isAfter(dayjs(trialStartDate))){
          setCountDownState("關卡結束");
        }else{
          setCountDownState("距離試煉開始還有......");
          setTimeToCount(trialStartDate);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [trialStartDate, currentStage, today]);

  return (
    <div className="flex gap-6 max-lg:flex-col-reverse max-lg:items-center">
      <TextContent trial={trial[0]} />

      <div
        className={`flex flex-col gap-2 ${
          isTrialInProgressRef.current ? "" : " opacity-40 max-lg:hidden"
        }`}
      >
        <p>{countDownState}</p>
        <CountDown timeToCount={timeToCount} />
      </div>
    </div>
  );
}
