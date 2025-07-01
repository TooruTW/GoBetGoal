import type { Trial } from "@/components/types/Trial";
import UploadCards from "./UploadCards";

interface acceptProps {
  trial: Trial;
}
export default function UploadArea(props: acceptProps) {
  const { challenges, currentChallengeIndex } = props.trial;
  const currentChallenge = challenges[currentChallengeIndex];
  console.log(challenges, currentChallengeIndex);
  console.log(challenges[currentChallengeIndex]);

  return (
    <div>
      <p>當前關卡</p>

      <UploadCards currentChallenge={currentChallenge} />

      <button>
        <span>上傳</span>
        <span>還有 {currentChallenge.checkCountRemain} 次機會</span>
      </button>
    </div>
  );
}
