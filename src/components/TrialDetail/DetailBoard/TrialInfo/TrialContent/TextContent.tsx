import type { TrialDetailSupa } from "@/components/types/TrialDetailSupa";
import { useEffect } from "react";
interface acceptProps {
  trial: TrialDetailSupa;
}

export default function TextContent(props: acceptProps) {
  const { trial } = props;
  const thisTrial = trial.trial;

  useEffect(() => {
    console.log(thisTrial);
  }, [thisTrial]);

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-h3 font-semibold">{thisTrial.title}</p>
      <p>{thisTrial.challenge.description}</p>
      <ul className="columns-4">
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">檢查頻率</p>
          <p>每 {thisTrial.challenge.frequency} 天</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">關卡數量</p>
          <p>{thisTrial.challenge.stage_count}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">試煉總天數</p>
          <p>{thisTrial.challenge.stage_count * thisTrial.challenge.frequency}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">人數</p>
          <p>6</p>
        </li>
      </ul>
    </div>
  );
}
