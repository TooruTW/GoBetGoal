import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChallengeSupa } from "@/types/ChallengeSupa";
import ChallengeInfo from "./ChallengeInfo";
import Form from "./Form";

export default function CreateTrialForm({ className }: { className?: string }) {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<ChallengeSupa | null>(null);
  const challengeTemplate = useSelector(
    (state: RootState) => state.challengeTemplate.challenge
  );

  useEffect(() => {
    if (challengeTemplate.length > 0 && id) {
      const foundChallenge = challengeTemplate.find(
        (item) => item.id === String(id)
      );
      setChallenge(foundChallenge || null);
      console.log("父層取得 challenge:", foundChallenge);
    }
  }, [challengeTemplate, id]);

  return (
    <div
      className={`max-w-175 w-full flex flex-col gap-2 relative bg-schema-surface-container rounded-lg overflow-b-hidden ${className}`}
    >
      <div className="relative z-10">
        <ChallengeInfo challenge={challenge} />
        <Form challenge={challenge} />
      </div>
    </div>
  );
}
