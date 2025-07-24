import { Button } from "@/components/ui/button";

export default function TrialComplete() {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-col gap-6 items-center max-w-280 w-full border-2 border-schema-outline">
        <div>upper</div>
        <div>middle</div>
        <Button className="w-full rounded-md text-p font-bold text-schema-on-primary">結算結果並分享到大平台</Button>
      </div>
    </div>
  );
}
