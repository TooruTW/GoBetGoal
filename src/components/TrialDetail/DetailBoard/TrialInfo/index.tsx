import ProgressBar from "./ProgressBar";
import TrialContent from "./TrialContent";
import type { Trial } from "@/features/trials/type";
interface acceptProps {
  trial: Trial;
}

export default function TrialInfo(props: acceptProps) {
  const { trial } = props;

  return (
    <div className="bg-card-bg rounded-xl p-5 flex justify-between gap-4 max-lg:flex-col-reverse ">
      {/* left */}
      <div className="flex flex-col w-full max-w-8/10 max-lg:max-w-none max-lg:flex-col-reverse ">
        <ProgressBar />
        <TrialContent />
      </div>
      {/* right */}
      <div className="flex justify-end gap-4 max-lg:justify-start">
        {trial.isPublic && (
          <p className="text-label rounded-full bg-bg-tags font-semibold text-black w-fit h-fit py-0.5 px-2.5">
            公開
          </p>
        )}
        <p className="text-label rounded-full bg-bg-tags font-semibold text-black w-fit h-fit py-0.5 px-2.5">
          {trial.trialState}
        </p>
      </div>
    </div>
  );
}
