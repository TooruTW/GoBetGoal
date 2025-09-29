import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useCheckBrowser from "@/hooks/useCheckBrowser";
import { CHARACTER_LIST } from "./constants";
import { useCharacterVisibility } from "./hooks/useCharacterVisibility";

export default function VideoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = CHARACTER_LIST[currentIndex];
  const [currentP, setCurrentP] = useState(CHARACTER_LIST[0].p);
  const [currentName, setCurrentName] = useState(CHARACTER_LIST[0].name);
  const { isDesktopChrome } = useCheckBrowser();

  // 使用可見性控制 hook
  const [characterRef, isVisible] = useCharacterVisibility();

  useGSAP(
    () => {
      if (!characterRef.current) return;

      // 原有的淡入動畫
      gsap.from(characterRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: characterRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    },
    { scope: characterRef }
  );

  // 自動輪播 - 只在可見時運作
  useEffect(() => {
    if (!isVisible) return; // 不可見時不運作

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % CHARACTER_LIST.length;
        setCurrentP(CHARACTER_LIST[nextIndex].p);
        setCurrentName(CHARACTER_LIST[nextIndex].name);
        return nextIndex;
      });
    }, 4000); // 每 4 秒換一個
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      ref={characterRef}
      className="flex items-center justify-between max-md:flex-col max-md:py-20 max-md:gap-10 w-full min-h-screen px-6 overflow-hidden mt-30 lg:mt-50 xl:mt-150"
    >
      {/* 影片播放區 */}
      <h2 className="text-h2 ">多樣角色陪你冒險</h2>

      <div className="relative flex justify-center w-1/3 max-md:w-full h-full">
        <h3 className="absolute -left-4 -top-14 text-h3 font-bold pb-8">
          {currentName}
        </h3>
        <p className="bg-schema-primary text-schema-on-primary absolute -left-2 -top-4 px-4 py-2 transform md:-skew-x-12 inline-block z-10">
          {currentP}
        </p>
        <div className="transform md:-skew-x-12 border-3 border-schema-primary overflow-hidden w-full aspect-[1/1.25]">
          {isDesktopChrome ? (
            <video
              key={currentItem.video}
              autoPlay
              loop
              muted
              className="h-full w-full transform md:skew-x-12 scale-130"
            >
              <source src={currentItem.video} type="video/webm" />
            </video>
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.name}
              className="w-full transform md:skew-x-12"
            />
          )}
        </div>
      </div>

      {/* 縮圖清單 */}
      <div className="w-full md:max-w-1/4 md:grid md:grid-cols-4 max-md:flex max-md:flex-wrap max-md:justify-between gap-2 transform md:-skew-x-12 md:mr-12 ">
        {CHARACTER_LIST.map((item, index) => {
          return (
            <div key={index} className="w-1/5 md:w-full">
              <img
                key={index}
                src={item.src}
                alt={item.name}
                onClick={() => {
                  setCurrentIndex(index);
                  setCurrentP(item.p);
                  setCurrentName(item.name);
                }}
                loading="lazy"
                className={`w-full object-cover rounded-md cursor-pointer transition-all md:skew-x-12 opacity-100 ${
                  currentIndex === index
                    ? "border-2 border-schema-primary "
                    : "hover:border hover:border-schema-primary active:scale-90"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
