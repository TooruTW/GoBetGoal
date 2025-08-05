import type { TrialDetailSupa } from "@/types/TrialDetailSupa";

type acceptProps = {
  trial: TrialDetailSupa;
};

export default function TextContent(props: acceptProps) {
  const { trial } = props;
  const thisTrial = trial.trial;

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-h3 font-semibold">{thisTrial.title}</p>
      <p className="text-sm line-clamp-1 text-schema-on-surface-variant">{thisTrial.challenge.description}</p>
      <ul className="columns-4">
        <li className="p-2 bg-schema-surface-container-highest rounded-md w-full h-full mb-2 flex flex-col justify-between ">
          <p className="text-label text-schema-on-surface-variant">檢查頻率</p>
          <p>每 {thisTrial.challenge.frequency} 天</p>
        </li>
        <li className="p-2 bg-schema-surface-container-highest rounded-md w-full h-full mb-2 flex flex-col justify-between ">
          <p className="text-label text-schema-on-surface-variant">關卡數量</p>
          <p>{thisTrial.challenge.stage_count}</p>
        </li>
        <li className="p-2 bg-schema-surface-container-highest rounded-md w-full h-full mb-2 flex flex-col justify-between ">
          <p className="text-label text-schema-on-surface-variant">試煉總天數</p>
          <p>
            {thisTrial.challenge.stage_count * thisTrial.challenge.frequency}
          </p>
        </li>
        <li className="p-2 bg-schema-surface-container-highest rounded-md w-full h-full mb-2 flex flex-col justify-between ">
          <p className="text-label text-schema-on-surface-variant">人數</p>
          <p>6</p>
        </li>
      </ul>
    </div>
  );
}
