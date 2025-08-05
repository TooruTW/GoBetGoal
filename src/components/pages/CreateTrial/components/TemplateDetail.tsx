import { IoClose } from "react-icons/io5";
import { ChallengeSupa } from "@/types/ChallengeSupa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function TemplateDetail({
  setIsOpen,
  challenge,
}: {
  setIsOpen: (isOpen: boolean) => void;
  challenge: ChallengeSupa;
}) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    console.log(challenge);
    gsap.to(arrowRef.current, {
      yPercent: -50,
      duration: 1,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [challenge]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px 的容錯範圍
      setIsAtBottom(isBottom);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-schema-surface-container p-6 rounded-lg flex flex-col gap-6 items-center">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-h2">試煉詳情</h2>
        <IoClose className="size-6" onClick={() => setIsOpen(false)}></IoClose>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">功效</h3>
        <div className="flex gap-2">
          {challenge?.effect.map((item, index) => {
            return (
              <span
                key={`effect${index}`}
                className="px-3 py-2 rounded-full bg-schema-surface-container-highest w-fit"
              >
                # {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">適合</h3>
        <div className="flex gap-2">
          {challenge?.suit_for.map((item, index) => {
            return (
              <span
                key={`suit_for${index}`}
                className="px-3 py-2 rounded-full bg-schema-surface-container-highest w-fit"
              >
                # {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">不適合</h3>
        <div className="flex gap-2">
          {challenge?.no_suit_for.map((item, index) => {
            return (
              <span
                key={`no_suit_for${index}`}
                className="px-3 py-2 rounded-full bg-schema-surface-container-highest w-fit"
              >
                # {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 relative ">
        <h3 className="text-h3 py-2">關卡</h3>
        <div
          ref={scrollContainerRef}
          className="flex flex-col gap-4 py-10 max-h-80 overflow-y-scroll"
        >
          {challenge?.challenge_stage?.map((item, index) => {
            return (
              <div key={`stage${index}`} className="flex w-full gap-2 h-fit">
                <div className="w-5">{item.stage_index}</div>
                <div className="w-4 relative translate-y-1">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                  <div
                    className={`w-1/5 h-[160%] bg-white absolute top-0 left-1/2 -translate-x-1/2 ${
                      index === (challenge?.challenge_stage?.length || 0) - 1
                        ? "hidden"
                        : ""
                    }`}
                  ></div>
                </div>
                <ul className="list-disc pl-4 flex flex-col gap-2">
                  {item.description.map((item, index) => {
                    return <li key={`description${index}`}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        {!isAtBottom && (
          <div
            ref={arrowRef}
            className="absolute bottom-2 right-1/2 -translate-x-1/2 size-10 opacity-30 pointer-events-none"
          >
            <MdOutlineKeyboardDoubleArrowDown className="size-full"></MdOutlineKeyboardDoubleArrowDown>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">守則</h3>
        <ul className="list-disc pl-4 flex flex-col gap-2">
          {challenge?.rule.map((item, index) => {
            return <li key={`rule${index}`}>{item}</li>;
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2 w-full border-1 border-schema-outline rounded-lg p-6">
        <h3 className="text-h3">注意</h3>
        <ul className="list-disc pl-4 flex flex-col gap-2">
          {challenge?.caution.map((item, index) => {
            return <li key={`caution${index}`}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
