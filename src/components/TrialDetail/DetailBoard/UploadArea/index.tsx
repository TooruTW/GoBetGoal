import type { Trial } from "@/components/types/Trial";
import UploadCards from "./UploadCards";
import Review from "./Review";

interface acceptProps {
  trial: Trial;
}
export default function UploadArea(props: acceptProps) {
  const { challenges, currentChallengeIndex, id } = props.trial;
  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="flex flex-col gap-3 w-full">
      <p>當前關卡</p>
      <UploadCards currentChallenge={currentChallenge} trialId={id} />
      <Review currentChallenge={currentChallenge} />
    </div>
  );
}
