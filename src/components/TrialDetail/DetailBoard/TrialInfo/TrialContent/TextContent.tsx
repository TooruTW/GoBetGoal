import type { Trial } from "@/features/trials/type";
interface acceptProps { 
  trial: Trial;
}

export default function TextContent(props: acceptProps) {
  const { trial } = props;

  const { title, description, checkFrequency, challengeCount, maxParticipants, duration } = trial;

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-p">{title}</p>
      <p>{description}</p>
      <ul className="columns-4">
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">關卡頻率</p>
          <p>{checkFrequency}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">關卡數量</p>
          <p>{challengeCount}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">試煉總天數</p>
          <p>{duration}</p>
        </li>
        <li className="p-2 bg-bg-secondary/50 rounded-md w-full mb-2">
          <p className="text-label">人數</p>
          <p>{maxParticipants}</p>
        </li>
      </ul>
    </div>
  );
}
