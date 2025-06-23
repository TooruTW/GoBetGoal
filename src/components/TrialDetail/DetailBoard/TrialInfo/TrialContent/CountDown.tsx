import { useEffect, useState } from "react";

interface acceptProps {
  deadLine: Date;
}
export default function CountDown(props: acceptProps) {
  const { deadLine } = props;
  const [remain, setRemain] = useState(
    Math.floor((deadLine.getTime() - new Date().getTime()) / 1000)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemain((prev) => {
        const next = Math.max(0, prev - 1);
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [deadLine]);

  const hour = Math.floor(remain / 3600);
  const minute = Math.floor((remain % 3600) / 60);
  const second = remain % 60;
  const remainTime = { hour, minute, second };
  return (
    <div className="flex gap-1">
      <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
        {remainTime.hour.toString().padStart(2, "0")}
      </div>
      <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
        {remainTime.minute.toString().padStart(2, "0")}
      </div>
      <div className="aspect-square flex justify-center items-center rounded-xl p-2.5 text-h3 font-medium leading-1.5 bg-unActivated-bg text-unActivated-text font-mono">
        {remainTime.second.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
