import SequencePlayer from "@/components/ui/SequencePlayer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { monsterCurious } from "@/assets/monsterCurious";

export default function ShowCheckResult({
  state = "checking",
}: {
  state: "pass" | "fail" | "checking";
}) {
  const showCheckResultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(state, "checking state");
  }, [state]);

  useGSAP(
    () => {
      gsap.set(".pass", {
        opacity: 0,
      });
      gsap.set(".fail", {
        opacity: 0,
      });
      if (state === "pass") {
        gsap.to(".pass", {
          opacity: 1,
          xPercent: 50,
          duration: 1,
        });
      } else if (state === "fail") {
        gsap.to(".fail", {
          opacity: 1,
          xPercent: -50,
          duration: 1,
        });
      }
    },
    { dependencies: [state], revertOnUpdate: true }
  );

  return (
    <div
      ref={showCheckResultRef}
      className={`absolute top-0 left-0 h-full w-full flex justify-center items-center border-2 border-schema-on-primary px-4 bg-schema-surface-container pointer-events-none`}
    >
      <div className="w-1/3 aspect-square border-10 rounded-full border-schema-primary pass"></div>
      <div className="size-1/3 aspect-square relative rotate-45 fail">
        <div className="w-full h-1 border-5 border-schema-primary absolute top-1/2 -translate-y-1/2"></div>
        <div className="w-full h-1 border-5 border-schema-primary absolute top-1/2 -translate-y-1/2 rotate-90"></div>
      </div>
      <div className="w-full max-w-100 aspect-square absolute left-1/2 -translate-x-1/2 ">
        <SequencePlayer
          imgList={monsterCurious}
          width={100}
          height={100}
          fps={24}
        />
      </div>
    </div>
  );
}
