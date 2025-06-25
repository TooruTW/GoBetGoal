import ProgressBar from "./ProgressBar";
import TrialContent from "./TrialContent";

export default function TrialInfo() {
  return (
    <div className="bg-card-bg rounded-xl p-5 flex justify-between gap-4 max-lg:flex-col-reverse ">
      {/* left */}
      <div className="flex flex-col w-full max-w-8/10 max-lg:max-w-none max-lg:flex-col-reverse ">
        <ProgressBar
          candyPerfect={600000}
          candyPass={300000}
          stagePerfect={135}
          stagePass={168}
          completeRate={100}
        />
        <TrialContent
          start={new Date(2025, 5, 22)}
          deadLine={new Date(2025, 5, 23)}
        />
      </div>
      {/* right */}
      <div className="flex justify-end gap-4 max-lg:justify-start">
        <p className="text-label rounded-full bg-bg-tags font-semibold text-black w-fit h-fit py-0.5 px-2.5">
          公開
        </p>
        <p className="text-label rounded-full bg-bg-tags font-semibold text-black w-fit h-fit py-0.5 px-2.5">
          進行中
        </p>
      </div>
    </div>
  );
}
