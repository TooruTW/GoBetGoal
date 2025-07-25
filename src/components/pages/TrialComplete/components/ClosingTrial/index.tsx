import { Button } from "@/components/ui/button";
import MyTrialInfo from "./MyTrialInfo";
import OthersTrailInfo from "./OthersTrailInfo";

export default function TrialComplete() {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-col gap-20 items-center max-w-400 w-full py-10 max-xl:gap-2">
        <MyTrialInfo />
        <OthersTrailInfo />
        <Button className="w-full rounded-md text-p font-bold text-schema-on-primary">結算結果並分享到大平台</Button>
      </div>
    </div>
  );
}
