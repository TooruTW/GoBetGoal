import TrialBriefInfo from "./TrialBriefInfo";
import UserCertification from "./UserCertification";
import { monsterDefault } from "@/assets/monster";

export default function MyTrialInfo() {
  return (
    <div className="flex relative justify-between w-full max-h-80 h-full border-b-4 border-schema-outline px-5 items-center max-xl:flex-col-reverse max-xl:gap-2 max-xl:max-h-none">
      <TrialBriefInfo
        category={["飲食", "作息"]}
        result="pass"
        trialName="無情燃脂"
        challengeName="28天哈佛減肥法"
        challengeCount={28}
        trialDescription="適合能忍耐重複食物，逐步瘦身者，採用低卡、低碳、減糖及油為原則，瘦身成效高"
        trialFrequency="1"
        trialTotalDays={28}
        trialPeople={1}
      />
      <UserCertification
        userInfo={{
          charactor_img_link: monsterDefault,
          nick_name: "妖獸園長",
        }}
        trialName="無情燃脂"
        trialReward={10000}
        trialCompleteRate="28 / 28"
        cheatCount={7}
      />
    </div>
  );
}
