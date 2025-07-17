import type { TrialDetailSupa } from "@/types/TrialDetailSupa";

interface acceptProps {
  trial: TrialDetailSupa[];
}

export default function Challenges(props: acceptProps) {
  const { trial } = props;

  // 使用 Map 來記錄 stage-index，避免重複
  const stageMap = new Map();
  trial.forEach((item) => {
    const stageKey = item.challenge_stage.id;
    if (!stageMap.has(stageKey)) {
      stageMap.set(stageKey, item.challenge_stage);
    }
  });

  const uniqueStages = Array.from(stageMap.values());

  return (
    <div className="flex w-full gap-2 overflow-x-scroll snap-x snap-mandatory">
      {uniqueStages.map((stage, index) => (
        <div
          key={stage.id}
          className="bg-card-bg rounded-sm py-2 px-4 text-nowrap snap-center"
        >
          <p className="text-label font-normal">
            關卡{index + 1}/{uniqueStages.length}
          </p>
          <ul>
            {stage.description.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
