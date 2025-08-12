import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";

export default function ChallengeBox({ currentChallenge }: { currentChallenge: TrialDetailSupa | null }) {

  if (!currentChallenge) return null;

  const {stage_index, end_at, challenge_stage} = currentChallenge

    return (
    <div className="border-1 border-schema-outline rounded-md p-3 h-full w-full flex flex-col justify-between">
      <div className="flex justify-between">
        <p>{...challenge_stage.description} {stage_index}</p>
        <div>{end_at}</div>
      </div>
      <div className="flex justify-center items-center rounded-md">
        upload files or check box
      </div>
      <Button>Submit button</Button>
    </div>
  );
}
