import ProgressBar from "./ProgressBar";

import TrialContent from "./TrialContent";

export default function TrialInfo() {
  return (
    <div className="bg-card-bg rounded-xl p-5">
      {/* left */}
      <div>
        <ProgressBar
          candyPerfect={600000}
          candyPass={300000}
          stagePerfect={135}
          stagePass={168}
          completeRate={0}
        />
        <TrialContent />
      </div>
      {/* right */}
      <div></div>
    </div>
  );
}
