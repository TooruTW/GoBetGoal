import gsap from "gsap";
import { useEffect, useState } from "react";
import type { Trial } from "@/features/trials/type";
interface acceptProps {
  trial: Trial;
}

export default function ProgressBar(props: acceptProps) {
  const { trial } = props;

  const challengeCount = trial.challengeCount;
  const passedChallengesCount = trial.passedChallengesCount;
  const completeRate = (passedChallengesCount / challengeCount) * 100;
  const candyPass = trial.investment;
  const candyPerfect = trial.reward;
  const stagePass = Math.floor(challengeCount * 0.8);
  const stagePerfect = challengeCount;

  const [rate, setRate] = useState(completeRate);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: completeRate,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setRate(Math.floor(obj.val));
      },
    });
  }, [completeRate]);

  return (
    <div>
      <p className=" relative flex justify-between">
        <span>糖果總數</span>
        <span
          className={`absolute translate-x-[-50%]`}
          style={{ left: `${(stagePass / stagePerfect) * 100}%` }}
        >
          {candyPass > 1000 ? `${candyPass / 1000}K` : candyPass}
        </span>
        <span>
          {candyPerfect > 1000 ? `${candyPerfect / 1000}K` : candyPerfect}
        </span>
      </p>
      <div className="w-full rounded-full relative h-4 bg-bg-module">
        <p className=" absolute z-10 top-1/2 left-1/2 -translate-1/2 text-label text-white">
          合作進度 <span>{passedChallengesCount} / {challengeCount}</span>
        </p>

        <div
          className={`absolute z-0 rounded-full h-full bg-gradient-set-1 flex`}
          style={{
            width: `${rate}%`,
            filter: `saturate(${rate / 100 + 0.5})`,
          }}
        ></div>
      </div>
      <p className=" relative flex justify-between">
        <span>關卡總數</span>
        <span
          className={`absolute translate-x-[-50%]`}
          style={{ left: `${(stagePass / stagePerfect) * 100}%` }}
        >
          {stagePass}
        </span>
        <span>{stagePerfect}</span>
      </p>
    </div>
  );
}
