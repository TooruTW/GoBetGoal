import { useEffect, useState } from "react";

interface acceptProps {
  timeToCount: Date | null;
}

export default function CountDown(props: acceptProps) {
  const { timeToCount } = props;
  const [remain, setRemain] = useState(0);

  // timeToCount 改變時，重設 remain
  useEffect(() => {
    if (!timeToCount) return;
    setRemain(
      Math.max(
        0,
        Math.floor((timeToCount.getTime() - new Date().getTime()) / 1000)
      )
    );
  }, [timeToCount]);

  // 每秒倒數
  useEffect(() => {
    const timer = setInterval(() => {
      setRemain((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = Math.floor(remain / 86400);
  const hour = Math.floor((remain % 86400) / 3600);
  const minute = Math.floor((remain % 3600) / 60);
  const second = remain % 60;
  const remainTime = { day, hour, minute, second };

  return (
    <div className="flex gap-1">
      <div className="flex flex-col items-center">
        <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
          {remainTime.day.toString().padStart(2, "0")}
        </div>
        <span className="text-xs">日</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
          {remainTime.hour.toString().padStart(2, "0")}
        </div>
        <span className="text-xs">時</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
          {remainTime.minute.toString().padStart(2, "0")}
        </div>
        <span className="text-xs">分</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
          {remainTime.second.toString().padStart(2, "0")}
        </div>
        <span className="text-xs">秒</span>
      </div>
    </div>
  );
}
