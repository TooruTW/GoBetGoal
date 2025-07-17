import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import type { TrialDetailSupa } from "@/types/TrialDetailSupa";
interface acceptProps {
  trial: TrialDetailSupa[];
}

export default function ProgressBar(props: acceptProps) {
  const { trial } = props;
  const infoRef = useRef({
    challengeCount: 0,
    passedChallengesCount: 0,
    candyPass: 0,
    candyPerfect: 0,
    stagePass: 0,
    stagePerfect: 0,
    completeRate: 0,
    rewordRate: 1.5,
  })

  useEffect(()=>{    
    if(!trial) return
    const trialInfo = trial[0].trial
    infoRef.current = {
      ...infoRef.current,
      challengeCount: trial.length,
      passedChallengesCount: trial.filter(item => item.status === "pass").length,
      candyPass: trialInfo.deposit,
      candyPerfect: trialInfo.deposit * infoRef.current.rewordRate,
      stagePass: Math.floor(trial.length * 0.8),
      stagePerfect: trial.length,
      completeRate: (trial.filter(item => item.status === "pass").length / trial.length) * 100,
    }
  },[trial])

  const [rate, setRate] = useState(infoRef.current.completeRate);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: infoRef.current.completeRate,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setRate(Math.floor(obj.val));
      },
    });
  }, [infoRef.current.completeRate]);

  return (
    <div className="w-full max-w-3/5">
      <p className=" relative flex justify-between">
        <span>糖果總數</span>
        <span
          className={`absolute translate-x-[-50%]`}
          style={{ left: `${(infoRef.current.stagePass / infoRef.current.stagePerfect) * 100}%` }}
        >
          {infoRef.current.candyPass > 1000 ? `${infoRef.current.candyPass / 1000}K` : infoRef.current.candyPass}
        </span>
        <span>
          {infoRef.current.candyPerfect > 1000 ? `${infoRef.current.candyPerfect / 1000}K` : infoRef.current.candyPerfect}
        </span>
      </p>
      <div className="w-full rounded-full relative h-4 bg-bg-module">
        <p className=" absolute z-10 top-1/2 left-1/2 -translate-1/2 text-label text-white">
          合作進度 <span>{infoRef.current.passedChallengesCount} / {infoRef.current.challengeCount}</span>
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
          style={{ left: `${(infoRef.current.stagePass / infoRef.current.stagePerfect) * 100}%` }}
        >
          {infoRef.current.stagePass}
        </span>
        <span>{infoRef.current.stagePerfect}</span>
      </p>
    </div>
  );
}
