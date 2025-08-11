import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import TemplateDetail from "./TemplateDetail";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ChallengeSupa } from "@/types/ChallengeSupa";
import { useGSAP } from "@gsap/react";
import { bagel1, bagel2, bagel3, bagel4 } from "@/assets/bagel";

interface ChallengeInfoProps {
  challenge: ChallengeSupa | null;
}

export default function ChallengeInfo({ challenge }: ChallengeInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const bagels = [bagel1, bagel2, bagel3, bagel4];

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      {
        yPercent: 0,
      },
      {
        yPercent: -10,
        duration: 1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      }
    );
  });

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, #${challenge?.color}, transparent)`,
      }}
      className="rounded-2xl px-6 py-7 relative flex flex-col gap-4"
    >
      <img
        ref={imageRef}
        src={challenge?.img ? `/image${challenge?.img}` : bagels[Math.floor(Math.random() * bagels.length)]}
        alt=""
        className="size-35 max-lg:size-30 max-md:size-25 absolute -top-15   right-8 rotate-9"
      />
      <div>
        <h1 className="text-h1 font-bold">{challenge?.title || "選擇試煉模板" } </h1>
        <span className="text-label text-schema-on-surface-variant">
          {challenge?.description || "挑選想挑戰的試煉模板吧！"}
        </span>
      </div>

      <ul className="grid grid-cols-5 gap-2 max-lg:grid-cols-3">
        <li className="flex flex-col items-center">
          <p className="text-label text-schema-on-surface-variant">關卡頻率</p>{" "}
          <p className="text-p">{challenge?.frequency || "0"}</p>
        </li>
        <li className="flex flex-col items-center">
          <p className="text-label text-schema-on-surface-variant">關卡數量</p>{" "}
          <p className="text-p">{challenge?.stage_count || "0"}</p>
        </li>
        <li className="flex flex-col items-center">
          <p className="text-label text-schema-on-surface-variant">
            試煉總時長 （天）
          </p>
          <p className="text-p">
            {(challenge?.stage_count || 0) * (challenge?.frequency || 0)}
          </p>
        </li>
        <li className="flex flex-col items-center">
          <p className="text-label text-schema-on-surface-variant">人數上限</p>
          <p className="text-p">{challenge?.max_user || "0"}</p>
        </li>
        <li className="flex flex-col items-center">
          <p className="text-label text-schema-on-surface-variant">審查方式</p>
          <p className="text-p">{challenge?.check_by_ai ? "AI 審查" : "良心審查"}</p>
        </li>
      </ul>

      <div className="flex justify-between items-center ">
        <Button
          ref={buttonRef}
          variant="createTrialDetail"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <span>看試煉詳情</span>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </Button>
      </div>
      {
        <div
          ref={containerRef}
          className={`fixed top-1/10 h-9/10 overflow-scroll right-0 w-1/2 max-lg:w-full  z-10 transition-transform ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          {challenge && (
            <TemplateDetail
              setIsOpen={setIsOpen}
              challenge={challenge}
            ></TemplateDetail>
          )}
        </div>
      }
    </div>
  );
}
