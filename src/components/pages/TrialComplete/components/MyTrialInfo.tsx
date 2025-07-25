import TrialBriefInfo from "./TrialBriefInfo";
import UserCertification from "./UserCertification";

export default function MyTrialInfo() {
  return (
    <div className="flex relative justify-between w-full max-h-80 h-full border-b-4 border-schema-outline px-5 items-center max-xl:flex-col-reverse max-xl:gap-2 max-xl:max-h-none">
      <TrialBriefInfo />
      <UserCertification />
    </div>
  );
}
