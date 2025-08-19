import ProgressBar from "./ProgressBar";
import TrialContent from "./TrialContent";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function TrialInfo(props: acceptProps) {
  const { trial } = props;

  if (!trial) {
    return (
      <div className="bg-schema-surface-container rounded-xl p-5">
        No trial data
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-schema-surface-container rounded-xl p-5 flex flex-col justify-between gap-4 max-lg:flex-col ">
        <div className="flex w-full justify-between max-lg:max-w-none max-lg:flex-col gap-4">
          <div className="flex gap-4 w-fit max-lg:justify-start">
            <p className="text-xs rounded-full bg-gray-200 font-semibold text-black w-fit h-fit py-0.5 px-2.5 flex gap-1">
              {trial[0].trial.challenge.category.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </p>
          </div>
          <ProgressBar trial={trial} className = "w-full lg:max-w-3/5 "/>
        </div>
        {/* right */}
        <TrialContent trial={trial} />
      </div>
    </div>
  );
}
