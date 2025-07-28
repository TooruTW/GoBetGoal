import TrialBriefInfo from "./TrialBriefInfo";
import UserCertification from "./UserCertification";
import { BriefInfoProps } from "./TrialBriefInfo";
import { CertificationProps } from "./UserCertification";

interface TrialCompleteProps {
  trialBrief?: BriefInfoProps;
  certification?: CertificationProps;
}

export default function MyTrialInfo(props: TrialCompleteProps) {
  const { trialBrief, certification } = props;
  if (!trialBrief || !certification) return <h1>Loading...</h1>;


  return (
    <div className="flex relative justify-between w-full max-h-80 h-full border-b-4 border-schema-outline px-5 items-center max-xl:flex-col-reverse max-xl:gap-2 max-xl:max-h-none">
      <TrialBriefInfo
        category={trialBrief.category}
        result={trialBrief.result}
        trialName={trialBrief.trialName}
        challengeName={trialBrief.challengeName}
        challengeCount={trialBrief.challengeCount}
        trialDescription={trialBrief.trialDescription}
        trialFrequency={trialBrief.trialFrequency}
        trialTotalDays={trialBrief.trialTotalDays}
        trialPeople={trialBrief.trialPeople}
      />
      <UserCertification
        userInfo={{
          charactor_img_link: certification.userInfo.charactor_img_link,
          nick_name: certification.userInfo.nick_name,
        }}
        trialName={certification.trialName}
        trialReward={certification.trialReward}
        trialCompleteRate={certification.trialCompleteRate}
        cheatCount={certification.cheatCount}
      />
    </div>
  );
}
