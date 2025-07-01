import type { Challenge } from "@/components/types/Challenge";

interface acceptProps {
  challenges: Challenge[];
}

export default function Challenges(props: acceptProps) {
  const { challenges } = props;
  const challengeCount = challenges.length;
  return (
    <div className="flex w-full gap-2 overflow-x-scroll snap-x snap-mandatory">
      {challenges.map((item) => (
        <div key={item.id} className="bg-card-bg rounded-sm py-2 px-4 text-nowrap snap-center">
          <p className="text-label font-normal">關卡{Number(item.id)}/{challengeCount}</p>
          <ul>
            {item.description.map((item, index)=>(
                <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
