import AchievementLoop2 from "./AchievementLoop2.tsx";
import TemplateLoop from "./TemplateLoop.tsx";
import Candy from "@/components/layout/Header/Navigator/Candy.tsx";
import { bagel1, bagel2, bagel3, bagel4 } from "@/assets/bagel";
import SequencePlayer from "@/components/ui/SequencePlayer.tsx";
import { monsterCurious } from "@/assets/monsterCurious";
import { girlFrames } from "@/assets/sequence/girl";

export default function RunField() {
  const candy = 999;

  return (
    <div className="w-screen h-screen flex flex-col text-nowrap">
      <div className="h-1/2 flex flex-col gap-10">
        <div className="flex justify-evenly items-center h-full max-h-50">
          <div className="h-full w-1/2 flex items-center justify-center">
            <SequencePlayer
              imgList={girlFrames}
              fps={24}
            />
          </div>

          <div className="md:flex-row-reverse shrink-0 flex flex-col items-center gap-10">
            <h3 className="text-h5 md:text-h2 font-bold text-wrap">
              AI小怪獸陪你達成多樣試煉
            </h3>

            <div className=" aspect-[3/4] h-36 md:h-40 rounded-2xl overflow-hidden border border-schema-primary relative">
              <p className="bg-schema-primary text-schema-on-primary p-2 text-center  whitespace-nowrap">
                上傳挑戰證明
              </p>

              <div>
                <img
                  src="/image/challengeSample/50 Diet.webp"
                  alt=""
                  className="z-0 animate-pulse"
                />

                <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 w-full ">
                  <SequencePlayer
                    imgList={monsterCurious}
                    fps={24}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TemplateLoop />
      </div>

      <div className="h-1/2 flex flex-col justify-between gap-4 px-4">
        <div className="grid grid-cols-3 items-center h-2/3">
          <div className="flex flex-col justify-center w-full">
            <h3 className="text-h5 lg:text-h2 font-bold">
              贏取豐厚貝果幣、成就
            </h3>
            <Candy amount={candy} />
          </div>
          {/* 貝果幣 */}
          <div className="flex flex-nowrap justify-evenly h-full w-full">
            <img
              src={bagel1}
              alt=""
              className="w-1/4 object-contain animate-bounce"
            />
            <img
              src={bagel3}
              alt=""
              className="w-1/4 object-contain animate-bounce"
            />
            <img
              src={bagel2}
              alt=""
              className="w-1/4 object-contain animate-bounce"
            />
            <img
              src={bagel4}
              alt=""
              className="w-1/4 object-contain animate-bounce"
            />
          </div>

          {/* 女孩 */}
          <div className="h-full flex items-center justify-center overflow-hidden">
            <SequencePlayer
              imgList={girlFrames}
              fps={24}
              className="-scale-x-100"
            />
          </div>
        </div>

        <AchievementLoop2 className="h-1/3" />
      </div>
    </div>
  );
}
