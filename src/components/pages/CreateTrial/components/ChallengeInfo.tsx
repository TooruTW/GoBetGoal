import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import TempleteDetail from "./TempleteDetail";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function ChallengeInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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
  }, []);

  useClickOutside(containerRef, () => setIsOpen(false));

  const color = "#eba7e4";
  const templeteimgurl = "/challengeimg.png";
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${color}, transparent)`,
      }}
      className="rounded-2xl px-6 py-7 relative flex flex-col gap-4"
    >
      <img
        ref={imageRef}
        src={templeteimgurl}
        alt=""
        className="size-35 max-lg:size-30 max-md:size-25 absolute -top-15 max-lg:top-45  right-6 rotate-9"
      />
      <div>
        <h1 className="text-h1 font-bold">templete title </h1>
        <span className="text-label text-schema-on-surface-variant">
          templete description
        </span>
      </div>

      <ul className="grid grid-cols-5 gap-2 max-lg:grid-cols-3">
        <li>
          <p className="text-label">關卡頻率</p> <p className="text-p">1</p>
        </li>
        <li>
          <p className="text-label">關卡數量</p> <p className="text-p">28</p>
        </li>
        <li>
          <p className="text-label">試煉總時長 （天）</p>
          <p className="text-p"> 28 </p>
        </li>
        <li>
          <p className="text-label">人數上限</p> <p className="text-p">6</p>
        </li>
        <li>
          <p className="text-label">審查方式</p>{" "}
          <p className="text-p">AI 審查</p>
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
          <span>看試煉詳情 </span>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </Button>
      </div>
      {
        <div
          ref={containerRef}
          className={`fixed top-1/10 h-9/10 overflow-scroll right-0 w-1/2 max-lg:w-full  z-10 transition-transform ${
            isOpen ? "translete-x-0" : "translate-x-full"
          }`}
        >
          <TempleteDetail setIsOpen={setIsOpen}></TempleteDetail>
        </div>
      }
    </div>
  );
}
