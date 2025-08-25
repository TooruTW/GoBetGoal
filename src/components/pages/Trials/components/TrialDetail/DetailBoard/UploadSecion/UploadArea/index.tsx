import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import ChallengeBox from "./ChallengeBox";
import { useEffect, useRef, useState } from "react";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type acceptProps = {
  trial: TrialDetailSupa[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isAIChecking: boolean;
};

export default function UploadArea({
  trial,
  currentIndex,
  setCurrentIndex,
  isAIChecking,
}: acceptProps) {
  const [currentChallenge, setCurrentChallenge] =
    useState<TrialDetailSupa | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

// challenge index switch
  const handleSwitch = (isNext: boolean) => {
    if (isNext) {
      if (currentIndex === trial.length) return;
      removeAnimation(true);
    } else {
      if (currentIndex === 1) return;
      removeAnimation(false);
    }
  };
// update current challenge by index
  useEffect(() => {
    const challenge = trial.find((item) => item.stage_index === currentIndex);
    if (!challenge) return;
    setCurrentChallenge(challenge);
  }, [currentIndex, trial]);

  // track previous index
  useEffect(() => {
    if (currentIndex !== previousIndex) {
      setPreviousIndex(currentIndex);
    }
  }, [currentIndex, previousIndex]);

  // challenge index switch animation
  useGSAP(
    () => {
      // 根據前一個數字決定動畫方向
      const isNext = currentIndex > previousIndex;
      console.log(isNext);
      const startX = isNext ? 100 : -100; // 如果是下一個，從右邊進入；如果是上一個，從左邊進入
      gsap.fromTo(containerRef.current, {
        x: startX,
        opacity: 0,
      }, {
        x: 0,
        duration: 0.5,
        opacity: 1,
        ease: "power2.inOut",
      });
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  ); 
  // remove animation
  const removeAnimation = contextSafe((isNext: boolean) => {
    if (!containerRef.current) return;
    const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
    gsap.to(containerRef.current, {
      x: isNext ? -100 : 100,
      duration: 0.25,
      opacity: 0,
      onComplete: () => {
        setCurrentIndex(newIndex);
      },
    });
  });

  return (
    <div className="h-full w-full relative max-xl:bg-schema-surface-container-high max-xl:p-2 max-xl:rounded-2xl overflow-hidden">
      <div className="w-full h-full" ref={containerRef}>
        {currentChallenge && (
          <ChallengeBox
            currentChallenge={currentChallenge}
            isAIChecking={isAIChecking}
          />
        )}
      </div>
      <GrFormNext
        className="size-10 hover:bg-schema-outline rounded-full -translate-y-1/2 absolute top-1/2 -right-2"
        onClick={() => handleSwitch(true)}
      />
      <GrFormPrevious
        className="size-10 hover:bg-schema-outline rounded-full -translate-y-1/2 absolute top-1/2 -left-2"
        onClick={() => handleSwitch(false)}
      />
    </div>
  );
}
