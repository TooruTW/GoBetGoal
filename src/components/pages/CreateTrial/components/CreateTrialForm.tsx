import ChallengeInfo from "./ChallengeInfo";
import Form from "./Form";

export default function CreateTrialForm() {
  return (
    <div className="max-w-175 w-full flex flex-col gap-2 relative bg-schema-surface-container rounded-lg overflow-b-hidden">
      <div className="relative z-10">
        <ChallengeInfo></ChallengeInfo>
        <Form></Form>
      </div>
    </div>
  );
}
