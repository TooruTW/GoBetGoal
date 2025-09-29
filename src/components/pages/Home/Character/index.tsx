import useCheckBrowser from "@/hooks/useCheckBrowser";
import { CHARACTER_LIST } from "./constants";
import { useCharacterVisibility } from "./hooks/useCharacterVisibility";
import { useCharacterAnimation } from "./hooks/useCharacterAnimation";
import { useCharacterCarousel } from "./hooks/useCharacterCarousel";

export default function Character() {
  const { isDesktopChrome } = useCheckBrowser();

  // 使用可見性控制 hook
  const [characterRef, isVisible] = useCharacterVisibility();

  // 使用動畫控制 hook
  useCharacterAnimation(characterRef);

  // 使用輪播控制 hook
  const { currentIndex, currentItem, currentP, currentName, handleItemClick } =
    useCharacterCarousel(isVisible);

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
                src={item.src}
                alt={item.name}
                onClick={() => handleItemClick(index)}
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
