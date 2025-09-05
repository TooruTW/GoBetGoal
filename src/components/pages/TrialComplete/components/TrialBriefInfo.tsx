import { useState, useEffect } from "react";

export interface BriefInfoProps {
  category: string[];
  result: "pass" | "perfect" | "fail";
  trialName: string;
  challengeName: string;
  challengeCount: number;
  trialDescription: string;
  trialFrequency: string;
  trialTotalDays: number;
  trialPeople: number;
}

export default function TrialBriefInfo(props: BriefInfoProps) {
  const {
    category,
    result,
    trialName,
    challengeName,
    challengeCount,
    trialDescription,
    trialFrequency,
    trialTotalDays,
    trialPeople,
  } = props;
  const [resultText, setResultText] = useState<string>("");
  const [resultClass, setResultClass] = useState<string>("");

  useEffect(() => {
    switch (result) {
      case "pass":
        setResultText("隊伍試煉成功");
        setResultClass("bg-schema-tertiary");
        break;
      case "perfect":
        setResultText("隊伍試煉完美通過");
        setResultClass("bg-schema-secondary");
        break;
      case "fail":
        setResultText("隊伍試煉失敗");
        setResultClass("bg-schema-primary");
        break;
      default:
        setResultText("");
        setResultClass("");
        break;
    }
  }, [result]);

  return (
    <div className="bg-schema-surface-container p-3 rounded-md flex flex-col gap-4 w-full max-w-1/3 max-xl:w-full max-xl:max-w-none relative z-20">
      <div className="flex justify-between items-center ">
        <ul className="flex gap-2 text-p font-bold text-schema-on-surface">
          {category.map((item, index) => (
            <li
              key={index}
              className=" rounded-full bg-schema-surface-container-highest px-2.5 py-0.5"
            >
              {item}
            </li>
          ))}
        </ul>
        <div
          className={`${resultClass} text-schema-inverse-on-surface px-2.5 py-0.5 rounded-full`}
        >
          {resultText}
        </div>
      </div>
      <div>
        <h3 className="text-h3 font-bold text-schema-on-surface">
          {trialName}
        </h3>
        <p className="text-p font-bold text-schema-on-surface">
          {challengeName}
        </p>
        <p className="text-label text-schema-on-surface">{trialDescription}</p>
      </div>
      <ul className="flex justify-between gap-3 text-label">
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">關卡頻率</p>
          <p className="text-p font-bold">每 {trialFrequency} 日</p>
        </li>
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">關卡數</p>
          <p className="text-p font-bold">{challengeCount}</p>
        </li>
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">試煉總天數</p>
          <p className="text-p font-bold">{trialTotalDays}</p>
        </li>
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">人數</p>
          <p className="text-p font-bold">{trialPeople}</p>
        </li>
      </ul>
    </div>
  );
}
