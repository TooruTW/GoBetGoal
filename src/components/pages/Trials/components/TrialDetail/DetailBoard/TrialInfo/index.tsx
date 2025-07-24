import ProgressBar from "./ProgressBar";
import TrialContent from "./TrialContent";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import Challenges from "./Challenges";
interface acceptProps {
  trial: TrialDetailSupa[];
}

export default function TrialInfo(props: acceptProps) {
  const { trial } = props;

  if (!trial) {
    return <div className="bg-schema-surface-container rounded-xl p-5">No trial data</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-schema-surface-container rounded-xl p-5 flex flex-col justify-between gap-4 max-lg:flex-col-reverse ">
        <div className="flex w-full justify-between max-lg:max-w-none max-lg:flex-col-reverse ">
          <div className="flex gap-4 w-fit max-lg:justify-start">
            <p className="text-xs rounded-full bg-gray-200 font-semibold text-black w-fit h-fit py-0.5 px-2.5">
              {trial[0].trial.challenge.catagory.map((catagory) => (
                <span key={catagory}>{catagory}</span>
              ))}
            </p>
          </div>
          <ProgressBar trial={trial} />
        </div>
        {/* right */}
        <TrialContent trial={trial} />
      </div>
      <Challenges trial={trial} />
    </div>
  );
}
