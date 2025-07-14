import ProgressBar from "./ProgressBar";
import TrialContent from "./TrialContent";
import { TrialDetailSupa } from "@/components/types/TrialDetailSupa";
interface acceptProps {
  trial: TrialDetailSupa[];
}

export default function TrialInfo(props: acceptProps) {
  const { trial } = props;

  if (!trial) {
    return <div className="bg-card-bg rounded-xl p-5">No trial data</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card-bg rounded-xl p-5 flex flex-col justify-between gap-4 max-lg:flex-col-reverse ">
        <div className="flex w-full justify-between max-lg:max-w-none max-lg:flex-col-reverse ">
          <div className="flex gap-4 w-fit max-lg:justify-start">
            {trial.isPublic && (
              <p className="text-label rounded-full bg-gray-200 font-semibold text-black w-fit h-fit py-0.5 px-2.5">
                公開
              </p>
            )}
            <p className="text-xs rounded-full bg-gray-200 font-semibold text-black w-fit h-fit py-0.5 px-2.5">
              {trial.trialState}
            </p>
          </div>
          <ProgressBar trial={trial} />
        </div>
        {/* right */}
        <TrialContent trial={trial} />
      </div>
      {/* <Challenges challenges={trial.challenges} /> */}
    </div>
  );
}
